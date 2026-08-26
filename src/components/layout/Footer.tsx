"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Building2, 
  LayoutGrid, 
  Folder, 
  Phone, 
  ChevronRight,
  Mail,
  MapPin,
  Clock,
  Lightbulb,
  Users,
  ShieldCheck,
  TrendingUp,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  ArrowRight,
  BadgeCheck,
  Trophy,
  Heart
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50/50 dark:bg-[#020617] py-12 md:py-20 font-sans relative overflow-hidden transition-colors">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto px-4 md:px-8">
        
        {/* Main Glassmorphism Container */}
        <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-white dark:border-slate-800 shadow-[0_20px_80px_-15px_rgba(37,99,235,0.08)] dark:shadow-none rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 relative z-10 transition-colors">
          
          {/* Top Grid Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            
            {/* Column 1: Brand & About (Span 4) */}
            <div className="lg:col-span-4 flex flex-col">
              <Link href="/" className="mb-6 inline-block">
                <Image
                  src="/logo.png"
                  alt="Duocore Softwares Logo"
                  width={200}
                  height={45}
                  className="object-contain h-10 w-auto transition-all dark:hidden"
                />
                <Image
                  src="/logo-white-text.png"
                  alt="Duocore Softwares Logo"
                  width={200}
                  height={70}
                  className="object-contain h-[64px] w-auto -my-3 transition-all hidden dark:block"
                />
              </Link>
              
              <p className="text-slate-500 dark:text-slate-400 text-[13px] font-medium leading-relaxed mb-8 max-w-sm pr-4">
                Architecting the next generation of enterprise software with intelligence, precision, and a commitment to extreme quality.
              </p>
              
              {/* Feature Badges */}
              <div className="grid grid-cols-2 gap-3 mb-10 max-w-sm">
                <div className="flex items-center gap-2.5 bg-slate-50/80 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-700/50 rounded-xl px-3 py-2.5">
                  <Lightbulb className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Innovation Driven</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-50/80 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-700/50 rounded-xl px-3 py-2.5">
                  <Users className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Client Focused</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-50/80 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-700/50 rounded-xl px-3 py-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Quality Assured</span>
                </div>
                <div className="flex items-center gap-2.5 bg-slate-50/80 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition-colors border border-slate-100 dark:border-slate-700/50 rounded-xl px-3 py-2.5">
                  <TrendingUp className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Scalable Solutions</span>
                </div>
              </div>

              {/* Follow Us */}
              <div>
                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { icon: Linkedin, href: "#" },
                    { icon: Twitter, href: "#" },
                    { icon: Github, href: "#" },
                    { icon: Instagram, href: "#" }
                  ].map((social, idx) => (
                    <a key={idx} href={social.href} className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:border-blue-600 transition-all shadow-sm">
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Company (Span 2) */}
            <div className="lg:col-span-2">
              <div className="flex flex-col items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shrink-0">
                   <Building2 className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest">Company</h3>
              </div>
              <ul className="space-y-3.5">
                {["Home", "About Us", "Our Mission", "Our Team", "Careers", "Blog", "News & Updates"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="flex items-center gap-2 text-[13px] font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 group transition-colors">
                      <ChevronRight className="w-3 h-3 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services (Span 2) */}
            <div className="lg:col-span-2">
              <div className="flex flex-col items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shrink-0">
                   <LayoutGrid className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest">Services</h3>
              </div>
              <ul className="space-y-3.5">
                {["AI Development", "Web Development", "Mobile Development", "Cloud Solutions", "SaaS Development", "UI/UX Design", "IT Consulting"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="flex items-center gap-2 text-[13px] font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 group transition-colors">
                      <ChevronRight className="w-3 h-3 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Resources (Span 2) */}
            <div className="lg:col-span-2">
              <div className="flex flex-col items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shrink-0">
                   <Folder className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest">Resources</h3>
              </div>
              <ul className="space-y-3.5">
                {["Case Studies", "Portfolio", "Industries", "Technology Stack", "Documentation", "FAQs", "Support Center"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="flex items-center gap-2 text-[13px] font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 group transition-colors">
                      <ChevronRight className="w-3 h-3 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Get In Touch (Span 2) */}
            <div className="lg:col-span-2">
              <div className="flex flex-col items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shrink-0">
                   <Phone className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest">Get In Touch</h3>
              </div>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-blue-500 shrink-0 shadow-sm mt-0.5">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-0.5">Email Us</span>
                    <a href="mailto:info@duocoresoftware.com" className="text-[12px] font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">info@duocoresoftware.com</a>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-blue-500 shrink-0 shadow-sm mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-0.5">Call Us</span>
                    <a href="tel:+917028350089" className="text-[12px] font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+91 70283 50089</a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-[#25D366] shrink-0 shadow-sm mt-0.5">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-0.5">WhatsApp</span>
                    <a href="https://wa.me/919970359386" target="_blank" rel="noopener noreferrer" className="text-[12px] font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">+91 99703 59386</a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-blue-500 shrink-0 shadow-sm mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-0.5">Our Office</span>
                    <span className="text-[12px] font-bold text-slate-700 dark:text-slate-300 leading-snug">Duocore Software Company<br/>Pune, Maharashtra, India</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-blue-500 shrink-0 shadow-sm mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-0.5">Working Hours</span>
                    <span className="text-[12px] font-bold text-slate-700 dark:text-slate-300 leading-snug">Mon - Sat: 9:30 AM - 6:30 PM<br/>Sunday: Closed</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="bg-slate-50/80 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 rounded-2xl md:rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-12 transition-colors">
            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 md:gap-5 w-full md:w-auto">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-1">Stay Updated with Our Latest News</h4>
                <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">Subscribe to our newsletter and never miss an update.</p>
              </div>
            </div>
            
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="h-12 md:h-14 w-full sm:w-72 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl px-5 text-sm dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
              />
              <button className="h-12 md:h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl md:rounded-2xl font-bold shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-200/60 dark:border-slate-800 pt-8 flex flex-col xl:flex-row justify-between items-center gap-8 text-center xl:text-left transition-colors">
            
            {/* Copyright & Crafted With */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">
                © {new Date().getFullYear()} Duocore Softwares. All rights reserved.
              </span>
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 flex items-center justify-center xl:justify-start gap-1">
                Crafted with <Heart className="w-3 h-3 text-blue-500 fill-blue-500" /> by Duocore Team
              </span>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[11px] font-black text-slate-800 dark:text-slate-200">Secure & Reliable</span>
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500">Data Protection</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[11px] font-black text-slate-800 dark:text-slate-200">ISO 27001 Compliant</span>
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500">Security Standard</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[11px] font-black text-slate-800 dark:text-slate-200">100% Client Satisfaction</span>
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500">Our Commitment</span>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <Link href="/privacy-policy" className="text-[12px] font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-[12px] font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-[12px] font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Sitemap
              </Link>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
