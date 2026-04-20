import type { Metadata } from "next";
import NewsIndexPage from "@/components/news/NewsIndexPage";
import { getNewsItems } from "@/lib/content";
import { buildPageMetadata } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "News",
  description:
    "Browse the latest NovaNectar news, announcements, insights, and company updates from our team.",
  path: "/news",
});

export default async function NewsPage() {
  const news = await getNewsItems();
  return <NewsIndexPage items={news} />;
}
