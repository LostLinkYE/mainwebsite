"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Feature = {
  id: string;
  title: string;
  desc: string;
};

const FEATURES: Feature[] = [
  { id: "setup", title: "Setup your card", desc: "Pair once securely with your phone." },
  { id: "place", title: "Place it in your wallet", desc: "Or attach to keys, bag, or gear." },
  { id: "lost", title: "Lose the item", desc: "If it gets misplaced, your details are ready." },
  { id: "notify", title: "Get notified", desc: "Finder taps and sends you a message." },
];

export function DeepDive() {
  const [active, setActive] = React.useState(0);

  return (
    <section className="relative overflow-hidden bg-black py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,_rgba(37,99,235,0.25),_transparent_70%)]" />
      <div className="container relative">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <p className="text-sm font-medium text-[--color-brand]">Closer Look</p>
          <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            The details that matter.
          </h2>
        </div>

        <div className="space-y-8">
          {/* Stage */}
          <div>
            {/* full-bleed stage (no box) */}
            <div className="relative mx-auto aspect-[5/3] w/full max-w-[1100px]">
              {/* shared card */}
              <motion.div
                key={`card-${active}`}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute left-1/2 top-1/2 h-[260px] w-[420px] -translate-x-1/2 -translate-y-1/2"
                style={{ opacity: active === 0 ? 0 : 1 }}
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl ring-1 ring-zinc-800">
                  <div className="absolute inset-0 bg-black" />
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-b from-white/25 to-transparent" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-sm font-semibold tracking-wide text-white/80">LostLink</div>
                  </div>
                </div>

                {/* feature-specific effects */}
                {active === 0 && (
                  // Stage 1: Setup — precise copy of phone tap animation, scaled up
                  <>
                    {/* phone back silhouette (with cameras) */}
                    <div className="absolute left-[30%] top-1/2 h-72 w-36 -translate-y-1/2 rounded-[32px] bg-gradient-to-b from-zinc-800/30 to-black/30 ring-1 ring-white/10" />
                    <div className="absolute left-[26%] top-[34%] h-12 w-12 -translate-y-1/2 rounded-2xl bg-white/5 ring-1 ring-white/10" />
                    <div className="absolute left-[26%] top-[46%] h-9 w-9 -translate-y-1/2 rounded-xl bg-white/5 ring-1 ring-white/10" />

                    {/* concentric, pulsing NFC rings at center */}
                    <motion.span className="absolute left-1/2 top-1/2 z-10 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[var(--color-brand)]" animate={{ opacity: [0.95, 0], scale: [0.85, 1.15] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }} />
                    <motion.span className="absolute left-1/2 top-1/2 z-10 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[var(--color-brand)] opacity-60" animate={{ opacity: [0.6, 0], scale: [0.85, 1.2] }} transition={{ duration: 2.1, repeat: Infinity, ease: "easeOut", delay: 0.12 }} />
                    <motion.span className="absolute left-1/2 top-1/2 z-10 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[var(--color-brand)] opacity-40" animate={{ opacity: [0.5, 0], scale: [0.85, 1.25] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.24 }} />

                    {/* mini NFC card gliding in to tap and back out */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 z-20 h-[120px] w-[180px] -translate-x-1/2 -translate-y-1/2"
                      animate={{ x: [100, 20, 8, 100], y: [-60, -10, 0, -60], rotate: [-12, -8, -10, -12] }}
                      transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.6, 1] }}
                      style={{ perspective: 1000 }}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-[16px] ring-1 ring-white/15">
                        <div className="absolute inset-0 bg-black/85" />
                        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-b from-white/20 to-transparent" />
                        <div className="absolute inset-0 grid place-items-center">
                          <div className="text-sm font-medium tracking-wider text-white/85">LostLink</div>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}

                {active === 1 && (
                  // Stage 2: Place — card slides into wallet slot
                  <>
                    {/* wallet body */}
                    <div className="absolute left-1/2 top-1/2 h-32 w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/5 ring-1 ring-white/10" />
                    {/* slot */}
                    <div className="absolute left-1/2 top-[46%] h-5 w-[520px] -translate-x-1/2 rounded-md bg-black/40 ring-1 ring-white/10" />
                    {/* card inserting */}
                    <motion.div className="absolute left-1/2 top-[30%] h-28 w-64 -translate-x-1/2 -rotate-2 rounded-xl border border-white/15 bg-black/50" animate={{ y: [0, 32, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
                  </>
                )}

                {active === 2 && (
                  // Stage 3: Lost — outline and question pulse
                  <>
                    <motion.div className="absolute left-1/2 top-1/2 h-40 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-dashed border-white/25" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }} />
                    <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-semibold text-white/70" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}>?</motion.div>
                  </>
                )}

                {active === 3 && (
                  // Stage 4: Notify — pill pops and rays fade
                  <>
                    <div className="absolute left-1/2 top-1/2 h-48 w-28 -translate-x-1/2 -translate-y-1/2 rounded-[22px] bg-white/5 ring-1 ring-white/10" />
                    {/* notification pill */}
                    <motion.div className="absolute left-[52%] top-[40%] rounded-full bg-[--color-brand] px-3 py-1 text-xs font-medium text-white" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                      Notify
                    </motion.div>
                    {/* rays */}
                    <motion.span className="absolute left-1/2 top-[36%] h-px w-16 -translate-x-1/2 bg-white/40" animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 1.6, repeat: Infinity }} />
                    <motion.span className="absolute left-[44%] top-[42%] h-px w-10 rotate-45 bg-white/30" animate={{ opacity: [0.15, 0.5, 0.15] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.05 }} />
                    <motion.span className="absolute left-[56%] top-[42%] h-px w-10 -rotate-45 bg-white/30" animate={{ opacity: [0.15, 0.5, 0.15] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.1 }} />
                  </>
                )}
              </motion.div>
            </div>

            {/* Pills row under stage */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {FEATURES.map((f, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300 will-change-transform ${
                      isActive ? "bg-white/10 text-white scale-100 px-5 py-2.5" : "bg-white/5 text-zinc-300 hover:bg-white/10 scale-90 opacity-85 px-4 py-2 text-xs"
                    }`}
                    aria-pressed={isActive}
                  >
                    {f.title}
                  </button>
                );
              })}
            </div>

            {/* Arrow controls below pills */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <button aria-label="Previous" onClick={() => setActive((i) => (i - 1 + FEATURES.length) % FEATURES.length)} className="rounded-full border border-white/20 bg-white/5 p-2 text-white hover:bg-white/10">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button aria-label="Next" onClick={() => setActive((i) => (i + 1) % FEATURES.length)} className="rounded-full border border-white/20 bg-white/5 p-2 text-white hover:bg-white/10">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <Button className="rounded-full px-6">Buy Now</Button>
              <Button variant="brandOutline" className="rounded-full px-6">Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
