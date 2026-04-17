import React from "react";
import SeoServicePage from "./SeoClientPage";
import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "SEO Services in Dehradun",
  description:
    "Improve rankings, organic traffic, and local search visibility with NovaNectar's SEO services in Dehradun.",
  path: "/services/seo",
});

export default function SeoService() {
  return <SeoServicePage />;
}
