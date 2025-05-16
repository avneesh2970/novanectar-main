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

// Fix: Use consistent weight values for DM Sans
export const DMSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal"],
  display: "swap",
  preload: true,
  variable: "--font-dm-sans",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: true, // Add this to adjust metrics
})

// Fix: Use correct weight values
export const DMSans500 = DM_Sans({
  subsets: ["latin"],
  weight: ["500"], // Changed from 300 to 500 to match the variable name
  style: ["normal"],
  display: "swap",
  preload: true, // Changed to true for critical font
  variable: "--font-dm-sans-500",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: true, // Add this to adjust metrics
})

export const DMSans400 = DM_Sans({
  subsets: ["latin"],
  weight: ["400"], // Changed from 200 to 400 to match the variable name
  style: ["normal"],
  display: "swap",
  preload: true, // Changed to true for critical font
  variable: "--font-dm-sans-400",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: true, // Add this to adjust metrics
})
