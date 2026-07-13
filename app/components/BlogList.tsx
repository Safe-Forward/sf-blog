"use client";

import type { Post } from "@/lib/posts";
import Link from "next/link";
import { useState, useMemo } from "react";

const CATEGORY_COLORS: Record<string, string> = {
  "Arbeitsschutz": "bg-blue-50 text-blue-700 border-blue-200",
  "Unterweisungen": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Arbeitsrecht": "bg-red-50 text-red-700 border-red-200",
  "Arbeitgeberpflichten": "bg-purple-50 text-purple-700 border-purple-200",
};

function categoryColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? "bg-gray-100 text-gray-600 border-gray-200";
}

type SortOption = "newest" | "oldest" | "az";

export default function BlogList({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("newest");
  const [search, setSearch] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(posts.map((p) => p.category))).sort(),
    [posts]
  );

  const filtered = useMemo(() => {
    let result = posts;

    if (activeCategory) result = result.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return [...result].sort((a, b) => {
      if (sort === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sort === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
      return a.title.localeCompare(b.title, "de");
    });
  }, [posts, activeCategory, sort, search]);

  function resetFilters() {
    setActiveCategory(null);
    setSearch("");
    setSort("newest");
  }

  const hasActiveFilter = activeCategory || search.trim();

  return (
    <div>
      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="search"
          placeholder="Artikel suchen…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0E6E5C]/30 focus:border-[#0E6E5C]"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#0E6E5C]/30"
        >
          <option value="newest">Neueste zuerst</option>
          <option value="oldest">Älteste zuerst</option>
          <option value="az">A – Z</option>
        </select>
      </div>

      {/* Category filter */}
      <div className="mb-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Thema</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
              !activeCategory
                ? "bg-[#161B33] text-white border-[#161B33]"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
            }`}
          >
            Alle
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === cat
                  ? categoryColor(cat) + " ring-2 ring-offset-1 ring-current"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>


      {/* Results header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {filtered.length} {filtered.length === 1 ? "Artikel" : "Artikel"}
          {hasActiveFilter && (
            <button
              onClick={resetFilters}
              className="ml-3 text-[#0E6E5C] underline underline-offset-2 hover:no-underline"
            >
              Filter zurücksetzen
            </button>
          )}
        </p>
      </div>

      {/* Post cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-medium mb-1">Keine Artikel gefunden</p>
          <p className="text-sm">Versuche einen anderen Suchbegriff oder Filter.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filtered.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#0E6E5C]/40 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`text-xs font-semibold px-3 py-0.5 rounded-full border ${categoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-xs">{post.readingTime}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#0E6E5C] transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">{post.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {new Date(post.date).toLocaleDateString("de-DE", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-[#0E6E5C] text-sm font-medium group-hover:underline">
                    Artikel lesen →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
