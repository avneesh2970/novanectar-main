"use client"

import { useRef, useEffect } from "react"

const useScrollAnimation = (callback: () => void, threshold = 0.1) => {
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const handleScroll = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }

      animationRef.current = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop
        const windowHeight = window.innerHeight || document.documentElement.clientHeight
        const documentHeight = document.documentElement.scrollHeight

        const scrollPercentage = scrollPosition / (documentHeight - windowHeight)

        if (scrollPercentage >= threshold) {
          callback()
        }
      })
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [callback, threshold])

  return animationRef
}

export default useScrollAnimation