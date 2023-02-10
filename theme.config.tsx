import type { DocsThemeConfig } from "nextra-theme-docs";
import { useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

const logo = (
  <span>
    <svg
      height="20"
      viewBox="0 0 2648.52 615.52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 335.35l140.08 -46.7 46.7 46.7 -0.03 0.02 93.38 93.39 -93.38 93.39 -93.39 -93.39 0.03 -0.03 -93.39 -93.38zm466.93 93.41l0 0 93.38 93.38 0 0 93.38 93.38 93.38 -93.38 0 0 93.39 -93.38 -93.39 -93.39 -93.38 93.37 0 0 0 0 -93.37 -93.37 93.36 -93.37 0 0.01 46.7 -46.69 -46.7 -140.09 -93.36 93.37 -0.01 0 -93.38 93.38 93.38 93.39 -93.38 93.39zm326.85 -140.1l0 0 140.08 46.7 -93.38 93.39 -93.39 -93.39 46.69 -46.7zm-420.26 46.7l0 0 0.01 0.01 -93.38 93.39 0 0 -93.38 93.37 93.39 93.39 93.39 -93.39 0 0 93.37 -93.37 0 -0.01 93.38 -93.38 -93.39 -93.39 0.01 -0.01 -93.37 -93.38 0 0 -93.39 -93.38 -46.7 140.08 46.69 46.68 0 0 93.38 93.38 -0.01 0.01z"
        fill="currentColor"
      />
        <path
            d="M1208.92 246.93l59.77 -106.07 101.46 0 -101.13 174.05 105.4 181.25 -101.79 0 -63.38 -111.64 -63.04 111.64 -102.14 0 105.43 -181.25 -100.83 -174.05 101.81 0 58.44 106.07zm307.03 249.23l0 0 -95.22 0 0 -355.3 95.22 0 0 355.3zm-100.81 -447.23l0 0c0,-14.25 4.72,-25.95 14.13,-35.14 9.63,-9.2 22.66,-13.79 39.06,-13.79 16.22,0 29.13,4.59 38.75,13.79 9.64,9.19 14.46,20.89 14.46,35.14 0,14.43 -4.92,26.26 -14.79,35.46 -9.62,9.18 -22.43,13.79 -38.42,13.79 -15.98,0 -28.89,-4.61 -38.73,-13.79 -9.64,-9.2 -14.46,-21.03 -14.46,-35.46zm266.64 91.93l0 0 2.95 41.04c25.4,-31.74 59.45,-47.62 102.12,-47.62 37.67,0 65.68,11.06 84.08,33.18 18.38,22.1 27.8,55.16 28.24,99.18l0 229.52 -94.91 0 0 -227.24c0,-20.14 -4.37,-34.7 -13.14,-43.67 -8.74,-9.19 -23.3,-13.79 -43.67,-13.79 -26.7,0 -46.74,11.38 -60.08,34.16l0 250.54 -94.9 0 0 -355.3 89.31 0zm502.41 319.19l0 0c-23.41,28.45 -55.82,42.68 -97.2,42.68 -38.09,0 -67.21,-10.94 -87.35,-32.84 -19.91,-21.9 -30.09,-53.97 -30.53,-96.21l0 -232.82 94.9 0 0 229.53c0,36.99 16.85,55.5 50.56,55.5 32.2,0 54.3,-11.18 66.35,-33.5l0 -251.53 95.21 0 0 355.3 -89.31 0 -2.63 -36.11zm298.83 -213.12l0 0 59.75 -106.07 101.48 0 -101.16 174.05 105.43 181.25 -101.81 0 -63.37 -111.64 -63.06 111.64 -102.11 0 105.4 -181.25 -100.81 -174.05 101.79 0 58.47 106.07z"
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
    placeholder: "Dokumentatsiyadan qidirish",
  },
  toc: {
    title: "Ushbu sahifada",
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
        ? "https://xinux.uz/og.png"
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
