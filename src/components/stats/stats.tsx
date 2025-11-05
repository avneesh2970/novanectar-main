"use client";

import { DMSans } from "@/fonts/font";
import type React from "react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// Custom hook for intersection observer with proper typing
const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLDivElement | null>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]); // Updated to include the entire options object

  return [ref, isIntersecting];
};

// Custom hook for animating count
const useCountAnimation = (end: number, duration = 2, start = 0) => {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAnimating) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * (end - start) + start));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start, isAnimating]);

  return { count, setIsAnimating };
};

interface StatItemProps {
  value: string | number;
  label: string;
  delay: number;
  isNumeric?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  delay,
  isNumeric = true,
}) => {
  const [ref, inView] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "0px",
  });

  const endValue = isNumeric ? Number.parseInt(value.toString()) : 0;
  const { count, setIsAnimating } = useCountAnimation(endValue);

  useEffect(() => {
    if (inView) {
      setIsAnimating(true);
    }
  }, [inView, setIsAnimating]);

  const displayValue = isNumeric ? count : value;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="stats-card bg-[#EDF6FF] p-4 sm:p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-300"
    >
      <motion.div
        className="text-[#4878AF] font-bold text-3xl sm:text-4xl lg:text-5xl"
        initial={{ scale: 0.8 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 10,
          delay: delay + 0.2,
        }}
      >
        {isNumeric ? (
          <>
            {displayValue}
            {value.toString().includes("+") && "+"}
          </>
        ) : (
          displayValue
        )}
      </motion.div>
      <motion.div
        className="text-[#0a0a0a] text-sm sm:text-base mt-2"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

export default function StatsCounter() {
  const stats = [
    { value: 5, label: "Years Experience", suffix: "+" },
    { value: 300, label: "Completed Projects", suffix: "+" },
    { value: 200, label: "Happy Clients", suffix: "+" },
    { value: "200%", label: "ROI (Return on Investment)", isNumeric: false },
  ];

  return (
    <div className={`${DMSans.className} py-8 sm:py-12 lg:py-16 bg-white max-w-[1400px] mx-auto`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={
                stat.isNumeric === false
                  ? stat.value
                  : `${stat.value}${stat.suffix || ""}`
              }
              label={stat.label}
              delay={index * 0.2}
              isNumeric={stat.isNumeric !== false}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
