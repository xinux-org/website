const BASE_PATH = process.env.BASE_PATH;
const PREFIX_PATH = "";

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
});

module.exports = withNextra({
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: BASE_PATH || "",
  transpilePackages: ["../../shared-components"],
});
