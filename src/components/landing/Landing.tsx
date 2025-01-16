"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ellipse1 from "@/assets/landing/ellipse1.png";
import ellipse2 from "@/assets/landing/ellipse2.png";
import landing from "@/assets/landing/landing.png";
import { MainContent } from "./MainContent";
import Image from "next/image";

// Add this function at the top of the file, outside of the Landing component
function shouldPlayAnimation() {
  if (typeof window === 'undefined') return false;
  const hasPlayed = sessionStorage.getItem('landingAnimationPlayed');
  if (!hasPlayed) {
    sessionStorage.setItem('landingAnimationPlayed', 'true');
    return true;
  }
  return false;
}

const Landing = () => {
  const [hasAnimationPlayed, setHasAnimationPlayed] = useState(false);
  const [shouldShowAnimation, setShouldShowAnimation] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLImageElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if the animation should play
    const shouldPlay = shouldPlayAnimation();
    setShouldShowAnimation(shouldPlay);
    if (!shouldPlay) {
      setHasAnimationPlayed(true);
    }
  }, []);

  useEffect(() => {
    if (!shouldShowAnimation) return;

    const container = containerRef.current;
    const title = titleRef.current;
    const portal = portalRef.current;
    const mainContent = mainContentRef.current;

    if (!container || !title || !portal || !mainContent) return;

    // Show main content immediately if we're not animating
    if (!shouldShowAnimation) {
      gsap.set(mainContent, { y: 0, opacity: 1 });
      gsap.set(container, { opacity: 1, backgroundColor: "white" });
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        setHasAnimationPlayed(true);
      },
    });

    // Initial setup
    gsap.set(mainContent, { y: 100, opacity: 0 });
    gsap.set(container, { opacity: 0 });

    // Animation sequence
    tl.to(container, {
      opacity: 1,
      duration: 1,
    })
      .to(title, {
        y: "-40vh",
        scale: 0.5,
        duration: 1,
      })
      .to(
        portal,
        {
          scale: 5,
          opacity: 0,
          duration: 1.5,
        },
        "-=0.5"
      )
      .to(
        container,
        {
          backgroundColor: "white",
          duration: 1,
        },
        "-=1"
      )
      .to(
        mainContent,
        {
          y: 0,
          opacity: 1,
          duration: 1,
        },
        "-=0.5"
      );

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, [shouldShowAnimation]);

  // If animation has played or user isn't at top, only render main content
  if (hasAnimationPlayed) {
    return (
      <div className="relative min-h-screen bg-white">
        <div className="w-full">
          <MainContent />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black">
      {shouldShowAnimation ? (
        <main className="relative h-screen w-full overflow-hidden">
          <div className="relative w-full h-full">
            <div
              ref={portalRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={landing}
                alt="Portal background"
                fill
                style={{ objectFit: "cover" }}
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Floating ellipses */}
          <motion.div
            className="absolute left-[10%] top-[20%] h-32 w-32 md:h-48 md:w-48"
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
          >
            <Image
              src={ellipse1}
              alt="Floating element"
              fill
              style={{ objectFit: "contain" }}
              className="w-full h-full"
              priority
            />
          </motion.div>

          <motion.div
            className="absolute right-[15%] top-[15%] h-24 w-24 md:h-36 md:w-36"
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
          >
            <Image
              src={ellipse2}
              alt="Floating element"
              fill
              style={{ objectFit: "contain" }}
              className="w-full h-full"
              priority
            />
          </motion.div>

          <motion.div
            className="absolute bottom-[25%] left-[20%] h-16 w-16 md:h-24 md:w-24"
            animate={{
              x: [0, 15, 0],
              y: [0, 15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          >
            <Image
              src={ellipse1}
              alt="Floating element"
              fill
              style={{ objectFit: "contain" }}
              className="w-full h-full"
              priority
            />
          </motion.div>

          <motion.div
            className="absolute bottom-[30%] right-[25%] h-28 w-28 md:h-40 md:w-40"
            animate={{
              x: [0, -15, 0],
              y: [0, -15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut",
            }}
          >
            <Image
              src={ellipse2}
              alt="Floating element"
              fill
              style={{ objectFit: "contain" }}
              className="w-full h-full"
              priority
            />
          </motion.div>

          {/* Title */}
          <div
            ref={titleRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          >
            <h1 className="text-center font-sans text-5xl font-bold tracking-widest text-[#F5F5DC] md:text-7xl lg:text-8xl">
              NOVANECTAR
            </h1>
          </div>
        </main>
      ) : null}

      {/* Main content */}
      <div ref={mainContentRef} className="absolute top-0 left-0 w-full">
        <MainContent />
      </div>
    </div>
  );
};

export default Landing;

