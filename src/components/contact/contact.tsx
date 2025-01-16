"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useForm, SubmitHandler } from "react-hook-form";
import { DMSans } from "@/fonts/font";

interface IFormInput {
  name: string;
  email: string;
  contact: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();

  useEffect(() => {
    gsap.to(".grid-line", {
      opacity: 0.2,
      duration: 1,
      stagger: 0.1,
      ease: "power2.inOut",
    });
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.log("error in api call:", error)
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className={`relative min-h-screen bg-white overflow-hidden p-4 ${DMSans.className}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
        {[...Array(35)].map((_, i) => (
          <div key={i} className="grid-line border border-gray-500" />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10 pt-16">

        
      <motion.h1 
      className="text-3xl md:text-4xl font-bold text-center mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Start your{" "}
      </motion.span>
      <motion.span 
        className="relative inline-block"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.span 
          className="text-blue-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          project
        </motion.span>
        <motion.svg 
          viewBox="0 0 100 20" 
          className="absolute -bottom-2 left-0 w-full h-2"
          preserveAspectRatio="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: "easeInOut" }}
        >
          <motion.path 
            d="M0,10 Q50,10 85,8 T100,4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-blue-600"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeInOut" }}
          />
        </motion.svg>
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        {" "}Today!
      </motion.span>
    </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-gray-600 font-bold mb-4 text-lg">CONTACT</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-gray-900 text-xl">
                  info@novanectar.co.in
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-5 h-5 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-gray-900 text-xl">+91 8979891703</span>
                <span className="text-gray-900 text-xl">+91 8979891705</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="bg-white p-6 rounded-xl shadow-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <motion.div className="space-y-4 text-xl">
              <motion.div variants={inputVariants} whileFocus="focus">
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </motion.div>
              
              <motion.div variants={inputVariants} whileFocus="focus">
                <input
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </motion.div>
              
              <motion.div variants={inputVariants} whileFocus="focus">
                <input
                  {...register("contact", { 
                    required: "Contact number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid contact number"
                    }
                  })}
                  type="tel"
                  placeholder="Your Contact"
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
              </motion.div>
              
              <motion.div variants={inputVariants} whileFocus="focus">
                <input
                  {...register("subject", { required: "Subject is required" })}
                  type="text"
                  placeholder="Subject"
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
              </motion.div>
              
              <motion.div variants={inputVariants} whileFocus="focus">
                <textarea
                  {...register("message", { required: "Message is required" })}
                  placeholder="Message"
                  rows={4}
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </motion.button>
              
              {submitStatus === 'success' && (
                <p className="text-green-500 text-center">Form submitted successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 text-center">An error occurred. Please try again.</p>
              )}
            </motion.div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

