"use client";

import Navbar from "@/components/navbar/Navbar";
import { projects } from "./__data/projects";
import { DMSans, DMSans500 } from "@/fonts/font";
// import ourWork from "@/assets/our-work/ourWork.jpg";
import Image from "next/image";
import FooterSection from "@/components/footer/FooterSection";
import { useState } from "react";
import Link from "next/link";

export default function OurWorkPage() {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredProjects, setFilteredProjects] = useState(projects);

  return (
    <div
      className={`${DMSans.className} min-h-screen bg-[#F5F5F5] text-[#333335]`}
    >
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 py-8 sm:py-12">
        {/* Header */}
        <h1
          className={`${DMSans500.className} text-2xl sm:text-3xl lg:text-4xl font-bold text-[#333335] mb-4 sm:mb-5`}
        >
          Our Projects
        </h1>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {filteredProjects.map((project: any) => (
            <div key={project.id} className="group">
              <Link href={`/portfolio/${project.id}`}>
                {/* Project Image Container */}
                <div
                  className="relative mb-3 sm:mb-4 rounded-xl sm:rounded-2xl overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #f5f1e8 0%, #e8dcc0 100%)",
                  }}
                >
                  <div className="p-6 sm:p-8 lg:p-12 h-96 lg:h-[28rem] flex items-center justify-center relative scale-110 md:scale-125">
                    <Image
                      src={project.imageUrl}
                      fill
                      alt="our-projects"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="">
                  <h3 className="text-lg sm:text-xl font-semibold leading-tight">
                    {project.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center">
                    {project.tags.map((tag: any, tagIndex: any) => (
                      <span
                        key={tagIndex}
                        className="pr-2 sm:pr-3 py-1 text-black/50 text-xs sm:text-sm rounded-full font-medium flex items-center"
                      >
                        {tagIndex !== 0 && (
                          <span className="text-black/50 pr-1 text-lg sm:text-xl inline-flex items-center">
                            •
                          </span>
                        )}
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
