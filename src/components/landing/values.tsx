"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Rocket, 
  Eye, 
  Lightbulb, 
  Scale, 
  Users, 
  Diamond,
  ArrowUpRight
} from "lucide-react";
import Image from "next/image";

export function Values() {
  return (
    <section className="relative pb-12 bg-slate-50 dark:bg-[#020617] overflow-hidden font-sans transition-colors">
      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
        {/* Top Card: Mission & Vision */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto bg-white dark:bg-slate-900/60 rounded-[1.5rem] p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 mb-16 flex flex-col md:flex-row gap-8 items-center transition-colors"
        >
          {/* Left Side: Image */}
          <div className="relative w-full md:w-1/2 h-[200px] md:h-[280px] rounded-[1.25rem] overflow-hidden bg-blue-50/50 dark:bg-slate-800/50 flex items-center justify-center">
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-[80px] -z-10" />
            <Image 
              src="/laptop.png" 
              alt="Mission and Vision" 
              fill
              className="object-cover"
            />
          </div>

          {/* Right Side: Text Content */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            {/* Mission */}
            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shadow-sm dark:shadow-none">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Our Mission</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  <span className="text-slate-800 dark:text-slate-200">We don&apos;t just deliver software;</span> we build enduring systems that grow with your ambitions and withstand the test of time.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] w-full bg-slate-100 dark:bg-slate-800" />

            {/* Vision */}
            <div className="flex gap-4 items-start">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shadow-sm dark:shadow-none">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Our Vision</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  To become a global technology partner for businesses seeking smart, reliable and future-ready digital transformation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Header */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>
              OUR VALUES
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            What <span className="text-blue-600 relative inline-block">
              Drives
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span> Us
          </motion.h2>
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <Lightbulb className="w-6 h-6" />, title: "Innovation", desc: "We explore new ideas and build smarter solutions." },
            { icon: <Scale className="w-6 h-6" />, title: "Integrity", desc: "We do what's right, always." },
            { icon: <Users className="w-6 h-6" />, title: "Collaboration", desc: "We grow together." },
            { icon: <Diamond className="w-6 h-6" />, title: "Excellence", desc: "We deliver quality without compromise." },
          ].map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
              className="bg-white dark:bg-slate-900 rounded-[1.25rem] p-6 shadow-lg shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-500/50 transition-all flex flex-col items-center text-center group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {val.icon}
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{val.title}</h4>
              <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-[1.5rem] p-8 md:p-10 shadow-2xl shadow-blue-900/20 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
        >
          {/* Decorative shapes inside banner */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
          
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Ready to Build Something Great?</h3>
            <p className="text-sm md:text-base text-blue-100 font-medium">Let&apos;s turn your ideas into powerful digital solutions.</p>
          </div>
          <div className="relative z-10 shrink-0">
            <a href="https://wa.me/917028350089" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white hover:bg-slate-50 text-blue-700 rounded-xl px-8 h-12 text-sm font-bold shadow-xl">
                Contact Us <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
