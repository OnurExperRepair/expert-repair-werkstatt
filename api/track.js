// Vercel Serverless Function — Public Tracking
// Wird vom Tracking-Link aufgerufen, OHNE PIN (Kunden-Zugriff)

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

async function supabase(path) {
  const url = `${SUPABASE_URL}/rest/v1/${path}`;
  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
    },
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
  return res.json();
}

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'ID fehlt' });

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Service nicht konfiguriert' });
  }

  try {
    // Auftragsnummer kann mit "J" prefix kommen — entfernen
    const jobId = id.toString().replace(/^J/i, '');

    const jobs = await supabase(`jobs?id=eq.${jobId}&select=id,device,status,updated_at,customer_id`);
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ error: 'Auftrag nicht gefunden' });
    }

    const job = jobs[0];
    const customers = await supabase(`customers?id=eq.${job.customer_id}&select=name,language`);
    const customer = customers && customers[0] ? customers[0] : { name: 'Kunde', language: 'de' };

    return res.status(200).json({
      id: job.id,
      device: job.device,
      status: job.status,
      updated_at: job.updated_at,
      customer_first_name: customer.name.split(' ')[0],
      language: customer.language || 'de',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server-Fehler' });
  }
}
