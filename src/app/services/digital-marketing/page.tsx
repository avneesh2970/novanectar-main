import React from "react";
import DigitalMarketingClientPage from "./DigitalMarketingPage";
import { Metadata } from "next";

export const metaData: Metadata = {
  title: "Digital Marketing Companies in Dehradun | Novanectar",
  description:
    "Smart IT Solution is one of the best digital marketing companies in dehradun. we create stunning websites that are easy to navigate and make sense.",
};

export default function DigitalMarketingPage() {
  return <DigitalMarketingClientPage />;
}
