import { createFileRoute } from '@tanstack/react-router'
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";

import { sendContactRequest } from "@/lib/kontak.functions";
import { kontak as kontakDict, useLang, useT } from "@/lib/i18n";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontak — Daftar Kelas Bahasa Jerman A1" },
      {
        name: "description",
        content:
          "Kirim pesan untuk konsultasi gratis dan info jadwal kelas bahasa Jerman A1 online untuk orang Indonesia.",
      },
      { property: "og:title", content: "Kontak — Daftar Kelas Bahasa Jerman A1" },
      {
        property: "og:description",
        content: "Konsultasi gratis 20 menit sebelum mulai belajar bahasa Jerman A1.",
      },
      { property: "og:url", content: "/kontakt" },
    ],
    links: [{ rel: "canonical", href: "/kontakt" }],
  }),
  component: Kontak,
});

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function Kontak() {
  const t = useT(kontakDict);
  const { lang } = useLang();
  const sendFn = useServerFn(sendContactRequest);
  const [form, setForm] = useState({
    name: "",
    email: "",
    goalIndex: 0,
    levelIndex: 0,
    courseLevel: "A1",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const goal = t.goals[form.goalIndex] ?? t.goals[0];
  const level = t.levels[form.levelIndex] ?? t.levels[0];

  function validate(): Errors {
    const e: Errors = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name) e.name = t.errors.name;
    else if (name.length > 100) e.name = t.errors.nameLong;
    if (!email) e.email = t.errors.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 255)
      e.email = t.errors.emailInvalid;
    if (!message) e.message = t.errors.message;
    else if (message.length > 1500) e.message = t.errors.messageLong;
    return e;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setStatus("sending");
    const result = await sendFn({
      data: {
        name: form.name.trim(),
        email: form.email.trim(),
        goal,
        currentLevel: level,
        courseLevel: form.courseLevel,
        message: form.message.trim(),
        language: lang,
      },
    });

    if (!result.ok) {
      setStatus("failed");
      return;
    }
    setStatus("sent");
    setForm({ name: "", email: "", goalIndex: 0, levelIndex: 0, courseLevel: "A1", message: "" });
  }


  const field =
    "mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20";

  return (
    <>
      <section className="gradient-warm">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="eyebrow text-primary">{t.eyebrow}</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">{t.h1}</h1>
          <p className="mt-5 max-w-xl text-muted-foreground">{t.intro}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} noValidate className="surface-card p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-semibold">
                {t.name}
              </label>
              <input
                id="name"
                value={form.name}
                maxLength={100}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={field}
                placeholder={t.namePlaceholder}
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-semibold">
                {t.email}
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                maxLength={255}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={field}
                placeholder="nama@email.com"
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="goal" className="text-sm font-semibold">
                {t.goal}
              </label>
              <select
                id="goal"
                value={form.goalIndex}
                onChange={(e) => setForm({ ...form, goalIndex: Number(e.target.value) })}
                className={field}
              >
                {t.goals.map((g, i) => (
                  <option key={g} value={i}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="level" className="text-sm font-semibold">
                {t.level}
              </label>
              <select
                id="level"
                value={form.levelIndex}
                onChange={(e) => setForm({ ...form, levelIndex: Number(e.target.value) })}
                className={field}
              >
                {t.levels.map((l, i) => (
                  <option key={l} value={i}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="courseLevel" className="text-sm font-semibold">
                {t.courseLevel}
              </label>
              <select
                id="courseLevel"
                value={form.courseLevel}
                onChange={(e) => setForm({ ...form, courseLevel: e.target.value })}
                className={field}
              >
                {t.courseLevels.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="text-sm font-semibold">
              {t.message}
            </label>
            <textarea
              id="message"
              rows={5}
              maxLength={1500}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={field}
              placeholder={t.messagePlaceholder}
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-7 w-full rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto"
          >
            {status === "sending" ? t.sending : t.submit}
          </button>

          {status === "sent" && (
            <p className="mt-4 rounded-xl bg-secondary px-4 py-3 text-sm text-secondary-foreground">
              {t.sent}
            </p>
          )}
          {status === "failed" && (
            <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {t.failed}
            </p>
          )}
        </form>

        <aside className="space-y-6">
          <div className="rounded-2xl bg-jungle p-7 text-jungle-foreground">
            <p className="eyebrow text-gold">{t.hoursTitle}</p>
            <p className="mt-3 text-sm text-jungle-foreground/85">{t.hoursBody}</p>
          </div>
          <div className="rounded-2xl bg-sand p-7">
            <p className="eyebrow text-primary">{t.faqTitle}</p>
            <dl className="mt-4 space-y-4 text-sm">
              {t.faq.map((f) => (
                <div key={f.q}>
                  <dt className="font-semibold">{f.q}</dt>
                  <dd className="text-muted-foreground">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </section>
    </>
  );
}
