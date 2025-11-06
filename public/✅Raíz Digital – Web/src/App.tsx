import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Team } from "./components/Team";
import { ServicesGrid } from "./components/ServicesGrid";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-[#111418]">
      <Hero />
      <Manifesto />
      <Team />
      <ServicesGrid />
      <Projects />
      <Contact />
    </div>
  );
}
