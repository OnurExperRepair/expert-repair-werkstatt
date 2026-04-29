// Vercel Serverless Function — Auth & PIN-Verwaltung
// Stellt 3 Aktionen zur Verfügung:
//  • verify_pin     → prüft PIN, gibt Rolle zurück (mit Rate-Limit)
//  • change_pin     → ändert eine PIN (nur durch Chef-PIN autorisiert)
//  • list_pin_meta  → gibt zurück: welche Rolle wann zuletzt geändert (Chef-only, ohne PINs!)

import crypto from 'crypto';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

const MAX_FAILS = 5;
const LOCKOUT_MS = 60 * 1000; // 1 Minute

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

function sha256(input) {
  return crypto.createHash('sha256').update(String(input)).digest('hex');
}

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

async function checkRateLimit(ip) {
  const rows = await supabase(`auth_attempts?ip=eq.${encodeURIComponent(ip)}`);
  if (!rows || rows.length === 0) return { fail_count: 0 };
  const row = rows[0];
  if (row.locked_until && new Date(row.locked_until).getTime() > Date.now()) {
    const secLeft = Math.ceil((new Date(row.locked_until).getTime() - Date.now()) / 1000);
    const err = new Error(`Zu viele Falsch-Eingaben. Bitte ${secLeft}s warten.`);
    err.statusCode = 429;
    throw err;
  }
  return row;
}

async function recordFailedAttempt(ip, prev) {
  const newCount = (prev.fail_count || 0) + 1;
  const lockUntil = newCount >= MAX_FAILS
    ? new Date(Date.now() + LOCKOUT_MS).toISOString()
    : null;
  await supabase('auth_attempts', {
    method: 'POST',
    headers: { 'Prefer': 'resolution=merge-duplicates' },
    prefer: 'resolution=merge-duplicates',
    body: JSON.stringify({
      ip,
      fail_count: newCount,
      locked_until: lockUntil,
      last_attempt: new Date().toISOString(),
    }),
  });
  return { newCount, lockUntil };
}

async function clearAttempts(ip) {
  await supabase(`auth_attempts?ip=eq.${encodeURIComponent(ip)}`, { method: 'DELETE' });
}

async function getPinHashForRole(role) {
  const rows = await supabase(`app_settings?role=eq.${encodeURIComponent(role)}`);
  if (!rows || rows.length === 0) return null;
  return rows[0].pin_hash;
}

async function findRoleByPin(pinHash) {
  const rows = await supabase(`app_settings?pin_hash=eq.${encodeURIComponent(pinHash)}`);
  if (!rows || rows.length === 0) return null;
  return rows[0].role;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Supabase-Verbindung fehlt' });
  }

  const ip = getClientIp(req);
  const { action, ...payload } = req.body || {};

  try {
    if (action === 'verify_pin') {
      const pin = String(payload.pin || '');
      if (!/^\d{4,8}$/.test(pin)) {
        return res.status(400).json({ error: 'Ungültiges PIN-Format' });
      }

      const prev = await checkRateLimit(ip);
      const role = await findRoleByPin(sha256(pin));

      if (!role) {
        const { newCount, lockUntil } = await recordFailedAttempt(ip, prev);
        if (lockUntil) {
          return res.status(429).json({
            error: `Zu viele Falsch-Eingaben. Konto für 1 Minute gesperrt.`,
            locked_until: lockUntil,
          });
        }
        return res.status(401).json({
          error: 'Falscher PIN',
          remaining_attempts: MAX_FAILS - newCount,
        });
      }

      await clearAttempts(ip);
      return res.status(200).json({ role, pin });
    }

    if (action === 'change_pin') {
      const { chef_pin, target_role, new_pin } = payload;
      if (!chef_pin || !target_role || !new_pin) {
        return res.status(400).json({ error: 'Felder fehlen' });
      }
      if (!/^\d{6}$/.test(String(new_pin))) {
        return res.status(400).json({ error: 'Neuer PIN muss genau 6 Ziffern haben' });
      }
      if (!['tresen', 'techniker', 'chef'].includes(target_role)) {
        return res.status(400).json({ error: 'Unbekannte Rolle' });
      }

      await checkRateLimit(ip);
      const chefHash = await getPinHashForRole('chef');
      if (sha256(chef_pin) !== chefHash) {
        const prev = await checkRateLimit(ip);
        await recordFailedAttempt(ip, prev);
        return res.status(403).json({ error: 'Chef-PIN nicht korrekt' });
      }

      const newHash = sha256(new_pin);
      const conflict = await findRoleByPin(newHash);
      if (conflict && conflict !== target_role) {
        return res.status(409).json({
          error: `Diese PIN ist bereits in Verwendung (Rolle: ${conflict}). Bitte andere PIN wählen.`,
        });
      }

      await supabase(`app_settings?role=eq.${encodeURIComponent(target_role)}`, {
        method: 'PATCH',
        body: JSON.stringify({
          pin_hash: newHash,
          updated_by: 'chef',
        }),
      });

      await clearAttempts(ip);
      return res.status(200).json({ ok: true, role: target_role });
    }

    if (action === 'list_pin_meta') {
      const { chef_pin } = payload;
      if (!chef_pin) return res.status(400).json({ error: 'Chef-PIN fehlt' });

      const chefHash = await getPinHashForRole('chef');
      if (sha256(chef_pin) !== chefHash) {
        return res.status(403).json({ error: 'Chef-PIN nicht korrekt' });
      }

      const rows = await supabase('app_settings?select=role,updated_at,updated_by&order=role');
      return res.status(200).json({ entries: rows });
    }

    return res.status(400).json({ error: `Unbekannte Aktion: ${action}` });
  } catch (e) {
    console.error('[api/auth] Error:', e);
    const code = e.statusCode || 500;
    return res.status(code).json({ error: e.message });
  }
}
