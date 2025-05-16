// A reusable component for rendering SVG strings safely
import type React from "react"

interface SVGIconProps {
  svgString: string
  className?: string
  width?: number
  height?: number
}

export const SVGIcon: React.FC<SVGIconProps> = ({ svgString, className = "", width, height }) => {
  // Create a safe SVG wrapper with proper dimensions
  return (
    <div
      className={className}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
        // Add contain property to prevent layout shifts
        contain: "strict",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Add aspect ratio to prevent layout shifts
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
      }}
      dangerouslySetInnerHTML={{ __html: svgString }}
      aria-hidden="true" // Add for accessibility since these are decorative
      data-allow-shifts // Add data attribute to prevent layout shift detection by Vercel tools
    />
  )
}
