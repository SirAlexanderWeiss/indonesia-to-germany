import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/kontak")({
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
      { property: "og:url", content: "/kontak" },
    ],
    links: [{ rel: "canonical", href: "/kontak" }],
  }),
  component: Kontak,
});

const CONTACT_EMAIL = "hallo@example.com";

const goals = [
  "Belum tahu, masih cari info",
  "Kerja / Ausbildung di Jerman",
  "Kuliah di Jerman",
  "Menyusul pasangan / keluarga",
  "Au-pair / FSJ",
];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function Kontak() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    goal: goals[0],
    level: "Total pemula",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function validate(): Errors {
    const e: Errors = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name) e.name = "Mohon isi nama kamu.";
    else if (name.length > 100) e.name = "Nama terlalu panjang (maks. 100 karakter).";
    if (!email) e.email = "Mohon isi alamat email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 255)
      e.email = "Alamat email tidak valid.";
    if (!message) e.message = "Ceritakan sedikit tentang rencana kamu.";
    else if (message.length > 1500) e.message = "Pesan terlalu panjang (maks. 1500 karakter).";
    return e;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const subject = `Pendaftaran kelas A1 — ${form.name.trim()}`;
    const body = [
      `Nama: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Tujuan: ${form.goal}`,
      `Level: ${form.level}`,
      "",
      form.message.trim(),
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20";

  return (
    <>
      <section className="gradient-warm">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="eyebrow text-primary">Kontak · Kontakt</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">
            Ceritakan rencana kamu, saya balas secepatnya
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Konsultasi pertama gratis, 20 menit, tanpa kewajiban. Boleh pakai bahasa Indonesia —
            atau coba sedikit bahasa Jerman kalau berani. 😊
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} noValidate className="surface-card p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-semibold">
                Nama
              </label>
              <input
                id="name"
                value={form.name}
                maxLength={100}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={field}
                placeholder="Nama lengkap"
              />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-semibold">
                Email
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
                Tujuan ke Jerman
              </label>
              <select
                id="goal"
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: e.target.value })}
                className={field}
              >
                {goals.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="level" className="text-sm font-semibold">
                Level sekarang
              </label>
              <select
                id="level"
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className={field}
              >
                <option>Total pemula</option>
                <option>Sudah belajar sedikit</option>
                <option>Sudah pernah A1, mau lanjut</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="text-sm font-semibold">
              Pesan
            </label>
            <textarea
              id="message"
              rows={5}
              maxLength={1500}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={field}
              placeholder="Halo! Saya berencana pindah ke Jerman tahun depan dan ingin mulai dari A1…"
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="mt-7 w-full rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            Kirim pesan
          </button>

          {sent && (
            <p className="mt-4 rounded-xl bg-secondary px-4 py-3 text-sm text-secondary-foreground">
              Terima kasih! Program email kamu akan terbuka dengan pesan yang sudah siap dikirim.
            </p>
          )}
        </form>

        <aside className="space-y-6">
          <div className="rounded-2xl bg-jungle p-7 text-jungle-foreground">
            <p className="eyebrow text-gold">Jam kelas</p>
            <p className="mt-3 text-sm text-jungle-foreground/85">
              Senin–Jumat, sore hingga malam WIB (pagi/siang MEZ). Jadwal privat bisa disesuaikan.
            </p>
          </div>
          <div className="rounded-2xl bg-sand p-7">
            <p className="eyebrow text-primary">Sering ditanya</p>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-semibold">Harus punya dasar dulu?</dt>
                <dd className="text-muted-foreground">
                  Tidak. Kelas A1.1 dimulai benar-benar dari nol.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Kelasnya online?</dt>
                <dd className="text-muted-foreground">
                  Ya, semua lewat Zoom — bisa diikuti dari mana saja di Indonesia.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Bisa ikut ujian resmi?</dt>
                <dd className="text-muted-foreground">
                  Saya bantu persiapan Goethe/telc A1 dan menjelaskan cara mendaftarnya.
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </section>
    </>
  );
}
