import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { ProjectTypes } from "@/components/sections/ProjectTypes";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Portfolio />
      <Services />
      <ProjectTypes />
      <Contact />
    </>
  );
}
