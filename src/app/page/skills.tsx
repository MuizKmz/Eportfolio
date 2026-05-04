"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const skillCategories = [
  {
    category: "FRONTEND",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "BACKEND",
    skills: ["Node.js", "Express", "PostgreSQL", "REST API"],
  },
  {
    category: "DEVOPS",
    skills: ["Docker", "Git", "CI/CD", "Linux"],
  },
  {
    category: "DESIGN",
    skills: ["Figma", "UI/UX", "Wireframing", "Prototyping"],
  },
];

export default function Skills() {
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
      id="skills"
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
          className="reveal text-center text-6xl md:text-8xl font-bold tracking-widest text-white mb-4"
          style={{
            fontFamily: "Yozakura, sans-serif",
            textShadow:
              "0 0 40px rgba(168,85,247,0.7), 0 4px 10px rgba(0,0,0,0.5)",
          }}
        >
          SKILLS
        </h2>

        {/* Divider */}
        <div
          className="reveal w-full h-px mb-16"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(168,85,247,0.8), rgba(99,102,241,0.6), transparent)",
          }}
        />

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((item, index) => (
            <div
              key={index}
              className="reveal rounded-sm p-6"
              style={{
                background: "rgba(133,39,227,0.05)",
                border: "1px solid rgba(168,85,247,0.15)",
              }}
            >
              <p
                className="text-xs tracking-widest mb-4"
                style={{
                  fontFamily: "FF Identification, sans-serif",
                  color: "rgba(168,85,247,0.6)",
                }}
              >
                {item.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{
                      fontFamily: "Showcase Sans mini, sans-serif",
                      background: "rgba(88,28,135,0.4)",
                      border: "1px solid rgba(168,85,247,0.3)",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
