import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { PhoneTap } from "@/components/sections/phone-tap";
import { Card360 } from "@/components/sections/card-360";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <PhoneTap />
      <Card360 />
      <Features />
      <HowItWorks />
      <CTA />
      <FAQ />
    </main>
  );
}
