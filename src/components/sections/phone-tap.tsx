"use client";

import { motion } from "framer-motion";

export function PhoneTap() {
  return (
    <section className="relative bg-white py-24 dark:bg-black">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl dark:text-white">
            Tap to return
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            Easily, allow the finder to access your contact information with a simple tap.
          </p>
        </div>

        <div className="relative grid place-items-center">
          {/* phone back */}
          <div className="relative h-[520px] w-[260px] rounded-[36px] bg-gradient-to-b from-zinc-900 to-black ring-1 ring-zinc-800 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)]">
            {/* camera island (decorative) */}
            <div className="absolute left-6 top-6 h-14 w-14 rounded-2xl bg-zinc-800/70 ring-1 ring-zinc-700" />
            <div className="absolute left-10 top-10 h-6 w-6 rounded-full bg-zinc-900 ring-2 ring-zinc-700" />
            <div className="absolute left-6 top-[84px] h-10 w-10 rounded-xl bg-zinc-800/70 ring-1 ring-zinc-700" />

            {/* core glow at tap point (windowed to tap moment) */}
            <motion.span
              className="absolute left-1/2 top-1/2 z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
              style={{ background: "radial-gradient(circle, rgba(37,99,235,0.6), transparent 70%)", filter: "blur(8px)" }}
              animate={{ opacity: [0, 0, 0.7, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeOut", times: [0, 0.45, 0.55, 1] }}
            />
            {/* concentric blue rings */}
            <motion.span
              className="absolute left-1/2 top-1/2 z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[var(--color-brand)]"
              animate={{ opacity: [0, 0, 0.9, 0], scale: [0.7, 0.7, 1.5, 1.8] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeOut", times: [0, 0.45, 0.55, 1] }}
            />
            <motion.span
              className="absolute left-1/2 top-1/2 z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[var(--color-brand)]"
              animate={{ opacity: [0, 0, 0.7, 0], scale: [0.7, 0.7, 1.7, 2.0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeOut", times: [0, 0.45, 0.58, 1] }}
            />
            <motion.span
              className="absolute left-1/2 top-1/2 z-10 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[var(--color-brand)]"
              animate={{ opacity: [0, 0, 0.5, 0], scale: [0.7, 0.7, 1.9, 2.2] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeOut", times: [0, 0.45, 0.6, 1] }}
            />

            {/* mini NFC card approaching phone */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-20 h-[104px] w-[168px] -translate-x-1/2 -translate-y-1/2"
              animate={{ x: [120, 16, 8, 120], y: [-80, -10, 0, -80], rotate: [-16, -8, -10, -16] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.6, 1] }}
              style={{ perspective: 1000 }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[16px] ring-1 ring-zinc-700">
                <div className="absolute inset-0 bg-black" />
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-b from-white/20 to-transparent" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-xs font-medium tracking-wider text-white/80">LostLink</div>
                </div>
                <motion.div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(110deg, transparent 45%, rgba(255,255,255,0.14) 50%, transparent 55%)" }}
                  animate={{ x: ["-120%", "120%"] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
