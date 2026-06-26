"use client";

import { useEffect, useState } from "react";

interface Ember {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

// Drifting red/orange embers that rise behind & around the hero — echoes the
// red energy in the character art. Generated on the client to avoid SSR
// hydration mismatch from Math.random().
export default function HeroEmbers({ count = 24 }: { count?: number }) {
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    setEmbers(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 7 + Math.random() * 9,
        delay: Math.random() * 10,
        drift: (Math.random() - 0.5) * 80,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {embers.map((e, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            bottom: -12,
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,120,80,1) 0%, rgba(225,40,40,0.75) 50%, transparent 72%)",
            boxShadow: "0 0 6px rgba(255,90,50,0.85)",
            opacity: 0,
            // CSS custom prop consumed by the keyframes below
            ["--drift" as string]: `${e.drift}px`,
            animation: `ember-rise ${e.duration}s linear ${e.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes ember-rise {
          0%   { transform: translate(0, 0);                          opacity: 0; }
          8%   {                                                      opacity: 1; }
          82%  {                                                      opacity: 0.85; }
          100% { transform: translate(var(--drift), -108vh);          opacity: 0; }
        }
      `}</style>
    </div>
  );
}
