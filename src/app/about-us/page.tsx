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
      <div
        className={`${DMSans400.className} bg-[#F5F5F5] py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-7xl mx-auto bg-[#FFFFFF] px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-sm mt-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <div className="space-y-3 sm:space-y-4">
                <p className="text-xs sm:text-sm font-medium text-gray-500 tracking-wider uppercase">
                  ABOUT US
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  We provide Smart IT Solution to help your Business Grow
                </h1>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed font-medium">
                Novanectar Services Private Limited is a provider of technology
                solutions that work to equip individuals and organizations with
                graphic design, web design, app development and improving all
                artifacts. Fueling Progress with Smart IT Solutions, we offer
                high quality digital solutions that are often thought out to
                meet the various requirements of our Clients.
              </p>
            </div>

            {/* Right Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={about || "/placeholder.svg"}
                  alt="Smart IT solution services"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full pt-8 px-4 md:px-8 bg-white">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 text-center">
          Certified by India&apos;s Leading Authorities
        </h2>

        <div className="rounded-lg p-4 sm:p-6 lg:p-8">
          <div className="flex justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 justify-items-center items-center">
              {certifications.map((cert, index) => (
                <div key={index} className="flex justify-center items-center">
                  <div className="relative w-20 h-10 sm:w-24 sm:h-12 md:w-28 md:h-14 lg:w-32 lg:h-16 xl:w-40 xl:h-20 transition-transform hover:scale-105 duration-300 ease-in-out">
                    <Image
                      src={cert.src}
                      alt={cert.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, (max-width: 1280px) 128px, 160px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          </div>
        ))}
      </section>

      <section className="w-full py-4 px-4 sm:px-6 lg:px-8 text-center bg-white">
        <TeamSection />
      </section>
      <FooterSection />
    </div>
  );
}
