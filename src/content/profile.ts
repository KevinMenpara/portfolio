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
  /** Case studies for the work done in this chapter ("work" project slugs). */
  caseStudies?: string[];
  /** Slugs of personal projects built during this chapter; drawn as branches. */
  projects?: string[];
};

/** Each project's branch colour, used everywhere the project appears. */
export type BranchColor = "main" | "blue" | "green" | "amber" | "violet" | "rose";

export type Project = {
  slug: string;
  /** "work" projects happened at a company and sit on the main line; "personal" ones are branches. */
  kind: "work" | "personal";
  /** For work projects: the company. */
  company?: string;
  /** For team projects: the team and your part in it, shown on the case study. */
  team?: string;
  /** Hidden projects stay in this file but don't appear anywhere on the site. */
  hidden?: boolean;
  color: BranchColor;
  title: string;
  year: string;
  summary: string;
  stack: string[];
  image?: StaticImageData;
  live?: string;
  source?: string;
  /** Optional architecture diagram on the case-study page. */
  diagram?: { title: string; steps: { name: string; detail: string; assumed?: boolean }[] };
  /** Case-study page. */
  problem: string;
  approach: string[];
  outcome: string;
};

export type Service = { title: string; body: string; stack: string[] };
export type Note = { title: string; href: string; date: string; summary: string };
export type Testimonial = { quote: string; name: string; role: string; company: string };

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
  /** Résumé PDF in /public. The download button appears once the file exists. */
  resumePdf: "resume.pdf",
  /** Privacy-friendly analytics. Set your GoatCounter code (e.g. "kmenpara") to switch it on. */
  analytics: { goatcounter: "" },
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
      { kind: "added", text: "Owned deployment for our team's Django course project" },
    ],
    projects: ["srs"],
  },
  {
    id: "rovren",
    year: "2023",
    when: "May – Jul 2023",
    title: "Full-stack developer intern",
    place: "Rovren Technology",
    summary: "Shipped two production systems for real clients, including secure registration for 1,000+ users.",
    story:
      "My first production work, on ToolJet, PostgreSQL and AWS S3. The RITAAwards platform handled registrations for an IT industry association's awards, and GeoPanap managed land leases and environmental compliance for a semi-government agency. Real users, real data, and a real need to keep it secure.",
    changes: [
      { kind: "added", text: "RITAAwards: registration and verification, end to end" },
      { kind: "safer", text: "AES-256 encryption cut data-breach risk by 95%" },
      { kind: "added", text: "GeoPanap: lease, customer and compliance tracking with versioned database migrations" },
    ],
    metric: { value: "1,000+", label: "users registered through the platform" },
    caseStudies: ["rita-awards", "geopanap"],
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
    caseStudies: ["ers"],
    projects: ["placebook"],
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
    title: "What's next",
    place: "Rajkot, India",
    summary: "Focused on backend, infrastructure and LLM tooling, and open to new work.", // ASSUMED
    // ASSUMED: replace with your current role, company and focus.
    story:
      "After graduating I've kept building on what the internships taught me: backend systems, infrastructure, and using LLMs to make operations calmer. I'm open to full-time roles, freelance projects and conversations with early-stage teams.",
    changes: [],
  },
];

/* ───────────────────────── Projects ───────────────────────── */

export const allProjects: Project[] = [
  {
    slug: "ers",
    kind: "work",
    company: "Improwised Technology",
    color: "main",
    title: "Error-resolving system",
    year: "2024",
    summary: "An LLM-powered system that diagnoses infrastructure errors and suggests fixes, 34% faster than before.",
    stack: ["Python", "LLMs", "Llama", "Outlines", "Robusta", "Message queue", "Kubernetes"],
    diagram: {
      title: "How an error gets resolved",
      steps: [
        { name: "Kubernetes cluster", detail: "A workload fails or misbehaves." },
        { name: "Robusta", detail: "Picks up the alert and collects context from the cluster." },
        { name: "Message queue", detail: "Decouples alert intake from analysis, so bursts don't drop errors." },
        { name: "ERS workers", detail: "Python services that build the diagnosis request." },
        { name: "Outlines", detail: "Generates structured prompts and constrains the model's output." },
        { name: "LLM proxy", detail: "One reliable gateway for model traffic, with retries and routing." },
        { name: "Llama", detail: "Open model that proposes the likely cause and fix." },
        { name: "Suggested fix", detail: "Returned to the on-call engineer alongside the alert.", assumed: true },
      ],
    },
    // ASSUMED: the problem framing and the final delivery step. Correct them from your experience.
    problem:
      "Infrastructure alerts arrive faster than engineers can investigate them, and many failures are variations of problems the team has already solved. Diagnosing each one by hand slows down recovery.",
    approach: [
      "Built the error-resolving system (ERS) in Python, using large language models to diagnose infrastructure-level errors.",
      "Routed all model traffic through an LLM proxy for robust, consistent communication with the models.",
      "Used Outlines to generate structured prompts, so the model's answers came back in a predictable shape.",
      "Put a message queue between alert intake and analysis for loose coupling, which improved reliability by 70%.",
      "Integrated open-source tooling: Robusta for Kubernetes alerting and context, and open models like Llama.",
    ],
    outcome: "Infrastructure-level errors were resolved 34% faster, and the system was 70% more reliable thanks to the queue-based design.",
  },
  {
    slug: "rita-awards",
    kind: "work",
    company: "Rovren Technology",
    color: "main",
    title: "RITAAwards registration",
    year: "2023",
    summary: "A secure registration and verification platform for an awards programme, used by 1,000+ people.",
    stack: ["ToolJet", "AWS S3", "SMTP", "AES-256"],
    // ASSUMED: the problem framing. Add who the awards were for and the timeline.
    problem:
      "An awards programme needed to register and verify more than a thousand applicants, and their personal details had to stay private.",
    approach: [
      "Built the RITAAwards registration system with ToolJet, storing uploads in AWS S3 and sending verification through SMTP.",
      "Encrypted sensitive data with AES-256, reducing data-breach risk by 95%.",
      "Created an admin interface so the organisers could review registrations and handle administrative tasks.",
    ],
    outcome: "A reliable, private registration process that handled 1,000+ users and made the organisers' work faster.",
  },
  {
    slug: "geopanap",
    kind: "work",
    company: "Rovren Technology", // ASSUMED: confirm this was Rovren client work
    color: "main",
    title: "GeoPanap",
    year: "2023", // ASSUMED year
    summary: "A land-lease and environmental-compliance platform for a semi-government agency in the mining sector.",
    stack: ["ToolJet", "PostgreSQL", "PostgREST", "AWS S3", "Docker", "sql-migrate"],
    diagram: {
      title: "What the platform tracks",
      steps: [
        { name: "Customers", detail: "Lease holders and their contact details, linked to their leases." },
        { name: "Leases", detail: "Land lease agreements with survey details and expiry dates." },
        { name: "Minerals", detail: "The minerals each lease covers for exploration and extraction." },
        { name: "Environmental clearance", detail: "Clearance records with status updates and expiry dates." },
        { name: "GPCB records", detail: "Pollution-control-board documentation and approval status." },
        { name: "Documents", detail: "Regulatory files stored securely in AWS S3." },
      ],
    },
    // ASSUMED: the problem framing and outcome. Correct them from your experience.
    problem:
      "A semi-government agency had to keep track of land leases, lease holders, environmental clearances and pollution-control-board approvals for mineral extraction. Each has its own documents and expiry dates, and a missed renewal has regulatory consequences.",
    approach: [
      "Designed the PostgreSQL schema for customers, leases, minerals, environmental clearance (EC) and GPCB records, with versioned migrations run through sql-migrate in Docker.",
      "Exposed the database through a PostgREST API and built the desktop and mobile interfaces in ToolJet.",
      "Tracked expiry dates and status updates for every lease and compliance record, so renewals are visible before they lapse.",
      "Stored regulatory documents in AWS S3 and protected the app with authentication, access control and encrypted credentials.",
    ],
    outcome: "One place to manage leases and compliance records, with expiry dates tracked instead of chased.",
  },
  {
    slug: "srs",
    kind: "personal",
    color: "blue",
    title: "Student Registration System",
    year: "2024",
    team: "Team of five, IT314 Software Development course at DA-IICT. I owned deployment.",
    summary: "A team-built Django system for college registration and online-exam verification. I owned deployment.",
    stack: ["Python", "Django", "GitHub Actions", "Heroku"],
    image: srs,
    live: "https://srs.kmmenpara.xyz/",
    problem:
      "Colleges running online exams need to register applicants, verify who they are, and run the test, without juggling spreadsheets and email threads.",
    approach: [
      "Built by a team of five for the IT314 Software Development course, from requirements and use cases through to a working app.",
      "The app covers registration, email OTP verification, applications, deadlines, exam questions and results.",
      "My part was getting it to production: I set up the GitHub Actions workflow for the Django app, prepared the production settings, and deployed it to Heroku.",
    ],
    outcome: "A working registration and exam system shipped by the team, and my first experience taking a team project to production.",
  },
  {
    slug: "placebook",
    kind: "personal",
    color: "green",
    title: "Placebook",
    year: "2024",
    summary: "A MERN app for sharing photos and locations of places you love: my first end-to-end JavaScript project.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Firebase Hosting"],
    image: placebook,
    live: "https://placebook.kmmenpara.xyz/",
    // ASSUMED: if Placebook started from a course, add a line saying what you built beyond it.
    problem: "Travel recommendations get lost in chat threads. Placebook gives each place a page with a photo, an address and a map.",
    approach: [
      "React front end with sign-up, login and per-user collections of places.",
      "Express and Node.js API with JWT authentication, image uploads and MongoDB storage.",
      "Addresses are turned into map coordinates with the Google Geocoding API, so every place shows where it is.",
      "Front end deployed on Firebase Hosting, with preview deploys on pull requests.",
    ],
    outcome: "A complete full-stack JavaScript app, from authentication and file uploads to deployment.",
  },
  {
    slug: "payme",
    kind: "personal",
    // Hidden until fixed: passwords must be hashed (not encrypted) and receipt downloads need an ownership check.
    hidden: true,
    color: "amber",
    title: "PayMe",
    year: "2024",
    summary: "Sign-up with email two-factor verification and PDF receipts, in Django.",
    stack: ["Python", "Django"],
    image: payme,
    source: "https://github.com/KevinMenpara/PaymentGateway",
    problem: "Draft: describe the problem PayMe solves once the security fixes are in.",
    approach: ["Email two-factor verification on sign-up and login.", "PDF receipts generated with ReportLab."],
    outcome: "Draft.",
  },
];

/** Only the projects shown on the site. */
export const projects: Project[] = allProjects.filter((p) => !p.hidden);

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

/**
 * Quotes from people you've worked with. The section appears once there is at
 * least one. Example:
 * { quote: "…", name: "Jane Doe", role: "Engineering lead", company: "Improwised Technology" }
 */
export const testimonials: Testimonial[] = [];

/** Add posts here; the notes section appears once there is at least one. */
export const notes: Note[] = [];

export const education = [
  {
    title: "B.Tech in Information & Technology",
    place: "DA-IICT, Gandhinagar",
    when: "2021 – 2025",
    detail: "First class with distinction. Batch representative and event coordinator.",
  },
  { title: "Higher secondary", place: "Lotus High School", when: "2019 – 2021", detail: "First class with distinction." },
];

export const skills = {
  Languages: ["Python", "C/C++", "JavaScript", "SQL"],
  Frameworks: ["Django", "React", "Node.js", "NumPy"],
  Infrastructure: ["Docker", "Kubernetes", "AWS", "EKS", "Jenkins"],
  Data: ["PostgreSQL", "MongoDB"],
};

/** Where the site is published; used for sitemap and social previews. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kevinmenpara.github.io/portfolio").replace(/\/$/, "");

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
