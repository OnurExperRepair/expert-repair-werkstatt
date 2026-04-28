const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

async function sb(path, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'apikey': SUPABASE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Supabase ${res.status}: ${errText}`);
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

  const { action, payload } = req.body || {};

  try {
    switch (action) {

      case 'load_all': {
        const [customers, jobs, history, rejected] = await Promise.all([
          sb('/customers?select=*&order=created_at.desc'),
          sb('/jobs?select=*&order=created_at.desc'),
          sb('/job_history?select=*&order=created_at.desc'),
          sb('/rejected_diagnoses?select=*&order=created_at.desc'),
        ]);
        return res.status(200).json({ customers, jobs, history, rejected });
      }

      case 'create_customer': {
        const { name, phone, language, isReturning } = payload;
        const result = await sb('/customers', {
          method: 'POST',
          body: JSON.stringify({ name, phone, language, is_returning: isReturning || false }),
        });
        return res.status(200).json(result[0]);
      }

      case 'create_job': {
        let imageUrl = payload.imageUrl || null;
        if (payload.imageBase64) {
          const fileName = `before_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.jpg`;
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

        const result = await sb('/jobs', {
          method: 'POST',
          body: JSON.stringify(jobData),
        });

        await sb('/job_history', {
          method: 'POST',
          body: JSON.stringify({
            job_id: result[0].id,
            status: 'eingegangen',
            note: 'Auftrag angelegt',
          }),
        });

        return res.status(200).json(result[0]);
      }

      case 'update_job_status': {
        const { jobId, status, note } = payload;
        const result = await sb(`/jobs?id=eq.${jobId}`, {
          method: 'PATCH',
          body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
        });
        await sb('/job_history', {
          method: 'POST',
          body: JSON.stringify({ job_id: jobId, status, note: note || '' }),
        });
        return res.status(200).json(result[0]);
      }

      case 'update_job_notes': {
        const { jobId, notes } = payload;
        const result = await sb(`/jobs?id=eq.${jobId}`, {
          method: 'PATCH',
          body: JSON.stringify({ notes, updated_at: new Date().toISOString() }),
        });
        return res.status(200).json(result[0]);
      }

      case 'upload_after_image': {
        const { jobId, imageBase64, imageMediaType } = payload;
        const fileName = `after_${jobId}_${Date.now()}.jpg`;
        const imageUrl = await uploadImage(imageBase64, imageMediaType, fileName);
        const result = await sb(`/jobs?id=eq.${jobId}`, {
          method: 'PATCH',
          body: JSON.stringify({ after_image_url: imageUrl, updated_at: new Date().toISOString() }),
        });
        return res.status(200).json(result[0]);
      }

      case 'reject_diagnosis': {
        const { device, diagnosis, reason, customer_phone } = payload;
        const result = await sb('/rejected_diagnoses', {
          method: 'POST',
          body: JSON.stringify({ device, diagnosis, reason, customer_phone }),
        });
        return res.status(200).json(result[0]);
      }

      default:
        return res.status(400).json({ error: 'Unbekannte Aktion' });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
