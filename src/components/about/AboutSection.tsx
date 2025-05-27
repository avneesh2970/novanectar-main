"use client"

import Image from "next/image"
import about from "@/assets/about/about.png"
import { DMSans400 } from "@/fonts/font"

export default function AboutPage() {
  return (
    <div className={`${DMSans400.className} bg-[#F5F5F5] py-16 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto bg-[#FFFFFF] px-8 py-16 rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-500 tracking-wider uppercase">ABOUT US</p>
              <h1 className="text-3xl sm:text-4xl fon-bold text-gray-900 leading-tight">
                We provide Smart IT Solution to help your Business Grow
              </h1>
            </div>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
              Novanectar Services Private Limited is a provider of technology solutions that work to equip individuals
              and organizations with graphic design, web design, app development and improving all artifacts. Fueling
              Progress with Smart IT Solutions, we offer high quality digital solutions that are often thought out to
              meet the various requirements of our Clients.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="h-full relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={about || "/placeholder.svg"}
                alt="smart it solution"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
