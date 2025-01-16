import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import reliability from "@/assets/whyUs/reliability.png";
import scalability from "@/assets/whyUs/scalability.png";
import security from "@/assets/whyUs/security.png";
import time from "@/assets/whyUs/time.png";
import customization from "@/assets/whyUs/customization.png";
import expertTeam from "@/assets/whyUs/expert-team.png";
import support from "@/assets/whyUs/support.png";
import delivery from "@/assets/whyUs/delivery.png";
import { DMSans } from "@/fonts/font";

const features = [
  {
    id: 1,
    icon: reliability,
    title: "Reliability",
  },
  {
    id: 2,
    icon: scalability,
    title: "Scalability",
  },
  {
    id: 3,
    icon:security,
    title: "Security",
  },
  {
    id: 4,
    icon:time,
    title: "Time Efficiency",
  },
];

const bottomFeatures = [
  {
    id: 5,
    icon: customization,
    title: "Customization",
  },
  {
    id: 6,
    icon: expertTeam,
    title: "Expert Teams",
  },
  {
    id: 7,
    icon: support,
    title: "24/7 Support",
  },
  {
    id: 8,
    icon: delivery,
    title: "On time delivery",
  },
];

const WhyChooseUs = () => {
  return (
    <div className={`bg-[#F8F9FA] py-16 px-4 sm:px-6 lg:px-8 ${DMSans.className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-2xl font-medium text-gray-800 mb-16">
          Why Choose Us?
        </h2>

        <div className="space-y-16">
          {/* Top Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-32">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center group"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="mb-3">
                  <div className="relative w-8 h-8">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
                <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-32">
            {bottomFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center group"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="mb-3">
                  <div className="relative w-8 h-8">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
                <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WhyChooseUs;
