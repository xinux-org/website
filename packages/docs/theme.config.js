import Logo from "./components/Logo";
import { useConfig } from "nextra-theme-docs";

const OG_IMAGE_URL = "https://codesandbox.io/docs/projects/og-image.jpg";

export default {
  project: {},

  footer: { component: null },
  feedback: { content: null },

  search: {
    loading: "Yuklanmoqda...",
    error: "Qidiruvda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.",
    emptyResult: () => <span className="nx-block nx-select-none nx-p-8 nx-text-center nx-text-sm nx-text-gray-400">Hech narsa topilmadi</span>,
    placeholder: () => "Qidiruv...",
  },

  themeSwitch: {
    useOptions() {
      return {
        light: 'Yorqin',
        dark: 'Tungi',
        system: 'Tizim'
      }
    }
  },

  toc: {
    float: true,
    title: 'Ushbu sahifada'
  },

  editLink: {
    text: "Ushbu sahifani GitHub da to'g'irlash →",
    component: ({ children, className, filePath }) => (
      <a
        href={`https://github.com/xinux-org/website/blob/main/packages/docs/${filePath}`}
        className={className}
      >
        {children}
      </a>
    ),
  },

  sidebar: {
    titleComponent({ title, type }) {
      if (type === "separator") {
        return <span className="nextra-sidebar-separator">{title}</span>;
      }
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  gitTimestamp: null,
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Xinux",
    };
  },
  head() {
    const { frontMatter } = useConfig();

    return (
      <>
        {/* Favicons, meta */}
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content={
            frontMatter.description ||
            "NixOS va Xinux haqida yozilgan yordamchi ma'lumot va qo'llanmalar."
          }
        />
        <meta
          name="og:description"
          content={
            frontMatter.description ||
            "NixOS va Xinux haqida yozilgan yordamchi ma'lumot va qo'llanmalar."
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
        <meta
          name="og:title"
          content={
            frontMatter.title
              ? frontMatter.title + " – Xinux Uzbekistan"
              : "Xinux Documentation Website"
          }
        />
        <meta name="og:image" content={OG_IMAGE_URL} />
      </>
    );
  },
  logo: () => <Logo />,
};
