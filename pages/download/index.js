import Page from "./content.mdx";

export async function getStaticProps() {
    const res = await fetch("https://cdn.xinux.uz/latest/");
    const data = await res.json();

    const latest = data
        .filter((i) => i.type === "file")
        .sort((a, b) => new Date(b.mtime) - new Date(a.mtime))[0];

    return {
        props: {
            latestName: latest.name,
            latestUrl: `https://cdn.xinux.uz/latest/${latest.name}`,
        },
    };
}

export default function Wrapper(props) {
    return <Page {...props} />;
}
