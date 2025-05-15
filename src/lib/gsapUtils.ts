/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

// Create a placeholder GSAP object that will be replaced with the real one when loaded
export const gsap = {
  to: (_target: any, _vars: any) => {
    return { kill: () => {} };
  },
  fromTo: (_target: any, _fromVars: any, _toVars: any) => {
    return { kill: () => {} };
  },
  set: (_target: any, _vars: any) => {
    // This is a placeholder
  },
  killTweensOf: (_target: any) => {
    // This is a placeholder
  },
  timeline: (_vars?: any) => {
    return {
      to: (_target: any, _vars: any, _position?: any) => {
        // Return the timeline for chaining
        return gsap.timeline();
      },
      fromTo: (_target: any, _fromVars: any, _toVars: any, _position?: any) => {
        // Return the timeline for chaining
        return gsap.timeline();
      },
      set: (_target: any, _vars: any, _position?: any) => {
        return gsap.timeline();
      },
      kill: () => {},
    };
  },
  globalTimeline: {
    clear: () => {},
  },
};

// Placeholder for plugins
export const MotionPathPlugin = {};
export const ScrollTrigger = {
  getAll: () => [] as Array<{ kill: () => void }>,
};
export const ScrollToPlugin = {};

let isInitialized = false;
let isLoading = false;
let loadPromise: Promise<void> | null = null;

// Function to initialize GSAP and register plugins
export const initGSAP = async (): Promise<void> => {
  if (typeof window === "undefined") return Promise.resolve();

  if (isInitialized) return Promise.resolve();

  // If already loading, return the existing promise
  if (isLoading && loadPromise) return loadPromise;

  isLoading = true;

  // Create a promise to load GSAP and its plugins
  loadPromise = new Promise<void>(async (resolve) => {
    try {
      // Dynamically import GSAP core
      const gsapModule = await import("gsap");

      // Dynamically import plugins only when needed
      const [motionPathModule, scrollTriggerModule, scrollToModule] =
        await Promise.all([
          import("gsap/MotionPathPlugin"),
          import("gsap/ScrollTrigger"),
          import("gsap/ScrollToPlugin"),
        ]);

      // Register plugins
      gsapModule.gsap.registerPlugin(
        motionPathModule.MotionPathPlugin,
        scrollTriggerModule.ScrollTrigger,
        scrollToModule.ScrollToPlugin
      );

      // Replace placeholder methods with actual GSAP methods
      Object.assign(gsap, gsapModule.gsap);
      Object.assign(MotionPathPlugin, motionPathModule.MotionPathPlugin);
      Object.assign(ScrollTrigger, scrollTriggerModule.ScrollTrigger);
      Object.assign(ScrollToPlugin, scrollToModule.ScrollToPlugin);

      isInitialized = true;
      console.log("GSAP plugins registered successfully");
      resolve();
    } catch (error) {
      console.error("Error registering GSAP plugins:", error);
      resolve(); // Resolve anyway to prevent hanging promises
    } finally {
      isLoading = false;
    }
  });

  return loadPromise;
};

// Function to clean up GSAP animations
export const cleanupGSAP = (): void => {
  if (typeof window === "undefined" || !isInitialized) return;

  // Kill all active GSAP animations
  gsap.killTweensOf("*");

  // Clean up timeline
  gsap.globalTimeline.clear();

  // Kill all ScrollTriggers if they exist
  if (ScrollTrigger && ScrollTrigger.getAll) {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger && typeof trigger.kill === "function") {
        trigger.kill();
      }
    });
  }
};

// Custom hook for using GSAP in components
import { useEffect, useRef, useCallback } from "react";

// Fixed version of useGSAP hook with proper dependency handling
export const useGSAP = (
  callback: () => void,
  dependencies: React.DependencyList = []
) => {
  const initialized = useRef(false);

  // Wrap the callback in useCallback to ensure it's stable
  const stableCallback = useCallback(callback, [...dependencies, callback]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isActive = true;

    const loadAndRun = async () => {
      await initGSAP();
      if (isActive && !initialized.current) {
        stableCallback();
        initialized.current = true;
      }
    };

    loadAndRun();

    return () => {
      isActive = false;
    };
  }, [stableCallback]); // Only depend on the stable callback
};
