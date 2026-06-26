"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const timelineData = [
  {
    id: "EDU-001",
    years: "2020 – 2024",
    institution: "Universiti Teknologi Malaysia",
    degree: "Bachelor of Computer Science (Software Engineering)",
    description:
      "Focused on software engineering, algorithms, and full-stack development. Graduated with CGPA 3.59 — Johor Bahru campus.",
    cgpa: 3.59,
    tags: ["Software Engineering", "Algorithms", "Full-Stack Dev", "Data Structures", "System Design", "Database"],
  },
  {
    id: "EDU-002",
    years: "2019 – 2020",
    institution: "Universiti Teknologi Malaysia",
    degree: "Foundation in Engineering",
    description:
      "Pre-university science and engineering foundation programme at UTM Johor Bahru.",
    cgpa: 3.35,
    tags: ["Mathematics", "Physics", "Engineering Fundamentals", "Chemistry"],
  },
];

// ── HUD corner SVG ornament ──
function HUDCorner({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const isT = corner[0] === "t";
  const isL = corner[1] === "l";
  return (
    <div
      style={{
        position: "absolute",
        [isT ? "top" : "bottom"]: 0,
        [isL ? "left" : "right"]: 0,
        width: 30,
        height: 30,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        style={{
          transform: `scale(${isL ? 1 : -1}, ${isT ? 1 : -1})`,
          transformOrigin: "50% 50%",
          filter: "drop-shadow(0 0 3px rgba(168,85,247,0.85))",
        }}
      >
        <line x1="3" y1="6" x2="3" y2="24" stroke="rgba(210,140,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="6" y1="3" x2="24" y2="3" stroke="rgba(210,140,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
        <polygon points="3,0 6,3 3,6 0,3" fill="rgba(230,170,255,1)" />
        <line x1="13" y1="3" x2="13" y2="7" stroke="rgba(168,85,247,0.6)" strokeWidth="1" />
        <line x1="3" y1="13" x2="7" y2="13" stroke="rgba(168,85,247,0.6)" strokeWidth="1" />
        <line x1="24" y1="3" x2="24" y2="7" stroke="rgba(168,85,247,0.75)" strokeWidth="1" />
        <line x1="3" y1="24" x2="7" y2="24" stroke="rgba(168,85,247,0.75)" strokeWidth="1" />
        <line x1="9" y1="9" x2="13" y2="9" stroke="rgba(168,85,247,0.25)" strokeWidth="0.75" />
        <line x1="9" y1="9" x2="9" y2="13" stroke="rgba(168,85,247,0.25)" strokeWidth="0.75" />
      </svg>
    </div>
  );
}

// ── Animated CGPA progress bar ──
function CGPABar({ cgpa }: { cgpa: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const pct = (cgpa / 4.0) * 100;

  return (
    <div ref={ref}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <span
          style={{
            fontFamily: "Karasu, sans-serif",
            fontSize: "13px",
            letterSpacing: "0.22em",
            color: "rgba(168,85,247,0.75)",
          }}
        >
          CGPA SCORE
        </span>
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
          style={{
            fontFamily: "Yozakura, sans-serif",
            fontSize: "28px",
            color: "rgba(210,150,255,1)",
            textShadow: "0 0 16px rgba(168,85,247,0.75)",
            lineHeight: 1,
          }}
        >
          {cgpa.toFixed(2)}
        </motion.span>
      </div>

      {/* Bar track */}
      <div
        style={{
          position: "relative",
          height: 6,
          background: "rgba(168,85,247,0.1)",
          border: "1px solid rgba(168,85,247,0.15)",
          overflow: "hidden",
        }}
      >
        {/* Fill */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            background:
              "linear-gradient(90deg, rgba(100,20,200,0.9), rgba(168,85,247,1) 60%, rgba(210,160,255,0.95))",
            boxShadow: "0 0 12px rgba(168,85,247,0.8), 0 0 24px rgba(168,85,247,0.35)",
          }}
          initial={{ width: "0%" }}
          animate={isInView ? { width: `${pct}%` } : { width: "0%" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
        />
        {/* Sheen sweep */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            width: 70,
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
          }}
          initial={{ left: "-70px" }}
          animate={isInView ? { left: "110%" } : { left: "-70px" }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 1.9 }}
        />
      </div>

      {/* Scale */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
        <span style={{ fontFamily: "Karasu, sans-serif", fontSize: "11px", color: "rgba(168,85,247,0.4)", letterSpacing: "0.1em" }}>
          0.00
        </span>
        <span style={{ fontFamily: "Karasu, sans-serif", fontSize: "11px", color: "rgba(168,85,247,0.4)", letterSpacing: "0.1em" }}>
          / 4.00
        </span>
      </div>
    </div>
  );
}

// ── Education card ──
function EduCard({ item, index }: { item: (typeof timelineData)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ x: -60, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: index * 0.14 }}
      style={{
        position: "relative",
        background: "linear-gradient(135deg, rgba(35,8,70,0.78) 0%, rgba(8,2,22,0.96) 100%)",
        border: "1px solid rgba(168,85,247,0.2)",
        padding: "clamp(18px, 5vw, 28px) clamp(18px, 5vw, 32px)",
        overflow: "hidden",
      }}
    >
      <HUDCorner corner="tl" />
      <HUDCorner corner="tr" />
      <HUDCorner corner="bl" />
      <HUDCorner corner="br" />

      {/* Pulsing top glow bar */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(168,85,247,0.95) 30%, rgba(168,85,247,0.95) 70%, transparent)",
          boxShadow: "0 0 10px rgba(168,85,247,0.7)",
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }}
      />

      {/* Scan lines overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(168,85,247,0.013) 3px, rgba(168,85,247,0.013) 4px)",
        }}
      />

      {/* Scan sweep on enter */}
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.5) 40%, rgba(168,85,247,0.5) 60%, transparent)",
          boxShadow: "0 0 8px rgba(168,85,247,0.4)",
        }}
        initial={{ top: "0%", opacity: 0 }}
        animate={isInView ? { top: ["0%", "100%"], opacity: [0, 1, 0] } : {}}
        transition={{ duration: 1.4, ease: "linear", delay: index * 0.14 + 0.2 }}
      />

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <span
          style={{
            fontFamily: "Karasu, sans-serif",
            fontSize: "13px",
            letterSpacing: "0.18em",
            background: "rgba(133,39,227,0.22)",
            border: "1px solid rgba(168,85,247,0.45)",
            padding: "5px 13px",
            color: "rgba(168,85,247,1)",
          }}
        >
          {item.years}
        </span>
        <span
          style={{
            fontFamily: "Karasu, sans-serif",
            fontSize: "12px",
            letterSpacing: "0.16em",
            color: "rgba(168,85,247,0.42)",
          }}
        >
          {item.id}
        </span>
      </div>

      {/* Institution */}
      <h3
        style={{
          fontFamily: "Showcase Sans mini, sans-serif",
          fontSize: "clamp(22px, 3.5vw, 32px)",
          color: "rgba(255,255,255,0.96)",
          lineHeight: 1.2,
          marginBottom: 10,
        }}
      >
        {item.institution}
      </h3>

      {/* Degree */}
      <p
        style={{
          fontFamily: "Showcase Sans mini, sans-serif",
          fontSize: "clamp(16px, 2vw, 20px)",
          color: "rgba(168,85,247,0.85)",
          marginBottom: 16,
          letterSpacing: "0.01em",
        }}
      >
        {item.degree}
      </p>

      {/* Inner divider */}
      <div
        style={{
          height: 1,
          background: "linear-gradient(90deg, rgba(168,85,247,0.35), transparent)",
          marginBottom: 16,
        }}
      />

      {/* Description */}
      <p
        style={{
          fontFamily: "Showcase Sans mini, sans-serif",
          fontSize: "clamp(15px, 1.8vw, 18px)",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.85,
          marginBottom: 24,
        }}
      >
        {item.description}
      </p>

      {/* CGPA bar */}
      <CGPABar cgpa={item.cgpa} />

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 18 }}>
        {item.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "Karasu, sans-serif",
              fontSize: "12.5px",
              letterSpacing: "0.1em",
              padding: "5px 12px",
              background: "rgba(133,39,227,0.1)",
              border: "1px solid rgba(168,85,247,0.18)",
              color: "rgba(168,85,247,0.72)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.6,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="education"
      ref={sectionRef}
      className="min-h-screen relative flex flex-col items-center justify-center px-6 py-24"
      style={{ background: "rgba(15, 0, 30, 0.98)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.13) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Bottom radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(133,39,227,0.22) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto">

        {/* Header row — matches About Me alignment */}
        <motion.div
          className="flex items-end justify-between mb-3 gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-baseline gap-4">
            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white"
              style={{
                fontFamily: "Yozakura, sans-serif",
                textShadow: "0 0 40px rgba(168,85,247,0.7), 0 4px 10px rgba(0,0,0,0.5)",
                letterSpacing: "0.04em",
                lineHeight: 0.95,
              }}
            >
              EDUCATION
            </h2>
            <span
              className="hidden md:inline"
              style={{
                fontFamily: "Karasu, sans-serif",
                fontSize: "12px",
                letterSpacing: "0.22em",
                color: "rgba(168,85,247,0.7)",
                paddingBottom: "8px",
              }}
            >
              _ EDU.002
            </span>
          </div>

          <span
            style={{
              fontFamily: "Karasu, sans-serif",
              fontSize: "12px",
              letterSpacing: "0.2em",
              color: "rgba(168,85,247,0.42)",
              paddingBottom: "8px",
            }}
          >
            // ACADEMIC_RECORD
          </span>
        </motion.div>

        {/* Animated divider — originates from left */}
        <motion.div
          className="w-full h-px mb-16"
          style={{
            background:
              "linear-gradient(90deg, rgba(168,85,247,0.85), rgba(99,102,241,0.55), transparent)",
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.14 }}
        />

        {/* Timeline */}
        <div className="relative flex flex-col gap-10">
          {/* Animated vertical line */}
          <div
            ref={lineRef}
            className="absolute pointer-events-none"
            style={{
              left: 5,
              top: 0,
              bottom: 0,
              width: 1,
              transformOrigin: "top",
              background:
                "linear-gradient(180deg, transparent, rgba(168,85,247,0.5) 8%, rgba(168,85,247,0.5) 92%, transparent)",
            }}
          />

          {timelineData.map((item, index) => (
            <div key={index} className="relative" style={{ paddingLeft: "2.5rem" }}>

              {/* Diamond node */}
              <div className="absolute" style={{ left: -1, top: 30, zIndex: 2 }}>
                {/* Outer pulse ring */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: -7,
                    left: -7,
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    border: "1px solid rgba(168,85,247,0.5)",
                  }}
                  animate={{ scale: [1, 1.9, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: index * 0.5,
                  }}
                />
                {/* Inner pulse ring */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: -4,
                    left: -4,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "1px solid rgba(168,85,247,0.3)",
                  }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: index * 0.5 + 0.3,
                  }}
                />
                {/* Diamond */}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  style={{ filter: "drop-shadow(0 0 5px rgba(168,85,247,1))" }}
                >
                  <polygon points="6,0 12,6 6,12 0,6" fill="rgba(200,130,255,1)" />
                </svg>
              </div>

              <EduCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
