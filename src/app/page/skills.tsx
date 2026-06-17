"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Cpu, Workflow } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiTypescript, SiJavascript, SiPython, SiDart, SiPhp,
  SiHtml5, SiCss,
  SiReact, SiNextdotjs, SiFlutter, SiTailwindcss, SiFramer,
  SiNodedotjs, SiSpring,
  SiMysql, SiFirebase, SiPostgresql, SiMongodb,
  SiDocker, SiGithubactions, SiGitlab, SiGit, SiJira, SiArduino,
  SiFigma, SiCanva, SiN8N,SiLaravel,
} from "react-icons/si";
import { GitHubCalendar } from "react-github-calendar";

type LucideIcon = typeof Code2;
type AnyIcon   = IconType | LucideIcon;
type Skill     = { name: string; icon: AnyIcon; color: string };

// ── Skills flat list ───────────────────────────────────────────────────────
const SKILLS: Skill[] = [
  { name: "TypeScript",  icon: SiTypescript,  color: "#3178C6" },
  { name: "JavaScript",  icon: SiJavascript,  color: "#F7DF1E" },
  { name: "Python",      icon: SiPython,      color: "#3776AB" },
  { name: "Dart",        icon: SiDart,        color: "#0175C2" },
  { name: "PHP",         icon: SiPhp,         color: "#777BB4" },
  { name: "Java",        icon: Code2,         color: "#ED8B00" },
  // { name: "C++",         icon: Cpu,           color: "#00599C" },
  { name: "HTML",        icon: SiHtml5,       color: "#E34F26" },
  { name: "CSS",         icon: SiCss,         color: "#1572B6" },
  { name: "React",       icon: SiReact,       color: "#61DAFB" },
  { name: "Next.js",     icon: SiNextdotjs,   color: "#e2e2e2" },
  { name: "Flutter",     icon: SiFlutter,     color: "#54C5F8" },
  { name: "Tailwind",    icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Framer",      icon: SiFramer,      color: "#8B8BF9" },
  { name: "Node.js",     icon: SiNodedotjs,   color: "#68A063" },
  { name: "Spring",      icon: SiSpring,      color: "#6DB33F" },
  { name: "MySQL",       icon: SiMysql,       color: "#4479A1" },
  { name: "Firebase",    icon: SiFirebase,    color: "#FFCA28" },
  { name: "PostgreSQL",  icon: SiPostgresql,  color: "#6B8FD4" },
  { name: "MongoDB",     icon: SiMongodb,     color: "#47A248" },
  { name: "Docker",      icon: SiDocker,      color: "#2496ED" },
  { name: "GH Actions",  icon: SiGithubactions, color: "#6B8FD4" },
  { name: "GitLab",      icon: SiGitlab,      color: "#FC6D26" },
  { name: "Git",         icon: SiGit,         color: "#F05032" },
  { name: "Jira",        icon: SiJira,        color: "#0052CC" },
  { name: "Arduino",     icon: SiArduino,     color: "#00979D" },
  { name: "Figma",       icon: SiFigma,       color: "#F24E1E" },
  { name: "Canva",       icon: SiCanva,       color: "#00C4CC" },
  { name: "n8n",         icon: SiN8N,         color: "#EA4B71" },
  { name: "Automation",  icon: Workflow,       color: "#A855F7" },
  //laravel
  { name: "Laravel",     icon: SiLaravel,         color: "#FF2D20" },

];

// ── GitHub calendar theme ─────────────────────────────────────────────────
const GH_THEME = {
  dark: [
    "rgba(133,39,227,0.08)",
    "rgba(133,39,227,0.32)",
    "rgba(133,39,227,0.58)",
    "rgba(168,85,247,0.82)",
    "rgba(200,130,255,1)",
  ],
};

// Available years to browse
const CURRENT_YEAR = new Date().getFullYear();
const YEARS: (number | "last")[] = ["last", CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2];

// ── Framer Motion variants for stagger ────────────────────────────────────
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
};
const iconV = {
  hidden: { opacity: 0, scale: 0.5 },
  show:   { opacity: 1, scale: 1 },
};

// ── Sub-panel label ───────────────────────────────────────────────────────
function PanelLabel({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
      <span style={{
        fontFamily: "Karasu, sans-serif", fontSize: "10px",
        letterSpacing: "0.24em", color: "rgba(168,85,247,0.65)", flexShrink: 0,
      }}>
        {label}
      </span>
      <div style={{
        flex: 1, height: 1,
        background: "linear-gradient(90deg, rgba(168,85,247,0.35), transparent)",
      }} />
    </div>
  );
}

// ── Skill Matrix ──────────────────────────────────────────────────────────
function SkillMatrix() {
  return (
    <div>
      <PanelLabel label="// SKILL_MATRIX" />

      <div style={{ position: "relative" }}>
        {/* Scan sweep — clipped to its own layer so labels don't get cut */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 10 }}>
          <motion.div
            style={{
              position: "absolute", left: 0, right: 0, height: 2,
              background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.45) 40%, rgba(168,85,247,0.45) 60%, transparent)",
            }}
            animate={{ top: ["-2px", "110%"] }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 5, ease: "linear" }}
          />
        </div>

        {/* Icons — stagger via variants, no boxes */}
        <motion.div
          variants={containerV}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{ display: "flex", flexWrap: "wrap", gap: "22px 18px" }}
        >
          {SKILLS.map((skill) => {
            const Icon = skill.icon as AnyIcon;
            return (
              <motion.div
                key={skill.name}
                variants={iconV}
                whileHover={{ scale: 1.22 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 5,
                  cursor: "default", position: "relative",
                }}
                className="skill-float"
              >
                {/* Ambient glow */}
                <div
                  className="skill-glow"
                  style={{
                    position: "absolute", width: 50, height: 50, borderRadius: "50%",
                    background: `radial-gradient(circle, ${skill.color}18 0%, transparent 70%)`,
                    transition: "background 0.25s",
                  }}
                />
                {/* Icon */}
                <div style={{
                  width: 44, height: 44,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", zIndex: 1,
                }}>
                  <Icon
                    size={26}
                    color={skill.color}
                    style={{ opacity: 0.7, transition: "opacity 0.2s" }}
                    className="skill-icon-el"
                  />
                </div>
                {/* Name */}
                <span
                  className="skill-name"
                  style={{
                    fontFamily: "Karasu, sans-serif", fontSize: "8px",
                    letterSpacing: "0.1em", color: "rgba(255,255,255,0.55)",
                    textAlign: "center", maxWidth: 64, lineHeight: 1.3,
                    transition: "color 0.2s",
                  }}
                >
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

// ── GitHub panel — client-only to avoid hydration mismatch ────────────────
function GithubPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Prevent SSR/hydration mismatch — render calendar only on client
  const [mounted, setMounted] = useState(false);
  const [year, setYear] = useState<number | "last">("last");
  useEffect(() => { setMounted(true); }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
    >
      <PanelLabel label="// ACTIVITY_LOG" />

      {/* Calendar wrapper */}
      <div style={{
        position: "relative",
        padding: "18px 16px 16px",
        background: "rgba(133,39,227,0.05)",
        border: "1px solid rgba(168,85,247,0.14)",
        overflow: "hidden",
      }}>
        {/* HUD corner brackets */}
        {(["tl","tr","bl","br"] as const).map(c => {
          const isT = c[0]==="t", isL = c[1]==="l";
          return (
            <div key={c} style={{
              position:"absolute",
              [isT?"top":"bottom"]: 0, [isL?"left":"right"]: 0,
              width: 14, height: 14, pointerEvents:"none",
              borderTop:    isT  ? "1px solid rgba(168,85,247,0.5)" : undefined,
              borderBottom: !isT ? "1px solid rgba(168,85,247,0.5)" : undefined,
              borderLeft:   isL  ? "1px solid rgba(168,85,247,0.5)" : undefined,
              borderRight:  !isL ? "1px solid rgba(168,85,247,0.5)" : undefined,
            }}/>
          );
        })}

        {/* Scan lines */}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(168,85,247,0.012) 3px, rgba(168,85,247,0.012) 4px)",
        }}/>

        {/* Year selector — horizontal row above the calendar */}
        <div style={{
          display: "flex", flexDirection: "row", gap: 6,
          marginBottom: 16, position: "relative", zIndex: 1,
        }}>
          {YEARS.map(y => (
            <button
              key={y}
              onClick={() => setYear(y)}
              style={{
                fontFamily: "Karasu, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.14em",
                padding: "4px 12px",
                background: y === year ? "rgba(133,39,227,0.35)" : "rgba(133,39,227,0.08)",
                border: `1px solid ${y === year ? "rgba(168,85,247,0.7)" : "rgba(168,85,247,0.18)"}`,
                color: y === year ? "rgba(200,130,255,1)" : "rgba(168,85,247,0.5)",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: y === year ? "0 0 10px rgba(168,85,247,0.25)" : "none",
              }}
            >
              {y === "last" ? "LAST 12M" : y}
            </button>
          ))}
        </div>

        {/* Calendar — full width */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {mounted ? (
            <GitHubCalendar
              username="MuizKmz"
              year={year}
              theme={GH_THEME}
              colorScheme="dark"
              blockSize={14}
              blockMargin={4}
              blockRadius={2}
              fontSize={11}
              style={{
                color: "rgba(168,85,247,0.55)",
                fontFamily: "Karasu, sans-serif",
                width: "100%",
              }}
            />
          ) : (
            <div style={{ height: 148, background: "rgba(133,39,227,0.05)" }} />
          )}
        </div>
      </div>

      {/* Footer row */}
      <div style={{ marginTop: 12, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display: "flex", gap: 18 }}>
          {[{ num: "2+", label: "YRS ACTIVE" }, { num: "4+", label: "REPOS" }].map(s => (
            <div key={s.label} style={{ display:"flex", flexDirection:"column", gap: 2 }}>
              <span style={{
                fontFamily: "Yozakura, sans-serif", fontSize: "20px",
                color: "rgba(200,130,255,1)",
                textShadow: "0 0 12px rgba(168,85,247,0.7)", lineHeight: 1,
              }}>
                {s.num}
              </span>
              <span style={{
                fontFamily: "Karasu, sans-serif", fontSize: "8.5px",
                letterSpacing: "0.18em", color: "rgba(168,85,247,0.5)",
              }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <a
          href="https://github.com/MuizKmz"
          target="_blank"
          rel="noopener noreferrer"
          className="gh-link"
          style={{
            fontFamily: "Karasu, sans-serif", fontSize: "9px",
            letterSpacing: "0.18em", color: "rgba(168,85,247,0.45)",
            textDecoration: "none", display:"flex", alignItems:"center", gap: 5,
            transition: "color 0.2s",
          }}
        >
          <SiGit size={10} color="currentColor" />
          github.com/MuizKmz ↗
        </a>
      </div>
    </motion.div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen relative flex flex-col items-center justify-center px-6 py-24"
      style={{ background: "rgba(15, 0, 30, 0.98)" }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.11) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)",
      }}/>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(133,39,227,0.18) 0%, transparent 70%)",
      }}/>

      <div className="relative z-10 w-full max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-3 gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-baseline gap-4">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white"
              style={{
                fontFamily: "Yozakura, sans-serif",
                textShadow: "0 0 40px rgba(168,85,247,0.7), 0 4px 10px rgba(0,0,0,0.5)",
                letterSpacing: "0.04em", lineHeight: 0.95,
              }}>
              SKILLS
            </h2>
            <span className="hidden md:inline" style={{
              fontFamily: "Karasu, sans-serif", fontSize: "10px",
              letterSpacing: "0.22em", color: "rgba(168,85,247,0.6)", paddingBottom: "8px",
            }}>
              _ SKL.003
            </span>
          </div>
          <span style={{
            fontFamily: "Karasu, sans-serif", fontSize: "10px",
            letterSpacing: "0.2em", color: "rgba(168,85,247,0.32)", paddingBottom: "8px",
          }}>
            // SKILL_DATABASE
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div className="w-full h-px mb-12"
          style={{
            background: "linear-gradient(90deg, rgba(168,85,247,0.85), rgba(99,102,241,0.55), transparent)",
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.14 }}
        />

        {/* Stacked layout — skills top, GitHub activity bottom */}
        <div className="flex flex-col gap-24">
          <SkillMatrix />
          <GithubPanel />
        </div>
      </div>

      {/* Hover effects */}
      <style>{`
        .skill-float:hover .skill-glow {
          background: radial-gradient(circle, rgba(168,85,247,0.28) 0%, transparent 70%) !important;
        }
        .skill-float:hover .skill-icon-el { opacity: 1 !important; }
        .skill-float:hover .skill-name    { color: rgba(255,255,255,0.85) !important; }
        .gh-link:hover { color: rgba(168,85,247,0.9) !important; }
      `}</style>
    </section>
  );
}
