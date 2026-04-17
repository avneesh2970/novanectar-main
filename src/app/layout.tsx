import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import {
  inter,
  DMSans,
} from "@/fonts/font";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AnalyticsListener from "@/components/AnalyticsListener";
import {
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "NovaNectar",
    "Web Development",
    "Application Development",
    "Graphic Design",
    "Digital Marketing",
    "SEO Services",
    "Mobile Development",
    "IT company Dehradun",
  ],
  authors: [{ name: "NovaNectar Services" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "NovaNectar Services Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --font-fallback: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              }

              html {
                font-size: 100%;
                font-synthesis: none;
              }

              h1, h2, h3, h4, h5, h6, p {
                font-size-adjust: 100%;
                font-optical-sizing: auto;
                line-height: 1.5;
              }

              @font-face {
                font-display: swap !important;
              }
            `,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>

      <body
        className={`${geistSans.variable} ${DMSans.variable} ${inter.variable} antialiased bg-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              sameAs: [
                "https://www.facebook.com/share/a6ob9vX4d6uEAd3B/?mibextid=qi2Omg",
                "https://www.linkedin.com/company/novanectar/",
                "https://www.instagram.com/novanectar_services_pvt.ltd?igsh=MXRoaHN3MGM5czYxZw==",
                "https://t.me/novanectarservices",
                "https://youtube.com/@novanectarservicespvt.ltd.?si=NVJY1MQc_NfoVoSi",
                "https://x.com/nova_necta80067",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-8979891708",
                contactType: "customer service",
              },
            }),
          }}
        />
        <main>
          <AnalyticsListener />
          {children}
        </main>
        <div id="portal-root" />
        <Toaster />
      </body>
    </html>
  );
}
