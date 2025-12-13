import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "novanectar.co.in",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "codecrafters.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "techfusion.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "innowave.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
