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
  // const [selectedCategory, setSelectedCategory] = useState("All");

  // const filterCategories = [
  //   "All",
  //   "Social Media Management",
  //   "Branding & Identity Building",
  //   "Digital Marketing & Lead Generation",
  //   "Website Development",
  //   "Graphic & Visual Design",
  //   "Software Development",
  // ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // const handleCategory = (cat: string) => {
  //   setSelectedCategory(cat);

  //   if (cat.toLowerCase() === "all") {
  //     setFilteredProjects(projects);
  //   } else {
  //     const filtered = projects.filter(
  //       (project: any) => project.category.includes(cat)
  //     );
  //     setFilteredProjects(filtered);
  //   }
  // };

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

        {/* Filter Categories */}
        {/* <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
          {filterCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategory(category)}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full border 
                ${
                  selectedCategory === category
                    ? "bg-[#333335] text-white"
                    : "border-[#333335] text-[#333335]"
                } 
                text-xs sm:text-sm font-medium transition-colors duration-200`}
            >
              {category}
            </button>
          ))}
        </div> */}

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
                {/* <div
                  className="relative mb-3 sm:mb-4 rounded-xl sm:rounded-2xl overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #f5f1e8 0%, #e8dcc0 100%)",
                  }}
                >
                  <div className="p-6 sm:p-8 lg:p-12 h-64 lg:h-[32rem] flex items-center justify-center relative">
                    <Image
                      src={project.imageUrl}
                      fill
                      alt="our-projects"
                      className="object-cover transform scale-125" // Default zoom applied
                    />
                  </div>
                </div> */}
                {/* Project Info */}
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
