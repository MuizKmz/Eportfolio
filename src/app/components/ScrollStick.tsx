"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  height?: number;     // px
  delay?: number;      // seconds before each loop starts
  className?: string;
};

export default function ScrollStick({ height = 220, delay = 5.5, className = "" }: Props) {
  return (
    <motion.div
      className={`fixed bottom-10 right-10 flex flex-row items-center gap-4 z-30 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 5, duration: 1 }}
    >
<motion.p
  className="text-purple-200 text-lg md:text-xl lg:text-3xl tracking-[0.2em]"
  style={{ writingMode: "vertical-rl", textShadow: "0 2px 10px rgba(168,85,247,0.5)", fontFamily: "FF Identification, sans-serif" }}
>
  SCROLL
</motion.p>

      <div className="relative">
        <div className="w-1.5 h-1.5 bg-white/60 mb-2 " />

        <div className={`relative w-1.5 bg-white/30 overflow-hidden`} style={{ height: `${height}px` }}>
          <motion.div
            className="absolute top-0 left-0 right-0 bg-white"
            initial={{ height: 0, y: 0 }}
            animate={{
              height: [0, height, height, height, 0],
              y: [0, 0, 0, height, height],
            }}
            transition={{
              delay,
              duration: 2.6,
              times: [0, 0.45, 0.7, 0.95, 1],
              repeat: Infinity,
              repeatDelay: 0.5,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="w-1.5 h-1.5 bg-white/60 mt-2 " />
      </div>
    </motion.div>
  );
}