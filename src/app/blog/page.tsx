import type { Metadata } from "next";
import BlogIndexPage from "@/components/blogs/BlogIndexPage";
import { getBlogPosts } from "@/lib/content";
import { buildPageMetadata } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Read NovaNectar blog posts covering web development, marketing, SEO, branding, business growth, and technology insights.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return <BlogIndexPage initialPosts={posts} />;
}
