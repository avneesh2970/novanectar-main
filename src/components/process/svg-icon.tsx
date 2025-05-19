import type React from "react"

interface SVGIconProps {
  svgString: string
  className?: string
  width?: number
  height?: number
}

export const SVGIcon: React.FC<SVGIconProps> = ({ svgString, className = "", width = 48, height = 48 }) => {
  // Create a safe SVG wrapper with proper dimensions and containment
  return (
    <div
      className={`svg-icon-wrapper ${className}`}
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
      }}
      // Add accessibility attributes
      aria-hidden="true"
      dangerouslySetInnerHTML={{
        __html: svgString
          // Add width and height attributes to the SVG element if they don't exist
          .replace("<svg", `<svg width="${width}" height="${height}" style="width:${width}px;height:${height}px;"`),
      }}
    />
  )
}
