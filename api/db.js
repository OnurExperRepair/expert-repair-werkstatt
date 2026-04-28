// Vercel Serverless Function — Datenbank-Operationen
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

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Supabase-Verbindung fehlt' });
  }

  try {
    const { action, ...payload } = req.body || {};

    switch (action) {
      case 'load_all': {
        const [customers, jobs, history, rejected] = await Promise.all([
          supabase('customers?order=created_at.desc'),
          supabase('jobs?order=created_at.desc'),
          supabase('job_history?order=created_at.desc'),
          supabase('rejected_diagnoses?order=created_at.desc'),
        ]);
        const jobsWithHistory = jobs.map(j => ({
          ...j,
          history: history.filter(h => h.job_id === j.id).map(h => ({
            status: h.status, note: h.note, at: new Date(h.created_at).getTime(),
          })),
        }));
        return res.status(200).json({ customers, jobs: jobsWithHistory, rejected });
      }

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

      case 'create_job': {
        let imageUrl = null;
        if (payload.imageBase64 && payload.imageMediaType) {
          const ext = payload.imageMediaType.split('/')[1] || 'jpg';
          const fileName = `before_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
          imageUrl = await uploadImage(payload.imageBase64, payload.imageMediaType, fileName);
        }

        const jobData = {
          customer_id: payload.customer_id,
          device: payload.device,
          issue_summary: payload.issue_summary,
          diagnosis_full: payload.diagnosis_full,
          price_estimate: payload.price_estimate,
          time_estimate: payload.time_estimate,
          status: 'eingegangen',
          before_image_url: imageUrl,
          after_image_url: null,
          notes: payload.notes || '',
          deposit: payload.deposit || 0,
          warranty_months: 6,
          warranty_until: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString(),
          functional_test: payload.functional_test || null,
          ai_warning: payload.ai_warning || null,
        };

        const j = await supabase('jobs', {
          method: 'POST',
          body: JSON.stringify(jobData),
        });

        await supabase('job_history', {
          method: 'POST',
          body: JSON.stringify({
            job_id: j[0].id,
            status: 'eingegangen',
            note: 'Auftrag angelegt',
          }),
        });

        return res.status(200).json(j[0]);
      }

      case 'update_job_status': {
        const { jobId, status, note } = payload;
        const j = await supabase(`jobs?id=eq.${jobId}`, {
          method: 'PATCH',
          body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
        });
        await supabase('job_history', {
          method: 'POST',
          body: JSON.stringify({ job_id: jobId, status, note: note || '' }),
        });
        return res.status(200).json(j[0]);
      }

      case 'update_job_notes': {
        const { jobId, notes } = payload;
        const j = await supabase(`jobs?id=eq.${jobId}`, {
          method: 'PATCH',
          body: JSON.stringify({ notes, updated_at: new Date().toISOString() }),
        });
        return res.status(200).json(j[0]);
      }

      case 'upload_after_image': {
        const { jobId, imageBase64, imageMediaType } = payload;
        const ext = imageMediaType.split('/')[1] || 'jpg';
        const fileName = `after_${jobId}_${Date.now()}.${ext}`;
        const imageUrl = await uploadImage(imageBase64, imageMediaType, fileName);
        const j = await supabase(`jobs?id=eq.${jobId}`, {
          method: 'PATCH',
          body: JSON.stringify({ after_image_url: imageUrl, updated_at: new Date().toISOString() }),
        });
        return res.status(200).json(j[0]);
      }

      case 'reject_diagnosis': {
        const { device, diagnosis, reason, customer_phone } = payload;
        const r = await supabase('rejected_diagnoses', {
          method: 'POST',
          body: JSON.stringify({ device, diagnosis, reason, customer_phone }),
        });
        return res.status(200).json(r[0]);
      }

      default:
        return res.status(400).json({ error: 'Unbekannte Aktion' });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
