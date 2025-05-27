"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Service } from "@/lib/services-data";
import { DMSans500 } from "@/fonts/font";
import { MoveUpRight } from "lucide-react";

type ServiceCardProps = Service;

export default function ServiceCard({
  id,
  title,
  description,
  icon,
  image,
}: ServiceCardProps) {
  return (
    <Link href={`/services/${id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-[#FAEEEE] rounded-lg shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 cursor-pointer pb-4 flex flex-col transform hover:-translate-y-1 max-w-sm mx-auto h-full"
      >
        <div className="relative w-full pt-[75%] overflow-hidden rounded-t-lg">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover absolute top-0 left-0 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 384px"
            quality={80}
            priority={false}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNGQUVFRUUiLz48L3N2Zz4="
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 group-hover:bg-opacity-30" />
        </div>
        <div className="flex items-center justify-center w-20 sm:w-24 h-20 sm:h-24 mx-auto -mt-10 sm:-mt-12 relative z-10">
          <Image
            src={icon || "/placeholder.svg"}
            // alt={`${title} icon`}
            alt={`smart it solution`}
            width={96}
            height={96}
            className="transition-transform duration-300 group-hover:scale-110 border-4 sm:border-6 border-blue-300 rounded-full bg-white"
            quality={85}
            loading="lazy"
          />
        </div>
        <div className="px-4 pt-2">
          <div>
            <h3
              className={`text-xl sm:text-2xl text-gray-800 group-hover:text-blue-500 transition-colors duration-300 ${DMSans500.className}`}
            >
              {title}{" "}
              <MoveUpRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 inline" />
            </h3>
            <p
              className={`text-start text-gray-600 text-base md:text-lg mt-1 ${DMSans500.className}`}
            >
              {description}
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </motion.div>
    </Link>
  );
}
