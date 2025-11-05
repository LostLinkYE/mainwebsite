"use client";

import { motion } from "framer-motion";

export function NfcCard3D({ className, animated = false, tagline = "FOUND" }: { className?: string; animated?: boolean; tagline?: string }) {
  return (
    <div className={`pointer-events-none relative mx-auto ${className ?? "h-[180px] w-[620px]"}`} style={{ perspective: 1400 }}>
      {/* Backlight word (centered to the card width) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[560px] -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="relative inline-block">
          <div className="absolute -inset-14 rounded-[100px] bg-[radial-gradient(closest-side,_rgba(37,99,235,0.55),_transparent)] blur-3xl" />
          <div className="back-glow select-none leading-none">{tagline}</div>
        </div>
      </div>

      {/* Spotlight behind card */}
      <div className="spotlight" aria-hidden />

      {/* Side profile card */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        initial={false}
      >
        <motion.div
          className="relative h-8 w-[560px]"
          animate={{ rotateZ: [-0.6, 0.6, -0.6], y: [0, -2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d", rotateX: -18 }}
        >
          <div className="relative h-full w-full">
            {/* all layers clipped inside one rounded, overflow-hidden container */}
            <div className="absolute inset-0 overflow-hidden rounded-[20px] ring-1 ring-zinc-800">
              {/* base */}
              <div className="absolute inset-0 bg-black" />
              {/* top highlight */}
              <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-b from-white/25 to-transparent" />
              {/* bottom shade */}
              <div className="absolute left-0 right-0 bottom-0 h-[6px] bg-gradient-to-t from-black/80 to-transparent" />
              {/* side rims (mirrored and curved) */}
              <div className="absolute inset-y-0 left-0 w-[8px] bg-[linear-gradient(to_right,rgba(255,255,255,0.18),rgba(255,255,255,0.06),transparent)]" />
              <div className="absolute inset-y-0 right-0 w-[8px] bg-[linear-gradient(to_left,rgba(255,255,255,0.18),rgba(255,255,255,0.06),transparent)]" />
              {/* glossy sweep */}
              <motion.div
                className="absolute inset-0"
                style={{ background: "linear-gradient(110deg, transparent 45%, rgba(255,255,255,0.12) 50%, transparent 55%)" }}
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              {/* logo mark on side */}
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-xs font-medium tracking-wider text-white/70">LostLink</div>
              </div>
            {/* logo mark on side */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-xs font-medium tracking-wider text-white/70">LostLink</div>
            </div>
          </div>
          {/* soft drop shadow */}
          <div className="absolute -bottom-4 left-8 right-8 h-4 rounded-full bg-black/50 blur-md" />
          </div>
        </motion.div>
      </motion.div>

      {/* measurement label */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-1 md:flex ml-[350px]">
        <div className="h-16 w-px bg-zinc-300/80" />
        <div className="rounded-full border border-zinc-200 bg-white/80 px-2 py-0.5 text-[10px] font-medium text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-700 dark:bg-black/60 dark:text-zinc-200">
          0.76 mm
        </div>
      </div>
    </div>
  );
}
