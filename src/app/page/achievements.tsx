"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Rank = "S" | "A" | "B" | "C";

interface Achievement {
  id: string;
  date: string;
  title: string;
  category: "HACKATHON" | "AWARD" | "LEADERSHIP" | "ACADEMIC" | "COMPETITION";
  description: string;
  outcome: string;
  rank: Rank;
  tags: string[];
}

const achievementData: Achievement[] = [
  {
    id: "ACH-001",
    date: "2023",
    title: "UTM Hackathon 2023",
    category: "HACKATHON",
    description:
      "Participated in UTM's internal hackathon, building a full-stack solution within 24 hours.",
    outcome: "Top Finalist",
    rank: "A",
    tags: ["React", "Node.js", "24h Build", "Team"],
  },
  {
    id: "ACH-002",
    date: "2022",
    title: "Final Year Project — Dean's Recognition",
    category: "ACADEMIC",
    description:
      "Received recognition for outstanding final year project in IoT-driven healthcare systems.",
    outcome: "Academic Excellence",
    rank: "S",
    tags: ["IoT", "Spring", "Firebase", "Arduino"],
  },
  {
    id: "ACH-003",
    date: "2022",
    title: "Software Engineering Club",
    category: "LEADERSHIP",
    description:
      "Active committee member in UTM's Software Engineering Club, organising workshops and tech talks.",
    outcome: "Committee Member",
    rank: "B",
    tags: ["Leadership", "Events", "Community"],
  },
  {
    id: "ACH-004",
    date: "2021",
    title: "National Coding Competition",
    category: "COMPETITION",
    description:
      "Competed in an inter-university algorithmic programming challenge representing UTM.",
    outcome: "Participant",
    rank: "B",
    tags: ["Algorithms", "Competitive", "UTM"],
  },
];

const RANK_CONFIG: Record<Rank, { color: string; glow: string; bg: string }> = {
  S: {
    color: "rgba(255,215,0,1)",
    glow:  "0 0 14px rgba(255,200,0,0.85)",
    bg:    "rgba(255,200,0,0.12)",
  },
  A: {
    color: "rgba(168,85,247,1)",
    glow:  "0 0 14px rgba(168,85,247,0.85)",
    bg:    "rgba(168,85,247,0.12)",
  },
  B: {
    color: "rgba(100,200,255,1)",
    glow:  "0 0 14px rgba(100,200,255,0.7)",
    bg:    "rgba(100,200,255,0.08)",
  },
  C: {
    color: "rgba(160,160,160,1)",
    glow:  "0 0 8px rgba(160,160,160,0.4)",
    bg:    "rgba(160,160,160,0.06)",
  },
};

const CATEGORY_COLOR: Record<Achievement["category"], string> = {
  HACKATHON:   "rgba(168,85,247,0.9)",
  AWARD:       "rgba(255,215,0,0.9)",
  LEADERSHIP:  "rgba(100,200,255,0.9)",
  ACADEMIC:    "rgba(130,255,180,0.9)",
  COMPETITION: "rgba(255,140,100,0.9)",
};

function HUDCorner({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const isT = corner[0] === "t";
  const isL = corner[1] === "l";
  return (
    <div
      style={{
        position: "absolute",
        [isT ? "top" : "bottom"]: 0,
        [isL ? "left" : "right"]: 0,
        width: 28,
        height: 28,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        style={{
          transform: `scale(${isL ? 1 : -1}, ${isT ? 1 : -1})`,
          transformOrigin: "50% 50%",
          filter: "drop-shadow(0 0 3px rgba(168,85,247,0.8))",
        }}
      >
        <line x1="3" y1="6" x2="3" y2="22" stroke="rgba(210,140,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="6" y1="3" x2="22" y2="3" stroke="rgba(210,140,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
        <polygon points="3,0 6,3 3,6 0,3" fill="rgba(230,170,255,1)" />
      </svg>
    </div>
  );
}

function AchievementCard({ item, index }: { item: Achievement; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const rank = RANK_CONFIG[item.rank];

  return (
    <motion.div
      ref={ref}
      initial={{ x: -60, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      style={{
        position: "relative",
        background: "linear-gradient(135deg, rgba(35,8,70,0.75) 0%, rgba(8,2,22,0.96) 100%)",
        border: "1px solid rgba(168,85,247,0.2)",
        padding: "24px 28px",
        overflow: "hidden",
      }}
    >
      <HUDCorner corner="tl" />
      <HUDCorner corner="tr" />
      <HUDCorner corner="bl" />
      <HUDCorner corner="br" />

      {/* Top glow pulse */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(168,85,247,0.95) 30%, rgba(168,85,247,0.95) 70%, transparent)",
          boxShadow: "0 0 10px rgba(168,85,247,0.6)",
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.6 }}
      />

      {/* Scan lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(168,85,247,0.012) 3px, rgba(168,85,247,0.012) 4px)",
        }}
      />

      {/* Scan sweep on enter */}
      <motion.div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(168,85,247,0.45) 40%, rgba(168,85,247,0.45) 60%, transparent)",
        }}
        initial={{ top: "0%", opacity: 0 }}
        animate={isInView ? { top: ["0%", "100%"], opacity: [0, 1, 0] } : {}}
        transition={{ duration: 1.2, ease: "linear", delay: index * 0.12 + 0.15 }}
      />

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        {/* Rank badge */}
        <div
          style={{
            flexShrink: 0,
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: rank.bg,
            border: `1.5px solid ${rank.color}`,
            boxShadow: rank.glow,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Yozakura, sans-serif",
              fontSize: "22px",
              color: rank.color,
              textShadow: rank.glow,
              lineHeight: 1,
            }}
          >
            {item.rank}
          </span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontFamily: "Karasu, sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  background: "rgba(133,39,227,0.2)",
                  border: "1px solid rgba(168,85,247,0.4)",
                  padding: "4px 11px",
                  color: "rgba(168,85,247,1)",
                }}
              >
                {item.date}
              </span>
              <span
                style={{
                  fontFamily: "Karasu, sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  color: CATEGORY_COLOR[item.category],
                  opacity: 0.9,
                }}
              >
                {item.category}
              </span>
            </div>
            <span
              style={{
                fontFamily: "Karasu, sans-serif",
                fontSize: "10.5px",
                letterSpacing: "0.14em",
                color: "rgba(168,85,247,0.4)",
              }}
            >
              {item.id}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "Showcase Sans mini, sans-serif",
              fontSize: "clamp(16px, 2.5vw, 22px)",
              color: "rgba(255,255,255,0.96)",
              lineHeight: 1.2,
              marginBottom: 6,
            }}
          >
            {item.title}
          </h3>

          {/* Outcome badge */}
          <span
            style={{
              display: "inline-block",
              fontFamily: "Karasu, sans-serif",
              fontSize: "11.5px",
              letterSpacing: "0.16em",
              color: rank.color,
              textShadow: rank.glow,
              marginBottom: 12,
            }}
          >
            ✓ {item.outcome}
          </span>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "linear-gradient(90deg, rgba(168,85,247,0.3), transparent)",
              marginBottom: 12,
            }}
          />

          {/* Description */}
          <p
            style={{
              fontFamily: "Showcase Sans mini, sans-serif",
              fontSize: "14.5px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.85,
              marginBottom: 14,
            }}
          >
            {item.description}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {item.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "Karasu, sans-serif",
                  fontSize: "10.5px",
                  letterSpacing: "0.08em",
                  padding: "4px 10px",
                  background: "rgba(133,39,227,0.08)",
                  border: "1px solid rgba(168,85,247,0.16)",
                  color: "rgba(168,85,247,0.7)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

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
      id="achievements"
      ref={sectionRef}
      className="min-h-screen relative flex flex-col items-center justify-center px-6 py-24"
      style={{ background: "rgba(15,0,30,0.98)" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(133,39,227,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Header */}
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
              QUESTS
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
              _ ACH.006
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
            {"// QUEST_LOG"}
          </span>
        </motion.div>

        {/* Divider */}
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

        {/* Quest list */}
        <div className="relative flex flex-col gap-8">
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

          {achievementData.map((item, index) => (
            <div key={item.id} className="relative" style={{ paddingLeft: "2.5rem" }}>
              {/* Diamond node */}
              <div className="absolute" style={{ left: -1, top: 28, zIndex: 2 }}>
                <motion.div
                  style={{
                    position: "absolute",
                    top: -7,
                    left: -7,
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    border: `1px solid ${RANK_CONFIG[item.rank].color}`,
                    opacity: 0.5,
                  }}
                  animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: index * 0.5 }}
                />
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  style={{ filter: `drop-shadow(0 0 5px ${RANK_CONFIG[item.rank].color})` }}
                >
                  <polygon points="6,0 12,6 6,12 0,6" fill={RANK_CONFIG[item.rank].color} />
                </svg>
              </div>

              <AchievementCard item={item} index={index} />
            </div>
          ))}
        </div>

        {/* Rank legend */}
        <motion.div
          className="mt-14 flex items-center gap-6 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span
            style={{
              fontFamily: "Karasu, sans-serif",
              fontSize: "11px",
              letterSpacing: "0.22em",
              color: "rgba(168,85,247,0.5)",
            }}
          >
            {"// RANK TIER"}
          </span>
          {(["S", "A", "B", "C"] as Rank[]).map((r) => (
            <span
              key={r}
              style={{
                fontFamily: "FF Identification, sans-serif",
                fontSize: "12px",
                letterSpacing: "0.18em",
                color: RANK_CONFIG[r].color,
                textShadow: RANK_CONFIG[r].glow,
              }}
            >
              {r}-RANK
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
