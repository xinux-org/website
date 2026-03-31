import nextra from 'nextra'

const BASE_PATH = process.env.BASE_PATH;

const withNextra = nextra({});

export default withNextra({
  output: "standalone",
  images: {
    unoptimized: true,
  },
  basePath: BASE_PATH || "",
  turbopack: {
    resolveAlias: {
      // https://nextra.site/docs/file-conventions/mdx-components-file
      'next-mdx-import-source-file': './mdx-components.jsx',
    },
  },
});
