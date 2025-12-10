// TODO: Nastavi D1 binding z imenom "DB" v Cloudflare Pages nastavitvah
// Settings → Functions → D1 database bindings → Variable name: DB

export async function onRequest({ env, request }) {
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

    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('q')?.trim().toLowerCase();

    // Pick only one (latest) row per listing. Some imports lack a URL, so we also fall back to a normalized
    // title/city/district key to avoid duplicates that would otherwise render multiple cards for the same listing
    // on the dashboard.
    const params = [];
    const baseWhere = searchTerm
      ? `WHERE LOWER(title || ' ' || city || ' ' || district || ' ' || source) LIKE ?`
      : '';

    if (searchTerm) {
      params.push(`%${searchTerm}%`);
    }

    const query = `WITH ranked_offers AS (
                     SELECT id, title, price, area_m2, city, district, source, url, img_url, created_at,
                            COALESCE(NULLIF(LOWER(TRIM(url)), ''), LOWER(TRIM(title || '|' || city || '|' || COALESCE(district, '')))) AS dedupe_key,
                            ROW_NUMBER() OVER (PARTITION BY COALESCE(NULLIF(LOWER(TRIM(url)), ''), LOWER(TRIM(title || '|' || city || '|' || COALESCE(district, ''))))
                                               ORDER BY datetime(created_at) DESC, id DESC) AS row_num
                     FROM offers
                     ${baseWhere}
                   )
                   SELECT id, title, price, area_m2, city, district, source, url, img_url, created_at
                   FROM ranked_offers
                   WHERE row_num = 1
                   ORDER BY datetime(created_at) DESC`;

    const statement = params.length ? env.DB.prepare(query).bind(...params) : env.DB.prepare(query);

    const { results } = await statement.all();

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
