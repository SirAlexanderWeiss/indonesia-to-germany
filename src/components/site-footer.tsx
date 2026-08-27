import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-jungle text-jungle-foreground">
      <div className="ornament-rule" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Sampai jumpa di Jerman</p>
          <p className="mt-3 max-w-xs text-sm text-jungle-foreground/75">
            Kursus bahasa Jerman A1 online untuk orang Indonesia yang bersiap pindah ke Jerman —
            diajar oleh orang Bali yang sudah melewati jalan itu.
          </p>
        </div>
        <div>
          <p className="eyebrow text-gold">Navigasi</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/kursus" className="text-jungle-foreground/80 hover:text-gold">
                Kursus &amp; harga
              </Link>
            </li>
            <li>
              <Link to="/tentang" className="text-jungle-foreground/80 hover:text-gold">
                Tentang saya
              </Link>
            </li>
            <li>
              <Link to="/kontak" className="text-jungle-foreground/80 hover:text-gold">
                Kontak
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-gold">Selamat datang · Willkommen</p>
          <p className="mt-4 text-sm text-jungle-foreground/75">
            Kelas online via Zoom · WIB &amp; MEZ friendly
          </p>
          <Link
            to="/kontak"
            className="mt-5 inline-flex rounded-full bg-gold px-5 py-2 text-sm font-semibold text-gold-foreground"
          >
            Tanya jadwal
          </Link>
        </div>
      </div>
      <div className="border-t border-jungle-foreground/15 px-5 py-5 text-center text-xs text-jungle-foreground/60">
        © {new Date().getFullYear()} · Kursus Bahasa Jerman A1 · Bali → Deutschland
      </div>
    </footer>
  );
}
