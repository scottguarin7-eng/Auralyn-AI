"use client";

import { motion } from "framer-motion";

const orbs = [
  { top: "12%", left: "8%", color: "#8b5cf6", size: 260 },
  { top: "20%", right: "8%", color: "#06b6d4", size: 220 },
  { top: "60%", left: "35%", color: "#ec4899", size: 180 },
  { top: "78%", right: "18%", color: "#6366f1", size: 260 },
];

export function NeuralBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="neural-grid absolute inset-0 opacity-80" />

      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            top: orb.top,
            left: orb.left,
            right: orb.right,
            width: orb.size,
            height: orb.size,
            background: orb.color,
            opacity: 0.14,
          }}
          animate={{
            x: [0, index % 2 ? -35 : 35, 0],
            y: [0, index % 2 ? 28 : -28, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8 + index,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="noise" />
    </div>
  );
}
