"use client";

import React from "react";
import Image from "next/image";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { motion } from "framer-motion";
import { DMSans } from "@/fonts/font";

const slideImages = [
    { url: "/images/product/sszone.png" },
    { url: "/images/product/nnhire.png" },
  { url: "/images/product/tap-to-taste.png" },
  { url: "/images/product/billing.png" },
];

const Slideshow = () => {
  return (
    <div className="slide-container text-center max-w-[1400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 pt-12"
      >
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl text-center font-semibold text-gray-800 mb-14 ${DMSans.className}`}
        >
          <span className="inline-block relative">
            Our Products
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#3DBBFA]"></span>
          </span>{" "}
        </h2>
      </motion.div>
      <Slide
        duration={3000}
        transitionDuration={700}
        arrows
        indicators
        pauseOnHover
        infinite
        autoplay={true} 
      >
        {slideImages.map((fadeImage, index) => (
          <div key={index} className="each-fade flex justify-center">
            <Image
              src={fadeImage.url}
              alt={`Slide ${index + 1}`}
              width={1200}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "12px",
              }}
              priority={index === 0}
            />
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
