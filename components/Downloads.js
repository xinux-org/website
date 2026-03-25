"use client";

import { useState, useEffect } from "react";
import { Cards } from "nextra/components";
import { releases } from "../data/releases";

function DownloadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

const normalize = (name, type) => {
  // 1 - name
  // 2 - version
  // 3 - date
  // 4 - arch
  const elements = name.split("-");
  const version = elements[1];
  const release = releases.find((r) => r.version === version);
  const codename = release ? ` (${release.codename})` : "";

  return `Xinux ${version}${codename} ${elements[3]} ${type} (${elements[2]})`;
};

function Download({
  link,
  error = "Xatolik yuz berdi!",
  loading = "Yuklanmoqda...",
  empty = "Hali %t chiqarilmaganga o'xshaydi",
  type = "stabil",
}) {
  const [card, setCard] = useState(<Cards.Card icon={<DownloadIcon />} title={loading} href="#" />);

  /** Fetch `evals` and return the first `build` id if available
   * @param {string} link - the API endpoint to fetch evals
   * @return null if no build is found, otherwise the first build id
   */
  const fetchEvals = async (link) => {
    return await fetch(link, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (
          "evals" in json &&
          json.evals.length > 0 &&
          "builds" in json.evals[0] &&
          json.evals[0].builds.length > 0
        ) {
          return json.evals[0].builds[0];
        }
        return null;
      });
  };
  /**
   * Fetch build details and return downloadable URL
   * @param {string} buildId - Build ID to fetch the build details
   */
  const fetchBuild = async (buildId) => {
    const buildURL = `https://hydra.xinux.uz/build/${buildId}`;
    return await fetch(buildURL, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json || !json?.nixname) return null;

        const version = json?.nixname?.match(/([\d]+\.[\d]+)/)?.[0];

        const date = json?.nixname
          ?.match(/(\d{8})/)?.[0]
          ?.replace(/(\d{4})(\d{2})(\d{2})/, "$3.$2.$1");

        const system = json?.nixname?.match(/-([a-z\d_]+)-/)?.[1];

        const name = `Xinux ${version} ${system} ${type} (${date})`;

        const downloadLink = `https://hydra.xinux.uz/build/${buildId}/download/1/${json?.nixname}`;

        return { name, link: downloadLink };
      });
  };

  useEffect(() => {
    fetchEvals(link).then(async (buildId) => {
      if (!buildId)
        return setCard(
          <Cards.Card icon={<DownloadIcon />} title={empty.replace("%t", type)} href="#" />
        );

      return await fetchBuild(buildId)
        .then((res) => {
          if (!res) return setCard(<Cards.Card icon={<DownloadIcon />} title={error} href="#" />);

          return setCard(
            <Cards.Card icon={<DownloadIcon />} title={res?.name} href={`${res?.link}`} />
          );
        })
        .catch((_) => setCard(<Cards.Card icon={<DownloadIcon />} title={error} href="#" />));
    });
  }, []);

  return card;
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
