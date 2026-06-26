"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type Props = {
  height?: number;
  delay?: number;
  className?: string;
};

const TRACK_H = 300;

export default function ScrollStick({ delay = 0.8, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });
  const fillH  = useTransform(smooth, [0, 1], [0, TRACK_H]);
  const dotY   = useTransform(smooth, [0, 1], [0, TRACK_H]);

  useGSAP(
    () => {
      gsap.from(containerRef.current, {
        opacity: 0,
        x: 20,
        duration: 1.0,
        delay,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-30 select-none flex-col items-center ${className}`}
    >
      {/* Top cap */}
      <div style={{ width: "8px", height: "1px", background: "rgba(255,255,255,0.35)", marginBottom: "6px" }} />

      {/* Track */}
      <div className="relative" style={{ width: "2px", height: `${TRACK_H}px` }}>
        {/* Background */}
        <div className="absolute inset-0 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />

        {/* Filled portion */}
        <motion.div
          className="absolute top-0 left-0 right-0 rounded-full"
          style={{
            height: fillH,
            background: "linear-gradient(180deg, rgba(192,132,252,0.95) 0%, rgba(139,92,246,0.8) 55%, rgba(99,102,241,0.55) 100%)",
            boxShadow: "0 0 8px rgba(168,85,247,0.55)",
          }}
        />

        {/* Glowing cursor dot */}
        <motion.div
          style={{
            position: "absolute",
            left: "50%",
            y: dotY,
            translateX: "-50%",
            translateY: "-50%",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 0 8px 2px rgba(168,85,247,0.9), 0 0 18px rgba(168,85,247,0.4)",
          }}
        />
      </div>

      {/* Bottom cap */}
      <div style={{ width: "8px", height: "1px", background: "rgba(255,255,255,0.35)", marginTop: "6px" }} />
    </div>
  );
}
