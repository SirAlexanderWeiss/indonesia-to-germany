import { Link } from "@tanstack/react-router";
import { useState } from "react";

const nav = [
  { to: "/", label: "Beranda", de: "Start" },
  { to: "/kursus", label: "Kursus", de: "Kurse" },
  { to: "/tentang", label: "Tentang Saya", de: "Über mich" },
  { to: "/kontak", label: "Kontak", de: "Kontakt" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full gradient-hero font-display text-lg text-primary-foreground">
            A1
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg text-foreground">Bahasa Jerman</span>
            <span className="block text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
              Bali · Deutschland
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/kontak"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Daftar sekarang
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
        >
          <span className="text-lg">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-card px-5 py-4 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-medium text-foreground"
            >
              {item.label} <span className="text-muted-foreground">· {item.de}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
