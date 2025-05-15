"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MainContent } from "./MainContent"

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
  const [hasAnimationPlayed, setHasAnimationPlayed] = useState(true) // Default to true for initial render
  const [shouldShowAnimation, setShouldShowAnimation] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Use refs for animation elements
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const portalRef = useRef<HTMLImageElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)

  // Handle client-side initialization
  useEffect(() => {
    setIsClient(true)

    // Check if the animation should play
    const shouldPlay = shouldPlayAnimation()
    setShouldShowAnimation(shouldPlay)

    if (!shouldPlay) {
      setHasAnimationPlayed(true)
    } else {
      setHasAnimationPlayed(false)
    }
  }, [])

  // Handle animation after client-side rendering
  useEffect(() => {
    if (!isClient || !shouldShowAnimation) return

    const container = containerRef.current
    const title = titleRef.current
    const portal = portalRef.current
    const mainContent = mainContentRef.current

    if (!container || !title || !portal || !mainContent) return

    // Dynamically import GSAP only when needed for animation
    import("@/lib/gsapUtils").then(({ gsap, initGSAP }) => {
      initGSAP().then(() => {
        // Initial setup
        gsap.set(mainContent, { y: 100, opacity: 0 })
        gsap.set(container, { opacity: 0 })

        // Create animation timeline
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          onComplete: () => {
            setHasAnimationPlayed(true)
          },
        })

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
      })
    })
  }, [isClient, shouldShowAnimation])

  // Render optimized content
  if (isClient && hasAnimationPlayed) {
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
      {isClient && shouldShowAnimation ? (
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
                src="/assets/landing/landing.png"
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
