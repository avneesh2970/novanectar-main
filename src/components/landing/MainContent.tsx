"use client";
import { useEffect, useState, lazy, Suspense } from "react";
import { scrollToSection } from "@/helpers/utils";
import { DMSans, WorkSans } from "@/fonts/font";
import Navbar from "../navbar/Navbar";

// Lazy load non-critical components
const FloatingTechLayout = lazy(() =>
  import("./FloatingIcons").then((mod) => ({
    default: mod.default,
  }))
);

const ServicesSection = lazy(() =>
  import("../services/ServicesSection").then((mod) => ({
    default: mod.default,
  }))
);

const AboutSection = lazy(() =>
  import("../about/AboutSection").then((mod) => ({
    default: mod.default,
  }))
);

const ServiceScroll = lazy(() =>
  import("../services/servicesScroll/ServiceScroll").then((mod) => ({
    default: mod.default,
  }))
);

const ContactPopup = lazy(() =>
  import("../contact/ContactPopup").then((mod) => ({
    default: mod.ContactPopup,
  }))
);

const AppointmentPicker = lazy(() =>
  import("../appointment/appointent-picker").then((mod) => ({
    default: mod.AppointmentPicker,
  }))
);

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export const MainContent = () => {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showGridEffect, setShowGridEffect] = useState(false);

  // Handle client-side rendering
  useEffect(() => {
    setIsClient(true);

    // Delay grid effect to improve initial load
    const timer = setTimeout(() => {
      setShowGridEffect(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Simplified grid animation using CSS instead of GSAP
  useEffect(() => {
    if (!showGridEffect) return;

    const gridSquares = document.querySelectorAll(".grid-square");
    gridSquares.forEach((square, index) => {
      const el = square as HTMLElement;
      el.style.transitionDelay = `${index * 0.05}s`;
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
    });
  }, [showGridEffect]);

  // Simplified mouse effect with throttling
  useEffect(() => {
    if (!isClient || !showGridEffect) return;

    let lastTime = 0;
    const throttleTime = 16; // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime < throttleTime) return;
      lastTime = currentTime;

      const hoverLayer = document.getElementById("grid-hover-layer");
      if (hoverLayer) {
        const x = e.clientX;
        const y = e.clientY + window.scrollY;
        const gradientValue = `radial-gradient(circle 8rem at ${x}px ${y}px, black, transparent)`;
        const element = hoverLayer as HTMLElement;
        element.style.maskImage = gradientValue;
        (element.style as any).WebkitMaskImage = gradientValue;
        element.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      const hoverLayer = document.getElementById("grid-hover-layer");
      if (hoverLayer) {
        (hoverLayer as HTMLElement).style.opacity = "0";
      }
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isClient, showGridEffect]);

  const toggleContactPopup = () => setIsContactPopupOpen(!isContactPopupOpen);

  return (
    <>
      <div id="home-section">
        <Navbar />
        <div className="relative w-full bg-white pt-16">
          {/* Base grid */}
          <div className="absolute inset-0 dark:bg-grid-white/[0.2] sm:bg-grid-black/[0.2]" />

          {/* Hover effect layer */}
          <div
            className="absolute inset-0 dark:bg-grid-hover-white/[0.4] sm:bg-grid-hover-black/[0.4] opacity-0 transition-opacity duration-300"
            id="grid-hover-layer"
          />

          {/* Landing page */}
          {isClient ? (
            <Suspense
              fallback={
                <div className="h-[34rem] md:h-[40rem] flex flex-col items-center justify-center -mt-2">
                  <div className="w-5xl px-2 pl-5 text-center">
                    <h1
                      className={`text-black text-2xl md:text-5xl sm:text-4xl max-w-4xl mx-auto font-bold ${WorkSans.className}`}
                      style={{ textRendering: "optimizeSpeed" }}
                    >
                      <span className="inline-block">
                        Fueling Progress with Smart{" "}
                      </span>
                      <span className="inline-block text-blue-700 sm:text-black">
                        IT Solutions
                      </span>
                    </h1>
                  </div>
                  <div className="pt-4 sm:pt-14 text-center px-2 max-w-xl mx-auto">
                    {/* Critical LCP text - preload font and optimize rendering */}
                    <p
                      className={`text-black text-center font-medium text-sm md:text-base lg:text-lg ${DMSans.className}`}
                      style={{ textRendering: "optimizeSpeed" }}
                    >
                      <span className="inline-block">
                        We empower your business with powerful IT solutions that
                        aims your success.
                      </span>
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
                  <p
                    className={`text-black text-center pt-8 px-2 ${DMSans.className}`}
                  >
                    Building Success Stories for
                    <span className="text-blue-700"> 200+ Trusted Clients</span>
                  </p>
                </div>
              }
            >
              <FloatingTechLayout>
                <div className="h-[34rem] md:h-[40rem] flex flex-col items-center justify-center -mt-2">
                  <div className="w-5xl px-2 pl-5 text-center">
                    <h1
                      className={`text-black text-2xl md:text-5xl sm:text-4xl max-w-4xl mx-auto font-bold ${WorkSans.className}`}
                      style={{ textRendering: "optimizeSpeed" }}
                    >
                      <span className="inline-block">
                        Fueling Progress with Smart{" "}
                      </span>
                      <span className="inline-block text-blue-700 sm:text-black">
                        IT Solutions
                      </span>
                    </h1>
                  </div>
                  <div className="pt-4 sm:pt-14 text-center px-2 max-w-xl mx-auto">
                    {/* Critical LCP text - preload font and optimize rendering */}
                    <p
                      className={`text-black text-center font-medium text-sm md:text-base lg:text-lg ${DMSans.className}`}
                      style={{ textRendering: "optimizeSpeed" }}
                    >
                      <span className="inline-block">
                        We empower your business with powerful IT solutions that
                        aims your success.
                      </span>
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
                  <p
                    className={`text-black text-center pt-8 px-2 ${DMSans.className}`}
                  >
                    Building Success Stories for
                    <span className="text-blue-700"> 200+ Trusted Clients</span>
                  </p>
                </div>
              </FloatingTechLayout>
            </Suspense>
          ) : (
            // Static pre-render for initial load
            <div className="h-[34rem] md:h-[40rem] flex flex-col items-center justify-center -mt-2">
              <div className="w-5xl px-2 pl-5 text-center">
                <h1
                  className={`text-black text-2xl md:text-5xl sm:text-4xl max-w-4xl mx-auto font-bold ${WorkSans.className}`}
                  style={{ textRendering: "optimizeSpeed" }}
                >
                  <span className="inline-block">
                    Fueling Progress with Smart{" "}
                  </span>
                  <span className="inline-block text-blue-700 sm:text-black">
                    IT Solutions
                  </span>
                </h1>
              </div>
              <div className="pt-4 sm:pt-14 text-center px-2 max-w-xl mx-auto">
                {/* Critical LCP text - preload font and optimize rendering */}
                <p
                  className={`text-black text-center font-medium text-sm md:text-base lg:text-lg ${DMSans.className}`}
                  style={{ textRendering: "optimizeSpeed" }}
                >
                  <span className="inline-block">
                    We empower your business with powerful IT solutions that
                    aims your success.
                  </span>
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
              <p
                className={`text-black text-center pt-8 px-2 ${DMSans.className}`}
              >
                Building Success Stories for
                <span className="text-blue-700"> 200+ Trusted Clients</span>
              </p>
            </div>
          )}
        </div>

        {/* Lazy load remaining sections */}
        {isClient && (
          <>
            <Suspense fallback={<LoadingFallback />}>
              <ServiceScroll />
            </Suspense>

            <Suspense fallback={<LoadingFallback />}>
              <AboutSection />
            </Suspense>

            <div className="bg-[#F5F5F5] text-black text-3xl text-center">
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl text-center font-semibold text-gray-800 mb- ${DMSans.className}`}
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
