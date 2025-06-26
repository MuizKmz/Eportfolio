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
  src="/images/army.png"
  alt="Army"
  className="absolute right-100 bottom-20 w-[70%] max-w-[900px] object-contain z-20"
  initial={{ opacity: 0, scale: 0.95, y: 40 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ delay: 2, duration: 1.5 }}
/>

   {/* Profile Image (full at top left, above army) */}
<motion.img
  src="/images/profile1.png"
  alt="Profile"
  className="absolute left-0 top-0 h-[90vh] max-h-[700px] w-auto object-contain z-10"
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 1, duration: 1 }}
/>

      {/* Top Right Text */}
      <motion.div
        className="absolute top-10 right-10 text-right z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow">
          Muhammad Muizzuddin <br /> Bin Kamarozaman
        </h1>
        <p className="mt-2 text-purple-200 text-xl tracking-widest">
          Lv. 27 • Full-Stack Developer
        </p>
      </motion.div>

      {/* XP Bar */}
      <motion.div
        className="absolute top-[160px] right-10 w-[250px] h-2 bg-purple-900/30 rounded-full overflow-hidden z-20"
        initial={{ width: 0 }}
        animate={{ width: "250px" }}
        transition={{ delay: 3.8, duration: 2 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-purple-400 to-indigo-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ transformOrigin: "left" }}
          transition={{ delay: 3.8, duration: 2, ease: "easeOut" }}
        />
      </motion.div>

      {/* Scroll Arrow */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-purple-400 z-30"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: [0, 1, 0], y: [0, 12, 0] }}
        transition={{ delay: 5, duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={40} strokeWidth={1.5} />
      </motion.div>
    </motion.main>
  );
}
