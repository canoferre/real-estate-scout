export const onRequestPost = async (context) => {
  const env = context.env;

  const clientKey = context.request.headers.get("X-API-KEY");
  if (!clientKey || clientKey !== env.API_KEY) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  let items;
  try {
    items = await context.request.json();
    if (!Array.isArray(items)) {
      throw new Error("Payload must be an array");
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Invalid JSON", detail: err.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  let inserted = 0;

  for (const item of items) {
    try {
      const {
        title,
        price,
        area_m2,
        city,
        district,
        source,
        url,
      } = item;

      if (!title || !url) continue;

      await env.DB.prepare(
        `
        INSERT INTO offers (title, price, area_m2, city, district, source, url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `
      )
        .bind(
          String(title),
          price ?? null,
          area_m2 ?? null,
          city ?? null,
          district ?? null,
          source ?? null,
          String(url)
        )
        .run();

      inserted++;
    } catch (e) {
      console.error("Insert error:", e);
    }
  }

  return new Response(
    JSON.stringify({ ok: true, received: items.length, inserted }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
