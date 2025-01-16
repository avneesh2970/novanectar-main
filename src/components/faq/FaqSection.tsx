import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { DMSans } from '@/fonts/font';

const faqs = [
  {
    id: 1,
    question: "Website Development",
    answer: "Bringing your ideal website to life with the latest technologies and coding practices, ensuring robust, scalable, and responsive designs that provide exceptional user experiences."
  },
  {
    id: 2,
    question: "App Development: ",
    answer: "Creating custom mobile solutions from concept to launch to drive engagement and enhance user experience, helping businesses streamline operations and boost customer loyalty."
  },
  {
    id: 3,
    question: "Search Engine Optimization (SEO)",
    answer: "Employing cutting-edge techniques to optimize website content and strategic link-building, boosting online visibility and attracting more organic traffic to stay ahead of the competition."
  },
  {
    id: 4,
    question: "Graphic Design",
    answer: "Crafting visually striking assets, including eye-catching logos and compelling brand identities, to transform your brand and resonate with your audience."
  },
  {
    id: 5,
    question: "UI/UX Design",
    answer: "Focusing on creating visually appealing and easy-to-use interfaces, ensuring designs deliver intuitive and engaging experiences across web, mobile, or desktop platforms."
  },
  {
    id: 6,
    question: "Digital Marketing",
    answer: "Offering comprehensive services such as strategic social media campaigns and targeted PPC advertising to drive traffic, generate leads, and maximize ROI for businesses of all sizes."
  }
];

const FAQItem = ({ faq, isOpen, onClick, isHovered, onHover, onHoverEnd }:any) => {
  return (
    <motion.div
      className="border-t border-gray-400/30 py-4"
      initial={false}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
    >
      <motion.div 
        className="flex justify-between items-center cursor-pointer group"
        onClick={onClick}
      >
        <h3 className="text-white text-base pr-8">{faq.question}</h3>
        <motion.div
          animate={{
            rotate: isOpen ? 45 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="shrink-0"
        >
          <Plus 
            className="text-white w-5 h-5 group-hover:scale-110 transition-transform" 
          />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                  ease: "easeInOut"
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.15
                }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: {
                  duration: 0.4,
                  ease: "easeInOut"
                },
                opacity: {
                  duration: 0.25
                }
              }
            }}
            className="overflow-hidden"
          >
            <p className="text-gray-300 text-start mt-3 text-sm leading-relaxed pr-8">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openId, setOpenId] = useState<any>(null);
  const [hoveredId, setHoveredId] = useState<any>(null);

  return (
    <div className={`min-h-screen bg-[#0B2341] px-4 py-12 md:p-12 lg:p-16 ${DMSans.className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Split layout container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left column - Text content */}
          <div className="lg:sticky lg:top-16 lg:h-fit">
            <motion.h2 
              className="text-gray-400 text-lg mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              FAQ
            </motion.h2>
            
            <motion.h1 
              className="text-white text-3xl md:text-4xl font-semibold mb-6 max-w-xl text-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Let&apos;s Make Something Awesome Together
            </motion.h1>
            
            <motion.p 
              className="text-gray-300 text-sm leading-relaxed text-start max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              NovaNectar Services Pvt. Ltd is an IT solutions based Start-up company which offers a comprehensive suite of digital solutions tailored to elevate and transform businesses in the digital age. 
            </motion.p>
          </div>

          {/* Right column - FAQ items */}
          <motion.div 
            className="lg:pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {faqs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                isHovered={hoveredId === faq.id}
                onHover={() => setHoveredId(faq.id)}
                onHoverEnd={() => setHoveredId(null)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;