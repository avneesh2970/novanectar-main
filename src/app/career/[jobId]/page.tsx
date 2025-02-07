import { use } from "react";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { jobListings } from "@/data/jobsData";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import FooterSection from "@/components/footer/FooterSection";

export default function JobDetails({ params }: { params: { jobId: string } }) {
  const jobId = use(Promise.resolve(params.jobId));
  const job = jobListings.find((job: any) => job.id === jobId);
                                                                                                      
  if (!job) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h1>
        <Link href="/career" className="text-indigo-600 hover:text-indigo-800">
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar/>
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
                  // onError={(e) => {
                  //   const target = e.target as HTMLImageElement;
                  //   target.src = "/placeholder.svg";
                  // }}
                />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {job.position}
                </h1>
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
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-md transition-colors">
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
                  <span className="text-gray-600">
                    {job.details.totalExperience}
                  </span>
                </p>
                <p>
                  <span className="text-gray-900">Location - </span>
                  <span className="text-gray-600">
                    {job.details.workLocation}
                  </span>
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-medium text-gray-900 mb-3">
                Areas of Responsibility (Key Result Areas)
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                {job.details.responsibilities.map(
                  (responsibility: any, index: any) => (
                    <li key={index}>{responsibility}</li>
                  )
                )}
              </ul>
            </section>
          </div>
        </div>
      </div>
      <FooterSection/>
    </div>
  );
}
