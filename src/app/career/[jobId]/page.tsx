"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { jobListings } from "@/data/jobsData";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import FooterSection from "@/components/footer/FooterSection";
import { DMSans } from "@/fonts/font";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
import toast from "react-hot-toast";

export default function JobDetails() {
  const params = useParams();
  const jobId = params.jobId as string;

  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [job, setJob] = useState<any>(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [cloudinaryStatus, setCloudinaryStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");

  useEffect(() => {
    const foundJob = jobListings.find((job: any) => job.id === jobId);
    setJob(foundJob);
  }, [jobId]);

  useEffect(() => {
    const checkCloudinary = () => {
      if (typeof window !== "undefined" && (window as any).cloudinary) {
        setCloudinaryStatus("ready");
      } else {
        setTimeout(checkCloudinary, 1000);
      }
    };

    checkCloudinary();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpload = useCallback(() => {
    if (cloudinaryStatus !== "ready") {
      return;
    }

    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        sources: ["local"],
        maxFiles: 1,
        multiple: false,
        resourceType: "raw",
        acceptedFiles: ".pdf",
        folder: "resumes",
      },
      (error: any, result: any) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
        } else if (result && result.event === "success") {
          setResumeUrl(result.info.secure_url);
        }
      }
    );

    widget.open();
  }, [cloudinaryStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!resumeUrl) {
        throw new Error("Please upload a resume");
      }

      const response = await fetch("/api/job-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          resume: resumeUrl,
          coverLetter: formData.coverLetter,
        }),
      });

      if (response.ok) {
        toast.success("Application submitted successfully!");
        setIsApplying(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          coverLetter: "",
        });
        setResumeUrl("");
      } else {
        throw new Error("Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 min-h-screen ${DMSans.className}`}>
      <Script
        src="https://upload-widget.cloudinary.com/global/all.js"
        strategy="afterInteractive"
        onLoad={() => setCloudinaryStatus("ready")}
        onError={() => setCloudinaryStatus("error")}
      />
      <Navbar />
      <div className="w-full mx-auto border-4 mt-20">
        <div className="rounded-lg">
          <div className="fixed top-[5.01rem] w-full z-50 border-b-2 mx-auto bg-[#F9FAFB]">
            <div className="flex justify-between items-center px-4 md:px-8 py-3 max-w-screen-xl mx-auto">
              {/* Left Section */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 relative flex-shrink-0">
                  <Image
                    src={job.company.logo || "/placeholder.svg"}
                    alt={job.company.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-base md:text-xl font-semibold text-gray-900">
                    {job.position}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs md:text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs md:text-sm">
                        {job.experience}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section (Button) */}
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 md:px-6 py-2 rounded-md text-sm md:text-base transition-colors"
                onClick={() => setIsApplying(true)}
              >
                Apply
              </button>
            </div>
          </div>

          <div className="space-y-6 mt-20 p-12">
            <section>
              <h2 className="font-medium text-gray-900 mb-2">About the job</h2>
              <div className="space-y-4 text-gray-600 text-sm">
                <p>{job.details.about}</p>
                {/* <p>{job.details.impact}</p> */}
              </div>
            </section>

            <section>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-gray-900">Position - </span>
                  <span className="text-gray-600">{job.position}</span>
                </p>
                <p>
                  <span className="text-gray-900">Job Type - </span>
                  <span className="text-gray-600">{job.details.jobType}</span>
                </p>
                <p>
                  <span className="text-gray-900">Work Location - </span>
                  <span className="text-gray-600">
                    {job.details.workLocation}
                  </span>
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-medium text-gray-900 mb-3">
                Key Responsibilities
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                {job.details.responsibilities.map(
                  (responsibility: any, index: any) => (
                    <li key={index}>{responsibility}</li>
                  )
                )}
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-gray-900 mb-3">
                Required Skills and Qualifications
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                {job.details.skillsRequired.map((skill: any, index: any) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-gray-900 mb-3">
                Preferred Skills
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                {job.details.preferredSkills.map((skill: any, index: any) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-medium text-gray-900 mb-2">
                Work Environment
              </h2>
              <div className="space-y-4 text-gray-600 text-sm">
                <p>{job.details.workEnvironment}</p>
              </div>
            </section>

            <section>
              <h2 className="font-medium text-gray-900 mb-2">Salary</h2>
              <div className="space-y-4 text-gray-600 text-sm">
                <p>{job.details.salary}</p>
              </div>
            </section>

            <section>
              <h2 className="font-medium text-gray-900 mb-2">How To Apply</h2>
              <div className="space-y-4 text-gray-600 text-sm">
                <p>
                  If this opportunity excites you. Please send your resume and
                  cover letter to hr@novanectar.co.in. Ensure your resume is
                  clear and professionally formatted. If you have any questions,
                  feel free to contact us at 8979891705.
                </p>
              </div>
            </section>
            <section>
            <h2 className="font-medium text-gray-900 mb-2">Join Us at NovaNectar and Grow Your Career!</h2>

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
                  <h2 className="text-xl font-semibold mb-4 text-gray-600">
                    Apply for {job.position}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="text-gray-600 border px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="text-gray-600 border px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="text-gray-600 border px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="resume"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Resume (PDF)
                      </label>
                      <div className="mt-1 flex items-center">
                        <button
                          type="button"
                          onClick={handleUpload}
                          disabled={cloudinaryStatus !== "ready"}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {cloudinaryStatus === "loading"
                            ? "Loading Cloudinary..."
                            : cloudinaryStatus === "error"
                            ? "Cloudinary Error"
                            : "Upload Resume"}
                        </button>
                        {resumeUrl && (
                          <span className="ml-3 text-sm text-gray-500">
                            Resume uploaded successfully
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="coverLetter"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cover Letter
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="text-gray-600 px-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
  );
}
