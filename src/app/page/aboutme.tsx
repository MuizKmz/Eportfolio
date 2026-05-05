"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PortalCanvas from "../components/PortalCanvas";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
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

      tl.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left", duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        .from(
          contentRef.current,
          { y: 40, opacity: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about-me"
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden z-10"
      style={{ backgroundColor: "rgba(8, 2, 20, 1)" }}
    >
      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168,85,247,0.025) 2px, rgba(168,85,247,0.025) 4px)",
        }}
      />

      {/* Portal canvas — additive-blended plasma ring + particles */}
      <PortalCanvas />

      {/* Text content sits inside the void */}
      <div
        className="relative max-w-105 mx-auto px-6 text-center"
        style={{ zIndex: 2 }}
      >
        <h2
          ref={titleRef}
          className="text-6xl md:text-7xl font-bold text-white mb-6"
          style={{
            fontFamily: "Yozakura, sans-serif",
            textShadow: "0 0 40px rgba(168,85,247,0.7), 0 4px 10px rgba(0,0,0,0.5)",
          }}
        >
          ABOUT ME
        </h2>

        <div
          ref={lineRef}
          className="w-full h-px mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(168,85,247,0.8), rgba(99,102,241,0.6), transparent)",
          }}
        />

        <div
          ref={contentRef}
          className="leading-relaxed space-y-4"
          style={{ fontFamily: "Showcase Sans mini, sans-serif" }}
        >
          <p className="text-purple-300 text-xl font-medium tracking-widest">
            FULL-STACK DEVELOPER • PROJECT DESIGN • DEV OPS
          </p>
          <p className="text-white/60 text-lg mt-6">— Content coming soon —</p>
        </div>
      </div>
    </section>
  );
}
