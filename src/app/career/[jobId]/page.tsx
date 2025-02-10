"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Clock, MapPin } from "lucide-react"
import { jobListings } from "@/data/jobsData"
import { useParams } from "next/navigation"
import Navbar from "@/components/navbar/Navbar"
import FooterSection from "@/components/footer/FooterSection"
import { DMSans } from "@/fonts/font"
import { motion, AnimatePresence } from "framer-motion"

export default function JobDetails() {
  const params = useParams()
  const jobId = params.jobId as string

  const [isApplying, setIsApplying] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    coverLetter: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [job, setJob] = useState<any>(null)

  useEffect(() => {
    const foundJob = jobListings.find((job: any) => job.id === jobId)
    setJob(foundJob)
  }, [jobId])

  if (!job) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/job-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          ...formData,
        }),
      })

      if (response.ok) {
        alert("Application submitted successfully!")
        setIsApplying(false)
        setFormData({
          name: "",
          email: "",
          phone: "",
          resume: "",
          coverLetter: "",
        })
      } else {
        throw new Error("Failed to submit application")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`bg-gray-50 min-h-screen ${DMSans.className}`}>
      <Navbar />
      <div className="w-full mx-auto p-6 border-4 mt-20">
        <div className="rounded-lg p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative">
                <Image
                  src={job.company.logo || "/placeholder.svg"}
                  alt={job.company.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{job.position}</h1>
                <div className="flex items-center gap-4 text-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{job.experience}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-md transition-colors"
              onClick={() => setIsApplying(true)}
            >
              Apply
            </button>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="font-medium text-gray-900 mb-2">About the job</h2>
              <div className="space-y-4 text-gray-600 text-sm">
                <p>{job.details.summary}</p>
                <p>{job.details.impact}</p>
              </div>
            </section>

            <section>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-900">Total Experience - </span>
                  <span className="text-gray-600">{job.details.totalExperience}</span>
                </p>
                <p>
                  <span className="text-gray-900">Location - </span>
                  <span className="text-gray-600">{job.details.workLocation}</span>
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-medium text-gray-900 mb-3">Areas of Responsibility (Key Result Areas)</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                {job.details.responsibilities.map((responsibility: any, index: any) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ul>
            </section>
          </div>

          <AnimatePresence>
            {isApplying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]"
                onClick={() => setIsApplying(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300 }}
                  className="bg-white rounded-lg p-6 w-full max-w-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="text-xl font-semibold mb-4 text-gray-600">Apply for {job.position}</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="text-gray-600 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="text-gray-600 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="text-gray-600 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                        Resume Link
                      </label>
                      <input
                        type="url"
                        id="resume"
                        name="resume"
                        value={formData.resume}
                        onChange={handleInputChange}
                        required
                        className="text-gray-600 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                        Cover Letter
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="text-gray-600 px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      ></textarea>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setIsApplying(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <FooterSection />
    </div>
  )
}

