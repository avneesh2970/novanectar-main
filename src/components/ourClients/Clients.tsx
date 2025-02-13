"use client"

import img1 from "@/assets/clients/1.png"
import img2 from "@/assets/clients/2.png"
import img3 from "@/assets/clients/3.png"
import img4 from "@/assets/clients/4.png"
import img5 from "@/assets/clients/5.png"
import img6 from "@/assets/clients/6.png"
import img7 from "@/assets/clients/7.png"
import img8 from "@/assets/clients/8.png"
import img9 from "@/assets/clients/9.png"
import { useRef, useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { DMSans } from "@/fonts/font"
import Button from "./Button"

export default function Clients() {
  const [isAnimationPaused, setIsAnimationPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<HTMLDivElement>(null)

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9]
  const imageSizes = [
    { width: 210, height: 210 },
    { width: 210, height: 210 },
    { width: 280, height: 280 },
    { width: 210, height: 210 },
    { width: 300, height: 300 },
    { width: 230, height: 230 },
    { width: 250, height: 250 },
    { width: 210, height: 200 },
    { width: 250, height: 250 },
  ]

  const totalWidth = imageSizes.reduce((sum, size) => sum + size.width, 0) + (imageSizes.length - 1) * 16 // 16px for gap

  const scroll = useCallback(
    (direction: "left" | "right") => {
      if (containerRef.current) {
        const scrollAmount = totalWidth / 4 // Scroll by 1/4 of the total width
        const currentScroll = containerRef.current.scrollLeft
        let newScroll: number

        if (direction === "left") {
          newScroll = currentScroll - scrollAmount
          if (newScroll < 0) {
            newScroll = totalWidth + newScroll
          }
        } else {
          newScroll = currentScroll + scrollAmount
          if (newScroll >= totalWidth) {
            newScroll = newScroll - totalWidth
          }
        }

        containerRef.current.scrollTo({
          left: newScroll,
          behavior: "smooth",
        })
      }
    },
    [totalWidth],
  )

  const pauseAnimation = useCallback(() => {
    setIsAnimationPaused(true)
  }, [])

  const resumeAnimation = useCallback(() => {
    setIsAnimationPaused(false)
  }, [])

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.style.animationPlayState = isAnimationPaused ? "paused" : "running"
    }
  }, [isAnimationPaused])

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault() // Prevent the default context menu
    }

    document.addEventListener("contextmenu", handleContextMenu)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const handleScroll = () => {
        if (container.scrollLeft === 0) {
          container.scrollLeft = totalWidth
        } else if (container.scrollLeft === totalWidth * 2) {
          container.scrollLeft = totalWidth
        }
      }

      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [totalWidth])

  return (
    <section
      className="w-full py-14 px-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 relative"
      onMouseDown={pauseAnimation}
      onMouseUp={resumeAnimation}
      onMouseLeave={resumeAnimation}
      onTouchStart={pauseAnimation}
      onTouchEnd={resumeAnimation}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZiIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiNjY2MiLz4KPC9zdmc+')] opacity-75"></div>
      <div className="max-w-[1400px] mx-auto relative z-10">
        <h2 className={`font-medium text-gray-900 text-4xl mb-14 text-center underline pt-8 ${DMSans.className}`}>
          Our Trusted Partners
        </h2>

        <div className="relative overflow-hidden">
          <Button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
          >
            &#8249;
          </Button>

          <div
            ref={containerRef}
            className="overflow-hidden scroll-smooth"
            style={{
              width: `${totalWidth}px`,
            }}
          >
            <div
              ref={animationRef}
              className="flex items-center gap-4"
              style={{
                width: `${totalWidth * 3}px`,
                animation: `scroll ${totalWidth / 50}s linear infinite`,
              }}
            >
              {[...images, ...images, ...images].map((src, index) => {
                const size = imageSizes[index % imageSizes.length]
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: size.width, height: size.height }}
                  >
                    <div className="relative w-full h-full hover-shake">
                      <Image
                        src={src || "/placeholder.svg"}
                        alt={`Client logo ${(index % images.length) + 1}`}
                        fill
                        className="object-contain drop-shadow-lg transition-transform duration-300 ease-in-out hover:scale-110"
                        sizes={`${Math.max(size.width, size.height)}px`}
                        priority={index < images.length}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <Button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
          >
            &#8250;
          </Button>
        </div>
      </div>
    </section>
  )
}

