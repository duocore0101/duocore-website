"use client";

import { motion } from "framer-motion";
import { 
  Rocket, 
  LayoutDashboard, 
  GraduationCap, 
  TrendingUp, 
  RefreshCw, 
  Monitor, 
  Code2, 
  Server, 
  Palette, 
  Cloud, 
  ShieldCheck,
  Cpu
} from "lucide-react";

export function Services() {
  const services = [
    {
      title: "MVP Development for Startups",
      description: "Launch your idea quickly with a high-performance Minimum Viable Product built for scale.",
      icon: <Rocket className="h-6 w-6" />,
      image: "/services/mvp.png",
      category: "Startups"
    },
    {
      title: "Custom Web App Development",
      description: "High-end web applications built with cutting-edge tech stacks and clean code.",
      icon: <Monitor className="h-6 w-6" />,
      image: "/services/webapp.png",
      category: "Web"
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile experiences for iOS and Android.",
      icon: <LayoutDashboard className="h-6 w-6" />,
      image: "/services/mobile.png",
      category: "Mobile"
    },
    {
      title: "AI Automation",
      description: "Intelligent systems and neural networks to automate your core business processes.",
      icon: <Cpu className="h-6 w-6" />,
      image: "/services/ai.png",
      category: "AI & Machine Learning"
    },
    {
      title: "Cloud Infrastructure (AWS)",
      description: "Reliable cloud deployment and infrastructure management optimized for availability.",
      icon: <Cloud className="h-6 w-6" />,
      image: "/services/cloud.png",
      category: "Cloud"
    },
    {
      title: "Automation & Dashboard Systems",
      description: "Reduce manual work with smart dashboards and workflows tailored to your operations.",
      icon: <TrendingUp className="h-6 w-6" />,
      image: "/services/automation.png",
      category: "Automation"
    },
    {
      title: "EdTech & Learning Platforms",
      description: "Virtual labs, exam systems, and interactive learning solutions for modern education.",
      icon: <GraduationCap className="h-6 w-6" />,
      image: "/services/edtech.png",
      category: "Education"
    },
    {
      title: "Full-Stack Development",
      description: "Comprehensive end-to-end development covering both client and server-side needs.",
      icon: <Code2 className="h-6 w-6" />,
      image: "/services/fullstack.png",
      category: "Engineering"
    },
    {
      title: "UI/UX & Frontend Engineering",
      description: "Beautiful, responsive, and intuitive interfaces designed for maximum user engagement.",
      icon: <Palette className="h-6 w-6" />,
      image: "/services/uiux.png",
      category: "Design"
    },
    {
      title: "Backend & API Development",
      description: "Robust server-side logic and secure API integrations to power your business.",
      icon: <Server className="h-6 w-6" />,
      image: "/services/backend.png",
      category: "Architecture"
    },
    {
      title: "Secure Architecture Design",
      description: "Building secure and scalable foundations following industry-proven design patterns.",
      icon: <ShieldCheck className="h-6 w-6" />,
      image: "/services/secure.png",
      category: "Security"
    },
    {
      title: "System Upgrade & Modernization",
      description: "Transform outdated legacy systems into modern, scalable, and secure platforms.",
      icon: <RefreshCw className="h-6 w-6" />,
      image: "/services/upgrade.png",
      category: "Modernization"
    }
  ];

  return (
    <section className="py-40 bg-white relative overflow-hidden" id="services">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-3xl">
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="mb-4 flex items-center gap-2"
             >
                <div className="h-px w-8 bg-blue-500" />
                <span className="text-blue-500 font-black tracking-widest text-xs uppercase">OUR CAPABILITIES</span>
             </motion.div>
             <motion.h2 
               className="text-5xl md:text-8xl font-black tracking-tighter text-slate-950"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
             >
               Digital <span className="text-blue-600 italic">Mastery</span>
             </motion.h2>
          </div>
          <motion.p 
            className="text-slate-500 max-w-md text-xl font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            We translate complex business challenges into elite software solutions using world-class engineering patterns.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] border border-slate-100 shadow-sm"
            >
              {/* Background Visual */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div 
                   whileHover={{ scale: 1.1, filter: "brightness(1.1)" }}
                   transition={{ duration: 0.8, ease: "easeOut" }}
                   className="h-full w-full bg-cover bg-center transition-all bg-no-repeat grayscale-[0.3] group-hover:grayscale-0"
                   style={{ backgroundImage: `url('${service.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-600/5 transition-all duration-700" />
              </div>

              {/* Content Integration */}
              <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                <div className="mb-auto flex justify-between items-start translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase bg-blue-500/10 backdrop-blur-md px-3 py-1 rounded-lg border border-blue-500/20">
                        {service.category}
                    </span>
                    <div className="p-2 bg-white/5 backdrop-blur-md rounded-xl text-white/50 border border-white/10 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all duration-500">
                      {service.icon}
                    </div>
                </div>

                <div className="space-y-3 pt-10">
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight transition-transform group-hover:-translate-y-2 duration-700">
                    {service.title}
                  </h3>
                  <div className="h-0.5 w-12 bg-blue-500 group-hover:w-full transition-all duration-700 origin-left" />
                  <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Glow Border on Hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-3xl transition-all duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
