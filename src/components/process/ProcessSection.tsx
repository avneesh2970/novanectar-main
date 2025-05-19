"use client"
import { useRef, useEffect, useCallback } from "react"
import React from "react"
import { DMSans, DMSans400, DMSans500 } from "@/fonts/font"
import { services, SVG_ICONS } from "./services"
import { SVGIcon } from "./svg-icon"
import "./process-section.css"

// Memoized ServiceCard component with fixed dimensions to prevent layout shifts
const ServiceCard = React.memo(({ title, description, iconKey }: any) => {
  return (
    <div
      className="service-card"
      style={{
        width: "280px",
        height: "400px",
        contain: "layout", // Use CSS containment for better performance
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
            contain: "layout", // Use CSS containment for better performance
          }}
        >
          <div
            className="service-card-icon"
            style={{
              width: "100%",
              height: "100%",
              contain: "layout", // Use CSS containment for better performance
            }}
          >
            {/* Render SVG with explicit dimensions */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "48px",
                height: "48px",
                transform: "translate(-50%, -50%)",
              }}
            >
              <SVGIcon svgString={SVG_ICONS[iconKey] as string} width={48} height={48} />
            </div>
          </div>
        </div>

        <div
          className="service-card-content"
          style={{
            minHeight: "250px", // Set explicit min-height to prevent layout shifts
          }}
        >
          <h3
            className={`text-center pt-8 text-lg sm:text-xl font-medium text-white mb-2 sm:mb-3 tracking-wider ${DMSans500.className}`}
            style={{
              lineHeight: "1.5",
              minHeight: "3em", // Reserve space for title
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {title}
          </h3>
          <p
            className={`text-gray-200 text-center leading-tight text-base ${DMSans400.className}`}
            style={{
              lineHeight: "1.5",
              minHeight: "9em", // Reserve space for description
              display: "block",
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
  const ticking = useRef(false)

  // Calculate container height based on content for mobile
  const updateMobileContainerHeight = useCallback(() => {
    if (typeof window === "undefined") return

    const isMobile = window.matchMedia("(max-width: 767px)").matches
    if (!isMobile || !containerRef.current || !cardsRowRef.current) return

    // Get the actual height of the cards row
    const cardsRowHeight = cardsRowRef.current.scrollHeight

    // Add padding for mobile
    const containerHeight = cardsRowHeight + 80

    // Set the container height
    containerRef.current.style.height = `${containerHeight}px`
  }, [])

  // Optimized scroll handler with throttling
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
        const scrollProgress = Math.max(0, Math.min(1, (scrollTop - scrollStart) / scrollRange))

        // Apply the translation with transform for better performance
        const translateX = -scrollProgress * totalScrollNeeded
        cardsRow.style.transform = `translateX(${Math.max(-totalScrollNeeded, Math.min(0, translateX))}px)`

        ticking.current = false
      })

      ticking.current = true
    }
  }, [])

  // Setup intersection observer for scroll animations
  const setupIntersectionObserver = useCallback(() => {
    if (typeof window === "undefined" || !containerRef.current) return

    // Skip on mobile
    const isMobile = window.matchMedia("(max-width: 767px)").matches
    if (isMobile) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is visible, start animation
            handleScroll()
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
      },
    )

    // Observe the container
    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [handleScroll])

  useEffect(() => {
    // Preload fonts to prevent layout shifts
    if (typeof document !== "undefined" && "fonts" in document) {
      Promise.all([
        (document as any).fonts.load(`1em ${DMSans.style.fontFamily}`),
        (document as any).fonts.load(`1em ${DMSans400.style.fontFamily}`),
        (document as any).fonts.load(`1em ${DMSans500.style.fontFamily}`),
      ]).catch((err) => console.error("Font preloading error:", err))
    }

    // Set initial dimensions to prevent layout shifts
    updateMobileContainerHeight()

    // Setup intersection observer for scroll animations
    const cleanupObserver = setupIntersectionObserver()

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        updateMobileContainerHeight()
      }, 100)
    }

    // Add event listeners
    window.addEventListener("resize", handleResize, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Initial position
    handleScroll()

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimeout)
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (cleanupObserver) cleanupObserver()
    }
  }, [handleScroll, updateMobileContainerHeight, setupIntersectionObserver])

  return (
    <section
      ref={containerRef}
      className="process-container"
      // Set explicit min-height to prevent layout shifts
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="process-sticky-container">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/100 to-gray-900"></div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <h2
            className={`process-title sm:pt-12 text-white text-4xl font-medium mb-4 sm:mb-8 text-center underline ${DMSans.className}`}
            style={{
              lineHeight: "1.5",
              minHeight: "2em", // Reserve space for title
              display: "block",
            }}
          >
            Process
          </h2>

          {/* Fixed height container to prevent layout shifts */}
          <div
            className="process-cards-container"
            style={{
              minHeight: "400px", // Set explicit min-height to prevent layout shifts
            }}
          >
            {/* Cards row with optimized animations */}
            <div
              ref={cardsRowRef}
              className="process-cards-row"
              style={{
                minHeight: "400px", // Set explicit min-height to prevent layout shifts
              }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="card-wrapper"
                  style={{
                    width: "280px",
                    height: "400px",
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
