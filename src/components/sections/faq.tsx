"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    q: "Do people need an app to use the card?",
    a: "No app required. Any NFC-enabled phone can tap and open your contact page.",
  },
  { q: "Can I update my details later?", a: "Yes, you can update your profile anytime and it syncs instantly." },
  { q: "Is my data private?", a: "You control what information is shown and can hide details at any time." },
];

export function FAQ() {
  const [open, setOpen] = React.useState<number | null>(null);
  return (
    <section id="faq" className="bg-white py-20 dark:bg-black">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl dark:text-white">FAQ</h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Answers to common questions.</p>
        </div>
        <div className="mx-auto max-w-3xl divide-y divide-zinc-200 dark:divide-zinc-800">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="px-4 py-5"
              >
                <button
                  className="flex w-full items-center justify-between text-left text-base font-medium text-black dark:text-white"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="ml-4 text-zinc-400">{isOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="pt-2">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{f.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
