import React from "react";
import SeoServicePage from "./SeoClientPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Service in Dehradun | Smart IT Solution",
  description: "Boost your online presence with SEO services in dehradun by a Smart IT Solution. we create unique content and follow the best SEO practices",
};

export default function SeoService() {
  return <SeoServicePage />;
}
