"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NfcCard3D } from "@/components/effects/nfc-card-3d";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-center min-h-[calc(100dvh-64px)] flex items-center py-16 sm:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-2xl sm:max-w-3xl"
        >
          <Badge variant="brand" className="mb-4">NFC PVC Cards</Badge>
          <h1 className="text-balance text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white">
            Intelligent cards that facilitate the return of your  <span className="highlight-blue">lost items</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-zinc-400">
            Store your contact details on durable smart cards. If you lose an item, finders can tap and instantly reach you.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button className="btn-shine">Order Cards</Button>
            <Button variant="brandOutline">How it works</Button>
            <Link href="/register" className="inline-flex">
              <Button variant="brandOutline">Register your card</Button>
            </Link>
          </div>

          {/* 3D card showcase below the CTAs */}
          <div className="mt-10 hidden md:grid place-items-center">
            <NfcCard3D animated={false} tagline="FOUND" className="h-[220px] w-[360px] sm:h-[240px] sm:w-[400px] md:h-[260px] md:w-[440px]" />
          </div>

          {/* purchase action */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <Button size="lg" className="rounded-full px-8">
              Buy
            </Button>
            <p className="text-sm font-medium text-white/80">
              From £14.99
            </p>
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(50%_50%_at_50%_0%,black,transparent_70%)]">
        <motion.div
          aria-hidden
          className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[--color-brand] opacity-20 blur-3xl"
          animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-24 -top-10 h-96 w-96 rounded-full bg-[--color-brand] opacity-10 blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
