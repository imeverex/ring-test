export const runtime = 'nodejs';

export async function POST(request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return Response.json({ error: "API key not configured on server." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { metal, style, stone, vibe, details } = body;

  if (!metal || !style || !stone || !vibe) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  const prompt = buildPrompt(metal, style, stone, vibe, details);

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "hd",
        style: "natural",
        response_format: "b64_json",
      }),
    });

    const data = await openaiRes.json();

    if (!openaiRes.ok) {
      const msg = data?.error?.message || `OpenAI error ${openaiRes.status}`;
      return Response.json({ error: msg }, { status: openaiRes.status });
    }

    return Response.json({ b64: data.data[0].b64_json });
  } catch (err) {
    return Response.json({ error: "Failed to reach OpenAI: " + err.message }, { status: 502 });
  }
}

function buildPrompt(metal, style, stone, vibe, details) {
  let p = `A stunning professional jewelry photograph of a ${vibe} ${style} wedding ring made of ${metal}`;
  if (stone !== "no center stone") p += ` featuring a ${stone}`;
  if (details) p += `. Additional details: ${details}`;
  p += `. Shot on a pure white seamless background with soft studio lighting that highlights the craftsmanship and brilliance. Macro photography, ultra-sharp focus, photorealistic, luxurious jewelry photography style.`;
  return p;
}
