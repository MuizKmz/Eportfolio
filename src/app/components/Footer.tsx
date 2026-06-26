"use client";

import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

const bounce = {
  y: [0, -6, 0],
  transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" as const },
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative w-full flex items-center justify-center"
      style={{
        height: 140,
        background: "rgba(4,1,14,0.98)",
        borderTop: "1px solid rgba(168,85,247,0.18)",
      }}
    >
      {/* Glow line at top */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: 1,
          background:
            "linear-gradient(90deg,transparent,rgba(168,85,247,0.7) 30%,rgba(99,102,241,0.7) 70%,transparent)",
          boxShadow: "0 0 10px rgba(168,85,247,0.4)",
        }}
      />

      <motion.button
        onClick={scrollToTop}
        className="flex flex-col items-center gap-1"
        style={{ background: "transparent", border: "none", cursor: "pointer", padding: "0 24px" }}
        whileHover="hover"
        initial="rest"
      >
        {/* Circle + arrow bounce together */}
        <motion.div animate={bounce} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <motion.div
            className="footer-circle-glitch"
            variants={{
              rest:  { boxShadow: "0 0 10px rgba(168,85,247,0.2)", borderColor: "rgba(168,85,247,0.4)" },
              hover: { boxShadow: "0 0 20px rgba(168,85,247,0.6)", borderColor: "rgba(168,85,247,0.9)" },
            }}
            transition={{ duration: 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "1px solid rgba(168,85,247,0.4)",
              background: "rgba(133,39,227,0.12)",
              color: "rgba(168,85,247,0.85)",
            }}
          >
            <ChevronUp size={20} strokeWidth={2} />
          </motion.div>

          {/* Label — permanent glitch */}
          <div
            className="footer-glitch"
            style={{ position: "relative", display: "inline-block" }}
          >
            <span
              style={{
                fontFamily: "Karasu, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.5em",
                color: "rgba(168,85,247,0.55)",
              }}
            >
              RETURN TO TOP
            </span>
            <span
              className="glitch-r"
              aria-hidden
              style={{
                position: "absolute", top: 0, left: 0,
                fontFamily: "Karasu, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.5em",
                whiteSpace: "nowrap",
              }}
            >
              RETURN TO TOP
            </span>
            <span
              className="glitch-c"
              aria-hidden
              style={{
                position: "absolute", top: 0, left: 0,
                fontFamily: "Karasu, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.5em",
                whiteSpace: "nowrap",
              }}
            >
              RETURN TO TOP
            </span>
          </div>
        </motion.div>
      </motion.button>
    </footer>
  );
}
