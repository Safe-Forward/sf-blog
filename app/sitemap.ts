import { getAllPosts } from "@/lib/posts";
import type { MetadataRoute } from "next";

// Seit dem 07.11.2026 leiten alle Artikel per 308 in den Ratgeber auf www.safe-forward.de weiter (next.config.ts).
// Das Umzugsdatum als lastModified sagt Google, dass sich die Adressen geändert haben: Es crawlt sie früher neu,
// sieht die Weiterleitung und überträgt die Rankings schneller auf die neuen Seiten.
const UMZUG_IN_RATGEBER = new Date("2026-11-07T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const postEntries = posts.map((post) => ({
    url: `https://blog.safe-forward.de/blog/${post.slug}`,
    lastModified: new Date(Math.max(new Date(post.date).getTime(), UMZUG_IN_RATGEBER.getTime())),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://blog.safe-forward.de",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...postEntries,
  ];
}
