import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";
import BlogList from "./components/BlogList";

export const metadata: Metadata = {
  title: "Safe Forward Blog – Wissen rund um Arbeitssicherheit & HSE",
  description:
    "Praxiswissen zu Arbeitssicherheit, Gefährdungsbeurteilungen, Unterweisungen und HSE-Management für KMU in Deutschland.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <span className="text-[#0E6E5C] text-sm font-semibold uppercase tracking-wide">
          HSE-Wissen für KMU
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Safe Forward Blog</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Praxiswissen zu Arbeitssicherheit, Gefährdungsbeurteilungen und HSE-Management —
          verständlich erklärt für Unternehmen im Mittelstand.
        </p>
      </div>

      <BlogList posts={posts} />

      <div className="mt-16 bg-[#161B33] rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">HSE-Management digital — 7 Tage kostenlos</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Gefährdungsbeurteilungen, Unterweisungen, Vorfälle und Audits — alles in einer Plattform.
          DSGVO-konform, ab 149 €/Monat.
        </p>
        <a
          href="https://www.safe-forward.de/register"
          className="inline-block bg-[#0E6E5C] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0a5a4a] transition-colors"
        >
          Jetzt kostenlos testen →
        </a>
      </div>
    </div>
  );
}
