// TODO: Nastavi D1 binding z imenom "DB" v Cloudflare Pages nastavitvah

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json'
};

// PBKDF2 hashiranje gesla (Web Crypto API - kompatibilno s Cloudflare Workers)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const passwordData = encoder.encode(password);
  
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordData,
    'PBKDF2',
    false,
    ['deriveBits']
  );
  
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  );
  
  const hashArray = new Uint8Array(derivedBits);
  const combined = new Uint8Array(salt.length + hashArray.length);
  combined.set(salt);
  combined.set(hashArray, salt.length);
  
  return btoa(String.fromCharCode(...combined));
}

export async function onRequest({ request, env }) {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Metoda ni dovoljena' }),
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    // Preveri D1 binding
    if (!env.DB) {
      return new Response(
        JSON.stringify({ error: 'D1 baza ni povezana' }),
        { status: 500, headers: corsHeaders }
      );
    }

    const { email, password } = await request.json();

    // Validacija
    if (!email || !email.trim()) {
      return new Response(
        JSON.stringify({ error: 'E-poštni naslov je obvezen' }),
        { status: 400, headers: corsHeaders }
      );
    }

    if (!password || password.length < 6) {
      return new Response(
        JSON.stringify({ error: 'Geslo mora imeti vsaj 6 znakov' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Preveri email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Neveljaven e-poštni naslov' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Preveri, če uporabnik že obstaja
    const existingUser = await env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email.toLowerCase().trim()).first();

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Uporabnik s tem e-poštnim naslovom že obstaja' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Hashiraj geslo
    const passwordHash = await hashPassword(password);

    // Shrani uporabnika
    await env.DB.prepare(
      'INSERT INTO users (email, password_hash) VALUES (?, ?)'
    ).bind(email.toLowerCase().trim(), passwordHash).run();

    console.log(`Nov uporabnik registriran: ${email}`);

    return new Response(
      JSON.stringify({ success: true, message: 'Registracija uspešna' }),
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error('Napaka pri registraciji:', err);
    return new Response(
      JSON.stringify({ error: 'Napaka pri registraciji', details: String(err) }),
      { status: 500, headers: corsHeaders }
    );
  }
}
