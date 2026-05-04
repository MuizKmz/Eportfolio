"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const castMembers = [
  { name: "Sung Jin-Woo", role: "Main Character" },
  { name: "Cha Hae-In", role: "S-Rank Hunter" },
  { name: "Go Gun-Hee", role: "Guild Master" },
  { name: "Hwang Dong-Su", role: "Antagonist" },
  { name: "Thomas Andre", role: "National Level" },
  { name: "Liu Zhigang", role: "Shadow Soldier" },
];

export default function StaffCast() {
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
      id="staff-cast"
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

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Title */}
        <h2
          className="reveal text-center text-5xl md:text-7xl font-bold tracking-widest text-white mb-4"
          style={{
            fontFamily: "Yozakura, sans-serif",
            textShadow:
              "0 0 40px rgba(168,85,247,0.7), 0 4px 10px rgba(0,0,0,0.5)",
          }}
        >
          STAFF &amp; CAST
        </h2>

        {/* Divider */}
        <div
          className="reveal w-full h-px mb-16"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(168,85,247,0.8), rgba(99,102,241,0.6), transparent)",
          }}
        />

        {/* 3-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {castMembers.map((member, index) => (
            <div key={index} className="reveal flex flex-col items-center gap-3">
              {/* Placeholder image area */}
              <div
                className="w-full aspect-square rounded-sm flex items-center justify-center"
                style={{
                  background: "rgba(88,28,135,0.4)",
                  border: "1px solid rgba(168,85,247,0.2)",
                }}
              >
                <span
                  className="text-4xl font-bold select-none"
                  style={{ color: "rgba(168,85,247,0.4)" }}
                >
                  ?
                </span>
              </div>

              {/* Name */}
              <p
                className="text-lg text-white text-center"
                style={{ fontFamily: "Showcase Sans mini, sans-serif" }}
              >
                {member.name}
              </p>

              {/* Role label */}
              <p
                className="text-xs tracking-widest text-center"
                style={{
                  fontFamily: "FF Identification, sans-serif",
                  color: "rgba(168,85,247,0.5)",
                }}
              >
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
