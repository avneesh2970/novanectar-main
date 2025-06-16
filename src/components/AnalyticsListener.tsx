'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initGA, logPageView } from "@/lib/analytics";

export default function AnalyticsListener() {
  const pathname = usePathname();

  useEffect(() => {
    initGA();
    logPageView(pathname);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // initialize GA once on mount

  useEffect(() => {
    logPageView(pathname);
  }, [pathname]); // log pageview on every route change

  return null;
}
