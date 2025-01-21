"use client"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

import landing from "@/assets/landing/landing.png"
import { MainContent } from "./MainContent"
import Image from "next/image"

// Add this function at the top of the file, outside of the Landing component
function shouldPlayAnimation() {
  if (typeof window === "undefined") return false
  const hasPlayed = sessionStorage.getItem("landingAnimationPlayed")
  if (!hasPlayed) {
    sessionStorage.setItem("landingAnimationPlayed", "true")
    return true
  }
  return false
}

const Landing = () => {
  const [hasAnimationPlayed, setHasAnimationPlayed] = useState(false)
  const [shouldShowAnimation, setShouldShowAnimation] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const portalRef = useRef<HTMLImageElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if the animation should play
    const shouldPlay = shouldPlayAnimation()
    setShouldShowAnimation(shouldPlay)
    if (!shouldPlay) {
      setHasAnimationPlayed(true)
    }
  }, [])

  useEffect(() => {
    if (!shouldShowAnimation) return

    const container = containerRef.current
    const title = titleRef.current
    const portal = portalRef.current
    const mainContent = mainContentRef.current

    if (!container || !title || !portal || !mainContent) return

    // Show main content immediately if we're not animating
    if (!shouldShowAnimation) {
      gsap.set(mainContent, { y: 0, opacity: 1 })
      gsap.set(container, { opacity: 1, backgroundColor: "white" })
      return
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        setHasAnimationPlayed(true)
      },
    })

    // Initial setup
    gsap.set(mainContent, { y: 100, opacity: 0 })
    gsap.set(container, { opacity: 0 })

    // Animation sequence
    tl.to(container, {
      opacity: 1,
      duration: 1,
    })
      .to(title, {
        y: "-40vh",
        scale: 0.5,
        duration: 1,
      })
      .to(
        portal,
        {
          scale: 5,
          opacity: 0,
          duration: 1.5,
        },
        "-=0.5",
      )
      .to(
        container,
        {
          backgroundColor: "white",
          duration: 1,
        },
        "-=1",
      )
      .to(
        mainContent,
        {
          y: 0,
          opacity: 1,
          duration: 1,
        },
        "-=0.5",
      )

    return () => {
      tl.kill()
    }
  }, [shouldShowAnimation])

  if (hasAnimationPlayed) {
    return (
      <div className="relative bg-white">
        <div className="w-full">
          <MainContent />
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {shouldShowAnimation ? (
        <main className="relative h-screen w-full overflow-hidden">
          <div className="relative w-full h-full">
            <div
              ref={portalRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={landing || "/placeholder.svg"}
                alt="Portal background"
                fill
                style={{ objectFit: "cover" }}
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div ref={titleRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <h1 className="text-center font-sans text-5xl font-bold tracking-widest text-[#F5F5DC] md:text-7xl lg:text-8xl">
              NOVANECTAR
            </h1>
          </div>
        </main>
      ) : null}

      <div ref={mainContentRef} className="absolute top-0 left-0 w-full">
        <MainContent />
      </div>
    </div>
  )
}

export default Landing

