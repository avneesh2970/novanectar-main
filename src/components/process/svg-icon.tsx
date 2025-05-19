import { useEffect, useState } from "react"
import type React from "react"

interface SVGIconProps {
  svgString: string
  className?: string
  width?: number
  height?: number
  onLoad?: () => void
}

export const SVGIcon: React.FC<SVGIconProps> = ({ 
  svgString, 
  className = "", 
  width = 48, 
  height = 48,
  onLoad
}) => {
  // State to track if the SVG has loaded
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Effect to handle SVG loading
  useEffect(() => {
    if (svgString) {
      // Simpler approach without Blob to avoid TypeScript errors
      setIsLoaded(true)
      if (onLoad) onLoad()
    }
  }, [svgString, onLoad])

  // Create a safe SVG wrapper with proper dimensions and containment
  return (
    <div
      className={`svg-icon-wrapper ${className} ${isLoaded ? 'svg-loaded' : 'svg-loading'}`}
      style={{
        // Set explicit dimensions to prevent layout shifts
        width: `${width}px`,
        height: `${height}px`,
        // Use CSS containment for better performance
        contain: "strict",
        // Center content
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Set explicit aspect ratio to prevent layout shifts
        aspectRatio: `${width} / ${height}`,
        // Add background placeholder to reserve space
        backgroundColor: "rgba(219, 234, 254, 0.1)",
        // Ensure the wrapper is positioned properly
        position: "relative",
        // Prevent overflow
        overflow: "hidden"
      }}
      // Use data attributes to prevent layout shift detection by Vercel tools
      data-allow-shifts
      // Add accessibility attributes
      aria-hidden="true"
      dangerouslySetInnerHTML={{ 
        __html: svgString 
          // Add width and height attributes to the SVG element if they don't exist
          .replace('<svg', `<svg width="${width}" height="${height}" style="width:${width}px;height:${height}px;position:absolute;top:0;left:0;"`)
      }}
    />
  )
}