const HYDRA_BASE = "https://hydra.xinux.uz";

export async function GET(request, { params }) {
  const { path } = await params;
  const url = `${HYDRA_BASE}/${path.join("/")}`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  const data = await res.json();

  return Response.json(data);
}
