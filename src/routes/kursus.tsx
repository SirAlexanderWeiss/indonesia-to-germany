import { createFileRoute, Link } from "@tanstack/react-router";

import { kursus as kursusDict, useT } from "@/lib/i18n";

export const Route = createFileRoute("/kursus")({
  head: () => ({
    meta: [
      { title: "Kursus & Harga — Bahasa Jerman A1 Online" },
      {
        name: "description",
        content:
          "Pilihan kelas bahasa Jerman A1: kelas grup kecil, privat 1-on-1, dan paket persiapan ujian Goethe/telc A1 untuk orang Indonesia.",
      },
      { property: "og:title", content: "Kursus & Harga — Bahasa Jerman A1 Online" },
      {
        property: "og:description",
        content: "Kelas grup kecil, privat, dan persiapan ujian A1 — semua online dari Indonesia.",
      },
      { property: "og:url", content: "/kursus" },
    ],
    links: [{ rel: "canonical", href: "/kursus" }],
  }),
  component: Kursus,
});

function Kursus() {
  const t = useT(kursusDict);

  return (
    <>
      <section className="gradient-warm">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <p className="eyebrow text-primary">{t.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl md:text-5xl">{t.h1}</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">{t.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {t.courses.map((c, i) => {
            const featured = i === 1;
            return (
              <article
                key={c.name}
                className={
                  featured
                    ? "rounded-2xl border border-primary bg-jungle p-8 text-jungle-foreground shadow-[var(--shadow-lift)]"
                    : "surface-card p-8"
                }
              >
                <p className={featured ? "eyebrow text-gold" : "eyebrow text-primary"}>{c.tag}</p>
                <h2 className="mt-3 font-display text-2xl">{c.name}</h2>
                <p
                  className={
                    featured
                      ? "mt-1 text-sm text-jungle-foreground/70"
                      : "mt-1 text-sm text-muted-foreground"
                  }
                >
                  {c.price}
                </p>
                <p
                  className={
                    featured
                      ? "mt-4 text-sm leading-relaxed text-jungle-foreground/85"
                      : "mt-4 text-sm leading-relaxed text-muted-foreground"
                  }
                >
                  {c.body}
                </p>
                <ul className="mt-6 space-y-2 text-sm">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className={featured ? "text-gold" : "text-primary"}>◆</span>
                      <span className={featured ? "text-jungle-foreground/85" : ""}>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/kontak"
                  className={
                    featured
                      ? "mt-7 inline-flex rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-gold-foreground"
                      : "mt-7 inline-flex rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
                  }
                >
                  {t.button}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="ornament-rule" />
        <h2 className="mt-10 font-display text-3xl">{t.extrasTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {t.extras.map((e) => (
            <div key={e.title} className="rounded-2xl bg-sand p-6">
              <h3 className="font-display text-lg">{e.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{e.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
