"use client";
import img1 from "@/assets/clients/1.png";
import img2 from "@/assets/clients/2.png";
import img3 from "@/assets/clients/3.png";
import img4 from "@/assets/clients/4.png";
import img5 from "@/assets/clients/5.png";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Clients() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const images = [img1, img2, img3, img4, img5];

  return (
    <section className="w-full py-12 px-4 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-medium underline text-center mb-16 text-gray-800"
        >
          Our Clients
        </motion.h2>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {images.map((src, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="w-[calc(50%-1rem)] sm:w-[calc(33.33%-1rem)] md:w-[200px] relative aspect-square"
            >
              <Image
                src={src}
                alt={`Client logo ${index + 1}`}
                fill
                className="object-contain p-4"
                sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 200px"
                priority={index < 4}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}