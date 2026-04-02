import { Metadata } from "next";
import { AboutClient } from "./about-client";

export const metadata: Metadata = {
  title: "About Us | Duocore Softwares",
  description: "Building scalable, high-performance digital solutions.",
};

export default function AboutPage() {
  return <AboutClient />;
}
