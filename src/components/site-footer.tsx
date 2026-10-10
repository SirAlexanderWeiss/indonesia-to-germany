import { Link } from "@tanstack/react-router";

import { footer as footerDict, useT } from "@/lib/i18n";

export function SiteFooter() {
  const t = useT(footerDict);

  return (
    <footer className="mt-24 bg-jungle text-jungle-foreground">
      <div className="ornament-rule" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{t.title}</p>
          <p className="mt-3 max-w-xs text-sm text-jungle-foreground/75">{t.body}</p>
        </div>
        <div>
          <p className="eyebrow text-gold">{t.navLabel}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {t.links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-jungle-foreground/80 hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-gold">{t.welcome}</p>
          <p className="mt-4 text-sm text-jungle-foreground/75">{t.hours}</p>
          <Link
            to="/kontakt"
            className="mt-5 inline-flex rounded-full bg-gold px-5 py-2 text-sm font-semibold text-gold-foreground"
          >
            {t.cta}
          </Link>
        </div>
      </div>
      <div className="border-t border-jungle-foreground/15 px-5 py-5 text-center text-xs text-jungle-foreground/60">
        © {new Date().getFullYear()} · {t.legal}
      </div>
    </footer>
  );
}
