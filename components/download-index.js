import { getPagesUnderRoute } from "nextra/context";
import Link from "next/link";
import { useRouter } from "next/router";

const ALPHA = {
  "en-US": {
    title: "Alpha",
    description:
      "In this channel, we release all our experimental features but with lots of bugs",
  },
  uz: {
    title: "Alfa",
    description:
      "Ushbu kanalda biz hamma sinalayotgan qulayliklarimizni chiqaramiz, ammo judayam ko'p xatoliklar ostida",
  },
  ru: {
    title: "Альфа",
    description:
      "На этом канале мы публикуем все наши экспериментальные функции, но с большим количеством ошибок",
  },
};

const BETA = {
  "en-US": {
    title: "Beta",
    description:
      "This channel includes many bug fixes for alpha channel but still experiences some issues",
  },
  uz: {
    title: "Beta",
    description:
      "Ushbu kanal alfa kanalidagi ko'plab xatoliklar to'g'irlangan ammo ba'zi muammolar hali ham mavjud",
  },
  ru: {
    title: "Бета",
    description:
      "Этот канал включает в себя множество исправлений ошибок для альфа-канала, но все еще испытывает некоторые проблемы",
  },
};

const STABLE = {
  "en-US": {
    title: "Stable",
    description: "Bug free channel that is ready for productive usage",
  },
  uz: {
    title: "Stabil",
    description:
      "Xatoliklar to'g'irlangan kanal, produktiv foydalanishga tayyor",
  },
  ru: {
    title: "Стабильный",
    description: "Канал без ошибок, готовый к продуктивному использованию",
  },
};

const Card = ({ channel, more }) => {
  const { locale, defaultLocale } = useRouter();

  const alphaText = (key) => ALPHA[locale]?.[key] ?? ALPHA[defaultLocale][key];

  const betaText = (key) => BETA[locale]?.[key] ?? BETA[defaultLocale][key];

  const stableText = (key) =>
    STABLE[locale]?.[key] ?? STABLE[defaultLocale][key];

  const linkToISO = (channel) => {
    switch (channel) {
      case "alpha":
        return "https://mirror.dc.uz/xinux/iso/alpha";
      case "beta":
        return "https://mirror.dc.uz/xinux/iso/";
      default:
        return "https://mirror.dc.uz/xinux/iso/";
    }
  };

  const langPicker = (channel) => {
    switch (channel) {
      case "alpha":
        return alphaText;
      case "beta":
        return betaText;
      default:
        return stableText;
    }
  };

  // Alias `<a>` to avoid it being replaced by MDX components.
  const A = "a";

  return (
    <div id={channel}>
      <h3>
        <Link href={linkToISO(channel)}>
          <A style={{ color: "inherit", textDecoration: "none" }}>
            {langPicker(channel)("title")}
          </A>
        </Link>
      </h3>
      <p className="opacity-80">
        {langPicker(channel)("description")}<br/>
        <Link href={linkToISO(channel)}>
          <A>{more + " →"}</A>
        </Link>
      </p>
    </div>
  );
};

export default function DownloadIndex({ more = "More" }) {
  return (
    <>
      <Card channel="alpha" more={more} />
      {/*<Card channel="beta" more={more} />*/}
      {/*<Card channel="stable" more={more} />*/}
    </>
  );
}
