// Vercel Serverless Function — Diagnose
// Empfängt Bild vom Frontend, ruft Anthropic API mit verstecktem Key auf

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Methode nicht erlaubt' });

  const requiredPin = process.env.SHOP_PIN;
  if (requiredPin && req.headers['x-shop-pin'] !== requiredPin) {
    return res.status(401).json({ error: 'PIN falsch' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY fehlt' });

  try {
    const { imageBase64, mediaType, device, description } = req.body;
    if (!imageBase64 || !mediaType) return res.status(400).json({ error: 'Bild fehlt' });

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

Laptops/MacBooks:
- Display-Tausch: 200-600€ (MacBook 350-700€)
- Tastatur: 80-200€ (MacBook 250-450€ wegen TopCase)
- Akku: 80-180€ (MacBook 120-280€)
- Lüfter-Reinigung & Wärmeleitpaste: 60-120€
- Wasserschaden-Diagnose: 80-150€ Pauschale (Reparatur extra)
- Mainboard-Reparatur: 150-450€

Konsolen:
- HDMI-Port: 80-150€
- Reinigung & Wärmeleitpaste: 60-100€
- Laufwerk-Tausch: 80-150€
- Joycon (Switch): 40-70€
- Controller-Stick-Drift: 40-80€

Kunde sagt:
- Gerät: ${device || 'nicht angegeben'}
- Beschreibung: ${description || 'keine'}

Antworte AUSSCHLIESSLICH als gültiges JSON, ohne Markdown-Codeblöcke:
{
  "geraet_erkannt": "präzise Bezeichnung",
  "geraete_typ": "smartphone|tablet|smartwatch|laptop|macbook|konsole",
  "vertrauen": "hoch|mittel|niedrig",
  "schadensbild": "1-2 Sätze",
  "schaeden": [{"typ":"...","schwere":"leicht|mittel|schwer","details":"..."}],
  "reparatur_empfehlung": "1-2 Sätze",
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
Bei Akku-Tausch oder kleinen Display-Rissen mit funktionierendem Touch: false.`;

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
      return res.status(response.status).json({ error: 'KI-Service nicht erreichbar' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: err.message || 'Unbekannter Fehler' });
  }
}

export const config = {
  api: { bodyParser: { sizeLimit: '15mb' } },
};
