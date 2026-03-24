"use client";

import { useState, useEffect } from "react";
import { Cards } from "nextra/components";

function Download({
  link,
  error = "Xatolik yuz berdi!",
  loading = "Yuklanmoqda...",
  empty = "Hali %t chiqarilmaganga o'xshaydi",
  type = "stabil",
}) {
  const [card, setCard] = useState(<Cards.Card title={loading} href="#" />);

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
      })
      .catch((_) => null);
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
        if (!json || !json?.nixname)
          return setCard(
            <Cards.Card title={empty.replace("%t", type)} href="#" />
          );

        const version = json?.nixname?.match(/([\d]+\.[\d]+)/)?.[0];

        const date = json?.nixname
          ?.match(/(\d{8})/)?.[0]
          ?.replace(/(\d{4})(\d{2})(\d{2})/, "$3.$2.$1");

        const system = json?.nixname?.match(/-([a-z\d_]+)-/)?.[1];

        const name = `Xinux ${version} ${system} ${type} (${date})`;

        const link = `https://hydra.xinux.uz/build/${buildId}/download/1/${json?.nixname}`;

        return { name, link };
      });
  };

  useEffect(() => {
    fetchEvals(link)
      .catch((_) => {
        console.log("Error fetching evals for the given link.");
        return setCard(<Cards.Card title={error} href="#" />);
      })
      .then(async (buildId) => {
        if (!buildId)
          return setCard(
            <Cards.Card title={empty.replace("%t", type)} href="#" />
          );

        return await fetchBuild(buildId)
          .then((res) => {
            if (!res) return setCard(<Cards.Card title={error} href="#" />);

            return setCard(
              <Cards.Card title={res?.name} href={`${res?.link}`} />
            );
          })
          .catch((_) => setCard(<Cards.Card title={error} href="#" />));
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
