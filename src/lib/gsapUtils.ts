import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let isInitialized = false;

// Function to initialize GSAP and register plugins
export const initGSAP = (): void => {
  if (typeof window !== "undefined" && !isInitialized) {
    try {
      gsap.registerPlugin(
        MotionPathPlugin,
        ScrollTrigger,
        ScrollToPlugin
      );
      isInitialized = true;
      console.log("GSAP plugins registered successfully");
    } catch (error) {
      console.error("Error registering GSAP plugins:", error);
    }
  }
};

// Function to clean up GSAP animations
export const cleanupGSAP = (): void => {
  if (typeof window !== "undefined") {
    // Kill all active GSAP animations
    gsap.killTweensOf("*");
    
    // Clean up timeline
    gsap.globalTimeline.clear();
    
    // Kill all ScrollTriggers if they exist
    if (ScrollTrigger) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }
};

// Export everything as named exports
export { gsap };
export { MotionPathPlugin };
export { ScrollTrigger };
export { ScrollToPlugin };