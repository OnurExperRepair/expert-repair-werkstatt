-- ============================================================
-- EXPERT REPAIR · WERKSTATT-SYSTEM · DATENBANK-SCHEMA
-- ============================================================
-- Anleitung: 
-- 1. In Supabase einloggen
-- 2. Linkes Menü: "SQL Editor" → "New query"
-- 3. Diesen Code reinkopieren
-- 4. "Run" klicken (unten rechts)
-- 5. Sollte mit "Success. No rows returned" enden
-- ============================================================

-- KUNDEN
CREATE TABLE IF NOT EXISTS customers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  notes TEXT DEFAULT '',
  language TEXT DEFAULT 'de',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS customers_phone_idx ON customers(phone);
CREATE INDEX IF NOT EXISTS customers_name_idx ON customers(name);

-- AUFTRÄGE
CREATE TABLE IF NOT EXISTS jobs (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT REFERENCES customers(id) ON DELETE SET NULL,
  device TEXT NOT NULL,
  device_type TEXT,
  damage TEXT,
  repair TEXT,
  price_min INTEGER DEFAULT 0,
  price_max INTEGER DEFAULT 0,
  duration TEXT,
  deposit INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'eingegangen',
  technician_notes TEXT DEFAULT '',
  parts_notes TEXT DEFAULT '',
  image_url TEXT,
  image_after_url TEXT,
  diagnosis_data JSONB,
  warranty_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS jobs_customer_idx ON jobs(customer_id);
CREATE INDEX IF NOT EXISTS jobs_status_idx ON jobs(status);
CREATE INDEX IF NOT EXISTS jobs_created_idx ON jobs(created_at DESC);

-- HISTORIE (Status-Verlauf jedes Auftrags)
CREATE TABLE IF NOT EXISTS job_history (
  id BIGSERIAL PRIMARY KEY,
  job_id BIGINT REFERENCES jobs(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS job_history_job_idx ON job_history(job_id);

-- ABGELEHNTE DIAGNOSEN (Conversion-Tracking)
CREATE TABLE IF NOT EXISTS rejected_diagnoses (
  id BIGSERIAL PRIMARY KEY,
  customer_id BIGINT REFERENCES customers(id) ON DELETE SET NULL,
  device TEXT,
  repair TEXT,
  price_min INTEGER,
  price_max INTEGER,
  damage TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- STORAGE-BUCKET für Bilder
-- ============================================================
-- Wichtig: Auch das hier ausführen!

INSERT INTO storage.buckets (id, name, public)
VALUES ('repair-images', 'repair-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage-Policy: Jeder darf hochladen und lesen (App regelt Zugriff über Backend)
CREATE POLICY "Public read access for repair images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'repair-images');

CREATE POLICY "Authenticated upload for repair images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'repair-images');

-- ============================================================
-- ROW LEVEL SECURITY (RLS) - aus für Server-Zugriff
-- ============================================================
-- Wir greifen nur über das Backend (Service-Role-Key) zu, daher 
-- braucht die Datenbank keine zusätzlichen Berechtigungs-Regeln.

ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE jobs DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_history DISABLE ROW LEVEL SECURITY;
ALTER TABLE rejected_diagnoses DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- DEMO-DATEN (optional - kannst du auch weglassen)
-- ============================================================

INSERT INTO customers (name, phone, notes, language) VALUES
  ('Mehmet Demir', '+49 157 12345678', 'Stammkunde', 'tr'),
  ('Anna Schmidt', '+49 176 98765432', '', 'de'),
  ('Maria Petrova', '+49 151 88899977', '', 'ru')
ON CONFLICT DO NOTHING;

-- ============================================================
-- FERTIG! Du solltest jetzt 4 Tabellen haben.
-- Linkes Menü: "Table Editor" → siehst customers, jobs, etc.
-- ============================================================
