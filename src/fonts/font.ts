import { Inter, Roboto_Mono, Playfair_Display, Work_Sans, DM_Sans } from "next/font/google"

// Optimize font loading with display swap and preload
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
  preload: false, // Don't preload non-critical fonts
})

export const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  preload: false,
})

// Preload critical fonts used in hero section
export const WorkSans = Work_Sans({
  subsets: ["latin"],
  weight: ["700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  variable: "--font-work-sans",
  fallback: ["Arial", "sans-serif"], // Add fallback fonts
})

export const DMSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  variable: "--font-dm-sans",
  fallback: ["Arial", "sans-serif"],
})

export const DMSans500 = DM_Sans({
  subsets: ["latin"],
  weight: ["300"],
  style: ["normal"],
  display: "swap",
  preload: false,
  variable: "--font-dm-sans-300",
  fallback: ["Arial", "sans-serif"],
})

export const DMSans400 = DM_Sans({
  subsets: ["latin"],
  weight: ["200"],
  style: ["normal"],
  display: "swap",
  preload: false,
  variable: "--font-dm-sans-200",
  fallback: ["Arial", "sans-serif"],
})
