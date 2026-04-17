
import type { Metadata } from "next";
import WebsiteDevelopmentClientPage from "./WebsiteDevelopmentClientPage";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Website Development in Dehradun",
  description:
    "Design and build fast, modern, search-friendly websites with NovaNectar's website development services in Dehradun.",
  path: "/services/web-development",
});

export default function WebsiteDevelopmentPage() {
  return <WebsiteDevelopmentClientPage />;
}
