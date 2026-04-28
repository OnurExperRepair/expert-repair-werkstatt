// Vercel Serverless Function — Datenbank-Operationen
// Alles geht über diesen Endpunkt mit Aktions-Parameter

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

async function supabase(path, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${path}`;
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': options.prefer || 'return=representation',
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase ${res.status}: ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

async function uploadImage(base64Data, mediaType, fileName) {
  const buffer = Buffer.from(base64Data, 'base64');
  const url = `${SUPABASE_URL}/storage/v1/object/repair-images/${fileName}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': mediaType,
      'x-upsert': 'true',
    },
    body: buffer,
  });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  return `${SUPABASE_URL}/storage/v1/object/public/repair-images/${fileName}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const requiredPin = process.env.SHOP_PIN;
  if (requiredPin && req.headers['x-shop-pin'] !== requiredPin) {
    return res.status(401).json({ error: 'PIN falsch' });
  }

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Supabase-Verbindung fehlt' });
  }

  try {
    const { action, ...payload } = req.body;

    switch (action) {
      // === LADEN ===
      case 'load_all': {
        const [customers, jobs, history, rejected] = await Promise.all([
          supabase('customers?order=created_at.desc'),
          supabase('jobs?order=created_at.desc'),
          supabase('job_history?order=created_at.desc'),
          supabase('rejected_diagnoses?order=created_at.desc'),
        ]);
        // Historie zu jedem Job zuordnen
        const jobsWithHistory = jobs.map(j => ({
          ...j,
          history: history.filter(h => h.job_id === j.id).map(h => ({
            status: h.status, note: h.note, at: new Date(h.created_at).getTime(),
          })),
        }));
        return res.status(200).json({ customers, jobs: jobsWithHistory, rejected });
      }

      // === KUNDEN ===
      case 'create_customer': {
        const c = await supabase('customers', {
          method: 'POST',
          body: JSON.stringify({
            name: payload.name, phone: payload.phone,
            notes: payload.notes || '', language: payload.language || 'de',
          }),
        });
        return res.status(200).json(c[0]);
      }

      // === AUFTRÄGE ===
      case 'create_job': {
        let imageUrl = null;
        if (payload.imageBase64 && payload.imageMediaType) {
          const ext = payload.imageMediaType.split('/')[1] || 'jpg';
          const fileName = `before/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
          imageUrl = await uploadImage(payload.imageBase64, payload.imageMediaType, fileName);
        }

        const job = await supabase('jobs', {
          method: 'POST',
          body: JSON.stringify({
            customer_id: payload.customer_id,
            device: payload.device,
            device_type: payload.device_type || null,
            damage: payload.damage,
            repair: payload.repair,
            price_min: payload.price_min || 0,
            price_max: payload.price_max || 0,
            duration: payload.duration,
            deposit: payload.deposit || 0,
            status: 'eingegangen',
            image_url: imageUrl,
            diagnosis_data: payload.diagnosis_data || null,
            warranty_until: new Date(Date.now() + 86400000 * 30 * 6).toISOString(),
          }),
        });

        const historyNote = payload.deposit > 0
          ? `Auftrag angelegt · Anzahlung ${payload.deposit}€ erhalten`
          : 'Auftrag angelegt';
        await supabase('job_history', {
          method: 'POST',
          body: JSON.stringify({
            job_id: job[0].id, status: 'eingegangen', note: historyNote,
          }),
        });

        return res.status(200).json(job[0]);
      }

      case 'update_job_status': {
        const { id, status, note } = payload;
        await supabase(`jobs?id=eq.${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
        });
        await supabase('job_history', {
          method: 'POST',
          body: JSON.stringify({ job_id: id, status, note: note || status }),
        });
        return res.status(200).json({ ok: true });
      }

      case 'update_job_notes': {
        const { id, technician_notes } = payload;
        await supabase(`jobs?id=eq.${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ technician_notes, updated_at: new Date().toISOString() }),
        });
        return res.status(200).json({ ok: true });
      }

      case 'update_job_parts_notes': {
        const { id, parts_notes } = payload;
        await supabase(`jobs?id=eq.${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ parts_notes, updated_at: new Date().toISOString() }),
        });
        return res.status(200).json({ ok: true });
      }

      case 'upload_after_image': {
        const { id, imageBase64, imageMediaType } = payload;
        const ext = imageMediaType.split('/')[1] || 'jpg';
        const fileName = `after/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const imageUrl = await uploadImage(imageBase64, imageMediaType, fileName);
        await supabase(`jobs?id=eq.${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ image_after_url: imageUrl, updated_at: new Date().toISOString() }),
        });
        return res.status(200).json({ image_after_url: imageUrl });
      }

      case 'reject_diagnosis': {
        let imageUrl = null;
        if (payload.imageBase64 && payload.imageMediaType) {
          const ext = payload.imageMediaType.split('/')[1] || 'jpg';
          const fileName = `rejected/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
          imageUrl = await uploadImage(payload.imageBase64, payload.imageMediaType, fileName);
        }
        const r = await supabase('rejected_diagnoses', {
          method: 'POST',
          body: JSON.stringify({
            customer_id: payload.customer_id,
            device: payload.device, repair: payload.repair,
            price_min: payload.price_min, price_max: payload.price_max,
            damage: payload.damage, image_url: imageUrl,
          }),
        });
        return res.status(200).json(r[0]);
      }

      // === PUBLIC TRACKING (ohne PIN!) ===
      case 'public_tracking': {
        // Hier KEIN PIN-Check! Aber separate Behandlung
        return res.status(200).json({ error: 'Use GET endpoint' });
      }

      default:
        return res.status(400).json({ error: 'Unbekannte Aktion: ' + action });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

export const config = {
  api: { bodyParser: { sizeLimit: '15mb' } },
};
