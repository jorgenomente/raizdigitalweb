'use client';

import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Team } from "@/components/sections/team";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Projects } from "@/components/sections/projects";
import { ContactSection } from "@/components/sections/contact-section";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#111418] text-white antialiased">
      <Hero />
      <Manifesto />
      <ServicesGrid />
      <Team />
      <Projects />
      <ContactSection />
    </div>
  );
}
