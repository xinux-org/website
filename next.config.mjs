import nextra from 'nextra'
import remarkGemoji from 'remark-gemoji';

const BASE_PATH = process.env.BASE_PATH;
const PREFIX_PATH = "";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  mdxOptions: {
    remarkPlugins: [remarkGemoji],
  },
});

export default withNextra({
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: BASE_PATH || "",
});
