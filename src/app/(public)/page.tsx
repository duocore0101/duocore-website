import { Hero } from "@/components/landing/hero";
import { About } from "@/components/landing/about";
import { Values } from "@/components/landing/values";
import { LiveProjects } from "@/components/landing/live-projects";
import { Services } from "@/components/landing/services";
import { Testimonials } from "@/components/landing/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Values />
      <Services />
      <LiveProjects />
      <Testimonials />
    </>
  );
}
