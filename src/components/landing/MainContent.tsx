"use client";
// import { cn } from "@/lib/utils";
// import { motion } from "framer-motion";
// import techLife from "@/assets/landing/tech-life.png";
// import dotts from "@/assets/landing/dotted-background.png";
// import triangle from "@/assets/landing/triangleBackground.png";

// import { gsap } from "gsap";
import gsap, { registerGSAPPlugins } from "@/lib/gsapUtils";
// import Image from "next/image";
import { useEffect } from "react";
import ServicesSection from "../services/ServicesSection";
import ProcessSection from "../process/ProcessSection";
import ProjectSession from "../projects/ProjectSession";
import WhyChooseUs from "../why-us/WhyUsSession";
import ContactForm from "../contact/contact";
import TestimonialSection from "../testimonial/TestimonialSecion";
import FAQSection from "../faq/FaqSection";
import FooterSection from "../footer/FooterSection";
import FloatingTechLayout from "./FloatingIcons";
import AboutSection from "../about/AboutSection";
import WhatsappIcon from "../whatsapp/Whatsapp";

//fonts
import { DMSans, WorkSans } from "@/fonts/font";

export const MainContent = () => {
  // Animation with GSAP
  useEffect(() => {
    // Register GSAP plugins
    registerGSAPPlugins();
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

  return (
    <>
      <div>
        <div className="relative h-[350rem] w-full dark:bg-black bg-white">
          {/* Base grid */}
          <div className="absolute inset-0 dark:bg-grid-white/[0.2] bg-grid-black/[0.2]" />

          {/* Hover effect layer */}
          <div
            className="absolute inset-0 dark:bg-grid-hover-white/[0.4] bg-grid-hover-black/[0.4] opacity-0 transition-opacity duration-300"
            id="grid-hover-layer"
          />
          {/* //landing page// */}
          <FloatingTechLayout>
            <div className="w-5xl pt-28 px-2 text-center">
              <h1 className={`text-black text-3xl md:text-5xl sm:text-4xl max-w-4xl mx-auto font-bold ${WorkSans.className}`}>
                We Build Success Stories Not Just Websites
              </h1>
            </div>
            <div className="pt-10 text-center px-2 max-w-xl mx-auto">
              <p className={`text-black text-center font-medium text-sm md:text-base lg:text-lg ${DMSans}`}>
                Transform your business with powerful digital strategies
                designed for real world results
              </p>
            </div>
            <div className="flex pt-10 px-2 justify-center gap-4">
              <button className={`bg-blue-500 px-4 py-2 sm:px-5 sm:py-2 text-white text-sm sm:text-base rounded-md font-medium shadow-md transition-transform transform hover:scale-105 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none active:scale-95 ${DMSans}`}>
                Get Started Today
              </button>
              <button className={`border border-blue-500 text-blue-500 px-4 py-2 sm:px-5 sm:py-2 text-sm sm:text-base rounded-md font-medium shadow-md transition-transform transform hover:scale-105 hover:text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none active:scale-95 bg-white ${DMSans}`}>
                Schedule a Free Consultation
              </button>
            </div>
            <p className="text-black text-center pt-8 px-2">
              Building Success Stories for
              <span className="text-blue-500"> 200+ Trusted Clients</span>
            </p>
          </FloatingTechLayout>
          {/* //landing page end// */}
          <AboutSection />
          {/* about end  */}
          <div className="bg-[#f5f5fa] bg-opacity-50 h-[300rem] pt-16 text-black text-3xl text-center">
            <h1 className="font-semibold underline">Services</h1>
            <ServicesSection />
            <ProcessSection />
            <div id="project-section">
              <ProjectSession />
            </div>
            <WhyChooseUs />
            <ContactForm />
            <TestimonialSection />
            <FAQSection />
            <FooterSection />
            <WhatsappIcon />
          </div>
        </div>
      </div>
    </>
  );
};
