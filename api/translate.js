// Vercel Serverless Function — Text-Übersetzung
// Nimmt deutschen Text + Zielsprache, gibt übersetzten Text zurück.
// Wird vom NewJobForm aufgerufen, wenn Mitarbeiter Sprache != 'de' wählt.

import crypto from 'crypto';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

const LANG_NAMES = {
  de: 'Deutsch',
  tr: 'Türkisch',
  en: 'Englisch',
  ar: 'Arabisch',
  ru: 'Russisch',
  bg: 'Bulgarisch',
  ro: 'Rumänisch',
  sq: 'Albanisch',
};

async function authenticate(req) {
  const pin = req.headers['x-shop-pin'];
  if (!pin) {
    const e = new Error('Auth fehlt'); e.statusCode = 401; throw e;
  }
  const hash = crypto.createHash('sha256').update(String(pin)).digest('hex');
  const url = `${SUPABASE_URL}/rest/v1/app_settings?pin_hash=eq.${encodeURIComponent(hash)}`;
  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
    },
  });
  if (!res.ok) {
    const e = new Error('Auth-Check fehlgeschlagen'); e.statusCode = 500; throw e;
  }
  const rows = await res.json();
  if (!rows || rows.length === 0) {
    const e = new Error('PIN ungültig'); e.statusCode = 401; throw e;
  }
  return rows[0].role;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Methode nicht erlaubt' });

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Supabase-Verbindung fehlt' });
  }

  try {
    await authenticate(req);
  } catch (e) {
    return res.status(e.statusCode || 401).json({ error: e.message });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY fehlt' });

  try {
    const { text, target_lang } = req.body;
    if (!text || !target_lang) return res.status(400).json({ error: 'text und target_lang erforderlich' });

    const langName = LANG_NAMES[target_lang];
    if (!langName) return res.status(400).json({ error: 'Unbekannte Sprache' });

    if (target_lang === 'de') {
      return res.status(200).json({ translated: text });
    }

    const prompt = `Übersetze folgenden deutschen Text über eine Handy-/Laptop-Reparatur ins ${langName}.

WICHTIG:
- Verwende echte ${langName}-Schrift/Buchstaben, KEINE Transliteration
- Höflich, kundenfreundlich, klar verständlich
- Nicht zu technisch — der Kunde muss verstehen was gemacht wird
- Antworte NUR mit der Übersetzung, kein Vor- oder Nachtext, keine Anführungszeichen drumherum

Deutscher Text:
${text}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return res.status(500).json({ error: `Anthropic API: ${response.status}` });
    }

    const data = await response.json();
    const translated = (data.content || [])
      .filter(c => c.type === 'text')
      .map(c => c.text)
      .join('')
      .trim();

    return res.status(200).json({ translated });
  } catch (e) {
    console.error('[api/translate] Error:', e);
    return res.status(500).json({ error: e.message });
  }
}
