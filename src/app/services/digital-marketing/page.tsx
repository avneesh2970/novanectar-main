import React from "react";
import DigitalMarketingClientPage from "./DigitalMarketingPage";
import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Digital Marketing Services in Dehradun",
  description:
    "Grow your reach with NovaNectar's digital marketing services in Dehradun, including strategy, campaign planning, content, and lead-focused execution.",
  path: "/services/digital-marketing",
});

export default function DigitalMarketingPage() {
  return <DigitalMarketingClientPage />;
}
