import React from "react";
import SocialMediaManagement from "./SocialMediaManagement";
import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Social Media Management Services",
  description:
    "Strengthen your brand presence with NovaNectar's social media management services, including planning, publishing, engagement, and creative support.",
  path: "/services/social-media-management",
});

export default function SocialMediaManagementPage() {
  return <SocialMediaManagement />;
}
