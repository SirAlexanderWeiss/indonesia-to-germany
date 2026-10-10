import { createFileRoute, Link } from "@tanstack/react-router";

import teacherPortrait from "@/assets/teacher-portrait.jpg";
import { tentang as tentangDict, useT } from "@/lib/i18n";

export const Route = createFileRoute("/ueber-mich")({
  head: () => ({
    meta: [
      { title: "Tentang Saya — Dari Bali ke Jerman" },
      {
        name: "description",
        content:
          "Kisah seorang perempuan Bali yang belajar bahasa Jerman dari nol, pindah ke Jerman, dan kini mengajar A1 untuk orang Indonesia.",
      },
      { property: "og:title", content: "Tentang Saya — Dari Bali ke Jerman" },
      {
        property: "og:description",
        content: "Belajar dari orang yang pernah melewati jalan yang sama: Bali, bahasa, visa, Jerman.",
      },
      { property: "og:url", content: "/ueber-mich" },
    ],
    links: [{ rel: "canonical", href: "/ueber-mich" }],
  }),
  component: Tentang,
});

function Tentang() {
  const t = useT(tentangDict);

  return (
    <>
      <section className="gradient-hero text-primary-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1fr_0.8fr] md:py-24">
          <div>
            <p className="eyebrow text-gold">{t.eyebrow}</p>
            <h1 className="mt-4 font-display text-4xl md:text-5xl">{t.h1}</h1>
            <p className="mt-6 max-w-xl text-primary-foreground/85">{t.lead}</p>
          </div>
          <img
            src={teacherPortrait}
            alt={t.portraitAlt}
            width={1008}
            height={1200}
            loading="lazy"
            className="w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
          />
        </div>
        <div className="ornament-rule" />
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="font-display text-3xl">{t.title}</h2>
        <p className="mt-5 text-muted-foreground">{t.p1}</p>
        <p className="mt-4 text-muted-foreground">{t.p2}</p>
        <p className="mt-4 text-muted-foreground">{t.p3}</p>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {t.values.map((v) => (
            <div key={v.title} className="rounded-2xl bg-sand p-6">
              <p className="eyebrow text-primary">{v.tag}</p>
              <h3 className="mt-2 font-display text-lg">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>

        <Link
          to="/kontakt"
          className="mt-14 inline-flex rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground"
        >
          {t.cta}
        </Link>
      </section>
    </>
  );
}
