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
import Achievements from "./page/achievements";
import Contact from "./page/contact";
import SectionHUDFrame from "./components/SectionHUDFrame";
import Footer from "./components/Footer";
import SystemNotification from "./components/SystemNotification";

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
            "linear-gradient(160deg, rgba(233,242,245,1) 0%, rgba(159,120,191,1) 53%, rgba(133,39,227,1) 100%)",
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

        {/* ── Hero character image — z-10 ── */}
        <div ref={heroImageWrapRef} className="absolute left-20 top-0 z-10">
          <motion.img
            src="/images/image1.1.png"
            alt="Muhammad Muizzuddin Kamarozaman"
            className="h-[200vh] max-h-[800px] w-auto object-contain"
            style={{ transform: "scale(2)", transformOrigin: "top left" }}
            initial={{ opacity: 0, x: -50, scale: 2 }}
            animate={{ opacity: 1, x: 0, scale: 2 }}
            transition={{ delay: 1, duration: 1 }}
          />
        </div>

        {/* ── Hero text — z-20 ── */}
        <div
          ref={heroContentRef}
          className="absolute top-10 right-10 flex flex-col items-end z-20"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
          >
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none text-right"
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
              className="mt-10 text-purple-200 text-lg md:text-xl tracking-[0.10em] font-light text-shadow-glow"
              style={{ fontFamily: "Showcase Sans mini, sans-serif", fontSize: "35px" }}
            >
              • FULL-STACK DEVELOPER • PROJECT DESIGN • DEV OPS •
              <span
                className="block text-center text-purple-200 text-lg md:text-xl tracking-[0.10em] font-light text-shadow-soft"
                style={{ fontFamily: "Showcase Sans mini, sans-serif", fontSize: "35px" }}
              >
                • VIBE CODER •
              </span>
            </p>
          </motion.div>
        </div>

        {/* ── Gradient bar — z-20 ── */}
        <div ref={heroBarRef} className="absolute top-[250px] right-10 z-20">
          <motion.div
            className="w-[780px] h-1 bg-purple-900/30 rounded-full overflow-hidden shadow-lg"
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

      {/* ── Sections ── */}
      <div style={{ marginTop: "100vh" }}>
        <SectionHUDFrame code="ABOUT" label="ABOUT ME" num="001">
          <AboutMe />
        </SectionHUDFrame>
      </div>

      <SectionHUDFrame code="EDU"   label="EDUCATION"      num="002">
        <Education />
      </SectionHUDFrame>

      <SectionHUDFrame code="SKILL" label="SKILLS"         num="003">
        <Skills />
      </SectionHUDFrame>

      <SectionHUDFrame code="PROJ"  label="PROJECT"        num="004">
        <Project />
      </SectionHUDFrame>

      <SectionHUDFrame code="WORK"  label="WORK EXP"       num="005">
        <WorkExperience />
      </SectionHUDFrame>

      <SectionHUDFrame code="ACH"   label="ACHIEVEMENTS"   num="006">
        <Achievements />
      </SectionHUDFrame>

      <SectionHUDFrame code="GATE"  label="CONTACT"        num="007">
        <Contact />
      </SectionHUDFrame>

      <Footer />
    </>
  );
}
