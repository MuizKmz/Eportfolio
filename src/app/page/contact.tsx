"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, Send, CheckCircle, AlertCircle, Loader } from "lucide-react";
import emailjs from "@emailjs/browser";

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "EMAIL",
    value: "muizkamarozaman@gmail.com",
    href: "mailto:muizkamarozaman@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LINKEDIN",
    value: "muizzuddin-kamarozamaan",
    href: "https://linkedin.com/in/muizzuddin-kamarozamaan",
  },
  {
    icon: Github,
    label: "GITHUB",
    value: "muizkamarozaman",
    href: "https://github.com/muizkamarozaman",
  },
];

function HUDCorner({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const isT = corner[0] === "t", isL = corner[1] === "l";
  return (
    <div style={{
      position: "absolute",
      [isT ? "top" : "bottom"]: 0,
      [isL ? "left" : "right"]: 0,
      width: 22, height: 22,
      pointerEvents: "none",
    }}>
      <svg width="22" height="22" viewBox="0 0 22 22"
        style={{ transform: `scale(${isL ? 1 : -1},${isT ? 1 : -1})`, transformOrigin: "50% 50%", filter: "drop-shadow(0 0 3px rgba(168,85,247,0.9))" }}>
        <line x1="2" y1="5" x2="2" y2="18" stroke="rgba(210,140,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="5" y1="2" x2="18" y2="2" stroke="rgba(210,140,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
        <polygon points="2,0 5,2 2,5 0,2" fill="rgba(230,170,255,1)" />
      </svg>
    </div>
  );
}

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-80px" });

  const [status, setStatus]   = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "rgba(8,2,22,0.85)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(168,85,247,0.2)",
    padding: "14px 18px",
    color: "rgba(255,255,255,0.88)",
    fontFamily: "Showcase Sans mini, sans-serif",
    fontSize: "18px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    lineHeight: 1.5,
  };

  const inputFocused: React.CSSProperties = {
    borderColor: "rgba(168,85,247,0.75)",
    boxShadow: "0 0 0 1px rgba(168,85,247,0.25), 0 0 16px rgba(168,85,247,0.12)",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen relative flex flex-col items-center justify-center px-6 py-24"
      style={{ background: "rgba(8,2,20,1)" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(60,15,130,0.18) 0%, transparent 70%)",
      }} />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.1) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
        maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
      }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <motion.div className="flex items-end justify-between mb-3 gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-baseline gap-4">
            <h2 style={{
              fontFamily: "Yozakura, sans-serif",
              fontSize: "clamp(48px, 8vw, 96px)",
              color: "rgba(255,255,255,0.97)",
              textShadow: "0 0 40px rgba(168,85,247,0.65), 0 4px 10px rgba(0,0,0,0.5)",
              letterSpacing: "0.04em",
              lineHeight: 0.95,
            }}>
              GET IN TOUCH
            </h2>
            <span className="hidden md:inline" style={{
              fontFamily: "Karasu, sans-serif", fontSize: "15px",
              letterSpacing: "0.22em", color: "rgba(168,85,247,0.7)", paddingBottom: "8px",
            }}>
              _ GATE.007
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: "8px" }}>
            <motion.div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "rgba(100,255,160,1)",
              boxShadow: "0 0 10px rgba(100,255,160,0.8)",
            }} animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            <span style={{
              fontFamily: "Karasu, sans-serif", fontSize: "14px",
              letterSpacing: "0.2em", color: "rgba(100,255,160,0.85)",
            }}>
              GATE STATUS: OPEN
            </span>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div className="w-full h-px mb-14"
          style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.85), rgba(99,102,241,0.55), transparent)", transformOrigin: "left" }}
          initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.14 }}
        />

        {/* ── Main two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* ── LEFT: description + contact info ── */}
          <motion.div className="flex flex-col gap-8 lg:w-[38%]"
            initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <div>
              <p style={{
                fontFamily: "Showcase Sans mini, sans-serif",
                fontSize: "20px",
                color: "rgba(255,255,255,0.62)",
                lineHeight: 1.85,
                letterSpacing: "0.03em",
              }}>
                Open to new opportunities, collaborations, and projects.
                Whether you have a role in mind or just want to connect —
                send a signal and I will respond.
              </p>
            </div>

            {/* Contact info rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }, i) => (
                <motion.a key={label} href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 18px",
                    background: "rgba(10,3,25,0.5)",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(168,85,247,0.15)",
                    textDecoration: "none",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.5)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(20,5,45,0.7)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.15)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(10,3,25,0.5)";
                  }}
                >
                  <div style={{
                    width: 36, height: 36, flexShrink: 0,
                    borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(168,85,247,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(133,39,227,0.06)",
                  }}>
                    <Icon size={18} strokeWidth={1.5} style={{ color: "rgba(168,85,247,0.9)" }} />
                  </div>
                  <div>
                    <span style={{
                      display: "block", fontFamily: "Karasu, sans-serif",
                      fontSize: "13px", letterSpacing: "0.24em",
                      color: "rgba(168,85,247,0.7)", marginBottom: 4,
                    }}>{label}</span>
                    <span style={{
                      display: "block", fontFamily: "Showcase Sans mini, sans-serif",
                      fontSize: "17px", color: "rgba(255,255,255,0.78)",
                    }}>{value}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: contact form panel ── */}
          <motion.div className="flex-1 w-full relative"
            initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          >
            <div style={{
              position: "relative",
              background: "linear-gradient(135deg, rgba(25,6,60,0.65) 0%, rgba(8,2,22,0.95) 100%)",
              borderWidth: "1px", borderStyle: "solid", borderColor: "rgba(168,85,247,0.22)",
              padding: "32px 28px",
              overflow: "hidden",
            }}>
              <HUDCorner corner="tl" />
              <HUDCorner corner="tr" />
              <HUDCorner corner="bl" />
              <HUDCorner corner="br" />

              {/* Pulsing top edge */}
              <motion.div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.95) 30%, rgba(168,85,247,0.95) 70%, transparent)",
                boxShadow: "0 0 10px rgba(168,85,247,0.6)",
              }} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }} />

              {/* Scan lines */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(168,85,247,0.012) 3px, rgba(168,85,247,0.012) 4px)",
              }} />

              {/* Panel header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                <span style={{
                  fontFamily: "Karasu, sans-serif", fontSize: "14px",
                  letterSpacing: "0.24em", color: "rgba(168,85,247,0.8)",
                }}>
                  ▸ TRANSMISSION DATA
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{
                    width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
                    background: "rgba(100,255,160,1)",
                    boxShadow: "0 0 6px rgba(100,255,160,0.9)",
                    animation: "system-pulse 1.2s ease-in-out infinite",
                    marginTop: -2,
                  }} />
                  <span style={{
                    fontFamily: "Karasu, sans-serif", fontSize: "13px",
                    letterSpacing: "0.18em", color: "rgba(100,255,160,0.85)",
                  }}>
                    SECURE CHANNEL: ACTIVE
                  </span>
                </div>
              </div>

              {/* Form */}
              <form ref={formRef} onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Name */}
                    <div>
                      <label style={{
                        display: "block", fontFamily: "Karasu, sans-serif",
                        fontSize: "13px", letterSpacing: "0.22em",
                        color: "rgba(168,85,247,0.7)", marginBottom: 7,
                      }}>
                        HUNTER NAME
                      </label>
                      <input
                        type="text"
                        name="from_name"
                        required
                        placeholder="Your name"
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        style={{ ...inputBase, ...(focused === "name" ? inputFocused : {}) }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{
                        display: "block", fontFamily: "Karasu, sans-serif",
                        fontSize: "13px", letterSpacing: "0.22em",
                        color: "rgba(168,85,247,0.7)", marginBottom: 7,
                      }}>
                        CONTACT PROTOCOL
                      </label>
                      <input
                        type="email"
                        name="from_email"
                        required
                        placeholder="your@email.com"
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        style={{ ...inputBase, ...(focused === "email" ? inputFocused : {}) }}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{
                      display: "block", fontFamily: "Karasu, sans-serif",
                      fontSize: "13px", letterSpacing: "0.24em",
                      color: "rgba(168,85,247,0.6)", marginBottom: 6,
                    }}>
                      MESSAGE PAYLOAD
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="What would you like to discuss?"
                      onFocus={() => setFocused("msg")}
                      onBlur={() => setFocused(null)}
                      style={{
                        ...inputBase,
                        resize: "vertical",
                        minHeight: 120,
                        ...(focused === "msg" ? inputFocused : {}),
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending" || status === "success"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      padding: "14px 24px",
                      background: status === "success"
                        ? "linear-gradient(135deg, rgba(20,120,60,0.6) 0%, rgba(40,180,90,0.3) 100%)"
                        : "linear-gradient(135deg, rgba(100,20,200,0.6) 0%, rgba(168,85,247,0.3) 100%)",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: status === "success" ? "rgba(100,220,140,0.6)" : "rgba(168,85,247,0.6)",
                      boxShadow: status === "success"
                        ? "0 0 20px rgba(80,220,120,0.2)"
                        : "0 0 20px rgba(168,85,247,0.2)",
                      cursor: status === "sending" || status === "success" ? "not-allowed" : "pointer",
                      width: "100%",
                      transition: "all 0.3s ease",
                      opacity: status === "sending" ? 0.75 : 1,
                    }}
                    onMouseEnter={e => {
                      if (status === "idle" || status === "error") {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 35px rgba(168,85,247,0.45)";
                      }
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(168,85,247,0.2)";
                    }}
                  >
                    {status === "sending" && <Loader size={18} strokeWidth={1.8} style={{ animation: "spin 1s linear infinite", color: "rgba(200,160,255,1)" }} />}
                    {status === "success" && <CheckCircle size={18} strokeWidth={1.8} style={{ color: "rgba(100,240,150,1)" }} />}
                    {status === "error"   && <AlertCircle size={18} strokeWidth={1.8} style={{ color: "rgba(255,120,100,1)" }} />}
                    {(status === "idle" || status === "sending") && status !== "sending" && <Send size={18} strokeWidth={1.8} style={{ color: "rgba(200,160,255,1)" }} />}

                    <span style={{
                      fontFamily: "Showcase Sans mini, sans-serif",
                      fontSize: "18px",
                      letterSpacing: "0.18em",
                      color: status === "success"
                        ? "rgba(100,240,150,1)"
                        : status === "error"
                        ? "rgba(255,160,140,1)"
                        : "rgba(220,170,255,1)",
                      textShadow: status === "success"
                        ? "0 0 12px rgba(80,220,120,0.7)"
                        : "0 0 12px rgba(168,85,247,0.7)",
                    }}>
                      {status === "idle"    && "TRANSMIT SIGNAL"}
                      {status === "sending" && "TRANSMITTING..."}
                      {status === "success" && "SIGNAL RECEIVED"}
                      {status === "error"   && "TRANSMISSION FAILED — RETRY"}
                    </span>
                  </button>

                  {/* Error hint */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        style={{
                          fontFamily: "Karasu, sans-serif", fontSize: "12px",
                          letterSpacing: "0.16em", color: "rgba(255,140,120,0.8)",
                          textAlign: "center",
                        }}
                      >
                        Check your EmailJS credentials in .env.local and try again.
                      </motion.p>
                    )}
                  </AnimatePresence>

                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Input focus glow style — injected inline */}
      <style>{`
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.22); }
        input:-webkit-autofill, textarea:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px rgba(8,2,22,1) inset !important;
          -webkit-text-fill-color: rgba(255,255,255,0.88) !important;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
