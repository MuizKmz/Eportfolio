"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const volumes = [
  { volume: "VOL. 01", title: "Solo Leveling", releaseDate: "2025.03.26" },
  { volume: "VOL. 02", title: "Solo Leveling", releaseDate: "2025.06.18" },
  { volume: "VOL. 03", title: "Solo Leveling", releaseDate: "2025.09.10" },
];

export default function BlurayDvd() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".reveal", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="bluray-dvd"
      ref={sectionRef}
      className="min-h-screen relative flex flex-col items-center justify-center px-6 py-24"
      style={{
        background: "rgba(15, 0, 30, 0.98)",
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(133,39,227,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Title */}
        <h2
          className="reveal text-center text-5xl md:text-7xl font-bold tracking-widest text-white mb-4"
          style={{
            fontFamily: "Yozakura, sans-serif",
            textShadow:
              "0 0 40px rgba(168,85,247,0.7), 0 4px 10px rgba(0,0,0,0.5)",
          }}
        >
          BLU-RAY &amp; DVD
        </h2>

        {/* Divider */}
        <div
          className="reveal w-full h-px mb-16"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(168,85,247,0.8), rgba(99,102,241,0.6), transparent)",
          }}
        />

        {/* Product cards */}
        <div className="flex flex-wrap gap-8 justify-center">
          {volumes.map((vol, index) => (
            <div
              key={index}
              className="reveal flex flex-col items-center gap-3 flex-1 min-w-[160px] max-w-[220px]"
            >
              {/* Vertical rectangle placeholder */}
              <div
                className="w-full rounded-sm flex items-center justify-center"
                style={{
                  aspectRatio: "2 / 3",
                  background: "rgba(88,28,135,0.4)",
                  border: "1px solid rgba(168,85,247,0.2)",
                }}
              >
                <span
                  className="text-4xl font-bold select-none"
                  style={{ color: "rgba(168,85,247,0.3)" }}
                >
                  BD
                </span>
              </div>

              {/* Volume label */}
              <p
                className="text-xs tracking-widest"
                style={{
                  fontFamily: "FF Identification, sans-serif",
                  color: "rgba(168,85,247,0.6)",
                }}
              >
                {vol.volume}
              </p>

              {/* Title */}
              <p
                className="text-lg text-white text-center"
                style={{ fontFamily: "Showcase Sans mini, sans-serif" }}
              >
                {vol.title}
              </p>

              {/* Release date */}
              <p
                className="text-sm text-center"
                style={{
                  fontFamily: "Showcase Sans mini, sans-serif",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {vol.releaseDate}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
