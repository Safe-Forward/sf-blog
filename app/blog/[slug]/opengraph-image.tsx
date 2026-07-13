import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

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
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 28,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {post?.category || "Arbeitsschutz"} · Safe Forward Blog
        </div>
        <div
          style={{
            color: "white",
            fontSize: 52,
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: 36,
            maxWidth: 1000,
          }}
        >
          {post?.title || "Safe Forward Blog"}
        </div>
        <div
          style={{
            color: "#9ca3af",
            fontSize: 24,
            lineHeight: 1.5,
            maxWidth: 900,
          }}
        >
          {post?.description?.slice(0, 130) || ""}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            color: "#4b5563",
            fontSize: 18,
          }}
        >
          blog.safe-forward.de
        </div>
      </div>
    ),
    { ...size }
  );
}
