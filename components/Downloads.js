"use client";

import { Cards } from "nextra/components";
import { useEffect, useState } from "react";

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

async function fetchEvals(path) {
  const res = await fetch(`/api/hydra/${path}`, {
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
  const res = await fetch(`/api/hydra/build/${buildId}`, {
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

function Download({
  path,
  error = "Xatolik yuz berdi!",
  empty = "Hali %t chiqarilmaganga o'xshaydi",
  type = "stabil",
}) {
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const buildId = await fetchEvals(path);

        if (!buildId) {
          if (!cancelled) setState({ status: "empty" });
          return;
        }

        const result = await fetchBuild(buildId, type);

        if (!cancelled) {
          setState(
            result
              ? { status: "success", data: result }
              : { status: "error" },
          );
        }
      } catch {
        if (!cancelled) setState({ status: "error" });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [path, type]);

  if (state.status === "loading") {
    return (
      <Cards.Card icon={<DownloadIcon />} title="Yuklanmoqda..." href="#" />
    );
  }

  if (state.status === "empty") {
    return (
      <Cards.Card
        icon={<DownloadIcon />}
        title={empty.replace("%t", type)}
        href="#"
      />
    );
  }

  if (state.status === "error") {
    return (
      <Cards.Card
        icon={<DownloadIcon />}
        title={error}
        href="https://github.com/xinux-org/website/issues"
      />
    );
  }

  return (
    <Cards.Card
      icon={<DownloadIcon />}
      title={state.data.name}
      href={state.data.link}
    />
  );
}

export default function Downloads() {
  return (
    <Cards>
      <Download path="jobset/installer/stable/evals" />
      <Download path="jobset/installer/unstable/evals" type="nostabil" />
    </Cards>
  );
}
