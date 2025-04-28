import BlogPostContent from "@/components/blogs/blog-post-content";
import type { Metadata } from "next";

// Updated function to generate metadata with proper params handling
export async function generateMetadata({ params }: any): Promise<Metadata> {
  try {
    // Await the params before accessing the slug property
    const resolvedParams = await params;

    // Construct the URL with the resolved slug
    const url = new URL(
      "/api/blog/posts",
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    );
    url.searchParams.append("slug", resolvedParams.slug);

    const response = await fetch(url.toString());
    const post = await response.json();

    if (!post) {
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    return {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        images: post.featuredImage ? [{ url: post.featuredImage }] : [],
        type: "article",
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      title: "Blog",
      description: "Read our latest blog posts",
    };
  }
}

export default async function Page({ params }: any) {
  // Await the params before accessing the slug property
  const resolvedParams = await params;

  return <BlogPostContent slug={resolvedParams.slug} />;
}
