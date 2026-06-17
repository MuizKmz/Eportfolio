"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Recycle, GraduationCap, Activity, ChevronRight, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─────────── Types ───────────
interface Phase {
  num: string;
  title: string;
  subtitle: string;
  body: string;
  tech: string[];
}
interface Project {
  id: string;
  codename: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  link: string;
  image?: string;
  Icon: LucideIcon;
  phases: Phase[];
}

// ─────────── Data ───────────
const PROJECTS: Project[] = [
  {
    id: "WMA · 001",
    codename: "WASTE",
    title: "Waste Management App",
    tagline: "Eco-Hunter Mobile Application",
    description:
      "Final Year Project — a mobile application that educates and incentivises users to adopt sustainable waste management practices. Built end-to-end as the capstone of my Software Engineering degree at UTM.",
    tags: ["Flutter", "Dart", "Firebase", "Android Studio"],
    link: "#",
    Icon: Recycle,
    phases: [
      {
        num: "01",
        title: "The Vision",
        subtitle: "From problem to product",
        body: "Identified an opportunity in sustainable behaviour change — most users know recycling matters but lack daily reinforcement. Designed a mobile experience that turns waste sorting into a gamified, incentive-driven habit.",
        tech: ["Figma", "Enterprise Architecture", "UI/UX"],
      },
      {
        num: "02",
        title: "The Build",
        subtitle: "Flutter + Firebase architecture",
        body: "Engineered the full stack using Flutter and Dart for cross-platform delivery, backed by Firebase for real-time data, authentication, and cloud storage.",
        tech: ["Flutter", "Dart", "Firebase", "Android Studio"],
      },
      {
        num: "03",
        title: "The Workflow",
        subtitle: "Agile sprints + version control",
        body: "Managed the project lifecycle using Jira for sprint planning and GitHub for code review. Maintained a clean commit history and feature-branch workflow throughout.",
        tech: ["Jira", "GitHub", "Agile"],
      },
    ],
  },
  {
    id: "LMS · 002",
    codename: "STUDPRO",
    title: "STUDPRO LMS",
    tagline: "Learning Management System for UTM",
    description:
      "Contributed to UTM's Learning Management System — focusing on code quality, DevOps automation, and team collaboration practices. Significantly improved maintainability and deployment velocity.",
    tags: ["GitLab CI/CD", "SonarQube", "Java"],
    link: "#",
    Icon: GraduationCap,
    phases: [
      {
        num: "01",
        title: "The Cleanup",
        subtitle: "SonarQube-driven refactor",
        body: "Ran continuous static analysis through SonarQube to surface code smells, complexity hotspots, and security issues. Refactored critical paths to improve maintainability.",
        tech: ["SonarQube", "Java"],
      },
      {
        num: "02",
        title: "The Pipeline",
        subtitle: "GitLab CI/CD automation",
        body: "Designed and implemented GitLab CI/CD pipelines automating the entire test → build → deploy cycle. Replaced manual deployments with reproducible runners.",
        tech: ["GitLab CI/CD", "Docker"],
      },
      {
        num: "03",
        title: "The Process",
        subtitle: "Version control + collaboration",
        body: "Managed collaborative development via GitLab — established branch protection, merge request workflows, and code review conventions across the team.",
        tech: ["GitLab", "Code Review"],
      },
    ],
  },
  {
    id: "SHR · 003",
    codename: "HEALTH",
    title: "Smart Healthcare Remote",
    tagline: "IoT-driven patient monitoring",
    description:
      "Web-based application that analyses real-time patient health data via an Arduino-powered IoT monitoring system. Bridges hardware sensors and a cloud dashboard so caregivers can act on live vitals.",
    tags: ["HTML/CSS", "JavaScript", "Spring", "Firebase", "Arduino"],
    link: "#",
    Icon: Activity,
    phases: [
      {
        num: "01",
        title: "The Hardware",
        subtitle: "Arduino sensor pipeline",
        body: "Assembled an IoT-based remote patient monitoring rig using Arduino — capturing vital signs and streaming them over Wi-Fi to the cloud. Calibrated sensors for accuracy.",
        tech: ["Arduino", "IoT", "C++"],
      },
      {
        num: "02",
        title: "The Backend",
        subtitle: "Spring + Firebase data layer",
        body: "Implemented a Spring Framework backend that ingests sensor telemetry, normalises it, and persists into a Firebase real-time database for fast time-series queries.",
        tech: ["Spring Framework", "Firebase", "Java"],
      },
      {
        num: "03",
        title: "The Dashboard",
        subtitle: "Live web visualisation",
        body: "Built a responsive web dashboard in HTML/CSS/JavaScript that surfaces real-time patient vitals with alert thresholds so caregivers are notified instantly.",
        tech: ["HTML/CSS", "JavaScript", "Firebase"],
      },
    ],
  },
];

// ─────────── HUD corner brackets ───────────
function HUDCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const isT = pos[0] === "t", isL = pos[1] === "l";
  return (
    <div style={{
      position: "absolute",
      [isT ? "top" : "bottom"]: 0, [isL ? "left" : "right"]: 0,
      width: 16, height: 16,
      borderTop:    isT  ? "1px solid rgba(168,85,247,0.6)" : undefined,
      borderBottom: !isT ? "1px solid rgba(168,85,247,0.6)" : undefined,
      borderLeft:   isL  ? "1px solid rgba(168,85,247,0.6)" : undefined,
      borderRight:  !isL ? "1px solid rgba(168,85,247,0.6)" : undefined,
      pointerEvents: "none",
    }} />
  );
}

// ─────────── Sidebar project item ───────────
function SidebarItem({
  project, index, active, onClick,
}: {
  project: Project; index: number; active: boolean; onClick: () => void;
}) {
  const Icon = project.Icon;
  return (
    <button
      onClick={onClick}
      className="sidebar-item w-full text-left"
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 20px",
        background: active ? "rgba(133,39,227,0.18)" : "transparent",
        borderLeft: active ? "2px solid rgba(168,85,247,1)" : "2px solid transparent",
        borderBottom: "1px solid rgba(168,85,247,0.08)",
        cursor: "pointer", transition: "all 0.22s",
        position: "relative",
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily: "Yozakura, sans-serif",
        fontSize: "11px", letterSpacing: "0.12em",
        color: active ? "rgba(168,85,247,1)" : "rgba(168,85,247,0.3)",
        flexShrink: 0, transition: "color 0.22s", minWidth: 20,
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon */}
      <div style={{
        width: 32, height: 32, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: active ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.07)",
        border: `1px solid ${active ? "rgba(168,85,247,0.6)" : "rgba(168,85,247,0.15)"}`,
        transition: "all 0.22s",
      }}>
        <Icon size={14} strokeWidth={1.6}
          color={active ? "rgba(200,130,255,1)" : "rgba(168,85,247,0.5)"}
          style={{ transition: "color 0.22s" }}
        />
      </div>

      {/* Labels */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "Yozakura, sans-serif",
          fontSize: "15px", letterSpacing: "0.06em",
          color: active ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.55)",
          lineHeight: 1.1, transition: "color 0.22s",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {project.codename}
        </div>
        <div style={{
          fontFamily: "Karasu, sans-serif",
          fontSize: "8.5px", letterSpacing: "0.14em",
          color: active ? "rgba(168,85,247,0.8)" : "rgba(255,255,255,0.25)",
          marginTop: 3, transition: "color 0.22s",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {project.title}
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight size={13} strokeWidth={1.5}
        color={active ? "rgba(168,85,247,0.9)" : "rgba(255,255,255,0.15)"}
        style={{ flexShrink: 0, transition: "color 0.22s" }}
      />

      {/* Active glow */}
      {active && (
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 2,
          background: "rgba(168,85,247,1)",
          boxShadow: "0 0 12px rgba(168,85,247,0.9)",
          pointerEvents: "none",
        }} />
      )}
    </button>
  );
}

// ─────────── Project image frame ───────────
function ProjectImage({ project }: { project: Project }) {
  const Icon = project.Icon;
  return (
    <div style={{
      position: "relative",
      aspectRatio: "16 / 10",
      background: project.image
        ? "transparent"
        : "linear-gradient(135deg, rgba(60,15,120,0.9) 0%, rgba(20,5,50,0.95) 100%)",
      border: "1px solid rgba(168,85,247,0.25)",
      overflow: "hidden",
    }}>
      {/* HUD corners */}
      {(["tl","tr","bl","br"] as const).map(c => <HUDCorner key={c} pos={c} />)}

      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.8), transparent)",
        boxShadow: "0 0 8px rgba(168,85,247,0.6)",
      }} />

      {/* HUD labels */}
      <div style={{
        position: "absolute", top: 10, left: 14,
        fontFamily: "Karasu, sans-serif", fontSize: "8px",
        letterSpacing: "0.22em", color: "rgba(168,85,247,0.55)",
      }}>
        SYS.PREVIEW
      </div>
      <div style={{
        position: "absolute", top: 10, right: 14,
        fontFamily: "Karasu, sans-serif", fontSize: "8px",
        letterSpacing: "0.2em", color: "rgba(168,85,247,0.4)",
      }}>
        {project.id.split(" ")[0]}
      </div>

      {project.image ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={project.image}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        /* Placeholder */
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 14,
        }}>
          {/* Radial glow */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(133,39,227,0.22) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          {/* Grid lines */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.2,
            backgroundImage: "linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />

          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 56, height: 56,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(168,85,247,0.4)",
              background: "rgba(133,39,227,0.15)",
            }}>
              <Icon size={26} strokeWidth={1.4} color="rgba(168,85,247,0.7)" />
            </div>
            <span style={{
              fontFamily: "Karasu, sans-serif", fontSize: "8px",
              letterSpacing: "0.28em", color: "rgba(168,85,247,0.35)",
            }}>
              PROJECT.SNAPSHOT
            </span>
          </div>
        </div>
      )}

      {/* Scan line overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
      }} />

      {/* Bottom label */}
      <div style={{
        position: "absolute", bottom: 10, left: 14, right: 14,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ height: 1, flex: 1, background: "rgba(168,85,247,0.25)" }} />
        <span style={{
          fontFamily: "Karasu, sans-serif", fontSize: "7.5px",
          letterSpacing: "0.22em", color: "rgba(168,85,247,0.35)",
          padding: "0 10px", flexShrink: 0,
        }}>
          {project.image ? "PREVIEW" : "AWAITING.ASSET"}
        </span>
        <div style={{ height: 1, flex: 1, background: "rgba(168,85,247,0.25)" }} />
      </div>
    </div>
  );
}

// ─────────── Phase card ───────────
function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      style={{
        position: "relative",
        padding: "20px 20px 18px",
        background: "rgba(133,39,227,0.06)",
        border: "1px solid rgba(168,85,247,0.15)",
      }}
    >
      {/* HUD corners */}
      {(["tl","tr","bl","br"] as const).map(c => <HUDCorner key={c} pos={c} />)}

      {/* Number + divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{
          fontFamily: "Yozakura, sans-serif", fontSize: "13px",
          color: "rgba(168,85,247,0.9)", letterSpacing: "0.06em", flexShrink: 0,
        }}>
          {phase.num}
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(168,85,247,0.2)" }} />
      </div>

      {/* Title */}
      <div style={{
        fontFamily: "Yozakura, sans-serif",
        fontSize: "17px", color: "rgba(255,255,255,0.95)",
        marginBottom: 4, letterSpacing: "0.03em",
      }}>
        {phase.title}
      </div>

      {/* Subtitle */}
      <div style={{
        fontFamily: "Karasu, sans-serif",
        fontSize: "9px", letterSpacing: "0.16em",
        color: "rgba(168,85,247,0.7)", marginBottom: 12,
      }}>
        {phase.subtitle}
      </div>

      {/* Body — 3 line clamp */}
      <p style={{
        fontFamily: "Showcase Sans mini, sans-serif",
        fontSize: "13px", lineHeight: 1.75,
        color: "rgba(255,255,255,0.55)",
        marginBottom: 14,
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        {phase.body}
      </p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {phase.tech.map(t => (
          <span key={t} style={{
            fontFamily: "Karasu, sans-serif", fontSize: "8px",
            letterSpacing: "0.12em",
            padding: "3px 8px",
            background: "rgba(88,28,135,0.35)",
            border: "1px solid rgba(168,85,247,0.28)",
            color: "rgba(200,130,255,0.85)",
          }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────── Main ───────────
export default function Project() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const active = PROJECTS[activeIdx];

  useGSAP(() => {
    gsap.from(".proj-reveal", {
      y: 24, opacity: 0, duration: 0.65, stagger: 0.07, ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 72%",
        toggleActions: "play none none none",
        once: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      id="project"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "rgba(15,0,30,0.98)" }}
    >
      {/* Dot grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.09) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-24">

        {/* ── Section header ── */}
        <motion.div
          className="proj-reveal flex items-end justify-between mb-3 gap-4 flex-wrap"
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
              PROJECTS
            </h2>
            <span className="hidden md:inline" style={{
              fontFamily: "Karasu, sans-serif", fontSize: "10px",
              letterSpacing: "0.22em", color: "rgba(168,85,247,0.6)", paddingBottom: "8px",
            }}>
              _ ARCHIVE.004
            </span>
          </div>
          <span style={{
            fontFamily: "Karasu, sans-serif", fontSize: "10px",
            letterSpacing: "0.2em", color: "rgba(168,85,247,0.32)", paddingBottom: "8px",
          }}>
            // PROJECT_LOG
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div className="w-full h-px mb-10"
          style={{
            background: "linear-gradient(90deg, rgba(168,85,247,0.85), rgba(99,102,241,0.55), transparent)",
            transformOrigin: "left",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.14 }}
        />

        {/* ── Main two-panel ── */}
        <div className="proj-reveal grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-0"
          style={{ border: "1px solid rgba(168,85,247,0.14)" }}>

          {/* Left sidebar — character select list */}
          <div style={{
            borderRight: "1px solid rgba(168,85,247,0.14)",
            borderBottom: "1px solid rgba(168,85,247,0.14)",
          }}
            className="lg:border-b-0"
          >
            {/* Sidebar header */}
            <div style={{
              padding: "12px 20px",
              borderBottom: "1px solid rgba(168,85,247,0.12)",
              display: "flex", alignItems: "center", gap: 8,
              background: "rgba(133,39,227,0.07)",
            }}>
              <div style={{ width: 6, height: 6, background: "rgba(168,85,247,0.8)", transform: "rotate(45deg)" }} />
              <span style={{
                fontFamily: "Karasu, sans-serif", fontSize: "8.5px",
                letterSpacing: "0.24em", color: "rgba(168,85,247,0.6)",
              }}>
                SELECT PROJECT
              </span>
              <span style={{
                marginLeft: "auto",
                fontFamily: "Karasu, sans-serif", fontSize: "8px",
                letterSpacing: "0.1em", color: "rgba(168,85,247,0.3)",
              }}>
                {String(PROJECTS.length).padStart(2,"0")} FILES
              </span>
            </div>

            {PROJECTS.map((p, i) => (
              <SidebarItem
                key={p.id}
                project={p}
                index={i}
                active={i === activeIdx}
                onClick={() => setActiveIdx(i)}
              />
            ))}
          </div>

          {/* Right showcase */}
          <div style={{ position: "relative", overflow: "hidden", padding: "28px 28px 24px" }}>

            {/* Big BG codename */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.codename}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  bottom: "-8%", right: "-4%",
                  fontFamily: "Yozakura, sans-serif",
                  fontSize: "clamp(90px, 16vw, 220px)",
                  lineHeight: 0.85, letterSpacing: "-0.03em",
                  color: "rgba(133,39,227,0.12)",
                  pointerEvents: "none", userSelect: "none",
                  zIndex: 0,
                }}
              >
                {active.codename}
              </motion.div>
            </AnimatePresence>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_280px] gap-8 items-start">

              {/* Left: project info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${activeIdx}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* Project ID tag */}
                  <span style={{
                    display: "inline-block", marginBottom: 14,
                    fontFamily: "Karasu, sans-serif", fontSize: "9px",
                    letterSpacing: "0.24em", color: "rgba(168,85,247,0.9)",
                    padding: "4px 12px",
                    border: "1px solid rgba(168,85,247,0.45)",
                    background: "rgba(133,39,227,0.18)",
                  }}>
                    {active.id}
                  </span>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "Yozakura, sans-serif",
                    fontSize: "clamp(26px, 4vw, 38px)",
                    color: "rgba(255,255,255,0.98)",
                    textShadow: "0 0 22px rgba(168,85,247,0.45)",
                    lineHeight: 1.05, letterSpacing: "0.02em",
                    marginBottom: 8,
                  }}>
                    {active.title}
                  </h3>

                  {/* Tagline */}
                  <p style={{
                    fontFamily: "Karasu, sans-serif", fontSize: "10px",
                    letterSpacing: "0.2em", color: "rgba(168,85,247,0.75)",
                    marginBottom: 16,
                  }}>
                    {active.tagline}
                  </p>

                  {/* Description */}
                  <p style={{
                    fontFamily: "Showcase Sans mini, sans-serif",
                    fontSize: "14.5px", lineHeight: 1.85,
                    color: "rgba(255,255,255,0.7)", marginBottom: 20,
                    maxWidth: 460,
                  }}>
                    {active.description}
                  </p>

                  {/* Tech tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: 24 }}>
                    {active.tags.map(t => (
                      <span key={t} className="skill-pill" style={{
                        fontFamily: "Showcase Sans mini, sans-serif",
                        fontSize: "12px", padding: "4px 11px",
                        borderRadius: 999,
                        background: "rgba(88,28,135,0.35)",
                        border: "1px solid rgba(168,85,247,0.28)",
                        color: "rgba(255,255,255,0.85)",
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hud-btn"
                    style={{ fontFamily: "Karasu, sans-serif", fontSize: "10px", letterSpacing: "0.22em" }}
                  >
                    <ExternalLink size={13} strokeWidth={1.6} />
                    VIEW PROJECT
                  </a>
                </motion.div>
              </AnimatePresence>

              {/* Right: image frame */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`img-${activeIdx}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <ProjectImage project={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Phase strip ── */}
        <div className="proj-reveal mt-8">
          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 16,
          }}>
            <span style={{
              fontFamily: "Karasu, sans-serif", fontSize: "9.5px",
              letterSpacing: "0.24em", color: "rgba(168,85,247,0.7)", flexShrink: 0,
            }}>
              _ PHASES
            </span>
            <div style={{
              flex: 1, height: 1,
              background: "linear-gradient(90deg, rgba(168,85,247,0.35), transparent)",
            }} />
            <span style={{
              fontFamily: "Karasu, sans-serif", fontSize: "9px",
              letterSpacing: "0.18em", color: "rgba(168,85,247,0.3)",
            }}>
              {active.phases.length} STAGES
            </span>
          </div>

          <AnimatePresence mode="wait">
            <div
              key={`phases-${activeIdx}`}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              {active.phases.map((ph, i) => (
                <PhaseCard key={ph.num} phase={ph} index={i} />
              ))}
            </div>
          </AnimatePresence>
        </div>

      </div>

      {/* Sidebar hover style */}
      <style>{`
        .sidebar-item:hover {
          background: rgba(133,39,227,0.1) !important;
          border-left-color: rgba(168,85,247,0.5) !important;
        }
      `}</style>
    </section>
  );
}
