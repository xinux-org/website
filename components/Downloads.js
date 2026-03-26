import { Cards } from "nextra/components";

function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

async function fetchEvals(link) {
  const res = await fetch(link, {
    headers: { Accept: "application/json" },
  });
  const json = await res.json();

  if (
    "evals" in json &&
    json.evals.length > 0 &&
    "builds" in json.evals[0] &&
    json.evals[0].builds.length > 0
  ) {
    return json.evals[0].builds[0];
  }
  return null;
}

async function fetchBuild(buildId, type) {
  const buildURL = `https://hydra.xinux.uz/build/${buildId}`;
  const res = await fetch(buildURL, {
    headers: { Accept: "application/json" },
  });
  const json = await res.json();

  if (!json || !json?.nixname) return null;

  const version = json?.nixname?.match(/([\d]+\.[\d]+)/)?.[0];
  const date = json?.nixname
    ?.match(/(\d{8})/)?.[0]
    ?.replace(/(\d{4})(\d{2})(\d{2})/, "$3.$2.$1");
  const system = json?.nixname?.match(/-([a-z\d_]+)-/)?.[1];

  const name = `Xinux ${version} ${system} ${type} (${date})`;
  const link = `https://hydra.xinux.uz/build/${buildId}/download/1/${json?.nixname}`;

  return { name, link };
}

async function Download({
  link,
  error = "Xatolik yuz berdi!",
  empty = "Hali %t chiqarilmaganga o'xshaydi",
  type = "stabil",
}) {
  try {
    const buildId = await fetchEvals(link);

    if (!buildId) {
      return <Cards.Card icon={<DownloadIcon />} title={empty.replace("%t", type)} href="#" />;
    }

    const result = await fetchBuild(buildId, type);

    if (!result) {
      return <Cards.Card icon={<DownloadIcon />} title={error} href="#" />;
    }

    return <Cards.Card icon={<DownloadIcon />} title={result.name} href={result.link} />;
  } catch {
    return <Cards.Card icon={<DownloadIcon />} title={error} href="#" />;
  }
}

export default async function Downloads() {
  return (
    <Cards>
      <Download link="https://hydra.xinux.uz/jobset/installer/stable/evals" />
      <Download
        link="https://hydra.xinux.uz/jobset/installer/unstable/evals"
        type="nostabil"
      />
    </Cards>
  );
}
