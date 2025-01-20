import React, { useEffect, useRef } from "react";
import Image from "next/image";
import js from "@/assets/landing/icons/js.png";
import angular from "@/assets/landing/icons/angular.png";
import dock from "@/assets/landing/icons/dock.png";
import dock2 from "@/assets/landing/icons/dock2.png";
import express from "@/assets/landing/icons/express.png";
import node from "@/assets/landing/icons/node.png";
import python from "@/assets/landing/icons/python.png";
import react from "@/assets/landing/icons/react.png";
import view from "@/assets/landing/icons/view.png";
import java from "@/assets/landing/icons/java.png";

import { gsap } from "@/lib/gsapUtils";

const FloatingTechLayout = ({ children }: any) => {
  const techIcons: any = [
    // Left side icons with different animation patterns
    {
      src: node,
      alt: "Node.js",
      className: "w-12 h-12 md:w-16 md:h-16 left-[5%] top-[8%]",
      pattern: "circular",
    },
    {
      src: java,
      alt: "Java",
      className: "w-12 h-12 md:w-16 md:h-16 left-[5%] bottom-[18%]",
      pattern: "circular",
    },
    {
      src: python,
      alt: "Python",
      className: "w-14 h-14 md:w-20 md:h-20 left-[55%] top-[7%]",
      pattern: "circular",
    },

    // Right side icons with different patterns
    {
      src: js,
      alt: "JavaScript",
      className: "w-12 h-12 md:w-16 md:h-16 right-[5%] top-[8%]",
      pattern: "circular",
    },
    {
      src: react,
      alt: "React",
      className: "w-12 h-12 md:w-16 md:h-16 right-[5%] bottom-[18%]",
      pattern: "circular",
    },
    {
      src: angular,
      alt: "Angular",
      className: "md:w-16 md:h-16 right-[5%] top-[40%]",
      pattern: "circular",
    },

    // Top icons
    {
      src: dock,
      alt: "Flutter",
      className: "w-12 h-12 md:w-16 md:h-16 left-[28%] top-[2%]",
      pattern: "circular",
    },

    // Bottom icons
    {
      src: express,
      alt: "Express",
      className: "w-12 h-12 md:w-16 md:h-16 left-[29%] bottom-[9%]",
      pattern: "circular",
    },
    {
      src: dock2,
      alt: "Next.js",
      className: "w-12 h-12 md:w-16 md:h-16 right-[29%] bottom-[9%]",
      pattern: "circular",
    },
    {
      src: view,
      alt: "TypeScript",
      className: "md:w-16 md:h-16 right-[88%] bottom-[45%]",
      pattern: "circular",
    },
  ];

  const iconRefs:any = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Ensure GSAP is initialized
    if (typeof window !== "undefined") {
      import("@/lib/gsapUtils").then(({ initGSAP }) => {
        initGSAP();
        animateIcons();
      });
    }

    return () => {
      // Clean up animations
      gsap.killTweensOf(iconRefs.current);
    };
  }, []);

  const animateIcons = () => {
    iconRefs.current.forEach((icon:any, index:any) => {
      if (!icon) return;

      const pattern = techIcons[index].pattern;
      const duration = 2 + Math.random();
      const delay = Math.random();

      switch (pattern) {
        case "circular":
          gsap.to(icon, {
            duration: duration,
            repeat: -1,
            ease: "none",
            motionPath: {
              path: [
                { x: 0, y: 0 },
                { x: 15, y: 15 },
                { x: 0, y: 30 },
                { x: -15, y: 15 },
                { x: 0, y: 0 },
              ],
              curviness: 1.8,
            },
            delay: delay,
          });
          break;

        case "wave":
          gsap.to(icon, {
            duration: duration,
            repeat: -1,
            ease: "power1.inOut",
            yoyo: true,
            x: Math.random() * 20 - 10,
            y: Math.random() * 20 - 10,
            delay: delay,
          });
          break;

        case "bounce":
          gsap.to(icon, {
            duration: duration * 0.8,
            repeat: -1,
            ease: "power1.inOut",
            yoyo: true,
            y: "-=20",
            x: Math.random() * 15 - 7.5,
            delay: delay,
          });
          break;
      }

      // Add subtle rotation to all icons
      gsap.to(icon, {
        duration: duration * 1.5,
        repeat: -1,
        ease: "power1.inOut",
        yoyo: true,
        rotation: Math.random() * 10 - 5,
        delay: delay,
      });
    });
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Floating icons layer */}
      <div className="absolute inset-0 pointer-events-none">
        {techIcons.map((icon: any, index: number) => (
          <div
            key={icon.alt}
            ref={(el:any) => (iconRefs.current[index] = el)}
            className={`absolute ${icon.className} transition-transform will-change-transform`}
          >
            <div className="relative w-full h-full">
              <Image
                src={icon.src || "/placeholder.svg"}
                alt={icon.alt}
                fill
                style={{ objectFit: "contain" }}
                className="select-none"
                priority={index < 4}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>
      {/* Main content layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default FloatingTechLayout;

