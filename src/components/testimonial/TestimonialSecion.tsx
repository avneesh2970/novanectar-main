import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import bg from "@/assets/testimonial/testimonial.jpg";
import { DMSans } from "@/fonts/font";

const testimonialData = [
  {
    name: "Rajesh Gupta",
    role: "N.D. Garments",
    content:
      "Novanectar's digital marketing services gave our brand a complete makeover. From social media marketing to pay-per-click campaigns, every strategy was tailored to our business. The results? Increased traffic, higher sales, and an engaged audience. Their commitment to excellence is unmatched.",
  },
  {
    name: "Muskan Rana",
    role: "Yoga Digital Marketing",
    content:
      "Novanectar's expertise in digital marketing helped my yoga brand find its audience. They developed engaging content, managed social media platforms, and implemented SEO strategies that boosted my website traffic. The team's understanding of wellness marketing was spot on!",
  },
  {
    name: "Suraj Kumar",
    role: "WellOpportunityTechElixir.com",
    content:
      "Novanectar transformed WellOpportunityTechElixir.com with its cutting-edge website development and digital marketing services. The website now boasts a sleek design, intuitive navigation, and faster loading speeds. Their comprehensive digital marketing approach, from keyword optimization to analytics, drove tangible results for our brand.",
  },
  {
    name: "Prince Kumar",
    role: "Techellixir.com",
    content:
      "Novanectar developed a world-class website for Techellixir.com. They incorporated responsive design, smooth user interfaces, and advanced features tailored to my requirements. The team also guided me on SEO and future scalability, ensuring my website stays competitive. Their professionalism is truly commendable!",
  },
];

const TestimonialCard: React.FC<{
  name: string;
  role: string;
  content: string;
  className?: string;
  isSmallScreen: boolean;
  index: number;
}> = ({ name, role, content, className = "", isSmallScreen, index }) => {
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3 + index,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      className={`bg-white text-start rounded-xl p-4 shadow-lg w-full md:w-80 z-20 ${className} ${DMSans.className}`}
      whileHover={isSmallScreen ? undefined : { scale: 1.05 }}
      animate={!isSmallScreen ? floatingAnimation : undefined}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="relative w-8 h-8 rounded-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M7 11a4 4 0 100-8 4 4 0 000 8zm1 2H3a1 1 0 00-1 1v2a3 3 0 003 3h2v-2H5a1 1 0 01-1-1v-1h4v-3zm9-2a4 4 0 100-8 4 4 0 000 8zm1 2h-5a1 1 0 00-1 1v2a3 3 0 003 3h2v-2h-1a1 1 0 01-1-1v-1h4v-3z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{name}</h3>
          <p className="text-xs text-gray-600">{role}</p>
        </div>
      </div>
      <p className="text-sm text-gray-800 leading-relaxed">{content}</p>
    </motion.div>
  );
};

const TestimonialSection: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      const autoScroll = async () => {
        await controls.start({
          x: "-100%",
          transition: { duration: 60, ease: "linear" },
        });
        controls.set({ x: "0%" });
        autoScroll();
      };
      autoScroll();
    } else {
      controls.stop();
    }
  }, [isSmallScreen, controls]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full blur-3xl" />

      {/* Main Container */}
      <div className="relative w-full min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={bg || "/placeholder.svg"}
            alt="Brain background"
            fill
            sizes="100vw"
            className="object-cover opacity-50"
            priority
          />
        </div>

        {/* Responsive Cards Grid */}
        <div className="relative z-10 w-full min-h-screen">
          <div
            className="container mx-auto px-4 py-8 min-h-screen flex items-center"
            ref={containerRef}
          >
            {/* Desktop Layout */}
            <div className="hidden lg:block relative w-full min-h-[600px]">
              {testimonialData.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  {...testimonial}
                  isSmallScreen={isSmallScreen}
                  index={index}
                  className={`absolute ${
                    index === 0
                      ? "top-[0%] left-[8%]"
                      : index === 1
                      ? "top-[5%] right-[10%]"
                      : index === 2
                      ? "top-[45%] left-[15%]"
                      : "bottom-[1%] right-[15%]"
                  }`}
                />
              ))}
            </div>

            {/* Tablet Layout */}
            <div className="hidden md:block lg:hidden w-full">
              <div className="grid grid-cols-2 gap-8 place-items-center">
                {testimonialData.map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    {...testimonial}
                    isSmallScreen={isSmallScreen}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Mobile Layout with Infinite Horizontal Scroll */}
            <div className="md:hidden overflow-hidden w-full">
              <motion.div
                className="flex gap-6"
                animate={controls}
                style={{ width: `${testimonialData.length * 300}%` }}
              >
                {[...testimonialData, ...testimonialData, ...testimonialData].map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    {...testimonial}
                    isSmallScreen={isSmallScreen}
                    index={index % testimonialData.length}
                    className="flex-shrink-0 w-[80vw] max-w-[300px]"
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;

