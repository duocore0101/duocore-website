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
  Lock,
  Bot,
  Mail,
  Network,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AIAutomationPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showRequirements, setShowRequirements] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    projectTitle: '',
    projectDescription: '',
    businessGoals: '',
    timeline: '',
    budget: '',
    additionalNotes: ''
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
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
          <span className="text-slate-900 dark:text-slate-300">AI Automation</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 mb-6 items-center">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl lg:pr-8">
            <motion.div variants={item} className="mb-4">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 tracking-widest uppercase">
                AI AUTOMATION
              </span>
            </motion.div>
            
            <motion.h1 variants={item} className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4">
              Smarter Workflows. <br />
              Stronger Results. <br />
              <span className="text-blue-600">Powered by AI.</span>
            </motion.h1>

            <motion.p variants={item} className="text-sm md:text-base text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-medium max-w-xl">
              We build intelligent automation solutions that eliminate repetitive tasks, streamline operations, and empower your team to focus on what matters most. Save time, reduce errors, and unlock new levels of productivity.
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
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
            className="relative lg:h-[500px] xl:h-[600px] w-full mt-8 lg:mt-0"
          >
            <div className="relative w-full h-full min-h-[350px] flex items-center justify-center lg:justify-end lg:pr-12 xl:pr-24 lg:-translate-x-8 xl:-translate-x-12">
              <div className="relative w-full aspect-[4/3] max-w-[700px] xl:max-w-[850px]">
                 <Image 
                   src="/ai-automation.png?v=2" 
                   alt="AI Automation Workflow" 
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
              Automation isn&apos;t just about saving time — it&apos;s about creating smarter systems that drive growth and efficiency.
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

        {/* Pricing Section */}
        <div className="text-center mb-10 max-w-[1400px] mx-auto relative">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 tracking-widest uppercase mb-4">
            PRICING PLANS
          </span>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Choose the Right <br className="hidden md:block"/><span className="text-blue-600">AI Automation</span> Plan</h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">
            Flexible plans designed to scale with your business.<br/>Start small, grow fast, and automate everything.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 relative">
            <div className="flex items-center bg-white dark:bg-slate-900 rounded-full p-1 border border-slate-200 dark:border-slate-800 shadow-sm relative z-10">
              <button className="px-6 py-2 rounded-full text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                Monthly
              </button>
              <button className="px-6 py-2 rounded-full text-sm font-bold bg-blue-600 text-white shadow-md">
                Yearly
              </button>
            </div>
            
            {/* Save 20% pointer */}
            <div className="absolute left-[calc(50%+110px)] top-1/2 -translate-y-1/2 flex items-center gap-2">
               <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500">
                 <path d="M1 18C10 18 20 18 35 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                 <path d="M30 2L37 3L35 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
               <span className="text-xs font-black text-blue-600">Save 20%</span>
            </div>
          </div>
          
          {/* Side illustrations (Decorative) - Left */}
          <div className="hidden lg:block absolute left-10 top-0 opacity-80 pointer-events-none">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800/50 flex items-end gap-3 rotate-[-5deg]">
               <div className="w-4 h-12 bg-blue-200 rounded-t-md" />
               <div className="w-4 h-16 bg-blue-400 rounded-t-md" />
               <div className="w-4 h-24 bg-blue-600 rounded-t-md" />
               <TrendingUp className="absolute top-6 right-6 w-8 h-8 text-blue-500" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 flex items-center justify-center text-blue-600 rotate-12">
               <Bot className="w-6 h-6" />
            </div>
          </div>

          {/* Side illustrations (Decorative) - Right */}
          <div className="hidden lg:block absolute right-10 top-0 opacity-80 pointer-events-none">
            <div className="bg-white dark:bg-slate-900 p-6 w-48 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800/50 flex flex-col gap-4 rotate-[5deg]">
               {[1,2,3].map((i) => (
                 <div key={i} className="flex items-center gap-3">
                   <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white"><Check className="w-3 h-3" /></div>
                   <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 w-full" />
                 </div>
               ))}
            </div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 flex items-center justify-center text-blue-600 -rotate-12">
               <Mail className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-[1200px] mx-auto">
          {/* Starter Plan */}
          <div 
            onClick={() => setSelectedPlan('Starter')}
            className={`bg-white dark:bg-slate-900 rounded-[2rem] p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 relative group ${selectedPlan === 'Starter' ? 'border-2 border-blue-500 shadow-2xl shadow-blue-900/15' : 'border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2'}`}
          >
            {/* Hover Gradient */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Selection Tick */}
            {selectedPlan === 'Starter' && (
              <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-1 shadow-md z-20">
                <Check className="w-4 h-4" />
              </div>
            )}

            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-6 border border-blue-100 dark:border-blue-800 relative z-10 group-hover:scale-110 transition-transform duration-300">
              <Rocket className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 relative z-10">Starter</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 h-10 relative z-10">Perfect for small startups<br/>and growing teams.</p>
            
            <div className="text-4xl font-black text-blue-600 dark:text-blue-500 mb-8 relative z-10">$1,499<span className="text-sm text-slate-500 font-medium"> / project</span></div>
            
            <div className="grid grid-cols-2 gap-3 w-full mb-8 relative z-10">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <div className="text-[9px] uppercase font-bold text-slate-400 mb-1">Delivery</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">2 – 3 weeks</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <div className="text-[9px] uppercase font-bold text-slate-400 mb-1">Automations</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Up to 5 workflows</div>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow w-full text-left relative z-10">
              {[
                "Pre-built automation templates",
                "Task & workflow automation",
                "Email & notification automation",
                "Data entry automation",
                "Standard integrations",
                "Basic reporting & logs",
                "Email support"
              ].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>

            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 flex items-start gap-3 mb-8 text-left w-full relative z-10">
              <Zap className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Best for small businesses looking to automate repetitive tasks and save valuable time.</p>
            </div>

            <Button 
              variant={selectedPlan === 'Starter' ? 'default' : 'outline'} 
              className={`w-full rounded-xl h-12 font-bold text-sm shadow-sm relative z-10 transition-colors ${selectedPlan === 'Starter' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20' : 'border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-white dark:bg-slate-900'}`}
            >
              Choose Plan
            </Button>
          </div>

          {/* Growth Plan (Most Popular) */}
          <div 
            onClick={() => setSelectedPlan('Growth')}
            className={`bg-white dark:bg-slate-900 rounded-[2rem] p-8 relative flex flex-col items-center text-center transform md:-translate-y-4 z-10 cursor-pointer transition-all duration-300 group ${selectedPlan === 'Growth' ? 'border-2 border-blue-500 shadow-2xl shadow-blue-900/15' : 'border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none hover:shadow-2xl hover:shadow-blue-900/5'}`}
          >
            {/* Hover Gradient */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md z-20">
              MOST POPULAR
            </div>
            
            {/* Selection Tick */}
            {selectedPlan === 'Growth' && (
              <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-1 shadow-md z-20">
                <Check className="w-4 h-4" />
              </div>
            )}

            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-6 border border-blue-100 dark:border-blue-800 relative z-10 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 relative z-10">Growth</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 h-10 relative z-10">Ideal for businesses<br/>ready to scale.</p>
            
            <div className="text-4xl font-black text-blue-600 dark:text-blue-500 mb-8 relative z-10">$2,999<span className="text-sm text-slate-500 font-medium"> / project</span></div>
            
            <div className="grid grid-cols-2 gap-3 w-full mb-8 relative z-10">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <div className="text-[9px] uppercase font-bold text-slate-400 mb-1">Delivery</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">3 – 5 weeks</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <div className="text-[9px] uppercase font-bold text-slate-400 mb-1">Automations</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Up to 20 workflows</div>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow w-full text-left relative z-10">
              {[
                "Advanced workflow automation",
                "Custom API & third-party integrations",
                "Multi-step approvals & conditions",
                "Database & CRM automation",
                "Advanced reporting & analytics",
                "Priority support",
                "Training & documentation",
                "Error handling & notifications",
                "Role-based access"
              ].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>

            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 flex items-start gap-3 mb-8 text-left w-full relative z-10">
              <Zap className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Best for scaling teams that need advanced automation, integrations, and better control.</p>
            </div>

            <Button 
              variant={selectedPlan === 'Growth' ? 'default' : 'outline'}
              className={`w-full rounded-xl h-12 font-bold text-sm shadow-sm relative z-10 transition-colors ${selectedPlan === 'Growth' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20' : 'border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-white dark:bg-slate-900'}`}
            >
              Choose Plan
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div 
            onClick={() => setSelectedPlan('Enterprise')}
            className={`bg-white dark:bg-slate-900 rounded-[2rem] p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-300 relative group ${selectedPlan === 'Enterprise' ? 'border-2 border-blue-500 shadow-2xl shadow-blue-900/15' : 'border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2'}`}
          >
            {/* Hover Gradient */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Selection Tick */}
            {selectedPlan === 'Enterprise' && (
              <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-1 shadow-md z-20">
                <Check className="w-4 h-4" />
              </div>
            )}

            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-6 border border-blue-100 dark:border-blue-800 relative z-10 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 relative z-10">Enterprise</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6 h-10 relative z-10">For large organizations with<br/>complex needs.</p>
            
            <div className="text-4xl font-black text-blue-600 dark:text-blue-500 mb-8 relative z-10">$5,999<span className="text-sm text-slate-500 font-medium"> / project</span></div>
            
            <div className="grid grid-cols-2 gap-3 w-full mb-8 relative z-10">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <div className="text-[9px] uppercase font-bold text-slate-400 mb-1">Delivery</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">5 – 8 weeks</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <div className="text-[9px] uppercase font-bold text-slate-400 mb-1">Automations</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Unlimited workflows</div>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow w-full text-left relative z-10">
              {[
                "Unlimited workflows & complex logic",
                "Custom AI model & solution design",
                "Enterprise integrations (ERP, CRM, etc.)",
                "Real-time monitoring & alerts",
                "Advanced analytics dashboard",
                "Dedicated success manager",
                "24/7 priority support",
                "SLA & uptime guarantee",
                "On-premise / Private cloud option",
                "Advanced security & audit logs"
              ].map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>

            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 flex items-start gap-3 mb-8 text-left w-full relative z-10">
              <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Best for enterprises that require robust, secure, and fully customized automation solutions.</p>
            </div>

            <Button 
              variant={selectedPlan === 'Enterprise' ? 'default' : 'outline'}
              className={`w-full rounded-xl h-12 font-bold text-sm shadow-sm relative z-10 transition-colors ${selectedPlan === 'Enterprise' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20' : 'border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 bg-white dark:bg-slate-900'}`}
            >
              Choose Plan
            </Button>
          </div>
        </div>

        {/* Continue to Requirements Button */}
        {selectedPlan && !showRequirements && !showReview && (
          <div className="flex flex-col items-center justify-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button onClick={() => setShowRequirements(true)} className="rounded-full h-14 px-10 font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-900/20 transition-all hover:scale-105 mb-4 border border-blue-500">
              Continue to Requirements
            </Button>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Selected: <span className="text-blue-600 font-bold">{selectedPlan}</span>
            </p>
          </div>
        )}

        {/* Requirements Collection Form */}
        {showRequirements && selectedPlan && (
          <div className="max-w-[1000px] mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-8 px-4 md:px-0">
              <div className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest mb-3">
                <div className="w-6 h-px bg-blue-600"></div>
                Requirements Collection
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Tell us about your project.</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl leading-relaxed mb-8">
                The details you share here help us prepare an accurate proposal, reduce back-and-forth, and recommend the most suitable approach for your business.
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <button onClick={() => setShowRequirements(false)} className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                  ← Back to Package Selection
                </button>
              </div>
              
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-8 p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                You&apos;re requesting <span className="font-bold text-slate-900 dark:text-white">AI Automation — {selectedPlan}</span>. Not the right fit? Use the link above to change your selection.
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800">
              
              {/* Business Information */}
              <div className="mb-12">
                <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6">Business Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Company / Business Name <span className="text-blue-500">*</span></label>
                    <input type="text" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} placeholder="e.g. Acme Retail Co." className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Contact Person <span className="text-blue-500">*</span></label>
                    <input type="text" value={formData.contactPerson} onChange={e => setFormData({...formData, contactPerson: e.target.value})} placeholder="Your full name" className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Business Email <span className="text-blue-500">*</span></label>
                    <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@company.com" className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Phone Number <span className="text-slate-400 font-medium">(Optional)</span></label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white" />
                  </div>
                </div>
              </div>

              {/* Project Information */}
              <div className="mb-12">
                <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6">Project Information</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Project Title <span className="text-blue-500">*</span></label>
                    <input type="text" value={formData.projectTitle} onChange={e => setFormData({...formData, projectTitle: e.target.value})} placeholder="e.g. Customer support chatbot for our online store" className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1">Project Description <span className="text-blue-500">*</span></label>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Explain what you need, who it&apos;s for, and any specifics you already know — the more detail, the better.</p>
                    <textarea value={formData.projectDescription} onChange={e => setFormData({...formData, projectDescription: e.target.value})} placeholder="Describe your project in as much detail as you can..." rows={5} className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-y dark:text-white"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Business Goals <span className="text-slate-400 font-medium">(Optional)</span></label>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">What do you want this project to achieve?</p>
                    <textarea value={formData.businessGoals} onChange={e => setFormData({...formData, businessGoals: e.target.value})} placeholder="e.g. Reduce response times, increase qualified leads..." rows={3} className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-y dark:text-white"></textarea>
                  </div>
                </div>
              </div>

              {/* Timeline & Budget */}
              <div className="mb-12">
                <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6">Timeline & Budget</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Timeline</label>
                    <div className="relative">
                      <select value={formData.timeline} onChange={e => setFormData({...formData, timeline: e.target.value})} className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white appearance-none pr-10">
                        <option value="">Select a timeframe</option>
                        <option value="asap">As soon as possible</option>
                        <option value="1month">Within 1 month</option>
                        <option value="3months">1-3 months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-4 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Budget <span className="text-slate-400 font-medium">(Optional)</span></label>
                    <div className="relative">
                      <select value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white appearance-none pr-10">
                        <option value="">Prefer not to say</option>
                        <option value="under5k">Under $5k</option>
                        <option value="5k-10k">$5k - $10k</option>
                        <option value="10k-25k">$10k - $25k</option>
                        <option value="25k+">$25k+</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-4 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mb-12">
                <h3 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-6">Additional Information <span className="text-slate-400 font-medium">(Optional)</span></h3>
                <div>
                  <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">Anything else that would help us understand your project?</label>
                  <textarea value={formData.additionalNotes} onChange={e => setFormData({...formData, additionalNotes: e.target.value})} placeholder="Share any other context, constraints, or references..." rows={4} className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-y dark:text-white"></textarea>
                </div>
              </div>

              {!showReview && (
                <div className="flex flex-col items-center justify-center pt-8 border-t border-slate-100 dark:border-slate-800">
                  <Button onClick={() => setShowReview(true)} className="rounded-full h-14 px-12 font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-900/20 transition-all hover:scale-105 mb-4">
                    Continue to Review
                  </Button>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Fill in the required fields to continue.</p>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Review Section */}
        {showReview && selectedPlan && (
          <div className="max-w-[1000px] mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-8 px-4 md:px-0">
              <div className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest mb-3">
                <div className="w-6 h-px bg-blue-600"></div>
                Review
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Review your project summary.</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl leading-relaxed mb-8">
                Take a moment to confirm everything below is accurate before you submit — you can edit any section without losing your progress.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800">
              
              {/* Selected Solution */}
              <div className="pb-8 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">Selected Solution</h3>
                  <div className="flex gap-4">
                    <button onClick={() => {setShowReview(false); setShowRequirements(false);}} className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Edit Service</button>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <button onClick={() => {setShowReview(false); setShowRequirements(false);}} className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Edit Package</button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Service</div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">AI Automation</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Package</div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedPlan}</div>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="py-8 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">Business Information</h3>
                  <button onClick={() => setShowReview(false)} className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Edit</button>
                </div>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Business Name</div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{formData.businessName || '-'}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Contact Person</div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{formData.contactPerson || '-'}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{formData.email || '-'}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone</div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{formData.phone || '-'}</div>
                  </div>
                </div>
              </div>

              {/* Project Information */}
              <div className="py-8 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">Project Information</h3>
                  <button onClick={() => setShowReview(false)} className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Edit</button>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Project Title</div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{formData.projectTitle || '-'}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Project Description</div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{formData.projectDescription || '-'}</div>
                  </div>
                </div>
              </div>

              {/* Business Goals */}
              <div className="py-8 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">Business Goals</h3>
                  <button onClick={() => setShowReview(false)} className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Edit</button>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{formData.businessGoals || '-'}</div>
                </div>
              </div>

              {/* Timeline & Budget */}
              <div className="py-8 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">Timeline & Budget</h3>
                  <button onClick={() => setShowReview(false)} className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Edit</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Timeline</div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{
                      formData.timeline === 'asap' ? 'As soon as possible' : 
                      formData.timeline === '1month' ? 'Within 1 month' : 
                      formData.timeline === '3months' ? '1-3 months' : 
                      formData.timeline === 'flexible' ? 'Flexible' : '-'
                    }</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Budget</div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{
                      formData.budget === 'under5k' ? 'Under $5k' : 
                      formData.budget === '5k-10k' ? '$5k - $10k' : 
                      formData.budget === '10k-25k' ? '$10k - $25k' : 
                      formData.budget === '25k+' ? '$25k+' : 'Prefer not to say'
                    }</div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="pt-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">Additional Notes</h3>
                  <button onClick={() => setShowReview(false)} className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Edit</button>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{formData.additionalNotes || '-'}</div>
                </div>
              </div>

            </div>
            
            <div className="flex flex-col items-center justify-center pt-12">
              <Button className="rounded-full h-14 px-12 font-bold text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-900/20 transition-all hover:scale-105 mb-4">
                Submit Project Inquiry
              </Button>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Review your details above, then submit when you&apos;re ready.</p>
            </div>
          </div>
        )}
        
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
