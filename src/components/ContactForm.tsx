"use client";

import { useState } from "react";

type Props = { email: string; endpoint: string };

const topics = [
  { value: "job", label: "A job or internship" },
  { value: "project", label: "A project I need built" },
  { value: "apps", label: "One of your apps" },
  { value: "other", label: "Something else" },
];

type Status = { kind: "idle" | "sending" | "sent" | "error"; message?: string };

export function ContactForm({ email, endpoint }: Props) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const topic = topics.find((t) => t.value === data.topic)?.label ?? "Hello";

    // Without a form backend, hand the message to the visitor's email app.
    if (!endpoint) {
      const body = `${data.message}\n\n${data.name}${data.reply ? ` (${data.reply})` : ""}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: "sent", message: "Your email app should open with the message ready to send." });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, subject: topic }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus({ kind: "sent", message: "Message sent. I'll reply within a couple of days." });
    } catch {
      setStatus({ kind: "error", message: `The message didn't send. Email me directly at ${email}.` });
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the address is visible and selectable */
    }
  }

  const field =
    "w-full rounded-lg border border-rule bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:border-cobalt focus:outline-none";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div>
        <p className="text-lg text-muted">Prefer email?</p>
        <p className="mt-1 select-all break-all text-xl font-semibold">{email}</p>
        <button
          type="button"
          onClick={copyEmail}
          className="mt-3 rounded-full border border-rule px-4 py-1.5 text-sm font-semibold transition hover:border-ink/30"
        >
          {copied ? "Copied" : "Copy email"}
        </button>
      </div>

      <form onSubmit={onSubmit} className="grid gap-5">
        <div className="grid gap-2">
          <label htmlFor="topic" className="font-semibold">
            What's this about?
          </label>
          <select id="topic" name="topic" className={field} defaultValue="job">
            {topics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="name" className="font-semibold">
              Your name
            </label>
            <input id="name" name="name" required autoComplete="name" className={field} />
          </div>
          <div className="grid gap-2">
            <label htmlFor="reply" className="font-semibold">
              Your email
            </label>
            <input id="reply" name="reply" type="email" required autoComplete="email" className={field} />
          </div>
        </div>
        <div className="grid gap-2">
          <label htmlFor="message" className="font-semibold">
            Message
          </label>
          <textarea id="message" name="message" required rows={5} className={field} />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status.kind === "sending"}
            className="rounded-full bg-cobalt px-6 py-3 font-semibold text-on-cobalt transition hover:opacity-90 disabled:opacity-60"
          >
            {status.kind === "sending" ? "Sending…" : "Send message"}
          </button>
          {status.message && (
            <p role="status" className={status.kind === "error" ? "text-safer" : "text-faster"}>
              {status.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
