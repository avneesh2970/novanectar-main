import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostContent from "@/components/blogs/blog-post-content";
import { getBlogPost } from "@/lib/content";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: {
      canonical: absoluteUrl(`/blog/${post.slug}`),
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      url: absoluteUrl(`/blog/${post.slug}`),
      siteName: SITE_NAME,
      type: "article",
      authors: post.author ? [post.author] : undefined,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt || post.createdAt,
      images: post.featuredImage
        ? [{ url: post.featuredImage, alt: post.featuredImageAlt || post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  };
}

export default async function Page({ params }: any) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

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
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostContent post={post} />
    </>
  );
}
