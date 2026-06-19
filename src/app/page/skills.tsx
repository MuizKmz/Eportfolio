"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Workflow, Sparkles } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiTypescript, SiJavascript, SiPython, SiDart, SiPhp,
  SiHtml5, SiCss,
  SiReact, SiNextdotjs, SiFlutter, SiTailwindcss, SiFramer,
  SiNodedotjs, SiSpring,
  SiMysql, SiFirebase, SiPostgresql, SiMongodb,
  SiDocker, SiGithubactions, SiGitlab, SiGit, SiJira, SiArduino,
  SiFigma, SiCanva, SiN8N, SiLaravel,
  SiVuedotjs, SiRedis,
} from "react-icons/si";
import { ActivityCalendar, type Activity } from "react-activity-calendar";

type LucideIcon = typeof Code2;
type AnyIcon    = IconType | LucideIcon;
type Skill      = { name: string; icon: AnyIcon; color: string };
type ExpSkill   = { name: string; icon?: AnyIcon };
type ExpCluster = { id: string; label: string; color: string; rgb: string; skills: ExpSkill[] };

// ── Skills flat list ───────────────────────────────────────────────────────
const SKILLS: Skill[] = [
  { name: "TypeScript",  icon: SiTypescript,    color: "#3178C6" },
  { name: "JavaScript",  icon: SiJavascript,    color: "#F7DF1E" },
  { name: "Python",      icon: SiPython,        color: "#3776AB" },
  { name: "Dart",        icon: SiDart,          color: "#0175C2" },
  { name: "PHP",         icon: SiPhp,           color: "#777BB4" },
  { name: "Java",        icon: Code2,           color: "#ED8B00" },
  { name: "HTML",        icon: SiHtml5,         color: "#E34F26" },
  { name: "CSS",         icon: SiCss,           color: "#1572B6" },
  { name: "React",       icon: SiReact,         color: "#61DAFB" },
  { name: "Next.js",     icon: SiNextdotjs,     color: "#e2e2e2" },
  { name: "Flutter",     icon: SiFlutter,       color: "#54C5F8" },
  { name: "Tailwind",    icon: SiTailwindcss,   color: "#06B6D4" },
  { name: "Framer",      icon: SiFramer,        color: "#8B8BF9" },
  { name: "Node.js",     icon: SiNodedotjs,     color: "#68A063" },
  { name: "Spring",      icon: SiSpring,        color: "#6DB33F" },
  { name: "MySQL",       icon: SiMysql,         color: "#4479A1" },
  { name: "Firebase",    icon: SiFirebase,      color: "#FFCA28" },
  { name: "PostgreSQL",  icon: SiPostgresql,    color: "#6B8FD4" },
  { name: "MongoDB",     icon: SiMongodb,       color: "#47A248" },
  { name: "Docker",      icon: SiDocker,        color: "#2496ED" },
  { name: "GH Actions",  icon: SiGithubactions, color: "#6B8FD4" },
  { name: "GitLab",      icon: SiGitlab,        color: "#FC6D26" },
  { name: "Git",         icon: SiGit,           color: "#F05032" },
  { name: "Jira",        icon: SiJira,          color: "#0052CC" },
  { name: "Arduino",     icon: SiArduino,       color: "#00979D" },
  { name: "Figma",       icon: SiFigma,         color: "#F24E1E" },
  { name: "Canva",       icon: SiCanva,         color: "#00C4CC" },
  { name: "n8n",         icon: SiN8N,           color: "#EA4B71" },
  { name: "Automation",  icon: Workflow,         color: "#A855F7" },
  { name: "Laravel",     icon: SiLaravel,       color: "#FF2D20" },
];

// ── Experience clusters (currently-used skills) ────────────────────────────
const EXP_CLUSTERS: ExpCluster[] = [
  {
    id: "frontend",
    label: "FRONTEND SYSTEMS",
    color: "#6B8FD4",
    rgb: "107,143,212",
    skills: [
      { name: "React / Next.js", icon: SiReact },
      { name: "TypeScript",      icon: SiTypescript },
      { name: "Tailwind CSS",    icon: SiTailwindcss },
      { name: "Vue.js",          icon: SiVuedotjs },
      { name: "React Native",    icon: SiReact },
      { name: "Flutter",         icon: SiFlutter },
    ],
  },
  {
    id: "backend",
    label: "BACKEND LOGIC",
    color: "#EA4B71",
    rgb: "234,75,113",
    skills: [
      { name: "Java / Spring Boot", icon: SiSpring },
      { name: "Node.js / NestJS",   icon: SiNodedotjs },
      { name: "Python / FastAPI",   icon: SiPython },
      { name: "MySQL",              icon: SiMysql },
      { name: "Redis",              icon: SiRedis },
      { name: "Docker",             icon: SiDocker },
    ],
  },
  {
    id: "ml",
    label: "MACHINE LEARNING & AI",
    color: "#A855F7",
    rgb: "168,85,247",
    skills: [
      { name: "LLMs / GPT",  icon: Sparkles },
      { name: "RAG / Pinecone" },
      { name: "LangChain" },
      { name: "AI Agents",   icon: Sparkles },
      { name: "n8n",         icon: SiN8N },
      { name: "Vector DB" },
    ],
  },
  {
    id: "design",
    label: "DESIGN & UX",
    color: "#F24E1E",
    rgb: "242,78,30",
    skills: [
      { name: "Figma",        icon: SiFigma },
      { name: "UI/UX" },
      { name: "Mobile-First" },
      { name: "Canva",        icon: SiCanva },
    ],
  },
];

// ── GitHub calendar theme ──────────────────────────────────────────────────
const GH_THEME = {
  dark: [
    "rgba(133,39,227,0.08)",
    "rgba(133,39,227,0.32)",
    "rgba(133,39,227,0.58)",
    "rgba(168,85,247,0.82)",
    "rgba(200,130,255,1)",
  ],
};

const CURRENT_YEAR = new Date().getFullYear();
const YEARS: (number | "last")[] = ["last", CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2];


// ── Panel label ────────────────────────────────────────────────────────────
function PanelLabel({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
      <span style={{
        fontFamily: "Karasu, sans-serif", fontSize: "13px",
        letterSpacing: "0.24em", color: "rgba(168,85,247,0.75)", flexShrink: 0,
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

// ── Skill cluster — pill tags for one quadrant ────────────────────────────
function SkillCluster({ cluster, align }: { cluster: ExpCluster; align: "left" | "right" }) {
  return (
    // Entrance slide
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {/* Float — entire cluster bounces together */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          display: "flex", flexDirection: "column", gap: 8,
          alignItems: align === "left" ? "flex-end" : "flex-start",
        }}
      >
        {/* Pills */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "7px 8px",
          justifyContent: align === "left" ? "flex-end" : "flex-start",
        }}>
          {cluster.skills.map((skill, i) => {
            const Ic = skill.icon as AnyIcon | undefined;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.06 }}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "7px 14px",
                  background: `rgba(${cluster.rgb}, 0.08)`,
                  border: `1px solid rgba(${cluster.rgb}, 0.22)`,
                  borderRadius: 999,
                  cursor: "default",
                  fontFamily: "Karasu, sans-serif",
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.9)",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                className={`exp-pill-${cluster.id}`}
              >
                {Ic && <Ic size={14} color={cluster.color} style={{ flexShrink: 0 }} />}
                {skill.name}
              </motion.div>
            );
          })}
        </div>

        {/* Category label — glow pulse (no box) */}
        <motion.span
          style={{
            fontFamily: "Karasu, sans-serif", fontSize: "10.5px",
            letterSpacing: "0.22em", color: cluster.color,
            opacity: 0.85, marginTop: 4,
          }}
          animate={{
            textShadow: [
              `0 0 6px rgba(${cluster.rgb}, 0.3)`,
              `0 0 18px rgba(${cluster.rgb}, 0.95)`,
              `0 0 6px rgba(${cluster.rgb}, 0.3)`,
            ],
          }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {cluster.label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

// ── Center node — pulsing brain circle ────────────────────────────────────
function CenterNode() {
  return (
    <div style={{
      position: "relative", width: 154, height: 154, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "visible",
    }}>
      {/* Outer pulse ring */}
      <motion.div
        style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "1px solid rgba(168,85,247,0.18)",
        }}
        animate={{ scale: [1, 1.22, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbit track ring — matches the shared orbit radius (82px) */}
      <motion.div
        style={{
          position: "absolute", top: "50%", left: "50%",
          width: 164, height: 164,
          marginTop: -82, marginLeft: -82,
          borderRadius: "50%",
          border: "1px dashed rgba(168,85,247,0.12)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />

      {/* Blue dot — 0° start */}
      <motion.div
        style={{
          position: "absolute", top: "50%", left: "50%",
          width: 164, height: 164,
          marginTop: -82, marginLeft: -82,
        }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      >
        <div style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translate(-50%, -50%)",
          width: 8, height: 8, borderRadius: "50%",
          background: "#6B8FD4",
          boxShadow: "0 0 9px rgba(107,143,212,0.95)",
        }} />
      </motion.div>

      {/* Purple dot — 120° start */}
      <motion.div
        style={{
          position: "absolute", top: "50%", left: "50%",
          width: 164, height: 164,
          marginTop: -82, marginLeft: -82,
        }}
        initial={{ rotate: 120 }}
        animate={{ rotate: 480 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      >
        <div style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translate(-50%, -50%)",
          width: 7, height: 7, borderRadius: "50%",
          background: "rgba(168,85,247,0.95)",
          boxShadow: "0 0 9px rgba(168,85,247,0.85)",
        }} />
      </motion.div>

      {/* Red dot — 240° start */}
      <motion.div
        style={{
          position: "absolute", top: "50%", left: "50%",
          width: 164, height: 164,
          marginTop: -82, marginLeft: -82,
        }}
        initial={{ rotate: 240 }}
        animate={{ rotate: 600 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      >
        <div style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translate(-50%, -50%)",
          width: 8, height: 8, borderRadius: "50%",
          background: "#EA4B71",
          boxShadow: "0 0 9px rgba(234,75,113,0.95)",
        }} />
      </motion.div>

      {/* Main circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        style={{
          width: 122, height: 122, borderRadius: "50%",
          background: "radial-gradient(circle at 38% 38%, rgba(168,85,247,0.28) 0%, rgba(133,39,227,0.07) 70%)",
          border: "1px solid rgba(168,85,247,0.42)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 5, position: "relative", zIndex: 2,
          boxShadow: "0 0 30px rgba(133,39,227,0.2)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/beru.png"
          alt="center"
          style={{
            width: 72, height: 72,
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
        <span style={{
          fontFamily: "Karasu, sans-serif", fontSize: "6.5px",
          color: "rgba(168,85,247,0.6)", letterSpacing: "0.26em",
          marginTop: 2,
        }}>
          DATABASE
        </span>
      </motion.div>
    </div>
  );
}

// ── Experience database section ────────────────────────────────────────────
function ExperienceDatabase() {
  const [frontend, backend, ml, design] = EXP_CLUSTERS;

  return (
    <div>
      <PanelLabel label="// EXPERIENCE_DATABASE" />

      {/* Desktop — 3-column orbital grid */}
      <div className="hidden md:block">
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 160px 1fr",
          gridTemplateRows: "auto auto",
          gap: "52px 28px",
        }}>
          <div style={{ gridColumn: 1, gridRow: 1, display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
            <SkillCluster cluster={frontend} align="left" />
          </div>

          <div style={{
            gridColumn: 2, gridRow: "1 / 3",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <CenterNode />
          </div>

          <div style={{ gridColumn: 3, gridRow: 1, display: "flex", alignItems: "flex-end", justifyContent: "flex-start" }}>
            <SkillCluster cluster={backend} align="right" />
          </div>

          <div style={{ gridColumn: 1, gridRow: 2, display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}>
            <SkillCluster cluster={ml} align="left" />
          </div>

          <div style={{ gridColumn: 3, gridRow: 2, display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}>
            <SkillCluster cluster={design} align="right" />
          </div>
        </div>
      </div>

      {/* Mobile — stacked */}
      <div className="md:hidden flex flex-col gap-10 items-start">
        <SkillCluster cluster={frontend} align="right" />
        <SkillCluster cluster={ml} align="right" />
        <div style={{ alignSelf: "center" }}><CenterNode /></div>
        <SkillCluster cluster={backend} align="right" />
        <SkillCluster cluster={design} align="right" />
      </div>
    </div>
  );
}

// ── Skill Matrix — infinite horizontal marquee ─────────────────────────────
function SkillMatrix() {
  const doubled = [...SKILLS, ...SKILLS];

  return (
    <div>
      <PanelLabel label="// SKILL_MATRIX" />

      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Edge fade masks */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 72, zIndex: 2,
          pointerEvents: "none",
          background: "linear-gradient(90deg, rgba(15,0,30,0.98) 0%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: 72, zIndex: 2,
          pointerEvents: "none",
          background: "linear-gradient(-90deg, rgba(15,0,30,0.98) 0%, transparent 100%)",
        }} />

        <div className="skill-marquee" style={{ display: "flex", gap: 40, width: "max-content", alignItems: "center", paddingBlock: 10 }}>
          {doubled.map((skill, idx) => {
            const Icon = skill.icon as AnyIcon;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.22 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 5,
                  cursor: "default", position: "relative", flexShrink: 0,
                }}
                className="skill-float"
              >
                <div
                  className="skill-glow"
                  style={{
                    position: "absolute", width: 56, height: 56, borderRadius: "50%",
                    background: `radial-gradient(circle, ${skill.color}18 0%, transparent 70%)`,
                    transition: "background 0.25s",
                  }}
                />
                <div style={{
                  width: 48, height: 48,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", zIndex: 1,
                }}>
                  <Icon
                    size={32}
                    color={skill.color}
                    style={{ opacity: 0.75, transition: "opacity 0.2s" }}
                    className="skill-icon-el"
                  />
                </div>
                <span
                  className="skill-name"
                  style={{
                    fontFamily: "Karasu, sans-serif", fontSize: "11px",
                    letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)",
                    textAlign: "center", lineHeight: 1.35,
                    transition: "color 0.2s",
                  }}
                >
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── GitHub activity panel ──────────────────────────────────────────────────
function GithubPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [mounted, setMounted] = useState(false);
  const [year, setYear]       = useState<number | "last">("last");
  // Full multi-year history from the DEFAULT endpoint — this is the only one
  // that includes anonymized private contributions (per-year endpoints don't).
  const [allDays, setAllDays] = useState<Activity[] | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/MuizKmz")
      .then(r => r.json())
      .then((data: { contributions: Activity[] }) => {
        // API returns newest-first; sort ascending for the calendar.
        const sorted = [...data.contributions].sort((a, b) => a.date.localeCompare(b.date));
        setAllDays(sorted);
      })
      .catch(() => {});
  }, []);

  // Slice the selected window out of the full history.
  const calendarData = (() => {
    if (!allDays) return [];
    if (year === "last") {
      const today  = new Date().toISOString().slice(0, 10);
      const cutoff = new Date();
      cutoff.setFullYear(cutoff.getFullYear() - 1);
      const from = cutoff.toISOString().slice(0, 10);
      return allDays.filter(d => d.date >= from && d.date <= today);
    }
    return allDays.filter(d => d.date.startsWith(String(year)));
  })();

  const totalCommits = allDays ? calendarData.reduce((s, d) => s + d.count, 0) : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
    >
      <PanelLabel label="// ACTIVITY_LOG" />

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

        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(168,85,247,0.012) 3px, rgba(168,85,247,0.012) 4px)",
        }}/>

        {/* Total commits — top-right corner */}
        <motion.div
          key={`${year}-${totalCommits}`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute", top: 14, right: 20, zIndex: 3,
            display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1,
          }}
        >
          <span style={{
            fontFamily: "Karasu, sans-serif", fontSize: "9px",
            letterSpacing: "0.24em", color: "rgba(168,85,247,0.5)",
          }}>
            TOTAL COMMITS
          </span>
          <span style={{
            fontFamily: "Yozakura, sans-serif", fontSize: "24px",
            color: "rgba(200,130,255,1)", lineHeight: 1,
            textShadow: "0 0 14px rgba(168,85,247,0.8)",
          }}>
            {totalCommits !== null ? totalCommits.toLocaleString() : "···"}
          </span>
        </motion.div>

        {/* Year selector */}
        <div style={{
          display: "flex", flexDirection: "row", gap: 6,
          marginBottom: 16, position: "relative", zIndex: 1,
        }}>
          {YEARS.map(y => (
            <button
              key={y}
              onClick={() => setYear(y)}
              style={{
                fontFamily: "Karasu, sans-serif", fontSize: "12px",
                letterSpacing: "0.14em", padding: "5px 13px",
                background: y === year ? "rgba(133,39,227,0.35)" : "rgba(133,39,227,0.08)",
                border: `1px solid ${y === year ? "rgba(168,85,247,0.7)" : "rgba(168,85,247,0.18)"}`,
                color: y === year ? "rgba(200,130,255,1)" : "rgba(168,85,247,0.5)",
                cursor: "pointer", transition: "all 0.2s",
                boxShadow: y === year ? "0 0 10px rgba(168,85,247,0.25)" : "none",
              }}
            >
              {y === "last" ? "LAST 12M" : y}
            </button>
          ))}
        </div>

        {/* Calendar — fills full box width, no scroll */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {mounted && allDays ? (
            <ActivityCalendar
              data={calendarData}
              theme={GH_THEME}
              colorScheme="dark"
              blockSize={14}
              blockMargin={4}
              blockRadius={2}
              fontSize={13}
              showTotalCount={false}
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

      {/* Footer */}
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
                fontFamily: "Karasu, sans-serif", fontSize: "10.5px",
                letterSpacing: "0.18em", color: "rgba(168,85,247,0.6)",
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
            fontFamily: "Karasu, sans-serif", fontSize: "11px",
            letterSpacing: "0.18em", color: "rgba(168,85,247,0.55)",
            textDecoration: "none", display:"flex", alignItems:"center", gap: 5,
            transition: "color 0.2s",
          }}
        >
          <SiGit size={12} color="currentColor" />
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
              fontFamily: "Karasu, sans-serif", fontSize: "12px",
              letterSpacing: "0.22em", color: "rgba(168,85,247,0.7)", paddingBottom: "8px",
            }}>
              _ SKL.003
            </span>
          </div>
          <span style={{
            fontFamily: "Karasu, sans-serif", fontSize: "12px",
            letterSpacing: "0.2em", color: "rgba(168,85,247,0.42)", paddingBottom: "8px",
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

        {/* Stacked sections */}
        <div className="flex flex-col gap-24">
          <ExperienceDatabase />
          <SkillMatrix />
          <GithubPanel />
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .skill-marquee { animation: marquee-scroll 36s linear infinite; }
        .skill-marquee:hover { animation-play-state: paused; }

        .skill-float:hover .skill-glow {
          background: radial-gradient(circle, rgba(168,85,247,0.28) 0%, transparent 70%) !important;
        }
        .skill-float:hover .skill-icon-el { opacity: 1 !important; }
        .skill-float:hover .skill-name    { color: rgba(255,255,255,0.85) !important; }
        .gh-link:hover { color: rgba(168,85,247,0.9) !important; }

        .exp-pill-frontend:hover { border-color: rgba(107,143,212,0.55) !important; background: rgba(107,143,212,0.14) !important; }
        .exp-pill-backend:hover  { border-color: rgba(234,75,113,0.55)  !important; background: rgba(234,75,113,0.14)  !important; }
        .exp-pill-ml:hover       { border-color: rgba(168,85,247,0.55)  !important; background: rgba(168,85,247,0.14)  !important; }
        .exp-pill-design:hover   { border-color: rgba(242,78,30,0.55)   !important; background: rgba(242,78,30,0.14)   !important; }
      `}</style>
    </section>
  );
}
