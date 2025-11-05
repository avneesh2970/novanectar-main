"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { DMSans } from "@/fonts/font";
import { initGSAP, cleanupGSAP, gsap } from "@/lib/gsapUtils";
import bg from "@/assets/testimonial/testimonial.jpg";
import { testimonialData } from "./testimonial";

const TestimonialCard = ({
  name,
  role,
  content,
}: {
  name: string;
  role: string;
  content: string;
}) => {
  return (
    <div
      className={`relative bg-white rounded-xl p-6 pt-10 shadow-lg h-full flex flex-col ${DMSans.className}`}
    >
      {/* Quote icon */}
      <div className="absolute top-3 left-3 bg-[#3DBBFA] text-white p-2 rounded-full shadow-md">
        <Quote className="w-5 h-5" />
      </div>

      <div className="mb-4 flex-grow mt-4">
        <p className="text-gray-800 leading-relaxed text-base">{content}</p>
      </div>

      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#3DBBFA] to-blue-500 flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-lg">{name.charAt(0)}</span>
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [autoplayInterval] = useState(7000); // 5 seconds between slides
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchMoveRef = useRef<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [slideDirection, setSlideDirection] = useState(0); // -1 for left, 1 for right

  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(testimonialData.length / itemsPerPage);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;

      switch (e.key) {
        case "ArrowLeft":
          prevPage();
          break;
        case "ArrowRight":
          nextPage();
          break;
        case "Home":
          goToPage(0);
          break;
        case "End":
          goToPage(totalPages - 1);
          break;
        case " ":
          e.preventDefault();
          setAutoplayPaused((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  useEffect(() => {
    initGSAP();

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4); // Show 4 cards on large screens
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Initialize animations
    if (sectionRef.current) {
      // Animate section entrance
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
    }

    // Parallax effect for background
    if (bgImageRef.current) {
      gsap.to(bgImageRef.current, {
        y: "10%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (autoplayTimerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clearTimeout(autoplayTimerRef.current);
      }
      cleanupGSAP();
    };
  }, []);

  // Manage autoplay and progress animation
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }

      // Start progress bar animation
      if (progressRef.current) {
        gsap.killTweensOf(progressRef.current);
        gsap.fromTo(
          progressRef.current,
          { width: "0%" },
          {
            width: "100%",
            duration: autoplayInterval / 1000,
            ease: "none",
          }
        );
      }

      // Set up the interval for auto-sliding
      autoplayIntervalRef.current = setInterval(() => {
        if (!autoplayPaused) {
          nextPage();
        }
      }, autoplayInterval);
    };

    if (!autoplayPaused) {
      startAutoplay();
    }

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
      if (progressRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        gsap.killTweensOf(progressRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, autoplayPaused, autoplayInterval]);

  // Add a ripple effect to navigation buttons when clicked
  const addClickRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "absolute rounded-full bg-white/30 pointer-events-none";

    button.appendChild(ripple);

    gsap.fromTo(
      ripple,
      { scale: 0, opacity: 1 },
      {
        scale: 3,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      }
    );
  };

  const pauseAutoplay = () => {
    setAutoplayPaused(true);
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    if (progressRef.current) {
      gsap.killTweensOf(progressRef.current);
    }
  };

  const resumeAutoplay = () => {
    setAutoplayPaused(false);
    if (progressRef.current) {
      gsap.killTweensOf(progressRef.current);
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        {
          width: "100%",
          duration: autoplayInterval / 1000,
          ease: "none",
        }
      );
    }
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    autoplayIntervalRef.current = setInterval(() => {
      if (!autoplayPaused) {
        nextPage();
      }
    }, autoplayInterval);
  };

  const goToPage = (pageIndex: number, direction?: number) => {
    if (isAnimating || pageIndex === currentPage) return;

    // Set slide direction if not provided
    // -1 means slide from right to left (next)
    // 1 means slide from left to right (prev)
    const slideDir =
      direction !== undefined ? direction : pageIndex > currentPage ? -1 : 1;
    setSlideDirection(slideDir);

    setIsAnimating(true);

    // Pause autoplay during manual navigation
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }

    // Reset progress bar
    if (progressRef.current) {
      gsap.killTweensOf(progressRef.current);
      gsap.set(progressRef.current, { width: "0%" });
    }

    // Directional slide animation using GSAP
    if (carouselRef.current) {
      // Clear any existing animations
      gsap.killTweensOf(carouselRef.current);

      // Create animation timeline
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentPage(pageIndex);
          setIsAnimating(false);
        },
      });

      // Slide out current content
      tl.to(carouselRef.current, {
        opacity: 0,
        x: `${slideDir * 30}%`, // Move in the direction of the slide
        duration: 0.4,
        ease: "power1.in",
      });

      // Set new position off-screen in the opposite direction
      tl.set(carouselRef.current, {
        x: `${slideDir * -30}%`, // Position from the opposite side
      });

      // Slide in new content
      tl.to(carouselRef.current, {
        opacity: 1,
        x: "0%",
        duration: 0.4,
        ease: "power1.out",
      });
    } else {
      // Fallback if ref isn't available
      setCurrentPage(pageIndex);
      setIsAnimating(false);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1, -1); // Slide from right to left
    } else {
      goToPage(0, -1); // Loop back to first page with same animation
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1, 1); // Slide from left to right
    } else {
      goToPage(totalPages - 1, 1); // Loop to last page with same animation
    }
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    touchMoveRef.current = e.touches[0].clientX;
    pauseAutoplay();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchMoveRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Swipe threshold with improved sensitivity
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextPage(); // Swipe left
      } else {
        prevPage(); // Swipe right
      }
    }

    resumeAutoplay();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Get current testimonials for the page
  const getCurrentTestimonials = () => {
    const startIndex = currentPage * itemsPerPage;
    return testimonialData.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#f6f4f0] max-w-[1400] mx-auto"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-300 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-300 rounded-full blur-3xl opacity-30" />

      {/* Main Container */}
      <div className="relative w-full flex flex-col justify-center">
        {/* Background Image with Parallax */}
        <div ref={bgImageRef} className="absolute inset-0 w-full h-full">
          <Image
            src={bg || "/placeholder.svg?height=1080&width=1920"}
            alt="Background"
            fill
            sizes="100vw"
            className="object-cover object-center h-full w-full opacity-50"
            priority
          />
        </div>

        {/* Title with animation */}
        <div className="relative z-10 text-center mb-12 px-4 mt-28">  
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800 mb-3 ${DMSans.className}`}
          >
            <span className="inline-block relative">
              Client
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#3DBBFA]"></span>
            </span>{" "}
            <span className="inline-block">Testimonials</span>
          </h2>
          <p
            className={`mt-4 text-gray-600 max-w-2xl mx-auto text-lg ${DMSans.className}`}
          >
            Discover how we&apos;ve transformed businesses with our digital
            solutions
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div
          role="region"
          aria-label="Testimonial Carousel"
          aria-roledescription="carousel"
          className="relative z-10 w-full sm:px-16 px-4 max-w-7xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3DBBFA]"></div>
            </div>
          )}

          {/* Navigation Buttons - Smaller size */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addClickRipple(e);
              prevPage();
            }}
            disabled={isAnimating}
            className="absolute sm:left-2 left-8 top-60 -translate-y-1/2 z-20 bg-white opacity-80 hover:bg-gray-100 text-gray-800 p-2.5 rounded-full shadow-lg transition-all disabled:opacity-50 hover:scale-110 hover:shadow-xl focus:outline-none overflow-hidden"
            aria-label="Previous testimonials"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addClickRipple(e);
              nextPage();
            }}
            disabled={isAnimating}
            className="absolute sm:right-2 right-8 top-60 -translate-y-1/2 z-20 bg-white opacity-80 hover:bg-gray-100 text-gray-800 p-2.5 rounded-full shadow-lg transition-all disabled:opacity-50 hover:scale-110 hover:shadow-xl focus:outline-none overflow-hidden"
            aria-label="Next testimonials"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Carousel Container with overflow hidden */}
          <div className="relative overflow-hidden sm:px-2">
            {/* Slides Container */}
            <div
              ref={carouselRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8"
              style={{
                minHeight: "400px",
                willChange: "transform, opacity", // Optimize for animations
              }}
            >
              {getCurrentTestimonials().map((testimonial) => (
                <div key={testimonial.id} className="h-full">
                  <TestimonialCard
                    name={testimonial.name}
                    role={testimonial.role}
                    content={testimonial.content}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Modern Pagination with Progress Bar */}
          <div
            ref={controlsRef}
            className="flex flex-col items-center gap-4 mt-8"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
          >
            {/* Progress Bar */}
            <div className="w-full max-w-xs h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                ref={progressRef}
                className="h-full bg-[#3DBBFA] rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>

            {/* Page Indicator */}
            {/* <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <span className="text-[#3DBBFA]">{currentPage + 1}</span>
              <span>/</span>
              <span>{totalPages}</span>
            </div> */}

            {/* Dot Navigation */}
            <div className="flex justify-center items-center gap-2 mt-2 mb-8">
              {Array.from({ length: Math.min(totalPages, 7) }).map(
                (_, index) => {
                  // Show ellipsis for many pages
                  if (totalPages > 7) {
                    if (
                      index === 3 &&
                      currentPage > 3 &&
                      currentPage < totalPages - 3
                    ) {
                      return (
                        <span key="ellipsis" className="text-gray-400 mx-1">
                          ...
                        </span>
                      );
                    }

                    let pageToShow;
                    if (currentPage <= 3) {
                      pageToShow = index;
                    } else if (currentPage >= totalPages - 4) {
                      pageToShow = totalPages - 7 + index;
                    } else {
                      if (index < 2) {
                        pageToShow = index;
                      } else if (index > 4) {
                        pageToShow = totalPages - (7 - index);
                      } else {
                        pageToShow = currentPage + (index - 3);
                      }
                    }

                    if (pageToShow >= 0 && pageToShow < totalPages) {
                      return (
                        <button
                          key={pageToShow}
                          onClick={() => goToPage(pageToShow)}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            currentPage === pageToShow
                              ? "bg-[#3DBBFA] w-6"
                              : "bg-gray-400 hover:bg-gray-600"
                          }`}
                          aria-label={`Go to page ${pageToShow + 1}`}
                        />
                      );
                    }
                    return null;
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => goToPage(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentPage === index
                          ? "bg-[#3DBBFA] w-6"
                          : "bg-gray-400 hover:bg-gray-600"
                      }`}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
