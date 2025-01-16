"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Service } from "@/lib/services-data";
import { DMSans } from "@/fonts/font";

type ServiceCardProps = Service;

export default function ServiceCard({
  id,
  title,
  description,
  icon,
  image,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/services/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-lg shadow-lg overflow-hidden group pb-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-80 mb-6 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="flex items-center justify-center w-32 h-20 mx-auto mb-6 absolute top-[19rem] left-1/2 -translate-x-1/2">
          <Image
            src={icon}
            alt={`${title} icon`}
            width={150}
            height={150}
            className="transition-transform duration-300 group-hover:scale-110 border-8 border-blue-300 rounded-full"
          />
        </div>

        <motion.h3
          className="mb-4 mt-24 text-xl font-bold text-center text-gray-800"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>

        <p className={`text-start px-6 text-gray-600 text-xl ${DMSans}`}>
          {description}
        </p>

        <motion.div
          className="absolute inset-x-0 bottom-0 h-1 bg-blue-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  );
}
