import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

import { supabase } from "@/integrations/supabase/client";
import { auth as authDict, useT } from "@/lib/i18n";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Masuk — Panel Admin Kelas Bahasa Jerman" },
      {
        name: "description",
        content: "Halaman masuk untuk pengelola kelas bahasa Jerman A1 dan A2.",
      },
      { property: "og:title", content: "Masuk — Panel Admin" },
      { property: "og:description", content: "Area masuk khusus pengelola situs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const t = useT(authDict);
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setMessage(error.message);
      navigate({ to: "/admin", replace: true });
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setBusy(false);
      if (error) return setMessage(error.message);
      if (data.session) navigate({ to: "/admin", replace: true });
      else setMessage(t.checkEmail);
    }
  }

  const field =
    "mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-3 focus:ring-primary/20";

  return (
    <section className="mx-auto max-w-md px-5 py-20">
      <h1 className="font-display text-3xl">{t.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t.subtitle}</p>

      <form onSubmit={handleSubmit} className="surface-card mt-8 p-7">
        <label htmlFor="email" className="text-sm font-semibold">
          {t.email}
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={field}
        />

        <div className="mt-5">
          <label htmlFor="password" className="text-sm font-semibold">
            {t.password}
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={field}
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          className="mt-7 w-full rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {busy ? t.working : mode === "in" ? t.signIn : t.signUp}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "in" ? "up" : "in")}
          className="mt-4 w-full text-xs font-semibold text-muted-foreground hover:text-primary"
        >
          {mode === "in" ? t.toggleToSignUp : t.toggleToSignIn}
        </button>

        {message && <p className="mt-4 text-sm text-destructive">{message}</p>}
      </form>
    </section>
  );
}
