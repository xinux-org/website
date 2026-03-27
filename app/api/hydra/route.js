export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url || !url.startsWith("https://hydra.xinux.uz/")) {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  const data = await res.json();
  return Response.json(data);
}
