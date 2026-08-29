"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Home, 
  Zap, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Clock,
  CheckCircle2,
  DollarSign,
  Rocket,
  Shield,
  Check,
  Award,
  Lock,
  Server,
  Bot,
  Mail,
  BarChart,
  Network,
  ChevronDown,
  Info
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function WhatsAppAutomationPage() {
  
  const [showRequirements, setShowRequirements] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

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
    <div className="relative pt-28 pb-12 bg-slate-50 dark:bg-[#020617] min-h-screen font-sans transition-colors overflow-hidden">
      
      {/* Background Animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
        {/* Glowing Orbs */}
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[45%] w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-[80px]"
        />
        <motion.div
          animate={{ y: [0, 40, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[40%] left-[50%] w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-[100px]"
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
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-xs font-medium text-slate-500 mb-6">
          <Link href="/" className="flex items-center hover:text-blue-600 transition-colors">
            <Home className="h-3.5 w-3.5 mr-1" />
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 mx-1" />
          <span className="text-slate-900 dark:text-slate-300">WhatsApp Automation</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 mb-6 items-center">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl lg:pr-8">
            <motion.div variants={item} className="mb-4">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 tracking-widest uppercase">
                WHATSAPP AUTOMATION
              </span>
            </motion.div>
            
            <motion.h1 variants={item} className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4">
              Instant Connect. <br />
              Automated Replies. <br />
              <span className="text-blue-600">On WhatsApp.</span>
            </motion.h1>

            <motion.p variants={item} className="text-sm md:text-base text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-medium max-w-xl">
              Automate WhatsApp messages, notifications, and workflows to connect with customers instantly and effectively.
            </motion.p>

            <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: <Zap className="h-4 w-4 text-blue-600" />, label: "Boost\nProductivity" },
                { icon: <Target className="h-4 w-4 text-blue-600" />, label: "Reduce\nHuman Errors" },
                { icon: <TrendingUp className="h-4 w-4 text-blue-600" />, label: "Scale\nEffortlessly" },
                { icon: <ShieldCheck className="h-4 w-4 text-blue-600" />, label: "Secure &\nReliable" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 group">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 whitespace-pre-line leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative lg:h-[500px] xl:h-[600px] w-full mt-8 lg:mt-0"
          >
            <div className="relative w-full h-full min-h-[350px] flex items-center justify-center lg:justify-end lg:pr-12 xl:pr-24 lg:-translate-x-8 xl:-translate-x-12">
              <div className="relative w-full aspect-[4/3] max-w-[700px] xl:max-w-[850px]">
                 <Image 
                   src="/whatsapp-automation.png?v=2" 
                   alt="WhatsApp Automation Workflow" 
                   fill
                   className="object-contain drop-shadow-2xl"
                   priority
                 />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col lg:flex-row gap-4 items-center bg-white dark:bg-slate-900 rounded-[1.5rem] p-5 lg:p-6 shadow-xl shadow-slate-200/30 dark:shadow-none border border-slate-100 dark:border-slate-800 mb-10">
          <div className="lg:w-1/3">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-1.5 leading-tight">
              Why Businesses Automate with AI?
            </h2>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
              Automation isn't just about saving time — it's about creating smarter systems that drive growth and efficiency.
            </p>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {[
              { icon: <Clock className="w-4 h-4 text-blue-500" />, stat: "80%", label: "Reduction in\nManual Work" },
              { icon: <CheckCircle2 className="w-4 h-4 text-blue-500" />, stat: "60%", label: "Improvement in\nAccuracy" },
              { icon: <DollarSign className="w-4 h-4 text-blue-500" />, stat: "40%", label: "Cost Savings on\nOperations" },
              { icon: <TrendingUp className="w-4 h-4 text-blue-500" />, stat: "24/7", label: "Continuous\nAutomation" },
            ].map((s, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 flex flex-col items-center text-center group hover:bg-blue-50 hover:border-blue-100 dark:hover:bg-slate-800 dark:hover:border-slate-600 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-100/50 dark:bg-blue-900/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <div className="text-lg font-black text-slate-900 dark:text-white mb-0.5">{s.stat}</div>
                <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 whitespace-pre-line leading-[1.2]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>


        {/* Important Note Section */}
        <div className="max-w-[800px] mx-auto mb-16 px-4 md:px-0">
          <div className="bg-blue-50 dark:bg-slate-900/50 border border-blue-200 dark:border-blue-900/50 rounded-3xl p-8 md:p-12 text-center shadow-lg shadow-blue-900/5 flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-6">
              <Info className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4">Coming Soon</h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
              We are developing business messaging and automation solutions designed to help businesses manage customer communication, messaging workflows, and WhatsApp Business Platform integrations, subject to applicable Meta approvals and platform availability.
            </p>
          </div>
        </div>

        {/* Security Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-10 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 mb-6 max-w-[1200px] mx-auto">
          <div className="md:w-1/3 text-center md:text-left">
             <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3">Enterprise-Grade Security & Reliability You Can Trust</h4>
             <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">We follow industry best practices to ensure your data is secure and your automation runs smoothly—every time.</p>
          </div>

          <div className="md:w-2/3 flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-6">
             {[
               { icon: <ShieldCheck className="w-6 h-6 text-blue-600" />, title: "SOC 2", sub: "Compliant" },
               { icon: <Network className="w-6 h-6 text-blue-600" />, title: "GDPR", sub: "Ready" },
               { icon: <Lock className="w-6 h-6 text-blue-600" />, title: "Encrypted", sub: "Data" },
               { icon: <Clock className="w-6 h-6 text-blue-600" />, title: "99.9%", sub: "Uptime" },
               { icon: <TrendingUp className="w-6 h-6 text-blue-600" />, title: "24/7", sub: "Monitoring" },
             ].map((sec, i) => (
               <div key={i} className="flex flex-col items-center text-center">
                 <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3">
                   {sec.icon}
                 </div>
                 <span className="text-[11px] font-black text-slate-900 dark:text-white leading-tight">{sec.title}</span>
                 <span className="text-[10px] font-medium text-slate-500">{sec.sub}</span>
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
}
