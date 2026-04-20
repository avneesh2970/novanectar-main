"use client";
import { useEffect, useState, lazy, Suspense } from "react";
import { scrollToSection } from "@/helpers/utils";
import { DMSans, WorkSans } from "@/fonts/font";
import Navbar from "../navbar/Navbar";
import AboutSection from "@/components/about/AboutSection";

const FloatingTechLayout = lazy(() =>
  import("./FloatingIcons").then((mod) => ({
    default: mod.default,
  })),
);

const ServicesSection = lazy(() =>
  import("../services/ServicesSection").then((mod) => ({
    default: mod.default,
  })),
);

const ServiceScroll = lazy(() =>
  import("../services/servicesScroll/ServiceScroll").then((mod) => ({
    default: mod.default,
  })),
);

const ContactPopup = lazy(() =>
  import("../contact/ContactPopup").then((mod) => ({
    default: mod.ContactPopup,
  })),
);

const AppointmentPicker = lazy(() =>
  import("../appointment/appointent-picker").then((mod) => ({
    default: mod.AppointmentPicker,
  })),
);

const LoadingFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export const MainContent = () => {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldLoadExtras, setShouldLoadExtras] = useState(false);

  useEffect(() => {
    const enableExtras = () => setShouldLoadExtras(true);

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = (window as Window & {
        requestIdleCallback: (callback: IdleRequestCallback) => number;
      }).requestIdleCallback(() => enableExtras());

      return () => {
        if ("cancelIdleCallback" in window) {
          (
            window as Window & {
              cancelIdleCallback: (handle: number) => void;
            }
          ).cancelIdleCallback(idleId);
        }
      };
    }

    const timeoutId = setTimeout(enableExtras, 300);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const toggleContactPopup = () => setIsContactPopupOpen(!isContactPopupOpen);

  return (
    <>
      <div id="home-section">
        <Navbar />
        <div className="relative w-full bg-white pt-16">
          <div className="-mt-4 absolute inset-0 z-0 dark:bg-grid-white/[0.2] sm:bg-grid-black/[0.2]" />

          <div className="relative z-10 h-[34rem] md:h-[40rem] flex flex-col items-center justify-center -mt-2">
            <div className="w-5xl px-2 pl-5 text-center">
              <h1
                className={`text-black text-2xl md:text-5xl sm:text-4xl max-w-4xl mx-auto font-bold ${WorkSans.className}`}
                style={{ textRendering: "optimizeSpeed" }}
              >
                Fueling Progress with Smart{" "}
                <span className="text-blue-700 sm:text-black">
                  IT Solutions
                </span>
              </h1>
            </div>

            <div className="pt-4 sm:pt-14 text-center px-2 max-w-xl mx-auto">
              <p
                className={`text-black font-medium text-sm md:text-base lg:text-lg ${DMSans.className}`}
                style={{ textRendering: "optimizeSpeed" }}
              >
                We empower your business with powerful IT solutions that aims
                your success.
              </p>
            </div>

            <div className="flex pt-10 px-2 justify-center gap-4">
              <button
                className={`bg-blue-700 px-3 py-2 sm:px-5 sm:py-2 text-white text-xs sm:text-base rounded-md font-medium shadow-md transition-transform transform hover:scale-105 hover:bg-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none active:scale-95 ${DMSans.className}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("services-section");
                }}
              >
                Get Started Today
              </button>

              <button
                className={`border border-blue-700 text-blue-700 px-3 py-3 sm:px-5 sm:py-3 text-xs sm:text-base rounded-md font-medium shadow-md transition-transform transform hover:scale-105 hover:text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none active:scale-95 bg-white ${DMSans.className}`}
                onClick={() => setIsOpen(true)}
              >
                Schedule a Free Consultation
              </button>
            </div>

            <p className={`text-black text-center pt-8 px-2 ${DMSans.className}`}>
              Building Success Stories for
              <span className="text-blue-700"> 200+ Trusted Clients</span>
            </p>
          </div>
        </div>

        {shouldLoadExtras && (
          <>
            <Suspense fallback={null}>
              <div className="absolute inset-0 pointer-events-none z-0 mt-20">
                <FloatingTechLayout>
                  <div className="h-[34rem] md:h-[40rem]" />
                </FloatingTechLayout>
              </div>
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
              <ServiceScroll />
            </Suspense>
            <div id="about-section">
              <Suspense fallback={<LoadingFallback />}>
                <AboutSection />
              </Suspense>
            </div>

            <div className="bg-[#F5F5F5] text-black text-3xl text-center">
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl text-center font-semibold text-gray-800 ${DMSans.className}`}
              >
                <span className="inline-block relative">
                  Services
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#3DBBFA]"></span>
                </span>{" "}
              </h2>
              <div id="services-section">
                <Suspense fallback={<LoadingFallback />}>
                  <ServicesSection />
                </Suspense>
              </div>
            </div>

            {isContactPopupOpen && (
              <Suspense fallback={<LoadingFallback />}>
                <ContactPopup
                  isOpen={isContactPopupOpen}
                  onClose={toggleContactPopup}
                />
              </Suspense>
            )}

            {isOpen && (
              <Suspense fallback={<LoadingFallback />}>
                <AppointmentPicker
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                />
              </Suspense>
            )}
          </>
        )}
      </div>
    </>
  );
};
