"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function Card360() {
  const ref = React.useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); // normalized -0.5..0.5 across width
  const my = useMotionValue(0); // normalized -0.5..0.5 across height

  const smoothX = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.4 });
  const smoothY = useSpring(my, { stiffness: 120, damping: 20, mass: 0.4 });

  // Rotate full yaw range for a "360" feel and modest pitch for depth
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-180, 180]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [18, -18]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    mx.set(Math.max(-0.5, Math.min(0.5, x)));
    my.set(Math.max(-0.5, Math.min(0.5, y)));
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const thickness = 12; // px visual thickness

  return (
    <section className="relative overflow-hidden bg-black py-28 text-white">
      <div className="container relative">
        {/* Top label + heading (Apple-like) */}
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="mb-2 text-sm font-semibold tracking-wide text-blue-400">LostLink Card</div>
          <h2 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">A big look in 3D.</h2>
        </div>

        <div className="flex flex-col items-center gap-10">
          {/* Left: hero visual (large, partially cropped like reference) */}
          <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative h-[70vh] min-h-[420px] w-full overflow-visible"
            style={{ perspective: 1200 }}
          >

            {/* 3D card group */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-10 h-[420px] w-[672px] -translate-x-1/2 -translate-y-1/2 origin-center scale-[.72] sm:scale-75 md:scale-90 lg:scale-100"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" as const }}
            >
              {/* FRONT face */}
              <div
                className="absolute inset-0 rounded-[22px]"
                style={{ transform: `translateZ(${thickness / 2}px)` }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[22px] ring-1 ring-white/15">
                  <div className="absolute inset-0 rounded-[22px] bg-black" />
                  {/* Subtle texture */}
                  <div className="absolute inset-0 rounded-[22px] bg-[radial-gradient(120%_80%_at_30%_0%,_rgba(255,255,255,0.06),_transparent_60%)]" />
                  {/* Gloss */}
                  <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-b from-white/25 to-transparent" />
                  {/* Branding */}
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-lg font-medium tracking-wider text-white/80">LostLink</div>
                  </div>
                </div>
              </div>

              {/* BACK face */}
              <div
                className="absolute inset-0 rounded-[22px]"
                style={{ transform: `rotateY(180deg) translateZ(${thickness / 2}px)` }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[22px] ring-1 ring-white/10">
                  <div className="absolute inset-0 rounded-[22px] bg-zinc-900" />
                  <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-b from-white/10 to-transparent" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-sm font-medium tracking-wide text-white/50">NFC • PVC</div>
                  </div>
                </div>
              </div>

              {/* THICKNESS sides (simple extrude) */}
              {/* Right edge */}
              <div
                className="absolute left-1/2 top-1/2 h-full w-[12px] -translate-x-1/2 -translate-y-1/2 rounded-r-[22px] bg-gradient-to-l from-black to-zinc-800/40"
                style={{ transform: `translate(-50%, -50%) rotateY(90deg) translateZ(${336}px)` }}
              />
              {/* Left edge */}
              <div
                className="absolute left-1/2 top-1/2 h-full w-[12px] -translate-x-1/2 -translate-y-1/2 rounded-l-[22px] bg-gradient-to-r from-black to-zinc-800/40"
                style={{ transform: `translate(-50%, -50%) rotateY(-90deg) translateZ(${336}px)` }}
              />
              {/* Top edge */}
              <div
                className="absolute left-1/2 top-1/2 h-[12px] w-full -translate-x-1/2 -translate-y-1/2 rounded-t-[22px] bg-gradient-to-b from-black to-zinc-800/40"
                style={{ transform: `translate(-50%, -50%) rotateX(90deg) translateZ(${210}px)` }}
              />
              {/* Bottom edge */}
              <div
                className="absolute left-1/2 top-1/2 h-[12px] w-full -translate-x-1/2 -translate-y-1/2 rounded-b-[22px] bg-gradient-to-t from-black to-zinc-800/40"
                style={{ transform: `translate(-50%, -50%) rotateX(-90deg) translateZ(${210}px)` }}
              />

              
            </motion.div>
          </div>

          {/* Metrics below, centered */}
          <div className="mx-auto max-w-md text-center">
            <ul className="space-y-8">
              <li>
                <div className="text-sm text-white/70">Thickness</div>
                <div className="text-5xl font-semibold leading-none">0.76<span className="text-2xl align-top"> mm</span></div>
                <div className="mt-1 text-sm text-white/60">Standard credit‑card thickness</div>
              </li>
              <li>
                <div className="text-sm text-white/70">Material</div>
                <div className="text-4xl font-semibold leading-none">PVC</div>
                <div className="mt-1 text-sm text-white/60">Durable, water‑resistant build</div>
              </li>
              <li>
                <div className="text-sm text-white/70">Interaction</div>
                <div className="text-4xl font-semibold leading-none">360°</div>
                <div className="mt-1 text-sm text-white/60">Move your mouse to inspect every angle</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
