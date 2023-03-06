export async function onRequestPost(context) {
  const { request, env } = context;
  const token =
    env.OPENAI_API_KEY ||
    request.headers.get("Authorization").replace("Bearer ", "");

  return fetch(env.OPENAI_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: request.body,
  });
}

export async function onRequestOptions(context) {
  const { env } = context;
  if (!env.OPENAI_API_URL) return new Response("Not found", { status: 404 });
  const tokenProvided = env.OPENAI_API_KEY;
  const headers = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "POST",
    "access-control-allow-headers": "content-type",
  }
  if (!tokenProvided)
    headers["access-control-allow-headers"] += ", authorization";
  return new Response(null, { headers });
}
