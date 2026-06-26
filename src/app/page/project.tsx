"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Recycle, Snowflake, Activity, ChevronRight, ChevronLeft, ExternalLink, Server, Shield, Package, Bot, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─────────── Types ───────────
interface Phase {
  num: string;
  title: string;
  subtitle: string;
  body: string;
  tech: string[];
}
// Flexible, project-specific detail content shown in the modal.
type FeatureItem = string | { label: string; text: string };
interface FeatureGroup {
  heading: string;
  items: FeatureItem[];
}
interface DetailSection {
  title: string;          // e.g. "Project Overview", "Key Features"
  body?: string;          // paragraph copy
  groups?: FeatureGroup[]; // grouped bullet lists
}
interface Project {
  id: string;
  codename: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  link: string;
  image?: string;
  video?: string;
  screenshots?: string[];
  Icon: LucideIcon;
  phases: Phase[];
  details: DetailSection[];
}

// ─────────── Data ───────────
const PROJECTS: Project[] = [
  {
    id: "WMA · 001",
    codename: "WASTE",
    title: "Waste Management App",
    tagline: "PAYT - Mobile Application",
    description:
      "Final Year Project — (Pay as You Throw) a mobile application that educates and incentivises users to adopt sustainable waste management practices. Built end-to-end as the capstone of my Software Engineering degree at UTM.",
    tags: ["Flutter", "Dart", "Firebase", "Android Studio"],
    link: "#",
    video: "/images/payt/video/payt.mp4",
    screenshots: [
      "/images/payt/image/6192760392187056835%20(1).jpg",
      "/images/payt/image/6192760392187056836%20(1).jpg",
      "/images/payt/image/6192760392187056837%20(1).jpg",
      "/images/payt/image/6192760392187056838%20(1).jpg",
      "/images/payt/image/6192760392187056839%20(1).jpg",
      "/images/payt/image/6192760392187056840%20(2).jpg",
      "/images/payt/image/6192760392187056841%20(2).jpg",
    ],
    Icon: Recycle,
    details: [
      {
        title: "Project Overview",
        body: "Final Year Project and the capstone of my Software Engineering degree at UTM — a cross-platform mobile app that educates and incentivises users to adopt sustainable waste-management habits, turning everyday waste sorting into a gamified, reward-driven routine. Built end-to-end from concept and UX through to a working Flutter + Firebase product.",
      },
      {
        title: "Key Features",
        groups: [
          {
            heading: "Gamified Experience",
            items: [
              "Incentive-driven waste sorting that reinforces sustainable behaviour daily",
              "UX designed in Figma around real behaviour-change principles",
              "Educational content paired with reward mechanics to drive retention",
            ],
          },
          {
            heading: "Cross-Platform Architecture",
            items: [
              { label: "Flutter + Dart", text: "single codebase delivered across Android and iOS" },
              { label: "Firebase", text: "real-time data, authentication, and cloud storage" },
            ],
          },
          {
            heading: "Engineering Workflow",
            items: [
              { label: "Jira", text: "agile sprint planning across the full project lifecycle" },
              { label: "GitHub", text: "feature-branch workflow with clean commit history and code review" },
            ],
          },
        ],
      },
    ],
    phases: [
      {
        num: "01",
        title: "The Vision",
        subtitle: "From problem to product",
        body: "Identified an opportunity in sustainable behaviour change — most users know recycling matters but lack daily reinforcement. Designed a mobile experience that turns waste sorting into a gamified, incentive-driven habit.",
        tech: ["Figma", "Enterprise Architecture", "UI/UX"],
      },
      {
        num: "02",
        title: "The Build",
        subtitle: "Flutter + Firebase architecture",
        body: "Engineered the full stack using Flutter and Dart for cross-platform delivery, backed by Firebase for real-time data, authentication, and cloud storage.",
        tech: ["Flutter", "Dart", "Firebase", "Android Studio"],
      },
      {
        num: "03",
        title: "The Workflow",
        subtitle: "Agile sprints + version control",
        body: "Managed the project lifecycle using Jira for sprint planning and GitHub for code review. Maintained a clean commit history and feature-branch workflow throughout.",
        tech: ["Jira", "GitHub", "Agile"],
      },
    ],
  },
  {
    id: "SCM · 002",
    codename: "FROSTEDGE",
    title: "SmartArctic Smart Freezer",
    tagline: "IoT smart freezer platform",
    description:
      "An IoT cold-chain monitoring platform (branded SmartArctic / Frost Edge, built for Evolve) for tracking refrigerated and freezer assets remotely — temperature, power consumption, GPS location, and alerting — with a built-in technician and maintenance workflow. Architected as a multi-tenant B2B monitoring product around a clean 8-table relational schema.",
    tags: ["MySQL", "Database Design", "System Architecture", "IoT", "Figma"],
    link: "#",
    video: "/images/smartfreezer/video/smartfreezer.mp4",
    screenshots: [
      "/images/smartfreezer/image/s1.png",
      "/images/smartfreezer/image/s2.png",
      "/images/smartfreezer/image/s3.png",
      "/images/smartfreezer/image/s4.png",
      "/images/smartfreezer/image/s5.png",
    ],
    Icon: Snowflake,
    details: [
      {
        title: "Project Overview",
        body: "SmartArctic (also referenced as Frost Edge) is an IoT cold-chain monitoring platform designed for clients managing distributed cold-storage equipment — tracking temperature, power consumption, and GPS location with real-time alerting and a technician/maintenance workflow built in. Delivered as system and database design: a confirmed 8-table relational schema and a full UI branding/icon set, positioned as the architecture for a multi-tenant B2B monitoring product.",
      },
      {
        title: "Database Design",
        groups: [
          {
            heading: "8-table multi-tenant cold-chain schema",
            items: [
              { label: "users / user_logs", text: "platform accounts plus an audit trail of every user action" },
              { label: "clients / assets", text: "businesses that own the monitored freezer units, each linked to their assets" },
              { label: "asset_logs", text: "time-series telemetry per asset — temperature, power, and location" },
              { label: "alerts", text: "generated events such as temperature excursions and power loss, tied to assets" },
              { label: "technician / maintenance_logs", text: "field-technician records and per-asset service history" },
            ],
          },
        ],
      },
      {
        title: "Feature Set",
        groups: [
          {
            heading: "Monitoring & operations",
            items: [
              "Multi-client asset registry — each client manages multiple cold-storage units",
              "Real-time temperature and power/electricity telemetry per asset",
              "GPS location tracking for mobile and distributed cold-chain equipment",
              { label: "ChatAlert", text: "chat-style alert UI triggered by threshold breaches" },
              "Full detection-to-resolution loop: alert → technician dispatch → maintenance log",
            ],
          },
        ],
      },
      {
        title: "AIoT Roadmap",
        groups: [
          {
            heading: "Planned enhancements (shared AIoT family with PoleSyncTech)",
            items: [
              "Anomaly-detection ML over temperature/power telemetry",
              "AI-based health scoring for monitored assets",
              "Automated PDF report generation via n8n workflow automation",
              "Weight-sensor integration for stock-level inference",
              "Camera-based spoilage detection",
            ],
          },
        ],
      },
    ],
    phases: [
      {
        num: "01",
        title: "The Schema",
        subtitle: "Normalized cold-chain data model",
        body: "Designed a clean, normalized 8-table relational schema separating asset ownership, raw telemetry, alerting, and maintenance into distinct tables with clear relational links — a pattern that scales cleanly as clients and assets grow.",
        tech: ["MySQL", "Database Design", "ER Modeling"],
      },
      {
        num: "02",
        title: "The Workflow",
        subtitle: "Detection → dispatch → resolution",
        body: "Modeled the full operational loop beyond monitoring: a raw sensor reading in asset_logs triggers an alert, which links through to a technician record and a maintenance_log entry — closing the loop from detection to resolution, with user_logs auditing every action.",
        tech: ["System Architecture", "Workflow Design", "Audit Logging"],
      },
      {
        num: "03",
        title: "The Roadmap",
        subtitle: "Forward-looking AIoT strategy",
        body: "Positioned within a documented two-product AIoT family alongside PoleSyncTech, with a planned enhancement track: anomaly-detection ML, AI health scoring, camera-based spoilage detection, and automated n8n-driven reporting.",
        tech: ["Machine Learning", "n8n", "AIoT"],
      },
    ],
  },
  {
    id: "IOT · 003",
    codename: "POLESYNC",
    title: "PoleSyncTech Smart Pole",
    tagline: "Smart-city multi-sensor IoT platform",
    description:
      "A smart-city platform turning street poles into multi-sensor IoT nodes with real-time environmental monitoring (weather, air quality, water, energy), public Wi-Fi management, camera feeds, and three distinct role-based platforms — resident QR web, authority dashboard, and maintenance mobile app.",
    tags: ["TypeScript", "Node.js", "MQTT", "Socket.IO", "MySQL", "React 19", "React Native", "Expo"],
    link: "#",
    video: "/images/smartpole/video/smartpole.mp4",
    screenshots: [
      "/images/smartpole/Image/Screenshot%202026-06-26%20112933.png",
      "/images/smartpole/Image/Screenshot%202026-06-26%20113021.png",
      "/images/smartpole/Image/Screenshot%202026-06-26%20113112.png",
      "/images/smartpole/Image/Screenshot%202026-06-26%20113158.png",
      "/images/smartpole/Image/Screenshot%202026-06-26%20113256.png",
      "/images/smartpole/Image/Screenshot%202026-06-26%20113330.png",
    ],
    Icon: Server,
    details: [
      {
        title: "Project Overview",
        body: "A smart-city platform that turns ordinary street poles into multi-sensor IoT nodes — delivering real-time environmental monitoring, public Wi-Fi management, and live camera feeds across three distinct role-based platforms: a resident QR web flow, an authority dashboard, and a maintenance mobile app.",
      },
      {
        title: "Real-Time Data Pipeline",
        groups: [
          {
            heading: "MQTT → Node.js → MySQL → Socket.IO",
            items: [
              { label: "Express 5 MQTT client", text: "subscribes to a devices/+/data wildcard topic for all poles" },
              "Processing layer with scheduled offline-device detection",
              "Socket.IO pushes live updates to the web dashboard and mobile app simultaneously",
            ],
          },
        ],
      },
      {
        title: "Multi-Sensor Monitoring",
        groups: [
          {
            heading: "Six domains monitored per pole",
            items: [
              { label: "Weather", text: "temperature, humidity, wind, precipitation" },
              { label: "Air Quality", text: "PM2.5, PM10, SO2, NO2, O3, CO + computed AQI" },
              { label: "Water Quality", text: "dissolved oxygen, BOD, COD, pH, WQI" },
              { label: "Energy & Connectivity", text: "solar/battery metering, public Wi-Fi sessions, GPS-tagged camera feeds" },
            ],
          },
        ],
      },
      {
        title: "Three-Tier UX",
        groups: [
          {
            heading: "One platform, three audiences",
            items: [
              { label: "Resident", text: "no-login QR-code web flow — live weather, AQI, one-tap Wi-Fi connect" },
              { label: "Authority", text: "React 19 + Vite dashboard — fleet monitoring, LED control, announcements" },
              { label: "Maintenance", text: "React Native + Expo app with push alerts and photo attachments" },
            ],
          },
        ],
      },
    ],
    phases: [
      {
        num: "01",
        title: "IoT Data Pipeline",
        subtitle: "MQTT → Node.js → MySQL → Socket.IO",
        body: "Built the real-time telemetry backbone: Express 5 MQTT client subscribing to a devices/+/data wildcard topic, processing layer with scheduled offline-device detection, MySQL persistence, and Socket.IO real-time push to both the React web dashboard and React Native mobile app simultaneously.",
        tech: ["MQTT", "Express 5", "TypeScript", "MySQL", "Socket.IO"],
      },
      {
        num: "02",
        title: "Multi-Sensor Fusion",
        subtitle: "Weather · Air Quality · Water · Energy · Wi-Fi",
        body: "Implemented simultaneous monitoring of six domains per pole: weather (temperature, humidity, wind, precipitation), air quality (PM2.5, PM10, SO2, NO2, O3, CO + AQI), water quality (dissolved oxygen, BOD, COD, pH, WQI), solar/battery energy, public Wi-Fi session metering, and GPS-tagged camera feeds.",
        tech: ["IoT", "MySQL", "Node.js", "Sensor Fusion"],
      },
      {
        num: "03",
        title: "Three-Tier UX",
        subtitle: "QR public · Authority dashboard · Maintenance app",
        body: "Designed three distinct user experiences: a no-login QR-code web flow for residents (live weather, AQI, Wi-Fi connect), an authenticated React 19 + Vite dashboard for authorities (fleet monitoring, LED control, announcements), and a React Native + Expo mobile app for maintenance crews with push alerts and photo attachments.",
        tech: ["React 19", "Vite", "Tailwind CSS", "React Native", "Expo", "Laravel"],
      },
    ],
  },
  {
    id: "INS · 004",
    codename: "HAPPISAFE",
    title: "HappiSafe Insurtech Platform",
    tagline: "Multi-underwriter insurance & loyalty ecosystem",
    description:
      "A Malaysian insurtech platform (HappiSafe Ai Sdn Bhd) built over 6+ months with 400+ backend commits — two live insurer integrations, two payment gateways with RSA card tokenization, a loyalty coin engine, and a production AI chatbot with a two-agent verification pattern.",
    tags: ["Java", "Spring Boot", "MySQL", "Redis", "Vue 3", "uni-app", "OpenAI GPT-4o-mini"],
    link: "#",
    video: "/images/happi/video/happi.mp4",
    screenshots: [
      "/images/happi/image/h1.png",
      "/images/happi/image/h2.png",
      "/images/happi/image/h3.png",
      "/images/happi/image/h4.jpeg",
      "/images/happi/image/h5.jpeg",
      "/images/happi/image/h6.jpeg",
      "/images/happi/image/h7.png",
    ],
    Icon: Shield,
    details: [
      {
        title: "Project Overview",
        body: "A Malaysian insurtech platform (HappiSafe Ai Sdn Bhd) built over 6+ months with 400+ backend commits — combining two live insurer integrations, two payment gateways with RSA card tokenization, a loyalty coin engine, and a production AI chatbot built on a two-agent verification pattern.",
      },
      {
        title: "Dual Insurer Integration",
        groups: [
          {
            heading: "Two live third-party insurers",
            items: [
              { label: "Chubb", text: "REST, JWT + Azure API Management key — travel insurance" },
              { label: "Pacific / Rexit", text: "SOAP + XML, mutual TLS, e-Cover Motor API v1.7 — motor insurance" },
              "Strategy-pattern dispatch with per-insurer quote → bind → pay → finalize state machines",
            ],
          },
        ],
      },
      {
        title: "Payment Security Layer",
        groups: [
          {
            heading: "Two gateways, hardened end-to-end",
            items: [
              { label: "RSA tokenization", text: "asymmetric encryption of card data with hex-hashed payment references" },
              { label: "Razer Pay & PayDollar", text: "signature-verified async webhooks, Redis-backed duplicate-submission locks" },
              "Rebuilt the entire Jenkins CI/CD pipeline from scratch after the previous vendor team and nine custom JARs disappeared",
            ],
          },
        ],
      },
      {
        title: "AI Chatbot — Creamy",
        groups: [
          {
            heading: "Two-agent GPT-4o-mini with RAG",
            items: [
              { label: "Two-agent pattern", text: "primary responder + independent validator on OpenAI GPT-4o-mini" },
              { label: "Hybrid knowledge base", text: "database table + live Google Sheet with 5-minute Redis cache" },
              "Per-session conversation memory; prototyped earlier on n8n / LangChain / Gemini",
            ],
          },
        ],
      },
    ],
    phases: [
      {
        num: "01",
        title: "Dual Insurer Integration",
        subtitle: "Chubb REST/JWT + Pacific SOAP/mTLS",
        body: "Implemented two live third-party insurer integrations: Chubb (REST, JWT + Azure API Management key) for travel insurance and Pacific/Rexit (SOAP + XML, mutual TLS, e-Cover Motor API v1.7) for motor insurance — each with its own quote → bind → pay → finalize state machine and a strategy-pattern dispatch layer.",
        tech: ["Java", "Spring Boot", "REST API", "SOAP", "mTLS", "JWT"],
      },
      {
        num: "02",
        title: "Payment Security Layer",
        subtitle: "RSA tokenization · Razer Pay · PayDollar",
        body: "Engineered payment security across two gateways: RSA asymmetric tokenization for card data, hex-hashed cover-note payment references, signature-verified async webhooks, and Redis-backed duplicate-submission locks. Rebuilt the entire Jenkins CI/CD pipeline from scratch after the previous vendor team and nine custom JARs disappeared.",
        tech: ["Razer Pay", "PayDollar", "RSA", "Redis", "Jenkins", "AWS EC2"],
      },
      {
        num: "03",
        title: "AI Chatbot — Creamy",
        subtitle: "Two-agent GPT-4o-mini with RAG knowledge base",
        body: "Built the production AI chatbot using a primary responder + independent validator two-agent pattern powered by OpenAI GPT-4o-mini, backed by a hybrid knowledge base (database table + live Google Sheet with 5-minute Redis cache), per-session conversation memory, and a prior n8n/LangChain/Gemini prototype as proof-of-concept.",
        tech: ["OpenAI GPT-4o-mini", "Java", "Redis", "Google Sheets API", "n8n"],
      },
    ],
  },
  {
    id: "WMS · 005",
    codename: "WAREHOUSE",
    title: "WMS — Warehouse Management",
    tagline: "EPC/RFID item-level full-stack inventory system",
    description:
      "A full-stack warehouse management system built around EPC/RFID item-level tracking across the full lifecycle — PO receiving to shipping and returns — with a NestJS backend, Vue 3 admin portal, and a React Native handheld app with hand-written native Android RFID/barcode modules.",
    tags: ["NestJS", "Prisma ORM", "MySQL", "Vue 3", "React Native", "Java", "Kotlin", "Docker"],
    link: "#",
    video: "/images/wms/video/wms.mp4",
    screenshots: [
      "/images/wms/image/w1.png",
      "/images/wms/image/w2.png",
      "/images/wms/image/w3.png",
      "/images/wms/image/w4.jpg",
      "/images/wms/image/w5.jpg",
      "/images/wms/image/w6.jpg",
    ],
    Icon: Package,
    details: [
      {
        title: "Project Overview",
        body: "A full-stack warehouse management system built around EPC/RFID item-level tracking across the entire lifecycle — from PO receiving through shipping and returns — with a NestJS backend, a Vue 3 admin portal, and a React Native handheld app featuring hand-written native Android RFID/barcode modules.",
      },
      {
        title: "EPC / RFID Lifecycle",
        groups: [
          {
            heading: "Item-level tracking with FIFO allocation",
            items: [
              { label: "State machine", text: "GENERATED → INBOUND → ALLOCATED → OUTBOUND → QUARANTINE → RETURNED / DISPOSED" },
              "FIFO allocation prioritising never-returned, good-quality stock",
              "Quality grading (GOOD / DEFECTIVE / DAMAGED / UNKNOWN) across a 25-model Prisma schema",
            ],
          },
        ],
      },
      {
        title: "Native RFID Bridge",
        groups: [
          {
            heading: "Custom Java/Kotlin modules in React Native",
            items: [
              { label: "BarcodeModule, RFIDModule, ScanKeyHelper", text: "hand-written native Android modules" },
              "Bulk UHF RFID tag scanning, barcode trigger scanning, and hardware button events",
              "Bridged into React Native via NativeModules / DeviceEventEmitter on rugged industrial handhelds",
            ],
          },
        ],
      },
      {
        title: "Three-Tier Monorepo",
        groups: [
          {
            heading: "Dockerized, three coordinated apps",
            items: [
              { label: "Backend", text: "NestJS / Prisma REST API — JWT auth, 5-tier RBAC, Swagger docs" },
              { label: "Admin portal", text: "Vue 3 + Tailwind with ApexCharts dashboards and Excel/PDF export" },
              { label: "Handheld app", text: "React Native — stock-in/out, returns, cycle-counting, order-picking" },
            ],
          },
        ],
      },
    ],
    phases: [
      {
        num: "01",
        title: "EPC State Machine",
        subtitle: "Item-level lifecycle with FIFO allocation",
        body: "Designed a per-unit EPC lifecycle (GENERATED → INBOUND → ALLOCATED → OUTBOUND → QUARANTINE → RETURNED/DISPOSED) with FIFO allocation prioritising never-returned, good-quality stock, dual return flows (customer and supplier), and quality grading (GOOD/DEFECTIVE/DAMAGED/UNKNOWN) across a 25-model Prisma schema.",
        tech: ["NestJS", "Prisma ORM", "MySQL", "TypeScript", "JWT", "RBAC"],
      },
      {
        num: "02",
        title: "Native RFID Bridge",
        subtitle: "Custom Java/Kotlin Android modules in React Native",
        body: "Hand-wrote BarcodeModule, RFIDModule, and ScanKeyHelper as native Android modules in Java/Kotlin bridging RFID readers and barcode scanners into React Native via NativeModules/DeviceEventEmitter — supporting bulk UHF RFID tag scanning, barcode trigger scanning, and hardware physical-button events on rugged industrial handhelds.",
        tech: ["React Native", "Java", "Kotlin", "NativeModules", "UHF RFID"],
      },
      {
        num: "03",
        title: "Three-Tier Monorepo",
        subtitle: "Backend · Vue admin portal · Mobile handheld app",
        body: "Delivered a dockerized monorepo: NestJS/Prisma REST API (JWT auth, 5-tier RBAC, Swagger docs), a Vue 3 + Tailwind admin portal with ApexCharts dashboards and Excel/PDF export, and a React Native handheld app with stock-in, stock-out, returns, cycle-counting, and order-picking — with a structured QA issue tracker covering 10 modules.",
        tech: ["NestJS", "Vue 3", "Tailwind CSS", "Docker Compose", "jsPDF", "SheetJS"],
      },
    ],
  },
  {
    id: "AI · 006",
    codename: "SMARTBOT",
    title: "SmartPole AI Chatbot",
    tagline: "RAG + text-to-SQL agent built on n8n",
    description:
      "A production AI chatbot combining Pinecone RAG over an auto-ingested knowledge base with a schema-locked natural-language-to-SQL agent — built entirely in n8n with LangChain nodes, multi-stage LLM pipeline (generation → validation → execution → summarization), and 50-turn conversational memory.",
    tags: ["n8n", "OpenAI GPT-4.1-mini", "Pinecone", "LangChain", "MySQL", "RAG"],
    link: "#",
    Icon: Bot,
    details: [
      {
        title: "Project Overview",
        body: "A production AI chatbot combining Pinecone RAG over an auto-ingested knowledge base with a schema-locked natural-language-to-SQL agent — built entirely in n8n with LangChain nodes, a multi-stage LLM pipeline, and 50-turn conversational memory.",
      },
      {
        title: "Auto-Ingestion Pipeline",
        groups: [
          {
            heading: "Google Drive → chunk → embed → Pinecone",
            items: [
              { label: "Drive polling", text: "checks every minute for new files, no manual re-indexing needed" },
              { label: "Chunking", text: "recursive character splitting (chunk 500, overlap 20)" },
              { label: "Embeddings", text: "OpenAI embeddings upserted into a 'Smart Pole' Pinecone namespace" },
            ],
          },
        ],
      },
      {
        title: "Text-to-SQL Agent",
        groups: [
          {
            heading: "Generate → validate → execute → summarize",
            items: [
              { label: "Generate", text: "GPT-4.1-mini builds SELECT-only queries from natural language over 12 tables" },
              { label: "Validate", text: "a second GPT chain corrects and optimises the SQL (JOINs, ORDER BY DESC LIMIT)" },
              { label: "Execute & Summarize", text: "IF-node runs it against MySQL, a final chain returns 2–3 readable sentences" },
            ],
          },
        ],
      },
      {
        title: "Defense-in-Depth Design",
        groups: [
          {
            heading: "Read-only, schema-locked, memory-aware",
            items: [
              "SELECT-only SQL with no DML and a default LIMIT 10",
              "Schema-locked prompt preventing off-schema queries, with clarifying questions for ambiguous requests",
              "Pinecone RAG retrieval as a parallel knowledge path + 50-message conversation memory",
            ],
          },
        ],
      },
    ],
    phases: [
      {
        num: "01",
        title: "Auto-Ingestion Pipeline",
        subtitle: "Google Drive → chunk → embed → Pinecone",
        body: "Built an automated RAG ingestion pipeline: Google Drive polling every minute for new files, recursive character text splitting (chunk 500, overlap 20), OpenAI Embeddings generation, and upsert into a Pinecone 'Smart Pole' namespace — the knowledge base stays current without manual re-indexing.",
        tech: ["n8n", "OpenAI Embeddings", "Pinecone", "LangChain", "Google Drive API"],
      },
      {
        num: "02",
        title: "Text-to-SQL Agent",
        subtitle: "Generate → validate → execute → summarize",
        body: "Designed a four-stage SQL pipeline: GPT-4.1-mini generates SELECT-only queries from natural language against the full sensor schema (12 tables), a second GPT chain corrects/optimises the SQL (JOINs, ORDER BY DESC LIMIT), an IF-node conditionally executes against MySQL, and a final chain summarises raw rows into 2–3 readable sentences.",
        tech: ["GPT-4.1-mini", "LangChain", "MySQL", "n8n", "Prompt Engineering"],
      },
      {
        num: "03",
        title: "Defense-in-Depth Design",
        subtitle: "Read-only · schema-locked · 50-turn memory",
        body: "Enforced strict security boundaries: SELECT-only SQL with no DML, default LIMIT 10, schema-locked prompt preventing off-schema queries, clarifying questions for ambiguous requests, and a Pinecone RAG retrieval tool as a parallel knowledge path — plus 50-message Simple Memory for conversation continuity.",
        tech: ["Pinecone", "RAG", "Prompt Engineering", "n8n", "OpenAI"],
      },
    ],
  },
  {
    id: "SHR · 007",
    codename: "HEALTH",
    title: "Smart Healthcare Remote",
    tagline: "IoT-driven patient monitoring",
    description:
      "Web-based application that analyses real-time patient health data via an Arduino-powered IoT monitoring system. Bridges hardware sensors and a cloud dashboard so caregivers can act on live vitals.",
    tags: ["HTML/CSS", "JavaScript", "Spring", "Firebase", "Arduino"],
    link: "#",
    Icon: Activity,
    details: [
      {
        title: "Project Overview",
        body: "A web-based application that analyses real-time patient health data via an Arduino-powered IoT monitoring system. It bridges hardware sensors and a cloud dashboard so caregivers can act on live vitals the moment they change.",
      },
      {
        title: "Key Features",
        groups: [
          {
            heading: "IoT Hardware",
            items: [
              { label: "Arduino sensor rig", text: "captures vital signs and streams them over Wi-Fi to the cloud" },
              "Sensors calibrated for clinical-grade accuracy",
            ],
          },
          {
            heading: "Backend Data Layer",
            items: [
              { label: "Spring Framework", text: "ingests, normalises, and persists incoming sensor telemetry" },
              { label: "Firebase", text: "real-time database tuned for fast time-series queries" },
            ],
          },
          {
            heading: "Live Dashboard",
            items: [
              "Responsive web dashboard built in HTML/CSS/JavaScript",
              "Real-time vitals with alert thresholds that notify caregivers instantly",
            ],
          },
        ],
      },
    ],
    phases: [
      {
        num: "01",
        title: "The Hardware",
        subtitle: "Arduino sensor pipeline",
        body: "Assembled an IoT-based remote patient monitoring rig using Arduino — capturing vital signs and streaming them over Wi-Fi to the cloud. Calibrated sensors for accuracy.",
        tech: ["Arduino", "IoT", "C++"],
      },
      {
        num: "02",
        title: "The Backend",
        subtitle: "Spring + Firebase data layer",
        body: "Implemented a Spring Framework backend that ingests sensor telemetry, normalises it, and persists into a Firebase real-time database for fast time-series queries.",
        tech: ["Spring Framework", "Firebase", "Java"],
      },
      {
        num: "03",
        title: "The Dashboard",
        subtitle: "Live web visualisation",
        body: "Built a responsive web dashboard in HTML/CSS/JavaScript that surfaces real-time patient vitals with alert thresholds so caregivers are notified instantly.",
        tech: ["HTML/CSS", "JavaScript", "Firebase"],
      },
    ],
  },
];

// ─────────── HUD corner brackets ───────────
function HUDCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const isT = pos[0] === "t", isL = pos[1] === "l";
  return (
    <div style={{
      position: "absolute",
      [isT ? "top" : "bottom"]: 0, [isL ? "left" : "right"]: 0,
      width: 16, height: 16,
      borderTop:    isT  ? "1px solid rgba(168,85,247,0.6)" : undefined,
      borderBottom: !isT ? "1px solid rgba(168,85,247,0.6)" : undefined,
      borderLeft:   isL  ? "1px solid rgba(168,85,247,0.6)" : undefined,
      borderRight:  !isL ? "1px solid rgba(168,85,247,0.6)" : undefined,
      pointerEvents: "none",
    }} />
  );
}

// ─────────── Sidebar project item ───────────
function SidebarItem({
  project, index, active, onClick,
}: {
  project: Project; index: number; active: boolean; onClick: () => void;
}) {
  const Icon = project.Icon;
  return (
    <button
      onClick={onClick}
      className="sidebar-item w-full text-left"
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 20px",
        background: active ? "rgba(133,39,227,0.18)" : "transparent",
        borderLeft: active ? "2px solid rgba(168,85,247,1)" : "2px solid transparent",
        borderBottom: "1px solid rgba(168,85,247,0.08)",
        cursor: "pointer", transition: "all 0.22s",
        position: "relative",
      }}
    >
      {/* Number */}
      <span style={{
        fontFamily: "Yozakura, sans-serif",
        fontSize: "11px", letterSpacing: "0.12em",
        color: active ? "rgba(168,85,247,1)" : "rgba(168,85,247,0.3)",
        flexShrink: 0, transition: "color 0.22s", minWidth: 20,
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon */}
      <div style={{
        width: 32, height: 32, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: active ? "rgba(168,85,247,0.2)" : "rgba(168,85,247,0.07)",
        border: `1px solid ${active ? "rgba(168,85,247,0.6)" : "rgba(168,85,247,0.15)"}`,
        transition: "all 0.22s",
      }}>
        <Icon size={14} strokeWidth={1.6}
          color={active ? "rgba(200,130,255,1)" : "rgba(168,85,247,0.5)"}
          style={{ transition: "color 0.22s" }}
        />
      </div>

      {/* Labels */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "Yozakura, sans-serif",
          fontSize: "17px", letterSpacing: "0.06em",
          color: active ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.55)",
          lineHeight: 1.1, transition: "color 0.22s",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {project.codename}
        </div>
        <div style={{
          fontFamily: "Karasu, sans-serif",
          fontSize: "10.5px", letterSpacing: "0.12em",
          color: active ? "rgba(168,85,247,0.85)" : "rgba(255,255,255,0.32)",
          marginTop: 4, transition: "color 0.22s",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {project.title}
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight size={13} strokeWidth={1.5}
        color={active ? "rgba(168,85,247,0.9)" : "rgba(255,255,255,0.15)"}
        style={{ flexShrink: 0, transition: "color 0.22s" }}
      />

      {/* Active glow */}
      {active && (
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 2,
          background: "rgba(168,85,247,1)",
          boxShadow: "0 0 12px rgba(168,85,247,0.9)",
          pointerEvents: "none",
        }} />
      )}
    </button>
  );
}

// ─────────── Project image frame ───────────
function ProjectImage({ project, fillHeight = false }: { project: Project; fillHeight?: boolean }) {
  const Icon = project.Icon;
  return (
    <div style={{
      position: "relative",
      ...(fillHeight ? { height: "100%", width: "100%" } : { aspectRatio: "16 / 10" }),
      background: project.image
        ? "transparent"
        : "linear-gradient(135deg, rgba(60,15,120,0.9) 0%, rgba(20,5,50,0.95) 100%)",
      border: "1px solid rgba(168,85,247,0.25)",
      overflow: "hidden",
    }}>
      {/* HUD corners */}
      {(["tl","tr","bl","br"] as const).map(c => <HUDCorner key={c} pos={c} />)}

      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.8), transparent)",
        boxShadow: "0 0 8px rgba(168,85,247,0.6)",
      }} />

      {/* HUD labels */}
      <div style={{
        position: "absolute", top: 10, left: 14,
        fontFamily: "Karasu, sans-serif", fontSize: "9.5px",
        letterSpacing: "0.22em", color: "rgba(168,85,247,0.6)",
      }}>
        SYS.PREVIEW
      </div>
      <div style={{
        position: "absolute", top: 10, right: 14,
        fontFamily: "Karasu, sans-serif", fontSize: "9.5px",
        letterSpacing: "0.2em", color: "rgba(168,85,247,0.45)",
      }}>
        {project.id.split(" ")[0]}
      </div>

      {project.video ? (
        <video
          src={project.video}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : project.image ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={project.image}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        /* Placeholder */
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 14,
        }}>
          {/* Radial glow */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(133,39,227,0.22) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          {/* Grid lines */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.2,
            backgroundImage: "linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />

          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 56, height: 56,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(168,85,247,0.4)",
              background: "rgba(133,39,227,0.15)",
            }}>
              <Icon size={26} strokeWidth={1.4} color="rgba(168,85,247,0.7)" />
            </div>
            <span style={{
              fontFamily: "Karasu, sans-serif", fontSize: "8px",
              letterSpacing: "0.28em", color: "rgba(168,85,247,0.35)",
            }}>
              PROJECT.SNAPSHOT
            </span>
          </div>
        </div>
      )}

      {/* Scan line overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
      }} />

      {/* Bottom label */}
      <div style={{
        position: "absolute", bottom: 10, left: 14, right: 14,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ height: 1, flex: 1, background: "rgba(168,85,247,0.25)" }} />
        <span style={{
          fontFamily: "Karasu, sans-serif", fontSize: "7.5px",
          letterSpacing: "0.22em", color: "rgba(168,85,247,0.35)",
          padding: "0 10px", flexShrink: 0,
        }}>
          {project.video ? "LIVE.DEMO" : project.image ? "PREVIEW" : "AWAITING.ASSET"}
        </span>
        <div style={{ height: 1, flex: 1, background: "rgba(168,85,247,0.25)" }} />
      </div>
    </div>
  );
}

// ─────────── Phase card ───────────
function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      style={{
        position: "relative",
        padding: "14px 16px 12px",
        background: "rgba(133,39,227,0.06)",
        border: "1px solid rgba(168,85,247,0.15)",
      }}
    >
      {/* HUD corners */}
      {(["tl","tr","bl","br"] as const).map(c => <HUDCorner key={c} pos={c} />)}

      {/* Number + divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{
          fontFamily: "Yozakura, sans-serif", fontSize: "15px",
          color: "rgba(168,85,247,0.9)", letterSpacing: "0.06em", flexShrink: 0,
        }}>
          {phase.num}
        </span>
        <div style={{ flex: 1, height: 1, background: "rgba(168,85,247,0.2)" }} />
      </div>

      {/* Title */}
      <div style={{
        fontFamily: "Yozakura, sans-serif",
        fontSize: "20px", color: "rgba(255,255,255,0.95)",
        marginBottom: 4, letterSpacing: "0.03em",
      }}>
        {phase.title}
      </div>

      {/* Subtitle */}
      <div style={{
        fontFamily: "Karasu, sans-serif",
        fontSize: "13px", letterSpacing: "0.14em",
        color: "rgba(168,85,247,0.8)", marginBottom: 10,
      }}>
        {phase.subtitle}
      </div>

      {/* Body — 3 line clamp */}
      <p style={{
        fontFamily: "Showcase Sans mini, sans-serif",
        fontSize: "14px", lineHeight: 1.75,
        color: "rgba(255,255,255,0.62)",
        marginBottom: 12,
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        {phase.body}
      </p>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {phase.tech.map(t => (
          <span key={t} style={{
            fontFamily: "Karasu, sans-serif", fontSize: "12px",
            letterSpacing: "0.1em",
            padding: "4px 10px",
            background: "rgba(88,28,135,0.35)",
            border: "1px solid rgba(168,85,247,0.28)",
            color: "rgba(200,130,255,0.9)",
          }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─────────── Screenshots gallery ───────────
function ScreenshotsGallery({ screenshots }: { screenshots: string[] }) {
  return (
    <div style={{ marginBottom: 30 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{
          fontFamily: "Karasu, sans-serif", fontSize: "18px",
          letterSpacing: "0.24em", color: "rgba(168,85,247,0.85)", flexShrink: 0,
        }}>
          // SCREENSHOTS
        </span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(168,85,247,0.35), transparent)" }} />
        <span style={{
          fontFamily: "Karasu, sans-serif", fontSize: "10px",
          letterSpacing: "0.18em", color: "rgba(168,85,247,0.4)", flexShrink: 0,
        }}>
          {String(screenshots.length).padStart(2, "0")} FRAMES
        </span>
      </div>

      <div
        style={{
          display: "flex", gap: 12, overflowX: "auto",
          paddingBottom: 10,
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(168,85,247,0.35) rgba(133,39,227,0.05)",
        }}
        className="screenshots-scroll"
      >
        {screenshots.map((src, i) => (
          <div
            key={i}
            style={{
              position: "relative", flexShrink: 0,
              height: 320, width: "auto",
              border: "1px solid rgba(168,85,247,0.3)",
              background: "rgba(12,2,28,0.9)",
              overflow: "hidden",
            }}
          >
            {(["tl","tr","bl","br"] as const).map(c => <HUDCorner key={c} pos={c} />)}

            {/* Top scan bar */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)",
              zIndex: 2,
            }} />

            {/* Frame index */}
            <div style={{
              position: "absolute", top: 8, left: 10, zIndex: 3,
              fontFamily: "Karasu, sans-serif", fontSize: "8px",
              letterSpacing: "0.22em", color: "rgba(168,85,247,0.5)",
            }}>
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Screenshot ${i + 1}`}
              style={{
                height: "100%", width: "auto", display: "block",
                objectFit: "contain",
              }}
            />

            {/* Scan line overlay */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────── Project detail modal ───────────
function ProjectDetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const Icon = project.Icon;
  const category = getCategory(project.id);

  // ESC to close + lock background scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  // Render through a portal to document.body so the section's clip-path
  // (from SectionReveal) can't clip this fixed overlay.
  if (typeof document === "undefined") return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        zIndex: 100,
        background: "rgba(8,0,18,0.82)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-3xl"
        style={{
          maxHeight: "88vh",
          background: "linear-gradient(160deg, rgba(22,6,44,0.98) 0%, rgba(12,2,28,0.99) 100%)",
          border: "1px solid rgba(168,85,247,0.3)",
          boxShadow: "0 0 60px rgba(133,39,227,0.35), inset 0 0 40px rgba(133,39,227,0.06)",
          display: "flex", flexDirection: "column", overflow: "hidden",
        }}
      >
        {/* HUD corners */}
        {(["tl","tr","bl","br"] as const).map(c => <HUDCorner key={c} pos={c} />)}

        {/* Top accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.9), transparent)",
          boxShadow: "0 0 12px rgba(168,85,247,0.7)", zIndex: 2,
        }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="modal-close"
          style={{
            position: "absolute", top: 16, right: 16, zIndex: 5,
            width: 34, height: 34,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(133,39,227,0.18)",
            border: "1px solid rgba(168,85,247,0.4)",
            cursor: "pointer", transition: "all 0.2s",
          }}
          aria-label="Close"
        >
          <X size={16} strokeWidth={1.8} color="rgba(200,130,255,0.95)" />
        </button>

        {/* Scrollable content */}
        <div className="modal-scroll" style={{ overflowY: "auto", padding: "30px 32px 34px" }}>

          {/* ID + category badge */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 18, paddingRight: 40 }}>
            <span style={{
              fontFamily: "Karasu, sans-serif", fontSize: "18px",
              letterSpacing: "0.24em", color: "rgba(168,85,247,0.95)",
              padding: "7px 16px",
              border: "1px solid rgba(168,85,247,0.45)",
              background: "rgba(133,39,227,0.18)",
            }}>
              {project.id}
            </span>
            <span style={{
              fontFamily: "Karasu, sans-serif", fontSize: "17px",
              letterSpacing: "0.2em", color: "rgba(168,85,247,0.6)",
              padding: "7px 16px",
              border: "1px solid rgba(168,85,247,0.22)",
            }}>
              {category}
            </span>
          </div>

          {/* Icon + title + tagline */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginBottom: 24 }}>
            <div style={{
              width: 58, height: 58, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(168,85,247,0.45)",
              background: "rgba(133,39,227,0.15)",
            }}>
              <Icon size={30} strokeWidth={1.4} color="rgba(200,130,255,0.95)" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{
                fontFamily: "Yozakura, sans-serif",
                fontSize: "clamp(32px, 4vw, 44px)",
                color: "rgba(255,255,255,0.98)",
                textShadow: "0 0 22px rgba(168,85,247,0.45)",
                lineHeight: 1.08, letterSpacing: "0.02em", marginBottom: 8,
              }}>
                {project.title}
              </h3>
              <p style={{
                fontFamily: "Karasu, sans-serif", fontSize: "20px",
                letterSpacing: "0.18em", color: "rgba(168,85,247,0.85)",
              }}>
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Preview image / video */}
          <div style={{ marginBottom: project.screenshots?.length ? 20 : 26 }}>
            <ProjectImage project={project} />
          </div>

          {/* Screenshots gallery */}
          {project.screenshots && project.screenshots.length > 0 && (
            <ScreenshotsGallery screenshots={project.screenshots} />
          )}

          {/* Rich detail sections — Project Overview, Key Features, etc. */}
          {project.details.map((section, i) => (
            <DetailSectionView key={i} section={section} />
          ))}

          {/* Phases */}
          <ModalSectionLabel label="// PHASES" trailing={`${project.phases.length} STAGES`} />
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 30 }}>
            {project.phases.map((ph) => (
              <div key={ph.num} style={{
                position: "relative",
                padding: "16px 20px",
                background: "rgba(133,39,227,0.06)",
                border: "1px solid rgba(168,85,247,0.15)",
              }}>
                {(["tl","tr","bl","br"] as const).map(c => <HUDCorner key={c} pos={c} />)}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{
                    fontFamily: "Yozakura, sans-serif", fontSize: "20px",
                    color: "rgba(168,85,247,0.9)", flexShrink: 0,
                  }}>
                    {ph.num}
                  </span>
                  <div style={{ flex: 1, height: 1, background: "rgba(168,85,247,0.2)" }} />
                  <span style={{
                    fontFamily: "Karasu, sans-serif", fontSize: "18px",
                    letterSpacing: "0.14em", color: "rgba(168,85,247,0.6)",
                  }}>
                    {ph.subtitle}
                  </span>
                </div>
                <div style={{
                  fontFamily: "Yozakura, sans-serif", fontSize: "28px",
                  color: "rgba(255,255,255,0.95)", marginBottom: 10, letterSpacing: "0.03em",
                }}>
                  {ph.title}
                </div>
                <p style={{
                  fontFamily: "Showcase Sans mini, sans-serif",
                  fontSize: "22px", lineHeight: 1.75,
                  color: "rgba(255,255,255,0.7)", marginBottom: 12,
                }}>
                  {ph.body}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {ph.tech.map(t => (
                    <span key={t} style={{
                      fontFamily: "Karasu, sans-serif", fontSize: "17px",
                      letterSpacing: "0.1em", padding: "5px 13px",
                      background: "rgba(88,28,135,0.35)",
                      border: "1px solid rgba(168,85,247,0.28)",
                      color: "rgba(200,130,255,0.9)",
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <ModalSectionLabel label="// TECH_STACK" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 30 }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontFamily: "Showcase Sans mini, sans-serif",
                fontSize: "20px", padding: "7px 16px", borderRadius: 999,
                background: "rgba(88,28,135,0.35)",
                border: "1px solid rgba(168,85,247,0.28)",
                color: "rgba(255,255,255,0.85)",
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* Footer link */}
          {project.link && project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-btn"
              style={{ fontFamily: "Karasu, sans-serif", fontSize: "12px", letterSpacing: "0.22em" }}
            >
              <ExternalLink size={14} strokeWidth={1.6} />
              VISIT PROJECT
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

// Rich detail section (Project Overview / Key Features / etc.) inside the modal
function DetailSectionView({ section }: { section: DetailSection }) {
  return (
    <div style={{ marginBottom: 30 }}>
      {/* Section title */}
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
        <div style={{ width: 8, height: 8, background: "rgba(168,85,247,0.9)", transform: "rotate(45deg)", flexShrink: 0 }} />
        <h4 style={{
          fontFamily: "Yozakura, sans-serif", fontSize: "28px",
          color: "rgba(255,255,255,0.97)", letterSpacing: "0.04em",
          textShadow: "0 0 18px rgba(168,85,247,0.35)",
        }}>
          {section.title}
        </h4>
      </div>

      {/* Body paragraph */}
      {section.body && (
        <p style={{
          fontFamily: "Showcase Sans mini, sans-serif",
          fontSize: "22px", lineHeight: 1.85,
          color: "rgba(255,255,255,0.8)",
        }}>
          {section.body}
        </p>
      )}

      {/* Grouped feature lists */}
      {section.groups && (
        <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: section.body ? 20 : 4 }}>
          {section.groups.map((g) => (
            <div key={g.heading}>
              <div style={{
                fontFamily: "Karasu, sans-serif", fontSize: "21px",
                letterSpacing: "0.06em", color: "rgba(200,130,255,0.95)",
                marginBottom: 12,
              }}>
                {g.heading}
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 11, listStyle: "none", padding: 0, margin: 0 }}>
                {g.items.map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: "rgba(168,85,247,0.85)",
                      marginTop: 9, flexShrink: 0,
                      boxShadow: "0 0 6px rgba(168,85,247,0.7)",
                    }} />
                    <span style={{
                      fontFamily: "Showcase Sans mini, sans-serif",
                      fontSize: "21px", lineHeight: 1.75,
                      color: "rgba(255,255,255,0.72)",
                    }}>
                      {typeof item === "string" ? item : (
                        <>
                          <span style={{ color: "rgba(255,255,255,0.95)", fontWeight: 600 }}>{item.label}:</span>{" "}
                          {item.text}
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Small section label used inside the modal
function ModalSectionLabel({ label, trailing }: { label: string; trailing?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <span style={{
        fontFamily: "Karasu, sans-serif", fontSize: "18px",
        letterSpacing: "0.24em", color: "rgba(168,85,247,0.85)", flexShrink: 0,
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(168,85,247,0.35), transparent)" }} />
      {trailing && (
        <span style={{
          fontFamily: "Karasu, sans-serif", fontSize: "10px",
          letterSpacing: "0.18em", color: "rgba(168,85,247,0.4)", flexShrink: 0,
        }}>
          {trailing}
        </span>
      )}
    </div>
  );
}

// ─────────── Pagination / filter helpers ───────────
const ITEMS_PER_PAGE = 6;
type FilterType = "ALL" | "ACADEMIC" | "PROFESSIONAL";

const ACADEMIC_PREFIXES = ["WMA", "SHR"];
function getCategory(id: string): "ACADEMIC" | "PROFESSIONAL" {
  return ACADEMIC_PREFIXES.includes(id.split(" ")[0]) ? "ACADEMIC" : "PROFESSIONAL";
}

// ─────────── Main ───────────
export default function Project() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headerRef    = useRef<HTMLHeadingElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const sidebarRef   = useRef<HTMLDivElement>(null);
  const showcaseRef  = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [page, setPage]     = useState(0);
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [detailOpen, setDetailOpen] = useState(false);

  const filtered        = filter === "ALL" ? PROJECTS : PROJECTS.filter(p => getCategory(p.id) === filter);
  const totalPages      = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const visibleProjects = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);
  const active          = PROJECTS[activeIdx];

  const handleFilter = (f: FilterType) => {
    setFilter(f);
    setPage(0);
    const first = f === "ALL" ? PROJECTS[0] : PROJECTS.find(p => getCategory(p.id) === f);
    setActiveIdx(first ? PROJECTS.indexOf(first) : 0);
  };

  const goToPage = (newPage: number) => {
    setPage(newPage);
    setActiveIdx(PROJECTS.indexOf(filtered[newPage * ITEMS_PER_PAGE]));
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(".proj-tag",       { y: 20, opacity: 0, duration: 0.5,  stagger: 0.08, ease: "power2.out" })
      .from(headerRef.current, { y: 55, opacity: 0, duration: 0.85, ease: "power3.out" }, "-=0.35")
      .from(lineRef.current,   { scaleX: 0, transformOrigin: "left", duration: 0.95, ease: "power2.out" }, "-=0.55")
      .from(sidebarRef.current,  { x: -44, opacity: 0, duration: 0.85, ease: "power3.out" }, "-=0.55")
      .from(showcaseRef.current, { x:  34, opacity: 0, duration: 0.85, ease: "power3.out" }, "-=0.78");
  }, { scope: sectionRef });

  return (
    <section
      id="project"
      ref={sectionRef}
      className="relative w-full overflow-hidden min-h-screen lg:flex lg:flex-col lg:h-[calc(100vh-90px)]"
      style={{ background: "rgba(15,0,30,0.98)", scrollMarginTop: "90px" }}
    >
      {/* Dot grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.09) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)",
      }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 lg:flex lg:flex-col lg:flex-1 lg:min-h-0" style={{ paddingTop: 8, paddingBottom: 12 }}>

        {/* ── Section header ── */}
        <div className="flex items-end justify-between mb-3 gap-4 flex-wrap">
          <div className="flex items-baseline gap-4">
            <h2 ref={headerRef} className="text-5xl md:text-7xl lg:text-8xl font-bold text-white"
              style={{
                fontFamily: "Yozakura, sans-serif",
                textShadow: "0 0 40px rgba(168,85,247,0.7), 0 4px 10px rgba(0,0,0,0.5)",
                letterSpacing: "0.04em", lineHeight: 1.05,
              }}>
              PROJECTS
            </h2>
            <span className="proj-tag hidden md:inline" style={{
              fontFamily: "Karasu, sans-serif", fontSize: "12px",
              letterSpacing: "0.22em", color: "rgba(168,85,247,0.7)", paddingBottom: "8px",
            }}>
              _ ARCHIVE.004
            </span>
          </div>
          <span className="proj-tag" style={{
            fontFamily: "Karasu, sans-serif", fontSize: "12px",
            letterSpacing: "0.2em", color: "rgba(168,85,247,0.42)", paddingBottom: "8px",
          }}>
            // PROJECT_LOG
          </span>
        </div>

        {/* Divider */}
        <div ref={lineRef} className="w-full h-px mb-4"
          style={{
            background: "linear-gradient(90deg, rgba(168,85,247,0.85), rgba(99,102,241,0.55), transparent)",
            boxShadow: "0 0 10px rgba(168,85,247,0.35)",
          }}
        />

        {/* ── Main two-panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-0 lg:flex-1 lg:min-h-0 lg:overflow-hidden"
          style={{ border: "1px solid rgba(168,85,247,0.14)" }}>

          {/* Left sidebar */}
          <div ref={sidebarRef} style={{
            borderRight: "1px solid rgba(168,85,247,0.14)",
            borderBottom: "1px solid rgba(168,85,247,0.14)",
            display: "flex", flexDirection: "column",
            overflowY: "auto",
          }}
            className="lg:border-b-0"
          >
            {/* Sidebar header */}
            <div style={{
              padding: "12px 20px",
              borderBottom: "1px solid rgba(168,85,247,0.12)",
              display: "flex", alignItems: "center", gap: 8,
              background: "rgba(133,39,227,0.07)",
            }}>
              <div style={{ width: 6, height: 6, background: "rgba(168,85,247,0.8)", transform: "rotate(45deg)" }} />
              <span style={{
                fontFamily: "Karasu, sans-serif", fontSize: "10.5px",
                letterSpacing: "0.24em", color: "rgba(168,85,247,0.7)",
              }}>
                SELECT PROJECT
              </span>
              <span style={{
                marginLeft: "auto",
                fontFamily: "Karasu, sans-serif", fontSize: "10px",
                letterSpacing: "0.1em", color: "rgba(168,85,247,0.4)",
              }}>
                {String(filtered.length).padStart(2, "0")} FILES
              </span>
            </div>

            {/* Category filter tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid rgba(168,85,247,0.12)" }}>
              {(["ALL", "ACADEMIC", "PROFESSIONAL"] as FilterType[]).map(f => (
                <button
                  key={f}
                  onClick={() => handleFilter(f)}
                  style={{
                    flex: 1, padding: "9px 2px",
                    fontFamily: "Karasu, sans-serif",
                    fontSize: "9.5px", letterSpacing: "0.08em",
                    color: filter === f ? "rgba(168,85,247,0.95)" : "rgba(255,255,255,0.28)",
                    background: filter === f ? "rgba(133,39,227,0.18)" : "transparent",
                    borderTop: "none", borderLeft: "none", borderRight: "none",
                    borderBottom: filter === f ? "2px solid rgba(168,85,247,0.8)" : "2px solid transparent",
                    marginBottom: -1,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Paginated project list */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${filter}-${page}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                {visibleProjects.map((p) => {
                  const globalIdx = PROJECTS.indexOf(p);
                  return (
                    <SidebarItem
                      key={p.id}
                      project={p}
                      index={globalIdx}
                      active={globalIdx === activeIdx}
                      onClick={() => setActiveIdx(globalIdx)}
                    />
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Pagination controls — only shown when there's more than one page */}
            {totalPages > 1 && (
              <div style={{
                marginTop: "auto",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 16px",
                borderTop: "1px solid rgba(168,85,247,0.12)",
                background: "rgba(133,39,227,0.05)",
              }}>
                <button
                  onClick={() => page > 0 && goToPage(page - 1)}
                  style={{
                    display: "flex", alignItems: "center", gap: 4,
                    fontFamily: "Karasu, sans-serif", fontSize: "10px",
                    letterSpacing: "0.14em",
                    color: page === 0 ? "rgba(168,85,247,0.18)" : "rgba(168,85,247,0.65)",
                    cursor: page === 0 ? "not-allowed" : "pointer",
                    background: "transparent", border: "none",
                    transition: "color 0.2s",
                  }}
                >
                  <ChevronLeft size={11} strokeWidth={1.5} />
                  PREV
                </button>

                {/* Page dots */}
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      style={{
                        width: i === page ? 18 : 6,
                        height: 4,
                        background: i === page ? "rgba(168,85,247,0.9)" : "rgba(168,85,247,0.22)",
                        border: "none", cursor: "pointer",
                        transition: "all 0.25s", padding: 0,
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={() => page < totalPages - 1 && goToPage(page + 1)}
                  style={{
                    display: "flex", alignItems: "center", gap: 4,
                    fontFamily: "Karasu, sans-serif", fontSize: "10px",
                    letterSpacing: "0.14em",
                    color: page === totalPages - 1 ? "rgba(168,85,247,0.18)" : "rgba(168,85,247,0.65)",
                    cursor: page === totalPages - 1 ? "not-allowed" : "pointer",
                    background: "transparent", border: "none",
                    transition: "color 0.2s",
                  }}
                >
                  NEXT
                  <ChevronRight size={11} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>

          {/* Right showcase */}
          <div ref={showcaseRef} style={{
            position: "relative", overflow: "hidden",
            padding: "18px 32px",
            display: "flex", flexDirection: "column", gap: 12,
          }}>

            {/* Big BG codename */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.codename}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  bottom: "-8%", right: "-4%",
                  fontFamily: "Yozakura, sans-serif",
                  fontSize: "clamp(90px, 16vw, 220px)",
                  lineHeight: 0.85, letterSpacing: "-0.03em",
                  color: "rgba(133,39,227,0.12)",
                  pointerEvents: "none", userSelect: "none",
                  zIndex: 0,
                }}
              >
                {active.codename}
              </motion.div>
            </AnimatePresence>

            {/* 1 — Title block */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`head-${activeIdx}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative z-10"
                style={{ flexShrink: 0 }}
              >
                {/* Project ID tag */}
                <span style={{
                  display: "inline-block", marginBottom: 8,
                  fontFamily: "Karasu, sans-serif", fontSize: "13px",
                  letterSpacing: "0.24em", color: "rgba(168,85,247,0.95)",
                  padding: "5px 13px",
                  border: "1px solid rgba(168,85,247,0.45)",
                  background: "rgba(133,39,227,0.18)",
                }}>
                  {active.id}
                </span>

                <h3 style={{
                  fontFamily: "Yozakura, sans-serif",
                  fontSize: "clamp(26px, 3.4vw, 38px)",
                  color: "rgba(255,255,255,0.98)",
                  textShadow: "0 0 22px rgba(168,85,247,0.45)",
                  lineHeight: 1.05, letterSpacing: "0.02em",
                  marginBottom: 4,
                }}>
                  {active.title}
                </h3>
                <p style={{
                  fontFamily: "Karasu, sans-serif", fontSize: "13px",
                  letterSpacing: "0.18em", color: "rgba(168,85,247,0.8)",
                }}>
                  {active.tagline}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* 2 — Video / image preview (large) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${activeIdx}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative z-10 proj-preview"
              >
                <ProjectImage project={active} fillHeight />
              </motion.div>
            </AnimatePresence>

            {/* 3 — Description + tools + CTA */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${activeIdx}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative z-10"
                style={{ flexShrink: 0 }}
              >
                {/* Description */}
                <p style={{
                  fontFamily: "Showcase Sans mini, sans-serif",
                  fontSize: "21px", lineHeight: 1.7,
                  color: "rgba(255,255,255,0.78)", marginBottom: 14,
                }}>
                  {active.description}
                </p>

                {/* Tech tags */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginBottom: 16 }}>
                  {active.tags.map(t => (
                    <span key={t} className="skill-pill" style={{
                      fontFamily: "Showcase Sans mini, sans-serif",
                      fontSize: "16px", padding: "5px 16px",
                      borderRadius: 999,
                      background: "rgba(88,28,135,0.35)",
                      border: "1px solid rgba(168,85,247,0.28)",
                      color: "rgba(255,255,255,0.85)",
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA — centered on its own line */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={() => setDetailOpen(true)}
                    className="hud-btn"
                    style={{ fontFamily: "Karasu, sans-serif", fontSize: "13px", letterSpacing: "0.22em", cursor: "pointer" }}
                  >
                    <ExternalLink size={14} strokeWidth={1.6} />
                    VIEW DETAILS
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {detailOpen && (
          <ProjectDetailModal project={active} onClose={() => setDetailOpen(false)} />
        )}
      </AnimatePresence>

      {/* Sidebar hover style */}
      <style>{`
        /* Preview pane: fixed height on mobile (so fillHeight image resolves),
           flexes to fill the locked viewport layout on desktop. */
        .proj-preview { height: 230px; }
        @media (min-width: 1024px) {
          .proj-preview { flex: 1; min-height: 0; max-height: 300px; height: auto; }
        }
        .sidebar-item:hover {
          background: rgba(133,39,227,0.1) !important;
          border-left-color: rgba(168,85,247,0.5) !important;
        }
        .modal-close:hover {
          background: rgba(168,85,247,0.35) !important;
          border-color: rgba(168,85,247,0.8) !important;
        }
        .modal-scroll::-webkit-scrollbar { width: 8px; }
        .modal-scroll::-webkit-scrollbar-track { background: rgba(133,39,227,0.05); }
        .modal-scroll::-webkit-scrollbar-thumb {
          background: rgba(168,85,247,0.35);
          border-radius: 4px;
        }
        .modal-scroll::-webkit-scrollbar-thumb:hover { background: rgba(168,85,247,0.55); }
        .modal-scroll { scrollbar-width: thin; scrollbar-color: rgba(168,85,247,0.35) rgba(133,39,227,0.05); }
        .screenshots-scroll::-webkit-scrollbar { height: 5px; }
        .screenshots-scroll::-webkit-scrollbar-track { background: rgba(133,39,227,0.05); }
        .screenshots-scroll::-webkit-scrollbar-thumb { background: rgba(168,85,247,0.35); border-radius: 4px; }
        .screenshots-scroll::-webkit-scrollbar-thumb:hover { background: rgba(168,85,247,0.55); }
      `}</style>
    </section>
  );
}
