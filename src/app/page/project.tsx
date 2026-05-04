"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    title: "E-Commerce Platform",
    tags: ["React", "Node.js", "PostgreSQL"],
    description:
      "A full-stack shopping platform with payment integration and admin dashboard.",
  },
  {
    title: "DevOps Pipeline",
    tags: ["Docker", "GitHub Actions", "AWS"],
    description:
      "Automated CI/CD pipeline for containerised microservices deployment.",
  },
  {
    title: "Portfolio Website",
    tags: ["Next.js", "GSAP", "Tailwind"],
    description:
      "Animated developer portfolio inspired by Solo Leveling visual design.",
  },
];

export default function Project() {
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
      id="project"
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
          className="reveal text-center text-6xl md:text-8xl font-bold tracking-widest text-white mb-4"
          style={{
            fontFamily: "Yozakura, sans-serif",
            textShadow:
              "0 0 40px rgba(168,85,247,0.7), 0 4px 10px rgba(0,0,0,0.5)",
          }}
        >
          PROJECT
        </h2>

        {/* Divider */}
        <div
          className="reveal w-full h-px mb-16"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(168,85,247,0.8), rgba(99,102,241,0.6), transparent)",
          }}
        />

        {/* Project cards */}
        <div className="flex flex-wrap gap-6 justify-center">
          {projects.map((project, index) => (
            <div
              key={index}
              className="reveal flex flex-col flex-1 min-w-[260px] max-w-sm rounded-sm overflow-hidden"
              style={{
                background: "rgba(133,39,227,0.05)",
                border: "1px solid rgba(168,85,247,0.15)",
              }}
            >
              {/* Top accent line */}
              <div className="w-full h-0.5 bg-purple-500" />

              <div className="p-6 flex flex-col gap-4">
                {/* Project title */}
                <h3
                  className="text-2xl text-white"
                  style={{ fontFamily: "Yozakura, sans-serif" }}
                >
                  {project.title}
                </h3>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        fontFamily: "Showcase Sans mini, sans-serif",
                        background: "rgba(88,28,135,0.4)",
                        border: "1px solid rgba(168,85,247,0.3)",
                        color: "rgba(255,255,255,0.8)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "Showcase Sans mini, sans-serif",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
