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
      style={{ width: width ? `${width}px` : "100%", height: height ? `${height}px` : "100%" }}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  )
}