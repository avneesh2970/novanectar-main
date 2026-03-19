"use client";

import img1 from "@/assets/clients/1.png";
import img2 from "@/assets/clients/2.png";
import img3 from "@/assets/clients/3.png";
import img4 from "@/assets/clients/4.png";
import img5 from "@/assets/clients/5.png";
import img6 from "@/assets/clients/6.png";
import img7 from "@/assets/clients/7.png";
import img8 from "@/assets/clients/8.png";
import img9 from "@/assets/clients/9.png";
import img10 from "@/assets/clients/10.png";
// import img11 from "@/assets/clients/11.png";
import img12 from "@/assets/clients/12.png";
import img13 from "@/assets/clients/13.png";
import img14 from "@/assets/clients/14.png";
import img15 from "@/assets/clients/15.png";
import img16 from "@/assets/clients/16.png";
import img17 from "@/assets/clients/17.png";
import img18 from "@/assets/clients/18.png";
import img19 from "@/assets/clients/19.png";
import img20 from "@/assets/clients/20.png";
import img21 from "@/assets/clients/21.png";
import img22 from "@/assets/clients/22.png";
// import img23 from "@/assets/clients/23.png";
import img24 from "@/assets/clients/24.png";
import img25 from "@/assets/clients/25.png";
import img26 from "@/assets/clients/26.png";
import img27 from "@/assets/clients/27.png";
import img28 from "@/assets/clients/28.png";
import img29 from "@/assets/clients/29.png";
import img30 from "@/assets/clients/30.png";

import img31 from "@/assets/clients/31.png";
import img32 from "@/assets/clients/32.png";
import img33 from "@/assets/clients/33.png";
import img34 from "@/assets/clients/34.png";
import img35 from "@/assets/clients/35.png";
import img36 from "@/assets/clients/36.png";
import img37 from "@/assets/clients/37.png";
import img38 from "@/assets/clients/38.png";
import img39 from "@/assets/clients/39.png";
import img40 from "@/assets/clients/40.png";

import img41 from "@/assets/clients/41.png";
import img42 from "@/assets/clients/42.png";
import img43 from "@/assets/clients/43.png";
import img44 from "@/assets/clients/44.png";
import img45 from "@/assets/clients/45.png";
import img46 from "@/assets/clients/46.png";
import img47 from "@/assets/clients/47.png";
import img48 from "@/assets/clients/48.png";
import img49 from "@/assets/clients/49.png";
import img50 from "@/assets/clients/50.png";

import img51 from "@/assets/clients/51.png";
import img52 from "@/assets/clients/52.png";
import img53 from "@/assets/clients/53.png";
import img54 from "@/assets/clients/54.png";
import img55 from "@/assets/clients/55.png";
import img56 from "@/assets/clients/56.png";
import img57 from "@/assets/clients/57.png";
import img58 from "@/assets/clients/58.png";
import img59 from "@/assets/clients/59.png";
import img60 from "@/assets/clients/60.png";

import img61 from "@/assets/clients/61.png";
import img62 from "@/assets/clients/62.png";
import img63 from "@/assets/clients/63.png";
import img64 from "@/assets/clients/64.png";
import img65 from "@/assets/clients/65.png";
import img66 from "@/assets/clients/66.png";
import img67 from "@/assets/clients/67.png";
import img68 from "@/assets/clients/68.png";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { DMSans } from "@/fonts/font";
import Button from "./Button";
export default function Clients() {
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);

  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    // img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20,
    img21,
    img22,
    // img23,
    img24,
    img25,
    img26,
    img27,
    img28,
    img29,
    img30,

    img31,
    img32,
    img33,
    img34,
    img35,
    img36,
    img37,
    img38,
    img39,
    img40,

    img41,
    img42,
    img43,
    img44,
    img45,
    img46,
    img47,
    img48,
    img49,
    img50,

    img51,
    img52,
    img53,
    img54,
    img55,
    img56,
    img57,
    img58,
    img59,
    img60,

    img61,
    img62,
    img63,
    img64,
    img65,
    img66,
    img67,
    img68,

  ];
  const imageSizes = [
    { id: 1, width: 150, height: 120 },
    { id: 2, width: 150, height: 120 },
    { id: 3, width: 150, height: 120 },
    { id: 4, width: 150, height: 120 },
    { id: 5, width: 150, height: 120 },
    { id: 6, width: 150, height: 120 },
    { id: 7, width: 150, height: 120 },
    { id: 8, width: 150, height: 120 },
    { id: 9, width: 150, height: 120 },
    { id: 10, width: 150, height: 120 },
    { id: 12, width: 150, height: 120 },
    { id: 13, width: 150, height: 120 },
    { id: 14, width: 150, height: 120 },
    { id: 15, width: 150, height: 120 },
    { id: 16, width: 150, height: 120 },
    { id: 17, width: 150, height: 120 },
    { id: 18, width: 150, height: 120 },
    { id: 19, width: 150, height: 120 },
    { id: 20, width: 150, height: 120 },
    { id: 21, width: 150, height: 120 },
    { id: 22, width: 150, height: 120 },
    { id: 24, width: 150, height: 120 },
    { id: 25, width: 150, height: 120 },
    { id: 26, width: 150, height: 120 },
    { id: 27, width: 150, height: 120 },
    { id: 28, width: 150, height: 120 },
    { id: 29, width: 150, height: 120 },
    { id: 30, width: 150, height: 120 },
    { id: 31, width: 150, height: 120 },
    { id: 32, width: 150, height: 120 },
    { id: 33, width: 150, height: 120 },
    { id: 34, width: 150, height: 120 },
    { id: 35, width: 150, height: 120 },
    { id: 36, width: 150, height: 120 },
    { id: 37, width: 150, height: 120 },
    { id: 38, width: 150, height: 120 },
    { id: 39, width: 150, height: 120 },
    { id: 40, width: 150, height: 120 },
    { id: 41, width: 150, height: 120 },
    { id: 42, width: 150, height: 120 },
    { id: 43, width: 150, height: 120 },
    { id: 44, width: 150, height: 120 },
    { id: 45, width: 150, height: 120 },
    { id: 46, width: 150, height: 120 },
    { id: 47, width: 150, height: 120 },
    { id: 48, width: 150, height: 120 },
    { id: 49, width: 150, height: 120 },
    { id: 50, width: 150, height: 120 },
    { id: 51, width: 150, height: 120 },
    { id: 52, width: 150, height: 120 },
    { id: 53, width: 150, height: 120 },
    { id: 54, width: 150, height: 120 },
    { id: 55, width: 150, height: 120 },
    { id: 56, width: 150, height: 120 },
    { id: 57, width: 150, height: 120 },
    { id: 58, width: 150, height: 120 },
    { id: 59, width: 150, height: 120 },
    { id: 60, width: 150, height: 120 },
    { id: 61, width: 150, height: 120 },
    { id: 62, width: 150, height: 120 },
    { id: 63, width: 150, height: 120 },
    { id: 64, width: 150, height: 120 },
    { id: 65, width: 150, height: 120 },
    { id: 66, width: 150, height: 120 },
    { id: 67, width: 150, height: 120 },
    { id: 68, width: 150, height: 120 },
  ];

  const totalWidth =
    imageSizes.reduce((sum, size) => sum + size.width, 0) +
    (imageSizes.length - 1) * 16; // 16px for gap

  const scroll = useCallback(
    (direction: "left" | "right") => {
      if (containerRef.current) {
        const scrollAmount = totalWidth / 4; // Scroll by 1/4 of the total width
        const currentScroll = containerRef.current.scrollLeft;
        let newScroll: number;

        if (direction === "left") {
          newScroll = currentScroll - scrollAmount;
          if (newScroll < 0) {
            newScroll = totalWidth + newScroll;
          }
        } else {
          newScroll = currentScroll + scrollAmount;
          if (newScroll >= totalWidth) {
            newScroll = newScroll - totalWidth;
          }
        }

        containerRef.current.scrollTo({
          left: newScroll,
          behavior: "smooth",
        });
      }
    },
    [totalWidth]
  );

  const pauseAnimation = useCallback(() => {
    setIsAnimationPaused(true);
  }, []);

  const resumeAnimation = useCallback(() => {
    setIsAnimationPaused(false);
  }, []);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.style.animationPlayState = isAnimationPaused
        ? "paused"
        : "running";
    }
  }, [isAnimationPaused]);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // Prevent the default context menu
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleScroll = () => {
        if (container.scrollLeft === 0) {
          container.scrollLeft = totalWidth;
        } else if (container.scrollLeft === totalWidth * 2) {
          container.scrollLeft = totalWidth;
        }
      };

      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [totalWidth]);

  return (
    <section
      className="w-full py-14 px-4 bg-[white] relative max-w-[1400px] mx-auto"
      onMouseDown={pauseAnimation}
      onMouseUp={resumeAnimation}
      onMouseLeave={resumeAnimation}
      onTouchStart={pauseAnimation}
      onTouchEnd={resumeAnimation}
    >
      <div className=""></div>
      <div className="relative z-10">
        {/* <h2
          className={`font-medium text-gray-900 text-4xl mb-14 text-center underline pt-8 ${DMSans.className}`}
        >
          Our Trusted Clients
        </h2> */}
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl text-center font-semibold text-gray-800 mb-14 ${DMSans.className}`}
        >
          <span className="inline-block relative">
            Our
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#3DBBFA]"></span>
          </span>{" "}
          <span className="inline-block">Trusted Clients</span>
        </h2>

        <div className="relative overflow-hidden">
          <Button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
          >
            &#8249;
          </Button>

          <div
            ref={containerRef}
            className="overflow-hidden scroll-smooth"
            style={{
              width: `${totalWidth}px`,
            }}
          >
            <div
              ref={animationRef}
              className="flex items-center gap-4"
              style={{
                width: `${totalWidth * 3}px`,
                animation: `scroll ${totalWidth / 50}s linear infinite`,
              }}
            >
              {[...images, ...images, ...images].map((src, index) => {
                const size = imageSizes[index % imageSizes.length];
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{ width: size.width, height: size.height }}
                  >
                    <div className="relative w-full h-full hover-shake">
                      <Image
                        src={src || "/placeholder.svg"}
                        alt={`Client logo ${(index % images.length) + 1}`}
                        fill
                        className="object-contain drop-shadow-lg transition-transform duration-300 ease-in-out hover:scale-110"
                        sizes={`${Math.max(size.width, size.height)}px`}
                        priority={index < images.length}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white bg-opacity-50 hover:bg-opacity-75 transition-colors duration-300"
          >
            &#8250;
          </Button>
        </div>
      </div>
    </section>
  );
}
