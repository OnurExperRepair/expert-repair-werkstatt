# Expert Repair · Werkstatt-System

Vollständige Cloud-App für die Werkstatt: KI-Diagnose, Auftragsverwaltung, Tracking-Link für Kunden, mehrsprachige WhatsApp-Templates, Annahmeschein-Druck.

## 👉 Starte mit `ANLEITUNG.md`

Dort steht alles Schritt für Schritt — was du anlegen musst, wo du klickst, was du wo einträgst.

## Datei-Struktur

```
expert-repair-v2/
├── ANLEITUNG.md         👈 Lies das zuerst!
├── README.md
├── package.json
├── vercel.json          → Vercel-Konfiguration
├── public/
│   ├── index.html       → Haupt-App (Werkstatt für Mitarbeiter)
│   ├── app.jsx          → React-App
│   ├── track.html       → Tracking-Seite für Kunden (öffentlich)
│   ├── manifest.json    → PWA-Manifest
│   ├── icon-192.png     → App-Icon
│   └── icon-512.png
├── api/
│   ├── diagnose.js      → KI-Diagnose-Endpunkt
│   ├── db.js            → Datenbank-Operationen
│   └── track.js         → Public Tracking
└── db/
    └── schema.sql       → Supabase-Schema
```

## Tech-Stack

- **Frontend:** Vanilla React (CDN), TailwindCSS (CDN), Babel-Standalone
- **Backend:** Vercel Serverless Functions (Node.js)
- **Datenbank:** Supabase (PostgreSQL + Storage)
- **KI:** Anthropic Claude API

## Environment-Variables (in Vercel zu setzen)

| Name | Pflicht | Beschreibung |
|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ | Key von console.anthropic.com |
| `SUPABASE_URL` | ✅ | Project URL aus Supabase |
| `SUPABASE_SERVICE_KEY` | ✅ | service_role Key (nicht anon!) |
| `SHOP_PIN` | optional | Globaler PIN für zusätzlichen Schutz |
