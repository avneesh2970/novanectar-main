"use client";

import Image from "next/image";
import about from "@/assets/about/about.png";
import { DMSans400 } from "@/fonts/font";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div
      className={`${DMSans400.className} bg-[#F5F5F5] py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-[1400px] mx-auto bg-[#FFFFFF] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm font-medium text-gray-500 tracking-wider uppercase">
                ABOUT US
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                We provide Smart IT Solution to help your Business Grow
              </h1>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-medium">
              Novanectar Services Private Limited is a provider of technology
              solutions that work to equip individuals and organizations with
              graphic design, web design, app development and improving all
              artifacts. Fueling Progress with Smart IT Solutions, we offer high
              quality digital solutions that are often thought out to meet the
              various requirements of our Clients.
            </p>
            
            {/* Move button here for better mobile layout */}
            <div className="pt-2 sm:pt-4">
              <Link
                href="/about-us"
                className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                See More
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg">
              <Image
                src={about || "/placeholder.svg"}
                alt="Smart IT solution services"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}