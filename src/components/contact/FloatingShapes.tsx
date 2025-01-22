import React from "react"
import { motion } from "framer-motion"

export const FloatingShapes = () => {
  const shapes = [
    { type: "circle", size: 20, color: "bg-blue-400", x: "10%", y: "20%" },
    { type: "square", size: 15, color: "bg-purple-400", x: "80%", y: "60%" },
    { type: "triangle", size: 25, color: "bg-pink-400", x: "30%", y: "80%" },
    { type: "circle", size: 30, color: "bg-green-400", x: "70%", y: "30%" },
    { type: "square", size: 18, color: "bg-yellow-400", x: "20%", y: "50%" },
    { type: "circle", size: 22, color: "bg-red-400", x: "50%", y: "10%" },
    { type: "square", size: 20, color: "bg-indigo-400", x: "90%", y: "40%" },
    { type: "triangle", size: 28, color: "bg-orange-400", x: "40%", y: "90%" },
    { type: "circle", size: 26, color: "bg-teal-400", x: "60%", y: "15%" },
    { type: "square", size: 17, color: "bg-gray-400", x: "15%", y: "70%" },
    { type: "triangle", size: 24, color: "bg-cyan-400", x: "75%", y: "50%" },
  ];
  

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.color} opacity-50`}
          style={{
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: shape.x,
            top: shape.y,
            borderRadius: shape.type === "circle" ? "50%" : shape.type === "triangle" ? "0" : "4px",
          }}
          animate={{
            x: [0, 10, -10, 0],
            y: [0, -10, 10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 10 + index * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

