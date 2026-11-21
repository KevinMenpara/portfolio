/**
 * All site content lives here. Edit this file to update the site; no
 * component changes are needed.
 *
 * Anything marked `ASSUMED` was written as a sensible placeholder during the
 * redesign. Search for "ASSUMED" and replace it with the real story.
 */
import type { StaticImageData } from "next/image";
import srs from "@/assets/projects/srs.webp";
import placebook from "@/assets/projects/placebook.webp";
import payme from "@/assets/projects/payme.webp";

/* ───────────────────────── Types ───────────────────────── */

export type Change = {
  kind: "added" | "faster" | "safer" | "steadier" | "led";
  text: string;
};

export type Chapter = {
  id: string;
  /** Big pinned label in the journey: a year, or "Now". */
  year: string;
  /** Exact dates shown in the chapter. */
  when: string;
  title: string;
  place: string;
  /** One line shown before the chapter is expanded. */
  summary: string;
  story: string;
  changes: Change[];
  /** One standout figure for the chapter. */
  metric?: { value: string; label: string };
  /** Slugs from `projects` built during this chapter. */
  projects?: string[];
};

/** Each project's branch colour, used everywhere the project appears. */
export type BranchColor = "blue" | "green" | "amber" | "violet" | "rose";

export type Project = {
  slug: string;
  color: BranchColor;
  title: string;
  year: string;
  summary: string;
  stack: string[];
  image?: StaticImageData;
  live?: string;
  source?: string;
  /** Case-study page. */
  problem: string;
  approach: string[];
  outcome: string;
};

export type Service = { title: string; body: string; stack: string[] };
export type Note = { title: string; href: string; date: string; summary: string };

/* ───────────────────────── Profile ───────────────────────── */

export const profile = {
  name: "Kevin Menpara",
  role: "Software engineer",
  promise:
    "I build secure systems and the tooling that keeps infrastructure running, from LLM-powered incident fixes to apps used by a thousand people.",
  location: "Rajkot, Gujarat, India",
  email: "kevinmenpara2208@gmail.com",
  phone: "+91 91068 02005",
  /** Set to false to hide the phone number on the site. */
  showPhone: true,
  resumeUrl: "https://drive.google.com/file/d/1J0x_aiWE7SiEJq6S8lv_Ck1W_UPVqhhT/view?usp=sharing",
  socials: {
    github: "https://github.com/KevinMenpara",
    linkedin: "https://www.linkedin.com/in/kevin-menpara-b7379322a/",
  },
  /**
   * Optional form backend (e.g. a Formspree or Web3Forms endpoint URL).
   * Left empty, the contact form opens the visitor's email app instead.
   */
  contactEndpoint: "",
};

/* ───────────────────────── Journey ───────────────────────── */

export const journey: Chapter[] = [
  {
    id: "school",
    year: "2019",
    when: "2019 – 2021",
    title: "Higher secondary",
    place: "Lotus High School",
    summary: "Finished school with distinction and chose to study technology.", // ASSUMED
    // ASSUMED: story wording. Add how you first got into programming.
    story:
      "Finished school with a first-class distinction and decided to study technology. This is where the curiosity about how software works started.",
    changes: [{ kind: "added", text: "First class with distinction" }],
  },
  {
    id: "da-iict",
    year: "2021",
    when: "2021 – 2025",
    title: "B.Tech at DA-IICT",
    place: "DA-IICT, Gandhinagar",
    summary: "Computer science foundations, first full-stack apps, and leading my batch.",
    // ASSUMED: story wording; add hackathons, Winter of Code and other turning points.
    story:
      "Four years of computer science foundations: data structures, operating systems, databases, networks, cloud and cryptography. I built my first Django apps here and learned to lead as well as code.",
    changes: [
      { kind: "led", text: "Batch representative and event coordinator" },
      { kind: "added", text: "First full-stack projects in Django and the MERN stack" },
    ],
    projects: ["learning-log"],
  },
  {
    id: "rovren",
    year: "2023",
    when: "May – Jul 2023",
    title: "Full-stack developer intern",
    place: "Rovren Technology",
    summary: "Shipped my first production system: secure registration for 1,000+ users.",
    story:
      "My first production system: the RITAAwards registration platform, built with ToolJet, AWS S3 and SMTP. Real users, real data, and a real need to keep it secure.",
    changes: [
      { kind: "added", text: "Registration and verification flow, end to end" },
      { kind: "safer", text: "AES-256 encryption cut data-breach risk by 95%" },
      { kind: "added", text: "Admin interface for managing registrations" },
    ],
    metric: { value: "1,000+", label: "users registered through the platform" },
    projects: ["placebook", "payme"],
  },
  {
    id: "improwised",
    year: "2024",
    when: "May – Jul 2024",
    title: "Software engineer intern",
    place: "Improwised Technology",
    summary: "Built an LLM system that resolves infrastructure errors 34% faster.",
    story:
      "I built an error-resolving system that uses large language models to diagnose infrastructure failures. An LLM proxy handles model traffic, Outlines shapes the prompts, and a message queue keeps the parts loosely coupled.",
    changes: [
      { kind: "steadier", text: "System reliability up 70% with queue-based decoupling" },
      { kind: "added", text: "Integrated Robusta and open models like Llama" },
    ],
    metric: { value: "34%", label: "faster infrastructure error resolution" },
    projects: ["version-control", "srs"],
  },
  {
    id: "graduate",
    year: "2025",
    when: "2025",
    title: "Graduated",
    place: "DA-IICT",
    summary: "B.Tech in Information & Technology, first class with distinction.",
    // ASSUMED: wording. Add your final-year project or thesis if you have one.
    story:
      "Graduated with a B.Tech in Information & Technology, first class with distinction, with two internships and a set of shipped projects behind me.",
    changes: [{ kind: "added", text: "B.Tech, first class with distinction" }],
  },
  {
    id: "now",
    year: "Now",
    when: "2026",
    title: "What I'm doing now",
    place: "Rajkot, India",
    summary: "Software engineer on backend and infrastructure systems, open to new work.", // ASSUMED
    // ASSUMED: replace with your current role, company and focus.
    story:
      "Working as a software engineer on backend and infrastructure systems, and exploring how LLMs can make operations calmer. I'm open to new roles, freelance projects and good conversations.",
    changes: [],
  },
];

/* ───────────────────────── Projects ───────────────────────── */

export const projects: Project[] = [
  {
    slug: "srs",
    color: "blue",
    title: "Student Registration System",
    year: "2024", // ASSUMED year
    summary: "Django registration system for colleges, with verification for online exams.",
    stack: ["Python", "Django", "PostgreSQL"],
    image: srs,
    live: "https://srs.kmmenpara.xyz/",
    // ASSUMED: case-study text below is drafted from the project description.
    problem:
      "Colleges running online exams need to know that the student sitting the exam is the one who registered. Spreadsheets and ad-hoc forms made that slow and error-prone.",
    approach: [
      "Built a Django app that handles student registration, document upload and admin verification in one place.",
      "Gave administrators a review queue so each registration is checked once and its status is visible to the student.",
      "Kept student data in PostgreSQL with role-based access for staff.",
    ],
    outcome: "A single, auditable registration and verification flow that the exam team can run without spreadsheets.",
  },
  {
    slug: "placebook",
    color: "green",
    title: "Placebook",
    year: "2023", // ASSUMED year
    summary: "MERN app where travellers share photos and locations of places they love.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    image: placebook,
    live: "https://placebook.kmmenpara.xyz/",
    // ASSUMED: case-study text.
    problem: "Travel recommendations get lost in chat threads. I wanted one place to pin a spot, add a photo and share it.",
    approach: [
      "React front end with authentication and per-user place collections.",
      "Express and Node.js API with image upload and location data stored in MongoDB.",
      "Map previews so every place shows where it actually is.",
    ],
    outcome: "A full MERN app from auth to file uploads, and my first end-to-end JavaScript project.",
  },
  {
    slug: "payme",
    color: "amber",
    title: "PayMe",
    year: "2023", // ASSUMED year
    summary: "A Django payment-gateway service that other projects can plug into.",
    stack: ["Python", "Django", "REST API"],
    image: payme,
    live: "https://paymentapi.kmmenpara.xyz/api/v1/",
    // ASSUMED: case-study text.
    problem: "Each of my projects needed payments, and wiring a gateway into every one of them was repetitive and risky.",
    approach: [
      "Built a standalone Django REST service that exposes payment operations through a versioned API.",
      "Other apps call the API instead of talking to the gateway directly, so payment logic lives in one place.",
    ],
    outcome: "A reusable payment service with a stable /api/v1 contract that any project can call.",
  },
  {
    slug: "learning-log",
    color: "violet",
    title: "Learning Log",
    year: "2022", // ASSUMED year
    summary: "A personal knowledge tracker for journaling what you learn, topic by topic.",
    stack: ["Python", "Django"],
    source: "https://github.com/KevinMenpara/Learning-Log",
    // ASSUMED: case-study text.
    problem: "Notes from courses and tutorials end up scattered. I wanted a simple journal organised by topic.",
    approach: [
      "Django app with user accounts, topics and dated entries.",
      "Each user sees only their own topics and entries.",
    ],
    outcome: "My first complete Django project, covering models, auth, forms and deployment.",
  },
  {
    slug: "version-control",
    color: "rose",
    title: "Version Control System",
    year: "2024", // ASSUMED year (built for Winter of Code 6.0)
    summary: "A Git-style version control system written from scratch in Python.",
    stack: ["Python", "Systems programming"],
    source: "https://github.com/KevinMenpara/WoC_6.0_Systems_Programming_KevinMenpara",
    // ASSUMED: case-study text.
    problem: "Using Git every day is different from understanding it. Building one is the fastest way to learn how it works.",
    approach: [
      "Implemented content-addressed storage for file snapshots.",
      "Added commits, history and change tracking on top of that store.",
      "Built for the Winter of Code systems programming track.",
    ],
    outcome: "A working version control tool and a much deeper understanding of how Git stores history.",
  },
];

/* ───────────────────────── Routes at the end ───────────────────────── */

// ASSUMED: the services you offer for freelance work.
export const services: Service[] = [
  {
    title: "Backends and APIs",
    body: "Django or Node.js services with a clean API, a sensible database design and tests.",
    stack: ["Django", "Node.js", "PostgreSQL"],
  },
  {
    title: "LLM features and tooling",
    body: "Practical LLM integrations: summarising, classifying and resolving, with guardrails.",
    stack: ["Python", "LLMs"],
  },
  {
    title: "Containers and deployment",
    body: "Docker, CI pipelines and Kubernetes setups that a small team can run.",
    stack: ["Docker", "Kubernetes", "AWS", "Jenkins"],
  },
];

/** Add posts here; the notes section appears once there is at least one. */
export const notes: Note[] = [];

export const skills = {
  Languages: ["Python", "C/C++", "JavaScript", "SQL"],
  Frameworks: ["Django", "React", "Node.js", "NumPy"],
  Infrastructure: ["Docker", "Kubernetes", "AWS", "EKS", "Jenkins"],
  Data: ["PostgreSQL", "MongoDB"],
};

/** Where the site is published; used for sitemap and social previews. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kevinmenpara.github.io/portfolio").replace(/\/$/, "");

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
