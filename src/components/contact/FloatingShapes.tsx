import React from "react"
import { motion } from "framer-motion"

export const FloatingShapes = () => {
  const shapes = [
    { type: "circle", size: 20, color: "bg-blue-400", x: "10%", y: "20%" },
    { type: "circle", size: 15, color: "bg-purple-400", x: "80%", y: "60%" },
    { type: "circle", size: 25, color: "bg-pink-400", x: "30%", y: "80%" },
    { type: "circle", size: 30, color: "bg-green-400", x: "70%", y: "30%" },
    { type: "circle", size: 18, color: "bg-yellow-400", x: "20%", y: "50%" },
    { type: "circle", size: 28, color: "bg-red-400", x: "50%", y: "10%" },
    { type: "square", size: 20, color: "bg-indigo-400", x: "90%", y: "40%" },
    { type: "circle", size: 30, color: "bg-orange-400", x: "40%", y: "90%" },
    { type: "circle", size: 26, color: "bg-teal-400", x: "60%", y: "15%" },
    { type: "circle", size: 17, color: "bg-gray-400", x: "15%", y: "70%" },
    { type: "circle", size: 24, color: "bg-cyan-400", x: "75%", y: "50%" },
    { type: "square", size: 22, color: "bg-pink-500", x: "12%", y: "30%" },
    { type: "circle", size: 20, color: "bg-yellow-500", x: "85%", y: "10%" },
    { type: "circle", size: 32, color: "bg-green-500", x: "25%", y: "60%" },
    { type: "circle", size: 14, color: "bg-blue-500", x: "55%", y: "20%" },
    { type: "circle", size: 19, color: "bg-red-500", x: "65%", y: "90%" },
    { type: "circle", size: 27, color: "bg-purple-500", x: "35%", y: "40%" },
    { type: "square", size: 24, color: "bg-teal-500", x: "45%", y: "75%" },
    { type: "circle", size: 16, color: "bg-gray-500", x: "5%", y: "50%" },
    { type: "circle", size: 30, color: "bg-orange-500", x: "95%", y: "25%" }
]

  

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
         x: [0, 20, -20, 0],
         y: [0, -15, 15, 0],
         rotate: [0, 10, -10, 0],
         scale: [1, 1.1, 0.9, 1],
       }}
       transition={{
         duration: Math.random() * 6 + 4, // Random speed between 4s and 10s
         repeat: Number.POSITIVE_INFINITY,
         ease: "easeInOut",
       }}
     />
      ))}
    </div>
  )
}

