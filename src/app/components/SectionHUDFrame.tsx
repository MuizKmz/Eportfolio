"use client";

import { motion } from "framer-motion";

// ── Palette ───────────────────────────────────────────────
const P  = "rgba(110,25,210,0.9)";
const PB = "rgba(160,55,255,1)";
const PD = "rgba(75,12,155,0.55)";
const PG = "0 0 10px rgba(140,30,240,0.8)";
const BG = "rgba(4,1,14,0.98)";          // near-opaque dark for bars
const F  = "'FF Identification','Showcase Sans mini',monospace";

// Dark blue-purple page background — blocks the fixed hero from showing through
const PAGE_BG = "#06021a";

// ── Atoms ─────────────────────────────────────────────────

function Slashes({ sz = 10 }: { sz?: number }) {
  return (
    <span style={{ fontFamily: F, fontSize: sz, letterSpacing: "-0.05em", color: P, flexShrink: 0 }}>
      ///
    </span>
  );
}

function Lbl({ t, bright = false, sz = 8 }: { t: string; bright?: boolean; sz?: number }) {
  return (
    <span
      style={{
        fontFamily: F, fontSize: sz, letterSpacing: "0.16em",
        color: bright ? PB : P,
        textShadow: bright ? PG : undefined,
        whiteSpace: "nowrap", flexShrink: 0,
      }}
    >
      {t}
    </span>
  );
}

function VD({ h = 24 }: { h?: number }) {
  return <div style={{ width: 1, height: h, background: PD, flexShrink: 0 }} />;
}

function HBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        border: `1px solid ${P}`, padding: "2px 8px",
        background: "rgba(90,15,180,0.18)", flexShrink: 0,
        boxShadow: PG, display: "flex", alignItems: "center", gap: 6,
      }}
    >
      {children}
    </div>
  );
}

function Dot({ sz = 4 }: { sz?: number }) {
  return (
    <motion.div
      style={{ width: sz, height: sz, borderRadius: "50%", background: P, flexShrink: 0 }}
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function GlowBorder({ pos = "bottom", delay = 0 }: { pos?: "top" | "bottom"; delay?: number }) {
  return (
    <motion.div
      className="absolute left-0 right-0"
      style={{
        [pos]: 0, height: 1,
        background: `linear-gradient(90deg,transparent,${P} 6%,${PB} 50%,${P} 94%,transparent)`,
        boxShadow: PG,
      }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function SpanBar() {
  return (
    <motion.div
      style={{
        flex: 1, height: 1,
        background: `linear-gradient(90deg,transparent,${P} 4%,${PB} 50%,${P} 96%,transparent)`,
        boxShadow: PG,
      }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function LBracket({ corner, size = 36 }: { corner: "tl" | "tr" | "bl" | "br"; size?: number }) {
  const isT = corner[0] === "t";
  const isL = corner[1] === "l";
  return (
    <motion.div
      className="absolute"
      style={{
        width: size, height: size,
        [isT ? "top" : "bottom"]: 0,
        [isL ? "left" : "right"]: 0,
        pointerEvents: "none", zIndex: 10,
      }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: isT ? 0 : 1 }}
    >
      <div style={{ position: "absolute", [isL ? "left" : "right"]: 0, top: 0, width: 1, height: size, background: PB, boxShadow: PG }} />
      <div style={{ position: "absolute", [isL ? "left" : "right"]: 0, [isT ? "top" : "bottom"]: 0, width: size, height: 1, background: PB, boxShadow: PG }} />
    </motion.div>
  );
}

function CornerRow({ left, right }: { left: string[]; right: string[] }) {
  return (
    <div
      className="flex justify-between px-4"
      style={{ paddingTop: 4, paddingBottom: 4, pointerEvents: "none", backgroundColor: PAGE_BG }}
    >
      <div>
        {left.map((l, i) => (
          <div key={i} style={{ fontFamily: F, fontSize: 7, letterSpacing: "0.1em", color: PD, lineHeight: 1.85 }}>{l}</div>
        ))}
      </div>
      <div style={{ textAlign: "right" }}>
        {right.map((r, i) => (
          <div key={i} style={{ fontFamily: F, fontSize: 7, letterSpacing: "0.1em", color: PD, lineHeight: 1.85 }}>{r}</div>
        ))}
      </div>
    </div>
  );
}

// ── TopFrame ──────────────────────────────────────────────
// sticky: stays pinned to viewport top while the section is being scrolled

function TopFrame({ label, num, slCode, newsCode, endNum }: {
  label: string; num: string; slCode: string; newsCode: string; endNum: string;
}) {
  return (
    <div className="relative w-full">
      {/* ── Main HUD bar ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: 56,
          background: `linear-gradient(180deg,${BG} 0%,rgba(4,1,14,0.94) 100%)`,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <GlowBorder pos="bottom" />

        <div className="absolute" style={{ top: 3, left: 14 }}>
          <Lbl t="SOLO LEVELING" sz={7} />
        </div>

        <div className="flex items-center w-full h-full px-4 gap-2" style={{ paddingTop: 12 }}>
          <Lbl t={slCode} sz={9} bright />
          <Dot sz={3} /><Dot sz={3} /><Dot sz={3} />
          <div style={{ width: 18, height: 1, background: PD }} />

          <HBox><Lbl t={`01 ${label}`} sz={9} bright /></HBox>

          <Slashes />

          <div className="flex items-center gap-1 shrink-0">
            <Lbl t="NUM ·" sz={8} />
            <Lbl t={num} sz={10} bright />
          </div>

          <VD />
          <Lbl t="SOLO LEVELING 001" sz={8} />
          <VD />
          <Lbl t="ARISE 65" sz={8} />

          <div className="flex-1 min-w-0" />

          <Lbl t={`NEWS  ${newsCode}`} sz={8} />
          <Dot sz={3} /><Dot sz={3} />
          <VD />
          <Dot sz={3} /><Dot sz={3} /><Dot sz={3} />
          <VD />
          <span style={{ fontFamily: F, fontSize: 10, color: PD, letterSpacing: "-0.02em" }}>&gt;&gt;&gt;</span>
          <Lbl t={endNum} sz={10} bright />
        </div>
      </div>

      {/* corner text row */}
      <CornerRow
        left={[`SOLO LEVELING ARISE 4${num}652`, `TEST ZONE_${num} 88 DP 1 152_`]}
        right={["· · ·", "· ·"]}
      />

      <LBracket corner="tl" />
      <LBracket corner="tr" />
    </div>
  );
}

// ── BottomFrame ───────────────────────────────────────────

function BottomFrame({ label, num, slCode }: { label: string; num: string; slCode: string }) {
  return (
    <div className="relative w-full">
      <CornerRow
        left={[`SOLO LEVELING ARISE 4${num}652`, `TEST ZONE_${num} 88 DP 1 152_`]}
        right={["FF 01 12", `TEST NUM. 0${num}_`]}
      />

      <div
        className="relative w-full overflow-hidden"
        style={{
          height: 50,
          background: `linear-gradient(0deg,${BG} 0%,rgba(4,1,14,0.94) 100%)`,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <GlowBorder pos="top" delay={1.3} />

        <div className="flex items-center w-full h-full px-4 gap-2">
          <Slashes sz={12} />

          <HBox>
            <Lbl t={`B1 ${label}`} sz={9} bright />
            <Lbl t={slCode} sz={9} />
          </HBox>

          <Slashes />
          <SpanBar />
          <Slashes />

          <div className="flex items-center gap-1 shrink-0">
            <Lbl t="ARISE 01" sz={8} />
            <span style={{ fontFamily: F, fontSize: 10, color: PD }}>·</span>
            <Lbl t="NB1" sz={8} />
          </div>

          <VD />
          <Lbl t="SOLO LEVELING 001" sz={8} />
          <VD />
          <Lbl t={`TEST NUM. 0${num}_`} sz={8} />
        </div>
      </div>

      <div className="absolute" style={{ bottom: 4, left: 12, pointerEvents: "none" }}>
        <Slashes sz={13} />
      </div>

      <LBracket corner="bl" />
      <LBracket corner="br" />
    </div>
  );
}

// ── Main export ───────────────────────────────────────────

interface Props {
  code:     string;
  label:    string;
  num:      string;
  children: React.ReactNode;
}

export default function SectionHUDFrame({ label, num, children }: Props) {
  const slCode    = `SL${num}`;
  const lastDigit = num.slice(-1);
  const newsCode  = `0${lastDigit}42`;
  const endNum    = `00${lastDigit}8`;

  return (
    /*
     * PAGE_BG is an opaque dark background that covers the fixed hero
     * behind every section (Education onwards especially).
     *
     * TopFrame uses position: sticky so it stays pinned to viewport
     * top while the user scrolls through this section, then scrolls
     * away naturally when the next section begins.
     */
    <div className="relative w-full" style={{ backgroundColor: PAGE_BG }}>

      {/* ── STICKY TOP FRAME ─────────────────────────────── */}
      {/* Sticks to the viewport top while this section is in view.    */}
      {/* Unsticks and scrolls away when the container ends.           */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, width: "100%" }}>
        <TopFrame
          label={label} num={num}
          slCode={slCode} newsCode={newsCode} endNum={endNum}
        />
      </div>

      {/* ── SECTION CONTENT (unchanged) ──────────────────── */}
      {children}

      {/* ── BOTTOM FRAME (normal flow) ───────────────────── */}
      <BottomFrame label={label} num={num} slCode={slCode} />

    </div>
  );
}
