"use client";

import { Instagram, Linkedin, Github, Mail, Phone, MapPin, ArrowUp } from "lucide-react";

const NAV_LINKS = [
  { label: "About",      id: "about-me"        },
  { label: "Education",  id: "education"       },
  { label: "Skills",     id: "skills"          },
  { label: "Projects",   id: "project"         },
  { label: "Experience", id: "work-experience" },
];

const SOCIALS = [
  { Icon: Instagram, href: "https://www.instagram.com/muizkmz/",                       label: "INSTAGRAM" },
  { Icon: Linkedin,  href: "https://linkedin.com/in/muizzuddin-kamarozamaan",          label: "LINKEDIN"  },
  { Icon: Github,    href: "https://github.com/muizkamarozaman",                       label: "GITHUB"    },
];

export default function Footer() {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(8,2,22,1) 0%, rgba(4,1,14,1) 100%)",
        paddingTop: 64,
        paddingBottom: 32,
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.85) 30%, rgba(99,102,241,0.85) 70%, transparent 100%)",
          boxShadow: "0 0 14px rgba(168,85,247,0.5)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.35,
          backgroundImage:
            "linear-gradient(rgba(168,85,247,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-12">

        {/* ── BRAND ROW ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h3
              style={{
                fontFamily: "Yozakura, sans-serif",
                fontSize: "36px",
                color: "rgba(255,255,255,0.95)",
                letterSpacing: "0.04em",
                lineHeight: 1,
                textShadow: "0 0 25px rgba(168,85,247,0.35)",
              }}
            >
              MUIZ_K
            </h3>
            <p
              className="mt-2 flex items-center gap-3"
              style={{
                fontFamily: "FF Identification, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.24em",
                color: "rgba(168,85,247,0.7)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(168,85,247,1)",
                  boxShadow: "0 0 8px rgba(168,85,247,0.8)",
                }}
              />
              SOFTWARE ENGINEER · MALAYSIA
            </p>
          </div>

          {/* Social icons row */}
          <div className="flex gap-5">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="social-icon"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 38,
                  height: 38,
                  border: "1px solid rgba(168,85,247,0.25)",
                  background: "rgba(133,39,227,0.04)",
                }}
              >
                <Icon size={16} strokeWidth={1.6} />
              </a>
            ))}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, rgba(168,85,247,0.4) 0%, transparent 80%)",
            marginBottom: 40,
          }}
        />

        {/* ── COLUMNS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* CONTACT */}
          <div>
            <h4
              className="mb-5"
              style={{
                fontFamily: "FF Identification, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.24em",
                color: "rgba(168,85,247,0.85)",
              }}
            >
              _ CONTACT
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:muizkamarozaman@gmail.com"
                  className="flex items-center gap-3 group"
                  style={{
                    fontFamily: "Showcase Sans mini, sans-serif",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(168,85,247,1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                >
                  <Mail size={13} strokeWidth={1.6} style={{ color: "rgba(168,85,247,0.7)" }} />
                  muizkamarozaman@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+60177351336"
                  className="flex items-center gap-3"
                  style={{
                    fontFamily: "Showcase Sans mini, sans-serif",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(168,85,247,1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                >
                  <Phone size={13} strokeWidth={1.6} style={{ color: "rgba(168,85,247,0.7)" }} />
                  +60 17-735 1336
                </a>
              </li>
              <li>
                <span
                  className="flex items-center gap-3"
                  style={{
                    fontFamily: "Showcase Sans mini, sans-serif",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <MapPin size={13} strokeWidth={1.6} style={{ color: "rgba(168,85,247,0.7)" }} />
                  Rembau, Negeri Sembilan
                </span>
              </li>
            </ul>
          </div>

          {/* NAVIGATE */}
          <div>
            <h4
              className="mb-5"
              style={{
                fontFamily: "FF Identification, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.24em",
                color: "rgba(168,85,247,0.85)",
              }}
            >
              _ NAVIGATE
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    style={{
                      fontFamily: "Showcase Sans mini, sans-serif",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.65)",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "color 0.2s, padding-left 0.2s",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "rgba(168,85,247,1)";
                      e.currentTarget.style.paddingLeft = "8px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                      e.currentTarget.style.paddingLeft = "0px";
                    }}
                  >
                    → {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h4
              className="mb-5"
              style={{
                fontFamily: "FF Identification, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.24em",
                color: "rgba(168,85,247,0.85)",
              }}
            >
              _ RESOURCES
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/Muizzuddin_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "Showcase Sans mini, sans-serif",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(168,85,247,1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                >
                  ↓ Download Resume (PDF)
                </a>
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  style={{
                    fontFamily: "Showcase Sans mini, sans-serif",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.7)",
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(168,85,247,1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                >
                  <ArrowUp size={13} strokeWidth={1.6} />
                  Back to top
                </button>
              </li>
              <li>
                <span
                  style={{
                    fontFamily: "FF Identification, sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.22em",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  EN · FLUENT  /  MS · NATIVE
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── BOTTOM DIVIDER ── */}
        <div
          style={{
            height: 1,
            background: "rgba(168,85,247,0.12)",
            marginBottom: 24,
          }}
        />

        {/* ── COPYRIGHT ROW ── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            style={{
              fontFamily: "FF Identification, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            © 2026 MUHAMMAD MUIZZUDDIN · ALL RIGHTS RESERVED
          </p>
          <p
            style={{
              fontFamily: "FF Identification, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.22em",
              color: "rgba(168,85,247,0.5)",
            }}
          >
            BUILT WITH NEXT.JS · GSAP · TAILWIND
          </p>
        </div>
      </div>
    </footer>
  );
}
