"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { 
  ArrowUpRight, 
  Target, 
  ShieldCheck, 
  ThumbsUp, 
  Users, 
  Calendar, 
  FolderCheck, 
  Building2,
  ArrowRight,
  Cpu
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Counter({ value, suffix = "" }: { value: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 80,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(Math.round(latest)) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function About() {
  return (
    <section className="relative pt-12 pb-12 bg-slate-50 dark:bg-[#020617] overflow-hidden font-sans transition-colors" id="about">
      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
        {/* Top Part: Text and Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="mb-4">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>
                ABOUT US
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4">
              Building Smart <br />
              Solutions for a <br />
              <span className="text-blue-600">Smarter Tomorrow</span>
            </h2>

            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mb-6 leading-relaxed font-medium max-w-xl">
              Duocore Software is a forward-thinking technology company passionate about creating innovative, reliable and scalable digital solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/about">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 h-10 text-sm font-semibold shadow-lg shadow-blue-600/20 transition-all">
                  Our Mission <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="https://wa.me/917028350089" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-xl px-6 h-10 text-sm font-semibold shadow-sm transition-all">
                  Get in Touch <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative w-full h-[250px] sm:h-[350px] lg:h-[400px]"
          >
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-blue-400/10 rounded-full blur-[100px] -z-10 translate-x-10 translate-y-10" />
            
            <Image 
              src="/about-image.png" 
              alt="About Duocore" 
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </div>

        {/* Middle Card: Our Story */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="bg-white dark:bg-slate-900/60 rounded-[1.5rem] p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 mb-6 flex flex-col lg:flex-row gap-8 items-center transition-colors"
        >
          {/* Left Side: Story Text */}
          <div className="flex-1 flex gap-5 lg:border-r border-slate-100 dark:border-slate-800 lg:pr-8">
            <div className="hidden sm:flex shrink-0 w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Our Story</h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-4">
                Duocore Software was founded with a vision to deliver cutting-edge technology solutions that help businesses grow, innovate and lead in the digital world. With a team of skilled developers and creative thinkers, we turn ideas into powerful, scalable and user-friendly software products.
              </p>
              <Link href="/about">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 h-9 text-xs font-semibold shadow-md shadow-blue-600/20 transition-all">
                  Learn More <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side: Features List */}
          <div className="flex-1 flex flex-col gap-4 w-full">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Innovation First</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">We build modern, future-ready solutions.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Quality & Reliability</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Clean code. Long-term stability.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                <ThumbsUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Client Success</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Your growth is our success.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <Users className="w-5 h-5" />, val: 50, suffix: "+", label: "Happy Clients" },
            { icon: <Calendar className="w-5 h-5" />, val: 5, suffix: "+", label: "Years of Experience" },
            { icon: <FolderCheck className="w-5 h-5" />, val: 65, suffix: "+", label: "Projects Delivered" },
            { icon: <Building2 className="w-5 h-5" />, val: 15, suffix: "+", label: "Industries Served" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: "easeOut" }}
              className="bg-white dark:bg-slate-900 rounded-[1.25rem] p-4 shadow-lg shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 flex items-center gap-3 hover:border-blue-200 dark:hover:border-blue-500/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div>
                <div className="text-lg md:text-xl font-black text-blue-600">
                  <Counter value={stat.val} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] md:text-[11px] font-semibold text-slate-500 dark:text-slate-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
