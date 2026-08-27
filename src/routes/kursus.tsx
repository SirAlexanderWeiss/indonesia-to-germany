import { createFileRoute, Link } from "@tanstack/react-router";

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

const courses = [
  {
    name: "Kelas Grup A1.1",
    de: "Kleingruppe",
    price: "mulai dari 8 minggu",
    body: "Fondasi total pemula: perkenalan, angka, keluarga, belanja, dan artikel der/die/das.",
    points: ["Maks. 6 peserta", "2× 90 menit per minggu", "Materi PDF + rekaman kelas"],
  },
  {
    name: "Kelas Grup A1.2",
    de: "Aufbau",
    price: "lanjutan A1.1",
    body: "Perfekt, kalimat modal, dan percakapan sehari-hari sampai siap ujian A1.",
    points: ["Latihan bicara tiap sesi", "Simulasi ujian", "Koreksi tugas personal"],
    featured: true,
  },
  {
    name: "Privat 1-on-1",
    de: "Einzelunterricht",
    price: "jadwal fleksibel",
    body: "Tempo dan materi disesuaikan dengan tujuan kamu — kerja, Ausbildung, atau visa keluarga.",
    points: ["Jadwal bebas (WIB/MEZ)", "Fokus kelemahan kamu", "Bisa berpasangan"],
  },
];

const extras = [
  { title: "Persiapan ujian Goethe/telc A1", body: "Latihan empat bagian ujian plus strategi menjawab." },
  { title: "Sesi budaya & persiapan pindah", body: "Anmeldung, Krankenversicherung, kerja, dan etika sehari-hari di Jerman." },
  { title: "Klub bicara mingguan", body: "Sesi santai 45 menit untuk melatih keberanian berbicara." },
];

function Kursus() {
  return (
    <>
      <section className="gradient-warm">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <p className="eyebrow text-primary">Kursus · Kurse</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl md:text-5xl">
            Kelas A1 yang dibuat khusus untuk orang Indonesia
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Semua kelas berlangsung online lewat Zoom, dengan jam yang ramah untuk zona waktu
            Indonesia. Penjelasan dalam bahasa Indonesia, latihan penuh dalam bahasa Jerman.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {courses.map((c) => (
            <article
              key={c.name}
              className={
                c.featured
                  ? "rounded-2xl border border-primary bg-jungle p-8 text-jungle-foreground shadow-[var(--shadow-lift)]"
                  : "surface-card p-8"
              }
            >
              <p className={c.featured ? "eyebrow text-gold" : "eyebrow text-primary"}>{c.de}</p>
              <h2 className="mt-3 font-display text-2xl">{c.name}</h2>
              <p
                className={
                  c.featured
                    ? "mt-1 text-sm text-jungle-foreground/70"
                    : "mt-1 text-sm text-muted-foreground"
                }
              >
                {c.price}
              </p>
              <p
                className={
                  c.featured
                    ? "mt-4 text-sm leading-relaxed text-jungle-foreground/85"
                    : "mt-4 text-sm leading-relaxed text-muted-foreground"
                }
              >
                {c.body}
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className={c.featured ? "text-gold" : "text-primary"}>◆</span>
                    <span className={c.featured ? "text-jungle-foreground/85" : ""}>{p}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/kontak"
                className={
                  c.featured
                    ? "mt-7 inline-flex rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-gold-foreground"
                    : "mt-7 inline-flex rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
                }
              >
                Tanya harga
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="ornament-rule" />
        <h2 className="mt-10 font-display text-3xl">Tambahan yang bisa dipilih</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {extras.map((e) => (
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
