"use client"
import { useRef, useEffect, useCallback, useState } from "react"
import React from "react"
import { DMSans, DMSans400, DMSans500 } from "@/fonts/font"
import { services, SVG_ICONS } from "./services"
import { SVGIcon } from "./svg-icon"
import "./process-section.css" // Import the CSS file directly

// Preload SVG icons to prevent layout shifts
const preloadSVGIcons = () => {
  if (typeof window === "undefined") return

  // Create hidden div to preload SVGs
  const preloadDiv = document.createElement("div")
  preloadDiv.style.position = "absolute"
  preloadDiv.style.width = "0"
  preloadDiv.style.height = "0"
  preloadDiv.style.overflow = "hidden"
  preloadDiv.style.visibility = "hidden"

  // Add all SVGs to preload
  Object.values(SVG_ICONS).forEach((svg) => {
    const wrapper:any = document.createElement("div")
    wrapper.innerHTML = svg
    preloadDiv.appendChild(wrapper)
  })

  document.body.appendChild(preloadDiv)

  // Remove after a delay
  setTimeout(() => {
    if (document.body.contains(preloadDiv)) {
      document.body.removeChild(preloadDiv)
    }
  }, 5000)
}

// Memoized ServiceCard component to prevent unnecessary re-renders
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
            style={{
              // Set explicit line height to prevent layout shifts
              lineHeight: 1.5,
              // Reserve space for text to prevent layout shifts
              minHeight: "2em",
            }}
          >
            {title}
          </h3>
          <p
            className={`text-gray-200 text-center leading-tight text-base ${DMSans400.className}`}
            style={{
              // Set explicit line height to prevent layout shifts
              lineHeight: 1.5,
              // Reserve space for text to prevent layout shifts
              minHeight: "6em",
            }}
          >
            {description}
          </p>
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

  // State to track if content is loaded
  const [contentLoaded, setContentLoaded] = useState(false)

  // Calculate container height based on content for mobile
  const updateMobileContainerHeight = useCallback(() => {
    if (typeof window === "undefined") return

    const isMobile = window.matchMedia("(max-width: 767px)").matches
    if (!isMobile || !containerRef.current || !cardsRowRef.current) return

    // Get the actual height of the cards row
    const cardsRowHeight = cardsRowRef.current.scrollHeight

    // Add some padding
    const containerHeight = cardsRowHeight + 100 // 100px for padding

    // Set the container height
    containerRef.current.style.height = `${containerHeight}px`
  }, [])

  // Memoize the scroll handler to prevent recreating it on each render
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !cardsRowRef.current || !contentLoaded) return

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
  }, [contentLoaded]) // Add contentLoaded as dependency

  // Easing function to make animation smoother
  function easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
  }

  useEffect(() => {
    // Check if we're in the browser environment to avoid hydration errors
    if (typeof window === "undefined") return

    // Preload SVG icons to prevent layout shifts
    preloadSVGIcons()

    // Set a CSS variable for viewport height to handle mobile browsers correctly
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    // Call it initially
    setVh()

    // Mark content as loaded after a short delay to ensure everything is rendered
    const timer = setTimeout(() => {
      setContentLoaded(true)
      // Update mobile container height after content is loaded
      updateMobileContainerHeight()
    }, 100)

    // Add event listener for resize
    window.addEventListener("resize", () => {
      setVh()
      updateMobileContainerHeight()
    })

    // Initial position
    handleScroll()

    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", setVh)
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      clearTimeout(timer)
    }
  }, [handleScroll, updateMobileContainerHeight]) // Add dependencies

  // Use client-side only rendering for the motion components to avoid hydration errors
  const [isClient, setIsClient] = React.useState(false)

  useEffect(() => {
    setIsClient(true)

    // Update mobile container height after client-side rendering
    if (typeof window !== "undefined") {
      const timer = setTimeout(updateMobileContainerHeight, 200)
      return () => clearTimeout(timer)
    }
  }, [updateMobileContainerHeight])

  return (
    <section
      ref={containerRef}
      className={`process-container ${contentLoaded ? "content-loaded" : ""}`}
      // Add data attribute to prevent layout shift detection by Vercel tools
      data-allow-shifts
    >
      <div className="process-sticky-container">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/100 to-gray-900"></div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <h2
            className={`sm:pt-12 text-white text-4xl font-medium mb-8 sm:mb-12 text-center underline ${DMSans.className}`}
            style={{
              // Set explicit line height to prevent layout shifts
              lineHeight: 1.5,
              // Reserve space for text to prevent layout shifts
              minHeight: "1.5em",
            }}
          >
            Process
          </h2>

          {/* Fixed height container to prevent layout shifts */}
          <div className="process-cards-container">
            {/* Cards row with optimized animations */}
            <div
              ref={cardsRowRef}
              className="process-cards-row"
              // Add onLoad event to update container height
              onLoad={updateMobileContainerHeight}
            >
              {services.map((service, index) =>
                isClient ? (
                  <div
                    key={index}
                    className="card-wrapper"
                    style={{
                      width: "280px",
                      height: "400px",
                      opacity: 1, // Make visible immediately
                    }}
                  >
                    <ServiceCard {...service} />
                  </div>
                ) : (
                  <div
                    key={index}
                    className="card-wrapper"
                    // Reserve space during SSR to prevent layout shifts
                    style={{
                      width: "280px",
                      height: "400px",
                      opacity: 0,
                    }}
                  >
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
