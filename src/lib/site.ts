import type { Metadata } from "next";

export const SITE_NAME = "NovaNectar Services Pvt. Ltd.";
export const SITE_URL = "https://novanectar.co.in";
export const SITE_DESCRIPTION =
  "NovaNectar helps brands grow with web development, app development, SEO, creative design, and digital marketing services from Dehradun.";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/twitter-image.jpg`;

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || SITE_URL;
}

export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).toString();
}

export function buildPageMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  keywords,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
