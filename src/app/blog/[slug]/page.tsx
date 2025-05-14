import BlogPostContent from "@/components/blogs/blog-post-content";
import type { Metadata } from "next";

// Updated function to generate metadata with proper params handling
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    // Construct the URL with the slug
    const url = new URL(
      "/api/blog/posts",
      process.env.NEXT_PUBLIC_APP_URL ||
        "https://novanectar.co.in" ||
        "http://localhost:3000"
    );
    url.searchParams.append("slug", params.slug);

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const post = await response.json();

    if (!post) {
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    // Create structured data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      image: post.featuredImage ? [post.featuredImage] : [],
      author: {
        "@type": "Person",
        name: post.author,
      },
      datePublished: post.createdAt,
      dateModified: post.updatedAt || post.createdAt,
      publisher: {
        "@type": "Organization",
        name: "novanectar",
        logo: {
          "@type": "ImageObject",
          url: "https://novanectar.co.in/logo.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${
          process.env.NEXT_PUBLIC_APP_URL || "https://novanectar.co.in"
        }/blog/${post.slug}`,
      },
    };

    return {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        images: post.featuredImage
          ? [
              {
                url: post.featuredImage,
                alt: post.featuredImageAlt || post.title,
              },
            ]
          : [],
        type: "article",
        authors: post.author ? [post.author] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
        images: post.featuredImage
          ? [
              {
                url: post.featuredImage,
                alt: post.featuredImageAlt || post.title,
              },
            ]
          : [],
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}`,
      },
       other: {
      "script:ld+json": JSON.stringify(jsonLd),
    },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog",
      description: "Read our latest blog posts",
    };
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  return <BlogPostContent slug={params.slug} />;
}
