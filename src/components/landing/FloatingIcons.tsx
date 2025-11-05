"use client"

import type React from "react"
import { useCallback, useEffect, useRef, memo, useState } from "react"
import Image from "next/image"
import js from "@/assets/landing/icons/js.png"
import angular from "@/assets/landing/icons/angular.png"
import dock from "@/assets/landing/icons/dock.png"
import dock2 from "@/assets/landing/icons/dock2.png"
import express from "@/assets/landing/icons/express.png"
import node from "@/assets/landing/icons/node.png"
import python from "@/assets/landing/icons/python.png"
import react from "@/assets/landing/icons/react.png"
import view from "@/assets/landing/icons/view.png"
import java from "@/assets/landing/icons/java.png"

// Import GSAP directly
import gsap from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"

// Register plugins directly
if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin)
}

// Define tech icons outside component to prevent recreation on each render
const techIcons = [
  // Left side icons with different animation patterns
  {
    src: node,
    alt: "Node.js",
    className: "w-12 h-12 md:w-16 md:h-16 left-[5%] top-[8%]",
    pattern: "circular",
  },
  {
    src: java,
    alt: "Java",
    className: "w-12 h-12 md:w-16 md:h-16 left-[5%] bottom-[18%]",
    pattern: "circular",
  },
  {
    src: python,
    alt: "Python",
    className: "w-14 h-14 md:w-20 md:h-20 left-[55%] top-[7%]",
    pattern: "circular",
  },
  // Right side icons with different patterns
  {
    src: js,
    alt: "JavaScript",
    className: "w-12 h-12 md:w-16 md:h-16 right-[5%] top-[8%]",
    pattern: "circular",
  },
  {
    src: react,
    alt: "React",
    className: "w-12 h-12 md:w-16 md:h-16 right-[5%] bottom-[18%]",
    pattern: "circular",
  },
  {
    src: angular,
    alt: "Angular",
    className: "md:w-16 md:h-16 right-[5%] top-[40%]",
    pattern: "circular",
  },
  // Top icons
  {
    src: dock,
    alt: "Flutter",
    className: "w-12 h-12 md:w-16 md:h-16 left-[28%] top-[2%]",
    pattern: "circular",
  },
  // Bottom icons
  {
    src: express,
    alt: "Express",
    className: "w-12 h-12 md:w-16 md:h-16 left-[29%] bottom-[9%]",
    pattern: "circular",
  },
  {
    src: dock2,
    alt: "Next.js",
    className: "w-12 h-12 md:w-16 md:h-16 right-[29%] bottom-[9%]",
    pattern: "circular",
  },
  {
    src: view,
    alt: "TypeScript",
    className: "md:w-16 md:h-16 right-[88%] bottom-[45%]",
    pattern: "circular",
  },
]

// Type definition for component props
interface FloatingTechLayoutProps {
  children: React.ReactNode
}

// Memoized TechIcon component to prevent unnecessary re-renders
const TechIcon = memo(
  ({
    icon,
    index,
    iconRef,
    isVisible,
  }: {
    icon: (typeof techIcons)[0]
    index: number
    iconRef: (el: HTMLDivElement | null) => void
    isVisible: boolean
  }) => (
    <div
      key={icon.alt}
      ref={iconRef}
      className={`absolute ${icon.className} transition-transform will-change-transform ${
        !isVisible ? "opacity-0" : "opacity-100"
      }`}
      style={{
        transform: "translate3d(0, 0, 0)", // Force GPU acceleration
        backfaceVisibility: "hidden", // Prevent flickering
      }}
    >
      <div className="relative w-full h-full">
        <Image
          src={icon.src || "/placeholder.svg"}
          alt={icon.alt}
          fill
          style={{ objectFit: "contain" }}
          className="select-none"
          priority={index < 4}
          sizes="(max-width: 768px) 48px, (max-width: 1200px) 64px, 80px"
          loading={index < 4 ? "eager" : "lazy"}
        />
      </div>
    </div>
  ),
)

TechIcon.displayName = "TechIcon"

// Custom hook for detecting if element is in viewport
const useIsInViewport = () => {
  const [isInViewport, setIsInViewport] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Capture the current value of ref.current
    const currentElement = ref.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting)
      },
      { threshold: 0.1 }, // Trigger when at least 10% is visible
    )

    observer.observe(currentElement)

    return () => {
      // Use the captured value in the cleanup
      observer.unobserve(currentElement)
    }
  }, [])

  return { ref, isInViewport }
}

const FloatingTechLayout: React.FC<FloatingTechLayoutProps> = ({ children }) => {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const animationsActive = useRef(false)
  const animationTweens = useRef<gsap.core.Tween[]>([])
  const { ref: containerRef, isInViewport } = useIsInViewport()
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  // Use useCallback to memoize the animateIcons function
  const animateIcons = useCallback(() => {
    // Skip if animations are already active or reduced motion is preferred
    if (animationsActive.current || isReducedMotion) return

    // Mark animations as active
    animationsActive.current = true

    // Clear any existing animations
    animationTweens.current = []

    // Limit the number of animated icons based on device performance
    const isLowPerfDevice = window.navigator.hardwareConcurrency ? window.navigator.hardwareConcurrency <= 4 : false

    // Determine how many icons to animate based on device capability
    const iconLimit = isLowPerfDevice ? 5 : techIcons.length

    // Create a subset of icons to animate
    const iconsToAnimate = iconRefs.current.slice(0, iconLimit).filter(Boolean)

    iconsToAnimate.forEach((icon, index) => {
      if (!icon) return

      const pattern = techIcons[index].pattern
      const duration = 2 + Math.random() * 2 // Slightly randomize duration
      const delay = Math.random() * 0.5 // Shorter delays for better performance

      let tween: gsap.core.Tween

      // Use simpler animations for low-performance devices
      if (isLowPerfDevice) {
        // Simple animation for all patterns on low-performance devices
        tween = gsap.to(icon, {
          duration: duration,
          repeat: -1,
          ease: "sine.inOut",
          yoyo: true,
          y: Math.random() * 15 - 7.5,
          x: Math.random() * 15 - 7.5,
          delay: delay,
        })
        animationTweens.current.push(tween)
      } else {
        // Full animations for higher-performance devices
        switch (pattern) {
          case "circular":
            tween = gsap.to(icon, {
              duration: duration,
              repeat: -1,
              ease: "none",
              motionPath: {
                path: [
                  { x: 0, y: 0 },
                  { x: 15, y: 15 },
                  { x: 0, y: 30 },
                  { x: -15, y: 15 },
                  { x: 0, y: 0 },
                ],
                curviness: 1.8,
              },
              delay: delay,
            })
            animationTweens.current.push(tween)
            break

          case "wave":
            tween = gsap.to(icon, {
              duration: duration,
              repeat: -1,
              ease: "power1.inOut",
              yoyo: true,
              x: Math.random() * 20 - 10,
              y: Math.random() * 20 - 10,
              delay: delay,
            })
            animationTweens.current.push(tween)
            break

          case "bounce":
            tween = gsap.to(icon, {
              duration: duration * 0.8,
              repeat: -1,
              ease: "power1.inOut",
              yoyo: true,
              y: "-=20",
              x: Math.random() * 15 - 7.5,
              delay: delay,
            })
            animationTweens.current.push(tween)
            break
        }

        // Add subtle rotation to all icons (only for higher-performance devices)
        tween = gsap.to(icon, {
          duration: duration * 1.5,
          repeat: -1,
          ease: "power1.inOut",
          yoyo: true,
          rotation: Math.random() * 8 - 4, // Reduced rotation range
          delay: delay,
        })
        animationTweens.current.push(tween)
      }
    })
  }, [isReducedMotion]) // Add isReducedMotion as a dependency

  // Pause/resume animations based on visibility
  useEffect(() => {
    if (!animationsActive.current || animationTweens.current.length === 0) return

    if (isInViewport) {
      // Resume all animations
      animationTweens.current.forEach((tween) => tween.resume())
    } else {
      // Pause all animations
      animationTweens.current.forEach((tween) => tween.pause())
    }
  }, [isInViewport])

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (isInViewport && !isReducedMotion) {
        animateIcons()
      }
    }, 100)

    // Return a cleanup function that properly kills all animations
    return () => {
      clearTimeout(timer)

      // Reset animation active flag
      animationsActive.current = false

      // Kill all animations
      animationTweens.current.forEach((tween) => {
        if (tween) {
          tween.kill()
        }
      })
      animationTweens.current = []
    }
  }, [animateIcons, isInViewport, isReducedMotion])

  // Create a ref setter function
  const setIconRef = (index: number) => (el: HTMLDivElement | null) => {
    iconRefs.current[index] = el
  }

  return (
    <div className="relative w-full overflow-hidden max-w-[1400px] mx-auto" ref={containerRef}>
      {/* Floating icons layer */}
      <div className="absolute inset-0 pointer-events-none">
        {techIcons.map((icon, index) => (
          <TechIcon key={icon.alt} icon={icon} index={index} iconRef={setIconRef(index)} isVisible={isInViewport} />
        ))}
      </div>
      {/* Main content layer */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default memo(FloatingTechLayout)
