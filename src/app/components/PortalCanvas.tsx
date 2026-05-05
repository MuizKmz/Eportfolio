"use client";

import { useRef, useEffect } from "react";

interface LightningBolt {
  points: { x: number; y: number }[];
  life: number;
  maxLife: number;
  opacity: number;
  width: number;
  isMega: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  type: "ember" | "wisp" | "dust";
  angle: number;
  orbitRadius: number;
  orbitSpeed: number;
}

function genLightning(
  x1: number, y1: number, x2: number, y2: number,
  depth: number, spread: number
): { x: number; y: number }[] {
  if (depth === 0) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 2) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
  const px = -dy / len, py = dx / len;
  const d = (Math.random() - 0.5) * spread * len;
  const left = genLightning(x1, y1, mx + px * d, my + py * d, depth - 1, spread * 0.6);
  const right = genLightning(mx + px * d, my + py * d, x2, y2, depth - 1, spread * 0.6);
  return [...left.slice(0, -1), ...right];
}

export default function PortalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctxRaw = canvas.getContext("2d");
    if (!ctxRaw) return;
    const ctx: CanvasRenderingContext2D = ctxRaw;

    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const R = 235; // inner void radius

    let time = 0;
    const particles: Particle[] = [];
    const bolts: LightningBolt[] = [];
    let animFrame = 0;

    // Jagged radius with layered frequencies — creates organic, irregular ring shape
    const jagR = (a: number, t: number, phase = 0) =>
      R * (1
        + 0.062 * Math.sin(a * 5  + t * 0.018 + phase)
        + 0.045 * Math.sin(a * 11 - t * 0.013 + phase * 1.3)
        + 0.03  * Math.sin(a * 19 + t * 0.027 + phase * 0.7)
        + 0.018 * Math.sin(a * 31 - t * 0.02  + phase * 1.9)
      );

    // ── Spawn helpers ─────────────────────────────────────────────────────────

    function spawnEmber() {
      const a = Math.random() * Math.PI * 2;
      const r = R * (0.93 + Math.random() * 0.25);
      particles.push({
        x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r,
        vx: Math.cos(a) * (0.7 + Math.random() * 2),
        vy: Math.sin(a) * (0.7 + Math.random() * 2) - 0.4,
        life: 0, maxLife: 55 + Math.random() * 80,
        size: 1.3 + Math.random() * 2.2,
        type: "ember", angle: 0, orbitRadius: 0, orbitSpeed: 0,
      });
    }

    function spawnWisp() {
      particles.push({
        x: 0, y: 0, vx: 0, vy: 0,
        life: 0, maxLife: 150 + Math.random() * 110,
        size: 2.5 + Math.random() * 3.5,
        type: "wisp",
        angle: Math.random() * Math.PI * 2,
        orbitRadius: R * (0.84 + Math.random() * 0.22),
        orbitSpeed: (Math.random() > 0.5 ? 1 : -1) * (0.005 + Math.random() * 0.008),
      });
    }

    function spawnDust() {
      particles.push({
        x: cx + (Math.random() - 0.5) * W * 0.9,
        y: Math.random() * H * 0.45,
        vx: (Math.random() - 0.5) * 0.35, vy: 0.25 + Math.random() * 0.55,
        life: 0, maxLife: 250 + Math.random() * 200,
        size: 0.5 + Math.random() * 1.1,
        type: "dust", angle: 0, orbitRadius: 0, orbitSpeed: 0,
      });
    }

    function spawnRimBolt() {
      const a1 = Math.random() * Math.PI * 2;
      const span = (0.35 + Math.random() * 0.75) * Math.PI;
      const a2 = a1 + (Math.random() > 0.5 ? 1 : -1) * span;
      bolts.push({
        points: genLightning(cx + Math.cos(a1) * R, cy + Math.sin(a1) * R,
                             cx + Math.cos(a2) * R, cy + Math.sin(a2) * R, 4, 0.32),
        life: 0, maxLife: 55 + Math.random() * 60,
        opacity: 0.8 + Math.random() * 0.2, width: 1.2 + Math.random() * 1.8, isMega: false,
      });
    }

    function spawnInwardBolt() {
      const a = Math.random() * Math.PI * 2;
      const dist = R * (0.1 + Math.random() * 0.4);
      bolts.push({
        points: genLightning(cx + Math.cos(a) * R, cy + Math.sin(a) * R,
                             cx + Math.cos(a) * dist, cy + Math.sin(a) * dist, 4, 0.45),
        life: 0, maxLife: 40 + Math.random() * 45,
        opacity: 0.6 + Math.random() * 0.3, width: 0.9 + Math.random() * 1.1, isMega: false,
      });
    }

    function spawnMegaBolt() {
      const a = Math.random() * Math.PI * 2;
      bolts.push({
        points: genLightning(cx + Math.cos(a) * R, cy + Math.sin(a) * R,
                             cx + Math.cos(a + Math.PI + (Math.random() - 0.5) * 0.5) * R,
                             cy + Math.sin(a + Math.PI + (Math.random() - 0.5) * 0.5) * R, 5, 0.38),
        life: 0, maxLife: 45 + Math.random() * 40,
        opacity: 1, width: 2.8 + Math.random() * 2, isMega: true,
      });
    }

    // Pre-populate
    for (let i = 0; i < 20; i++) spawnWisp();
    for (let i = 0; i < 28; i++) spawnEmber();
    for (let i = 0; i < 18; i++) spawnDust();
    for (let i = 0; i < 8; i++) spawnRimBolt();
    for (let i = 0; i < 5; i++) spawnInwardBolt();
    for (let i = 0; i < 2; i++) spawnMegaBolt();

    // ── Render loop ───────────────────────────────────────────────────────────

    function render() {
      ctx.clearRect(0, 0, W, H);
      const t = time;
      const segs = 200;

      // ═══════════════════════════════════════════════════
      // ADDITIVE PHASE — everything here adds light on top
      // ═══════════════════════════════════════════════════
      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      // 1. FAR OUTER ATMOSPHERIC BLOOM
      const bloom = ctx.createRadialGradient(cx, cy, R * 0.5, cx, cy, R * 2.1);
      bloom.addColorStop(0,   `rgba(90,40,200,${0.10 + 0.04 * Math.sin(t * 0.022)})`);
      bloom.addColorStop(0.3, `rgba(110,60,220,${0.14 + 0.05 * Math.sin(t * 0.022)})`);
      bloom.addColorStop(0.6, "rgba(55,12,150,0.07)");
      bloom.addColorStop(1,   "rgba(0,0,0,0)");
      ctx.fillStyle = bloom;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // 2. RING PLASMA — 7 overlapping stroke passes, each with a different
      //    jagged phase, color, width, and radius offset.
      //    Additive blending means their colors accumulate into bright plasma.
      const RING_PASSES: { color: string; alpha: number; width: number; rAdd: number; phase: number }[] = [
        { color: "rgba(30,100,220,1)",  alpha: 0.20, width: 70,  rAdd: 18,  phase: 0    },
        { color: "rgba(90,40,240,1)",   alpha: 0.22, width: 55,  rAdd: 6,   phase: 1.2  },
        { color: "rgba(50,170,255,1)",  alpha: 0.24, width: 38,  rAdd: -4,  phase: 2.5  },
        { color: "rgba(160,70,255,1)",  alpha: 0.18, width: 75,  rAdd: 22,  phase: 0.6  },
        { color: "rgba(100,210,255,1)", alpha: 0.20, width: 22,  rAdd: -8,  phase: 3.7  },
        { color: "rgba(200,120,255,1)", alpha: 0.10, width: 90,  rAdd: 28,  phase: 1.85 },
        { color: "rgba(255,200,255,1)", alpha: 0.06, width: 110, rAdd: 35,  phase: 4.2  },
      ];

      for (const pass of RING_PASSES) {
        ctx.globalAlpha = pass.alpha;
        ctx.strokeStyle = pass.color;
        ctx.lineWidth = pass.width;
        ctx.beginPath();
        for (let i = 0; i <= segs; i++) {
          const a = (i / segs) * Math.PI * 2;
          const r = jagR(a, t, pass.phase) + pass.rAdd;
          if (i === 0) ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
          else ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // 3. PLASMA FIBER TEXTURE
      // 60 short random arc segments each frame — creates the chaotic electric
      // texture on the ring surface. Math.random() here is intentional; the
      // per-frame randomness produces the flickering electric look.
      ctx.globalAlpha = 0.07;
      for (let i = 0; i < 60; i++) {
        const a = Math.random() * Math.PI * 2;
        const rNoise = R + 15 * Math.sin(a * 7 + t * 0.025) - 10 * Math.cos(a * 13 - t * 0.018);
        const span = (0.04 + Math.random() * 0.18) * (Math.random() > 0.5 ? 1 : -1);
        ctx.strokeStyle = Math.random() > 0.45 ? "rgba(100,210,255,1)" : "rgba(180,80,255,1)";
        ctx.lineWidth = 2 + Math.random() * 9;
        ctx.beginPath();
        ctx.arc(cx, cy, rNoise, a, a + span);
        ctx.stroke();
      }

      // 4. BRIGHT INNER HOT EDGE — the cyan "plasma boundary" line
      const hotPulse = 0.65 + 0.2 * Math.sin(t * 0.028);
      ctx.globalAlpha = hotPulse;
      ctx.strokeStyle = "rgba(180,240,255,1)";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "rgba(150,230,255,1)";
      ctx.shadowBlur = 22;
      ctx.beginPath();
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        const r = jagR(a, t, 0);
        if (i === 0) ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        else ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 5. LIGHTNING BOLTS (additive)
      for (const bolt of bolts) {
        const prog = bolt.life / bolt.maxLife;
        const alpha = bolt.opacity * Math.sin(prog * Math.PI);
        const glow = bolt.isMega ? 18 : 9;

        // Soft outer glow pass
        ctx.globalAlpha = alpha * 0.45;
        ctx.strokeStyle = bolt.isMega ? "rgba(80,160,255,0.5)" : "rgba(100,200,255,0.35)";
        ctx.lineWidth = bolt.width * 5;
        ctx.beginPath();
        bolt.points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.stroke();

        // Main bolt
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = "rgba(130,215,255,1)";
        ctx.lineWidth = bolt.width;
        ctx.shadowColor = "rgba(130,215,255,1)";
        ctx.shadowBlur = glow;
        ctx.beginPath();
        bolt.points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.stroke();

        // White-hot core
        ctx.globalAlpha = alpha * 0.7;
        ctx.strokeStyle = "rgba(230,245,255,1)";
        ctx.lineWidth = bolt.width * 0.3;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        bolt.points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.stroke();
        ctx.shadowBlur = 0;

        bolt.life++;
      }

      // 6. WISPS — orbital glow dots
      for (const p of particles) {
        if (p.type !== "wisp") continue;
        p.angle += p.orbitSpeed;
        p.x = cx + Math.cos(p.angle) * p.orbitRadius;
        p.y = cy + Math.sin(p.angle) * p.orbitRadius;
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.32;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "rgba(130,215,255,1)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.life++;
      }

      // 7. EMBERS — bright sparks drifting outward
      for (const p of particles) {
        if (p.type !== "ember") continue;
        p.x += p.vx; p.y += p.vy; p.vy -= 0.018;
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.95;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "rgba(150,225,255,1)";
        ctx.shadowColor = "rgba(130,215,255,0.8)";
        ctx.shadowBlur = 7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        p.life++;
      }

      ctx.restore(); // ── end additive phase ────────────────────────────────

      // ═══════════════════════════════════════════════════
      // NORMAL PHASE — drawn on top, darkens the void center
      // ═══════════════════════════════════════════════════

      // 8. INNER VOID — dark center drawn over the additive glow
      const voidG = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      voidG.addColorStop(0,    "rgba(8,2,20,0.97)");
      voidG.addColorStop(0.5,  "rgba(8,2,20,0.95)");
      voidG.addColorStop(0.82, "rgba(8,2,20,0.75)");
      voidG.addColorStop(0.92, "rgba(8,2,20,0.3)");
      voidG.addColorStop(1,    "rgba(8,2,20,0)");
      ctx.fillStyle = voidG;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // 9. SUBTLE INNER SWIRL — slow moving highlight inside void
      const swX = cx + R * 0.1 * Math.cos(t * 0.007);
      const swY = cy + R * 0.1 * Math.sin(t * 0.007);
      const swirlG = ctx.createRadialGradient(swX, swY, 0, cx, cy, R * 0.75);
      swirlG.addColorStop(0, "rgba(45,12,90,0.3)");
      swirlG.addColorStop(0.5, "rgba(15,4,40,0.1)");
      swirlG.addColorStop(1, "rgba(0,0,0,0)");
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.96, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = swirlG;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // 10. DUST MOTES — warm debris, drawn normally over everything
      for (const p of particles) {
        if (p.type !== "dust") continue;
        p.x += p.vx; p.y += p.vy;
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.2;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "rgba(200,155,120,1)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.life++;
      }
      ctx.globalAlpha = 1;

      // ── Spawn logic ────────────────────────────────────────────────────────
      let ec = 0, wc = 0, dc = 0, mc = 0;
      for (const p of particles) {
        if (p.type === "ember") ec++;
        else if (p.type === "wisp") wc++;
        else dc++;
      }
      for (const b of bolts) if (b.isMega) mc++;

      if (t % 2  === 0 && ec < 60) spawnEmber();
      if (t % 24 === 0 && wc < 28) spawnWisp();
      if (t % 11 === 0 && dc < 38) spawnDust();
      if (t % 7  === 0 && bolts.length < 30) spawnRimBolt();
      if (t % 11 === 0 && bolts.length < 40) spawnInwardBolt();
      if (t % 52 === 0 && mc < 3) spawnMegaBolt();

      // Cleanup dead elements
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].life >= particles[i].maxLife) particles.splice(i, 1);
      }
      for (let i = bolts.length - 1; i >= 0; i--) {
        if (bolts[i].life >= bolts[i].maxLife) bolts.splice(i, 1);
      }

      time++;
      animFrame = requestAnimationFrame(render);
    }

    render();
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={700}
      className="absolute pointer-events-none"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(90vmin, 700px)",
        height: "min(90vmin, 700px)",
        zIndex: 1,
      }}
    />
  );
}
