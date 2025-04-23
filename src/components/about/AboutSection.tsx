"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import about1 from "@/assets/about/ab1.jpg";
import about2 from "@/assets/about/ab2.jpg";
import { DMSans, DMSans400 } from "@/fonts/font";

export default function AboutPage() {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleInteraction = useCallback(
    (imageIndex: number) => {
      if (!isMobile) {
        setActiveImage(imageIndex);
      }
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setActiveImage(null);
    }
  }, [isMobile]);

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8 text-center">
        <h2
        id="about-section"
          className={`text-4xl font-medium text-gray-800 underline text-center ${DMSans.className}`}
        >
          About Us
        </h2>

        <div className="max-w-6xl mx-auto">
          <h1
            className={`text-xl md:text-3xl text-black text-start font-medium leading-tight mb-[10px] ${DMSans400.className}`}
          >
            We provide smart IT solutions to help your business grow.
          </h1>

          <p
            className={`text-gray-600 text-base md:text-lg text-start font-medium ${DMSans400.className}`}
          >
            <strong className="font-normal">
              Novanectar Services Private Limited
            </strong>{" "}
            is a dynamic technical solutions start-up dedicated to empowering
            individuals and businesses with top-notch{" "}
            <strong className="font-normal">graphic design</strong>,{" "}
            <strong className="font-normal">website development</strong>,{" "}
            <strong className="font-normal">application development</strong>,
            and more. Guided by the motto{" "}
            <strong className="font-normal">
              &quot;Fueling Progress with Smart IT Solutions,&quot;
            </strong>{" "}
            we deliver smart, innovative, high-quality digital solutions
            tailored to our clients‘ diverse needs.
          </p>
        </div>

        <div
          className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-4 mt-12`}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="relative overflow-hidden rounded-2xl"
            style={{ width: "100%" }}
            animate={{
              width: isMobile ? "100%" : activeImage === 1 ? "40%" : "60%",
            }}
            initial={{ width: isMobile ? "100%" : "60%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            onMouseEnter={() => handleInteraction(0)}
          >
            <motion.div
              className="relative aspect-[4/3] w-full h-full"
              animate={{
                scale: activeImage === 0 ? 1.05 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
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
            style={{ width: "100%" }}
            animate={{
              width: isMobile ? "100%" : activeImage === 0 ? "40%" : "60%",
            }}
            initial={{ width: isMobile ? "100%" : "40%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            onMouseEnter={() => handleInteraction(1)}
          >
            <motion.div
              className="relative aspect-[4/3] w-full h-full"
              animate={{
                scale: activeImage === 1 ? 1.05 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
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
  );
}
