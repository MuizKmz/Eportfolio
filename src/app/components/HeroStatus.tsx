"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";

// Career start — first role (see workexperience.tsx). Level = full years since
// then, the bar = progress toward the next year. Real numbers, not decoration.
const CAREER_START = new Date(2023, 4, 1); // May 2023
const ROLES  = ["FULL-STACK DEVELOPER", "PROJECT DESIGN", "DEV OPS"];
const STATUS = "OPEN TO OPPORTUNITIES";
const DELAY  = 3.6;

function careerStats(now: Date) {
  const months = (now.getFullYear() - CAREER_START.getFullYear()) * 12
               + (now.getMonth() - CAREER_START.getMonth());
  const level    = Math.floor(months / 12);
  const progress = (months % 12) / 12 + now.getDate() / 30 / 12;
  return { level, years: level, months: months % 12, progress: Math.min(progress, 0.99) };
}

const label: React.CSSProperties = {
  fontFamily: "Showcase Sans mini, sans-serif",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
};

export default function HeroStatus() {
  // Computed on the client only so server and client markup always match.
  const [stats, setStats] = useState<ReturnType<typeof careerStats> | null>(null);
  const [pct, setPct]     = useState(0);
  const [filled, setFilled] = useState(false);

  useEffect(() => { setStats(careerStats(new Date())); }, []);

  // Count the percentage up alongside the fill, once.
  useEffect(() => {
    if (!stats) return;
    const controls = animate(0, stats.progress * 100, {
      delay: DELAY + 0.4,
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setPct(Math.round(v)),
      onComplete: () => setFilled(true),
    });
    return () => controls.stop();
  }, [stats]);

  const lv = stats ? String(stats.level).padStart(2, "0") : "--";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: DELAY, duration: 0.8 }}
      className="mt-6 sm:mt-8 w-full sm:w-[780px] max-w-[calc(100vw-3rem)] sm:max-w-[calc(100vw-5rem)]"
    >
      {/* ── Top row: level + class · experience ── */}
      <div className="flex items-end justify-between gap-4 mb-2.5">
        <div className="flex items-baseline gap-3 text-left">
          <span style={{ ...label, fontSize: 17, color: "rgba(196,181,253,0.75)" }}>LV.</span>
          <span
            style={{
              fontFamily: "Showcase Sans mini, sans-serif",
              fontSize: "clamp(28px, 2.8vw, 40px)",
              lineHeight: 1,
              color: "#f5f3ff",
              textShadow: "0 0 18px rgba(168,85,247,0.55)",
            }}
          >
            {lv}
          </span>
          <span className="hidden sm:inline" style={{ ...label, fontSize: "clamp(15px, 1.3vw, 20px)", color: "rgba(233,213,255,0.95)" }}>
            Software Engineer
          </span>
        </div>
        <span style={{ ...label, fontSize: "clamp(14px, 1.2vw, 18px)", color: "rgba(196,181,253,0.75)", whiteSpace: "nowrap" }}>
          EXP{" "}
          <span style={{ color: "#e9d5ff" }}>
            {stats ? `${stats.years}Y ${stats.months}M` : "—"}
          </span>
          <span className="hidden sm:inline">
            {"  ·  "}NEXT LV <span style={{ color: "#e9d5ff" }}>{pct}%</span>
          </span>
        </span>
      </div>

      {/* ── The bar: fills once, flashes once, then rests with a slow sheen ── */}
      <div
        className="relative h-1 w-full rounded-full overflow-hidden"
        style={{ background: "rgba(76,29,149,0.35)", boxShadow: "inset 0 0 0 1px rgba(168,85,247,0.12)" }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${(stats?.progress ?? 0) * 100}%`,
            transformOrigin: "left",
            background: "linear-gradient(90deg, #a78bfa, #6366f1 60%, #a855f7)",
            boxShadow: "0 0 12px rgba(168,85,247,0.7)",
          }}
          initial={{ scaleX: 0 }}
          animate={stats ? { scaleX: 1 } : undefined}
          transition={{ delay: DELAY + 0.4, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Slow sheen across the filled part only — starts after the fill */}
          {filled && (
            <motion.div
              className="absolute inset-y-0 w-24"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)" }}
              initial={{ left: "-6rem" }}
              animate={{ left: "100%" }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
            />
          )}
        </motion.div>

        {/* One-time flash at the leading edge when the fill completes */}
        {filled && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{
              left: `calc(${(stats?.progress ?? 0) * 100}% - 4px)`,
              background: "#f5f3ff",
              boxShadow: "0 0 10px 3px rgba(196,181,253,0.9)",
            }}
            initial={{ opacity: 1, scale: 1.6 }}
            animate={{ opacity: 0.85, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </div>

      {/* Year ticks under the bar */}
      <div className="relative h-1.5 w-full" aria-hidden>
        {Array.from({ length: 11 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-0 w-px h-1.5"
            style={{ left: `${((i + 1) / 12) * 100}%`, background: "rgba(168,85,247,0.25)" }}
          />
        ))}
      </div>

      {/* ── Bottom row: roles · status ── */}
      <div className="mt-4 flex flex-col items-center sm:items-stretch gap-3">
        <div className="flex flex-wrap justify-center sm:justify-start gap-x-5 gap-y-1.5">
          {ROLES.map((r) => (
            <span key={r} style={{ ...label, fontSize: "clamp(14px, 1.35vw, 20px)", color: "rgba(233,213,255,0.95)", textShadow: "0 0 14px rgba(168,85,247,0.35)" }}>
              <span style={{ color: "rgba(168,85,247,0.9)", marginRight: 8, fontSize: "0.7em", verticalAlign: "middle" }}>◆</span>
              {r}
            </span>
          ))}
        </div>
        <span className="flex items-center gap-2 whitespace-nowrap sm:self-end" style={{ ...label, fontSize: "clamp(14px, 1.2vw, 18px)", color: "rgba(187,247,208,0.95)" }}>
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-60 animate-ping" style={{ animationDuration: "2.4s" }} />
            <span className="relative w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 8px rgba(52,211,153,0.8)" }} />
          </span>
          {STATUS}
        </span>
      </div>
    </motion.div>
  );
}
