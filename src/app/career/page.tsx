"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import img from "@/assets/jobs/main.png";

import { useState } from "react";
import { Search, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import FooterSection from "@/components/footer/FooterSection";

// Sample data structure - this could later come from an API
const jobListings = [
  {
    id: 1,
    title: "Senior Manager",
    location: "Bangalore",
    experience: "5 Years of experience",
  },
  {
    id: 2,
    title: "Senior Manager",
    location: "Bangalore",
    experience: "5 Years of experience",
  },
  {
    id: 3,
    title: "Senior Manager",
    location: "Bangalore",
    experience: "5 Years of experience",
  },
  {
    id: 4,
    title: "Senior Manager",
    location: "Bangalore",
    experience: "5 Years of experience",
  },
  {
    id: 5,
    title: "Senior Manager",
    location: "Bangalore",
    experience: "5 Years of experience",
  },
  {
    id: 6,
    title: "Senior Manager",
    location: "Bangalore",
    experience: "5 Years of experience",
  },
  {
    id: 7,
    title: "Senior Manager",
    location: "Bangalore",
    experience: "5 Years of experience",
  },
  {
    id: 8,
    title: "Senior Manager",
    location: "Bangalore",
    experience: "5 Years of experience",
  },
  {
    id: 9,
    title: "Senior Manager",
    location: "Bangalore",
    experience: "5 Years of experience",
  },
  {
    id: 10,
    title: "Senior Manager",
    location: "Bangalore",
    experience: "5 Years of experience",
  },
];

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  return (
    <div className="bg-[#f6f6f6]">
      <Navbar />

      <div className="w-full overflow-hidden"> {/* Added overflow-hidden wrapper */}
      <div className="w-full min-h-[400px] flex flex-col md:flex-row items-center justify-between px-6 py-12 md:py-20">
        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-6 mb-12 md:mb-0">
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Careers at Assured Job
          </motion.h1>
          
          <motion.p
            className="text-lg text-gray-600 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Working at Novanectar is a unique opportunity to help founders build
            their companies at all stages, and offers unprecedented insight into
            the greater startup ecosystem. See open positions below across our
            software, investment and operations teams.
          </motion.p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <motion.div
            className="relative w-[500px] h-[300px]"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              ease: "easeOut"
            }}
          >
            <Image
              src={img}
              alt="Lock and Key Illustration"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>






      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-indigo-900">
            Open Positions ({jobListings.length})
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
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
              className="text-gray-800 w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
            />
          </div>
          <button className="bg-indigo-500 text-white px-8 py-2.5 rounded-lg hover:bg-indigo-600 transition-colors">
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {jobListings.map((job) => (
            <div
              key={job.id}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-gray-900 mb-2">{job.title}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{job.experience}</span>
              </div>
              <button className="w-full text-indigo-600 border border-indigo-600 rounded-md px-4 py-1.5 hover:bg-indigo-50 transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
