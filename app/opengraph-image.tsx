import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Safe Forward Blog – Wissen rund um Arbeitssicherheit & HSE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#161B33",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#0E6E5C",
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 28,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          blog.safe-forward.de
        </div>
        <div
          style={{
            color: "white",
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 32,
          }}
        >
          Safe Forward Blog
        </div>
        <div
          style={{
            color: "#9ca3af",
            fontSize: 28,
            lineHeight: 1.5,
            maxWidth: 800,
          }}
        >
          Praxiswissen zu Arbeitssicherheit & HSE-Management für KMU in Deutschland
        </div>
        <div
          style={{
            marginTop: 56,
            background: "#0E6E5C",
            color: "white",
            padding: "16px 40px",
            borderRadius: 12,
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          Jetzt kostenlos testen →
        </div>
      </div>
    ),
    { ...size }
  );
}
