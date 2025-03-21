"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import powerBi1 from "../../assets/popups/powerbi1.png" // Portrait for mobile
import powerBi from "../../assets/popups/powerbi.png" // Landscape for desktop

export default function ImagePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  // Show popup after a short delay when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [isOpen])

  // Function to determine max width based on screen size
  const getMaxWidth = () => {
    const width = window.innerWidth
    if (width < 480) return "240px"
    if (width < 640) return "280px"
    if (width < 768) return "320px"
    if (width < 1024) return "380px" // Slightly reduced for desktop
    return "450px" // Reduced for large desktop
  }

  // State to track max width
  const [maxWidth, setMaxWidth] = useState("240px")

  // Update max width and check if mobile on resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setMaxWidth(getMaxWidth())
      setIsMobile(width < 768) // Consider devices below 768px as mobile
    }

    // Set initial values
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate navbar height - adjust this value based on your actual navbar height
  const navbarHeight = 70 // in pixels

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center", // Center vertically
            justifyContent: "center",
            padding: "20px",
            paddingTop: `${navbarHeight + 20}px`, // Add space for navbar
          }}
          initial={{
            backgroundColor: "rgba(0, 0, 0, 0)",
            backdropFilter: "blur(0px)",
          }}
          animate={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
          }}
          exit={{
            backgroundColor: "rgba(0, 0, 0, 0)",
            backdropFilter: "blur(0px)",
          }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: maxWidth,
              display: "flex",
              flexDirection: "column",
            }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.3,
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
          >
            {/* Image container */}
            <div
              style={{
                position: "relative",
                overflow: "hidden", // Hide overflow, no scrollbar
                borderRadius: "0.75rem",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backgroundColor: "white",
                // No max-height constraint to avoid scrollbar
              }}
            >
              {/* Close button */}
              <motion.button
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "8px",
                  zIndex: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "9999px",
                  padding: "6px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => setIsOpen(false)}
                aria-label="Close popup"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>

              {/* Image with height constraint */}
              <div
                style={{
                  maxHeight: isMobile ? "none" : `calc(85vh - ${navbarHeight}px)`, // Reduced height for desktop
                  overflow: "hidden", // Hide overflow
                }}
              >
                <Image
                  src={isMobile ? powerBi1 : powerBi}
                  alt="Power BI Workshop by Novanectar Services"
                  width={1080}
                  height={1080}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Register button */}
            <motion.div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  fontWeight: 500,
                  padding: "0.5rem 1.5rem",
                  borderRadius: "9999px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  border: "none",
                  cursor: "pointer",
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#1d4ed8",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLScoiS8PEIPIA7P3CL3Nq0NZjyhfAg8FECPZCfO9LasczAFU0g/viewform",
                    "_blank",
                  )
                }
              >
                Register Now
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

