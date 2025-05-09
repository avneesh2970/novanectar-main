"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import reliability from "@/assets/whyUs/reliability.png"
import scalability from "@/assets/whyUs/scalability.png"
import security from "@/assets/whyUs/security.png"
import time from "@/assets/whyUs/time.png"
import customization from "@/assets/whyUs/customization.png"
import expertTeam from "@/assets/whyUs/expert-team.png"
import support from "@/assets/whyUs/support.png"
import delivery from "@/assets/whyUs/delivery.png"
import { DMSans } from "@/fonts/font"

const features = [
  {
    id: 1,
    icon: reliability,
    title: "Reliability",
    description:
      "Trusted by millions Uniswap products are powered by the Uniswap Protocol. The protocol is the largest onchain marketplace",
  },
  {
    id: 2,
    icon: scalability,
    title: "Scalability",
    description:
      "Trusted by millions Uniswap products are powered by the Uniswap Protocol. The protocol is the largest onchain marketplace",
  },
  {
    id: 3,
    icon: security,
    title: "Security",
    description:
      "Trusted by millions Uniswap products are powered by the Uniswap Protocol. The protocol is the largest onchain marketplace",
  },
  {
    id: 4,
    icon: time,
    title: "Time Efficiency",
    description:
      "Trusted by millions Uniswap products are powered by the Uniswap Protocol. The protocol is the largest onchain marketplace",
  },
  {
    id: 5,
    icon: customization,
    title: "Customization",
    description:
      "Trusted by millions Uniswap products are powered by the Uniswap Protocol. The protocol is the largest onchain marketplace",
  },
  {
    id: 6,
    icon: expertTeam,
    title: "Expert Teams",
    description:
      "Trusted by millions Uniswap products are powered by the Uniswap Protocol. The protocol is the largest onchain marketplace",
  },
  {
    id: 7,
    icon: support,
    title: "24/7 Support",
    description:
      "Trusted by millions Uniswap products are powered by the Uniswap Protocol. The protocol is the largest onchain marketplace",
  },
  {
    id: 8,
    icon: delivery,
    title: "On time delivery",
    description:
      "Trusted by millions Uniswap products are powered by the Uniswap Protocol. The protocol is the largest onchain marketplace",
  },
]

export const WhyChooseUs = () => {
  return (
    <div className={`bg-[#FFFFFF] py-10 px-4 sm:px-6 lg:px-8 w-full ${DMSans.className}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`font-medium text-[#6C6C6C] text-3xl mb-8 text-center ${DMSans.className}`}>Why Choose Us?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.slice(0, 4).map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {features.slice(4).map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  )
}

const FeatureCard = ({ feature }) => {
  return (
    <motion.div
      className="bg-[#F0F4F9] rounded-3xl p-6 flex flex-col h-full relative overflow-hidden"
      initial={{ boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      {/* Background gradient that appears on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent to-[#E8EEF5] opacity-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
      />

      {/* Content container */}
      <motion.div className="relative z-10">
        <motion.div
          className="w-16 h-16 mb-4"
          whileHover={{ rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}
        >
          <motion.div
            className="w-16 h-16 rounded-full border border-black flex items-center justify-center"
            whileHover={{
              scale: 1.1,
              borderColor: "#000",
              backgroundColor: "rgba(255,255,255,0.8)",
              transition: { duration: 0.2 },
            }}
          >
            <Image
              src={feature.icon || "/placeholder.svg"}
              alt={feature.title}
              width={24}
              height={24}
              className="object-contain"
            />
          </motion.div>
        </motion.div>

        <motion.h3
          className="text-2xl font-medium text-[#1C1C1C] mb-3"
          whileHover={{
            x: 5,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
        >
          {feature.title}
        </motion.h3>

        <motion.p
          className="text-sm text-[#1C1C1C]"
          initial={{ opacity: 0.9 }}
          whileHover={{
            opacity: 1,
            transition: { duration: 0.2 },
          }}
        >
          {feature.description}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default WhyChooseUs
