"use client";

import { Cards } from "nextra/components";
import { useState, useEffect } from "react";

function DownloadIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

async function hydraFetch(url) {
  const res = await fetch(`/api/hydra?url=${encodeURIComponent(url)}`);
  return res.json();
}

async function fetchEvals(link) {
  const json = await hydraFetch(link);

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
  const json = await hydraFetch(buildURL);

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

function Download({
  link,
  error = "Xatolik yuz berdi!",
  empty = "Hali %t chiqarilmaganga o'xshaydi",
  type = "stabil",
}) {
  const [state, setState] = useState({ loading: true, result: null, error: false });

  useEffect(() => {
    (async () => {
      try {
        const buildId = await fetchEvals(link);

        if (!buildId) {
          setState({ loading: false, result: null, error: false });
          return;
        }

        const result = await fetchBuild(buildId, type);

        if (!result) {
          setState({ loading: false, result: null, error: true });
          return;
        }

        setState({ loading: false, result, error: false });
      } catch {
        setState({ loading: false, result: null, error: true });
      }
    })();
  }, [link, type]);

  if (state.loading) {
    return <Cards.Card icon={<DownloadIcon />} title="Yuklanmoqda..." href="#" />;
  }

  if (state.error) {
    return <Cards.Card icon={<DownloadIcon />} title={error} href="https://github.com/xinux-org/website/issues" />;
  }

  if (!state.result) {
    return <Cards.Card icon={<DownloadIcon />} title={empty.replace("%t", type)} href="#" />;
  }

  return (
    <Cards.Card
      icon={<DownloadIcon />}
      title={state.result.name}
      href={state.result.link}
    />
  );
}

export default function Downloads() {
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
