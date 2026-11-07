import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import type { Nodes, Root } from "mdast";

const postsDirectory = path.join(process.cwd(), "content/posts");

// remark-gfm wird für Tabellen gebraucht, macht aus "- [ ] …" aber auch
// Aufgabenlisten mit Checkboxen. Die Checklisten zeigen das "[ ]" bisher
// als Text; dieses Plugin stellt das wieder her.
function keepTaskListMarkersAsText() {
  return (tree: Root) => {
    const visit = (node: Nodes) => {
      if (node.type === "listItem" && typeof node.checked === "boolean") {
        const marker = node.checked ? "[x] " : "[ ] ";
        node.checked = null;
        const first = node.children[0];
        if (first?.type === "paragraph") {
          const head = first.children[0];
          if (head?.type === "text") head.value = marker + head.value;
          else first.children.unshift({ type: "text", value: marker });
        }
      }
      if ("children" in node) {
        for (const child of node.children as Nodes[]) visit(child);
      }
    };
    visit(tree);
  };
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  content: string;
  readingTime: string;
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return getPostBySlug(slug);
    })
    .filter(Boolean) as Post[];

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const wordCount = content.split(/\s+/).length;
    const readingTime = `${Math.ceil(wordCount / 200)} min Lesezeit`;
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author,
      category: data.category,
      tags: Array.isArray(data.tags) ? data.tags : [],
      content,
      readingTime,
    };
  } catch {
    return null;
  }
}

export async function getPostHtml(slug: string): Promise<{ post: Post; contentHtml: string } | null> {
  const post = getPostBySlug(slug);
  if (!post) return null;
  const processed = await remark()
    .use(remarkGfm)
    .use(keepTaskListMarkersAsText)
    .use(html)
    .process(post.content);
  return { post, contentHtml: processed.toString() };
}
