import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register GSAP plugins
export const registerGSAPPlugins = (): void => {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(MotionPathPlugin);
  }
};

export default gsap;
