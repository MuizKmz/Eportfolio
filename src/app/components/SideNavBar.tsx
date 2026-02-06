"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin, Github } from "lucide-react"

type Props = {
  fixedHeight?: number;
  topOffset?: number;
  bottomOffset?: number;
  delay?: number;
  className?: string;
};

export default function ScrollStick({
  fixedHeight,
  topOffset = 20,
  bottomOffset = 80,
  delay = 5.5,
  className = "",
}: Props) {
  const [height, setHeight] = useState<number>(fixedHeight ?? 0);
  const [isTickerPaused, setIsTickerPaused] = useState(false);

  useEffect(() => {
    if (fixedHeight) {
      setHeight(fixedHeight);
      return;
    }
    function update() {
      const h = Math.max(400, window.innerHeight - topOffset - bottomOffset);
      setHeight(h);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [fixedHeight, topOffset, bottomOffset]);

  // animation variants for staggered reveal
const listVariants = {
  hidden: {},
  show: { transition: { delayChildren: 0.05, staggerChildren: 0.4 } }
};
const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: "easeOut" } // change to 1 for a 1s motion
  }
};
  // Animation timing
  const animDuration = 4;
  const repeatDelay = 1.5;
  const totalCycle = animDuration + repeatDelay;

  // Standardized hover animation for all interactive elements
const standardHover = {
  x: 8,
  y: -4,
  color: "#a855f7",
  filter: "blur(0.5px)",
  textShadow: "2px 0 0 rgba(168, 85, 247, 0.8), -2px 0 0 rgba(139, 92, 246, 0.6), 0 0 20px #8a39db, 0 0 30px #8a39db",
  transition: { 
    duration: 0.18, 
    ease: "easeOut",
  },
} as const;

// Spark effect that only shows on hover (or when isActive is true)
const SparkEffect = ({ children, isActive }: { children: React.ReactNode; isActive?: boolean }) => (
  <div 
    className={`transition-opacity duration-100 ${
      isActive !== undefined 
        ? (isActive ? "opacity-100" : "opacity-0") 
        : "opacity-0 group-hover:opacity-100"
    }`}
  >
    {/* Glitching text clone with random colors */}
    <motion.span
      className="absolute inset-0 pointer-events-none left-0 top-0"
      animate={{
        x: [0, -2, 2, -1, 1, 0],
        y: [0, 1, -1, 0.5, -0.5, 0],
        opacity: [0, 0.7, 0, 0.5, 0],
        color: ["#a855f7", "#ff0080", "#00ffff", "#a855f7", "#000000", "#ffffff", "#a855f7"],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 0.2,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>

    {/* RGB split - Red/Magenta */}
    <motion.span
      className="absolute inset-0 pointer-events-none"
      style={{
        color: "#ff0080",
        mixBlendMode: "screen",
      }}
      animate={{
        x: [0, 2, -1, 2, 0],
        opacity: [0, 0.5, 0.3, 0],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 0.4,
      }}
    >
      {children}
    </motion.span>

    {/* RGB split - Cyan */}
    <motion.span
      className="absolute inset-0 pointer-events-none"
      style={{
        color: "#00ffff",
        mixBlendMode: "screen",
      }}
      animate={{
        x: [0, -2, 1, -2, 0],
        opacity: [0, 0.5, 0.3, 0],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 0.5,
      }}
    >
      {children}
    </motion.span>

    {/* Electric glow */}
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{
        opacity: [0, 0.4, 0.1, 0.4, 0],
      }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
      }}
      style={{
        background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
        filter: "blur(15px)",
        zIndex: -1,
      }}
    />

    {/* Criss-cross strikethrough segments - Multiple horizontal lines at different heights */}
    {/* Lines at 50% */}
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "0%",
        width: "20%",
        top: "50%",
        height: "1.5px",
        background: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.7))",
        transform: "translateY(-50%)",
      }}
      animate={{
        opacity: [0, 0.8, 0.8, 0, 0, 0.8, 0.8, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "18%",
        width: "22%",
        top: "50%",
        height: "1.5px",
        background: "linear-gradient(90deg, rgba(168, 85, 247, 0.7), rgba(139, 92, 246, 0.6))",
        transform: "translateY(-50%)",
        zIndex: 1,
      }}
      animate={{
        opacity: [0, 0.9, 0.9, 0, 0, 0.9, 0.9, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.15,
      }}
    />

    {/* Lines at 52% */}
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "38%",
        width: "24%",
        top: "52%",
        height: "1.5px",
        background: "rgba(168, 85, 247, 0.65)",
        transform: "translateY(-50%)",
      }}
      animate={{
        opacity: [0, 0.85, 0.85, 0, 0, 0.85, 0.85, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3,
      }}
    />

    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "60%",
        width: "20%",
        top: "52%",
        height: "1.5px",
        background: "linear-gradient(90deg, rgba(139, 92, 246, 0.7), rgba(168, 85, 247, 0.6))",
        transform: "translateY(-50%)",
        zIndex: 1,
      }}
      animate={{
        opacity: [0, 0.9, 0.9, 0, 0, 0.9, 0.9, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.45,
      }}
    />

    {/* Lines at 54% */}
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "0%",
        width: "18%",
        top: "54%",
        height: "1.5px",
        background: "linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.65), rgba(168, 85, 247, 0.6))",
        transform: "translateY(-50%)",
      }}
      animate={{
        opacity: [0, 0.8, 0.8, 0, 0, 0.8, 0.8, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.1,
      }}
    />

    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "78%",
        width: "22%",
        top: "54%",
        height: "1.5px",
        background: "linear-gradient(90deg, rgba(168, 85, 247, 0.7), transparent)",
        transform: "translateY(-50%)",
      }}
      animate={{
        opacity: [0, 0.85, 0.85, 0, 0, 0.85, 0.85, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.6,
      }}
    />

    {/* Lines at 56% */}
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "15%",
        width: "25%",
        top: "56%",
        height: "1.5px",
        background: "rgba(139, 92, 246, 0.65)",
        transform: "translateY(-50%)",
        zIndex: 1,
      }}
      animate={{
        opacity: [0, 0.9, 0.9, 0, 0, 0.9, 0.9, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2,
      }}
    />

    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "45%",
        width: "20%",
        top: "56%",
        height: "1.5px",
        background: "linear-gradient(90deg, rgba(168, 85, 247, 0.65), rgba(139, 92, 246, 0.7))",
        transform: "translateY(-50%)",
      }}
      animate={{
        opacity: [0, 0.85, 0.85, 0, 0, 0.85, 0.85, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.35,
      }}
    />

    {/* Lines at 58% */}
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "5%",
        width: "22%",
        top: "58%",
        height: "1.5px",
        background: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.65))",
        transform: "translateY(-50%)",
      }}
      animate={{
        opacity: [0, 0.8, 0.8, 0, 0, 0.8, 0.8, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.05,
      }}
    />

    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "65%",
        width: "23%",
        top: "58%",
        height: "1.5px",
        background: "linear-gradient(90deg, rgba(139, 92, 246, 0.7), rgba(168, 85, 247, 0.6))",
        transform: "translateY(-50%)",
        zIndex: 1,
      }}
      animate={{
        opacity: [0, 0.9, 0.9, 0, 0, 0.9, 0.9, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }}
    />

    {/* Lines at 60% */}
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "30%",
        width: "25%",
        top: "60%",
        height: "1.5px",
        background: "rgba(168, 85, 247, 0.7)",
        transform: "translateY(-50%)",
      }}
      animate={{
        opacity: [0, 0.85, 0.85, 0, 0, 0.85, 0.85, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.25,
      }}
    />

    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: "75%",
        width: "25%",
        top: "60%",
        height: "1.5px",
        background: "linear-gradient(90deg, rgba(139, 92, 246, 0.7), transparent)",
        transform: "translateY(-50%)",
      }}
      animate={{
        opacity: [0, 0.85, 0.85, 0, 0, 0.85, 0.85, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.55,
      }}
    />
  </div>
);

  return (
    <motion.div
      className={`absolute bottom-10 left-15 z-30 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 5, duration: 1 }}
    >
      <div className="relative" style={{ height: `${height}px` }}>
        {/* ========== TOP CAP ========== */}
        <div className="absolute left-0 top-0 flex items-start">
          {/* Left long line + square */}
          <div className="relative">
            {/* Animated line */}
            <div className="w-4 h-0.25 bg-white/30 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-white"
                initial={{ width: 0 }}
                animate={{ width: ["0%", "100%", "100%", "100%"] }}
                transition={{
                  delay,
                  duration: animDuration,
                  times: [0, 0.05, 0.95, 1],
                  repeat: Infinity,
                  repeatDelay,
                  ease: "easeInOut",
                }}
              />
            </div>
            {/* Animated square */}
            <motion.div
              className="w-1.5 h-1.5 absolute left-0 top-full"
              initial={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              animate={{
                backgroundColor: [
                  "rgba(255, 255, 255, 0.3)",
                  "rgba(255, 255, 255, 1)",
                  "rgba(255, 255, 255, 1)",
                  "rgba(255, 255, 255, 0.3)",
                ],
              }}
              transition={{
                delay,
                duration: animDuration,
                times: [0, 0.05, 0.95, 1],
                repeat: Infinity,
                repeatDelay,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Right short line */}
          <div
            className="w-8 h-0.25 bg-white/30 relative overflow-hidden"
            style={{ marginLeft: "0.1rem" }}
          >
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-white"
              initial={{ width: 0 }}
              animate={{ width: ["0%", "100%", "100%", "100%"] }}
              transition={{
                delay,
                duration: animDuration,
                times: [0, 0.05, 0.95, 1],
                repeat: Infinity,
                repeatDelay,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        {/* Top right line */}
        <div className="absolute right-0 top-0 flex items-start">
          <div className="relative">
            <div className="w-4 h-0.25 bg-white/30 relative overflow-hidden">
              <motion.div
                className="absolute right-0 top-0 bottom-0 bg-white"
                initial={{ width: 0 }}
                animate={{ width: ["0%", "100%", "100%", "100%"] }}
                transition={{
                  delay,
                  duration: animDuration,
                  times: [0, 0.05, 0.95, 1],
                  repeat: Infinity,
                  repeatDelay,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </div>
        {/* ========== PAGE TITLE CONTENT 1========== */}
        {[
          { label: "CURRENT", position: 0.008 },

        ].map((item, index) => (
          <motion.div
            key={item.label}
            className="absolute left-6 group cursor-pointer"
            style={{ top: `${height * item.position}px` }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: delay + 1 + index * 0.1,
              duration: 1,
              ease: [0.1, 0.05, 0.01, 0.9],
            }}
          >
            <motion.div
              className="text-white/90 group-hover:text-white transition-all duration-300 relative"
              style={{
                fontFamily: "Showcase Sans mini, sans-serif",
                fontSize: "45px",
                fontWeight: "500",
                letterSpacing: "0.03em",
                whiteSpace: "nowrap",
                textShadow: "0 1px 4px rgba(0,0,0,0.25)"
              }}
              initial={{ color: "#ffffff" }}
              whileHover={standardHover}
            >
              {/* Hover indicator line */}
              <motion.div
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-purple-400 opacity-0 group-hover:opacity-100"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              {item.label}
              
          <SparkEffect>{item.label}</SparkEffect>
              
              {/* Underline effect on hover */}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-purple-400 to-transparent"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        ))}

        {/* ========== MAIN STICK ========== */}
        <div
          className="absolute left-0 top-0 w-0.5 bg-white/30 overflow-hidden"
          style={{ height: `${height}px` }}
        >
          <motion.div
            className="absolute top-0 left-0 right-0 bg-white"
            initial={{ height: 0, y: 0 }}
            animate={{
              height: [0, height, height, height, 0],
              y: [0, 0, 0, height, height],
            }}
            transition={{
              delay,
              duration: animDuration,
              times: [0, 0.4, 0.85, 0.95, 1],
              repeat: Infinity,
              repeatDelay,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* ========== 1ST NAV MENU ========== */}
        <div
          className="absolute left-0 flex items-center"
          style={{ top: `${height * 0.1}px` }}
        >
          <div className="flex items-center w-full relative">
            {/* Animated horizontal line */}
            <div className="w-50 h-0.25 bg-white/30 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-white"
                initial={{ width: 0 }}
                animate={{ width: ["0%", "0%", "100%", "100%", "0%"] }}
                transition={{
                  delay,
                  duration: animDuration,
                  times: [0, 0.15, 0.85, 0.85, 0.95],
                  repeat: Infinity,
                  repeatDelay,
                  ease: "easeInOut",
                }}
              />
            </div>
            {/* Animated square */}
            <motion.div
              className="w-1.5 h-1.5 absolute left-0 top-full"
              initial={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              animate={{
                backgroundColor: [
                  "rgba(255, 255, 255, 0.3)",
                  "rgba(255, 255, 255, 0.3)",
                  "rgba(255, 255, 255, 1)",
                  "rgba(255, 255, 255, 1)",
                  "rgba(255, 255, 255, 0.3)",
                ],
              }}
              transition={{
                delay,
                duration: animDuration,
                times: [0, 0.15, 0.85, 0.85, 0.95],
                repeat: Infinity,
                repeatDelay,
                ease: "easeInOut",
              }}
            />
          </div>
          <div
            className="ml-3 text-white"
            style={{
              fontFamily: "FF Identification, sans-serif ",
              fontSize: "30px",
            }}
          >
            TOPIC1
          </div>
        </div>

        {/* ========== PAGE TITLE CONTENT 2========== */}
        {[
          { label: "ABOUT ME", position: 0.15 },
          { label: "EDUCATION", position: 0.2 },
          { label: "SKILLS", position: 0.25 },
          { label: "PROJECT", position: 0.3 },
          { label: "WORK EXPERIENCE", position: 0.35 },
          { label: "STAFF&CAST", position: 0.4 },
          { label: "MUSIC", position: 0.45 },
          { label: "Blu-ray&DVD", position: 0.5 },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            className="absolute left-6 group cursor-pointer"
            style={{ top: `${height * item.position}px` }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: delay + 1 + index * 0.1,
              duration: 0.5,
              ease: [0.6, 0.05, 0.01, 0.9],
            }}
          >
            <motion.div
              className="text-white/90 group-hover:text-white transition-all duration-300 relative"
              style={{
                fontFamily: "Showcase Sans mini, sans-serif",
                fontSize: "30px",
                fontWeight: "500",
                letterSpacing: "0.03em",
                whiteSpace: "nowrap",
                textShadow: "0 1px 4px rgba(0,0,0,0.25)"
              }}
              initial={{ color: "#ffffff" }}
              whileHover={standardHover}
            >
              {/* Hover indicator line */}
              <motion.div
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-purple-400 opacity-0 group-hover:opacity-100"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              {item.label}
              
              <SparkEffect>{item.label}</SparkEffect>
              
              {/* Underline effect on hover */}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-purple-400 to-transparent"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        ))}

        {/* ========== 2ND NAV MENU ========== */}
        <div
          className="absolute left-0 flex items-center"
          style={{ top: `${height * 0.6}px` }}
        >
          <div className="flex items-center w-full relative">
            {/* Animated horizontal line */}
            <div className="w-50 h-0.25 bg-white/30 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-white"
                initial={{ width: 0 }}
                animate={{ width: ["0%", "0%", "100%", "100%", "0%"] }}
                transition={{
                  delay,
                  duration: animDuration,
                  times: [0, 0.15, 0.75, 0.85, 0.95],
                  repeat: Infinity,
                  repeatDelay,
                  ease: "easeInOut",
                }}
              />
            </div>
            {/* Animated square */}
            <motion.div
              className="w-1.5 h-1.5 absolute left-0 top-full"
              initial={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              animate={{
                backgroundColor: [
                  "rgba(255, 255, 255, 0.3)",
                  "rgba(255, 255, 255, 0.3)",
                  "rgba(255, 255, 255, 1)",
                  "rgba(255, 255, 255, 1)",
                  "rgba(255, 255, 255, 0.3)",
                ],
              }}
              transition={{
                delay,
                duration: animDuration,
                times: [0, 0.25, 0.85, 0.85, 0.95],
                repeat: Infinity,
                repeatDelay,
                ease: "easeInOut",
              }}
            />
          </div>
          <div
            className="ml-3 text-white"
            style={{
              fontFamily: "FF Identification, sans-serif ",
              fontSize: "30px",
            }}
          >
            TOPIC2
          </div>
        </div>
        {/* ========== 3RD NAV MENU ========== */}
        <div
          className="absolute left-0 flex items-center"
          style={{ top: `${height * 0.85}px` }}
        >
          <div className="flex items-center w-full relative">
            {/* Animated horizontal line */}
            <div className="w-50 h-0.25 bg-white/30 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-white"
                initial={{ width: 0 }}
                animate={{ width: ["0%", "0%", "100%", "100%", "0%"] }}
                transition={{
                  delay,
                  duration: animDuration,
                  times: [0, 0.3, 0.85, 0.85, 0.95],
                  repeat: Infinity,
                  repeatDelay,
                  ease: "easeInOut",
                }}
              />
            </div>
            {/* Animated square */}
            <motion.div
              className="w-1.5 h-1.5 absolute left-0 top-full"
              initial={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              animate={{
                backgroundColor: [
                  "rgba(255, 255, 255, 0.3)",
                  "rgba(255, 255, 255, 0.3)",
                  "rgba(255, 255, 255, 1)",
                  "rgba(255, 255, 255, 1)",
                  "rgba(255, 255, 255, 0.3)",
                ],
              }}
              transition={{
                delay,
                duration: animDuration,
                times: [0, 0.15, 0.65, 0.85, 0.95],
                repeat: Infinity,
                repeatDelay,
                ease: "easeInOut",
              }}
            />
          </div>
          <div
            className="ml-3 text-white"
            style={{
              fontFamily: "FF Identification, sans-serif ",
              fontSize: "30px",
            }}
          >
            SOCIAL
          </div>
        </div>

{/* ========== PAGE TITLE CONTENT 3 + SOCIAL ICONS ========== */}
{/* OFFICIAL text */}
<motion.div
  className={`absolute left-6 ${isTickerPaused ? "group" : ""}`}
  style={{ top: `${height * 0.885}px` }} // CHANGE THIS VALUE for OFFICIAL position
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
    delay: delay + 1,
    duration: 1,
    ease: [0.1, 0.05, 0.01, 0.9],
  }}
>
  <motion.div
    className="text-white/90 transition-all duration-300 relative"
    style={{
      fontFamily: "Showcase Sans mini, sans-serif",
      fontSize: "45px",
      fontWeight: "500",
      letterSpacing: "0.03em",
      whiteSpace: "nowrap",
      textShadow: "0 1px 4px rgba(0,0,0,0.25)"
    }}
    animate={isTickerPaused ? {
      x: standardHover.x,
      y: standardHover.y,
      color: standardHover.color,
      filter: standardHover.filter,
      textShadow: standardHover.textShadow,
    } : {
      x: 0,
      y: 0,
      color: "rgba(255, 255, 255, 0.9)",
      filter: "none",
      textShadow: "0 1px 4px rgba(0,0,0,0.25)",
    }}
    transition={{ duration: 0.18, ease: "easeOut" }}
  >
    OFFICIAL
    <SparkEffect isActive={isTickerPaused}>OFFICIAL</SparkEffect>
  </motion.div>
</motion.div>

{/* Social Icons - Ticker/Carousel */}
<motion.div
  className="absolute overflow-hidden"
  style={{ 
    top: `${height * 0.909}px`,
    left: "180px",
    width: "150px",
    height: "40px", // Add height to prevent top clipping
    paddingTop: "6px", // Extra space for upward hover movement
    maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
  }}
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
    delay: delay + 1,
    duration: 1,
    ease: [0.1, 0.05, 0.01, 0.9],
  }}
  onMouseEnter={() => setIsTickerPaused(true)}
  onMouseLeave={() => setIsTickerPaused(false)}
>
  <div
    className="flex items-center gap-4"
    style={{
      animation: "ticker 12s linear infinite",
      animationPlayState: isTickerPaused ? "paused" : "running",
      width: "fit-content",
    }}
  >
    {/* Duplicate icons 2x for seamless loop */}
    {[...Array(2)].map((_, setIndex) => (
      <div key={setIndex} className="flex items-center gap-4 flex-shrink-0">
        {[
          { Icon: Instagram, href: "https://www.instagram.com/muizkmz/?hl=en" },
          { Icon: Twitter, href: "https://twitter.com/..." },
          { Icon: Linkedin, href: "https://linkedin.com/..." },
          { Icon: Github, href: "https://github.com/..." },
        ].map(({ Icon, href }, i) => (
          <motion.a
            key={`${setIndex}-${i}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors relative group flex-shrink-0"
            whileHover={standardHover}
            whileTap={{ scale: 0.95 }}
          >
            <Icon size={28} strokeWidth={1.5} />
            <SparkEffect><Icon size={28} strokeWidth={1.5} /></SparkEffect>
          </motion.a>
        ))}
      </div>
    ))}
  </div>
</motion.div>

        {/* ========== BOTTOM CAP ========== */}
        <div className="absolute left-0 bottom-2 flex items-end">
          {/* Square + Left long line */}
          <div className="relative">
            {/* Animated square */}
            <motion.div
              className="w-1.5 h-1.5 absolute left-0 bottom-full"
              initial={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              animate={{
                backgroundColor: [
                  "rgba(255, 255, 255, 0.3)",
                  "rgba(255, 255, 255, 0.3)",
                  "rgba(255, 255, 255, 1)",
                  "rgba(255, 255, 255, 1)",
                  "rgba(255, 255, 255, 0.3)",
                ],
              }}
              transition={{
                delay,
                duration: animDuration,
                times: [0, 0.45, 0.85, 0.95, 1],
                repeat: Infinity,
                repeatDelay,
                ease: "easeInOut",
              }}
            />
            {/* Animated line */}
            <div className="w-4 h-0.25 bg-white/30 relative overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 bottom-0 bg-white"
                initial={{ width: 0 }}
                animate={{ width: ["0%", "0%", "100%", "100%", "0%"] }}
                transition={{
                  delay,
                  duration: animDuration,
                  times: [0, 0.25, 0.85, 0.95, 1],
                  repeat: Infinity,
                  repeatDelay,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>

          {/* Right short line */}
          <div
            className="w-8 h-0.25 bg-white/30 relative overflow-hidden"
            style={{ marginLeft: "0.1rem" }}
          >
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-white"
              initial={{ width: 0 }}
              animate={{ width: ["0%", "0%", "100%", "100%", "0%"] }}
              transition={{
                delay,
                duration: animDuration,
                times: [0, 0.55, 0.85, 0.95, 1],
                repeat: Infinity,
                repeatDelay,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>

        {/* Bottom right line */}
        <div className="absolute right-0 bottom-2 flex items-start">
          <div className="relative">
            <div className="w-4 h-0.25 bg-white/30 relative overflow-hidden">
              <motion.div
                className="absolute right-0 top-0 bottom-0 bg-white"
                initial={{ width: 0 }}
                animate={{ width: ["0%", "0%", "100%", "100%", "0%"] }}
                transition={{
                  delay,
                  duration: animDuration,
                  times: [0, 0.35, 0.85, 0.95, 1],
                  repeat: Infinity,
                  repeatDelay,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}