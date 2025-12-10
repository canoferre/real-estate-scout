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
  first_seen?: string; // "YYYY-MM-DD HH:MM:SS"
  image_url?: string | null; // 🔹 novo polje iz scraperja
}

/**
 * GET /api/ingest_listings
 * Samo za test v browserju, da vidiš, da endpoint obstaja.
 */
export async function onRequestGet() {
  return new Response(
    "Ingest endpoint OK. Pošlji POST z JSON arrayem oglasov iz scraperja.",
    {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );
}

/**
 * POST /api/ingest_listings
 * Pričakuje JSON array oglasov iz Python scraperja in jih zapiše v D1 tabelo `offers`.
 *
 * Tabela v D1 mora biti (primer):
 *
 * CREATE TABLE IF NOT EXISTS offers (
 *   id INTEGER PRIMARY KEY AUTOINCREMENT,
 *   title TEXT NOT NULL,
 *   price INTEGER,
 *   area_m2 INTEGER,
 *   city TEXT,
 *   district TEXT,
 *   source TEXT,
 *   url TEXT,
 *   img_url TEXT,                -- 🔹 NOV STOLPEC
 *   created_at TEXT DEFAULT CURRENT_TIMESTAMP
 * );
 *
 * CREATE UNIQUE INDEX IF NOT EXISTS idx_offers_url_unique ON offers(url);
 */
export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  // --- 1) Preveri API ključ ---
  const apiKey = request.headers.get("X-API-KEY");
  if (!apiKey || apiKey !== env.BACKEND_API_KEY) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // --- 2) Preberi JSON telo ---
    const body = await request.json();
    const items: IncomingListing[] = Array.isArray(body) ? body : [body];

    if (!items.length) {
      return new Response(JSON.stringify({ inserted: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    let insertedOrUpdated = 0;

    // Pripravimo UPSERT statement (posodobi, če URL že obstaja)
    const stmt = env.DB.prepare(
      `
      INSERT INTO offers
        (title, price, area_m2, city, district, source, url, img_url, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP))
      ON CONFLICT(url) DO UPDATE SET
        title    = excluded.title,
        price    = excluded.price,
        area_m2  = excluded.area_m2,
        city     = excluded.city,
        district = excluded.district,
        source   = excluded.source,
        img_url  = COALESCE(excluded.img_url, offers.img_url)
        -- created_at pustimo tak, kot je (čas prvega vnosa)
    `,
    );

    for (const item of items) {
      try {
        if (!item.title || !item.url) {
          continue;
        }

        const title = item.title;
        const source = item.source ?? null;
        const city = item.city ?? null;
        const district = item.district ?? null;

        // Python pošilja price_eur (float) → price (INTEGER)
        const price =
          typeof item.price_eur === "number"
            ? Math.round(item.price_eur)
            : null;

        // Python pošilja size_m2 (float) → area_m2 (INTEGER)
        const area_m2 =
          typeof item.size_m2 === "number"
            ? Math.round(item.size_m2)
            : null;

        const url = item.url;
        const created_at = item.first_seen ?? null;

        // 🔹 image_url iz scraperja → img_url v offers
        const img_url = item.image_url ?? null;

        await stmt
          .bind(
            title,
            price,
            area_m2,
            city,
            district,
            source,
            url,
            img_url,
            created_at,
          )
          .run();

        insertedOrUpdated += 1;
      } catch (e) {
        console.error("Insert/Upsert error for item/url:", item?.url, e);
        // nadaljuj z naslednjim oglasom
      }
    }

    return new Response(JSON.stringify({ processed: insertedOrUpdated }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("ingest_listings error:", e);
    return new Response(
      JSON.stringify({
        error: "Invalid JSON or DB error",
        details: String(e),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
