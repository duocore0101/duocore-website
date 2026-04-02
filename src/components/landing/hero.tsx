"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-28 md:pt-24 pb-20 bg-[#020617]">
      {/* BACKGROUND IMAGE WITH OVERLAY */}
      <div className="absolute inset-0 z-0">
        <motion.div 
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/hero-ai.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* GLOWING ACCENTS */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-0 opacity-40" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={item} className="mb-4">
            <span className="inline-flex items-center rounded-full px-4 py-1.5 text-[9px] font-black bg-white/5 backdrop-blur-md text-blue-400 border border-white/10 tracking-[0.2em] uppercase">
              <Sparkles className="mr-2 h-3 w-3 animate-pulse" />
              Intelligence Driven Engineering
            </span>
          </motion.div>

          <motion.h1 
            variants={item}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-normal mb-4 md:mb-6 leading-[1.2] text-white font-[family-name:var(--font-michroma)]"
          >
            We Build Software That Grows <span className="text-blue-500">Your Business.</span>
          </motion.h1>

          <motion.div variants={item} className="space-y-6 mb-10">
            <p className="text-slate-400 max-w-2xl text-lg md:text-xl font-medium tracking-tight leading-snug">
              We don’t just develop software — we craft scalable, high-performance systems that solve real-world problems and drive business growth.
            </p>
            <p className="text-blue-400 font-black text-xs uppercase tracking-[0.2em]">
               From Idea to Production — We Handle Everything
            </p>
            <p className="text-slate-500 max-w-2xl text-sm md:text-base font-medium leading-relaxed italic">
              At Duocore Software Company, we turn your vision into a fully functional, cloud-ready product using modern technologies and industry-proven architecture.
            </p>
          </motion.div>

          <motion.div 
            variants={item}
            className="flex flex-col sm:flex-row gap-4 md:gap-8 w-full sm:w-auto"
          >
            <a href="https://wa.me/919890882900?text=Hi%20Duocore%20Team%2C%20I%E2%80%99m%20interested%20in%20building%20a%20project.%20Can%20you%20help%20me%20with%20the%20details%3F" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="h-16 md:h-18 w-full sm:px-14 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg md:text-xl rounded-2xl shadow-3xl shadow-blue-600/40 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center">
                Start Your Project
              </Button>
            </a>
            <Link href="/#live-projects" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-16 md:h-18 w-full sm:px-14 border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white hover:text-white font-bold text-lg md:text-xl rounded-2xl transition-all hover:border-white/40 shadow-xl group">
                Explore Our Work
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
