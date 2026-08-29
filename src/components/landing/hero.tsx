"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, MessageSquare, Code2, MessageCircle, Smartphone, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    {
      icon: <Cpu className="h-5 w-5" />,
      title: "AI Automation",
      desc: "Automate repetitive tasks and workflows using intelligent AI solutions to save time, reduce errors, and boost productivity.",
      href: "/ai-automation"
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "AI Chatbots",
      desc: "Smart conversational AI chatbots that engage users, answer queries, and enhance customer experience 24/7.",
      href: "/ai-chatbots"
    },
    {
      icon: <Code2 className="h-5 w-5" />,
      title: "Custom Software",
      desc: "Tailored software solutions designed to match your unique business needs and solve real-world challenges.",
      href: "/custom-software"
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "WhatsApp Automation",
      desc: "Automate WhatsApp messages, notifications, and workflows to connect with customers instantly and effectively.",
      href: "/whatsapp-automation"
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Mobile App Development",
      desc: "High-performance mobile apps for Android and iOS platforms built with modern technology and stunning user experience.",
      href: "/mobile-app-development"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Web Development",
      desc: "Modern, responsive websites and web applications that deliver performance, scalability, and impact.",
      href: "/web-development"
    }
  ];

  const glitters = [
    { top: '25%', left: '45%', size: 4, delay: 0, dur: 4 },
    { top: '45%', left: '48%', size: 6, delay: 1, dur: 5 },
    { top: '65%', left: '42%', size: 5, delay: 2, dur: 3.5 },
    { top: '35%', left: '55%', size: 7, delay: 0.5, dur: 4.5 },
    { top: '75%', left: '50%', size: 4, delay: 1.5, dur: 4 },
    { top: '55%', left: '38%', size: 6, delay: 2.5, dur: 5.5 },
    { top: '15%', left: '52%', size: 5, delay: 1.2, dur: 4.2 },
    { top: '85%', left: '45%', size: 6, delay: 0.8, dur: 3.8 },
  ];
  
  const stars = [
    { top: '30%', left: '45%', delay: 0.2, dur: 4 },
    { top: '50%', left: '52%', delay: 1.2, dur: 5 },
    { top: '70%', left: '47%', delay: 2.2, dur: 3.5 },
    { top: '40%', left: '58%', delay: 0.7, dur: 4.5 },
    { top: '80%', left: '44%', delay: 1.7, dur: 4 },
    { top: '20%', left: '50%', delay: 2.7, dur: 5.5 },
  ];

  return (
    <section className="relative pt-28 pb-12 bg-slate-50 dark:bg-[#020617] overflow-hidden font-sans transition-colors">
      
      {/* Background Animations to fill the gap */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        {/* Glowing Orbs */}
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[45%] w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-[80px]"
        />
        <motion.div
          animate={{ y: [0, 40, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[50%] left-[50%] w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-[100px]"
        />
        
        {/* Floating Glitters */}
        {glitters.map((g, i) => (
          <motion.div
            key={`g-${i}`}
            className="absolute bg-blue-500 rounded-full"
            style={{
              top: g.top,
              left: g.left,
              width: g.size,
              height: g.size,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: g.dur,
              repeat: Infinity,
              delay: g.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Floating Stars */}
        {stars.map((s, i) => (
          <motion.div
            key={`s-${i}`}
            className="absolute text-blue-400 text-xs"
            style={{
              top: s.top,
              left: s.left,
            }}
            animate={{
              y: [0, 30, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 180, 360],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: s.dur,
              repeat: Infinity,
              delay: s.delay,
              ease: "linear"
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
        {/* Top Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center mb-10">
          
          {/* Left Text */}
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl pt-4">
            <motion.div variants={item} className="mb-4">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 tracking-widest uppercase">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                WE BUILD DIGITAL EXCELLENCE
              </span>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-4">
              Innovative Software <br />
              Solutions for <span className="text-blue-600">Modern <br /> Businesses.</span>
            </motion.h1>

            <motion.p variants={item} className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-medium max-w-xl">
              At Duocore Software Company, we empower businesses with cutting-edge technology and intelligent solutions that drive growth, efficiency, and digital transformation.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link href="/#services">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 h-12 text-sm font-semibold shadow-lg shadow-blue-600/20 transition-all">
                  Explore Services <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="https://wa.me/917028350089" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-xl px-6 h-12 text-sm font-semibold shadow-sm transition-all">
                  Contact Us <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {[
                  "https://i.pravatar.cc/100?img=11",
                  "https://i.pravatar.cc/100?img=12",
                  "https://i.pravatar.cc/100?img=33",
                  "https://i.pravatar.cc/100?img=44"
                ].map((src, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 overflow-hidden relative shadow-sm">
                    <Image src={src} alt="Client" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-[13px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
                Trusted by <span className="text-slate-900 dark:text-white font-black">50+ Clients</span> <br /> across the globe
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] mt-8 lg:mt-0"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)'
              }}
            >
              <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[80px] -z-10" />
              <Image 
                src="/hero-image-new.png" 
                alt="Hero Illustration" 
                fill
                className="object-contain drop-shadow-xl"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

         {/* Bottom Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((feature, idx) => (
             <Link href={feature.href || "#"} key={idx} className="block h-full">
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 0.4 + idx * 0.1, ease: "easeOut" }}
                 className="bg-white dark:bg-slate-900 rounded-[1.25rem] p-5 shadow-lg shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col h-full hover:border-blue-200 dark:hover:border-blue-500/50 transition-all duration-300 group hover:-translate-y-1"
               >
                 <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                   {feature.icon}
                 </div>
                 <h3 className="text-[15px] font-black text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                 <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4 flex-grow">
                   {feature.desc}
                 </p>
                 <div className="mt-auto flex justify-end">
                   <ArrowUpRight className="h-4 w-4 text-slate-300 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                 </div>
               </motion.div>
             </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
