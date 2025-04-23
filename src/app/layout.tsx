import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { inter, roboto_mono, playfair, DMSans } from "@/fonts/font";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novanectar.co.in"),
  title: {
    template: "%s | Novanectar Services Pvt. Ltd.",
    default: "Novanectar Services - Fueling Progress with Smart IT Solutions",
  },
  description:
    "Novanectar Services provides smart IT solutions including graphic design, website development, and application development to help your business grow.",
  keywords: [
    "IT Solutions",
    "Web Development",
    "Application Development",
    "Graphic Design",
    "Digital Marketing",
    "SEO Services",
    "Mobile Development",
    "E-commerce Solutions",
    "Technical Solutions",
    "IT Services India",
  ],
  authors: [{ name: "Novanectar Services" }],
  creator: "Novanectar Services Pvt. Ltd.",
  publisher: "Novanectar Services Pvt. Ltd.",
  openGraph: {
    title: "Novanectar Services - Fueling Progress with Smart IT Solutions",
    description:
      "Empowering businesses with powerful IT solutions that aims your success.",
    url: "https://novanectar.co.in",
    siteName: "Novanectar Services Pvt. Ltd.",
    images: [
      {
        url: "https://novanectar.co.in/twitter-image.jpg",
        width: 1200,
        height: 630,
        alt: "Novanectar Services Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Novanectar Services - Fueling Progress with Smart IT Solutions",
  //   description:
  //     "Empowering businesses with powerful IT solutions that aims your success.",
  //   images: ["https://novanectar.co.in/twitter-image.jpg"],
  // },
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
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://novanectar.co.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <Script
        id="novanectar-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Novanectar Services Pvt. Ltd.",
            url: "https://novanectar.co.in",
            logo: "https://novanectar.co.in/logo.png",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${roboto_mono.variable} ${playfair.variable} ${DMSans} antialiased`}
      >
        <main>{children}</main>
        <div id="portal-root" />
        <Toaster />
      </body>
    </html>
  );
}
