import React from "react";
import GraphicDesigningPage from "./GraphicDesignPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Graphic Designing in Dehradun | Smart IT Solution",
  description:
    "Smart IT Solution is the best graphic designing company in dehradun. Offering creative logo and graphic design services at affordable prices.",
};
export default function GraphicDesign() {
  return <GraphicDesigningPage />;
}
