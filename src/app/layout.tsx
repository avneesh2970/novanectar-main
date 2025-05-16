import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { inter, roboto_mono, playfair, DMSans, DMSans400, DMSans500 } from "@/fonts/font"
import "./globals.css"
import { Toaster } from "react-hot-toast"
import Script from "next/script"

// Optimize font loading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Not critical for initial render
})

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
    description: "Empowering businesses with powerful IT solutions that aims your success.",
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
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical CSS */}
        <link rel="preload" href="/globals.css" as="style" />

        {/* Font optimization to prevent layout shifts */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Font fallback system to prevent layout shifts */
              :root {
                --font-fallback: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              }
              
              /* Set size-adjust to prevent layout shifts */
              html {
                font-size: 100%;
                font-synthesis: none;
              }
              
              /* Reserve space for text elements to prevent layout shifts */
              h1, h2, h3, h4, h5, h6, p {
                font-size-adjust: 100%;
                font-optical-sizing: auto;
                line-height: 1.5;
              }
              
              /* Add font-display: swap to all @font-face rules */
              @font-face {
                font-display: swap !important;
              }
            `,
          }}
        />

        {/* Meta tags for performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>

      {/* Structured data for SEO */}
      <Script
        id="novanectar-schema"
        type="application/ld+json"
        strategy="afterInteractive" // Defer script loading
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

      {/* Google Analytics or other analytics (load after page load) */}
      <Script
        strategy="afterInteractive"
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR-MEASUREMENT-ID');
          `,
        }}
      />

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${roboto_mono.variable} ${playfair.variable} ${DMSans.variable} ${DMSans400.variable} ${DMSans500.variable} antialiased`}
      >
        <main>{children}</main>
        <div id="portal-root" />
        <Toaster />
      </body>
    </html>
  )
}
