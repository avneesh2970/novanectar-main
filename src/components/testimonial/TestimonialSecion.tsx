import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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

const MotionImage = motion(Image);

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  className = "",
}) => {
  const cardVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Generate random floating animation parameters
  const floatingAnimation:any = {
    y: ["-10px", "10px"],
    transition: {
      duration: Math.random() * 2 + 3, // Random duration between 3-5 seconds
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      className={`bg-white text-start rounded-xl p-4 shadow-lg w-80 z-20 ${className} ${DMSans.className}`}
      variants={cardVariants}
      initial="initial"
      animate={["animate", floatingAnimation]}
      whileHover="hover"
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
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full blur-3xl" />

      {/* Main Container */}
      <div className="relative w-full min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <MotionImage
            src={bg}
            alt="Brain background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Responsive Cards Grid */}
        <div className="relative z-10 w-full min-h-screen">
          <motion.div
            className="container mx-auto px-4 py-8 min-h-screen"
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {/* Desktop Layout */}
            <div className="hidden lg:block relative min-h-screen">
              {testimonialData.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  {...testimonial}
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
            <div className="hidden md:block lg:hidden">
              <div className="grid grid-cols-2 gap-8 place-items-center">
                {testimonialData.map((testimonial, index) => (
                  <TestimonialCard key={index} {...testimonial} />
                ))}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden">
              <div className="flex flex-col gap-6 items-center">
                {testimonialData.map((testimonial, index) => (
                  <TestimonialCard key={index} {...testimonial} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;