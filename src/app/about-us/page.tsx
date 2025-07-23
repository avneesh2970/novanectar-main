import Image from "next/image";
import React from "react";
import about from "@/assets/about/about.png";
import { DMSans400 } from "@/fonts/font";
import Navbar from "@/components/navbar/Navbar";
import FooterSection from "@/components/footer/FooterSection";

import isoLogo from "@/assets/about/certifications/iso.png";
import startupIndiaLogo from "@/assets/about/certifications/startup.png";
import msmeLogo from "@/assets/about/certifications/msme.png";
import mcaLogo from "@/assets/about/certifications/mca.png";
import storyImage from "@/assets/our-work/ourWork.jpg";
import teamImage from "@/assets/our-work/ourWork.jpg";

export default function page() {
  const certifications = [
    { src: isoLogo, alt: "ISO Certified" },
    { src: startupIndiaLogo, alt: "Startup India Certified" },
    { src: msmeLogo, alt: "MSME Certified" },
    { src: mcaLogo, alt: "MCA Certified" },
  ];

  const sections = [
    {
      title: "Our Story",
      image: storyImage,
      reverse: false,
    },
    {
      title: "Our Mission",
      image: storyImage,
      reverse: true,
    },
  ];
  const text = `Sprout is a story-driven EdTech platform that bridges communication and digital-literacy gaps by pairing underserved students in Phuket with volunteer mentors worldwide. Through bean-sized character guides, kitchen-themed lessons, and career-readiness tools, Sprout delivers playful, human-centered learning experiences that build confidence and real-world skills.`;

  const team = [
    { name: "Shivam Rai", role: "CEO" },
    { name: "Avneesh Kumar", role: "Director" },
    { name: "Nitish Kumar", role: "Manager" },
    { name: "Ravish", role: "Sr. Developer" },
    { name: "Surya", role: "Sr. Product Manager" },
    { name: "Sneha", role: "Sr. Graphic Designer" },
    { name: "Tanuja", role: "Designer" },
  ];

  return (
    <div className={`${DMSans400.className} bg-white`}>
      <Navbar />
      <section
        className={`${DMSans400.className} bg-[#F5F5F5] py-16 px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-7xl mx-auto bg-[#FFFFFF] px-8 py-16 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-500 tracking-wider uppercase">
                  ABOUT US
                </p>
                <h1 className="text-3xl sm:text-4xl fon-bold text-gray-900 leading-tight">
                  We provide Smart IT Solution to help your Business Grow
                </h1>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
                Novanectar Services Private Limited is a provider of technology
                solutions that work to equip individuals and organizations with
                graphic design, web design, app development and improving all
                artifacts. Fueling Progress with Smart IT Solutions, we offer
                high quality digital solutions that are often thought out to
                meet the various requirements of our Clients.
              </p>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="h-full relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={about || "/placeholder.svg"}
                  alt="smart it solution"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-8 px-4 text-center">
        <h2 className="text-lg font-medium text-gray-700 mb-6">
          Certified by India&apos;s Leading Authorities
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {certifications.map((cert, index) => (
            <div key={index} className="relative w-20 h-10 md:w-28 md:h-12">
              <Image
                src={cert.src}
                alt={cert.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 80px, 120px"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {sections.map(({ title, image, reverse }, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-xl font-semibold text-blue-900">{title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {text}
                <br />
                {text}
              </p>
            </div>
            <div className="md:w-1/2 w-full relative h-64 md:h-80">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </section>

      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 text-center bg-white">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-10">
          Our Team
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div key={index} className="space-y-3">
              <div className="relative w-full aspect-[4/5]">
                <Image
                  src={teamImage}
                  alt={member.name}
                  fill
                  className="object-cover rounded-md shadow-sm"
                  sizes="(max-width: 768px) 50vw, 200px"
                />
              </div>
              <h3 className="text-base font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
      <FooterSection />
    </div>
  );
}
