export async function onRequest(context) {
  return new Response(
    JSON.stringify({
      status: "ok",
      message: "Skavt backend je aktiven."
    }),
    {
      headers: { "Content-Type": "application/json" }
    }
  );
}
