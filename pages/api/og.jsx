/* eslint-env node */
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

const font = fetch(new URL("./Inter-SemiBold.otf", import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

const og = async (req) => {
  const inter = await font;

  const { searchParams } = new URL(req.url);

  // ?title=<title>
  const hasTitle = searchParams.has("title");
  const title = hasTitle
    ? searchParams.get("title")?.slice(0, 100)
    : "Xinux Hamjamiyati";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 80,
          backgroundColor: "#030303",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          backgroundPosition: "-30px -10px",
          fontWeight: 600,
          color: "white",
        }}
      >
        <svg
          style={{ position: "absolute", top: 70, left: 80 }}
          height="40"
          viewBox="0 0 2648.52 615.52"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 335.35l140.08 -46.7 46.7 46.7 -0.03 0.02 93.38 93.39 -93.38 93.39 -93.39 -93.39 0.03 -0.03 -93.39 -93.38zm466.93 93.41l0 0 93.38 93.38 0 0 93.38 93.38 93.38 -93.38 0 0 93.39 -93.38 -93.39 -93.39 -93.38 93.37 0 0 0 0 -93.37 -93.37 93.36 -93.37 0 0.01 46.7 -46.69 -46.7 -140.09 -93.36 93.37 -0.01 0 -93.38 93.38 93.38 93.39 -93.38 93.39zm326.85 -140.1l0 0 140.08 46.7 -93.38 93.39 -93.39 -93.39 46.69 -46.7zm-420.26 46.7l0 0 0.01 0.01 -93.38 93.39 0 0 -93.38 93.37 93.39 93.39 93.39 -93.39 0 0 93.37 -93.37 0 -0.01 93.38 -93.38 -93.39 -93.39 0.01 -0.01 -93.37 -93.38 0 0 -93.39 -93.38 -46.7 140.08 46.69 46.68 0 0 93.38 93.38 -0.01 0.01z"
            fill="white"
          />
          <path
            d="M1208.92 246.93l59.77 -106.07 101.46 0 -101.13 174.05 105.4 181.25 -101.79 0 -63.38 -111.64 -63.04 111.64 -102.14 0 105.43 -181.25 -100.83 -174.05 101.81 0 58.44 106.07zm307.03 249.23l0 0 -95.22 0 0 -355.3 95.22 0 0 355.3zm-100.81 -447.23l0 0c0,-14.25 4.72,-25.95 14.13,-35.14 9.63,-9.2 22.66,-13.79 39.06,-13.79 16.22,0 29.13,4.59 38.75,13.79 9.64,9.19 14.46,20.89 14.46,35.14 0,14.43 -4.92,26.26 -14.79,35.46 -9.62,9.18 -22.43,13.79 -38.42,13.79 -15.98,0 -28.89,-4.61 -38.73,-13.79 -9.64,-9.2 -14.46,-21.03 -14.46,-35.46zm266.64 91.93l0 0 2.95 41.04c25.4,-31.74 59.45,-47.62 102.12,-47.62 37.67,0 65.68,11.06 84.08,33.18 18.38,22.1 27.8,55.16 28.24,99.18l0 229.52 -94.91 0 0 -227.24c0,-20.14 -4.37,-34.7 -13.14,-43.67 -8.74,-9.19 -23.3,-13.79 -43.67,-13.79 -26.7,0 -46.74,11.38 -60.08,34.16l0 250.54 -94.9 0 0 -355.3 89.31 0zm502.41 319.19l0 0c-23.41,28.45 -55.82,42.68 -97.2,42.68 -38.09,0 -67.21,-10.94 -87.35,-32.84 -19.91,-21.9 -30.09,-53.97 -30.53,-96.21l0 -232.82 94.9 0 0 229.53c0,36.99 16.85,55.5 50.56,55.5 32.2,0 54.3,-11.18 66.35,-33.5l0 -251.53 95.21 0 0 355.3 -89.31 0 -2.63 -36.11zm298.83 -213.12l0 0 59.75 -106.07 101.48 0 -101.16 174.05 105.43 181.25 -101.81 0 -63.37 -111.64 -63.06 111.64 -102.11 0 105.4 -181.25 -100.81 -174.05 101.79 0 58.47 106.07z"
            fill="white"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        <p
          style={{
            position: "absolute",
            bottom: 70,
            left: 80,
            margin: 0,
            fontSize: 30,
            letterSpacing: -1,
          }}
        >
          O&apos;zbek Linux jamiyatini biz bilan birga rivojlantiring!
        </p>
        <h1
          style={{
            fontSize: 82,
            margin: "0 0 40px -2px",
            lineHeight: 1.1,
            textShadow: "0 2px 30px #000",
            letterSpacing: -4,
            backgroundImage: "linear-gradient(90deg, #fff 40%, #aaa)",
            backgroundClip: "text",
            "-webkit-background-clip": "text",
            color: "transparent",
          }}
        >
          {title}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "inter",
          data: inter,
          style: "normal",
        },
      ],
    },
  );
};

export default og;
