import React from "react";
import SocialMediaManagement from "./SocialMediaManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Media Management | Novenectar - Smart IT Solution",
  description:
    "Grow your brand with expert social media management by Smart IT Solution - Create Schedule and engage across top platform with ease.",
};

export default function SocialMediaManagementPage() {
  return <SocialMediaManagement />;
}
