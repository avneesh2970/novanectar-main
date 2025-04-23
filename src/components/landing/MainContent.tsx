import { gsap } from "@/lib/gsapUtils";
// import Image from "next/image";
import { useEffect, useState } from "react";
import ServicesSection from "../services/ServicesSection";
import FloatingTechLayout from "./FloatingIcons";
import AboutSection from "../about/AboutSection";
import { scrollToSection } from "@/helpers/utils";

//fonts
import { DMSans, WorkSans } from "@/fonts/font";
import Navbar from "../navbar/Navbar";
import { ContactPopup } from "../contact/ContactPopup";
import { AppointmentPicker } from "../appointment/appointent-picker";
// import ImagePopup from "../popups/image-popup";

export const MainContent = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  // Animation with GSAP
  useEffect(() => {
    // Register GSAP plugins
    // registerGSAPPlugins();
    gsap.fromTo(
      ".grid-square",
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
      }
    );
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const hoverLayer = document.getElementById("grid-hover-layer");
      if (hoverLayer) {
        const x = e.clientX;
        const y = e.clientY + window.scrollY;
        const gradientValue = `radial-gradient(circle 8rem at ${x}px ${y}px, black, transparent)`;

        // Type casting the element to HTMLElement with CSSStyleDeclaration
        const element = hoverLayer as HTMLElement;
        element.style.maskImage = gradientValue;
        (element.style as any).WebkitMaskImage = gradientValue; // Using type assertion for webkit prefix
        element.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      const hoverLayer = document.getElementById("grid-hover-layer");
      if (hoverLayer) {
        (hoverLayer as HTMLElement).style.opacity = "0";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // const toggleMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  const toggleContactPopup = () => setIsContactPopupOpen(!isContactPopupOpen);

  // const scrollToSection = (sectionId: string) => {
  //   const section = document.getElementById(sectionId);
  //   if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  return (
    <>
      <div id="home-section">
        <Navbar />
        <div className="relative w-full bg-white pt-16">
          {/* Base grid */}
          <div className="absolute inset-0 dark:bg-grid-white/[0.2] bg-grid-black/[0.2]" />

          {/* Hover effect layer */}
          <div
            className="absolute inset-0 dark:bg-grid-hover-white/[0.4] bg-grid-hover-black/[0.4] opacity-0 transition-opacity duration-300"
            id="grid-hover-layer"
          />
          {/* //landing page// */}
          <FloatingTechLayout>
            <div className="h-[34rem] md:h-[40rem] flex flex-col items-center justify-center">
              <div className="w-5xl px-2 pl-5 sm:text-center text-start">
                <h1
                  className={`text-black text-2xl md:text-5xl sm:text-4xl max-w-4xl mx-auto font-bold ${WorkSans.className}`}
                >
                  Fueling Progress with Smart{" "}
                  <span className="text-blue-500 sm:text-black">
                    IT Solutions
                  </span>
                </h1>
              </div>
              <div className="pt-10 text-center px-2 max-w-xl mx-auto">
                <p
                  className={`text-black text-center font-medium text-sm md:text-base lg:text-lg ${DMSans.className}`}
                >
                  We empower your business with powerful IT solutions that aims
                  your success.
                </p>
              </div>
              <div className="flex pt-10 px-2 justify-center gap-4">
                <button
                  className={`bg-blue-500 px-3 py-2 sm:px-5 sm:py-2 text-white text-xs sm:text-base rounded-md font-medium shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none active:scale-95 ${DMSans.className}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("services-section");
                  }}
                >
                  Get Started Today
                </button>
                <button
                  className={`border border-blue-500 text-blue-500 px-3 py-3 sm:px-5 sm:py-3 text-xs sm:text-base rounded-md font-medium shadow-md transition-transform transform hover:scale-105 hover:text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none active:scale-95 bg-white ${DMSans.className}`}
                  onClick={() => setIsOpen(true)}
                >
                  Schedule a Free Consultation
                </button>
                <AppointmentPicker
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                />
              </div>
              <p
                className={`text-black text-center pt-8 px-2 ${DMSans.className}`}
              >
                Building Success Stories for
                <span className="text-blue-500"> 200+ Trusted Clients</span>
              </p>
              {/* <ImagePopup /> */}
            </div>
          </FloatingTechLayout>
          <AboutSection />
          <div className="bg-[#f5f5fa] bg-opacity-50 pt-16 text-black text-3xl text-center">
            <h1
              className={`font-medium text-gray-800 underline text-4xl ${DMSans.className}`}
            >
              Services
            </h1>
            <div id="services-section">
              <ServicesSection />
            </div>
          </div>
        </div>
        <ContactPopup
          isOpen={isContactPopupOpen}
          onClose={toggleContactPopup}
        />
      </div>
    </>
  );
};
