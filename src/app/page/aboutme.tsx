"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, Mail } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const details = [
  { label: "DEGREE",     value: "Bachelor of CS (Software Eng.)" },
  { label: "UNIVERSITY", value: "Universiti Teknologi Malaysia"  },
  { label: "CGPA",       value: "3.59 / 4.00"                    },
  { label: "BASED",      value: "Rembau, Negeri Sembilan"        },
  { label: "STATUS",     value: "Open to Opportunities"          },
];

const stats = [
  { num: "2+",  label: "EXPERIENCE"   },
  { num: "4+",  label: "PROJECTS"     },
  { num: "10+", label: "TECHNOLOGIES" },
];

// ── ID card corner brackets ──
function CornerFrame() {
  const c = "rgba(168,85,247,0.75)";
  const sz = 16;
  return (
    <>
      <div style={{ position: "absolute", top: 8, left: 8, width: sz, height: sz, borderTop: `1px solid ${c}`, borderLeft: `1px solid ${c}`, pointerEvents: "none", zIndex: 3 }} />
      <div style={{ position: "absolute", top: 8, right: 8, width: sz, height: sz, borderTop: `1px solid ${c}`, borderRight: `1px solid ${c}`, pointerEvents: "none", zIndex: 3 }} />
      <div style={{ position: "absolute", bottom: 8, left: 8, width: sz, height: sz, borderBottom: `1px solid ${c}`, borderLeft: `1px solid ${c}`, pointerEvents: "none", zIndex: 3 }} />
      <div style={{ position: "absolute", bottom: 8, right: 8, width: sz, height: sz, borderBottom: `1px solid ${c}`, borderRight: `1px solid ${c}`, pointerEvents: "none", zIndex: 3 }} />
    </>
  );
}

// ── Portrait image SVG ornamental corners ──
function PortraitCorner({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const isT = corner[0] === "t";
  const isL = corner[1] === "l";
  const sx = isL ? 1 : -1;
  const sy = isT ? 1 : -1;
  return (
    <div
      style={{
        position: "absolute",
        [isT ? "top" : "bottom"]: 0,
        [isL ? "left" : "right"]: 0,
        width: 40,
        height: 40,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        style={{
          transform: `scale(${sx}, ${sy})`,
          transformOrigin: "50% 50%",
          filter: "drop-shadow(0 0 4px rgba(168,85,247,0.95))",
          overflow: "visible",
        }}
      >
        {/* Main L-bracket arms */}
        <line x1="4" y1="7" x2="4" y2="33" stroke="rgba(210,140,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7" y1="4" x2="33" y2="4" stroke="rgba(210,140,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Corner diamond accent */}
        <polygon points="4,1 7,4 4,7 1,4" fill="rgba(230,170,255,1)" />
        {/* Tick marks on horizontal arm */}
        <line x1="18" y1="4" x2="18" y2="8" stroke="rgba(168,85,247,0.7)" strokeWidth="1" />
        <line x1="26" y1="4" x2="26" y2="7" stroke="rgba(168,85,247,0.45)" strokeWidth="1" />
        {/* Tick marks on vertical arm */}
        <line x1="4" y1="18" x2="8" y2="18" stroke="rgba(168,85,247,0.7)" strokeWidth="1" />
        <line x1="4" y1="26" x2="7" y2="26" stroke="rgba(168,85,247,0.45)" strokeWidth="1" />
        {/* End-stop caps */}
        <line x1="33" y1="4" x2="33" y2="8" stroke="rgba(168,85,247,0.8)" strokeWidth="1" />
        <line x1="4" y1="33" x2="8" y2="33" stroke="rgba(168,85,247,0.8)" strokeWidth="1" />
        {/* Inner secondary accent near corner */}
        <line x1="11" y1="11" x2="16" y2="11" stroke="rgba(168,85,247,0.28)" strokeWidth="0.75" />
        <line x1="11" y1="11" x2="11" y2="16" stroke="rgba(168,85,247,0.28)" strokeWidth="0.75" />
      </svg>
    </div>
  );
}

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".about-header-tag",  { y: 20, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" })
        .from(headerRef.current,    { y: 50, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.6")
        .from(lineRef.current,      { scaleX: 0, transformOrigin: "left", duration: 1, ease: "power2.out" }, "-=0.5")
        .from(cardRef.current,      { x: -40, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.4")
        .from(contentRef.current,   { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.7")
        .from(".about-stat",        { y: 14, opacity: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }, "-=0.5")
        .from(".about-detail",      { x: 14, opacity: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" }, "-=0.4")
        .from(".about-cta",         { y: 16, opacity: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about-me"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden z-10"
      style={{ background: "rgba(6, 2, 18, 1)" }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.4,
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(133,39,227,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-6xl mx-auto px-8 md:px-12 py-20 z-10">

        {/* ── HEADER ROW (cinematic labels) ── */}
        <div className="flex items-end justify-between mb-3 gap-4 flex-wrap">
          <div className="flex items-baseline gap-4">
            <h2
              ref={headerRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white"
              style={{
                fontFamily: "Yozakura, sans-serif",
                textShadow: "0 0 40px rgba(168,85,247,0.5), 0 4px 10px rgba(0,0,0,0.5)",
                letterSpacing: "0.04em",
                lineHeight: 0.95,
              }}
            >
              INTRODUCTION
            </h2>
            <span
              className="about-header-tag hidden md:inline"
              style={{
                fontFamily: "Karasu, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.22em",
                color: "rgba(168,85,247,0.6)",
                paddingBottom: "8px",
              }}
            >
              _ PROFILE.001
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span
              className="about-header-tag"
              style={{
                fontFamily: "Karasu, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.3em",
                color: "rgba(168,85,247,0.4)",
              }}
            >
              ///
            </span>
            <span
              className="about-header-tag"
              style={{
                fontFamily: "Karasu, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.22em",
                color: "rgba(168,85,247,0.7)",
              }}
            >
              [ S-CLASS ]
            </span>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div
          ref={lineRef}
          className="mb-14"
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, rgba(168,85,247,0.85) 0%, rgba(99,102,241,0.4) 50%, transparent 100%)",
            boxShadow: "0 0 12px rgba(168,85,247,0.4)",
          }}
        />

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-start">

          {/* ╔═══ LEFT: ID CARD ═══╗ */}
          <div
            ref={cardRef}
            className="relative w-full max-w-[300px] mx-auto lg:mx-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(35,8,70,0.6) 0%, rgba(8,2,22,0.95) 100%)",
              border: "1px solid rgba(168,85,247,0.28)",
              padding: "24px 20px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(168,85,247,0.08)",
            }}
          >
            <CornerFrame />

            {/* Card top labels */}
            <div className="flex justify-between items-center mb-4 relative z-10">
              <span
                style={{
                  fontFamily: "Karasu, sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  color: "rgba(168,85,247,0.85)",
                }}
              >
                ID · 001
              </span>
              <span
                style={{
                  fontFamily: "Karasu, sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  color: "rgba(168,85,247,0.5)",
                }}
              >
                HUNTER
              </span>
            </div>

            {/* Portrait frame */}
            <div
              className="relative overflow-hidden mb-5"
              style={{
                aspectRatio: "3 / 4",
                background:
                  "linear-gradient(135deg, rgba(88,28,135,0.4) 0%, rgba(15,3,30,0.95) 100%)",
                border: "1px solid rgba(168,85,247,0.2)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profile.png"
                alt="Muhammad Muizzuddin"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 20%",
                  filter: "saturate(0.95) contrast(1.05)",
                }}
                draggable={false}
              />

              {/* Scan lines over portrait */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168,85,247,0.04) 2px, rgba(168,85,247,0.04) 3px)",
                }}
              />

              {/* Top glow */}
              <div
                className="absolute top-0 left-0 right-0 pointer-events-none"
                style={{
                  height: 1,
                  background: "rgba(168,85,247,0.9)",
                  boxShadow: "0 0 10px rgba(168,85,247,0.8)",
                }}
              />

              {/* SVG ornamental corners */}
              <PortraitCorner corner="tl" />
              <PortraitCorner corner="tr" />
              <PortraitCorner corner="bl" />
              <PortraitCorner corner="br" />
            </div>

            {/* Name */}
            <h3
              style={{
                fontFamily: "Yozakura, sans-serif",
                fontSize: "20px",
                color: "rgba(255,255,255,0.95)",
                lineHeight: 1.2,
                letterSpacing: "0.02em",
                marginBottom: "8px",
                textShadow: "0 0 15px rgba(168,85,247,0.3)",
              }}
            >
              MUHAMMAD Muizzuddin
            </h3>

            {/* Divider */}
            <div
              className="mb-3"
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg, rgba(168,85,247,0.6), transparent)",
              }}
            />

            {/* Role + Rank */}
            <div className="flex flex-col gap-1.5">
              <p
                style={{
                  fontFamily: "Showcase Sans mini, sans-serif",
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                SOFTWARE ENGINEER
              </p>
              <p
                className="flex items-center gap-2"
                style={{
                  fontFamily: "Karasu, sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  color: "rgba(168,85,247,0.85)",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(168,85,247,1)", boxShadow: "0 0 8px rgba(168,85,247,0.8)" }} />
                RANK · S-CLASS
              </p>
            </div>
          </div>

          {/* ╔═══ RIGHT: CONTENT ═══╗ */}
          <div ref={contentRef} className="flex flex-col gap-8">

            {/* Bio paragraph */}
            <p
              style={{
                fontFamily: "Showcase Sans mini, sans-serif",
                fontSize: "17px",
                lineHeight: 1.85,
                color: "rgba(255,255,255,0.72)",
              }}
            >
              A dedicated and enthusiastic Software Engineering graduate from
              Universiti Teknologi Malaysia with a strong passion for full-stack
              development and emerging technologies. I possess a proactive mindset,
              constantly seeking opportunities to learn and apply new technologies.
              With adaptability and quick-learning abilities, I thrive in diverse
              environments and excel in collaborative teamwork.
            </p>

            {/* Highlighted closing line */}
            <p
              style={{
                fontFamily: "Showcase Sans mini, sans-serif",
                fontSize: "17px",
                lineHeight: 1.7,
                color: "rgba(168,85,247,0.95)",
                textShadow: "0 0 20px rgba(168,85,247,0.35)",
                paddingLeft: "16px",
                borderLeft: "2px solid rgba(168,85,247,0.6)",
              }}
            >
              Eager to leverage engineering knowledge and contribute to the
              continuous advancement of the technology industry.
            </p>

            {/* Stats row */}
            <div className="flex gap-10 pt-1">
              {stats.map((s) => (
                <div key={s.label} className="about-stat flex flex-col gap-1">
                  <span
                    style={{
                      fontFamily: "Yozakura, sans-serif",
                      fontSize: "32px",
                      color: "rgba(168,85,247,1)",
                      textShadow: "0 0 18px rgba(168,85,247,0.55)",
                      lineHeight: 1,
                    }}
                  >
                    {s.num}
                  </span>
                  <span
                    style={{
                      fontFamily: "Karasu, sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Decorative break */}
            <div
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg, rgba(168,85,247,0.25), transparent 80%)",
                marginTop: 4,
                marginBottom: 4,
              }}
            />

            {/* Detail rows */}
            <div className="flex flex-col">
              {details.map((d) => (
                <div
                  key={d.label}
                  className="about-detail flex items-start gap-6 py-3"
                  style={{ borderBottom: "1px solid rgba(168,85,247,0.08)" }}
                >
                  <span
                    style={{
                      fontFamily: "Karasu, sans-serif",
                      fontSize: "11px",
                      letterSpacing: "0.18em",
                      color: "rgba(168,85,247,0.75)",
                      minWidth: "92px",
                      paddingTop: "2px",
                      flexShrink: 0,
                    }}
                  >
                    {d.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "Showcase Sans mini, sans-serif",
                      fontSize: "16px",
                      color: "rgba(255,255,255,0.88)",
                      lineHeight: 1.5,
                    }}
                  >
                    {d.value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/Muizzuddin_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hud-btn about-cta"
              >
                <Download size={14} strokeWidth={1.8} />
                <span style={{ fontFamily: "Karasu, sans-serif", fontSize: "12px" }}>DOWNLOAD RESUME</span>
                <span style={{ fontSize: 12 }}>↗</span>
              </a>
              <a
                href="mailto:muizkamarozaman@gmail.com"
                className="hud-btn hud-btn-ghost about-cta"
              >
                <Mail size={14} strokeWidth={1.8} />
                <span style={{ fontFamily: "Karasu, sans-serif", fontSize: "12px" }}>GET IN TOUCH</span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
