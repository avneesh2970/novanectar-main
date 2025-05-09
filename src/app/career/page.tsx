/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

// import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { MapPin, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { jobListings } from "@/data/jobsData"
import Navbar from "@/components/navbar/Navbar"
import FooterSection from "@/components/footer/FooterSection"
import { useState } from "react"
import { DMSans } from "@/fonts/font"

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationQuery, setLocationQuery] = useState("")
  const router = useRouter()

  const filteredJobs = jobListings.filter((job:any) => {
    const matchesSearch =
      job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.details.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = job.location.toLowerCase().includes(locationQuery.toLowerCase())
    return (!searchQuery || matchesSearch) && (!locationQuery || matchesLocation)
  })

  return (
    <div className={`bg-[#f6f6f6] min-h-screen ${DMSans.className}`}>
      <Navbar />

      <div className="w-full overflow-hidden mt-2">
        <div className="w-full min-h-[400px] flex flex-col md:flex-row items-center justify-between px-6 py-12 md:py-20">
          <div className="w-full md:w-1/2 space-y-6 mb-12 md:mb-0">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Careers at Novanectar
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Working at Novanectar is a unique opportunity to help founders build their companies at all stages, and
              offers unprecedented insight into the greater startup ecosystem.
            </motion.p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center">
            <motion.div
              className="relative w-[500px] h-[300px]"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Careers Illustration" fill className="object-contain" priority />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-indigo-900">Open Positions ({filteredJobs.length})</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredJobs.map((job:any) => (
            <div
              key={job.id}
              className="bg-white p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="font-semibold text-gray-900">{job.position}</h3>
                <h3 className="text-xs text-[#3F89EA] border px-2 rounded-md border-blue-400 bg-[#EFF6FF] font-medium">Full-time</h3>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <Clock className="h-4 w-4 mr-1 text-blue-500" />
                <span className="text-sm">{job.experience}</span>
              </div>
              <button
                className="w-full text-white border bg-blue-500 border-blue-500 rounded-md px-4 py-1.5 transition-colors hover:bg-white hover:text-blue-500"
                onClick={() => router.push(`/career/${job.id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      <FooterSection />
    </div>
  )
}

