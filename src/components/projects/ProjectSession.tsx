import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import wearvia from "@/assets/projects/wearvia.png";
import visionIq from "@/assets/projects/vision-iq.png";
import ds from "@/assets/projects/ds.png";
import poj from "@/assets/projects/poj.jpg";

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

const ProjectCard = ({ item, index }:any) => {
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
      className="group relative bg-blue-200 rounded-2xl overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
      // id="project-section"
    >
      <div className="aspect-[14/9] relative overflow-hidden">
        <motion.div className="w-full h-full overflow-hidden bg-blue-500" whileHover="hover">
          <motion.div
            variants={imageVariants}
            className="w-full h-full relative overflow-hidden bg-blue-200"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out bg-blue-200"
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
      >
        <h3 className="text-lg text-start font-semibold mb-2 text-gray-700 pl-8 pt-4">
          {item.title}
        </h3>
        <p className="text-lg text-start font-medium mb-3 text-black pl-8">
          {item.subtitle}
        </p>
      </motion.div>
    </motion.div>
  );
};

const ProjectSession = () => {
  return (
    <div className="min-h-screen bg-blue-200 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4 text-start underline pt-8">
            Projects
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
