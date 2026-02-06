"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <motion.main
      initial={{ backgroundColor: "#000000" }}
      animate={{
        backgroundImage:
          "linear-gradient(160deg, rgba(233, 242, 245, 1) 0%, rgba(159, 120, 191, 1) 53%, rgba(133, 39, 227, 1) 100%)",
      }}
      transition={{ duration: 2 }}
      className="relative min-h-screen overflow-hidden text-white flex items-center justify-start"
    >
      <motion.img
        src="/images/army1.png"
        alt="Army"
        className="absolute right-100 bottom-20 w-[70%] max-w-[900px] object-contain z-20"
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2, duration: 1.5 }}
      />

      <motion.img
        src="/images/dol1.png"
        alt="Profile"
        className="absolute left-0 top-0 h-[90vh] max-h-[700px] w-auto object-contain z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
      />

      <motion.div
        className="absolute top-10 right-10 flex flex-col items-end z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none text-right"
          style={{
            fontFamily: 'Yozakura, sans-serif',
            textShadow: '0 4px 10px rgba(0,0,0,0.35), 0 0 30px rgba(180, 120, 255, 0.4)',
          }}
        >
          MUhammad MuiZZuddin <br />
          <span
            className="block text-center opacity-90"
            style={{ textShadow: '0 4px 18px rgba(0,0,0,0.35)' }}
          >
            Kamarozaman
          </span>
        </h1>
        <p
          className="mt-10 text-purple-200 text-lg md:text-xl tracking-[0.10em] font-light text-shadow-glow"
          style={{ fontFamily: 'Showcase Sans mini, sans-serif', fontSize: '35px' }}
        >
          • FULL-STACK DEVELOPER • PROJECT DESIGN • DEV OPS •
          <span className="block text-center text-purple-200 text-lg md:text-xl tracking-[0.10em] font-light text-shadow-soft" 
            style={{ fontFamily: 'Showcase Sans mini, sans-serif', fontSize: '35px' }}>
            • VIBE CODER •
          </span>
        </p>
      </motion.div>

      <motion.div
        className="absolute top-[250px] right-10 w-[780px] h-1 bg-purple-900/30 rounded-full overflow-hidden z-20 shadow-lg"
        initial={{ width: 0, opacity: 0 }}
        animate={{ 
          width: "780px",
          opacity: 1,
          boxShadow: [
            "0 0 10px rgba(139, 92, 246, 0.3)",
            "0 0 20px rgba(139, 92, 246, 0.6)",
            "0 0 10px rgba(139, 92, 246, 0.3)",
          ]
        }}
        transition={{ 
          width: { delay: 3.8, duration: 2 },
          opacity: { delay: 3.8, duration: 0.5 },
          boxShadow: { 
            delay: 5.8, 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-purple-400 via-indigo-500 to-purple-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0.85, 1] }}
          style={{ transformOrigin: "left" }}
          transition={{ 
            delay: 3.8, 
            duration: 3,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-0 left-0 h-full w-[100px]"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
          initial={{ x: "-100px" }}
          animate={{ x: "860px" }}
          transition={{
            delay: 2,
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            ease: "linear"
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-purple-400 z-30"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 1, 0], y: [0, 12, 0] }}
        transition={{ delay: 2, duration: 1, repeat: Infinity }}
      >
        <ChevronDown size={40} strokeWidth={1.5} />
      </motion.div>
    </motion.main>
  );
}
