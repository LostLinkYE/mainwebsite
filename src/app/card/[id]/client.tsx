"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

type Owner = {
  id: string;
  name: string;
  email: string;
  message?: string;
  createdAt: string;
};

export function CardClient({ id }: { id: string }) {
  const [loading, setLoading] = React.useState(true);
  const [registered, setRegistered] = React.useState<boolean | null>(null);
  const [owner, setOwner] = React.useState<Owner | null>(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [postRegisterLoading, setPostRegisterLoading] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      // reset stale state when the id changes
      setRegistered(null);
      setOwner(null);
      setSuccess(false);
      setLoading(true);
      setError(null);
      setPostRegisterLoading(false);
      try {
        const res = await fetch(`/api/card/${id}`, { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        if (json.registered) {
          setRegistered(true);
          setOwner(json.data);
        } else {
          setRegistered(false);
        }
      } catch (e) {
        if (!cancelled) setError("Failed to load card info.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) {
      setError("Please fill in name and email.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/card/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to register.");
      setSuccess(true);
      setOwner(json.data);
      // Show an intermediate spinner before revealing the registered view
      setPostRegisterLoading(true);
      // Delay flipping to registered for a smoother transition
      const timer = setTimeout(() => {
        setRegistered(true);
        setPostRegisterLoading(false);
        // Confetti celebration when registration view is revealed
        try {
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        } catch {}
      }, 2000);
      // In case of unmount during the timeout
      // Note: relying on effect cleanup by guarding setState after unmount is fine here
      // but we keep a local ref if we later need it.
    } catch (e: any) {
      setError(e?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  const mailto = owner
    ? `mailto:${owner.email}?subject=LostLink%20Card%20${encodeURIComponent(owner.id ?? id)}&body=Hi%20${encodeURIComponent(
        owner.name
      )},%20I%20found%20your%20item.`
    : "#";

  return (
    <section className="relative overflow-hidden bg-black py-20 text-white min-h-[70svh] flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,_rgba(37,99,235,0.18),_transparent_70%)]" />
      <div className="container relative">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="mb-2 text-sm font-semibold tracking-wide text-blue-400">Card {id}</div>
          <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
            {registered ? "This card is registered" : "Register your card"}
          </h1>
        </div>

        {/* Steps are only visible when the card is not registered and not in post-register loading */}
        {!loading && registered === false && !postRegisterLoading && (
          <div className="mx-auto mb-10 max-w-2xl">
            <div className="grid gap-4 sm:grid-cols-3">
              {["Scan", "Fill details", "You're done"].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[--color-brand]/20 text-[--color-brand]">{i + 1}</span>
                  <span className="text-base text-white/90">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div
              key="loading"
              className="mx-auto max-w-xl"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-2 h-4 w-20 rounded bg-white/10 animate-pulse" />
                <div className="h-7 w-48 rounded bg-white/10 animate-pulse" />
                <div className="mt-1 h-5 w-64 rounded bg-white/10 animate-pulse" />
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="h-9 w-28 rounded-full bg-white/10 animate-pulse" />
                  <div className="h-9 w-28 rounded-full bg-white/10 animate-pulse" />
                </div>
              </div>
            </motion.div>
          ) : postRegisterLoading ? (
            <motion.div
              key="post-register"
              className="mx-auto max-w-xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-center py-10">
                <div className="flex items-center gap-3 text-white/90 text-base md:text-lg">
                  <svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                  <span>Finalizing registration…</span>
                </div>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              className="mx-auto max-w-xl"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
            >
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-200">{error}</div>
            </motion.div>
          ) : registered && owner ? (
            <motion.div
              key="registered"
              className="mx-auto max-w-xl"
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-center">
                <div className="mb-2 text-base md:text-lg text-white/60">Owner</div>
                <div className="text-3xl md:text-4xl font-semibold">{owner.name}</div>
                <div className="text-white/80 text-base md:text-lg">{owner.email}</div>
                {owner.message && <div className="mt-3 text-white/80">{owner.message}</div>}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <motion.a
                    href={mailto}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-full bg-[--color-brand] px-5 py-2.5 text-base font-medium text-white hover:opacity-90"
                  >
                    Notify owner
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigator.clipboard?.writeText(window.location.href)}
                    className="rounded-full border border-white/15 px-5 py-2.5 text-base font-medium text-white/90 hover:bg-white/5"
                  >
                    Copy link
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : success ? (
            <motion.div
              key="success"
              className="mx-auto max-w-xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[--color-brand]/10 ring-1 ring-[--color-brand]/40"
                >
                  <svg className="h-10 w-10 text-[--color-brand]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </motion.div>
                <div className="text-2xl sm:text-3xl font-semibold">Your card has been registered successfully.</div>
                <div className="mt-2 text-base sm:text-lg text-white/80">You can now share this link. Scans will show your owner info.</div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="mx-auto max-w-xl"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-7">
                <div>
                  <label className="mb-1 block text-sm text-white/80">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none ring-0 focus:border-[--color-brand]/60"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-white/80">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none ring-0 focus:border-[--color-brand]/60"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-white/80">Message or contact link (optional)</label>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none ring-0 focus:border-[--color-brand]/60"
                    placeholder="e.g. +1 555‑123‑4567 or https://contact.me/me"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[--color-brand] px-6 py-3 text-base font-semibold text-white hover:opacity-90 disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                        Registering…
                      </>
                    ) : (
                      "Register card"
                    )}
                  </button>
                </div>
              </form>
              <div className="mt-3 text-center text-sm text-white/60">By continuing, you agree to store your contact for this LostLink card.</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/*
Switching to a real database later:
- Firebase/Firestore: Replace fetch(`/api/card/${id}`) with calls to Firestore using getDoc/setDoc on document `cards/{id}`.
- Supabase: Call supabase.from('cards').select('*').eq('id', id).single() and upsert({ id, name, email, message }).
- Prisma + SQLite/Postgres: Create a Card model with id, name, email, message, createdAt. Move logic to server actions or API route using prisma.
*/
