"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const tracks = [
  { number: "01", title: "Arise", artist: "Solo Leveling OST", duration: "3:24" },
  { number: "02", title: "The Shadow Monarch", artist: "Solo Leveling OST", duration: "4:12" },
  { number: "03", title: "Hunter's Theme", artist: "Solo Leveling OST", duration: "2:58" },
  { number: "04", title: "Level Up", artist: "Solo Leveling OST", duration: "3:45" },
];

export default function Music() {
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
      id="music"
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

      <div className="relative z-10 w-full max-w-3xl mx-auto">
        {/* Title */}
        <h2
          className="reveal text-center text-6xl md:text-8xl font-bold tracking-widest text-white mb-4"
          style={{
            fontFamily: "Yozakura, sans-serif",
            textShadow:
              "0 0 40px rgba(168,85,247,0.7), 0 4px 10px rgba(0,0,0,0.5)",
          }}
        >
          MUSIC
        </h2>

        {/* Divider */}
        <div
          className="reveal w-full h-px mb-16"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(168,85,247,0.8), rgba(99,102,241,0.6), transparent)",
          }}
        />

        {/* Track list */}
        <div className="flex flex-col mb-8">
          {tracks.map((track, index) => (
            <div
              key={index}
              className="reveal flex items-center gap-4 py-4"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Track number */}
              <span
                className="w-8 text-sm shrink-0"
                style={{
                  fontFamily: "FF Identification, sans-serif",
                  color: "rgba(168,85,247,0.4)",
                }}
              >
                {track.number}
              </span>

              {/* Track title */}
              <span
                className="flex-1 text-white"
                style={{ fontFamily: "Showcase Sans mini, sans-serif" }}
              >
                {track.title}
              </span>

              {/* Artist */}
              <span
                className="text-sm hidden sm:block"
                style={{
                  fontFamily: "Showcase Sans mini, sans-serif",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {track.artist}
              </span>

              {/* Duration */}
              <span
                className="text-sm shrink-0"
                style={{
                  fontFamily: "Showcase Sans mini, sans-serif",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {track.duration}
              </span>
            </div>
          ))}
        </div>

        {/* Mockup player bar */}
        <div
          className="reveal w-full py-3 px-6 rounded-sm flex items-center justify-between"
          style={{
            background: "rgba(88,28,135,0.3)",
            border: "1px solid rgba(168,85,247,0.2)",
          }}
        >
          <span
            className="text-sm tracking-widest"
            style={{
              fontFamily: "FF Identification, sans-serif",
              color: "rgba(168,85,247,0.8)",
            }}
          >
            &#9654; NOW PLAYING
          </span>
          <span
            className="text-sm"
            style={{
              fontFamily: "Showcase Sans mini, sans-serif",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            — : —
          </span>
        </div>
      </div>
    </section>
  );
}
