"use client"
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { DMSans } from "@/fonts/font"

const faqs = [
  {
    id: 1,
    question: "Do you provide website maintenance and updates post-launch?",
    answer:
      "Yes, we offer comprehensive website maintenance and updates, including content changes, performance optimization, bug fixes, and feature enhancements to ensure your website stays secure, functional, and up-to-date.",
  },
  {
    id: 2,
    question: "How do you ensure app security and data privacy?",
    answer:
      "We follow industry best practices, including encryption, secure authentication, regular vulnerability testing, and adherence to data protection laws, ensuring that all apps we develop prioritize user security and data privacy.",
  },
  {
    id: 3,
    question: "How long does it take to see SEO results? ",
    answer:
      "SEO results typically take 3 to 6 months, depending on competition, keyword difficulty, and the scope of optimization efforts, but steady improvements can often be observed within a few weeks.",
  },
  {
    id: 4,
    question: "How many design revisions do you offer?",
    answer:
      "We offer multiple design revisions based on your feedback to ensure the final output aligns perfectly with your vision, with specific limits depending on the project package chosen.",
  },
  {
    id: 5,
    question: "Do you conduct user testing for design projects?",
    answer:
      "Yes, we conduct user testing to gather real user feedback, identify usability issues, and optimize the design for an enhanced user experience and functionality.",
  },
  {
    id: 6,
    question: "What digital marketing strategies do you specialize in?",
    answer:
      "We specialize in SEO, social media marketing, pay-per-click advertising, content marketing, email marketing, and comprehensive digital strategy development to boost brand visibility and achieve your business goals.",
  },
]

const FAQItem = ({ faq, isOpen, onClick, isHovered, onHover, onHoverEnd }: any) => {
  return (
    <motion.div
      className="border-t border-gray-400/30 py-4"
      initial={false}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
    >
      <motion.div className="flex justify-between items-center cursor-pointer group" onClick={onClick}>
        <h3 className="text-white text-base pr-8">{faq.question}</h3>
        <motion.div
          animate={{
            rotate: isOpen ? 45 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="shrink-0"
        >
          <Plus className="text-white w-5 h-5 group-hover:scale-110 transition-transform" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.15,
                },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.4,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.25,
                },
              },
            }}
            className="overflow-hidden"
          >
            <p className="text-gray-300 text-start mt-3 text-sm leading-relaxed pr-8">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const FAQSection = () => {
  const [openId, setOpenId] = useState<any>(null)
  const [hoveredId, setHoveredId] = useState<any>(null)

  return (
    <div className={`bg-[#0B2341] px-4 py-12 ${DMSans.className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Split layout container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left column - Text content */}
          <div className="lg:sticky lg:top-16 lg:h-fit">
            <motion.h2
              className="text-gray-400 text-lg mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              FAQ
            </motion.h2>

            <motion.h1
              className="text-white text-3xl md:text-4xl font-semibold mb-6 max-w-xl text-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Let&apos;s Make Something Awesome Together
            </motion.h1>

            <motion.p
              className="text-gray-300 text-sm leading-relaxed text-start max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              At Novanectar Services, we believe in transforming ideas into impactful IT Solutions. From website
              development to app creation, SEO, graphic design, UI/UX, and digital marketing, we specialize in crafting
              tailored strategies to meet your goals.
            </motion.p>
            <motion.p
              className="text-gray-300 text-sm mt-6 leading-relaxed text-start max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Let&apos;s make something awesome together! Whether you need a dynamic website, a feature-rich app, or a
              creative marketing campaign, our team ensures quality, innovation, and seamless execution.
            </motion.p>
            <motion.p
              className="text-gray-300 text-sm mt-6 leading-relaxed text-start max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Got questions? Explore our services, timelines, or processes in our FAQ section. Together, we&apos;ll build
              exceptional solutions that elevate your brand and achieve remarkable results. Reach out today!
            </motion.p>
          </div>

          {/* Right column - FAQ items */}
          <motion.div
            className="lg:pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {faqs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                isHovered={hoveredId === faq.id}
                onHover={() => setHoveredId(faq.id)}
                onHoverEnd={() => setHoveredId(null)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default FAQSection

