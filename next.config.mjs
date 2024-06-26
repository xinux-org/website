import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  staticImage: true,
  latex: true,
  flexsearch: {
    codeblocks: false,
  },
  defaultShowCopyCode: true,
});

export default withNextra({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  rewrites: async () => [
    {
      source: "/download/latest",
      destination: "https://mirror.dc.uz/xinux/iso/",
    },
  ],
});
