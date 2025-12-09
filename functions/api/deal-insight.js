const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

export async function onRequest({ request, env }) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await request.json().catch(() => null);

    if (!body || !body.offer) {
      return new Response(
        JSON.stringify({ error: 'Manjkajo podatki o oglasu za AI oceno.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const { offer } = body;
    const groqApiKey = env.GROQ_API_KEY;
    const groqModel = env.GROQ_MODEL || 'llama-3.3-70b-versatile';

    const prompt = `Na kratko oceni, ali je nepremičnina dobra investicija. Uporabi slovenščino in odgovori v dveh kratkih stavkih z jedrnatim sklepom na koncu (DA/NE). Podatki: naslov: ${offer.title}, cena: ${offer.price} €, kvadratura: ${offer.area_m2} m², mesto: ${offer.city}, četrt: ${offer.district || '—'}, vir: ${offer.source}.`;

    if (!groqApiKey) {
      return new Response(
        JSON.stringify({ error: 'Manjka ključ GROQ_API_KEY za AI oceno.' }),
        { status: 500, headers: corsHeaders }
      );
    }

    const summary = await getGroqInsight({ prompt, apiKey: groqApiKey, model: groqModel });

    if (!summary) {
      throw new Error('AI ni vrnil odgovora.');
    }

    return new Response(JSON.stringify({ summary }), { headers: corsHeaders });
  } catch (err) {
    console.error('Napaka pri AI oceni:', err);
    return new Response(
      JSON.stringify({ error: 'AI ocena trenutno ni na voljo, poskusite znova kasneje.' }),
      { status: 500, headers: corsHeaders }
    );
  }
}

async function getGroqInsight({ prompt, apiKey, model }) {
  const aiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 180,
      messages: [
        {
          role: 'system',
          content:
            'Si nepremičninski analitik. Odgovarjaj jedrnato v slovenščini, poudari razmerje cena/m², lokacijo in vire tveganja. Zaključi s sklepom DA/NE.'
        },
        { role: 'user', content: prompt }
      ]
    })
  });

  if (!aiResponse.ok) {
    const errorText = await aiResponse.text();
    throw new Error(`AI napaka: ${errorText}`);
  }

  const data = await aiResponse.json();
  return data?.choices?.[0]?.message?.content?.trim();
}
