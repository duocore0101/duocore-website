"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, ShieldCheck, Cloud, Code2, Database, LayoutTemplate, Activity, ArrowRight, PlayCircle, Zap, Cpu, Server, Target } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export function AboutClient() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/30 overflow-hidden" ref={containerRef}>
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-40 pb-20 md:pt-56 md:pb-32 px-4 flex items-center justify-center min-h-[70vh]">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] bg-primary/[0.04] rounded-full blur-[100px] md:blur-[150px] -translate-y-1/2 translate-x-1/3"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-blue-600/[0.03] rounded-full blur-[80px] md:blur-[120px] translate-y-1/2 -translate-x-1/3"
          />
        </div>

        <div className="container max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-slate-100 shadow-xl shadow-primary/5 mb-10"
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </div>
              <span className="text-[10px] md:text-xs font-black tracking-[0.2em] uppercase text-primary">About Duocore Software</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-black text-slate-900 tracking-tighter leading-[0.9] max-w-5xl"
            >
              Architects of <br className="hidden md:block"/>
              <span className="relative inline-block mt-2">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 italic px-2">Digital</span>
              </span> Reality.
            </motion.h1>
          </div>
        </div>
      </section>

      {/* 2. THE CONTENT SECTIONS */}
      <section className="container max-w-5xl mx-auto px-4 pb-32 md:pb-48 relative z-10">
        <div className="flex flex-col gap-8 md:gap-16">
          
          {/* Paragraph 1 - Mission & Passion */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group relative bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_-15px_rgba(30,58,138,0.08)] border border-slate-100 hover:shadow-[0_40px_100px_-20px_rgba(30,58,138,0.15)] transition-all duration-700 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-[100px] -z-10 transition-transform duration-700 group-hover:scale-110" />
            
            <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-start">
              <div className="flex-shrink-0 relative">
                <div className="h-20 w-20 md:h-28 md:w-28 rounded-3xl bg-slate-50 flex items-center justify-center border-4 border-white shadow-xl group-hover:bg-primary transition-colors duration-500 z-10 relative">
                  <Target className="h-8 w-8 md:h-12 md:w-12 text-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-0.5 w-12 bg-primary rounded-full group-hover:w-24 transition-all duration-700" />
                  <span className="text-primary font-black uppercase tracking-[0.2em] text-xs">Our Drive</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
                  Passionate about building scalable, high-performance solutions.
                </h2>
                <p className="text-lg md:text-2xl font-medium text-slate-500 leading-relaxed">
                  At <strong className="text-slate-900 group-hover:text-primary transition-colors">Duocore Software Company</strong>, we solve real-world problems. We are a team of dedicated developers focused on delivering products that are not only functional but also reliable, secure, and built for growth.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                  {[
                    { icon: ShieldCheck, label: "Reliable" },
                    { icon: Zap, label: "Performance" },
                    { icon: Cloud, label: "Scalable" },
                    { icon: Cpu, label: "Secure" },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-3">
                      <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-slate-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 delay-100 border border-slate-100">
                        <item.icon className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Paragraph 2 - Specialization */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group relative bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-10 lg:gap-20">
              <div className="flex-1 order-2 md:order-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-0.5 w-12 bg-white rounded-full group-hover:w-24 transition-all duration-700" />
                  <span className="text-white font-black uppercase tracking-[0.2em] text-xs">Our Expertise</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight mb-8">
                  From concept to deployment with modern technologies.
                </h3>
                <p className="text-lg md:text-xl font-medium text-slate-400 leading-relaxed mb-10">
                  We specialize in full-stack development, cloud-based systems, and custom software solutions, helping businesses transform their ideas into powerful digital products. We ensure every project is crafted with precision and industry best practices.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  {["Full-Stack Development", "Cloud Systems", "Custom Software", "Modern Tech Stacks", "Precision Engineering"].map((skill, i) => (
                    <div key={i} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 font-black text-[10px] md:text-xs uppercase tracking-widest backdrop-blur-md group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-white transition-all duration-500">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="order-1 md:order-2 flex-shrink-0">
                 <div className="relative h-24 w-24 md:h-40 md:w-40">
                   <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-xl group-hover:blur-2xl transition-all duration-700" />
                   <div className="absolute inset-0 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center transform group-hover:-rotate-6 transition-transform duration-700">
                      <Code2 className="h-10 w-10 md:h-16 md:w-16 text-white" />
                   </div>
                   <div className="absolute -bottom-4 -left-4 rounded-2xl bg-blue-500/20 border border-blue-400/20 backdrop-blur-xl p-3 md:p-4 transform group-hover:rotate-12 transition-transform duration-700">
                      <Server className="h-6 w-6 md:h-8 md:w-8 text-blue-200" />
                   </div>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Paragraph 3 - Proof / Projects */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group relative bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_-15px_rgba(30,58,138,0.08)] border border-slate-100 hover:border-primary/20 transition-all duration-700 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
            
            <div className="h-20 w-20 md:h-24 md:w-24 rounded-3xl bg-slate-50 flex items-center justify-center border-2 border-white shadow-xl mb-10 group-hover:scale-110 transition-transform duration-700">
              <LayoutTemplate className="h-10 w-10 md:h-12 md:w-12 text-primary" />
            </div>
            
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-8 max-w-4xl">
              Innovation, performance, and <span className="text-primary italic">user experience</span>.
            </h3>
            <p className="text-lg md:text-2xl font-medium text-slate-500 leading-relaxed max-w-3xl mb-12">
              Projects like <strong className="text-slate-900 underline decoration-primary/30 decoration-2 underline-offset-4">GMARS Tech Solution</strong> demonstrate our ability to build complex systems such as virtual labs, video-based learning platforms, and automated exam modules that save time and improve efficiency.
            </p>
            
            <Link href="/#live-projects" className="group/btn relative inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-slate-900 text-white font-black tracking-widest text-[10px] md:text-xs uppercase hover:bg-primary transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-3">
                <PlayCircle className="h-5 w-5 md:h-6 md:w-6" />
                Explore Our Work
              </span>
            </Link>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
