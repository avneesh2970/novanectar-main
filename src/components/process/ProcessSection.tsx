import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import bgImage from "@/assets/pocess/bg.png";
import { DMSans } from "@/fonts/font";

const ServiceCard = ({ title, description, icon }: any) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="relative w-[280px] sm:w-[300px] h-[380px] sm:h-[400px] bg-gradient-to-br from-gray-400/90 to-gray-700/90 rounded-xl p-4 sm:p-6 overflow-hidden backdrop-blur-sm border-4 border-gray-300 flex-shrink-0"
    >
      <motion.div
        variants={{
          initial: {
            x: "100%",
            y: "-100%",
            opacity: 0,
          },
          hover: {
            x: 0,
            y: 0,
            opacity: 1,
          },
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="absolute inset-[-10rem] bg-gradient-to-br from-blue-600 to-blue-500 pointer-events-none rounded-full"
      />

      <div className="relative z-10">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-100/20 flex items-center justify-center mb-4 sm:mb-6">
          <div className="relative w-full h-full bg-blue-100 text-blue-400 rounded-full">
            <div className="absolute top-1/2 left-1/2 flex justify-center items-center -translate-x-1/2 -translate-y-1/2">
              {icon}
            </div>
          </div>
        </div>

        <motion.div
          variants={{
            hover: { y: -5 },
          }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="pt-2 text-xl sm:text-2xl font-medium text-white mb-2 sm:mb-3 tracking-wider">
            {title}
          </h3>
          <p
            className={`text-gray-200 tracking-widest pt-4 leading-tight text-base font-thin`}
          >
            {description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState("-100%");

  /////////////adjusting view porth width dynamically/////////

  useEffect(() => {
    const updateScrollRange = () => {
      if (window.innerWidth < 480) {
        // Very small screens (e.g., small mobile)
        setScrollRange("-600%"); // Scroll more for tighter spaces
      } else if (window.innerWidth < 640) {
        // Small screens (mobile)
        setScrollRange("-400%");
      } else if (window.innerWidth < 768) {
        // Large mobile or small tablets
        setScrollRange("-320%");
      } else if (window.innerWidth < 1024) {
        // Tablets
        setScrollRange("-230%");
      } else if (window.innerWidth < 1440) {
        // Small desktops or laptops
        setScrollRange("-150%");
      } else {
        // Large screens (desktops)
        setScrollRange("-100%");
      }
    };

    updateScrollRange();
    window.addEventListener("resize", updateScrollRange);

    return () => {
      window.removeEventListener("resize", updateScrollRange);
    };
  }, []);

  /////////////end//////////////////////////////////////////////////

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", scrollRange]);

  const services = [
    {
      title: "Strategy",
      description:
        "We craft tailored digital strategies, aligning business goals with innovative solutions for impactful results.",
      icon: (
        <svg
          width="46"
          height="52"
          viewBox="0 0 46 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23 0.333008L45.1666 13.1663V38.833L23 51.6663L0.833313 38.833V13.1663L23 0.333008ZM7.81903 14.5143L23.0002 23.3033L38.1811 14.5144L23 5.72534L7.81903 14.5143ZM5.49998 18.564V36.1424L20.6669 44.9232V27.3448L5.49998 18.564ZM25.3335 44.923L40.5 36.1424V18.5642L25.3335 27.3448V44.923Z"
            fill="#3771DC"
          />
        </svg>
      ),
    },
    {
      title: "Wireframing & Design",
      description:
        "We create intuitive wireframes and stunning designs to ensure seamless user experiences and visual appeal.",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.1924 2.07232L45.8856 14.7655C46.2762 15.1561 46.2762 15.7892 45.8856 16.1797C45.7358 16.3296 45.5424 16.4279 45.333 16.4606L42.3848 16.9216L31.0712 5.60786L31.4954 2.638C31.5736 2.09128 32.08 1.71137 32.6268 1.78947C32.841 1.82007 33.0394 1.91932 33.1924 2.07232ZM9.18974 40.2949C16.6345 33.6319 25.1798 31.6393 34.4758 29.2539L35.3686 21.2191L26.7738 12.6241L18.7387 13.5169C16.3535 22.8129 14.3608 31.3583 7.69772 38.8029L4.9082 36.0135C10.5651 29.4137 12.6864 22.1071 15.5148 9.8505L28.2428 8.43628L39.5566 19.7501L38.1422 32.4779C25.8858 35.3063 18.5789 37.4277 11.9793 43.0845L9.18974 40.2949ZM19.7574 28.2353C18.1953 26.6731 18.1953 24.1405 19.7574 22.5785C21.3196 21.0163 23.8522 21.0163 25.4142 22.5785C26.9764 24.1405 26.9764 26.6731 25.4142 28.2353C23.8522 29.7973 21.3196 29.7973 19.7574 28.2353Z"
            fill="#3771DC"
          />
        </svg>
      ),
    },
    {
      title: "Development",
      description:
        "Employing advanced technologies, we build scalable, robust solutions optimized for performance and functionality.",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 6H42C43.1046 6 44 6.89544 44 8V40C44 41.1046 43.1046 42 42 42H6C4.89544 42 4 41.1046 4 40V8C4 6.89544 4.89544 6 6 6ZM8 10V38H40V10H8ZM24 30H36V34H24V30ZM17.3337 24L11.6768 18.3431L14.5053 15.5147L22.9906 24L14.5053 32.4852L11.6768 29.6568L17.3337 24Z"
            fill="#3771DC"
          />
        </svg>
      ),
    },
    {
      title: "Quality Assurance",
      description:
        "Thorough testing ensures flawless performance, addressing bugs and aligning deliverables with client expectations.",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40.1666 30.3996L42.5708 31.8422C43.0442 32.1264 43.1978 32.7406 42.9138 33.2142C42.8292 33.355 42.7114 33.4728 42.5708 33.5572L25.0288 44.0822C24.3954 44.4624 23.6042 44.4624 22.9708 44.0822L5.42902 33.5572C4.95544 33.273 4.80186 32.6588 5.08602 32.1852C5.17046 32.0443 5.28826 31.9266 5.42902 31.8422L7.8332 30.3996L23.9998 40.0996L40.1666 30.3996ZM40.1666 20.9996L42.5708 22.4422C43.0442 22.7264 43.1978 23.3406 42.9138 23.8142C42.8292 23.955 42.7114 24.0728 42.5708 24.1572L23.9998 35.2996L5.42902 24.1572C4.95544 23.873 4.80186 23.2588 5.08602 22.7852C5.17046 22.6444 5.28826 22.5266 5.42902 22.4422L7.8332 20.9996L23.9998 30.6996L40.1666 20.9996ZM25.0288 2.61703L42.5708 13.1422C43.0442 13.4263 43.1978 14.0406 42.9138 14.5141C42.8292 14.6549 42.7114 14.7727 42.5708 14.8571L23.9998 25.9996L5.42902 14.8571C4.95544 14.573 4.80186 13.9587 5.08602 13.4852C5.17046 13.3444 5.28826 13.2266 5.42902 13.1422L22.9708 2.61703C23.6042 2.23703 24.3954 2.23703 25.0288 2.61703ZM23.9998 6.66441L11.7745 13.9997L23.9998 21.335L36.2252 13.9997L23.9998 6.66441Z"
            fill="#3771DC"
          />
        </svg>
      ),
    },
    {
      title: "Operation",
      description:
        "We ensure smooth deployment and post-launch support for consistent performance and enhanced customer satisfaction.",
      icon: (
        <svg
          width="45"
          height="45"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 23.3333H4.66667V44.3333H0V23.3333ZM7 28H11.6667V44.3333H7V28ZM32.6667 14H37.3333V44.3333H32.6667V14ZM39.6667 18.6667H44.3333V44.3333H39.6667V18.6667ZM16.3333 0H21V44.3333H16.3333V0ZM23.3333 4.66667H28V44.3333H23.3333V4.66667Z"
            fill="#3771DC"
          />
        </svg>
      ),
    },
    {
      title: "Launch",
      description:
        "Providing ongoing support and updates to ensure your project remains secure, efficient, and up-to-date with the latest technologies.",
      icon: (
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_108_4729)">
            <path
              d="M10.5301 11.1434V35.1434H37.9587V11.1434H10.5301ZM8.81585 7.71484H39.673C40.6198 7.71484 41.3873 8.48235 41.3873 9.42913V36.8577C41.3873 37.8045 40.6198 38.572 39.673 38.572H8.81585C7.86908 38.572 7.10156 37.8045 7.10156 36.8577V9.42913C7.10156 8.48235 7.86908 7.71484 8.81585 7.71484ZM29.0323 19.3598L25.9587 16.2863H34.5302V24.8577L31.4566 21.7841L24.8326 28.4081L21.1961 24.7716L16.3474 29.6203L13.923 27.196L21.1961 19.9228L24.8326 23.5593L29.0323 19.3598Z"
              fill="#3771DC"
            />
          </g>
          <defs>
            <clipPath id="clip0_108_4729">
              <rect width="48" height="48" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[300vh] bg-gray-900 ${DMSans.className}`}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <Image
          alt="Process"
          src={bgImage}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          className="opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-medium mb-8 sm:mb-12 text-start underline">
            Process
          </h2>
          <div className="overflow-hidden">
            <motion.div
              style={{ x }}
              className="flex space-x-4 sm:space-x-6 lg:space-x-8"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
