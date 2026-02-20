"use client"
import { useState, useEffect } from "react";
import { Cards } from "nextra/components";

const normalize = (name, type) => {
  // 1 - name
  // 2 - version
  // 3 - date
  // 4 - arch
  const elements = name.split("-");

  return `Xinux ${elements[1]} ${elements[3]} ${type} (${elements[2]})`;
};

function Download({
  link,
  error = "Xatolik yuz berdi!",
  loading = "Yuklanmoqda...",
  empty = "Hali %t chiqarilmaganga o'xshaydi",
  type = "stabil",
}) {
  const [card, setCard] = useState(<Cards.Card title={loading} href="#" />);

  useEffect(() => {
    fetch(link)
      .then((res) => res.json())
      .then((json) => {
        if (json.length == 0) {
          setCard(<Cards.Card title={empty.replace("%t", type)} href="#" />);
        }

        const pick = json[0].name;

        setCard(
          <Cards.Card title={normalize(pick, type)} href={`${link}/${pick}`} />,
        );
      })
      .catch((_) => setCard(<Cards.Card title={error} href="#" />));
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
