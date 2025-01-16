'use client'

import { useEffect, useRef } from 'react'
import Image, { StaticImageData } from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

interface ServiceDetailViewProps {
  isOpen: boolean
  onClose: () => void
  service: {
    title: string
    description: string
    image: StaticImageData
    detailedDescription?: string
  }
}

export default function ServiceDetailView({
  isOpen,
  onClose,
  service
}: ServiceDetailViewProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      // GSAP animation for content
      gsap.from('.service-content', {
        y: 100,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: 'power3.out'
      })
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const detailedDescription = service.detailedDescription || `Embark on a journey of digital innovation with 
    our ${service.title} services. We specialize in creating cutting-edge solutions that surpass 
    expectations. Whether you're envisioning a dynamic business platform, an interactive experience, 
    or a seamless user interface, we're here to turn your concepts into compelling, user-centric 
    realities. Join us on a voyage where technology meets imagination, and together, we'll shape 
    the future of digital solutions.`

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={onClose}
          ref={modalRef}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image Section */}
            <div className="relative h-[300px] w-full">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h2 className="text-5xl font-bold mb-2">{service.title}</h2>
                <p className="text-xl tracking-wider">DISCUSS YOUR PROJECT →</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="service-content p-8 bg-[#f5f7ff]">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {service.title}
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="prose prose-lg">
                  <p className="text-gray-600 leading-relaxed">
                    {detailedDescription}
                  </p>
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} detail`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

