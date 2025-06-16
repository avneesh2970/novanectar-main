"use client"

import FooterSection from "@/components/footer/FooterSection"
import Navbar from "@/components/navbar/Navbar"
import { motion } from "framer-motion"
import { BookOpen, Newspaper, TrendingUp } from "lucide-react"

export default function NewsPage() {
  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="absolute top-20 left-10 w-20 h-20 bg-blue-500/30 rounded-full blur-xl"
          />
          <motion.div
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "1s" }}
            className="absolute top-40 right-20 w-32 h-32 bg-purple-500/30 rounded-full blur-xl"
          />
          <motion.div
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "2s" }}
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-500/30 rounded-full blur-xl"
          />
        </div>

        {/* Main Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-24 mt-20 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Newspaper className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            No News Yet
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-2xl md:text-4xl font-semibold mb-8"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Stay Updated
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            We&apos;re preparing to bring you the latest news and updates. Check back soon for fresh content!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex justify-center items-center space-x-8"
          >
            <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-3">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-600 font-medium">Articles</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-3">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-600 font-medium">Updates</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <p className="text-gray-600 font-medium">Insights</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <FooterSection />
    </>
  )
}
