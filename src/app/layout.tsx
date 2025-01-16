import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { inter, roboto_mono, playfair, DMSans } from "@/fonts/font";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Novanectar",
  description: "Digital Marketing and IT solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${roboto_mono.variable} ${playfair.variable} ${DMSans} antialiased`}
      >
        <Navbar />
        <main className="pt-16">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
