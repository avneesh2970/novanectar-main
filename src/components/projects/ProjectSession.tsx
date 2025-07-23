"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import wearvia from "@/assets/projects/wearvia.png";
import visionIq from "@/assets/projects/vision-iq.png";
import ds from "@/assets/projects/ds.png";
import poj from "@/assets/projects/poj.png";
import { DMSans, DMSans500 } from "@/fonts/font";

const gridItems = [
  {
    id: 1,
    title: "Wearvia",
    subtitle: "Web Design and Develop",
    description:
      "Premium fabrics and modern designs, bringing confidence and style to your wardrobe.",
    href: "#wearvia",
    image: wearvia,
    tag: "Fashion & Design",
  },
  {
    id: 2,
    title: "Vision IQ",
    subtitle: "Web Design and Develop",
    description: "Visualize your data and make decisions that drive success",
    href: "#visioniq",
    image: visionIq,
    tag: "Data Analytics",
  },
  {
    id: 3,
    title: "DStack",
    subtitle: "Web Design and Develop",
    description:
      "Monitor your business's performance at a glance. Our intuitive dashboard makes it easy to track your growth.",
    href: "#dstack",
    image: ds,
    tag: "Business Intelligence",
  },
  {
    id: 4,
    title: "Poj Furniture",
    subtitle: "Web Design and Develop",
    description:
      "Modern furniture for contemporary living spaces. Discover our exclusive collection.",
    href: "#poj",
    image: poj,
    tag: "Interior Design",
  },
];

const ProjectCard = ({ item, index }: any) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="group relative bg-[#fff2f2] rounded-2xl overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
    >
      <div className="aspect-[14/9] relative overflow-hidden">
        <motion.div
          className="w-full h-full overflow-hidden"
          whileHover="hover"
        >
          <motion.div
            variants={imageVariants}
            className="w-full h-full relative overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 2}
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + index * 0.1 }}
        className={`${DMSans500.className}`}
      >
        <p className="text-lg text-start font-medium mb- text-gray-700 pl-4 pt-4">
          {item.subtitle}
        </p>
        <h3 className="text-lg text-start font-semibold mb-2 text-gray-900 pl-4">
          {item.title}
        </h3>
      </motion.div>
    </motion.div>
  );
};

const ProjectSession = () => {
  return (
    <div className="min-h-screen bg-[#fff2f2] px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* <h2
            className={`font-medium text-gray-900 text-4xl mb-4 text-center underline pt-8 ${DMSans.className}`}
          >
            Projects
          </h2> */}
          <h2
          className={`text-3xl sm:text-4xl md:text-5xl text-center font-semibold text-gray-800 mb-14 ${DMSans.className}`}
        >
          <span className="inline-block relative">
            Projects
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#3DBBFA]"></span>
          </span>{" "}
          {/* <span className="inline-block">Trusted Clients</span> */}
        </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {gridItems.map((item, index) => (
            <ProjectCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectSession;
