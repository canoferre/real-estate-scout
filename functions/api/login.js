// TODO: Nastavi D1 binding z imenom "DB" v Cloudflare Pages nastavitvah
// TODO: Nastavi AUTH_SECRET environment variable v Cloudflare Pages nastavitvah

import { SignJWT } from 'jose';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json'
};

// Preveri geslo z PBKDF2
async function verifyPassword(password, storedHash) {
  try {
    const encoder = new TextEncoder();
    const combined = Uint8Array.from(atob(storedHash), c => c.charCodeAt(0));
    
    const salt = combined.slice(0, 16);
    const originalHash = combined.slice(16);
    
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
    
    const newHash = new Uint8Array(derivedBits);
    
    // Primerjaj hasha
    if (newHash.length !== originalHash.length) return false;
    for (let i = 0; i < newHash.length; i++) {
      if (newHash[i] !== originalHash[i]) return false;
    }
    return true;
  } catch (err) {
    console.error('Napaka pri preverjanju gesla:', err);
    return false;
  }
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
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'E-poštni naslov in geslo sta obvezna' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Poišči uporabnika
    const user = await env.DB.prepare(
      'SELECT id, email, password_hash FROM users WHERE email = ?'
    ).bind(email.toLowerCase().trim()).first();

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Napačen e-poštni naslov ali geslo' }),
        { status: 401, headers: corsHeaders }
      );
    }

    // Preveri geslo
    const isValidPassword = await verifyPassword(password, user.password_hash);

    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ error: 'Napačen e-poštni naslov ali geslo' }),
        { status: 401, headers: corsHeaders }
      );
    }

    // Generiraj JWT token
    const secret = env.AUTH_SECRET || 'default-secret-change-me';
    const secretKey = new TextEncoder().encode(secret);
    
    const token = await new SignJWT({ 
      userId: user.id, 
      email: user.email 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secretKey);

    console.log(`Uporabnik prijavljen: ${email}`);

    return new Response(
      JSON.stringify({ token, email: user.email }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error('Napaka pri prijavi:', err);
    return new Response(
      JSON.stringify({ error: 'Napaka pri prijavi', details: String(err) }),
      { status: 500, headers: corsHeaders }
    );
  }
}
