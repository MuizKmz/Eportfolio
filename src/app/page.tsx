"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutMe from "./page/aboutme";
import Education from "./page/education";
import Skills from "./page/skills";
import Project from "./page/project";
import WorkExperience from "./page/workexperience";
// import Achievements from "./page/achievements"; // temporarily hidden
import Contact from "./page/contact";
import SectionHUDFrame from "./components/SectionHUDFrame";
import Footer from "./components/Footer";
import SystemNotification from "./components/SystemNotification";
import HeroEmbers from "./components/HeroEmbers";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const heroContentRef   = useRef<HTMLDivElement>(null);
  const heroBarRef       = useRef<HTMLDivElement>(null);
  const heroImageWrapRef = useRef<HTMLDivElement>(null);
  const chevronRef       = useRef<HTMLDivElement>(null);

  // Always land at the top on every page load / refresh
  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "+=800",
        scrub: 1.2,
      },
    });

    tl.to(heroContentRef.current,   { y: -220, opacity: 0, ease: "none" }, 0)
      .to(heroBarRef.current,        { y: -220, opacity: 0, ease: "none" }, 0)
      .to(heroImageWrapRef.current,  { y: -80,  ease: "none" }, 0)
      .to(chevronRef.current,        { opacity: 0, ease: "none" }, 0);
  });

  return (
    <>
      {/* System notifications — fixed overlay */}
      <SystemNotification />

      <motion.main
        id="home"
        initial={{ backgroundColor: "#000000" }}
        animate={{
          backgroundImage:
            "linear-gradient(155deg, rgba(40,15,70,1) 0%, rgba(20,7,40,1) 50%, rgba(7,2,18,1) 100%)",
        }}
        transition={{ duration: 2 }}
        className="fixed inset-0 overflow-hidden text-white flex items-center justify-start z-0"
      >
        {/* Background motion layer */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ backgroundSize: "100% 100%", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
        />

        {/* ── Pulsing glow behind the character — z-[4] ── */}
        <motion.div
          className="absolute inset-0 z-[4] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 48% 62% at 24% 50%, rgba(230,45,55,0.34) 0%, rgba(150,30,210,0.16) 44%, transparent 72%)",
          }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.06, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Hero character image — z-10 ── */}
        <div ref={heroImageWrapRef} className="absolute inset-0 z-10">
          <motion.img
            src="/images/landing6.png"
            alt="Muhammad Muizzuddin Kamarozaman"
            className="w-full h-full object-cover"
            style={{ objectPosition: "left top" }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1 }}
          />
        </div>

        {/* ── Floating red embers — z-[15] (over the art, under the text) ── */}
        <div className="absolute inset-0 z-[15]">
          <HeroEmbers />
        </div>

        {/* ── Vignette + right-side text backdrop — z-[16] ── */}
        <div
          className="absolute inset-0 z-[16] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 85% 80% at 38% 50%, transparent 42%, rgba(8,2,22,0.55) 100%), radial-gradient(ellipse 40% 55% at 82% 28%, rgba(8,2,22,0.45) 0%, transparent 70%)",
          }}
        />

        {/* ── Hero text — z-20 ── */}
        <div
          ref={heroContentRef}
          className="absolute z-20 flex flex-col px-6 left-0 right-0 bottom-24 items-center text-center
                     sm:left-auto sm:right-10 sm:top-16 sm:bottom-auto sm:px-0 sm:items-end sm:text-right
                     lg:top-10"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
          >
            <h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none text-center sm:text-right"
              style={{
                fontFamily: "Yozakura, sans-serif",
                textShadow:
                  "0 4px 10px rgba(0,0,0,0.35), 0 0 30px rgba(180,120,255,0.4)",
              }}
            >
              MUhammad MuiZZuddin <br />
              <span
                className="block text-center opacity-90"
                style={{ textShadow: "0 4px 18px rgba(0,0,0,0.35)" }}
              >
                Kamarozaman
              </span>
            </h1>
            <p
              className="mt-5 sm:mt-10 text-purple-200 tracking-[0.10em] font-light text-shadow-glow"
              style={{ fontFamily: "Showcase Sans mini, sans-serif", fontSize: "clamp(15px, 3.8vw, 35px)" }}
            >
              • FULL-STACK DEVELOPER • PROJECT DESIGN • DEV OPS •
              <span
                className="block text-center text-purple-200 tracking-[0.10em] font-light text-shadow-soft"
                style={{ fontFamily: "Showcase Sans mini, sans-serif", fontSize: "clamp(15px, 3.8vw, 35px)" }}
              >
                • VIBE CODER •
              </span>
            </p>
          </motion.div>
        </div>

        {/* ── Gradient bar — z-20 (desktop-positioned, hidden on phones) ── */}
        <div ref={heroBarRef} className="hidden sm:block absolute top-[250px] right-10 z-20">
          <motion.div
            className="w-[780px] max-w-[calc(100vw-5rem)] h-1 bg-purple-900/30 rounded-full overflow-hidden shadow-lg"
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: "780px",
              opacity: 1,
              boxShadow: [
                "0 0 10px rgba(139,92,246,0.3)",
                "0 0 20px rgba(139,92,246,0.6)",
                "0 0 10px rgba(139,92,246,0.3)",
              ],
            }}
            transition={{
              width: { delay: 3.8, duration: 2 },
              opacity: { delay: 3.8, duration: 0.5 },
              boxShadow: { delay: 5.8, duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-400 via-indigo-500 to-purple-600"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 0.85, 1] }}
              style={{ transformOrigin: "left" }}
              transition={{ delay: 3.8, duration: 3, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-0 left-0 h-full w-[100px]"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
              initial={{ x: "-100px" }}
              animate={{ x: "860px" }}
              transition={{ delay: 2, duration: 2.5, repeat: Infinity, repeatDelay: 0.5, ease: "linear" }}
            />
          </motion.div>
        </div>

        {/* ── Scroll chevron ── */}
        <div ref={chevronRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-purple-400 z-30">
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, 12, 0] }}
            transition={{ delay: 2, duration: 1, repeat: Infinity }}
          >
            <ChevronDown size={40} strokeWidth={1.5} />
          </motion.div>
        </div>
      </motion.main>

      {/* ── Sections ──
           Wrapped in overflow-x:clip to contain any in-section element that
           would otherwise overflow horizontally — that overflow let the page
           drag sideways on mobile and revealed the fixed hero on the right.
           `clip` on the X axis only (Y stays visible) does NOT create a scroll
           container, so vertical scrolling and the sticky HUD headers both keep
           working — unlike overflow:hidden, which would break the sticky bars. */}
      <div style={{ marginTop: "100vh", overflowX: "clip" }}>
        <SectionHUDFrame code="ABOUT" label="ABOUT ME" num="001">
          <AboutMe />
        </SectionHUDFrame>

        <SectionHUDFrame code="EDU"   label="EDUCATION"      num="002">
          <Education />
        </SectionHUDFrame>

        <SectionHUDFrame code="SKILL" label="SKILLS"         num="003">
          <Skills />
        </SectionHUDFrame>

        <SectionHUDFrame code="PROJ"  label="PROJECT"        num="004" noBottomFrame>
          <Project />
        </SectionHUDFrame>

        <SectionHUDFrame code="WORK"  label="WORK EXP"       num="005">
          <WorkExperience />
        </SectionHUDFrame>

        {/* Temporarily hidden — Achievements section
        <SectionHUDFrame code="ACH"   label="ACHIEVEMENTS"   num="006">
          <Achievements />
        </SectionHUDFrame>
        */}

        <SectionHUDFrame code="GATE"  label="CONTACT"        num="007">
          <Contact />
        </SectionHUDFrame>

        <Footer />
      </div>
    </>
  );
}
