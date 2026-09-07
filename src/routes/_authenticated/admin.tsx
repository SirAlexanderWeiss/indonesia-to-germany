import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { admin as adminDict, useT } from "@/lib/i18n";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Panel Admin — Permintaan Kontak" },
      {
        name: "description",
        content: "Daftar permintaan kontak dari calon murid kelas bahasa Jerman A1 dan A2.",
      },
      { property: "og:title", content: "Panel Admin — Permintaan Kontak" },
      { property: "og:description", content: "Kelola semua permintaan kontak di satu tempat." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Request = {
  id: string;
  name: string;
  email: string;
  goal: string;
  current_level: string;
  course_level: string;
  message: string;
  language: string;
  status: string;
  admin_note: string;
  created_at: string;
};

const STATUSES = ["new", "in_progress", "done"] as const;

function AdminPage() {
  const t = useT(adminDict);
  const navigate = useNavigate();
  const [rows, setRows] = useState<Request[] | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error" | "denied">("loading");
  const [email, setEmail] = useState("");
  const [savedId, setSavedId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (active) setEmail(userData.user?.email ?? "");
      const uid = userData.user?.id;
      if (!uid) return;
      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: uid,
        _role: "admin",
      });
      if (!active) return;
      if (!isAdmin) {
        setState("denied");
        return;
      }
      const { data, error } = await supabase
        .from("contact_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (!active) return;
      if (error) setState("error");
      else {
        setRows(data as Request[]);
        setState("ready");
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function updateRow(id: string, patch: Partial<Request>) {
    setRows((prev) => prev?.map((r) => (r.id === id ? { ...r, ...patch } : r)) ?? prev);
    await supabase.from("contact_requests").update(patch).eq("id", id);
    setSavedId(id);
    setTimeout(() => setSavedId((v) => (v === id ? null : v)), 2000);
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">{t.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="rounded-full border border-border px-5 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
        >
          {t.signOut}
        </button>
      </div>

      {state === "loading" && <p className="mt-10 text-sm text-muted-foreground">{t.loading}</p>}
      {state === "error" && <p className="mt-10 text-sm text-destructive">{t.error}</p>}
      {state === "denied" && (
        <div className="surface-card mt-10 p-7">
          <p className="text-sm">{t.noAccess}</p>
          <p className="mt-3 font-semibold">{email}</p>
        </div>
      )}

      {state === "ready" && rows && rows.length === 0 && (
        <p className="mt-10 text-sm text-muted-foreground">{t.empty}</p>
      )}

      {state === "ready" && rows && rows.length > 0 && (
        <div className="mt-10 space-y-5">
          {rows.map((r) => (
            <article key={r.id} className="surface-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-display text-xl">{r.name}</p>
                  <a
                    href={`mailto:${r.email}`}
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    {r.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    {r.course_level === "unsure" ? "?" : r.course_level}
                  </span>
                  <select
                    value={r.status}
                    onChange={(e) => updateRow(r.id, { status: e.target.value })}
                    className="rounded-full border border-input bg-card px-3 py-1.5 text-xs font-semibold"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {t.status[s]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-4">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    {t.cols.date}
                  </dt>
                  <dd>{new Date(r.created_at).toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    {t.cols.courseLevel}
                  </dt>
                  <dd>{r.course_level}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    {t.cols.level}
                  </dt>
                  <dd>{r.current_level || "—"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    {t.cols.language}
                  </dt>
                  <dd>{r.language.toUpperCase()}</dd>
                </div>
                <div className="sm:col-span-4">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    {t.cols.goal}
                  </dt>
                  <dd>{r.goal || "—"}</dd>
                </div>
                <div className="sm:col-span-4">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                    {t.cols.message}
                  </dt>
                  <dd className="whitespace-pre-line">{r.message || "—"}</dd>
                </div>
              </dl>

              <div className="mt-5">
                <label
                  htmlFor={`note-${r.id}`}
                  className="text-xs uppercase tracking-wide text-muted-foreground"
                >
                  {t.cols.note}
                </label>
                <textarea
                  id={`note-${r.id}`}
                  rows={2}
                  value={r.admin_note}
                  placeholder={t.notePlaceholder}
                  onChange={(e) =>
                    setRows(
                      (prev) =>
                        prev?.map((x) =>
                          x.id === r.id ? { ...x, admin_note: e.target.value } : x,
                        ) ?? prev,
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:border-primary"
                />
                <div className="mt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateRow(r.id, { admin_note: r.admin_note })}
                    className="rounded-full border border-border px-4 py-1.5 text-xs font-semibold hover:border-primary hover:text-primary"
                  >
                    {t.saveNote}
                  </button>
                  {savedId === r.id && <span className="text-xs text-primary">{t.saved}</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
