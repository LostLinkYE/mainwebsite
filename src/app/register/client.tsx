"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RegisterClient() {
  const [stage, setStage] = React.useState<"welcome" | "instruction">("welcome");
  const [navH, setNavH] = React.useState(64);

  React.useEffect(() => {
    const t = setTimeout(() => setStage("instruction"), 2000);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    function measure() {
      const el = document.querySelector("header");
      const h = el instanceof HTMLElement ? el.getBoundingClientRect().height : 64;
      setNavH(Math.max(0, Math.round(h)));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const isInstruction = stage === "instruction";

  return (
    <section
      className="relative overflow-hidden bg-black py-0 text-white flex items-center"
      style={{ height: `calc(100dvh - ${navH}px)` }}
    >
      <div className="absolute inset-0 hidden sm:block bg-[radial-gradient(60%_60%_at_50%_0%,_rgba(37,99,235,0.18),_transparent_70%)]" />
      <div className="container relative grid min-h-full place-items-center">
        <motion.div layout className="relative w-full max-w-3xl">
          <motion.h1 layout
            initial={{ opacity: 0, y: 0, scale: 1 }}
            animate={isInstruction ? { y: -24, scale: 0.94, opacity: 1 } : { y: 0, scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 95, damping: 18 }}
            className="mx-auto text-center text-5xl font-semibold tracking-tight sm:text-7xl md:text-8xl"
          >
            Welcome
          </motion.h1>
          <motion.div
            layout
            initial={false}
            animate={isInstruction ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mt-3 text-center"
            aria-hidden={!isInstruction}
            style={{
              pointerEvents: isInstruction ? "auto" : "none",
              height: isInstruction ? "auto" : 0,
              marginTop: isInstruction ? 12 : 0,
              overflow: "hidden",
            }}
          >
            <p className="mx-auto max-w-2xl text-base text-white/85 sm:text-lg">
              Tap, your LostLink card to get started.
            </p>
            {/* Inline tap animation (same as landing) */}
            <div className="mt-4 grid place-items-center">
              <div className="relative grid place-items-center transform-gpu scale-[0.9] sm:scale-100">
                {/* phone back */}
                <div className="relative h-[420px] w-[210px] sm:h-[520px] sm:w-[260px] rounded-[36px] bg-gradient-to-b from-zinc-900 to-black ring-1 ring-zinc-800 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)]">
                  {/* camera island (decorative) */}
                  <div className="absolute left-6 top-6 h-14 w-14 rounded-2xl bg-zinc-800/70 ring-1 ring-zinc-700" />
                  <div className="absolute left-10 top-10 h-6 w-6 rounded-full bg-zinc-900 ring-2 ring-zinc-700" />
                  <div className="absolute left-6 top-[84px] h-10 w-10 rounded-xl bg-zinc-800/70 ring-1 ring-zinc-700" />

                  {/* core glow at tap point (windowed to tap moment) */}
                  <motion.span
                    className="absolute left-1/2 top-1/2 z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
                    style={{ background: "radial-gradient(circle, rgba(37,99,235,0.6), transparent 70%)", filter: "blur(8px)" }}
                    animate={{ opacity: [0, 0, 0.7, 0] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", times: [0, 0.52, 0.62, 1] }}
                  />
                  {/* concentric blue rings */}
                  <motion.span
                    className="absolute left-1/2 top-1/2 z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[var(--color-brand)]"
                    animate={{ opacity: [0, 0, 0.9, 0], scale: [0.8, 0.8, 1.5, 1.7] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", times: [0, 0.52, 0.62, 1] }}
                  />
                  <motion.span
                    className="absolute left-1/2 top-1/2 z-10 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[var(--color-brand)]"
                    animate={{ opacity: [0, 0, 0.7, 0], scale: [0.8, 0.8, 1.7, 1.9] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", times: [0, 0.54, 0.66, 1] }}
                  />
                  <motion.span
                    className="absolute left-1/2 top-1/2 z-10 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[var(--color-brand)]"
                    animate={{ opacity: [0, 0, 0.5, 0], scale: [0.8, 0.8, 1.9, 2.1] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", times: [0, 0.56, 0.7, 1] }}
                  />

                  {/* mini NFC card approaching phone */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 z-20 h-[104px] w-[168px] -translate-x-1/2 -translate-y-1/2"
                    animate={{ x: [110, 12, 0, 110], y: [-64, -10, -2, -64], rotate: [-14, -8, -10, -14] }}
                    transition={{ duration: 5.0, repeat: Infinity, ease: "easeInOut", times: [0, 0.54, 0.7, 1] }}
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
