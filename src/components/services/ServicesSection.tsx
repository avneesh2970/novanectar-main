'use client'

import ServiceCard from './ServiceCard'
import { services } from '@/lib/services-data'

export default function ServicesSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {services.map((service) => (
            <div key={service.id} className="w-full">
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


