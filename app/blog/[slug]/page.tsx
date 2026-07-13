import { getAllPosts, getPostHtml } from "@/lib/posts";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPostHtml(slug);
  if (!result) return {};
  return {
    title: result.post.title,
    description: result.post.description,
    openGraph: {
      title: result.post.title,
      description: result.post.description,
      type: "article",
      publishedTime: result.post.date,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const result = await getPostHtml(slug);
  if (!result) notFound();

  const { post, contentHtml } = result;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Safe Forward Redaktion",
      url: "https://www.safe-forward.de",
    },
    publisher: {
      "@type": "Organization",
      name: "Safe Forward",
      url: "https://www.safe-forward.de",
      logo: {
        "@type": "ImageObject",
        url: "https://blog.safe-forward.de/logo-icon.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://blog.safe-forward.de/blog/${slug}`,
    },
    image: `https://blog.safe-forward.de/blog/${slug}/opengraph-image`,
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/" className="text-blue-600 text-sm hover:underline flex items-center gap-1 mb-8">
        ← Zurück zum Blog
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-gray-400 text-sm">{post.readingTime}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-lg text-gray-600 mb-6">{post.description}</p>
        <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
            SF
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{post.author}</p>
            <p className="text-xs text-gray-400">
              {new Date(post.date).toLocaleDateString("de-DE", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <div
        className="prose prose-gray prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-table:text-sm"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">
          Gefährdungsbeurteilungen digital verwalten
        </h2>
        <p className="text-blue-100 mb-6 max-w-xl mx-auto">
          Safe Forward digitalisiert Ihren gesamten Arbeitsschutz: Gefährdungsbeurteilungen, Unterweisungen, Vorfälle und Audits — DSGVO-konform, ab 149 €/Monat.
        </p>
        <a
          href="https://www.safe-forward.de/register"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
        >
          7 Tage kostenlos testen →
        </a>
      </div>
    </div>
  );
}
