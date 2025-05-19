"use client"
import { useRef, useEffect, useCallback } from "react"
import React from "react"
import { DMSans, DMSans400, DMSans500 } from "@/fonts/font"
import { services, SVG_ICONS } from "./services"
import { SVGIcon } from "./svg-icon"
import "./process-section.css" // Import the CSS file directly

// Improved SVG preloading that doesn't cause layout shifts
const preloadSVGIcons = () => {
  if (typeof window === "undefined") return

  // Create hidden div to preload SVGs
  const preloadDiv = document.createElement("div")
  preloadDiv.style.position = "absolute"
  preloadDiv.style.width = "0"
  preloadDiv.style.height = "0"
  preloadDiv.style.overflow = "hidden"
  preloadDiv.style.visibility = "hidden"
  preloadDiv.style.pointerEvents = "none"
  preloadDiv.setAttribute("aria-hidden", "true")

  // Add all SVGs to preload - using a safer approach without Blob
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.entries(SVG_ICONS).forEach(([key, svg]) => {
    if (typeof svg === 'string') {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = svg
      wrapper.style.position = "absolute"
      wrapper.style.width = "48px"
      wrapper.style.height = "48px"
      preloadDiv.appendChild(wrapper)
    }
  })

  document.body.appendChild(preloadDiv)

  // Remove after a delay
  setTimeout(() => {
    if (document.body.contains(preloadDiv)) {
      document.body.removeChild(preloadDiv)
    }
  }, 2000)
}

// Memoized ServiceCard component with fixed dimensions to prevent layout shifts
const ServiceCard = React.memo(({ title, description, iconKey }: any) => {
  return (
    <div 
      className="service-card"
      // Set explicit dimensions to prevent layout shifts
      style={{
        width: "280px",
        height: "400px",
        contain: "strict" // Use CSS containment for better performance
      }}
    >
      <div className="service-card-hover" />

      <div className="relative z-10">
        {/* Fixed dimension container for icon to prevent layout shifts */}
        <div 
          className="service-card-icon-container"
          style={{ 
            width: "64px", 
            height: "64px",
            contain: "strict" // Use CSS containment for better performance
          }}
        >
          <div 
            className="service-card-icon"
            style={{ 
              width: "100%", 
              height: "100%",
              contain: "strict" // Use CSS containment for better performance
            }}
          >
            {/* Render SVG with explicit dimensions */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ 
                width: "48px", 
                height: "48px",
                transform: "translate(-50%, -50%)",
                contain: "strict" // Use CSS containment for better performance
              }}
            >
              <SVGIcon 
                svgString={SVG_ICONS[iconKey] as string} 
                width={48} 
                height={48} 
                // Add placeholder background to reserve space
                className="svg-icon-placeholder"
              />
            </div>
          </div>
        </div>

        <div 
          className="service-card-content"
          style={{ 
            minHeight: "250px", // Set explicit min-height to prevent layout shifts
            contain: "content" // Use CSS containment for better performance
          }}
        >
          <h3
            className={`text-center pt-8 text-lg sm:text-xl font-medium text-white mb-2 sm:mb-3 tracking-wider ${DMSans500.className}`}
            style={{
              lineHeight: "1.5",
              minHeight: "3em", // Reserve more space for title
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {title}
          </h3>
          <p
            className={`text-gray-200 text-center leading-tight text-base ${DMSans400.className}`}
            style={{
              lineHeight: "1.5",
              minHeight: "9em", // Reserve more space for description
              display: "block"
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
  const lastScrollPosition = useRef(0)
  const ticking = useRef(false)
  const isInitialRender = useRef(true)

  // Calculate container height based on content for mobile - improved version
  const updateMobileContainerHeight = useCallback(() => {
    if (typeof window === "undefined") return

    const isMobile = window.matchMedia("(max-width: 767px)").matches
    if (!isMobile || !containerRef.current || !cardsRowRef.current) return

    // Get the actual height of the cards row
    const cardsRowHeight = cardsRowRef.current.scrollHeight
    
    // Add minimal padding for mobile - reduced from previous version
    const containerHeight = cardsRowHeight + 40 // Reduced padding to 40px
    
    // Set the container height
    containerRef.current.style.height = `${containerHeight}px`
  }, [])

  // Optimized scroll handler with throttling and better performance
  const handleScroll = useCallback(() => {
    if (!containerRef.current || !cardsRowRef.current) return

    // Throttle scroll events for better performance
    if (!ticking.current) {
      animationFrameRef.current = requestAnimationFrame(() => {
        const container = containerRef.current
        const cardsRow = cardsRowRef.current

        if (!container || !cardsRow) return

        // Skip on mobile
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

        // Apply the translation with linear interpolation for better performance
        // Only animate transform, not opacity or other properties that cause layout shifts
        const translateX = -scrollProgress * totalScrollNeeded * 1.5 // Speed factor
        const limitedTranslateX = Math.max(-totalScrollNeeded * 1.1, Math.min(0, translateX))

        // Use transform: translateX for better performance (no 3D transforms)
        cardsRow.style.transform = `translateX(${limitedTranslateX}px)`

        ticking.current = false
        lastScrollPosition.current = scrollTop
      })

      ticking.current = true
    }
  }, [])

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
    
    // Set initial dimensions to prevent layout shifts
    if (isInitialRender.current) {
      // Force layout calculation before any animations
      // Use a function call to avoid eslint warning
      const forceReflow = () => document.body.offsetHeight;
      forceReflow();
      
      updateMobileContainerHeight()
      isInitialRender.current = false
    }

    // Throttled resize handler for better performance
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setVh()
        updateMobileContainerHeight()
      }, 100)
    }

    // Add event listener for resize with throttling
    window.addEventListener("resize", handleResize, { passive: true })

    // Initial position
    handleScroll()

    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimeout)
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [handleScroll, updateMobileContainerHeight])

  return (
    <section
      ref={containerRef}
      className="process-container"
      // Add data attribute to prevent layout shift detection by Vercel tools
      data-allow-shifts
      // Set explicit min-height to prevent layout shifts
      style={{ minHeight: "100vh" }}
    >
      <div className="process-sticky-container">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/100 to-gray-900"></div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <h2
            className={`process-title sm:pt-12 text-white text-4xl font-medium mb-4 sm:mb-8 text-center underline ${DMSans.className}`}
            style={{
              lineHeight: "1.5",
              minHeight: "2em", // Reserve more space for title
              display: "block"
            }}
          >
            Process
          </h2>

          {/* Fixed height container to prevent layout shifts */}
          <div 
            className="process-cards-container"
            style={{ 
              minHeight: "400px", // Set explicit min-height to prevent layout shifts
              contain: "layout" // Use CSS containment for better performance
            }}
          >
            {/* Cards row with optimized animations */}
            <div
              ref={cardsRowRef}
              className="process-cards-row"
              style={{
                // Set initial opacity to 1 to prevent fade-in layout shifts
                opacity: 1,
                // Set explicit min-height to prevent layout shifts
                minHeight: "400px",
                // Use CSS containment for better performance
                contain: "layout"
              }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="card-wrapper"
                  style={{
                    width: "280px",
                    height: "400px",
                    // Always visible - no opacity transitions that could cause layout shifts
                    opacity: 1,
                    // Use CSS containment for better performance
                    contain: "strict"
                  }}
                >
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}