/**
 * All site content lives here. Edit this file to update the portfolio —
 * no component changes needed.
 */
import type { StaticImageData } from "next/image";
import srs from "@/assets/projects/srs.webp";
import placebook from "@/assets/projects/placebook.webp";
import payme from "@/assets/projects/payme.webp";

export type Link = { label: string; href: string };

export type Experience = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  stack?: string[];
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image?: StaticImageData;
  live?: string;
  source?: string;
};

export type Education = {
  degree: string;
  school: string;
  period: string;
  note?: string;
};

export const profile = {
  name: "Kevin Menpara",
  title: "Software Engineer",
  /** Rotating phrases shown under the name in the hero. */
  roles: ["Software Engineer", "Full-Stack Developer", "DevOps & Cloud"],
  location: "Rajkot, Gujarat, India",
  email: "kevinmenpara2208@gmail.com",
  phone: "+91 91068 02005",
  /** Short line for the hero and the page's meta description. */
  tagline:
    "I build secure, scalable web systems — from full-stack apps to LLM-powered infrastructure tooling.",
  about: [
    "I'm a software engineer from DA-IICT with a record in full-stack and secure system development. I've led teams building scalable registration and error-resolution systems, improving efficiency by 80%+ and hardening security with AES-256 encryption.",
    "I work mostly in Python, C++ and JavaScript, alongside DevOps tooling like Docker and Kubernetes, and I care about clean workflows, data integrity and fast applications.",
  ],
  resumeUrl:
    "https://drive.google.com/file/d/1J0x_aiWE7SiEJq6S8lv_Ck1W_UPVqhhT/view?usp=sharing",
  socials: {
    github: "https://github.com/KevinMenpara",
    linkedin: "https://www.linkedin.com/in/kevin-menpara-b7379322a/",
  },
  contactFormUrl: "https://forms.gle/1tfteRZynBhFrqQb6",
};

export const skills: Record<string, string[]> = {
  Languages: ["Python", "C/C++", "JavaScript", "SQL", "HTML", "CSS"],
  Frameworks: ["Django", "React", "Node.js", "NumPy"],
  "Data & Cloud": ["PostgreSQL", "MongoDB", "AWS", "EKS"],
  Tooling: ["Git", "Docker", "Kubernetes", "Jenkins", "DBeaver"],
  Coursework: ["DSA", "OOP", "Operating Systems", "DBMS", "Networks", "Cryptography", "Cloud"],
};

export const experience: Experience[] = [
  {
    role: "Software Engineer Intern",
    company: "Improwised Technology",
    period: "May 2024 – Jul 2024",
    highlights: [
      "Built an error-resolving system (ERS) with Python and large language models, improving infrastructure-level error resolution efficiency by 34%.",
      "Used an LLM proxy for robust communication, Outlines for prompt generation and a message queue for loose coupling — improving system reliability by 70%.",
      "Integrated open-source tooling like Robusta and LLMs like Llama for integrity and flexibility.",
    ],
    stack: ["Python", "LLMs", "Kubernetes", "Robusta"],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Rovren Technology",
    period: "May 2023 – Jul 2023",
    highlights: [
      "Developed the “RITAAwards” registration system using ToolJet, AWS S3 and SMTP, streamlining the process for 1,000+ users.",
      "Reduced data-breach risk by 95% with AES-256 encryption, keeping registration and verification private and reliable.",
      "Built an admin interface for managing registrations and administrative tasks.",
    ],
    stack: ["ToolJet", "AWS S3", "SMTP", "AES-256"],
  },
];

export const projects: Project[] = [
  {
    title: "Student Registration System",
    description:
      "A Django-based registration system for colleges, built for robust student registration and verification for online exams.",
    tags: ["Python", "Django"],
    image: srs,
    live: "https://srs.kmmenpara.xyz/",
  },
  {
    title: "Placebook",
    description:
      "A MERN web app where travel enthusiasts share photos and locations of places they've visited.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    image: placebook,
    live: "https://placebook.kmmenpara.xyz/",
  },
  {
    title: "PayMe",
    description:
      "A cross-functional Django web app that acts as a fully functional payment gateway for other projects.",
    tags: ["Python", "Django", "REST API"],
    image: payme,
    live: "https://paymentapi.kmmenpara.xyz/api/v1/",
  },
  {
    title: "Learning Log",
    description:
      "A personal knowledge tracker — a Django app for keeping journal entries on each topic you learn.",
    tags: ["Python", "Django"],
    source: "https://github.com/KevinMenpara/Learning-Log",
  },
  {
    title: "Version Control System",
    description:
      "A Python-based version control system to manage and track changes in your projects efficiently.",
    tags: ["Python", "Systems"],
    source: "https://github.com/KevinMenpara/WoC_6.0_Systems_Programming_KevinMenpara",
  },
];

export const education: Education[] = [
  {
    degree: "B.Tech in Information & Technology",
    school: "DA-IICT",
    period: "2021 – 2025",
    note: "First class with distinction",
  },
  {
    degree: "Higher Secondary School",
    school: "Lotus High School",
    period: "2019 – 2021",
    note: "First class with distinction",
  },
];
