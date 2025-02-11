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

      <div className="w-full overflow-hidden">
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

        {/* <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by job or skills"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Location"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
            />
          </div>
          <button className="bg-indigo-500 text-white px-8 py-2.5 rounded-lg hover:bg-indigo-600 transition-colors">
            Search
          </button>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job:any) => (
            <div
              key={job.id}
              className="bg-white p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                {/* <div className="relative w-10 h-10">
                  <Image
                    src={job.company.logo || "/placeholder.svg"}
                    alt={job.company.name}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg"
                    }}
                  />
                </div> */}
                <h3 className="font-semibold text-gray-900">{job.position}</h3>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{job.experience}</span>
              </div>
              <button
                className="w-full text-indigo-600 border border-indigo-600 rounded-md px-4 py-1.5 hover:bg-indigo-50 transition-colors"
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

