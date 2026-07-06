"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Target, Rocket, Cloud, ShieldCheck, Zap, ArrowRight, HeartPulse, GraduationCap, ShoppingCart, Landmark, Truck, Building2, BrainCircuit } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  const features = [
    { icon: <Rocket className="h-5 w-5 text-blue-400" />, title: "Scalable", sub: "Solutions" },
    { icon: <Cloud className="h-5 w-5 text-blue-400" />, title: "Cloud", sub: "Ready" },
    { icon: <ShieldCheck className="h-5 w-5 text-blue-400" />, title: "Secure", sub: "& Reliable" },
    { icon: <Zap className="h-5 w-5 text-blue-400" />, title: "High", sub: "Performance" },
  ];

  const industries = [
    { icon: <HeartPulse className="h-6 w-6" />, name: "Healthcare" },
    { icon: <GraduationCap className="h-6 w-6" />, name: "Education" },
    { icon: <ShoppingCart className="h-6 w-6" />, name: "E-commerce" },
    { icon: <Landmark className="h-6 w-6" />, name: "Finance" },
    { icon: <Truck className="h-6 w-6" />, name: "Logistics" },
    { icon: <Building2 className="h-6 w-6" />, name: "Real Estate" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20 bg-[#040814] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/laptop-hero.png')" }}>      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center max-w-full">
          {/* LEFT COLUMN */}
          <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-5 max-w-2xl pl-0 xl:pl-4">
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center rounded-full px-4 py-1.5 text-[10px] font-bold bg-transparent text-blue-400 border border-blue-900/50 tracking-[0.15em] uppercase">
                <Target className="mr-2 h-3 w-3" />
                Intelligence Driven Engineering
              </span>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.1] text-white">
              We Build Software <br />
              That Grows <span className="text-blue-500">Your <br /> Business.</span>
            </motion.h1>

            <motion.p variants={item} className="text-slate-400 max-w-lg text-lg font-medium leading-relaxed mb-8">
              We don&apos;t just develop software — we craft scalable, high-performance systems that solve real-world problems and drive business growth.
            </motion.p>

            <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {features.map((feat, idx) => (
                <div key={idx} className="flex flex-col items-start p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                  <div className="mb-2">{feat.icon}</div>
                  <span className="text-sm font-bold text-white leading-tight">{feat.title}</span>
                  <span className="text-xs text-slate-400">{feat.sub}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-16">
              <a href="https://wa.me/917028350089" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                  Start Your Project <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <Link href="/#live-projects">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 border-white/20 bg-transparent hover:bg-white/5 text-white hover:text-white font-bold text-base rounded-xl transition-all flex items-center justify-center gap-2">
                  Explore Our Work <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={item} className="border-t border-white/10 pt-8">
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-6">
                Trusted by businesses across industries
              </p>
              <div className="flex flex-wrap gap-6 sm:gap-10">
                {industries.map((ind, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors cursor-default">
                    {ind.icon}
                    <span className="text-[10px] font-semibold">{ind.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
