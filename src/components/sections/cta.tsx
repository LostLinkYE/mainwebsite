"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTA() {
  const ref = React.useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    el.style.setProperty("--x", pct + "%");
  }

  return (
    <section className="relative overflow-hidden py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          ref={ref}
          onMouseMove={handleMove}
          className="glow-panel relative isolate overflow-hidden rounded-2xl border border-zinc-200 bg-white px-6 py-14 text-center shadow-sm dark:border-zinc-800 dark:bg-black"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,_var(--color-brand)_10%,_transparent_60%)] opacity-10" />
          <h3 className="text-2xl font-semibold tracking-tight text-black dark:text-white">Ready to protect your gear?</h3>
          <p className="mx-auto mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
            Order your PVC NFC cards today and stay reachable when it matters most.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <Button size="lg">Get Started</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
