import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Safe Forward Blog – Wissen rund um Arbeitssicherheit & HSE",
  description:
    "Praxiswissen zu Arbeitssicherheit, Gefährdungsbeurteilungen, Unterweisungen und HSE-Management für KMU in Deutschland.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <span className="text-blue-600 text-sm font-semibold uppercase tracking-wide">HSE-Wissen für KMU</span>
        <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
          Safe Forward Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Praxiswissen zu Arbeitssicherheit, Gefährdungsbeurteilungen und HSE-Management — verständlich erklärt für Unternehmen im Mittelstand.
        </p>
      </div>

      <div className="grid gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <article className="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-gray-400 text-sm">{post.readingTime}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">{post.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {new Date(post.date).toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="text-blue-600 text-sm font-medium group-hover:underline">
                  Artikel lesen →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">HSE-Management digital — 7 Tage kostenlos</h2>
        <p className="text-blue-100 mb-6 max-w-xl mx-auto">
          Gefährdungsbeurteilungen, Unterweisungen, Vorfälle und Audits — alles in einer Plattform. DSGVO-konform, ab 149 €/Monat.
        </p>
        <a
          href="https://www.safe-forward.de/register"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Jetzt kostenlos testen →
        </a>
      </div>
    </div>
  );
}
