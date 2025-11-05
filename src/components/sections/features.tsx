"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Contact, Zap, Nfc, Droplet, Globe } from "lucide-react";
import { TiltCard } from "@/components/effects/tilt-card";

const features = [
  {
    title: "Tap to contact",
    description: "Finders tap with any NFC-enabled phone to view your contact details.",
    icon: Nfc,
  },
  {
    title: "Durable PVC",
    description: "Premium PVC material built to last on keys, bags, and gear.",
    icon: Droplet,
  },
  {
    title: "Privacy-first",
    description: "Control what you share and update details anytime.",
    icon: Shield,
  },
  {
    title: "No app required",
    description: "Works out of the box with iOS and Android—no downloads.",
    icon: Zap,
  },
  {
    title: "Global compatibility",
    description: "Uses standard NFC so it works anywhere.",
    icon: Globe,
  },
  {
    title: "Instant updates",
    description: "Change your info and it syncs to your card immediately.",
    icon: Contact,
  },
];

export function Features() {
  return (
    <section id="features" className="bg-white py-20 dark:bg-black">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl dark:text-white">Designed for real life</h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Modern, secure, and effortless—built for when it matters.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <TiltCard className="h-full">
              <Card className="h-full min-h-[220px] transform-gpu transition-shadow duration-200 hover:shadow-lg">
                <CardHeader>
                  <f.icon className="mb-3 h-6 w-6 text-[--color-brand]" />
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-2 w-12 rounded-full bg-[--color-brand]/15" />
                </CardContent>
              </Card>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
