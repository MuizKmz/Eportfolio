"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Instagram, Twitter, Linkedin, Github, Menu, X } from "lucide-react";

gsap.registerPlugin(useGSAP);

type Props = {
  delay?: number;
  className?: string;
};

// Section → nav label mapping (home handled via scrollY, not observer)
const SECTIONS = [
  { id: "about-me",        label: "ABOUT ME" },
  { id: "education",       label: "EDUCATION" },
  { id: "skills",          label: "SKILLS" },
  { id: "project",         label: "PROJECT" },
  { id: "work-experience", label: "WORK EXPERIENCE" },
  // { id: "achievements",    label: "ACHIEVEMENTS" }, // temporarily hidden
  { id: "contact",         label: "CONTACT" },
];

// TODO: replace Twitter / LinkedIn / GitHub with your real handles
const SOCIALS = [
  { Icon: Instagram, href: "https://www.instagram.com/muizkmz/" },
  { Icon: Twitter,   href: "https://x.com/muizzuddin" },
  { Icon: Linkedin,  href: "https://linkedin.com/in/muizzuddin-kamarozamaan" },
  { Icon: Github,    href: "https://github.com/muizkamarozaman" },
];

// Hover-only glitch wrapper (glitch-r/glitch-c are opacity:0 by default, shown via CSS :hover)
function GlitchText({ children, style }: { children: string; style?: React.CSSProperties }) {
  return (
    <span className="nav-glitch relative inline-block" style={style}>
      {children}
      <span className="glitch-r absolute inset-0 pointer-events-none">{children}</span>
      <span className="glitch-c absolute inset-0 pointer-events-none">{children}</span>
    </span>
  );
}

export default function SideNavBar({ delay = 5.5, className = "" }: Props) {
  const [tickerPaused, setTickerPaused]   = useState(false);
  const [activeSection, setActiveSection] = useState("HOME");
  const [menuOpen, setMenuOpen]           = useState(false);
  const containerRef   = useRef<HTMLDivElement>(null);
  const currentTextRef = useRef<HTMLSpanElement>(null);

  // ── Entrance animation ──────────────────────────────────
  useGSAP(
    () => {
      const tl = gsap.timeline({ delay });
      tl
        .from(".sl-stick",   { scaleY: 0, transformOrigin: "top", duration: 1.8, ease: "power2.inOut" })
        .from(".sl-bracket", { scaleX: 0, transformOrigin: "left", duration: 0.5, stagger: 0.07, ease: "power2.out" }, "-=1.6")
        .from(".sl-dot",     { opacity: 0, scale: 0, duration: 0.22, stagger: 0.06, ease: "back.out(2)" }, "-=1.3")
        .from(".sl-section", { opacity: 0, x: -12, duration: 0.4, stagger: 0.15, ease: "power2.out" }, "-=0.9")
        .from(".sl-current", { opacity: 0, x: -20, duration: 0.6, ease: "power3.out" }, "-=0.8")
        .from(".sl-item",    { opacity: 0, x: -20, duration: 0.28, stagger: 0.05, ease: "power2.out" }, "-=0.5");
    },
    { scope: containerRef }
  );

  // ── Scroll spy (skip fixed home element — use scrollY instead) ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with highest visibility ratio
        let best = { ratio: 0, label: "" };
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > best.ratio) {
            const found = SECTIONS.find((s) => s.id === entry.target.id);
            if (found) best = { ratio: entry.intersectionRatio, label: found.label };
          }
        });
        if (best.label) setActiveSection(best.label);
      },
      { threshold: [0.3, 0.5, 0.7] }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // HOME: restore when back near top
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.35) setActiveSection("HOME");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ── Mobile drawer: lock background scroll + close on ESC ──
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // No single glitch effect needed - using permanent CSS glitch instead

  // ── Smooth scroll to section on nav item click ──
  const scrollTo = (label: string) => {
    setMenuOpen(false);
    const section = SECTIONS.find((s) => s.label === label);
    if (!section) return;
    const el = document.getElementById(section.id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    {/* ══════════ DESKTOP SIDEBAR (lg and up) ══════════ */}
    <div
      ref={containerRef}
      className={`hidden lg:block fixed left-10 top-5 bottom-5 z-30 select-none ${className}`}
      style={{ width: "320px" }}
    >
      {/* Vertical line */}
      <div
        className="sl-stick absolute left-0 top-0 bottom-0"
        style={{ width: "1.5px", background: "rgba(255,255,255,0.22)" }}
      />

      {/* Top-left corner bracket */}
      <div className="absolute left-0 top-0 flex items-center">
        <div className="sl-dot w-2 h-2 bg-white/80 shrink-0" />
        <div className="sl-bracket h-px bg-white/70" style={{ width: "52px" }} />
        <div className="sl-bracket h-px bg-white/35 ml-1" style={{ width: "28px" }} />
      </div>

      {/* Bottom-left corner bracket */}
      <div className="absolute left-0 bottom-0 flex items-center">
        <div className="sl-dot w-2 h-2 bg-white/80 shrink-0" />
        <div className="sl-bracket h-px bg-white/70" style={{ width: "52px" }} />
        <div className="sl-bracket h-px bg-white/35 ml-1" style={{ width: "28px" }} />
      </div>

      {/* Nav content */}
      <div className="absolute left-6 top-4 bottom-4 flex flex-col">

        {/* CURRENT — live section name, glitches continuously */}
        <div className="sl-current mb-6">
          <span
            ref={currentTextRef}
            className="nav-glitch-always relative inline-block"
            style={{
              fontFamily: "Showcase Sans mini, sans-serif",
              fontSize: "45px",
              fontWeight: "500",
              letterSpacing: "0.03em",
              color: "rgba(255,255,255,0.92)",
              textShadow: "0 1px 4px rgba(0,0,0,0.3)",
              whiteSpace: "nowrap",
              display: "inline-block",
            }}
          >
            {activeSection}
            <span className="glitch-r absolute inset-0 pointer-events-none">{activeSection}</span>
            <span className="glitch-c absolute inset-0 pointer-events-none">{activeSection}</span>
          </span>
        </div>

        {/* TOPIC 1 label */}
        <div className="sl-section flex items-center gap-3 mb-3">
          <span style={{
            fontFamily: "FF Identification, sans-serif", fontSize: "24px",
            color: "rgba(255,255,255,0.4)", letterSpacing: "0.22em", whiteSpace: "nowrap",
          }}>
            TOPIC 1
          </span>
          <div className="h-px bg-white/20" style={{ width: "70px" }} />
        </div>

        {/* Nav items — hover glitch + click to scroll */}
        <ul className="space-y-2">
          {SECTIONS.map(({ label }) => (
            <li key={label} className="sl-item relative">
              <GlitchText
                style={{
                  fontFamily: "Showcase Sans mini, sans-serif",
                  fontSize: "28px",
                  fontWeight: "500",
                  letterSpacing: "0.03em",
                  color: activeSection === label ? "#a855f7" : "rgba(255,255,255,0.82)",
                  textShadow: activeSection === label
                    ? "0 0 20px rgba(168,85,247,0.6)"
                    : "0 1px 4px rgba(0,0,0,0.25)",
                  whiteSpace: "nowrap",
                  transition: "color 0.3s ease, text-shadow 0.3s ease",
                  cursor: "pointer",
                }}
              >
                {label}
              </GlitchText>
              {/* invisible click layer over the GlitchText */}
              <span
                className="absolute inset-0 cursor-pointer"
                onClick={() => scrollTo(label)}
                aria-label={`Go to ${label}`}
              />
            </li>
          ))}
        </ul>

        {/* Push bottom block down */}
        <div className="flex-1" />

        {/* TOPIC 2 label */}
        <div className="sl-section flex items-center gap-3 mb-3">
          <span style={{
            fontFamily: "FF Identification, sans-serif", fontSize: "24px",
            color: "rgba(255,255,255,0.4)", letterSpacing: "0.22em", whiteSpace: "nowrap",
          }}>
            TOPIC 2
          </span>
          <div className="h-px bg-white/20" style={{ width: "70px" }} />
        </div>

        {/* SOCIAL label */}
        <div className="sl-section flex items-center gap-3 mb-2">
          <span style={{
            fontFamily: "FF Identification, sans-serif", fontSize: "24px",
            color: "rgba(255,255,255,0.4)", letterSpacing: "0.22em",
          }}>
            SOCIAL
          </span>
          <div className="h-px bg-white/20" style={{ width: "70px" }} />
        </div>

        {/* OFFICIAL */}
        <div className="sl-item mb-2">
          <GlitchText style={{
            fontFamily: "Showcase Sans mini, sans-serif", fontSize: "42px",
            fontWeight: "500", letterSpacing: "0.03em",
            color: "rgba(255,255,255,0.92)", whiteSpace: "nowrap",
          }}>
            OFFICIAL
          </GlitchText>
        </div>

        {/* Social icons ticker */}
        <div
          className="sl-item overflow-hidden"
          style={{
            width: "160px", height: "40px",
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
          onMouseEnter={() => setTickerPaused(true)}
          onMouseLeave={() => setTickerPaused(false)}
        >
          <div
            className="flex items-center gap-5 h-full"
            style={{
              animation: "ticker 12s linear infinite",
              animationPlayState: tickerPaused ? "paused" : "running",
              width: "fit-content",
            }}
          >
            {[...Array(2)].map((_, si) => (
              <div key={si} className="flex items-center gap-5 shrink-0">
                {SOCIALS.map(({ Icon, href }, i) => (
                  <a key={`${si}-${i}`} href={href} target="_blank" rel="noopener noreferrer"
                    className="social-icon text-white/60 shrink-0">
                    <Icon size={26} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* ══════════ MOBILE NAV (below lg) ══════════ */}

    {/* Floating menu button — small footprint so it never hides the HUD frames */}
    <button
      onClick={() => setMenuOpen(true)}
      aria-label="Open navigation menu"
      aria-expanded={menuOpen}
      className="lg:hidden fixed top-3 right-3 z-50 flex items-center justify-center"
      style={{
        width: 46, height: 46,
        background: "linear-gradient(135deg, rgba(20,6,42,0.92) 0%, rgba(6,2,18,0.92) 100%)",
        border: "1px solid rgba(168,85,247,0.45)",
        boxShadow: "0 0 14px rgba(168,85,247,0.25)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        color: "rgba(216,180,254,0.95)", cursor: "pointer",
      }}
    >
      <Menu size={24} strokeWidth={1.6} />
    </button>

    {/* Drawer overlay */}
    <div
      className="lg:hidden fixed inset-0 z-[55]"
      style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      aria-hidden={!menuOpen}
    >
      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(4,1,14,0.7)",
          backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
          opacity: menuOpen ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Sliding panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="absolute top-0 right-0 bottom-0 flex flex-col"
        style={{
          width: "min(82vw, 340px)",
          background: "linear-gradient(160deg, rgba(20,6,42,0.99) 0%, rgba(6,2,18,0.99) 100%)",
          borderLeft: "1px solid rgba(168,85,247,0.3)",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.55)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          padding: "18px 24px 28px",
          overflowY: "auto",
        }}
      >
        {/* Panel header + close */}
        <div className="flex items-center justify-between mb-5">
          <span style={{
            fontFamily: "FF Identification, sans-serif", fontSize: "16px",
            letterSpacing: "0.22em", color: "rgba(168,85,247,0.55)",
          }}>
            NAVIGATION
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
            className="flex items-center justify-center"
            style={{ width: 44, height: 44, marginRight: -10, color: "rgba(216,180,254,0.95)", background: "transparent", border: "none", cursor: "pointer" }}
          >
            <X size={24} strokeWidth={1.6} />
          </button>
        </div>

        {/* CURRENT — live section name */}
        <div className="mb-5">
          <span
            className="nav-glitch-always relative inline-block"
            style={{
              fontFamily: "Showcase Sans mini, sans-serif",
              fontSize: "34px", fontWeight: 500, letterSpacing: "0.03em",
              color: "rgba(255,255,255,0.92)", whiteSpace: "nowrap",
            }}
          >
            {activeSection}
            <span className="glitch-r absolute inset-0 pointer-events-none">{activeSection}</span>
            <span className="glitch-c absolute inset-0 pointer-events-none">{activeSection}</span>
          </span>
        </div>

        {/* TOPIC 1 */}
        <div className="flex items-center gap-3 mb-2">
          <span style={{
            fontFamily: "FF Identification, sans-serif", fontSize: "16px",
            color: "rgba(255,255,255,0.4)", letterSpacing: "0.22em", whiteSpace: "nowrap",
          }}>
            TOPIC 1
          </span>
          <div className="h-px bg-white/20 flex-1" />
        </div>

        {/* Nav items */}
        <ul className="flex flex-col">
          {SECTIONS.map(({ label }) => (
            <li key={label}>
              <button
                onClick={() => scrollTo(label)}
                className="nav-glitch w-full text-left"
                style={{
                  padding: "11px 0",
                  background: "transparent", border: "none", cursor: "pointer",
                  position: "relative", display: "inline-block",
                }}
              >
                <span
                  style={{
                    fontFamily: "Showcase Sans mini, sans-serif",
                    fontSize: "26px", fontWeight: 500, letterSpacing: "0.03em",
                    color: activeSection === label ? "#a855f7" : "rgba(255,255,255,0.82)",
                    textShadow: activeSection === label
                      ? "0 0 20px rgba(168,85,247,0.6)"
                      : "0 1px 4px rgba(0,0,0,0.25)",
                    whiteSpace: "nowrap",
                    transition: "color 0.3s ease, text-shadow 0.3s ease",
                  }}
                >
                  {label}
                </span>
                <span className="glitch-r absolute inset-0 pointer-events-none" style={{ paddingTop: "11px", fontFamily: "Showcase Sans mini, sans-serif", fontSize: "26px", whiteSpace: "nowrap" }}>{label}</span>
                <span className="glitch-c absolute inset-0 pointer-events-none" style={{ paddingTop: "11px", fontFamily: "Showcase Sans mini, sans-serif", fontSize: "26px", whiteSpace: "nowrap" }}>{label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex-1 min-h-[20px]" />

        {/* SOCIAL */}
        <div className="flex items-center gap-3 mb-3 mt-6">
          <span style={{
            fontFamily: "FF Identification, sans-serif", fontSize: "16px",
            color: "rgba(255,255,255,0.4)", letterSpacing: "0.22em",
          }}>
            SOCIAL
          </span>
          <div className="h-px bg-white/20 flex-1" />
        </div>

        {/* Social icons row */}
        <div className="flex items-center gap-5">
          {SOCIALS.map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon text-white/60 flex items-center justify-center"
              style={{ width: 44, height: 44 }}
              aria-label="Social link"
            >
              <Icon size={26} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
