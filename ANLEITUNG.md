# 🚀 Expert Repair · Werkstatt-System · Deployment-Anleitung

**Geschätzte Zeit:** 30–45 Minuten
**Was du brauchst:**
- Computer (für die Konten-Anlage einfacher als Handy)
- Kreditkarte oder PayPal (nur für Anthropic-Konto)
- Email-Adresse
- Diese ZIP-Datei

---

## Was wird hier passieren?

Du legst **3 Konten** an (Anthropic, Supabase, Vercel), kopierst ein paar Codes hin und her, und am Ende hast du:

- Eine echte App-URL wie `expert-repair-werkstatt.vercel.app`
- Datenbank in der Cloud — alle Aufträge bleiben permanent gespeichert
- Mehrere Geräte können gleichzeitig damit arbeiten (Tresen-Tablet + Techniker-Handy + dein Handy synchron)
- App-Icon installierbar auf jedem Handy/Tablet
- Tracking-Link der echt für Kunden funktioniert

---

# TEIL 1 — Anthropic API-Key (KI-Diagnose) (5 Min)

1. Gehe zu **https://console.anthropic.com**
2. Klicke **"Sign up"** → mit Google anmelden ist am einfachsten
3. Email bestätigen
4. Klicke oben auf **"Plans & Billing"** → **Zahlungsmethode hinzufügen**
5. **WICHTIG: Spending-Limit setzen!**
   - Klicke links auf **"Limits"**
   - Setze **"Monthly spend limit"** auf z.B. **30 USD**
   - So kann nie mehr als das ausgegeben werden
6. Klicke links auf **"API Keys"** → **"Create Key"**
   - Name: `Expert Repair Werkstatt`
   - **Kopiere den Key** (beginnt mit `sk-ant-...`)
   - Speichere ihn z.B. in einer Notiz-App. **Du brauchst ihn gleich.**

> 💰 **Was kostet das?** Pro Diagnose ca. 2–4 Cent. Bei 100 Diagnosen/Monat = ~3 €. Bei 1000 = ~30 €.

---

# TEIL 2 — Supabase-Datenbank anlegen (10 Min)

Hier landen Aufträge, Kunden, Bilder.

1. Gehe zu **https://supabase.com**
2. **"Start your project"** → mit GitHub oder Email anmelden
3. Nach Login: **"New project"**
   - Organization: standardmäßig deine
   - Name: `expert-repair`
   - Database Password: **erfinde ein sicheres Passwort und speichere es!** (brauchst du nicht, aber es wird verlangt)
   - Region: **Frankfurt (EU Central)** — wichtig für DSGVO
   - Pricing Plan: **Free** auswählen
   - Klicke **"Create new project"**
4. Warte ca. 2 Minuten, bis das Projekt fertig ist (siehst grünen "Project ready" Hinweis)

### Tabellen anlegen

5. Linkes Menü: **"SQL Editor"** (Symbol: `</>`)
6. Klicke **"New query"** oben rechts
7. Öffne im ZIP die Datei **`db/schema.sql`** in einem Text-Editor (Notepad, TextEdit, VS Code, egal was)
8. Kopiere den gesamten Inhalt in das Supabase SQL-Editor-Fenster
9. Klicke unten rechts **"Run"** (oder Strg+Enter)
10. Sollte mit grünem Häkchen und "Success" enden
11. Linkes Menü: **"Table Editor"** → du siehst jetzt 4 Tabellen: `customers`, `jobs`, `job_history`, `rejected_diagnoses`

### Schlüssel kopieren

12. Linkes Menü: **"Project Settings"** (Zahnrad unten links)
13. Untermenü: **"API"**
14. Du siehst zwei wichtige Werte — **kopiere beide in deine Notiz-App:**
    - **Project URL** (oben, sieht aus wie `https://abcdefgh.supabase.co`)
    - **service_role key** (unter "Project API keys", **WICHTIG: nicht der "anon"-Key!** Klicke "Reveal" um ihn zu sehen)

> ⚠️ Der **service_role**-Key ist geheim. Niemals in den Browser oder öffentlichen Code packen. In Vercel ist er sicher.

---

# TEIL 3 — App auf Vercel deployen (10 Min)

1. Gehe zu **https://vercel.com/signup**
2. **"Continue with GitHub"** (oder Email)
3. Wähle **"Hobby"** Plan (kostenlos)
4. Du landest auf dem Dashboard

### Projekt anlegen

5. Klicke oben rechts **"Add New..."** → **"Project"**
6. Du siehst "Import Git Repository". **Ignoriere das.**
7. Scrolle nach **ganz unten**, finde **"Deploy a clone of an existing template"** ODER suche **"Browse all templates"**

> **Wenn Vercel keinen direkten Upload anbietet:** Geh zu **https://app.netlify.com/drop** stattdessen. Da kannst du den Ordner reinziehen und kommst zum gleichen Ergebnis. Anleitung dann sinngemäß gleich, ENV-Variablen setzt du unter "Site Settings" → "Environment variables".

8. **Alternative — der einfachste Weg:**
   - Gehe zu **https://vercel.com/new**
   - Wähle **"Other"** als Framework
   - Klicke auf **"Import Project"** Button und such nach **"Drag and drop"** Option
   - Falls nicht direkt sichtbar: nutze die Netlify-Variante (siehe oben)

### Wichtig: Vor "Deploy" — Environment Variables setzen

9. Bevor du auf "Deploy" klickst, scrolle zu **"Environment Variables"**
10. Füge **drei Variablen** hinzu:

| Name | Wert |
|---|---|
| `ANTHROPIC_API_KEY` | dein Key aus Teil 1 (`sk-ant-...`) |
| `SUPABASE_URL` | dein Project URL aus Teil 2 (`https://...supabase.co`) |
| `SUPABASE_SERVICE_KEY` | dein service_role-Key aus Teil 2 |

11. Optional — für Mitarbeiter-Schutz:
    - `SHOP_PIN` = `1111` (oder welcher PIN auch immer)
    - Dann muss vor Nutzung dieser PIN eingegeben werden (zusätzlich zu den Rollen-PINs)

12. Klicke **"Deploy"**
13. ~30 Sekunden warten, Konfetti 🎉
14. Du bekommst eine URL wie `https://expert-repair-werkstatt.vercel.app`

---

# TEIL 4 — Erster Test (3 Min)

1. Öffne die URL im Browser
2. PIN-Eingabe erscheint
3. Tippe `3333` (Chef) → du solltest die leere Werkstatt-Übersicht sehen
4. Klicke "Aufträge" → leere Liste (normal, noch keine Daten)
5. **Logout** (oben rechts), Login als Tresen `1111`
6. **"Neuer Auftrag"** → Foto irgendwas hochladen → KI sollte diagnostizieren
7. Kundendaten eingeben → "Auftrag anlegen"
8. Daten landen in Supabase! Du kannst das prüfen: Supabase → "Table Editor" → "jobs" → siehst deinen Auftrag

---

# TEIL 5 — App auf Shop-Geräten installieren (2 Min pro Gerät)

### iPhone / iPad
1. **Safari** öffnen (NICHT Chrome — Pflicht)
2. Deine URL eintippen
3. Teilen-Button (Quadrat mit Pfeil) → **"Zum Home-Bildschirm"**
4. Bestätigen → orangenes "ER"-Icon erscheint
5. Tippen → öffnet im Vollbild wie eine echte App

### Android
1. **Chrome** öffnen
2. URL eintippen
3. Drei Punkte oben rechts → **"App installieren"** oder **"Zum Startbildschirm hinzufügen"**

---

# 🎉 FERTIG!

Du hast jetzt:
- ✅ Echte URL die weltweit funktioniert
- ✅ Cloud-Datenbank, alle Daten sicher gespeichert
- ✅ Multi-Device-Sync (Tablet, Handy, Computer alles synchron)
- ✅ KI-Diagnose mit Spending-Limit
- ✅ Tracking-Link für Kunden
- ✅ Bilder werden in der Cloud gespeichert
- ✅ Auf jedem Shop-Gerät als App installierbar

---

# 🆘 Troubleshooting

**"Diagnose fehlgeschlagen"**
- Anthropic API-Key falsch? → Vercel "Settings" → "Environment Variables" prüfen
- Spending-Limit erreicht? → Anthropic "Plans & Billing"

**"Daten konnten nicht geladen werden"**
- Supabase URL oder Service-Key falsch? → Vercel Env-Variablen prüfen
- Supabase Tabellen nicht angelegt? → SQL nochmal ausführen

**"PIN vom Backend abgelehnt"**
- Du hast `SHOP_PIN` in Vercel gesetzt, aber den falschen PIN eingegeben
- Entweder richtigen PIN nehmen oder die `SHOP_PIN`-Variable in Vercel löschen

**Tracking-Link funktioniert nicht für Kunden**
- Im Browser-URL muss `/track?id=J123` stehen
- Bei Supabase prüfen ob der Auftrag wirklich existiert

**Mitarbeiter sehen alte Version**
- App neu laden, ggf. Browser-Cache leeren
- Bei iPhone/Safari: App vom Home-Screen löschen und neu hinzufügen

**Foto-Upload schlägt fehl**
- Supabase → "Storage" → muss ein Bucket "repair-images" geben
- Wenn nicht: SQL nochmal ausführen (im SQL-Editor)

---

# 📞 Kontakt

Wenn was nicht klappt: schreib mir mit Screenshot was du siehst, ich helfe Schritt für Schritt durch.
