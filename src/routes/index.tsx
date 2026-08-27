import { createFileRoute, Link } from "@tanstack/react-router";

import heroImage from "@/assets/hero-bali-germany.jpg";
import batikPattern from "@/assets/batik-pattern.jpg";
import teacherPortrait from "@/assets/teacher-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kursus Bahasa Jerman A1 untuk Orang Indonesia" },
      {
        name: "description",
        content:
          "Belajar bahasa Jerman A1 online dari Indonesia bersama guru asal Bali yang sudah pindah ke Jerman. Kelas kecil, materi kehidupan sehari-hari, persiapan visa.",
      },
      { property: "og:title", content: "Kursus Bahasa Jerman A1 untuk Orang Indonesia" },
      {
        property: "og:description",
        content:
          "Kelas A1 online dari Bali ke Jerman — bahasa, budaya, dan persiapan pindah, dijelaskan dalam bahasa Indonesia.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const highlights = [
  {
    de: "Muttersprache",
    title: "Dijelaskan dalam bahasa Indonesia",
    body: "Tata bahasa Jerman yang rumit dijelaskan pakai bahasa ibu kamu — tanpa tebak-tebakan.",
  },
  {
    de: "Alltag",
    title: "Bahasa untuk hidup nyata",
    body: "Anmeldung, dokter, sewa apartemen, belanja: kalimat yang benar-benar kamu butuhkan minggu pertama.",
  },
  {
    de: "Kultur",
    title: "Budaya sebelum berangkat",
    body: "Kebiasaan Jerman yang bikin kaget orang Indonesia — dibahas jujur oleh yang sudah mengalaminya.",
  },
];

const steps = [
  { n: "01", title: "Konsultasi gratis", body: "Ngobrol 20 menit lewat WhatsApp atau Zoom soal tujuan kamu." },
  { n: "02", title: "Kelas A1.1 & A1.2", body: "Kelas kecil online, 2× seminggu, cocok dengan jam Indonesia." },
  { n: "03", title: "Siap ujian & pindah", body: "Latihan Goethe/telc A1 plus persiapan hidup di Jerman." },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero text-primary-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="eyebrow text-gold">Selamat datang · Willkommen</p>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] md:text-6xl">
              Bahasa Jerman A1,
              <span className="block italic text-gold">dari Indonesia ke Jerman.</span>
            </h1>
            <p className="mt-6 max-w-md text-base text-primary-foreground/85">
              Kursus online untuk kamu yang masih di Indonesia tapi sudah bermimpi pindah ke Jerman.
              Diajar oleh perempuan Bali yang menempuh jalan yang sama — dan sekarang tinggal di Jerman.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/kontak"
                className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-gold-foreground transition-transform hover:-translate-y-0.5"
              >
                Konsultasi gratis
              </Link>
              <Link
                to="/kursus"
                className="rounded-full border border-primary-foreground/40 px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Lihat kursus
              </Link>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Gerbang pura Bali yang menyatu dengan jalan kota tua Jerman"
              width={1600}
              height={1104}
              className="w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
            />
            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl bg-background px-5 py-4 text-foreground shadow-[var(--shadow-lift)] sm:block">
              <p className="font-display text-2xl">A1.1 · A1.2</p>
              <p className="text-xs text-muted-foreground">Kelas kecil · maks. 6 orang</p>
            </div>
          </div>
        </div>
        <div className="ornament-rule" />
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow text-primary">Kenapa di sini</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl md:text-4xl">
          Dua budaya, satu kelas: rasa Indonesia, struktur Jerman.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {highlights.map((h) => (
            <article key={h.title} className="surface-card p-7">
              <p className="eyebrow text-gold">{h.de}</p>
              <h3 className="mt-3 font-display text-xl">{h.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Teacher strip */}
      <section className="gradient-warm">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-[0.85fr_1fr]">
          <img
            src={teacherPortrait}
            alt="Guru bahasa Jerman asal Bali sedang mengajar online dari rumahnya di Jerman"
            width={1008}
            height={1200}
            loading="lazy"
            className="w-full rounded-3xl object-cover shadow-[var(--shadow-soft)]"
          />
          <div>
            <p className="eyebrow text-primary">Tentang saya · Über mich</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              Saya pernah duduk di kursi kamu.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Saya lahir dan besar di Bali. Beberapa tahun lalu saya belajar bahasa Jerman dari nol,
              mengurus visa, dan pindah ke Jerman. Saya tahu persis bagian mana yang bikin bingung —
              artikel der/die/das, kalimat panjang, dan rasa gugup saat bicara pertama kali.
            </p>
            <p className="mt-4 text-muted-foreground">
              Sekarang saya mengajar A1 untuk orang Indonesia yang sedang menyiapkan langkah yang sama.
            </p>
            <Link
              to="/tentang"
              className="mt-7 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              Baca kisah saya
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow text-primary">Langkah kamu</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl">Dari nol sampai siap terbang</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="border-t-2 border-primary/40 pt-6">
              <span className="font-display text-4xl text-gold">{s.n}</span>
              <h3 className="mt-3 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-jungle text-jungle-foreground">
        <img
          src={batikPattern}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1024}
          height={1024}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
        />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl">Mulai dari kata pertama: „Hallo“</h2>
          <p className="mx-auto mt-4 max-w-xl text-jungle-foreground/80">
            Ceritakan rencana kamu — kerja, Ausbildung, kuliah, atau menyusul keluarga — dan saya
            bantu susun jalur belajar yang pas.
          </p>
          <Link
            to="/kontak"
            className="mt-8 inline-flex rounded-full bg-gold px-8 py-3 text-sm font-semibold text-gold-foreground"
          >
            Hubungi saya
          </Link>
        </div>
      </section>
    </>
  );
}
