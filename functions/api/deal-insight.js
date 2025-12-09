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
    const cfAccountId = env.CF_ACCOUNT_ID;
    const cfApiToken = env.CF_API_TOKEN;
    const cfModel = env.CF_AI_MODEL || '@cf/meta/llama-3-8b-instruct';
    const hfToken = env.HF_API_TOKEN;
    const hfModel = env.HF_MODEL || 'google/gemma-2-9b-it';

    const prompt = `Na kratko oceni, ali je nepremičnina dobra investicija. Uporabi slovenščino in odgovori v dveh kratkih stavkih z jedrnatim sklepom na koncu (DA/NE). Podatki: naslov: ${offer.title}, cena: ${offer.price} €, kvadratura: ${offer.area_m2} m², mesto: ${offer.city}, četrt: ${offer.district || '—'}, vir: ${offer.source}.`;

    if (!hfToken && (!cfAccountId || !cfApiToken)) {
      return new Response(
        JSON.stringify({
          error:
            'Manjkajo nastavitve za AI. Dodajte brezplačen HF_API_TOKEN (npr. za model google/gemma-2-9b-it) ali Cloudflare podatke.',
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    const summary = hfToken
      ? await getHuggingFaceInsight({ prompt, token: hfToken, model: hfModel })
      : await getCloudflareInsight({ prompt, accountId: cfAccountId, apiToken: cfApiToken, model: cfModel });

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

async function getCloudflareInsight({ prompt, accountId, apiToken, model }) {
  if (!accountId || !apiToken) {
    throw new Error('Manjkajo podatki za Cloudflare Workers AI (CF_ACCOUNT_ID ali CF_API_TOKEN).');
  }

  const aiResponse = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`
      },
      body: JSON.stringify({
        stream: false,
        messages: [
          {
            role: 'system',
            content:
              'Si nepremičninski analitik. Odgovarjaj jedrnato v slovenščini, poudari razmerje cena/m², lokacijo in vire tveganja. Zaključi s sklepom DA/NE.'
          },
          { role: 'user', content: prompt }
        ]
      })
    }
  );

  if (!aiResponse.ok) {
    const errorText = await aiResponse.text();
    throw new Error(`AI napaka: ${errorText}`);
  }

  const data = await aiResponse.json();
  return data?.result?.response?.trim();
}

async function getHuggingFaceInsight({ prompt, token, model }) {
  const aiResponse = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 180,
        temperature: 0.4,
        return_full_text: false
      }
    })
  });

  if (!aiResponse.ok) {
    const errorText = await aiResponse.text();
    throw new Error(`HF AI napaka: ${errorText}`);
  }

  const data = await aiResponse.json();
  const completion = Array.isArray(data) ? data[0]?.generated_text : data?.generated_text;
  return completion?.trim();
}
