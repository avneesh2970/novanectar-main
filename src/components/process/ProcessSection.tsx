"use client"
import { useRef, useEffect } from "react"
import React from "react"
import { motion } from "framer-motion"
import { DMSans, DMSans400, DMSans500 } from "@/fonts/font"
import { services, SVG_ICONS } from "./services"
import { SVGIcon } from "./svg-icon"
import "./process-section.css" // Import the CSS file directly

// Memoized ServiceCard component to prevent unnecessary re-renders
const ServiceCard = React.memo(({ title, description, iconKey }: any) => {
  // Create a ref for the icon container to ensure exact dimensions
  const iconRef = useRef<HTMLDivElement>(null)

  return (
    <div className="service-card">
      <div className="service-card-hover" />

      <div className="relative z-10">
        {/* Fixed dimension container for icon to prevent layout shifts */}
        <div ref={iconRef} className="service-card-icon-container">
          <div className="service-card-icon">
            {/* Render SVG from string using the SVGIcon component */}
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[48px] h-[48px] flex items-center justify-center">
              <SVGIcon svgString={SVG_ICONS[iconKey]} width={48} height={48} />
            </div>
          </div>
        </div>

        <div className="service-card-content">
          <h3
            className={`text-center pt-8 text-lg sm:text-xl font-medium text-white mb-2 sm:mb-3 tracking-wider ${DMSans500.className}`}
          >
            {title}
          </h3>
          <p className={`text-gray-200 text-center leading-tight text-base ${DMSans400.className}`}>{description}</p>
        </div>
      </div>
    </div>
  )
})

ServiceCard.displayName = "ServiceCard"

export default function ProcessSection() {
  // Refs for scroll animation
  const containerRef = useRef<HTMLElement>(null)
  const cardsRowRef = useRef<HTMLDivElement>(null)

  // Use Framer Motion for the animation instead of manual implementation
  useEffect(() => {
    if (!containerRef.current || !cardsRowRef.current) return

    const container = containerRef.current
    const cardsRow = cardsRowRef.current

    // Skip on mobile
    const isMobile = window.matchMedia("(max-width: 767px)").matches
    if (isMobile) return

    // Calculate total width of all cards
    const totalCardsWidth = cardsRow.scrollWidth
    const containerWidth = container.clientWidth

    // Add extra padding to ensure we can see all cards
    // This ensures we scroll far enough to see the last card
    const extraScrollPadding = 100 // pixels
    const totalScrollNeeded = totalCardsWidth - containerWidth + extraScrollPadding

    // Animation speed factor - adjust this to change animation speed
    // Higher values = faster animation (cards move more per scroll)
    // Lower values = slower animation (cards move less per scroll)
    const animationSpeedFactor = 1.5

    // Set up the scroll-linked animation
    const handleScroll = () => {
      // Get scroll progress through the container
      const containerHeight = container.offsetHeight
      const viewportHeight = window.innerHeight
      const scrollTop = window.scrollY

      // Get the container's position relative to the document
      const containerRect = container.getBoundingClientRect()
      const containerTop = containerRect.top + window.scrollY

      // Calculate how far we've scrolled into the section
      // Start animation when the container enters the viewport
      const scrollStart = containerTop - viewportHeight * 0.1

      // End animation when we've scrolled past 80% of the container
      // This ensures we reach the end of the cards before finishing the section
      const scrollEnd = containerTop + containerHeight * 0.8

      const scrollRange = scrollEnd - scrollStart

      // Calculate scroll progress (0 to 1)
      // Clamp between 0 and 1 to avoid going out of bounds
      const rawScrollProgress = (scrollTop - scrollStart) / scrollRange
      const scrollProgress = Math.max(0, Math.min(1, rawScrollProgress))

      // Apply the translation with speed factor
      // Use easeInOut function to make animation smoother at start/end
      const easeInOutProgress = easeInOutQuad(scrollProgress)
      const translateX = -easeInOutProgress * totalScrollNeeded * animationSpeedFactor

      // Apply the translation, ensuring we don't go beyond the total scroll needed
      const limitedTranslateX = Math.max(-totalScrollNeeded * 1.1, Math.min(0, translateX))

      // Use translate3d for better performance
      cardsRow.style.transform = `translate3d(${limitedTranslateX}px, 0, 0)`
    }

    // Easing function to make animation smoother
    function easeInOutQuad(t: number): number {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    }

    // Initial position
    handleScroll()

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="process-container"
      data-allow-shifts // This attribute tells Vercel's layout shift tool to ignore this element
    >
      <div className="process-sticky-container">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/100 to-gray-900"></div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <h2
            className={`sm:pt-12 text-white text-4xl font-medium mb-8 sm:mb-12 text-center underline ${DMSans.className}`}
          >
            Process
          </h2>

          {/* Fixed height container to prevent layout shifts */}
          <div className="process-cards-container">
            {/* Cards row with GPU-optimized animations */}
            <div ref={cardsRowRef} className="process-cards-row">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  // Use Framer Motion's viewport prop for entry animations
                  viewport={{ once: true, amount: 0.2 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
