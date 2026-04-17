import React from "react";
import GraphicDesigningPage from "./GraphicDesignPage";
import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/site";
export const metadata: Metadata = buildPageMetadata({
  title: "Graphic Design Services in Dehradun",
  description:
    "Explore NovaNectar's graphic design services in Dehradun for branding, marketing creatives, social assets, brochures, and visual identity design.",
  path: "/services/graphic-designing",
});
export default function GraphicDesign() {
  return <GraphicDesigningPage />;
}
