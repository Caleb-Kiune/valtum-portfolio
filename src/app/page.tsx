import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { CoreSkills } from "@/components/sections/core-skills";
import { Services } from "@/components/sections/services";
import { Contact } from "@/components/sections/contact";
import { SelectedWork } from "@/components/sections/selected-work";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <main className="flex flex-col gap-0 pb-0 relative">
      <Hero />
      <SelectedWork />
      <About />
      <CoreSkills />

      {/* Secondary Trust Signals */}
      <Services />
      <Testimonials />

      <Contact />
    </main>
  );
}
