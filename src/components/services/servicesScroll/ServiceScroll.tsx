"use client";

import { Sparkle } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { DMSans400 } from "@/fonts/font";

const services = [
  { icon: Sparkle, text: "Graphic Design" },
  { icon: Sparkle, text: "App Development" },
  { icon: Sparkle, text: "Website Development" },
  { icon: Sparkle, text: "Ecommerce" },
  { icon: Sparkle, text: "SEO" },
  { icon: Sparkle, text: "Digital Marketing" },
];

export default function ServiceScroll({
  className,
  speed = 80, // Lower number = faster scroll
}: {
  className?: string;
  speed?: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Clone the content once to ensure seamless looping
    const scrollContent = scrollContainer.querySelector(
      ".scroll-content"
    ) as HTMLElement;
    if (!scrollContent) return;

    // Calculate the actual width needed for seamless scrolling
    const scrollWidth = scrollContent.offsetWidth;

    // Create keyframes dynamically based on content width
    const keyframes = `
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${scrollWidth / 2}px); }
      }
    `;

    // Add keyframes to document
    const styleSheet = document.createElement("style");
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);

    // Apply animation to content
    scrollContent.style.animation = `scroll ${speed}s linear infinite`;

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [speed]);

  // Create just enough items to fill the screen twice (for seamless looping)
  const duplicatedServices = [...services, ...services, ...services];

  return (
    <div
      className={cn(
        "relative w-full bg-[#151515] overflow-hidden py-2 sm:py-3",
        className
      )}
    >
      <div
        ref={scrollRef}
        className={`${DMSans400.className} w-full overflow-hidden flex items-center`}
      >
        <div
          className="scroll-content inline-flex will-change-transform"
          style={{ whiteSpace: "nowrap" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = "running";
          }}
        >
          {duplicatedServices.map((service, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 sm:space-x-4 mx-6"
            >
              <service.icon className="w-4 sm:w-8 h-4 sm:h-8 text-yellow-400" />
              <span className="text-white text-sm sm:text-lg font-medium">
                {service.text}
              </span>
            </div>
          ))}

          {/* Duplicate the items to ensure seamless looping */}
        {duplicatedServices.map((service, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 sm:space-x-4 mx-6"
            >
              <service.icon className="w-4 sm:w-8 h-4 sm:h-8 text-yellow-400" />
              <span className="text-white text-sm sm:text-lg font-medium">
                {service.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
