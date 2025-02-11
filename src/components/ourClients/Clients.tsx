"use client";
import img1 from "@/assets/clients/1.png";
import img2 from "@/assets/clients/2.png";
import img3 from "@/assets/clients/3.png";
import img4 from "@/assets/clients/4.png";
import img5 from "@/assets/clients/5.png";
import img6 from "@/assets/clients/6.png";
import img7 from "@/assets/clients/7.png";
import img8 from "@/assets/clients/8.png";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { DMSans } from "@/fonts/font";

export default function Clients() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const images = [img1, img2, img3, img4, img5, img6, img7, img8];
  const imageSizes = [
    { width: 250, height: 250 },
    { width: 210, height: 200 },
    { width: 250, height: 250 },
    { width: 210, height: 200 },
    { width: 250, height: 250 },
    { width: 210, height: 200 },
    { width: 210, height: 200 },
    { width: 210, height: 200 },
  ];

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

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const scrollWidth = scrollContainer.scrollWidth;
      const clientWidth = scrollContainer.clientWidth;
      const animationDuration = (scrollWidth / clientWidth) * 20; // Adjust 20 to change speed

      scrollContainer.style.setProperty("--scroll-width", `${scrollWidth}px`);
      scrollContainer.style.setProperty(
        "--animation-duration",
        `${animationDuration}s`
      );
    }
  }, []);

  const handleMouseDown = () => setIsPaused(true);
  const handleMouseUp = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  return (
    <section
      className="w-full py-14 px-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 relative"
      ref={containerRef}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZiIvPgo8Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IiNjY2MiLz4KPC9zdmc+')] opacity-75"></div>
      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`font-medium text-gray-900 text-4xl mb-14 text-center underline pt-8 ${DMSans.className}`}
        >
          Our Trusted Partners
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="relative overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={scrollRef}
            className={`flex items-center gap-4 whitespace-nowrap ${
              isPaused ? "paused" : ""
            }`}
            style={{
              animation: "scroll var(--animation-duration) linear infinite",
            }}
          >
            {[...images, ...images].map((src, index) => {
              const size = imageSizes[index % imageSizes.length];
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -3, 3, -3, 0],
                    transition: { duration: 0.3 },
                  }}
                  className="flex-shrink-0 flex items-center justify-center "
                  style={{ width: size.width, height: size.height }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Client logo ${(index % images.length) + 1}`}
                      fill
                      className="object-contain drop-shadow-lg"
                      sizes={`${Math.max(size.width, size.height)}px`}
                      priority={index < images.length}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
