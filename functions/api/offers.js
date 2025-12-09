// TODO: Nastavi D1 binding z imenom "DB" v Cloudflare Pages nastavitvah
// Settings → Functions → D1 database bindings → Variable name: DB

export async function onRequest({ env }) {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Content-Type': 'application/json'
  };

  try {
    // Preveri, če je D1 binding nastavljen
    if (!env.DB) {
      console.error('D1 binding "DB" ni nastavljen');
      return new Response(
        JSON.stringify({
          error: 'D1 baza ni povezana',
          details: 'Prosimo, nastavite D1 binding z imenom "DB" v Cloudflare Pages nastavitvah.'
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    const { results } = await env.DB.prepare(
      `SELECT id, title, price, area_m2, city, district, source, url, created_at
       FROM offers
       ORDER BY datetime(created_at) DESC
       LIMIT 400`
    ).all();

    console.log(`Uspešno pridobljenih ${results.length} oglasov iz D1`);

    return new Response(JSON.stringify(results), {
      headers: corsHeaders
    });
  } catch (err) {
    console.error('Napaka pri branju iz D1:', err);
    return new Response(
      JSON.stringify({
        error: 'Napaka pri branju iz D1 baze',
        details: String(err)
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}
