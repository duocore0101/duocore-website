import { Hero } from "@/components/landing/hero";
import { LiveProjects } from "@/components/landing/live-projects";
import { Services } from "@/components/landing/services";
import { Testimonials } from "@/components/landing/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <LiveProjects />
      <Services />
      <Testimonials />
    </>
  );
}
