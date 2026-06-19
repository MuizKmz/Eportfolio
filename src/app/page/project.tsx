"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Recycle, GraduationCap, Activity, ChevronRight, ChevronLeft, ExternalLink, Server, Shield, Package, Bot } from "lucide-react";
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
  {
    id: "IOT · 004",
    codename: "POLESYNC",
    title: "PoleSyncTech Smart Pole",
    tagline: "Smart-city multi-sensor IoT platform",
    description:
      "A smart-city platform turning street poles into multi-sensor IoT nodes with real-time environmental monitoring (weather, air quality, water, energy), public Wi-Fi management, camera feeds, and three distinct role-based platforms — resident QR web, authority dashboard, and maintenance mobile app.",
    tags: ["TypeScript", "Node.js", "MQTT", "Socket.IO", "MySQL", "React 19", "React Native", "Expo"],
    link: "#",
    Icon: Server,
    phases: [
      {
        num: "01",
        title: "IoT Data Pipeline",
        subtitle: "MQTT → Node.js → MySQL → Socket.IO",
        body: "Built the real-time telemetry backbone: Express 5 MQTT client subscribing to a devices/+/data wildcard topic, processing layer with scheduled offline-device detection, MySQL persistence, and Socket.IO real-time push to both the React web dashboard and React Native mobile app simultaneously.",
        tech: ["MQTT", "Express 5", "TypeScript", "MySQL", "Socket.IO"],
      },
      {
        num: "02",
        title: "Multi-Sensor Fusion",
        subtitle: "Weather · Air Quality · Water · Energy · Wi-Fi",
        body: "Implemented simultaneous monitoring of six domains per pole: weather (temperature, humidity, wind, precipitation), air quality (PM2.5, PM10, SO2, NO2, O3, CO + AQI), water quality (dissolved oxygen, BOD, COD, pH, WQI), solar/battery energy, public Wi-Fi session metering, and GPS-tagged camera feeds.",
        tech: ["IoT", "MySQL", "Node.js", "Sensor Fusion"],
      },
      {
        num: "03",
        title: "Three-Tier UX",
        subtitle: "QR public · Authority dashboard · Maintenance app",
        body: "Designed three distinct user experiences: a no-login QR-code web flow for residents (live weather, AQI, Wi-Fi connect), an authenticated React 19 + Vite dashboard for authorities (fleet monitoring, LED control, announcements), and a React Native + Expo mobile app for maintenance crews with push alerts and photo attachments.",
        tech: ["React 19", "Vite", "Tailwind CSS", "React Native", "Expo", "Laravel"],
      },
    ],
  },
  {
    id: "INS · 005",
    codename: "HAPPISAFE",
    title: "HappiSafe Insurtech Platform",
    tagline: "Multi-underwriter insurance & loyalty ecosystem",
    description:
      "A Malaysian insurtech platform (HappiSafe Ai Sdn Bhd) built over 6+ months with 400+ backend commits — two live insurer integrations, two payment gateways with RSA card tokenization, a loyalty coin engine, and a production AI chatbot with a two-agent verification pattern.",
    tags: ["Java", "Spring Boot", "MySQL", "Redis", "Vue 3", "uni-app", "OpenAI GPT-4o-mini"],
    link: "#",
    Icon: Shield,
    phases: [
      {
        num: "01",
        title: "Dual Insurer Integration",
        subtitle: "Chubb REST/JWT + Pacific SOAP/mTLS",
        body: "Implemented two live third-party insurer integrations: Chubb (REST, JWT + Azure API Management key) for travel insurance and Pacific/Rexit (SOAP + XML, mutual TLS, e-Cover Motor API v1.7) for motor insurance — each with its own quote → bind → pay → finalize state machine and a strategy-pattern dispatch layer.",
        tech: ["Java", "Spring Boot", "REST API", "SOAP", "mTLS", "JWT"],
      },
      {
        num: "02",
        title: "Payment Security Layer",
        subtitle: "RSA tokenization · Razer Pay · PayDollar",
        body: "Engineered payment security across two gateways: RSA asymmetric tokenization for card data, hex-hashed cover-note payment references, signature-verified async webhooks, and Redis-backed duplicate-submission locks. Rebuilt the entire Jenkins CI/CD pipeline from scratch after the previous vendor team and nine custom JARs disappeared.",
        tech: ["Razer Pay", "PayDollar", "RSA", "Redis", "Jenkins", "AWS EC2"],
      },
      {
        num: "03",
        title: "AI Chatbot — Creamy",
        subtitle: "Two-agent GPT-4o-mini with RAG knowledge base",
        body: "Built the production AI chatbot using a primary responder + independent validator two-agent pattern powered by OpenAI GPT-4o-mini, backed by a hybrid knowledge base (database table + live Google Sheet with 5-minute Redis cache), per-session conversation memory, and a prior n8n/LangChain/Gemini prototype as proof-of-concept.",
        tech: ["OpenAI GPT-4o-mini", "Java", "Redis", "Google Sheets API", "n8n"],
      },
    ],
  },
  {
    id: "WMS · 006",
    codename: "WAREHOUSE",
    title: "WMS — Warehouse Management",
    tagline: "EPC/RFID item-level full-stack inventory system",
    description:
      "A full-stack warehouse management system built around EPC/RFID item-level tracking across the full lifecycle — PO receiving to shipping and returns — with a NestJS backend, Vue 3 admin portal, and a React Native handheld app with hand-written native Android RFID/barcode modules.",
    tags: ["NestJS", "Prisma ORM", "MySQL", "Vue 3", "React Native", "Java", "Kotlin", "Docker"],
    link: "#",
    Icon: Package,
    phases: [
      {
        num: "01",
        title: "EPC State Machine",
        subtitle: "Item-level lifecycle with FIFO allocation",
        body: "Designed a per-unit EPC lifecycle (GENERATED → INBOUND → ALLOCATED → OUTBOUND → QUARANTINE → RETURNED/DISPOSED) with FIFO allocation prioritising never-returned, good-quality stock, dual return flows (customer and supplier), and quality grading (GOOD/DEFECTIVE/DAMAGED/UNKNOWN) across a 25-model Prisma schema.",
        tech: ["NestJS", "Prisma ORM", "MySQL", "TypeScript", "JWT", "RBAC"],
      },
      {
        num: "02",
        title: "Native RFID Bridge",
        subtitle: "Custom Java/Kotlin Android modules in React Native",
        body: "Hand-wrote BarcodeModule, RFIDModule, and ScanKeyHelper as native Android modules in Java/Kotlin bridging RFID readers and barcode scanners into React Native via NativeModules/DeviceEventEmitter — supporting bulk UHF RFID tag scanning, barcode trigger scanning, and hardware physical-button events on rugged industrial handhelds.",
        tech: ["React Native", "Java", "Kotlin", "NativeModules", "UHF RFID"],
      },
      {
        num: "03",
        title: "Three-Tier Monorepo",
        subtitle: "Backend · Vue admin portal · Mobile handheld app",
        body: "Delivered a dockerized monorepo: NestJS/Prisma REST API (JWT auth, 5-tier RBAC, Swagger docs), a Vue 3 + Tailwind admin portal with ApexCharts dashboards and Excel/PDF export, and a React Native handheld app with stock-in, stock-out, returns, cycle-counting, and order-picking — with a structured QA issue tracker covering 10 modules.",
        tech: ["NestJS", "Vue 3", "Tailwind CSS", "Docker Compose", "jsPDF", "SheetJS"],
      },
    ],
  },
  {
    id: "AI · 007",
    codename: "SMARTBOT",
    title: "SmartPole AI Chatbot",
    tagline: "RAG + text-to-SQL agent built on n8n",
    description:
      "A production AI chatbot combining Pinecone RAG over an auto-ingested knowledge base with a schema-locked natural-language-to-SQL agent — built entirely in n8n with LangChain nodes, multi-stage LLM pipeline (generation → validation → execution → summarization), and 50-turn conversational memory.",
    tags: ["n8n", "OpenAI GPT-4.1-mini", "Pinecone", "LangChain", "MySQL", "RAG"],
    link: "#",
    Icon: Bot,
    phases: [
      {
        num: "01",
        title: "Auto-Ingestion Pipeline",
        subtitle: "Google Drive → chunk → embed → Pinecone",
        body: "Built an automated RAG ingestion pipeline: Google Drive polling every minute for new files, recursive character text splitting (chunk 500, overlap 20), OpenAI Embeddings generation, and upsert into a Pinecone 'Smart Pole' namespace — the knowledge base stays current without manual re-indexing.",
        tech: ["n8n", "OpenAI Embeddings", "Pinecone", "LangChain", "Google Drive API"],
      },
      {
        num: "02",
        title: "Text-to-SQL Agent",
        subtitle: "Generate → validate → execute → summarize",
        body: "Designed a four-stage SQL pipeline: GPT-4.1-mini generates SELECT-only queries from natural language against the full sensor schema (12 tables), a second GPT chain corrects/optimises the SQL (JOINs, ORDER BY DESC LIMIT), an IF-node conditionally executes against MySQL, and a final chain summarises raw rows into 2–3 readable sentences.",
        tech: ["GPT-4.1-mini", "LangChain", "MySQL", "n8n", "Prompt Engineering"],
      },
      {
        num: "03",
        title: "Defense-in-Depth Design",
        subtitle: "Read-only · schema-locked · 50-turn memory",
        body: "Enforced strict security boundaries: SELECT-only SQL with no DML, default LIMIT 10, schema-locked prompt preventing off-schema queries, clarifying questions for ambiguous requests, and a Pinecone RAG retrieval tool as a parallel knowledge path — plus 50-message Simple Memory for conversation continuity.",
        tech: ["Pinecone", "RAG", "Prompt Engineering", "n8n", "OpenAI"],
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
          fontSize: "17px", letterSpacing: "0.06em",
          color: active ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.55)",
          lineHeight: 1.1, transition: "color 0.22s",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {project.codename}
        </div>
        <div style={{
          fontFamily: "Karasu, sans-serif",
          fontSize: "10.5px", letterSpacing: "0.12em",
          color: active ? "rgba(168,85,247,0.85)" : "rgba(255,255,255,0.32)",
          marginTop: 4, transition: "color 0.22s",
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
        fontFamily: "Karasu, sans-serif", fontSize: "9.5px",
        letterSpacing: "0.22em", color: "rgba(168,85,247,0.6)",
      }}>
        SYS.PREVIEW
      </div>
      <div style={{
        position: "absolute", top: 10, right: 14,
        fontFamily: "Karasu, sans-serif", fontSize: "9.5px",
        letterSpacing: "0.2em", color: "rgba(168,85,247,0.45)",
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
        fontSize: "11px", letterSpacing: "0.14em",
        color: "rgba(168,85,247,0.8)", marginBottom: 12,
      }}>
        {phase.subtitle}
      </div>

      {/* Body — 3 line clamp */}
      <p style={{
        fontFamily: "Showcase Sans mini, sans-serif",
        fontSize: "14px", lineHeight: 1.8,
        color: "rgba(255,255,255,0.62)",
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
            fontFamily: "Karasu, sans-serif", fontSize: "10px",
            letterSpacing: "0.1em",
            padding: "4px 9px",
            background: "rgba(88,28,135,0.35)",
            border: "1px solid rgba(168,85,247,0.28)",
            color: "rgba(200,130,255,0.9)",
          }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────── Pagination / filter helpers ───────────
const ITEMS_PER_PAGE = 4;
type FilterType = "ALL" | "ACADEMIC" | "PROFESSIONAL";

const ACADEMIC_PREFIXES = ["WMA", "LMS", "SHR"];
function getCategory(id: string): "ACADEMIC" | "PROFESSIONAL" {
  return ACADEMIC_PREFIXES.includes(id.split(" ")[0]) ? "ACADEMIC" : "PROFESSIONAL";
}

// ─────────── Main ───────────
export default function Project() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headerRef    = useRef<HTMLHeadingElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const sidebarRef   = useRef<HTMLDivElement>(null);
  const showcaseRef  = useRef<HTMLDivElement>(null);
  const phaseRef     = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [page, setPage]     = useState(0);
  const [filter, setFilter] = useState<FilterType>("ALL");

  const filtered        = filter === "ALL" ? PROJECTS : PROJECTS.filter(p => getCategory(p.id) === filter);
  const totalPages      = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const visibleProjects = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const active          = PROJECTS[activeIdx];

  const handleFilter = (f: FilterType) => {
    setFilter(f);
    setPage(0);
    const first = f === "ALL" ? PROJECTS[0] : PROJECTS.find(p => getCategory(p.id) === f);
    setActiveIdx(first ? PROJECTS.indexOf(first) : 0);
  };

  const goToPage = (newPage: number) => {
    setPage(newPage);
    setActiveIdx(PROJECTS.indexOf(filtered[newPage * ITEMS_PER_PAGE]));
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(".proj-tag",       { y: 20, opacity: 0, duration: 0.5,  stagger: 0.08, ease: "power2.out" })
      .from(headerRef.current, { y: 55, opacity: 0, duration: 0.85, ease: "power3.out" }, "-=0.35")
      .from(lineRef.current,   { scaleX: 0, transformOrigin: "left", duration: 0.95, ease: "power2.out" }, "-=0.55")
      .from(sidebarRef.current,  { x: -44, opacity: 0, duration: 0.85, ease: "power3.out" }, "-=0.55")
      .from(showcaseRef.current, { x:  34, opacity: 0, duration: 0.85, ease: "power3.out" }, "-=0.78")
      .from(phaseRef.current,  { y: 30, opacity: 0, duration: 0.7,  ease: "power2.out" }, "-=0.38");
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
        <div className="flex items-end justify-between mb-3 gap-4 flex-wrap">
          <div className="flex items-baseline gap-4">
            <h2 ref={headerRef} className="text-5xl md:text-7xl lg:text-8xl font-bold text-white"
              style={{
                fontFamily: "Yozakura, sans-serif",
                textShadow: "0 0 40px rgba(168,85,247,0.7), 0 4px 10px rgba(0,0,0,0.5)",
                letterSpacing: "0.04em", lineHeight: 0.95,
              }}>
              PROJECTS
            </h2>
            <span className="proj-tag hidden md:inline" style={{
              fontFamily: "Karasu, sans-serif", fontSize: "12px",
              letterSpacing: "0.22em", color: "rgba(168,85,247,0.7)", paddingBottom: "8px",
            }}>
              _ ARCHIVE.004
            </span>
          </div>
          <span className="proj-tag" style={{
            fontFamily: "Karasu, sans-serif", fontSize: "12px",
            letterSpacing: "0.2em", color: "rgba(168,85,247,0.42)", paddingBottom: "8px",
          }}>
            // PROJECT_LOG
          </span>
        </div>

        {/* Divider */}
        <div ref={lineRef} className="w-full h-px mb-10"
          style={{
            background: "linear-gradient(90deg, rgba(168,85,247,0.85), rgba(99,102,241,0.55), transparent)",
            boxShadow: "0 0 10px rgba(168,85,247,0.35)",
          }}
        />

        {/* ── Main two-panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-0"
          style={{ border: "1px solid rgba(168,85,247,0.14)" }}>

          {/* Left sidebar */}
          <div ref={sidebarRef} style={{
            borderRight: "1px solid rgba(168,85,247,0.14)",
            borderBottom: "1px solid rgba(168,85,247,0.14)",
            display: "flex", flexDirection: "column",
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
                fontFamily: "Karasu, sans-serif", fontSize: "10.5px",
                letterSpacing: "0.24em", color: "rgba(168,85,247,0.7)",
              }}>
                SELECT PROJECT
              </span>
              <span style={{
                marginLeft: "auto",
                fontFamily: "Karasu, sans-serif", fontSize: "10px",
                letterSpacing: "0.1em", color: "rgba(168,85,247,0.4)",
              }}>
                {String(filtered.length).padStart(2, "0")} FILES
              </span>
            </div>

            {/* Category filter tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid rgba(168,85,247,0.12)" }}>
              {(["ALL", "ACADEMIC", "PROFESSIONAL"] as FilterType[]).map(f => (
                <button
                  key={f}
                  onClick={() => handleFilter(f)}
                  style={{
                    flex: 1, padding: "9px 2px",
                    fontFamily: "Karasu, sans-serif",
                    fontSize: "9.5px", letterSpacing: "0.08em",
                    color: filter === f ? "rgba(168,85,247,0.95)" : "rgba(255,255,255,0.28)",
                    background: filter === f ? "rgba(133,39,227,0.18)" : "transparent",
                    borderTop: "none", borderLeft: "none", borderRight: "none",
                    borderBottom: filter === f ? "2px solid rgba(168,85,247,0.8)" : "2px solid transparent",
                    marginBottom: -1,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Paginated project list */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${filter}-${page}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                {visibleProjects.map((p) => {
                  const globalIdx = PROJECTS.indexOf(p);
                  return (
                    <SidebarItem
                      key={p.id}
                      project={p}
                      index={globalIdx}
                      active={globalIdx === activeIdx}
                      onClick={() => setActiveIdx(globalIdx)}
                    />
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Pagination controls — only shown when there's more than one page */}
            {totalPages > 1 && (
              <div style={{
                marginTop: "auto",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 16px",
                borderTop: "1px solid rgba(168,85,247,0.12)",
                background: "rgba(133,39,227,0.05)",
              }}>
                <button
                  onClick={() => page > 0 && goToPage(page - 1)}
                  style={{
                    display: "flex", alignItems: "center", gap: 4,
                    fontFamily: "Karasu, sans-serif", fontSize: "10px",
                    letterSpacing: "0.14em",
                    color: page === 0 ? "rgba(168,85,247,0.18)" : "rgba(168,85,247,0.65)",
                    cursor: page === 0 ? "not-allowed" : "pointer",
                    background: "transparent", border: "none",
                    transition: "color 0.2s",
                  }}
                >
                  <ChevronLeft size={11} strokeWidth={1.5} />
                  PREV
                </button>

                {/* Page dots */}
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      style={{
                        width: i === page ? 18 : 6,
                        height: 4,
                        background: i === page ? "rgba(168,85,247,0.9)" : "rgba(168,85,247,0.22)",
                        border: "none", cursor: "pointer",
                        transition: "all 0.25s", padding: 0,
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={() => page < totalPages - 1 && goToPage(page + 1)}
                  style={{
                    display: "flex", alignItems: "center", gap: 4,
                    fontFamily: "Karasu, sans-serif", fontSize: "10px",
                    letterSpacing: "0.14em",
                    color: page === totalPages - 1 ? "rgba(168,85,247,0.18)" : "rgba(168,85,247,0.65)",
                    cursor: page === totalPages - 1 ? "not-allowed" : "pointer",
                    background: "transparent", border: "none",
                    transition: "color 0.2s",
                  }}
                >
                  NEXT
                  <ChevronRight size={11} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>

          {/* Right showcase */}
          <div ref={showcaseRef} style={{ position: "relative", overflow: "hidden", padding: "28px 28px 24px" }}>

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
                    fontFamily: "Karasu, sans-serif", fontSize: "11px",
                    letterSpacing: "0.24em", color: "rgba(168,85,247,0.95)",
                    padding: "5px 13px",
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
                    fontFamily: "Karasu, sans-serif", fontSize: "12.5px",
                    letterSpacing: "0.18em", color: "rgba(168,85,247,0.8)",
                    marginBottom: 16,
                  }}>
                    {active.tagline}
                  </p>

                  {/* Description */}
                  <p style={{
                    fontFamily: "Showcase Sans mini, sans-serif",
                    fontSize: "15.5px", lineHeight: 1.9,
                    color: "rgba(255,255,255,0.78)", marginBottom: 20,
                    maxWidth: 480,
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
                    style={{ fontFamily: "Karasu, sans-serif", fontSize: "12px", letterSpacing: "0.22em" }}
                  >
                    <ExternalLink size={14} strokeWidth={1.6} />
                    VIEW DETAILS
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
        <div ref={phaseRef} className="mt-8">
          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 16,
          }}>
            <span style={{
              fontFamily: "Karasu, sans-serif", fontSize: "11.5px",
              letterSpacing: "0.24em", color: "rgba(168,85,247,0.8)", flexShrink: 0,
            }}>
              _ PHASES
            </span>
            <div style={{
              flex: 1, height: 1,
              background: "linear-gradient(90deg, rgba(168,85,247,0.35), transparent)",
            }} />
            <span style={{
              fontFamily: "Karasu, sans-serif", fontSize: "10.5px",
              letterSpacing: "0.18em", color: "rgba(168,85,247,0.4)",
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
