/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://xinux.uz/",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",

  transform: async (config, path) => {
    return {
      loc: path.replace(".uz-UZ", ""),
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};

module.exports = config;
