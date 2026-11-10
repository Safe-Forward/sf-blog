import type { NextConfig } from "next";

// Der Blog ist in den Ratgeber auf www.safe-forward.de umgezogen, jeder Artikel unter demselben Slug. Jede alte Adresse
// leitet dauerhaft (308) auf die neue weiter, damit Rankings und Links mitwandern. robots.txt und sitemap.xml bleiben
// erreichbar, damit Google die alten Adressen erneut abruft und die Weiterleitungen findet.
const RATGEBER = "https://www.safe-forward.de/ratgeber";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Die Vorschaubilder je Artikel lieferten auf Vercel 500 (Search Console: „Serverfehler (5xx)“); das Bild der
      // Startseite funktioniert und bleibt erreichbar
      { source: "/blog/:slug/opengraph-image", destination: "/opengraph-image", permanent: true },
      { source: "/blog/:slug", destination: `${RATGEBER}/:slug`, permanent: true },
      { source: "/blog", destination: RATGEBER, permanent: true },
      { source: "/", destination: RATGEBER, permanent: true },
    ];
  },
};

export default nextConfig;
