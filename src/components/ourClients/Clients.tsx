/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import img1 from "@/assets/clients/1.png"
import img2 from "@/assets/clients/2.png"
import img3 from "@/assets/clients/3.png"
import img4 from "@/assets/clients/4.png"
import img5 from "@/assets/clients/5.png"
import img6 from "@/assets/clients/6.png"
import img7 from "@/assets/clients/7.png"
import img8 from "@/assets/clients/8.png"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"
import { DMSans } from "@/fonts/font"
import Button from "./Button"

export default function Clients() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const controls = useAnimation()
  const [isManualScrolling, setIsManualScrolling] = useState(false)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const images = [img1, img2, img3, img4, img5, img6, img7, img8]
  const imageSizes = [
    { width: 250, height: 250 },
    { width: 210, height: 200 },
    { width: 250, height: 250 },
    { width: 210, height: 200 },
    { width: 250, height: 250 },
    { width: 210, height: 200 },
    { width: 210, height: 200 },
    { width: 210, height: 200 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      const totalWidth = imageSizes.reduce((sum, size) => sum + size.width, 0) + (imageSizes.length - 1) * 16 // 16px for gap
      const containerWidth = totalWidth * 2 // Double the width for seamless loop

      scrollContainer.style.setProperty("--scroll-width", `${containerWidth}px`)
      scrollContainer.style.setProperty("--animation-duration", "60s") // Increased from 40s to 60s for slower auto-scroll

      const resetScroll = () => {
        if (scrollContainer.scrollLeft >= totalWidth - 1) {
          scrollContainer.scrollLeft = 0
        } else if (scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft = totalWidth - 1
        }
      }

      scrollContainer.addEventListener("scroll", resetScroll)

      return () => {
        scrollContainer.removeEventListener("scroll", resetScroll)
      }
    }
  }, [])

  const scrollTo = (direction: "left" | "right") => {
    if (scrollRef.current) {
      setIsManualScrolling(true)
      const scrollAmount = 400 // Increased scroll amount for slower perceived motion
      const duration = 1500 // Increased duration for slower animation (1.5 seconds)
      const start = scrollRef.current.scrollLeft
      const startTime = performance.now()

      const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime
        if (elapsedTime < duration) {
          const progress = elapsedTime / duration
          const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2 // Easing function for smooth start and end
          const scrollPosition = start + (direction === "left" ? -scrollAmount : scrollAmount) * easeProgress
          scrollRef.current!.scrollLeft = scrollPosition
          requestAnimationFrame(animateScroll)
        } else {
          scrollRef.current!.scrollLeft = start + (direction === "left" ? -scrollAmount : scrollAmount)
          setTimeout(() => setIsManualScrolling(false), 100)
        }
      }

      requestAnimationFrame(animateScroll)
    }
  }

  const scrollLeft = () => scrollTo("left")
  const scrollRight = () => scrollTo("right")

  return (
    <section
      className="w-full py-14 px-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 relative"
      ref={containerRef}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZiIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiNjY2MiLz4KPC9zdmc+')] opacity-75"></div>
      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`font-medium text-gray-900 text-4xl mb-14 text-center underline pt-8 ${DMSans.className}`}
        >
          Our Trusted Partners
        </motion.h2>

        <div className="relative overflow-hidden">
          <Button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2">
            &#8249;
          </Button>

          <motion.div variants={containerVariants} initial="hidden" animate={controls} className="relative">
            <div
              ref={scrollRef}
              className={`flex items-center gap-4 ${isManualScrolling ? "" : "animate-scroll"}`}
              style={{
                width: "var(--scroll-width)",
              }}
            >
              {[...images, ...images].map((src, index) => {
                const size = imageSizes[index % imageSizes.length]
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: size.width, height: size.height }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={src || "/placeholder.svg"}
                        alt={`Client logo ${(index % images.length) + 1}`}
                        fill
                        className="object-contain drop-shadow-lg"
                        sizes={`${Math.max(size.width, size.height)}px`}
                        priority={index < images.length}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <Button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2">
            &#8250;
          </Button>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--scroll-width) / 2));
          }
        }
        .animate-scroll {
          animation: scroll var(--animation-duration) linear infinite;
        }
      `}</style>
    </section>
  )
}

