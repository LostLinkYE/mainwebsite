"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  maxTiltDeg?: number;
  className?: string;
};

export function TiltCard({ children, maxTiltDeg = 6, className }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const rx = (py - 0.5) * -2 * maxTiltDeg;
    const ry = (px - 0.5) * 2 * maxTiltDeg;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    el.style.setProperty("--mx", `50%`);
    el.style.setProperty("--my", `50%`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("relative rounded-xl", className)}
      style={{ transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {/* Border stroke that follows the cursor */}
      <span className="glow-border z-20" aria-hidden />
      {/* Subtle interior glow under the content */}
      <span
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background:
            "radial-gradient(120px 120px at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--color-brand) 35%, transparent), transparent 60%)",
          opacity: 0.25,
          mixBlendMode: "overlay",
        }}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
