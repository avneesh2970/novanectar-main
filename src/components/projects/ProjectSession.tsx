"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
// import wearvia from "@/assets/projects/wearvia.png";
// import visionIq from "@/assets/projects/vision-iq.png";
// import ds from "@/assets/projects/ds.png";
// import poj from "@/assets/projects/poj.png";
import { DMSans, DMSans400, DMSans500 } from "@/fonts/font";

import { projects as gridItems } from "@/app/portfolio/__data/projects";
import Link from "next/link";

// const gridItems = [
//   {
//     id: 1,
//     title: "Wearvia",
//     subtitle: "Web Design and Develop",
//     description:
//       "Premium fabrics and modern designs, bringing confidence and style to your wardrobe.",
//     href: "#wearvia",
//     image: wearvia,
//     tag: "Fashion & Design",
//   },
//   {
//     id: 2,
//     title: "Vision IQ",
//     subtitle: "Web Design and Develop",
//     description: "Visualize your data and make decisions that drive success",
//     href: "#visioniq",
//     image: visionIq,
//     tag: "Data Analytics",
//   },
//   {
//     id: 3,
//     title: "DStack",
//     subtitle: "Web Design and Develop",
//     description:
//       "Monitor your business's performance at a glance. Our intuitive dashboard makes it easy to track your growth.",
//     href: "#dstack",
//     image: ds,
//     tag: "Business Intelligence",
//   },
//   {
//     id: 4,
//     title: "Poj Furniture",
//     subtitle: "Web Design and Develop",
//     description:
//       "Modern furniture for contemporary living spaces. Discover our exclusive collection.",
//     href: "#poj",
//     image: poj,
//     tag: "Interior Design",
//   },
// ];

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

  // const imageVariants = {
  //   hover: {
  //     scale: 1.05,
  //     transition: {
  //       duration: 0.3,
  //       ease: "easeInOut",
  //     },
  //   },
  // };

  return (
    <motion.div
      className={`${DMSans500} group relative bg-[#fff2f2] rounded-2xl overflow-hidden`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
    >
      <div>
        <div
          className="relative mb-3 sm:mb-4 rounded-xl sm:rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #f5f1e8 0%, #e8dcc0 100%)",
          }}
        >
          <div className="p-6 sm:p-8 lg:p-12 h-64 lg:h-96 flex items-center justify-center relative">
            <Image
              src={item.imageUrl}
              fill
              alt="our-projects"
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <h3 className="text-gray-700 text-lg sm:text-xl font-semibold leading-tight">
            {item.title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap items-center">
            {item.tags.map((tag: any, tagIndex: any) => (
              <span
                key={tagIndex}
                className="pr-2 sm:pr-3 py-1 text-black/50 text-xs sm:text-sm rounded-full font-medium"
              >
                {tagIndex !== 0 && (
                  <span className="text-black/50 pr-1 text-lg sm:text-xl">
                    •
                  </span>
                )}
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectSession = () => {
  return (
    <div className={`${DMSans400.className} min-h-screen bg-[#fff2f2] px-4 py-12 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
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
          {gridItems.slice(0, 4).map((item: any, index: any) => (
            <ProjectCard key={item.id} item={item} index={index} />
          ))}
        </div>
        <div className="pt-4 text-center">
          <Link href="/portfolio" className="py-3 px-4 text-center rounded-md bg-[#4169E1] text-white font-medium hover:bg-blue-600 transition-colors">
            See more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectSession;
