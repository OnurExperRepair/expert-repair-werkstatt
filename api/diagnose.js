// Vercel Serverless Function — Diagnose
// Ruft Anthropic API mit Bild + Beschreibung auf, gibt strukturierte JSON-Diagnose zurück.
// SECURITY: Authentifiziert via x-shop-pin Header gegen app_settings-Tabelle.
// I18N: Wenn customer_lang gesetzt ist (und !== 'de'), gibt KI zusätzlich eine
//       Reparatur-Empfehlung in der Kundensprache zurück.

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
    const { imageBase64, mediaType, device, description, customer_lang } = req.body;
    if (!imageBase64 || !mediaType) return res.status(400).json({ error: 'Bild fehlt' });

    const langCode = customer_lang && LANG_NAMES[customer_lang] ? customer_lang : 'de';
    const langName = LANG_NAMES[langCode];
    const needsTranslation = langCode !== 'de';

    const translationField = needsTranslation
      ? `\n  "reparatur_empfehlung_kunde": "Die Reparatur-Empfehlung übersetzt auf ${langName}. Klar, höflich, kundenfreundlich. WICHTIG: Verwende echte ${langName}-Schrift/Buchstaben, KEINE Transliteration. Nicht zu technisch — der Kunde muss verstehen was gemacht wird und warum.",`
      : '';

    const translationInstruction = needsTranslation
      ? `\n\nWICHTIG ZU "reparatur_empfehlung_kunde": Schreibe diese Empfehlung in flüssigem ${langName} (echte Schrift). Erkläre dem Kunden in 1-2 Sätzen was repariert wird und ggf. warum. Höflich und kundenfreundlich. Beispiel-Stil auf Deutsch: "Wir empfehlen einen Display-Tausch inkl. Touch-Test." → bitte sinngemäß auf ${langName}.`
      : '';

    const prompt = `Du bist Diagnose-Assistent von "Expert Repair", Berlin. Analysiere das Bild.

WIR REPARIEREN:
- Smartphones (iPhone, Samsung, Xiaomi, Huawei, OnePlus, Google Pixel etc.)
- Tablets (iPad, Samsung Galaxy Tab, etc.)
- Smartwatches (Apple Watch, Samsung Galaxy Watch, etc.)
- Laptops & Notebooks (HP, Lenovo, Dell, Acer, ASUS, MSI, Microsoft Surface, Medion etc.)
- MacBooks (Air, Pro, alle Generationen)
- Spielkonsolen (PS4, PS5, Xbox One, Xbox Series X/S, Nintendo Switch, Steam Deck)

TYPISCHE REPARATUREN MIT BERLINER PREISEN:

Smartphones:
- Display-Tausch: iPhone 80-380€, Samsung 90-300€, andere 50-200€
- Akku: 50-100€
- Rückseite: 80-200€
- Ladebuchse: 60-100€

Tablets:
- Display: 100-400€
- Akku: 80-150€

Smartwatches:
- Display: 80-200€
- Akku: 60-120€

Laptops/MacBooks:
- Display: 150-500€
- Akku: 80-200€
- Tastatur: 100-300€
- Lüfter/Reinigung: 50-120€
- SSD-Tausch: 80-200€ + Teile

Konsolen:
- HDMI-Port: 80-150€
- Lüfter/Reinigung: 50-100€
- Controller: 30-80€

Antworte STRENG als JSON, keine Markdown-Blöcke, kein Text drumherum:

{
  "geraet_erkannt": "z.B. 'iPhone 13 Pro' oder 'HP Envy x360 (Laptop)' — sei spezifisch",
  "geraete_typ": "smartphone|tablet|smartwatch|laptop|macbook|konsole|andere",
  "schadensbild": "1-2 Sätze, was du im Bild siehst",
  "schaeden": [{"typ":"...","schwere":"leicht|mittel|schwer","details":"..."}],
  "reparatur_empfehlung": "1-2 Sätze auf Deutsch, was repariert werden sollte und warum",${translationField}
  "preis_min": Zahl,
  "preis_max": Zahl,
  "dauer": "z.B. '30-60 Min'",
  "datensicher": true|false,
  "datensicher_hinweis": "kurz",
  "hinweise": ["..."],
  "naechste_schritte": "1 Satz",
  "wirtschaftlich_sinnvoll": true|false,
  "wirtschaftlich_hinweis": "wenn nicht sinnvoll: warum",
  "funktionstest_eingeschraenkt": true|false,
  "nicht_pruefbar": ["Liste der Komponenten die wegen Schaden NICHT testbar sind"]
}

Bei Display-Totalschaden, Wasserschaden, Kurzschluss: funktionstest_eingeschraenkt=true.
Bei Akku-Tausch oder kleinen Display-Rissen mit funktionierendem Touch: false.${translationInstruction}

${device ? `\nGerätemodell laut Kunde: ${device}` : ''}
${description ? `\nKunde sagt: ${description}` : ''}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data: imageBase64 } },
            { type: 'text', text: prompt },
          ],
        }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return res.status(500).json({ error: `Anthropic API: ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (e) {
    console.error('[api/diagnose] Error:', e);
    return res.status(500).json({ error: e.message });
  }
}
