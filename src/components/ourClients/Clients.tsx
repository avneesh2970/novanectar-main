"use client";
import img1 from "@/assets/clients/1.png";
import img2 from "@/assets/clients/2.png";
import img3 from "@/assets/clients/3.png";
import img4 from "@/assets/clients/4.png";
import img5 from "@/assets/clients/5.png";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { DMSans } from "@/fonts/font";

export default function Clients() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const images = [img1, img2, img3, img4, img5];
  const duplicatedImages = [...images, ...images, ...images];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="w-full py-20 px-4 bg-gradient-to-r from-blue-200 via-purple-100 to-pink-100 overflow-hidden relative"
      ref={containerRef}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZiIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiNjY2MiLz4KPC9zdmc+')] opacity-75"></div>
      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`font-medium text-gray-900 text-4xl mb-4 text-center underline pt-8 ${DMSans.className}`}
        >
          Our Trusted Partners
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="relative"
        >
          <motion.div
            animate={{
              x: [0, -50 * images.length],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 15, // Reduced duration for faster animation
                ease: "linear",
              },
            }}
            className="flex gap-16 whitespace-nowrap"
          >
            {duplicatedImages.map((src, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.2,
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 },
                }}
                className="w-[250px] h-[250px] relative flex-shrink-0"
              >
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Client logo ${(index % images.length) + 1}`}
                  fill
                  className="object-contain p-4 drop-shadow-lg"
                  sizes="250px"
                  priority={index < images.length}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
