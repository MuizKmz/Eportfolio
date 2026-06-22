"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const DURATION = 2.6;
// Linear-ish ease so the scan feels mechanical, like a real scanner head
const SCAN_EASE = [0.2, 0, 0.8, 1] as const;

export default function SectionReveal({ children }: { children: React.ReactNode }) {
  const ref  = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);

  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (!isInView || go) return;
    const t = setTimeout(() => setGo(true), 60);
    return () => clearTimeout(t);
  }, [isInView, go]);

  return (
    <div ref={ref} style={{ position: "relative" }}>

      {/* ── Content — clip-path reveals top → bottom like a scanner ── */}
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: go ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
        transition={{ duration: DURATION, ease: SCAN_EASE }}
        style={{ willChange: "clip-path" }}
      >
        {children}
      </motion.div>

      {/* ── Primary scan glow line ── */}
      <motion.div
        initial={{ top: "0%", opacity: 0 }}
        animate={go
          ? { top: ["0%", "100%", "102%"], opacity: [0, 1, 1, 0] }
          : { top: "0%", opacity: 0 }
        }
        transition={{ duration: DURATION, ease: SCAN_EASE, times: [0, 0.02, 0.97, 1] }}
        style={{
          position: "absolute",
          left: 0, right: 0,
          height: 3,
          pointerEvents: "none",
          zIndex: 25,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(110,25,210,0.5) 8%, rgba(168,85,247,1) 28%, rgba(225,180,255,1) 50%, rgba(168,85,247,1) 72%, rgba(110,25,210,0.5) 92%, transparent 100%)",
          boxShadow:
            "0 0 16px rgba(168,85,247,1), 0 0 48px rgba(168,85,247,0.7), 0 0 100px rgba(168,85,247,0.3)",
        }}
      />

      {/* ── Wider soft bloom behind the main line ── */}
      <motion.div
        initial={{ top: "0%", opacity: 0 }}
        animate={go
          ? { top: ["0%", "100%", "102%"], opacity: [0, 0.55, 0.55, 0] }
          : { top: "0%", opacity: 0 }
        }
        transition={{ duration: DURATION, ease: SCAN_EASE, times: [0, 0.02, 0.97, 1] }}
        style={{
          position: "absolute",
          left: 0, right: 0,
          height: 40,
          marginTop: -20,
          pointerEvents: "none",
          zIndex: 24,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.12) 40%, rgba(168,85,247,0.18) 50%, rgba(168,85,247,0.12) 60%, transparent 100%)",
          filter: "blur(4px)",
        }}
      />

      {/* ── Thin trailing edge line ── */}
      <motion.div
        initial={{ top: "0%", opacity: 0 }}
        animate={go
          ? { top: ["0%", "100%", "102%"], opacity: [0, 0.55, 0.55, 0] }
          : { top: "0%", opacity: 0 }
        }
        transition={{ duration: DURATION, ease: SCAN_EASE, delay: 0.08, times: [0, 0.02, 0.97, 1] }}
        style={{
          position: "absolute",
          left: "12%", right: "12%",
          height: 1,
          pointerEvents: "none",
          zIndex: 26,
          background:
            "linear-gradient(90deg, transparent, rgba(220,180,255,0.9) 50%, transparent)",
        }}
      />

      {/* ── Flash pulse at scan complete ── */}
      {go && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.18, 0] }}
          transition={{ duration: 0.5, delay: DURATION - 0.1, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 23,
            background: "rgba(168,85,247,1)",
          }}
        />
      )}
    </div>
  );
}
