const MODEL = "@cf/black-forest-labs/flux-1-schnell";

export async function onRequestPost({ request, env }) {
  if (!env.AI) {
    return Response.json(
      { error: "Image engine is not connected yet. Configure the Cloudflare AI binding first." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (prompt.length < 3) {
    return Response.json({ error: "Please enter a more detailed image description." }, { status: 400 });
  }
  if (prompt.length > 1200) {
    return Response.json({ error: "The prompt is too long. Keep it under 1,200 characters." }, { status: 400 });
  }

  try {
    const output = await env.AI.run(MODEL, {
      prompt,
      steps: 4,
    });

    if (!output || typeof output.image !== "string") {
      throw new Error("The model returned no image.");
    }

    const binary = atob(output.image);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

    return new Response(bytes, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return Response.json(
      { error: "Image generation failed. Please try again in a moment." },
      { status: 502 }
    );
  }
}

export async function onRequestGet() {
  return Response.json({
    name: "Berry AI Image Studio",
    status: "ready",
    model: MODEL,
    methods: ["POST"],
  });
}
