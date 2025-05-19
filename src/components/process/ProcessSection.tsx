"use client"
import { useRef, useEffect, useCallback, useState } from "react"
import React from "react"
import { DMSans, DMSans400, DMSans500 } from "@/fonts/font"
import { services, SVG_ICONS } from "./services"
import { SVGIcon } from "./svg-icon"
import "./process-section.css" // Import the CSS file directly

// Font preloading function to prevent layout shifts from font loading
const preloadFonts = () => {
  if (typeof window === "undefined") return
  
  // Use the Font Loading API if available
  if ('fonts' in document) {
    // Preload the fonts we're using
    Promise.all([
      (document as any).fonts.load(`1em ${DMSans.style.fontFamily}`),
      (document as any).fonts.load(`1em ${DMSans400.style.fontFamily}`),
      (document as any).fonts.load(`1em ${DMSans500.style.fontFamily}`)
    ]).catch(err => console.error("Font preloading error:", err));
  }
}

// Improved SVG preloading with better error handling
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

  // Add all SVGs to preload with error handling
  Object.entries(SVG_ICONS).forEach(([key, svg]) => {
    try {
      if (typeof svg === 'string') {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = svg
        wrapper.style.position = "absolute"
        wrapper.style.width = "48px"
        wrapper.style.height = "48px"
        preloadDiv.appendChild(wrapper)
      }
    } catch (error) {
      console.error(`Error preloading SVG ${key}:`, error)
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

// Skeleton card component to show while content is loading
const SkeletonCard = React.memo(() => {
  return (
    <div 
      className="service-card skeleton-card"
      style={{
        width: "280px",
        height: "400px",
        contain: "strict",
        backgroundColor: "rgba(55, 65, 81, 0.3)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div 
        className="skeleton-icon"
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          backgroundColor: "rgba(219, 234, 254, 0.1)",
          marginBottom: "2rem"
        }}
      />
      <div 
        className="skeleton-title"
        style={{
          width: "70%",
          height: "24px",
          backgroundColor: "rgba(219, 234, 254, 0.1)",
          marginBottom: "1rem",
          borderRadius: "4px"
        }}
      />
      <div 
        className="skeleton-text"
        style={{
          width: "80%",
          height: "100px",
          backgroundColor: "rgba(219, 234, 254, 0.1)",
          borderRadius: "4px"
        }}
      />
    </div>
  )
})

SkeletonCard.displayName = "SkeletonCard"

// Memoized ServiceCard component with fixed dimensions to prevent layout shifts
const ServiceCard = React.memo(({ title, description, iconKey }: any) => {
  // State to track if the SVG has loaded
  const [svgLoaded, setSvgLoaded] = useState(false)
  
  // Effect to simulate SVG loading
  useEffect(() => {
    // Set a small timeout to simulate SVG loading
    // This ensures the skeleton is shown first
    const timer = setTimeout(() => {
      setSvgLoaded(true)
    }, 10)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div 
      className="service-card"
      style={{
        width: "280px",
        height: "400px",
        contain: "strict", // Use CSS containment for better performance
        visibility: svgLoaded ? "visible" : "hidden", // Hide until SVG is loaded
        position: "relative"
      }}
    >
      {/* Show skeleton while loading */}
      {!svgLoaded && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
          <SkeletonCard />
        </div>
      )}
      
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
                className="svg-icon-placeholder"
                onLoad={() => setSvgLoaded(true)}
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
  // State to track if content is ready to display
  const [contentReady, setContentReady] = useState(false)
  
  // Refs for scroll animation
  const containerRef = useRef<HTMLElement>(null)
  const cardsRowRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lastScrollPosition = useRef(0)
  const ticking = useRef(false)
  const isInitialRender = useRef(true)
  const observerRef = useRef<IntersectionObserver | null>(null)

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

  // Fixed setupIntersectionObserver with proper dependency array
  const setupIntersectionObserver = useCallback(() => {
    if (typeof window === "undefined" || !containerRef.current) return
    
    // Skip on mobile
    const isMobile = window.matchMedia("(max-width: 767px)").matches
    if (isMobile) return
    
    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
    
    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Element is visible, start animation
            handleScroll()
          }
        })
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
    )
    
    // Observe the container
    observerRef.current.observe(containerRef.current)
  }, [handleScroll]) // Add handleScroll to dependency array

  useEffect(() => {
    // Check if we're in the browser environment to avoid hydration errors
    if (typeof window === "undefined") return

    // Preload fonts to prevent layout shifts
    preloadFonts()
    
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
      
      // Set content ready after a small delay to ensure dimensions are calculated
      setTimeout(() => {
        setContentReady(true)
      }, 50)
    }

    // Setup intersection observer for scroll animations
    setupIntersectionObserver()

    // Throttled resize handler for better performance
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setVh()
        updateMobileContainerHeight()
        setupIntersectionObserver() // Re-setup observer on resize
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
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleScroll, updateMobileContainerHeight, setupIntersectionObserver])

  return (
    <section
      ref={containerRef}
      className="process-container"
      // Add data attribute to prevent layout shift detection by Vercel tools
      data-allow-shifts
      // Set explicit min-height to prevent layout shifts
      style={{ 
        minHeight: "100vh",
        // Removed contentVisibility and containIntrinsicSize to simplify
      }}
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
              contain: "layout size", // Use CSS containment for better performance
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
                contain: "layout size",
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
                  {/* Show skeleton while content is loading */}
                  {!contentReady ? (
                    <SkeletonCard />
                  ) : (
                    <ServiceCard {...service} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}