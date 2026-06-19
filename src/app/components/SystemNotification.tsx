"use client";

import { useEffect, useRef, useState } from "react";

interface Notification {
  id: number;
  message: string;
}

const SECTION_MESSAGES: Record<string, string> = {
  "about-me":        "PLAYER PROFILE LOADED",
  "education":       "ACADEMIC RECORDS ACCESSED",
  "skills":          "SKILL DATABASE UNLOCKED",
  "project":         "PROJECT ARCHIVE OPENED",
  "work-experience": "CAREER LOG INITIALIZED",
  "achievements":    "QUEST LOG ACCESSED",
  "contact":         "DUNGEON GATE DETECTED",
};

let notifId = 0;

export default function SystemNotification() {
  const [current, setCurrent] = useState<Notification | null>(null);
  const [visible, setVisible]  = useState(false);
  const queue  = useRef<string[]>([]);
  const busy   = useRef(false);
  const triggered = useRef<Set<string>>(new Set());

  function flush() {
    if (busy.current || queue.current.length === 0) return;
    const msg = queue.current.shift()!;
    busy.current = true;
    setCurrent({ id: ++notifId, message: msg });
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        busy.current = false;
        setCurrent(null);
        flush();
      }, 500);
    }, 2500);
  }

  function enqueue(msg: string) {
    queue.current.push(msg);
    flush();
  }

  useEffect(() => {
    const sectionIds = Object.keys(SECTION_MESSAGES);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.15 &&
            !triggered.current.has(entry.target.id)
          ) {
            triggered.current.add(entry.target.id);
            enqueue(SECTION_MESSAGES[entry.target.id]);
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!current) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 80,
        right: 24,
        zIndex: 9999,
        pointerEvents: "none",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(32px)",
      }}
    >
      <div
        style={{
          background: "rgba(6,2,18,0.95)",
          border: "1px solid rgba(100,80,255,0.55)",
          boxShadow: "0 0 18px rgba(100,80,255,0.25), inset 0 0 12px rgba(100,80,255,0.04)",
          padding: "12px 18px",
          minWidth: 240,
          maxWidth: 320,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top glow line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(120,90,255,0.9) 40%, rgba(120,90,255,0.9) 60%, transparent)",
          }}
        />

        {/* Scan sweep */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 2,
            top: "30%",
            background:
              "linear-gradient(90deg, transparent, rgba(100,80,255,0.35) 40%, rgba(100,80,255,0.35) 60%, transparent)",
            animation: "system-scan 1.2s linear forwards",
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          {/* Pulsing dot */}
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(168,85,247,1)",
              boxShadow: "0 0 8px rgba(168,85,247,0.9)",
              animation: "system-pulse 1s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "FF Identification, sans-serif",
              fontSize: "9px",
              letterSpacing: "0.28em",
              color: "rgba(168,85,247,1)",
              textShadow: "0 0 10px rgba(168,85,247,0.7)",
            }}
          >
            SYSTEM
          </span>
          <span
            style={{
              fontFamily: "FF Identification, sans-serif",
              fontSize: "9px",
              letterSpacing: "0.15em",
              color: "rgba(168,85,247,0.35)",
              marginLeft: "auto",
            }}
          >
            SL-SYS
          </span>
        </div>

        {/* Message */}
        <p
          style={{
            fontFamily: "FF Identification, sans-serif",
            fontSize: "11px",
            letterSpacing: "0.18em",
            color: "rgba(160,220,255,0.95)",
            textShadow: "0 0 12px rgba(100,200,255,0.5)",
            lineHeight: 1.5,
          }}
        >
          {current.message}
        </p>

        {/* Bottom corner brackets */}
        <div
          style={{
            position: "absolute",
            bottom: 4,
            left: 6,
            width: 8,
            height: 8,
            borderLeft: "1px solid rgba(100,80,255,0.5)",
            borderBottom: "1px solid rgba(100,80,255,0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 4,
            right: 6,
            width: 8,
            height: 8,
            borderRight: "1px solid rgba(100,80,255,0.5)",
            borderBottom: "1px solid rgba(100,80,255,0.5)",
          }}
        />
      </div>
    </div>
  );
}
