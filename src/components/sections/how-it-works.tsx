"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    title: "Create your profile",
    text: "Add your contact details and choose what to share.",
  },
  {
    title: "Link your NFC card",
    text: "Tap once to connect your PVC card to your profile.",
  },
  {
    title: "Get contacted fast",
    text: "If someone finds your item, they tap and reach you instantly.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20 dark:bg-black">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl dark:text-white">How it works</h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Three simple steps to keep you connected with your lost items.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{s.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
