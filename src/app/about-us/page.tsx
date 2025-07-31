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
import ourVision from "@/assets/about/ourVision.jpg";
import ourStory from "@/assets/about/ourStory.jpg";
import TeamSection from "@/components/team/TeamSection";

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
      image: ourStory,
      reverse: false,
      text1:
        "We NovaNectar Smart IT Solutions started as a small team in Dehradun with a huge faith in the capability of intelligent digital solutions. We did not begin as a big corporation. We began with passion, ability and a vision to enable businesses to expand with technology and imagination.",
      text2:
        "We spent the early years working with startups and small businesses listening to their concepts and assisting them in establishing a solid digital base. Whether it was designing a website, building an app or enhancing their online presence. We took care to create work that actually mattered.",
    },
    {
      title: "Our Vision",
      image: ourVision,
      reverse: true,
      text1:
        "At NovaNectar Smart IT Solutions, our vision is to become a trusted growth partner for businesses by delivering innovation, collaboration and support any time it is needed, big or small. We aim to be more than just a service provider and want to grow alongside our clients by offering smart IT solutions, creative thinking and dependable teamwork.",
      text2:
        "Whether you are a startup or expanding firm we are confident in offering quality and simple digital services that yield results. We are dedicated to listening, evolving and being there when it counts the most because your success is our success.",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const team = [
    { name: "Shivam Rai", role: "CEO" },
    { name: "Avneesh Kumar", role: "Director" },
    { name: "Nitish Kumar", role: "Manager" },
    // { name: "Ravish", role: "Sr. Developer" },
    // { name: "Surya", role: "Sr. Product Manager" },
    // { name: "Sneha", role: "Sr. Graphic Designer" },
    // { name: "Tanuja", role: "Designer" },
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
                At NovaNectar Smart IT Solutions Our mission is simple and
                powerful serving businesses as they grow. Focusing on putting
                the client first in all parts of our process. Founded in March,
                2024 today we are a trusted technology partner with over 200+
                clients around the world. We Novanectar Smart IT Solutions made
                possible with a dedicated team of over 60 people who are
                passionate about what we do.
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
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-16">
          {certifications.map((cert, index) => (
            <div key={index} className="relative w-20 h-10 md:w-28 md:h-16">
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
        {sections.map(({ title, image, reverse, text1, text2 }, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-xl font-semibold text-blue-900">{title}</h2>
              <p className="text-gray-700 leading-relaxed">
                {text1}
                <br /> <br />
                {text2}
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
        <TeamSection />
      </section>
      <FooterSection />
    </div>
  );
}
