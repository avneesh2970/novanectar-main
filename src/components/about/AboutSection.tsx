'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import about1 from "@/assets/about/about1.jpg"
import about2 from "@/assets/about/about2.jpg"

export default function AboutPage() {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <h2 className="text-4xl font-medium text-gray-800 underline">About</h2>
        
        <div className="max-w-3xl">
          <h1 className="text-3xl text-black font-medium leading-tight mb-6">
            We provide smart digital solutions to help your business grow.
          </h1>
          
          <p className="text-gray-600 text-lg">
            We specialize in a wide range of design development, including UI/UX, Graphic Design, 2D/3D Illustration & Animation, Logo & Brand Identity Design, Web Development, App Development, SEO and more.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-12">
          <motion.div
            className="relative overflow-hidden rounded-2xl"
            style={{ width: '100%' }}
            animate={{
              width: hoveredImage === 1 ? '40%' : '60%'
            }}
            initial={{ width: '60%' }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            onHoverStart={() => setHoveredImage(0)}
            onHoverEnd={() => setHoveredImage(null)}
          >
            <motion.div
              className="relative aspect-[4/3] w-full h-full"
              animate={{
                scale: hoveredImage === 0 ? 1.1 : 1
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              <Image
                src={about1 || "/placeholder.svg"}
                alt="Team working on business strategy"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-2xl"
            style={{ width: '100%' }}
            animate={{
              width: hoveredImage === 0 ? '40%' : hoveredImage === 1 ? '60%' : '40%'
            }}
            initial={{ width: '40%' }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            onHoverStart={() => setHoveredImage(1)}
            onHoverEnd={() => setHoveredImage(null)}
          >
            <motion.div
              className="relative aspect-[4/3] w-full h-full"
              animate={{
                scale: hoveredImage === 1 ? 1.1 : 1
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              <Image
                src={about2 || "/placeholder.svg"}
                alt="Team collaborating on documents"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

