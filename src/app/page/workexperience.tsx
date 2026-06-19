"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Experience {
  id: string;
  dateRange: string;
  company: string;
  role: string;
  description: string;
  type: string;
}

const experiences: Experience[] = [
  {
    id: "EXP · 001",
    dateRange: "Sep 2023 – Feb 2024",
    company: "Pejabat Daerah dan Tanah Tampin",
    role: "Programmer & Assistant Technician",
    type: "Internship",
    description:
      "Led development of a comprehensive Lucky Draw System (PHP, HTML, JavaScript). Set up PCs in the company's Active Directory domain. Participated in the Tech Master series to stay current with emerging technologies.",
  },
  {
    id: "EXP · 002",
    dateRange: "Dec 2022 – Feb 2023",
    company: "Smart Healthcare Project",
    role: "Full-Stack Developer",
    type: "Academic Project",
    description:
      "Built a web application to analyse real-time patient health data using an IoT-based Arduino monitoring system. Implemented with HTML/CSS, JavaScript, Spring Framework, and Firebase.",
  },
  {
    id: "EXP · 003",
    dateRange: "May 2023 – May 2024",
    company: "UTM Final Year Project",
    role: "Mobile App Developer",
    type: "Capstone Project",
    description:
      "Designed and built a Flutter mobile app promoting sustainable waste management practices. Managed project lifecycle with Jira and GitHub; implemented Enterprise Architecture testing in Android Studio.",
  },
  {
    id: "EXP · 004",
    dateRange: "2024 – Present",
    company: "IoT & Enterprise Platform Development",
    role: "Software Engineer",
    type: "Professional",
    description:
      "Delivered production-grade systems: PoleSyncTech Smart Pole IoT (MQTT · Socket.IO · MySQL · React · React Native), iottix RFID retail demo (Spring Boot · MongoDB · WebSocket/TCP hardware protocol), WMS (NestJS · Prisma · Vue 3 · React Native with native Android RFID modules), and MES manufacturing system design.",
  },
  {
    id: "EXP · 005",
    dateRange: "2024 – 2025",
    company: "HappiSafe Ai Sdn Bhd",
    role: "Full-Stack Developer",
    type: "Professional",
    description:
      "Built a Malaysian insurtech platform over 6+ months (400+ backend commits): two live insurer integrations (Chubb REST/JWT · Pacific SOAP/mTLS), Razer Pay & PayDollar gateways with RSA card tokenization, AI chatbot 'Creamy' (GPT-4o-mini, two-agent verification pattern), Redis session management, and CI/CD pipeline rebuilt from scratch after vendor dissolution.",
  },
];

const SLIDE_DURATION = 5000;
const RING_R    = 24;
const RING_CIRC = 2 * Math.PI * RING_R; // ~150.8

// ── HUD frame corners ──────────────────────────────────────────────────────
function HUDFrame({ topLeft, topRight }: { topLeft: string; topRight: string }) {
  const c = "rgba(168,85,247,0.7)";
  const sz = 16;
  return (
    <>
      <div className="absolute top-2 left-2 flex items-center gap-1.5 pointer-events-none" style={{ zIndex: 2 }}>
        <div style={{ width: sz, height: sz, borderTop: `1px solid ${c}`, borderLeft: `1px solid ${c}`, flexShrink: 0 }} />
        <span style={{ fontSize: 9.5, letterSpacing: "0.18em", color: c, fontFamily: "Karasu, sans-serif", whiteSpace: "nowrap" }}>
          {topLeft}
        </span>
      </div>
      <div className="absolute top-2 right-2 flex items-center gap-1.5 pointer-events-none" style={{ zIndex: 2 }}>
        <span style={{ fontSize: 9.5, letterSpacing: "0.18em", color: "rgba(168,85,247,0.5)", fontFamily: "Karasu, sans-serif", whiteSpace: "nowrap" }}>
          {topRight}
        </span>
        <div style={{ width: sz, height: sz, borderTop: `1px solid ${c}`, borderRight: `1px solid ${c}`, flexShrink: 0 }} />
      </div>
      <div className="absolute bottom-2 left-2 pointer-events-none" style={{ zIndex: 2, width: sz, height: sz, borderBottom: `1px solid ${c}`, borderLeft: `1px solid ${c}` }} />
      <div className="absolute bottom-2 right-2 pointer-events-none" style={{ zIndex: 2, width: sz, height: sz, borderBottom: `1px solid ${c}`, borderRight: `1px solid ${c}` }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 1,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(168,85,247,0.015) 3px, rgba(168,85,247,0.015) 4px)",
      }} />
    </>
  );
}

// ── Diamond arrow ──────────────────────────────────────────────────────────
function DiamondArrow({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "transparent", border: "none", padding: 0, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "transform 0.18s ease, filter 0.2s ease",
        transform: hovered ? "scale(1.15)" : "scale(1)",
        filter: hovered
          ? "drop-shadow(0 0 8px rgba(168,85,247,0.9)) brightness(1.25)"
          : "drop-shadow(0 0 3px rgba(168,85,247,0.35)) brightness(0.85)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={direction === "left" ? "/images/arrow-left.png" : "/images/arrow-right.png"}
        alt={direction === "left" ? "Previous" : "Next"}
        style={{ width: 48, height: 48, objectFit: "contain", display: "block", pointerEvents: "none" }}
        draggable={false}
      />
    </button>
  );
}

// ── Play/Pause ring button — CSS animation driven, no RAF ─────────────────
function PlayRing({ playing, slideKey, onToggle }: { playing: boolean; slideKey: number; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="play-ring-btn"
      style={{ position: "relative", width: 64, height: 64, background: "transparent", border: "none", cursor: "pointer", flexShrink: 0 }}
      aria-label={playing ? "Pause" : "Play"}
    >
      <svg width="64" height="64" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        {/* Track */}
        <circle cx="32" cy="32" r={RING_R} fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="1.5" />
        {/* Progress arc — CSS animation, browser-native smooth */}
        <circle
          key={`arc-${slideKey}-${playing}`}
          cx="32" cy="32" r={RING_R} fill="none"
          stroke="rgba(168,85,247,0.9)" strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={RING_CIRC}
          strokeDashoffset={RING_CIRC}
          style={{
            animation: playing ? `we-ring-fill ${SLIDE_DURATION}ms linear forwards` : "none",
            filter: "drop-shadow(0 0 5px rgba(168,85,247,0.75))",
          }}
        />
      </svg>

      {/* Inner circle */}
      <div style={{
        position: "absolute", inset: 10, borderRadius: "50%",
        background: playing ? "rgba(133,39,227,0.35)" : "rgba(133,39,227,0.15)",
        border: "1px solid rgba(168,85,247,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.2s, border-color 0.2s",
        boxShadow: playing ? "0 0 14px rgba(168,85,247,0.35), inset 0 0 10px rgba(168,85,247,0.1)" : "none",
      }}>
        {playing
          ? <Pause size={14} strokeWidth={1.8} color="rgba(200,130,255,1)" />
          : <Play  size={14} strokeWidth={1.8} color="rgba(168,85,247,0.85)" style={{ marginLeft: 2 }} />
        }
      </div>
    </button>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const busyRef = useRef(false);
  const len = experiences.length;

  // ── Navigation ────────────────────────────────────────────────────────────
  const navigate = (dir: "next" | "prev") => {
    if (busyRef.current) return;
    busyRef.current = true;
    setCurrent(prev => dir === "next" ? (prev + 1) % len : (prev - 1 + len) % len);
    setTimeout(() => { busyRef.current = false; }, 460);
  };

  // ── Auto-advance via setTimeout — restarts on every current/playing change ─
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => {
      busyRef.current = true;
      setCurrent(prev => (prev + 1) % len);
      setTimeout(() => { busyRef.current = false; }, 460);
    }, SLIDE_DURATION);
    return () => clearTimeout(id);
  }, [playing, current, len]);

  const handleDotClick = (i: number) => {
    if (busyRef.current) return;
    busyRef.current = true;
    setCurrent(i);
    setTimeout(() => { busyRef.current = false; }, 460);
  };

  // ── GSAP entrance ─────────────────────────────────────────────────────────
  useGSAP(() => {
    gsap.from(".we-reveal", {
      y: 28, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 72%",
        toggleActions: "play none none none",
        once: true,
      },
    });
  }, { scope: sectionRef });

  // ── Position helpers ───────────────────────────────────────────────────────
  const getPos = (i: number): "center" | "left" | "right" | "hidden" => {
    const offset = ((i - current) % len + len) % len;
    if (offset === 0) return "center";
    if (offset === 1) return "right";
    if (offset === len - 1) return "left";
    return "hidden";
  };

  const transforms: Record<string, string> = {
    center: "translateX(0%) scale(1)",
    left:   "translateX(-130%) scale(0.88)",
    right:  "translateX(130%) scale(0.88)",
    hidden: "translateX(0%) scale(0.7)",
  };
  const opacities: Record<string, number> = { center: 1, left: 0.5, right: 0.5, hidden: 0 };
  const zIndices:  Record<string, number> = { center: 20, left: 10, right: 10, hidden: 1 };

  const exp = experiences[current];

  return (
    <section
      id="work-experience"
      ref={sectionRef}
      className="min-h-screen relative flex flex-col justify-center overflow-hidden py-24"
      style={{ background: "rgba(6,1,15,0.98)" }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.09) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)",
      }} />
      {/* Bottom glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 45% at 50% 100%, rgba(133,39,227,0.2) 0%, transparent 70%)",
      }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
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
              WORK EXP
            </h2>
            <span className="hidden md:inline" style={{
              fontFamily: "Karasu, sans-serif", fontSize: "12px",
              letterSpacing: "0.22em", color: "rgba(168,85,247,0.7)", paddingBottom: "8px",
            }}>
              _ WKE.005
            </span>
          </div>
          <span style={{
            fontFamily: "Karasu, sans-serif", fontSize: "12px",
            letterSpacing: "0.2em", color: "rgba(168,85,247,0.42)", paddingBottom: "8px",
          }}>
            // CAREER_LOG
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

        {/* ── Body: carousel only ── */}
        <div className="we-reveal flex flex-col items-center gap-5">

            {/* Carousel cards */}
            <div className="relative w-full flex items-center justify-center" style={{ height: 360 }}>
              {experiences.map((e, i) => {
                const pos = getPos(i);
                const isCenter = pos === "center";
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      top: 0, bottom: 0, width: "68%", left: "16%",
                      transition: "transform 0.42s cubic-bezier(0.22,1,0.36,1), opacity 0.42s ease",
                      transform: transforms[pos],
                      opacity: opacities[pos],
                      zIndex: zIndices[pos],
                    }}
                  >
                    <div className="relative w-full h-full overflow-hidden" style={{
                      background: isCenter
                        ? "linear-gradient(135deg, rgba(45,10,90,0.98) 0%, rgba(12,3,28,0.99) 100%)"
                        : "linear-gradient(135deg, rgba(20,5,40,0.9) 0%, rgba(6,1,15,0.95) 100%)",
                      border: isCenter ? "1px solid rgba(168,85,247,0.4)" : "1px solid rgba(168,85,247,0.12)",
                      boxShadow: isCenter ? "0 0 40px rgba(133,39,227,0.2), inset 0 0 20px rgba(133,39,227,0.06)" : "none",
                      transition: "border-color 0.42s, box-shadow 0.42s, background 0.42s",
                    }}>
                      <HUDFrame topLeft={e.id} topRight={e.type} />

                      {/* Top glow bar */}
                      {isCenter && (
                        <div style={{
                          position: "absolute", top: 0, left: 0, right: 0, height: 1,
                          background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.8), transparent)",
                          boxShadow: "0 0 8px rgba(168,85,247,0.5)",
                        }} />
                      )}

                      <div className="relative z-0 w-full h-full flex flex-col items-center justify-center gap-2 px-10"
                        style={{ background: "linear-gradient(135deg, rgba(88,28,135,0.1) 0%, transparent 60%)" }}>

                        {isCenter ? (
                          <>
                            {/* Portrait image */}
                            <div style={{
                              position: "relative",
                              width: 100, height: 100, marginBottom: 8, flexShrink: 0,
                            }}>
                              {/* HUD corner accents */}
                              {(["tl","tr","bl","br"] as const).map(c => {
                                const isT = c[0]==="t", isL = c[1]==="l";
                                return (
                                  <div key={c} style={{
                                    position: "absolute",
                                    [isT?"top":"bottom"]: -3, [isL?"left":"right"]: -3,
                                    width: 10, height: 10,
                                    borderTop:    isT  ? "1.5px solid rgba(168,85,247,0.9)" : undefined,
                                    borderBottom: !isT ? "1.5px solid rgba(168,85,247,0.9)" : undefined,
                                    borderLeft:   isL  ? "1.5px solid rgba(168,85,247,0.9)" : undefined,
                                    borderRight:  !isL ? "1.5px solid rgba(168,85,247,0.9)" : undefined,
                                    zIndex: 2, pointerEvents: "none",
                                  }} />
                                );
                              })}
                              {/* Glow behind image */}
                              <div style={{
                                position: "absolute", inset: -6, borderRadius: "50%",
                                background: "radial-gradient(circle, rgba(133,39,227,0.35) 0%, transparent 70%)",
                                pointerEvents: "none",
                              }} />
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src="/images/beru.png"
                                alt="portrait"
                                style={{
                                  width: "100%", height: "100%",
                                  objectFit: "cover",
                                  display: "block",
                                  filter: "drop-shadow(0 0 8px rgba(168,85,247,0.6))",
                                }}
                              />
                            </div>

                            <p className="text-center" style={{
                              fontFamily: "Yozakura, sans-serif", fontSize: "clamp(17px,2.4vw,24px)",
                              color: "rgba(255,255,255,0.95)",
                              textShadow: "0 0 16px rgba(168,85,247,0.4)",
                              letterSpacing: "0.04em", lineHeight: 1.15,
                              textAlign: "center",
                            }}>
                              {e.company.toUpperCase()}
                            </p>

                            <p style={{
                              fontFamily: "Karasu, sans-serif", fontSize: "12px",
                              letterSpacing: "0.16em", color: "rgba(168,85,247,0.9)",
                              textAlign: "center",
                            }}>
                              {e.role}
                            </p>

                            <p style={{
                              fontFamily: "Karasu, sans-serif", fontSize: "10.5px",
                              letterSpacing: "0.18em", color: "rgba(168,85,247,0.5)",
                              marginTop: 7,
                            }}>
                              {e.dateRange}
                            </p>
                          </>
                        ) : (
                          <p className="text-center" style={{
                            fontFamily: "Yozakura, sans-serif", fontSize: "13px",
                            color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em",
                          }}>
                            {e.company.toUpperCase()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 z-30" style={{ left: "4%" }}>
                <DiamondArrow direction="left" onClick={() => navigate("prev")} />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 z-30" style={{ right: "4%" }}>
                <DiamondArrow direction="right" onClick={() => navigate("next")} />
              </div>
            </div>

            {/* ── Dots + Play button ── */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Pagination dots */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {experiences.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDotClick(i)}
                    style={{
                      height: 4, width: i === current ? 24 : 4,
                      borderRadius: 3,
                      background: i === current ? "rgba(168,85,247,0.95)" : "rgba(168,85,247,0.25)",
                      border: "none", padding: 0, cursor: "pointer",
                      transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                      boxShadow: i === current ? "0 0 8px rgba(168,85,247,0.6)" : "none",
                    }}
                  />
                ))}
              </div>

              {/* Divider */}
              <div style={{ width: 1, height: 20, background: "rgba(168,85,247,0.2)" }} />

              {/* Play/Pause ring */}
              <PlayRing
                playing={playing}
                slideKey={current}
                onToggle={() => setPlaying(p => !p)}
              />

              {/* Status label */}
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{
                  fontFamily: "Karasu, sans-serif", fontSize: "10px",
                  letterSpacing: "0.18em",
                  color: playing ? "rgba(168,85,247,0.9)" : "rgba(168,85,247,0.35)",
                  transition: "color 0.3s",
                }}>
                  {playing ? "AUTO.PLAY" : "PAUSED"}
                </span>
                <span style={{
                  fontFamily: "Karasu, sans-serif", fontSize: "9px",
                  letterSpacing: "0.14em", color: "rgba(168,85,247,0.35)",
                }}>
                  {String(current + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* ── Description below ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`desc-${current}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{ maxWidth: 520, textAlign: "center", padding: "0 8px" }}
              >
                <p style={{
                  fontFamily: "Showcase Sans mini, sans-serif",
                  fontSize: "16px", lineHeight: 1.9,
                  color: "rgba(255,255,255,0.72)",
                }}>
                  {exp.description}
                </p>
              </motion.div>
            </AnimatePresence>

          </div>
      </div>

      <style>{`
        @keyframes we-ring-fill {
          from { stroke-dashoffset: ${RING_CIRC}; }
          to   { stroke-dashoffset: 0; }
        }
        .play-ring-btn:hover > div {
          background: rgba(133,39,227,0.4) !important;
          border-color: rgba(168,85,247,0.8) !important;
        }
      `}</style>
    </section>
  );
}
