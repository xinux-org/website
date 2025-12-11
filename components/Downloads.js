import { useState, useEffect } from "react";
import { Cards, Card } from "nextra/components";

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
  type = "reliz",
}) {
  const [card, setCard] = useState(<Card title={loading} href="#" />);

  useEffect(() => {
    fetch(link)
      .then((res) => res.json())
      .then((json) => {
        if (json.length == 0) {
          setCard(<Card title={empty.replace("%t", type)} href="#" />);
        }

        const pick = json[0].name;

        setCard(
          <Card title={normalize(pick, type)} href={`${link}/${pick}`} />,
        );
      })
      .catch((_) => setCard(<Card title={error} href="#" />));
  }, []);

  return card;
}

export default function Downloads({ title, link }) {
  return (
    <Cards>
      <Download link="https://cdn.xinux.uz/release" />
      <Download link="https://cdn.xinux.uz/latest" type="test" />
    </Cards>
  );
}
