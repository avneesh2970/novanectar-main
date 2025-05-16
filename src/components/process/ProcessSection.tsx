"use client"
import { useRef, useEffect, useCallback } from "react"
import React from "react"
import { motion } from "framer-motion"
import { DMSans, DMSans400, DMSans500 } from "@/fonts/font"
import { services, SVG_ICONS } from "./services"
import { SVGIcon } from "./svg-icon"
import "./process-section.css" // Import the CSS file directly

// Update the ServiceCard component to prevent layout shifts
const ServiceCard = React.memo(({ title, description, iconKey }: any) => {
  return (
    <div className="service-card">
      <div className="service-card-hover" />

      <div className="relative z-10">
        {/* Fixed dimension container for icon to prevent layout shifts */}
        <div className="service-card-icon-container">
          <div className="service-card-icon">
            {/* Render SVG from string using the SVGIcon component with explicit dimensions */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48px] h-[48px] flex items-center justify-center">
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
  const animationFrameRef = useRef<number | null>(null)

  // Memoize the scroll handler to prevent recreating it on each render
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !cardsRowRef.current) return

    // Cancel any existing animation frame
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    // Schedule new animation frame
    animationFrameRef.current = requestAnimationFrame(() => {
      const container = containerRef.current
      const cardsRow = cardsRowRef.current

      if (!container || !cardsRow) return

      // Skip on mobile - use window.matchMedia for SSR compatibility
      const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
      if (isMobile) return

      // Calculate total width of all cards
      const totalCardsWidth = cardsRow.scrollWidth
      const containerWidth = container.clientWidth

      // Add extra padding to ensure we can see all cards
      const extraScrollPadding = 100 // pixels
      const totalScrollNeeded = totalCardsWidth - containerWidth + extraScrollPadding

      // Get container's position relative to the document
      const containerRect = container.getBoundingClientRect()
      const containerTop = containerRect.top + (typeof window !== "undefined" ? window.scrollY : 0)
      const containerHeight = container.offsetHeight
      const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0
      const scrollTop = typeof window !== "undefined" ? window.scrollY : 0

      // Calculate scroll progress
      const scrollStart = containerTop - viewportHeight * 0.1
      const scrollEnd = containerTop + containerHeight * 0.8
      const scrollRange = scrollEnd - scrollStart
      const rawScrollProgress = (scrollTop - scrollStart) / scrollRange
      const scrollProgress = Math.max(0, Math.min(1, rawScrollProgress))

      // Apply the translation with easing
      const easeInOutProgress = easeInOutQuad(scrollProgress)
      const translateX = -easeInOutProgress * totalScrollNeeded * 1.5 // Speed factor
      const limitedTranslateX = Math.max(-totalScrollNeeded * 1.1, Math.min(0, translateX))

      // Use transform: translate3d for better performance
      cardsRow.style.transform = `translate3d(${limitedTranslateX}px, 0, 0)`
    })
  }, []) // No dependencies needed as we're using refs

  // Easing function to make animation smoother
  function easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
  }

  // Add a useLayoutEffect to set initial dimensions before rendering
  useEffect(() => {
    // Check if we're in the browser environment to avoid hydration errors
    if (typeof window === "undefined") return

    // Set a CSS variable for viewport height to handle mobile browsers correctly
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    // Call it initially
    setVh()

    // Add event listener for resize
    window.addEventListener("resize", setVh)

    // Initial position
    handleScroll()

    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Handle resize events to recalculate dimensions
    window.addEventListener("resize", handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      window.removeEventListener("resize", setVh)
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [handleScroll]) // Add handleScroll as dependency

  // Use client-side only rendering for the motion components to avoid hydration errors
  const [isClient, setIsClient] = React.useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section ref={containerRef} className="process-container">
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
            {/* Cards row with optimized animations */}
            <div ref={cardsRowRef} className="process-cards-row">
              {services.map((service, index) =>
                isClient ? (
                  <motion.div
                    key={index}
                    viewport={{ once: true, amount: 0.2 }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ServiceCard {...service} />
                  </motion.div>
                ) : (
                  <div key={index} className="opacity-0">
                    <ServiceCard {...service} />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
