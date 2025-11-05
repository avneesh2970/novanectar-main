'use client'

import ServiceCard from './ServiceCard'
import { services } from '@/lib/services-data'

export default function ServicesSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F5F5]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch ">
          {services.map((service) => (
            // <div key={service.id}>
              <ServiceCard key={service.id} {...service} />
            // </div>
          ))}
        </div>
      </div>
    </section>
  )
}