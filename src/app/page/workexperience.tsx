"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Experience {
  id: string;
  wkNm: string;
  dateRange: string;
  company: string;
  role: string;
  description: string;
}

const experiences: Experience[] = [
  {
    id: "EXP 001",
    wkNm: "WK NM 00",
    dateRange: "2024 – Present",
    company: "Tech Company X",
    role: "Junior Full-Stack Developer",
    description:
      "Built RESTful APIs and responsive UIs using Node.js, React, and Tailwind CSS. Managed deployment pipelines with Docker and GitHub Actions.",
  },
  {
    id: "EXP 002",
    wkNm: "WK NM 01",
    dateRange: "2023 – 2024",
    company: "Startup Y",
    role: "Frontend Intern",
    description:
      "Created reusable React component libraries. Improved page load speed by 40% through code optimisation and close collaboration with design.",
  },
  {
    id: "EXP 003",
    wkNm: "WK NM 02",
    dateRange: "2022 – 2023",
    company: "Agency Z",
    role: "Web Designer",
    description:
      "Designed and developed landing pages for client campaigns. Collaborated with the marketing team to deliver pixel-perfect responsive designs.",
  },
];

function HUDFrame({ topLeft, topRight }: { topLeft: string; topRight: string }) {
  const c = "rgba(168,85,247,0.75)";
  const sz = 18;
  return (
    <>
      {/* TL */}
      <div
        className="absolute top-2 left-2 flex items-center gap-1.5 pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <div
          style={{
            width: sz,
            height: sz,
            borderTop: `1px solid ${c}`,
            borderLeft: `1px solid ${c}`,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 7,
            letterSpacing: "0.18em",
            color: c,
            fontFamily: "FF Identification, sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          {topLeft}
        </span>
      </div>

      {/* TR */}
      <div
        className="absolute top-2 right-2 flex items-center gap-1.5 pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <span
          style={{
            fontSize: 7,
            letterSpacing: "0.18em",
            color: c,
            fontFamily: "FF Identification, sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          {topRight}
        </span>
        <div
          style={{
            width: sz,
            height: sz,
            borderTop: `1px solid ${c}`,
            borderRight: `1px solid ${c}`,
            flexShrink: 0,
          }}
        />
      </div>

      {/* BL */}
      <div
        className="absolute bottom-2 left-2 pointer-events-none"
        style={{
          zIndex: 2,
          width: sz,
          height: sz,
          borderBottom: `1px solid ${c}`,
          borderLeft: `1px solid ${c}`,
        }}
      />

      {/* BR */}
      <div
        className="absolute bottom-2 right-2 pointer-events-none"
        style={{
          zIndex: 2,
          width: sz,
          height: sz,
          borderBottom: `1px solid ${c}`,
          borderRight: `1px solid ${c}`,
        }}
      />

      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(168,85,247,0.018) 3px, rgba(168,85,247,0.018) 4px)",
        }}
      />
    </>
  );
}

function DiamondArrow({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.18s ease, filter 0.2s ease",
        transform: hovered ? "scale(1.15)" : "scale(1)",
        filter: hovered
          ? "drop-shadow(0 0 8px rgba(168,85,247,0.9)) drop-shadow(0 0 18px rgba(168,85,247,0.5)) brightness(1.25)"
          : "drop-shadow(0 0 3px rgba(168,85,247,0.35)) brightness(0.85)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={
          direction === "left"
            ? "/images/arrow-left.png"
            : "/images/arrow-right.png"
        }
        alt={direction === "left" ? "Previous" : "Next"}
        style={{ width: 52, height: 52, objectFit: "contain", display: "block", pointerEvents: "none" }}
        draggable={false}
      />
    </button>
  );
}

export default function WorkExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(1);
  const [busy, setBusy] = useState(false);
  const len = experiences.length;

  const navigate = (dir: "next" | "prev") => {
    if (busy) return;
    setBusy(true);
    setCurrent((prev) =>
      dir === "next" ? (prev + 1) % len : (prev - 1 + len) % len
    );
    setTimeout(() => setBusy(false), 460);
  };

  useGSAP(
    () => {
      gsap.from(".we-header > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  const getPos = (i: number): "center" | "left" | "right" | "hidden" => {
    const offset = ((i - current) % len + len) % len;
    if (offset === 0) return "center";
    if (offset === 1) return "right";
    if (offset === len - 1) return "left";
    return "hidden";
  };

  const transforms: Record<string, string> = {
    center: "translateX(0%) scale(1)",
    left: "translateX(-130%) scale(0.92)",
    right: "translateX(130%) scale(0.92)",
    hidden: "translateX(0%) scale(0.7)",
  };
  const opacities: Record<string, number> = {
    center: 1,
    left: 0.65,
    right: 0.65,
    hidden: 0,
  };
  const zIndices: Record<string, number> = {
    center: 20,
    left: 10,
    right: 10,
    hidden: 1,
  };

  const exp = experiences[current];

  return (
    <section
      id="work-experience"
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center pt-8 pb-24 overflow-hidden"
      style={{ background: "rgba(6,1,15,0.98)" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(133,39,227,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(168,85,247,0.012) 2px, rgba(168,85,247,0.012) 4px)",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex items-center gap-6 -mt-20">
        {/* Left vertical tab list */}
        <nav
          className="hidden lg:flex flex-col gap-5 shrink-0 pr-5"
          style={{ borderRight: "1px solid rgba(168,85,247,0.15)" }}
        >
          {experiences.map((e, i) => (
            <button
              key={i}
              onClick={() => !busy && setCurrent(i)}
              className="flex items-center gap-3 text-left"
            >
              <div
                style={{
                  width: 2,
                  height: 34,
                  transition: "background 0.3s",
                  background:
                    i === current
                      ? "rgba(168,85,247,0.9)"
                      : "rgba(168,85,247,0.2)",
                }}
              />
              <div>
                <p
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.22em",
                    fontFamily: "FF Identification, sans-serif",
                    color:
                      i === current
                        ? "rgba(168,85,247,1)"
                        : "rgba(255,255,255,0.25)",
                    transition: "color 0.3s",
                  }}
                >
                  {e.id}
                </p>
                <p
                  style={{
                    fontSize: 10,
                    marginTop: 2,
                    fontFamily: "Showcase Sans mini, sans-serif",
                    color:
                      i === current
                        ? "rgba(255,255,255,0.7)"
                        : "rgba(255,255,255,0.2)",
                    transition: "color 0.3s",
                  }}
                >
                  {e.company}
                </p>
              </div>
            </button>
          ))}
        </nav>

        {/* Carousel column */}
        <div className="flex-1 flex flex-col items-center gap-6">
          {/* Title */}
          <div className="we-header text-center flex flex-col items-center gap-3">
            <h2
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-widest text-white"
              style={{
                fontFamily: "Yozakura, sans-serif",
                textShadow:
                  "0 0 40px rgba(168,85,247,0.7), 0 4px 10px rgba(0,0,0,0.5)",
              }}
            >
              WORK EXPERIENCE
            </h2>
            <div
              style={{
                width: 140,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(168,85,247,0.8), rgba(99,102,241,0.6), transparent)",
              }}
            />
          </div>

          {/* Cards container */}
          <div
            className="relative w-full mt-6 flex items-center justify-center"
            style={{ height: 320 }}
          >
            {experiences.map((e, i) => {
              const pos = getPos(i);
              return (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    top: 0,
                    bottom: 0,
                    width: "60%",
                    left: "20%",
                    transition:
                      "transform 0.42s ease-in-out, opacity 0.42s ease-in-out",
                    transform: transforms[pos],
                    opacity: opacities[pos],
                    zIndex: zIndices[pos],
                  }}
                >
                  <div
                    className="relative w-full h-full overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(35,8,70,0.95) 0%, rgba(8,2,22,0.98) 100%)",
                      border: "1px solid rgba(168,85,247,0.22)",
                    }}
                  >
                    <HUDFrame topLeft={e.id} topRight={e.wkNm} />

                    {/* Card interior */}
                    <div
                      className="relative z-0 w-full h-full flex flex-col items-center justify-center gap-3 px-10"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(88,28,135,0.18) 0%, rgba(30,27,75,0.22) 50%, rgba(6,1,15,0.28) 100%)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 9,
                          letterSpacing: "0.28em",
                          color: "rgba(168,85,247,0.45)",
                          fontFamily: "FF Identification, sans-serif",
                        }}
                      >
                        {e.dateRange}
                      </p>
                      <p
                        className="text-center text-xl text-white/20 tracking-widest"
                        style={{ fontFamily: "Yozakura, sans-serif" }}
                      >
                        {e.company.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Left arrow */}
            <div
              className="absolute top-1/2 -translate-y-1/2 z-30"
              style={{ left: "7%" }}
            >
              <DiamondArrow
                direction="left"
                onClick={() => navigate("prev")}
              />
            </div>

            {/* Right arrow */}
            <div
              className="absolute top-1/2 -translate-y-1/2 z-30"
              style={{ right: "7%" }}
            >
              <DiamondArrow
                direction="right"
                onClick={() => navigate("next")}
              />
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2.5">
            {experiences.map((_, i) => (
              <button
                key={i}
                onClick={() => !busy && setCurrent(i)}
                style={{
                  height: 5,
                  width: i === current ? 22 : 5,
                  borderRadius: 3,
                  background:
                    i === current
                      ? "rgba(168,85,247,0.9)"
                      : "rgba(168,85,247,0.3)",
                  transition: "all 0.35s ease",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          {/* Info below cards */}
          <div
            className="text-center px-4"
            style={{ maxWidth: 540, minHeight: 96 }}
          >
            <h3
              className="text-lg sm:text-xl text-white mb-2"
              style={{ fontFamily: "Showcase Sans mini, sans-serif" }}
            >
              [{exp.company} — {exp.role}]
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "Showcase Sans mini, sans-serif",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              {exp.description}
            </p>
            <p
              className="mt-2 text-xs tracking-widest"
              style={{
                fontFamily: "FF Identification, sans-serif",
                color: "rgba(168,85,247,0.6)",
              }}
            >
              {exp.dateRange}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
