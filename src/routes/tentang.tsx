import { createFileRoute, Link } from "@tanstack/react-router";

import teacherPortrait from "@/assets/teacher-portrait.jpg";

export const Route = createFileRoute("/tentang")({
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
      { property: "og:url", content: "/tentang" },
    ],
    links: [{ rel: "canonical", href: "/tentang" }],
  }),
  component: Tentang,
});

const values = [
  { de: "Geduld", title: "Sabar", body: "Tidak ada pertanyaan yang terlalu dasar. Kita ulang sampai paham." },
  { de: "Struktur", title: "Terstruktur", body: "Kurikulum jelas dari A1.1 sampai siap ujian, dengan target tiap minggu." },
  { de: "Heimat", title: "Terasa rumah", body: "Kelas berbahasa Indonesia, dengan humor dan kehangatan khas kita." },
];

function Tentang() {
  return (
    <>
      <section className="gradient-hero text-primary-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1fr_0.8fr] md:py-24">
          <div>
            <p className="eyebrow text-gold">Tentang saya · Über mich</p>
            <h1 className="mt-4 font-display text-4xl md:text-5xl">
              Lahir di Bali, tinggal di Jerman, mengajar untuk kamu.
            </h1>
            <p className="mt-6 max-w-xl text-primary-foreground/85">
              Saya tumbuh di antara sawah, upacara, dan suara gamelan. Lalu hidup membawa saya ke
              Jerman: musim dingin pertama, formulir yang panjang, dan bahasa yang terdengar seperti
              teka-teki. Saya belajar dari nol — dan berhasil.
            </p>
          </div>
          <img
            src={teacherPortrait}
            alt="Guru bahasa Jerman asal Bali di ruang kerjanya di Jerman"
            width={1008}
            height={1200}
            loading="lazy"
            className="w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
          />
        </div>
        <div className="ornament-rule" />
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="font-display text-3xl">Kenapa saya mengajar</h2>
        <p className="mt-5 text-muted-foreground">
          Waktu saya menyiapkan kepindahan, hampir semua materi bahasa Jerman ditulis dalam bahasa
          Inggris atau Jerman. Banyak teman Indonesia menyerah bukan karena tidak mampu, tetapi
          karena penjelasannya terasa jauh dari cara kita berpikir.
        </p>
        <p className="mt-4 text-muted-foreground">
          Di kelas saya, tata bahasa dijelaskan dengan bahasa Indonesia dan contoh yang akrab, tetapi
          latihannya tetap tegas seperti standar Jerman. Kombinasi itulah yang membuat A1 terasa
          mungkin — bahkan menyenangkan.
        </p>
        <p className="mt-4 text-muted-foreground">
          Selain bahasa, saya juga berbagi hal-hal kecil yang tidak ada di buku: cara menyapa
          tetangga, bagaimana rasanya rindu rumah, dan bagaimana tetap menjadi diri sendiri di negara
          baru.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl bg-sand p-6">
              <p className="eyebrow text-primary">{v.de}</p>
              <h3 className="mt-2 font-display text-lg">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>

        <Link
          to="/kontak"
          className="mt-14 inline-flex rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground"
        >
          Ngobrol dengan saya
        </Link>
      </section>
    </>
  );
}
