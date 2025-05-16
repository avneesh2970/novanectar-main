"use client"

import { useEffect, useRef, useCallback, memo } from "react"
import Image, { type StaticImageData } from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { gsap, cleanupGSAP } from "@/lib/gsapUtils"

// Types
interface ServiceDetails {
  title: string
  description: string
  image: StaticImageData
  detailedDescription?: string
}

interface ServiceDetailViewProps {
  isOpen: boolean
  onClose: () => void
  service: ServiceDetails
}

// Define a type that matches what your gsap.from() returns
type GsapAnimation = {
  kill: () => void
}

// Memoized Header component to prevent unnecessary re-renders
const ServiceHeader = memo(({ image, title }: Pick<ServiceDetails, "image" | "title">) => (
  <div className="relative h-[300px] w-full">
    <Image
      src={image || "/placeholder.svg"}
      alt={title}
      fill
      className="object-cover"
      sizes="(max-width: 1200px) 100vw, 1200px"
      priority // Load header image with priority
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
    <div className="absolute bottom-0 left-0 p-8 text-white">
      <h2 className="text-5xl font-bold mb-2" id="service-title">
        {title}
      </h2>
      <p className="text-xl tracking-wider">DISCUSS YOUR PROJECT →</p>
    </div>
  </div>
))

ServiceHeader.displayName = "ServiceHeader"

// Memoized Content component
const ServiceContent = memo(({ title, detailedDescription, image }: ServiceDetails) => (
  <div className="service-content p-8 bg-[#f5f7ff]">
    <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="prose prose-lg">
        <p className="text-gray-600 leading-relaxed">{detailedDescription}</p>
      </div>
      <div className="relative h-[300px] rounded-lg overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={`${title} detail`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy" // Lazy load the secondary image
        />
      </div>
    </div>
  </div>
))

ServiceContent.displayName = "ServiceContent"

// Close button component
const CloseButton = memo(({ onClose }: { onClose: () => void }) => (
  <button
    onClick={onClose}
    aria-label="Close details"
    className="absolute top-4 right-4 text-white w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
  >
    ✕
  </button>
))

CloseButton.displayName = "CloseButton"

// Main component
function ServiceDetailView({ isOpen, onClose, service }: ServiceDetailViewProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<GsapAnimation | null>(null)

  // Memoize the onClose callback to prevent unnecessary re-renders
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, handleClose])

  // Process service data
  const detailedDescription =
    service.detailedDescription ||
    `Embark on a journey of digital innovation with 
    our ${service.title} services. We specialize in creating cutting-edge solutions that surpass 
    expectations. Whether you're envisioning a dynamic business platform, an interactive experience, 
    or a seamless user interface, we're here to turn your concepts into compelling, user-centric 
    realities. Join us on a voyage where technology meets imagination, and together, we'll shape 
    the future of digital solutions.`

  const serviceWithDescription = {
    ...service,
    detailedDescription,
  }

  // Handle modal open/close effects
  useEffect(() => {
    // Skip if not in browser
    if (typeof window === "undefined") return

    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = "hidden"

      // Focus the modal for accessibility
      modalRef.current?.focus()

      // Find the service-content element within our modal
      const serviceContent = modalRef.current?.querySelector(".service-content")

      if (serviceContent) {
        // Kill any existing animation
        if (animationRef.current) {
          animationRef.current.kill()
        }

        // Create new animation with optimized parameters
        animationRef.current = gsap.from(serviceContent, {
          y: 50, // Reduced distance for better performance
          opacity: 0,
          duration: 0.5, // Slightly faster animation
          delay: 0.2, // Slightly faster start
          ease: "power2.out", // Simpler easing function
        })
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = ""

      // Kill animation when modal closes
      if (animationRef.current) {
        animationRef.current.kill()
        animationRef.current = null
      }
    }

    // Cleanup function
    return () => {
      // Restore body scroll
      document.body.style.overflow = ""

      // Kill animation on cleanup
      if (animationRef.current) {
        animationRef.current.kill()
        animationRef.current = null
      }
    }
  }, [isOpen])

  // Final cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupGSAP()
    }
  }, [])

  // Framer Motion variants for consistent animations
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const modalVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 },
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 backdrop-blur-sm"
          onClick={handleClose}
          ref={modalRef}
          tabIndex={-1} // Make div focusable but not in tab order
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-title"
        >
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: "translate3d(0, 0, 0)", // Force GPU acceleration
              backfaceVisibility: "hidden", // Prevent flickering
            }}
          >
            {/* Header Image Section */}
            <ServiceHeader image={service.image} title={service.title} />

            {/* Content Section */}
            <ServiceContent {...serviceWithDescription} />

            {/* Close Button */}
            <CloseButton onClose={handleClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Export memoized component to prevent unnecessary re-renders
export default memo(ServiceDetailView)
