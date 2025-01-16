'use client'

import { motion } from 'framer-motion'

interface HamburgerIconProps {
  isOpen: boolean
  toggleMenu: () => void
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen, toggleMenu }) => {
  const lineVariants = {
    closed: {
      rotate: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6, // Increased duration
        ease: [0.4, 0, 0.2, 1] // Custom easing
      }
    },
    open: (custom: number) => ({
      rotate: custom === 1 ? 45 : custom === 3 ? -45 : 0,
      y: custom === 1 ? 8 : custom === 3 ? -8 : 0,
      opacity: custom === 2 ? 0 : 1,
      transition: {
        duration: 0.6, // Increased duration
        ease: [0.4, 0, 0.2, 1] // Custom easing
      }
    }),
  }

  return (
    <motion.div 
      className="w-6 h-6 flex flex-col justify-between cursor-pointer" 
      onClick={toggleMenu}
      role="button"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      {[1, 2, 3].map((line) => (
        <motion.div
          key={line}
          className="w-full h-0.5 bg-gray-800 rounded-full origin-center"
          custom={line}
          variants={lineVariants}
          animate={isOpen ? "open" : "closed"}
          initial="closed"
        />
      ))}
    </motion.div>
  )
}

export default HamburgerIcon

