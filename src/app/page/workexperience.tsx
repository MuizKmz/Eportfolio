"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const experiences = [
  {
    dateRange: "2024 – Present",
    company: "Tech Company X",
    role: "Junior Full-Stack Developer",
    bullets: [
      "Built RESTful APIs using Node.js and Express",
      "Developed responsive UIs with React and Tailwind CSS",
      "Managed deployment pipelines using Docker and GitHub Actions",
    ],
  },
  {
    dateRange: "2023 – 2024",
    company: "Startup Y",
    role: "Frontend Intern",
    bullets: [
      "Created reusable component libraries in React",
      "Collaborated with designers to implement pixel-perfect UIs",
      "Improved page load speed by 40% through code optimisation",
    ],
  },
];

export default function WorkExperience() {
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
      id="work-experience"
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
          WORK EXPERIENCE
        </h2>

        {/* Divider */}
        <div
          className="reveal w-full h-px mb-16"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(168,85,247,0.8), rgba(99,102,241,0.6), transparent)",
          }}
        />

        {/* Timeline entries */}
        <div className="flex flex-col gap-12">
          {experiences.map((exp, index) => (
            <div key={index} className="reveal flex flex-col gap-3">
              {/* Date range */}
              <p
                className="text-xs tracking-widest"
                style={{
                  fontFamily: "FF Identification, sans-serif",
                  color: "rgba(168,85,247,0.6)",
                }}
              >
                {exp.dateRange}
              </p>

              {/* Company name */}
              <h3
                className="text-3xl text-white"
                style={{ fontFamily: "Yozakura, sans-serif" }}
              >
                {exp.company}
              </h3>

              {/* Role */}
              <p
                className="text-xl"
                style={{
                  fontFamily: "Showcase Sans mini, sans-serif",
                  color: "rgb(216,180,254)",
                }}
              >
                {exp.role}
              </p>

              {/* Bullet points */}
              <ul className="pl-4 list-disc flex flex-col gap-1">
                {exp.bullets.map((bullet, bulletIndex) => (
                  <li
                    key={bulletIndex}
                    className="text-sm"
                    style={{
                      fontFamily: "Showcase Sans mini, sans-serif",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Entry divider */}
              {index < experiences.length - 1 && (
                <div
                  className="mt-4 w-full h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
