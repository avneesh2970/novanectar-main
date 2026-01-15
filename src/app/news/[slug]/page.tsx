import type { Metadata } from "next";
import NewsDetailPageClient from "./news-detail-client";
import { notFound } from "next/navigation";

interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  author: string;
  category: string;
  tags: string[];
  publishDate: string;
  views: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://novanectar.co.in";

async function getNews(slug: string): Promise<NewsItem | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/news/posts?slug=${slug}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
    return null;
  } catch (err) {
    console.error("Failed to fetch news:", err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const news = await getNews(slug);

  if (!news) {
    return {
      title: "Article Not Found | NovaNectar",
      description:
        "The article you're looking for doesn't exist or has been removed.",
    };
  }

  const canonicalUrl = `${BASE_URL}/news/${slug}`;

  return {
    title: news.metaTitle || `${news.title} | NovaNectar News`,
    description: news.metaDescription || news.description,
    keywords: news.tags?.join(", "),
    authors: [{ name: news.author }],
    openGraph: {
      title: news.metaTitle || news.title,
      description: news.metaDescription || news.description,
      url: canonicalUrl,
      siteName: "NovaNectar",
      type: "article",
      publishedTime: news.publishDate,
      modifiedTime: news.updatedAt,
      authors: [news.author],
      images: news.featuredImage
        ? [
            {
              url: news.featuredImage,
              alt: news.featuredImageAlt || news.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: news.metaTitle || news.title,
      description: news.metaDescription || news.description,
      images: news.featuredImage ? [news.featuredImage] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const news = await getNews(slug);

  if (!news) {
    notFound();
  }

  return <NewsDetailPageClient news={news} />;
}
