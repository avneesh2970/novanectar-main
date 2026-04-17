import NewsDetailPageClient from "./news-detail-client";
import { notFound } from "next/navigation";
import { getNewsItem } from "@/lib/content";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const news = await getNewsItem(slug);

  if (!news) {
    return {
      title: "Article Not Found | NovaNectar",
      description:
        "The article you're looking for doesn't exist or has been removed.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalUrl = absoluteUrl(`/news/${slug}`);

  return {
    title: news.metaTitle || `${news.title} | NovaNectar News`,
    description: news.metaDescription || news.description,
    keywords: news.tags?.join(", "),
    authors: [{ name: news.author }],
    openGraph: {
      title: news.metaTitle || news.title,
      description: news.metaDescription || news.description,
      url: canonicalUrl,
      siteName: SITE_NAME,
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

export default async function NewsDetailPage({ params }: any) {
  const { slug } = await params;
  const news = await getNewsItem(slug);

  if (!news) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.metaTitle || news.title,
    description: news.metaDescription || news.description,
    datePublished: news.publishDate,
    dateModified: news.updatedAt,
    author: {
      "@type": "Person",
      name: news.author,
    },
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
      "@id": absoluteUrl(`/news/${news.slug}`),
    },
    image: news.featuredImage ? [news.featuredImage] : [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NewsDetailPageClient news={news} />
    </>
  );
}
