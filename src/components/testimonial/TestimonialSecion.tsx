"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import bg from "@/assets/testimonial/testimonial.jpg"
import { DMSans } from "@/fonts/font"
import { initGSAP, cleanupGSAP, gsap } from "@/lib/gsapUtils"

const noSelectClass = "select-none"

const testimonialData = [
  {
    name: "Rajesh Gupta",
    role: "N.D. Collections",
    content:
      "Novanectar's digital marketing services gave our brand a complete makeover. From social media marketing to pay-per-click campaigns, every strategy was tailored to our business. Increased traffic, sales, and an engaged audience. ",
  },
  {
    name: "Muskan Rana",
    role: "Muskan Moves",
    content:
      "Novanectar's expertise in digital marketing helped my yoga brand find its audience. They managed social media platforms and implemented SEO strategies that boosted my website traffic. ",
  },
  {
    name: "Suraj Kumar",
    role: "WellOpportunity",
    content:
      "Novanectar transformed WellOpportunity with its cutting-edge website development and digital marketing services. The website now boasts a sleek design, intuitive navigation, and faster loading speeds. ",
  },
  {
    name: "Prince Kumar",
    role: "Techellixir",
    content:
      "Novanectar developed a world-class website for Techellixir. They incorporated responsive design, smooth user interfaces, and advanced features tailored to my requirements. The team's guidance on SEO and future scalability was top-notch.",
  },
]

const TestimonialCard: React.FC<{
  name: string
  role: string
  content: string
  className?: string
  isSmallScreen: boolean
  index: number
}> = ({ name, role, content, className = "", isSmallScreen, index }) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isSmallScreen && cardRef.current) {
      gsap.to(cardRef.current, {
        y: -20,
        duration: 6 + index * 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })
    }
  }, [isSmallScreen, index])

  return (
    <div
      ref={cardRef}
      className={`bg-white text-start rounded-xl p-4 shadow-lg w-full md:w-80 z-20 ${className} ${DMSans.className} ${noSelectClass}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M7 11a4 4 0 100-8 4 4 0 000 8zm1 2H3a1 1 0 00-1 1v2a3 3 0 003 3h2v-2H5a1 1 0 01-1-1v-1h4v-3zm9-2a4 4 0 100-8 4 4 0 000 8zm1 2h-5a1 1 0 00-1 1v2a3 3 0 003 3h2v-2h-1a1 1 0 01-1-1v-1h4v-3z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{name}</h3>
          <p className="text-xs text-gray-600">{role}</p>
        </div>
      </div>
      <p className="text-sm text-gray-800 leading-relaxed">{content}</p>
    </div>
  )
}

const TestimonialSection: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const bgImageRef = useRef<HTMLDivElement>(null)
  const scrollAnimationRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    initGSAP()

    const handleResize = () => {
      const smallScreen = window.innerWidth < 768
      setIsSmallScreen(smallScreen)

      if (bgImageRef.current) {
        gsap.set(bgImageRef.current, {
          height: "100%",
        })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cleanupGSAP()
    }
  }, [])

  useEffect(() => {
    if (isSmallScreen && scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth
      const clientWidth = scrollContainerRef.current.clientWidth

      scrollAnimationRef.current = gsap.to(scrollContainerRef.current, {
        x: -(scrollWidth - clientWidth),
        duration: 30,
        ease: "none",
        repeat: -1,
        paused: true,
      })

      scrollAnimationRef.current.play()
    } else if (scrollAnimationRef.current) {
      scrollAnimationRef.current.kill()
    }
  }, [isSmallScreen])

  const handleTouchStart = () => {
    if (scrollAnimationRef.current) {
      scrollAnimationRef.current.pause()
    }
  }

  const handleTouchEnd = () => {
    if (scrollAnimationRef.current) {
      scrollAnimationRef.current.play()
    }
  }

  return (
    <div className="relative w-full sm:min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-300 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-300 rounded-full blur-3xl" />

      {/* Main Container */}
      <div className="relative w-full sm:min-h-screen">
        {/* Background Image */}
        <div ref={bgImageRef} className="absolute inset-0 w-full h-full">
          <Image
            src={bg || "/placeholder.svg"}
            alt="Brain background"
            fill
            sizes="100vw"
            className="object-cover object-center h-full w-full opacity-50"
            priority
          />
        </div>

        {/* Responsive Cards Grid */}
        <div className="relative z-10 w-full h-[30rem] sm:h-screen">
          <div className="container mx-auto px-4 py-8 h-full flex items-center" ref={containerRef}>
            {/* Desktop Layout */}
            <div className="hidden lg:block relative w-full min-h-[600px]">
              {testimonialData.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  {...testimonial}
                  isSmallScreen={isSmallScreen}
                  index={index}
                  className={`absolute ${
                    index === 0
                      ? "top-[14%] left-[5%]"
                      : index === 1
                        ? "top-[5%] right-[20%]"
                        : index === 2
                          ? "top-[60%] left-[15%]"
                          : "bottom-[1%] right-[15%]"
                  }`}
                />
              ))}
            </div>

            {/* Tablet Layout */}
            <div className="hidden md:block lg:hidden w-full">
              <div className="grid grid-cols-2 gap-8 place-items-center">
                {testimonialData.map((testimonial, index) => (
                  <TestimonialCard key={index} {...testimonial} isSmallScreen={isSmallScreen} index={index} />
                ))}
              </div>
            </div>

            {/* Mobile Layout with Infinite Horizontal Scroll */}
            <div
              className={`md:hidden overflow-x-hidden flex items-center relative ${noSelectClass}`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div ref={scrollContainerRef} className="flex gap-6">
                {[...testimonialData, ...testimonialData].map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    {...testimonial}
                    isSmallScreen={isSmallScreen}
                    index={index % testimonialData.length}
                    className="flex-shrink-0 w-[80vw] max-w-[300px]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestimonialSection

