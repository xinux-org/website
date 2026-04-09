const MAX_RETRIES = 3;

const cache = new Map();

async function fetchWithRetry(url) {
  for (let i = 0; i < MAX_RETRIES; i++) {
    const res = await fetch(url);
    if (res.ok) return res.text();
  }
  return null;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response("Missing url parameter", { status: 400 });
  }

  try {
    new URL(url);
  } catch {
    return new Response("Invalid URL", { status: 400 });
  }

  if (cache.has(url)) {
    return new Response(cache.get(url), {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  }

  const svg = await fetchWithRetry(url);

  if (!svg) {
    return new Response("Icon not found", { status: 404 });
  }

  cache.set(url, svg);

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
