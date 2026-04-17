import React from "react";
import MobileDevelopmentPage from "./MobileDevelopmentPage";
import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Mobile App Development in Dehradun",
  description:
    "Build scalable Android, iOS, and cross-platform mobile apps with NovaNectar's app development services in Dehradun.",
  path: "/services/mobile-development",
});

export default function AppDevelopmentPage() {
  return <MobileDevelopmentPage />;
}
