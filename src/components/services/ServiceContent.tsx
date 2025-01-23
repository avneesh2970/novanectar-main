"use client";
import Image from "next/image";

import type { Service } from "@/lib/services-data";
import { DMSans, DMSans500 } from "@/fonts/font";

interface ServiceContentProps {
  service: Service;
}

export default function ServiceContent({ service }: ServiceContentProps) {
  return (
    <>
      {/* Content Section */}
      <div className="service-content md:px-8 py-8 md:py-8 bg-[#bcd0f3]">
        <div className="max-w-6xl mx-auto">
          <h2 className={`px-4 text-2xl font-bold text-gray-800 mb-4 underline ${DMSans.className}`}>
            {service.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="px-4 prose prose-lg">
              <p className={`text-gray-600 text-base md:text-xl ${DMSans500.className}`}>
                {service.detailedDescription}
              </p>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src={service.image}
                alt={`${service.title} detail`}
                fill
                className="object-cover px-2"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:py-10 bg-[#bcd0f3]">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className={`text-2xl text-black md:text-4xl font-medium text-center mb-8 ${DMSans.className} underline`}>
            Capability
          </h1>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-8 ${DMSans.className}`}>
            {service.capability.map((service, index) => (
              <div
                key={index}
                className="p-4 md:p-6 bg-white rounded-lg shadow-md border border-gray-700"
              >
                <h2 className="text-lg font-semibold mb-2 text-gray-700">
                  {service.heading}
                </h2>
                <p className="text-gray-700 text-sm">{service.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
