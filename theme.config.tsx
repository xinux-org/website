import type { DocsThemeConfig } from "nextra-theme-docs";
import { useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

const logo = (
  <span>
    <svg
      height="20"
      viewBox="0 0 725 435"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M217.212,144.807L181.016,108.611L217.22,0L289.628,72.408L289.627,72.409L362.026,144.808L362.022,144.813L434.429,217.22L362.022,289.628L362.026,289.632L289.627,362.032L289.628,362.033L217.22,434.44L144.812,362.033L217.212,289.633L217.211,289.632L289.616,217.228L289.604,217.216L289.612,217.208L217.211,144.808L217.212,144.807ZM434.44,72.412L506.832,0.021L543.036,108.632L506.832,144.836L506.829,144.833L434.439,217.224L506.838,289.623L579.238,217.222L651.646,289.63L579.238,362.037L579.237,362.035L506.836,434.436L434.428,362.028L434.428,362.028L362.03,289.63L434.437,217.224L362.03,144.817L434.438,72.41L434.44,72.412ZM72.406,289.613L0,217.206L108.611,181.003L144.815,217.206L144.795,217.226L217.202,289.632L144.794,362.04L72.387,289.632L72.406,289.613ZM615.456,181.012L724.068,217.216L651.66,289.623L579.253,217.216L615.456,181.012Z"
        fill="currentColor"
      />
    </svg>
    <style jsx>{`
      span {
        padding: 0.5rem 0.5rem 0.5rem 0;
        mask-image: linear-gradient(
          60deg,
          black 25%,
          rgba(0, 0, 0, 0.2) 50%,
          black 75%
        );
        mask-size: 400%;
        mask-position: 0%;
      }
      span:hover {
        mask-position: 100%;
        transition: mask-position 1s ease, -webkit-mask-position 1s ease;
      }
    `}</style>
  </span>
);

const config: DocsThemeConfig = {
  project: {
    link: "https://github.com/uzinfocom-org/xinux",
  },
  search: {
    emptyResult: "Hech narsa topilmadi",
    loading: "Qidirilmoqda...",
    placeholder: "Dokumentatsiyadan qidirish"
  },
  toc: {
    title: "Ushbu sahifada",
  },
  darkMode: {

  },
  docsRepositoryBase:
    "https://github.com/uzinfocom-org/xinux-docs/tree/main/docs",
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – Xinux",
      };
    }
  },
  logo,
  head: function useHead() {
    const { title } = useConfig();
    const { route } = useRouter();
    const socialCard =
      route === "/" || !title
        ? "https://xinux.uz/og.jpeg"
        : `https://xinux.uz/api/og?title=${title}`;

    return (
      <>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content="O'zbek dasturchilari tomonidan qo'llab quvvatlanadigan Linux hamjamiyati."
        />
        <meta
          name="og:description"
          content="O'zbek dasturchilari tomonidan qo'llab quvvatlanadigan Linux hamjamiyati."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialCard} />
        <meta name="twitter:site:domain" content="xinux.uz" />
        <meta name="twitter:url" content="https://xinux.uz" />
        <meta name="og:title" content={title ? title + " – Xinux" : "Xinux"} />
        <meta name="og:image" content={socialCard} />
        <meta name="apple-mobile-web-app-title" content="Xinux" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link
          rel="icon"
          href="/favicon-dark.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          href="/favicon-dark.png"
          type="image/png"
          media="(prefers-color-scheme: dark)"
        />
      </>
    );
  },
  // banner: {
  //   key: '2.0-release',
  //   text: (
  //     <a href="https://github.com/uzinfocom-org/xinux/releases" target="_blank" rel="noreferrer">
  //       🎉 Xinux v4.0 chiqdi. Ba'tafsil →
  //     </a>
  //   )
  // },
  editLink: {
    text: "GitHub da o'zgartirish kiritish →",
  },
  feedback: {
    content: "Savollar? Bizga xat qoldiring →",
    labels: "feedback",
  },
  sidebar: {
    titleComponent({ title, type }) {
      if (type === "separator") {
        return <span className="cursor-default">{title}</span>;
      }
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <div>
          <a
            className="flex items-center gap-1 text-current"
            target="_blank"
            rel="noopener noreferrer"
            title="oss.uzinfocom.uz web sahifasi"
            href="https://oss.uzinfocom.uz"
          >
            <svg height={20} viewBox="0 0 283 64" fill="none">
              <title>Uzinfocom Open Source</title>
              <path
                fill="currentColor"
                d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
              />
            </svg>
            <span> olib boradi.</span>
          </a>
        </div>
        <p className="mt-6 text-xs">
          © 2020-{new Date().getFullYear()} Xinux Hamjamiyati.
        </p>
      </div>
    ),
  },
};

export default config;
