"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Projects() {
  const projects = [
    {
      title: "NexGen ERP",
      category: "Enterprise System",
      description: "A comprehensive resource planning system for manufacturing giants, featuring real-time logistics tracking and AI-driven forecasting.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      tags: ["Next.js", "PostgreSQL", "Tailwind"],
      accent: "from-blue-600/20 to-transparent"
    },
    {
      title: "Aura AI",
      category: "SaaS Platform",
      description: "Personalized marketing intelligence driven by generative AI models, helping brands predict consumer behavior with 94% accuracy.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      tags: ["React", "Python", "OpenAI"],
      accent: "from-indigo-600/20 to-transparent"
    }
  ];

  return (
    <section className="py-40 bg-white relative overflow-hidden">
       {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8 p-3 bg-white shadow-ultimate rounded-2xl border border-slate-100"
          >
             <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </motion.div>
          <motion.h2 
            className="text-6xl md:text-9xl font-black tracking-tight mb-10 text-slate-900 leading-[0.9]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Digital <br /> <span className="text-gradient">Innovations</span>
          </motion.h2>
          <motion.p 
            className="text-slate-500 max-w-2xl text-2xl font-medium leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Explore our curated selection of high-impact systems engineered for global performance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl md:rounded-[3rem] shadow-ultimate bg-slate-100 mb-6 md:mb-10 group-hover:shadow-2xl transition-all duration-700">
                {/* Image */}
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80 z-10 transition-opacity duration-500" />
                
                <div className="absolute inset-0 p-12 flex flex-col justify-end z-20">
                   <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-8 bg-primary shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
                        <span className="text-primary font-black tracking-widest text-xs uppercase">{project.category}</span>
                     </div>
                     <h3 className="text-white text-5xl font-black mb-6 leading-tight">{project.title}</h3>
                     <div className="flex flex-wrap gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                       {project.tags.map(tag => (
                         <Badge key={tag} className="bg-white/10 backdrop-blur-xl border-white/20 text-white font-bold px-4 py-1.5 uppercase tracking-widest text-[10px]">
                            {tag}
                         </Badge>
                       ))}
                     </div>
                   </div>
                </div>

                {/* Floating Icon */}
                <div className="absolute top-10 right-10 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 rotate-12 group-hover:rotate-0">
                   <div className="h-20 w-20 bg-white rounded-3xl flex items-center justify-center text-primary shadow-2xl">
                      <ArrowUpRight className="h-8 w-8" />
                   </div>
                </div>
              </div>

              <div className="px-6 flex justify-between items-start gap-10">
                 <p className="text-slate-500 text-xl font-medium leading-relaxed flex-1">
                   {project.description}
                 </p>
                 <Link href="#" className="h-16 w-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/30 transition-all shadow-sm hover:shadow-xl shrink-0 group/link">
                   <ExternalLink className="h-6 w-6 group-hover/link:scale-110 transition-transform" />
                 </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 flex justify-center">
           <Link href="/portfolio">
             <Button variant="outline" className="h-16 px-12 border-slate-200 text-slate-800 font-black text-xl rounded-2xl hover:bg-slate-50 transition-all hover:border-primary/50 group">
                View All Case Studies
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
             </Button>
           </Link>
        </div>
      </div>
    </section>
  );
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
