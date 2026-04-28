// Vercel Serverless Function — Datenbank-Operationen
// FIXES (gegenüber alter Version):
//  • update_job_status / update_job_notes / update_job_parts_notes / upload_after_image
//    lasen `payload.jobId`, Frontend sendet aber `payload.id`
//    → Postgres bekam `id=eq.undefined` → "invalid input syntax for type bigint"
//  • create_job schrieb in alte Spalten (issue_summary, price_estimate, time_estimate,
//    before_image_url, after_image_url), Frontend liest neue Spalten
//    (damage, repair, price_min, price_max, duration, image_url, image_after_url)
//    → Preise & Bilder waren null
//  • update_job_parts_notes Handler hat ganz gefehlt
//  • reject_diagnosis Feld-Mapping war komplett falsch

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
      'apikey': SUPABASE_KEY,
      'Content-Type': mediaType,
      'x-upsert': 'true',
      'cache-control': 'public, max-age=3600',
    },
    body: buffer,
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Upload failed: ${res.status} - ${errText}`);
  }
  return `${SUPABASE_URL}/storage/v1/object/public/repair-images/${fileName}`;
}

// Verhindert, dass `undefined` als String in einer SQL-URL landet (bigint-Crash).
function requireId(id, label = 'id') {
  if (id === undefined || id === null || id === '' || id === 'undefined') {
    throw new Error(`${label} fehlt im Request — Frontend muss "id" mitsenden`);
  }
  return id;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Supabase-Verbindung fehlt (SUPABASE_URL / SUPABASE_SERVICE_KEY)' });
  }

  try {
    const { action, ...payload } = req.body || {};

    switch (action) {
      // ------------------------------------------------------
      case 'load_all': {
        const [customers, jobs, history, rejected] = await Promise.all([
          supabase('customers?order=created_at.desc'),
          supabase('jobs?order=created_at.desc'),
          supabase('job_history?order=created_at.desc'),
          supabase('rejected_diagnoses?order=created_at.desc'),
        ]);
        const jobsWithHistory = jobs.map(j => ({
          ...j,
          history: history
            .filter(h => h.job_id === j.id)
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            .map(h => ({
              status: h.status,
              note: h.note,
              at: new Date(h.created_at).getTime(),
            })),
        }));
        return res.status(200).json({ customers, jobs: jobsWithHistory, rejected });
      }

      // ------------------------------------------------------
      case 'create_customer': {
        const c = await supabase('customers', {
          method: 'POST',
          body: JSON.stringify({
            name: payload.name,
            phone: payload.phone,
            notes: payload.notes || '',
            language: payload.language || 'de',
          }),
        });
        return res.status(200).json(c[0]);
      }

      // ------------------------------------------------------
      case 'create_job': {
        let imageUrl = null;
        if (payload.imageBase64 && payload.imageMediaType) {
          const ext = (payload.imageMediaType.split('/')[1] || 'jpg').replace('jpeg', 'jpg');
          const fileName = `before_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
          imageUrl = await uploadImage(payload.imageBase64, payload.imageMediaType, fileName);
        }

        const jobData = {
          customer_id: payload.customer_id,
          device: payload.device || '',
          device_type: payload.device_type || null,
          damage: payload.damage || '',
          repair: payload.repair || '',
          price_min: Number(payload.price_min) || 0,
          price_max: Number(payload.price_max) || 0,
          duration: payload.duration || '',
          deposit: Number(payload.deposit) || 0,
          diagnosis_data: payload.diagnosis_data || null,
          status: 'eingegangen',
          image_url: imageUrl,
          image_after_url: null,
          technician_notes: '',
          warranty_until: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString(),
        };

        const j = await supabase('jobs', {
          method: 'POST',
          body: JSON.stringify(jobData),
        });

        const depositNote = Number(payload.deposit) > 0
          ? `Auftrag angelegt · Anzahlung ${Number(payload.deposit)}€ erhalten`
          : 'Auftrag angelegt';

        await supabase('job_history', {
          method: 'POST',
          body: JSON.stringify({
            job_id: j[0].id,
            status: 'eingegangen',
            note: depositNote,
          }),
        });

        return res.status(200).json(j[0]);
      }

      // ------------------------------------------------------
      case 'update_job_status': {
        const id = requireId(payload.id, 'job id');
        const { status, note } = payload;
        const j = await supabase(`jobs?id=eq.${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
        });
        await supabase('job_history', {
          method: 'POST',
          body: JSON.stringify({ job_id: id, status, note: note || '' }),
        });
        return res.status(200).json(j[0]);
      }

      // ------------------------------------------------------
      case 'update_job_notes': {
        const id = requireId(payload.id, 'job id');
        const j = await supabase(`jobs?id=eq.${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            technician_notes: payload.technician_notes || '',
            updated_at: new Date().toISOString(),
          }),
        });
        return res.status(200).json(j[0]);
      }

      // ------------------------------------------------------
      case 'update_job_parts_notes': {
        const id = requireId(payload.id, 'job id');
        const j = await supabase(`jobs?id=eq.${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            parts_notes: payload.parts_notes || '',
            updated_at: new Date().toISOString(),
          }),
        });
        return res.status(200).json(j[0]);
      }

      // ------------------------------------------------------
      case 'upload_after_image': {
        const id = requireId(payload.id, 'job id');
        const { imageBase64, imageMediaType } = payload;
        if (!imageBase64 || !imageMediaType) {
          throw new Error('Bild-Daten fehlen');
        }
        const ext = (imageMediaType.split('/')[1] || 'jpg').replace('jpeg', 'jpg');
        const fileName = `after_${id}_${Date.now()}.${ext}`;
        const imageUrl = await uploadImage(imageBase64, imageMediaType, fileName);
        const j = await supabase(`jobs?id=eq.${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            image_after_url: imageUrl,
            updated_at: new Date().toISOString(),
          }),
        });
        return res.status(200).json({
          image_after_url: imageUrl,
          image_after: imageUrl,
          job: j[0],
        });
      }

      // ------------------------------------------------------
      case 'reject_diagnosis': {
        let imageUrl = null;
        if (payload.imageBase64 && payload.imageMediaType) {
          const ext = (payload.imageMediaType.split('/')[1] || 'jpg').replace('jpeg', 'jpg');
          const fileName = `rejected_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
          imageUrl = await uploadImage(payload.imageBase64, payload.imageMediaType, fileName);
        }
        const r = await supabase('rejected_diagnoses', {
          method: 'POST',
          body: JSON.stringify({
            customer_id: payload.customer_id,
            device: payload.device || '',
            damage: payload.damage || '',
            repair: payload.repair || '',
            price_min: Number(payload.price_min) || 0,
            price_max: Number(payload.price_max) || 0,
            image_url: imageUrl,
          }),
        });
        return res.status(200).json(r[0]);
      }

      // ------------------------------------------------------
      default:
        return res.status(400).json({ error: `Unbekannte Aktion: ${action}` });
    }
  } catch (e) {
    console.error('[api/db] Error:', e);
    return res.status(500).json({ error: e.message });
  }
}
