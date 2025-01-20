"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Service } from "@/lib/services-data";
import { DMSans } from "@/fonts/font";
import { MoveUpRight } from 'lucide-react';

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
    <Link href={`/services/${id}`} className="h-full block w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-lg shadow-lg overflow-hidden group pb-6 hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col transform hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden rounded-t-lg">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />
        </div>
        <div className="flex items-center justify-center w-24 sm:w-28 md:w-32 lg:w-36 h-24 sm:h-28 md:h-32 lg:h-36 mx-auto -mt-12 sm:-mt-14 md:-mt-16 lg:-mt-18 relative z-10">
          <Image
            src={icon || "/placeholder.svg"}
            alt={`${title} icon`}
            width={160}
            height={160}
            className="transition-transform duration-300 group-hover:scale-110 border-[6px] sm:border-[8px] md:border-[10px] border-blue-300 rounded-full bg-white"
          />
        </div>
        <div className="px-4 sm:px-6 md:px-8 pt-4 flex-grow flex flex-col justify-between">
          <div>
            <motion.h3
              className="mb-2 md:mb-3 text-lg sm:text-xl md:text-2xl text-gray-800 font-bold group-hover:text-blue-600 transition-colors duration-300"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </motion.h3>
            <p className={`text-start text-gray-600 text-sm sm:text-base md:text-lg ${DMSans.className}`}>
              {description}
            </p>
          </div>
          <div className="mt-4 flex items-center text-blue-500 font-semibold text-sm sm:text-base">
            Learn More
            <MoveUpRight className="ml-1 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
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

