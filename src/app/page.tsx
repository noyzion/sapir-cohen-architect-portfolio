import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { CtaBand } from "@/components/layout/CtaBand";
import { ProjectTypes } from "@/components/sections/ProjectTypes";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Portfolio />
      <CtaBand variant="afterPortfolio" />
      <Services />
      <Process />
      <ProjectTypes />
      <Contact />
    </>
  );
}
