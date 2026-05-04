"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const timelineData = [
  {
    years: "2020 – 2024",
    institution: "Universiti X",
    degree: "Bachelor of Computer Science",
    description: "Focused on software engineering, algorithms, and full-stack web development.",
  },
  {
    years: "2017 – 2020",
    institution: "SMK Y",
    degree: "SPM",
    description: "Completed secondary education with distinction in science and mathematics.",
  },
  {
    years: "2023 – Present",
    institution: "Udemy / Coursera",
    degree: "Online Certifications",
    description: "Pursuing continuous learning in cloud computing, DevOps, and modern frameworks.",
  },
];

export default function Education() {
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
      id="education"
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
          EDUCATION
        </h2>

        {/* Divider */}
        <div
          className="reveal w-full h-px mb-16"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(168,85,247,0.8), rgba(99,102,241,0.6), transparent)",
          }}
        />

        {/* Timeline cards */}
        <div className="flex flex-col gap-8">
          {timelineData.map((item, index) => (
            <div
              key={index}
              className="reveal border-l-2 border-purple-500 pl-6 py-4"
            >
              <p
                className="text-sm font-bold mb-1"
                style={{
                  fontFamily: "Showcase Sans mini, sans-serif",
                  color: "rgba(168,85,247,1)",
                }}
              >
                {item.years}
              </p>
              <h3
                className="text-2xl md:text-3xl text-white mb-1"
                style={{ fontFamily: "Showcase Sans mini, sans-serif" }}
              >
                {item.institution}
              </h3>
              <p
                className="text-base mb-2"
                style={{
                  fontFamily: "Showcase Sans mini, sans-serif",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {item.degree}
              </p>
              <p
                className="text-sm"
                style={{
                  fontFamily: "Showcase Sans mini, sans-serif",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
