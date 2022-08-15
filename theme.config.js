import Uzinfocom from "components/uzinfocom";
import { useRouter } from "next/router";

const Logo = ({ height }) => (
  <svg height={height} viewBox="0 0 725 435" fill="none">
    <path
      d="M217.212,144.807L181.016,108.611L217.22,0L289.628,72.408L289.627,72.409L362.026,144.808L362.022,144.813L434.429,217.22L362.022,289.628L362.026,289.632L289.627,362.032L289.628,362.033L217.22,434.44L144.812,362.033L217.212,289.633L217.211,289.632L289.616,217.228L289.604,217.216L289.612,217.208L217.211,144.808L217.212,144.807ZM434.44,72.412L506.832,0.021L543.036,108.632L506.832,144.836L506.829,144.833L434.439,217.224L506.838,289.623L579.238,217.222L651.646,289.63L579.238,362.037L579.237,362.035L506.836,434.436L434.428,362.028L434.428,362.028L362.03,289.63L434.437,217.224L362.03,144.817L434.438,72.41L434.44,72.412ZM72.406,289.613L0,217.206L108.611,181.003L144.815,217.206L144.795,217.226L217.202,289.632L144.794,362.04L72.387,289.632L72.406,289.613ZM615.456,181.012L724.068,217.216L651.66,289.623L579.253,217.216L615.456,181.012Z"
      fill="currentColor"
    />
  </svg>
);

const TITLE_WITH_TRANSLATIONS = {
  "en-US": "Uzbek Linux Community",
  ru: "Узбекское сообщество Linux",
  uz: "O'zbek Linux Hamjamiyati",
};

const FEEDBACK_LINK_WITH_TRANSLATIONS = {
  "en-US": "Question? Give us feedback →",
  ru: "Вопрос? Дайте нам обратную связь →",
  uz: "Savollar bormi? Shu yerda qoldiring →",
};

const DESCRIPTION_WITH_TRANSLATIONS = {
  "en-US": "Xinux is an Uzbek Linux community created by Uzbek Developers that focuses on influencing and improving Linux.",
  ru: "Xinux это узбекское Linux-сообщество, созданное узбекскими разработчиками, которое фокусируется на влиянии и улучшении Linux.",
  uz: "Xinux bu O'zbek Linux Hamjamiyati hisoblanib O'zbek dasturchilari davrasida Linux va uning komponentlarini rivojlantirish va targ'ib qilish bilan shug'ullanadi.",
}

export default {
  projectLink: "https://github.com/uzinfocom-org/xinux",
  docsRepositoryBase: "https://github.com/uzinfocom-org/docs/blob/main/pages",
  titleSuffix: " – Xinux",
  search: true,
  unstable_flexsearch: true,
  floatTOC: true,
  feedbackLink: () => {
    const { locale } = useRouter();
    return (
      FEEDBACK_LINK_WITH_TRANSLATIONS[locale] ||
      FEEDBACK_LINK_WITH_TRANSLATIONS["en-US"]
    );
  },
  feedbackLabels: "feedback",
  logo: () => {
    const { locale } = useRouter();
    return (
      <>
        <Logo height={16} />
        <span
          className="mx-2 font-extrabold hidden md:inline select-none"
          title={"Xinux: " + (TITLE_WITH_TRANSLATIONS[locale] || "")}
        >
          Xinux
        </span>
      </>
    );
  },
  head: ({ title, meta }) => {
    const { route, locale } = useRouter();

    const ogImage =
      meta.image ||
      `https://og.xinux.uz/api${
        /\/index\.+/.test(route) ? "" : "?title=" + encodeURIComponent(title)
      }`;

    return (
      <>
        {/* Favicons, meta */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content={
            meta.description ||
            DESCRIPTION_WITH_TRANSLATIONS[locale]
          }
        />
        <meta
          name="og:description"
          content={
            meta.description ||
            DESCRIPTION_WITH_TRANSLATIONS[locale]
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@uzinfocom" />
        <meta name="twitter:image" content={ogImage} />
        <meta
          name="og:title"
          content={title ? title + " – Xinux" : TITLE_WITH_TRANSLATIONS[locale]}
        />
        <meta name="og:image" content={ogImage} />
        <meta name="apple-mobile-web-app-title" content="Xinux" />
      </>
    );
  },
  footerEditLink: ({ locale }) => {
    switch (locale) {
      case "uz":
        return "GitHub da o'zgartirish →";
      case "ru":
        return "Редактировать на GitHub →";
      default:
        return "Edit this page on GitHub →";
    }
  },
  footerText: ({ locale }) => {
    switch (locale) {
      case "ru":
        return (
          <a
            href="https://oss.uzinfocom.uz"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-2">Работает на</span>
            <span className="mr-1">
              <Uzinfocom />
            </span>
          </a>
        );
      case "uz":
        return (
          <a
            href="https://oss.uzinfocom.uz"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-2">
              <Uzinfocom />
            </span>
            <span className="mr-2">tomonidan qo'llab quvvatlanadi</span>
          </a>
        );
      default:
        return (
          <a
            href="https://oss.uzinfocom.uz"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center no-underline text-current font-semibold"
          >
            <span className="mr-1">Powered by</span>
            <span className="mr-1">
              <Uzinfocom />
            </span>
          </a>
        );
    }
  },
  i18n: [
    { locale: "uz", text: "O'zbek" },
    { locale: "en-US", text: "English" },
    { locale: "ru", text: "Русский" },
  ],
};
