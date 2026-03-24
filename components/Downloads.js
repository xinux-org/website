"use client"
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

  useEffect(() => {
    fetch(link)
      .then((res) => res.json())
      .then((json) => {
        if (json.length == 0) {
          setCard(<Cards.Card icon={<DownloadIcon />} title={empty.replace("%t", type)} href="#" />);
        }

        const pick = json[0].name;

        setCard(
          <Cards.Card icon={<DownloadIcon />} title={normalize(pick, type)} href={`${link}/${pick}`} />,
        );
      })
      .catch((_) => setCard(<Cards.Card icon={<DownloadIcon />} title={error} href="#" />));
  }, []);

  return card;
}

export default function Downloads({ title, link }) {
  return (
    <Cards>
      <Download link="https://cdn.xinux.uz/release" />
      <Download link="https://cdn.xinux.uz/latest" type="nostabil" />
    </Cards>
  );
}
