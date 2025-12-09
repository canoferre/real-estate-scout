export interface Env {
  DB: D1Database;
  BACKEND_API_KEY: string;
}

interface IncomingListing {
  source?: string;
  listing_id?: string;
  title?: string;
  location?: string;
  city?: string | null;
  district?: string | null;
  price_eur?: number | null;
  size_m2?: number | null;
  url?: string;
  first_seen?: string;
}

export async function onRequestGet() {
  // za test v browserju
  return new Response("Ingest endpoint OK. Uporabi POST za pošiljanje oglasov.", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  const apiKey = request.headers.get("X-API-KEY");
  if (!apiKey || apiKey !== env.BACKEND_API_KEY) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const items: IncomingListing[] = Array.isArray(body) ? body : [body];

    if (!items.length) {
      return new Response(JSON.stringify({ inserted: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    let inserted = 0;

    for (const item of items) {
      if (!item.title || !item.url) continue;

      const title = item.title;
      const source = item.source ?? null;
      const city = item.city ?? null;
      const district = item.district ?? null;
      const price =
        typeof item.price_eur === "number"
          ? Math.round(item.price_eur)
          : null;
      const area_m2 =
        typeof item.size_m2 === "number"
          ? Math.round(item.size_m2)
          : null;
      const url = item.url;
      const created_at = item.first_seen ?? null;

      try:
        await env.DB.prepare(
          `
          INSERT OR IGNORE INTO offers
            (title, price, area_m2, city, district, source, url, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP))
        `,
        )
          .bind(title, price, area_m2, city, district, source, url, created_at)
          .run();

        inserted += 1
      } catch (e) {
        console.error("Insert error for URL:", url, e);
      }
    }

    return new Response(JSON.stringify({ inserted }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("ingest_listings error:", e);
    return new Response(
      JSON.stringify({ error: "Invalid JSON or DB error", details: String(e) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
