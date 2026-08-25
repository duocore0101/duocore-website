"use client";

import { cn } from "@/lib/utils";
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  ShieldCheck,
  Zap,
  Target,
  Hexagon,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  BarChart2,
  Home
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface Review {
  id: string;
  author: string;
  content: string;
  rating: number;
  image?: string;
  position?: string;
  project_title?: string;
  created_at: string;
}

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const supabase = createClient();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("project_reviews")
        .select("*, projects(title)")
        .order("created_at", { ascending: false })
        .limit(10);
      
      if (error) throw error;
      
      const formattedReviews = (data || []).map(r => ({
        ...r,
        project_title: r.projects?.title
      }));
      setReviews(formattedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 1) {
      const timer = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % reviews.length);
      }, 7000);
      return () => clearInterval(timer);
    }
  }, [reviews.length]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center bg-blue-50/30 dark:bg-slate-900/30 transition-colors">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600 dark:text-blue-400 opacity-20 mb-4" />
        <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px]">Loading Reviews...</p>
      </div>
    );
  }

  if (reviews.length === 0) return null;

  const activeReview = reviews[activeIndex];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white dark:from-[#020617] via-blue-50/50 dark:via-slate-900/50 to-blue-100/30 dark:to-slate-900 relative overflow-hidden font-sans transition-colors">
      {/* Background Abstract Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 dark:bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-500/10 dark:bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 left-10 grid grid-cols-4 gap-2 opacity-[0.03] dark:opacity-10 pointer-events-none hidden md:grid">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-900 dark:bg-blue-200" />
        ))}
      </div>
      <div className="absolute top-1/4 right-10 text-[200px] font-serif font-black text-blue-600/5 dark:text-blue-400/5 leading-none select-none pointer-events-none hidden lg:block">
        &quot;
      </div>
      
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="mb-4 flex items-center gap-2"
          >
            <span className="inline-flex items-center rounded-full px-3 py-1 text-[9px] font-black tracking-widest uppercase text-blue-600">
              <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center mr-1.5 shadow-sm shadow-blue-600/30">
                 <Star className="w-2.5 h-2.5 fill-white" />
              </div>
              CLIENT REVIEWS
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white leading-none"
          >
            What Our <span className="text-blue-600 dark:text-blue-500">Clients</span> Say
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 text-xs md:text-sm max-w-xl mx-auto font-medium leading-relaxed"
          >
            Real feedback from industry leaders who have experienced the impact of our solutions.
          </motion.p>
        </div>

        {/* Carousel Area */}
        <div className="relative max-w-3xl mx-auto mb-10 px-4 sm:px-12">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full"
            >
              <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.1)] dark:shadow-none p-6 sm:p-8 md:p-10 rounded-3xl relative transition-colors">
                
                {/* Reviewer Header */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
                  <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xl font-black text-white shadow-lg shadow-blue-600/30 overflow-hidden">
                    {activeReview.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={activeReview.image} className="h-full w-full object-cover" alt={activeReview.author} />
                    ) : (
                      activeReview.author[0].toUpperCase()
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("h-3.5 w-3.5", i < activeReview.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-700 fill-slate-100 dark:fill-slate-800")} />
                      ))}
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight mb-1.5 leading-tight">
                      {activeReview.author}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-[9px] md:text-[10px]">
                      <span className="text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 px-2.5 py-0.5 rounded-full">
                        {activeReview.position || "Verified Client"}
                      </span>
                      <span className="hidden sm:inline text-slate-300 dark:text-slate-600">•</span>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">
                        Reviewing: {activeReview.project_title || "Enterprise Solution"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quote Content */}
                <div className="flex gap-3 items-start mb-8">
                  <span className="text-3xl sm:text-4xl text-blue-300 dark:text-blue-500/50 font-serif font-black leading-none shrink-0">&ldquo;</span>
                  <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 font-medium italic leading-relaxed pt-1">
                    {activeReview.content}
                    <span className="text-blue-300 dark:text-blue-500/50 font-serif font-black ml-1">&rdquo;</span>
                  </p>
                </div>

                {/* Bottom Badges */}
                <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-5 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-start sm:items-center">
                  
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-tight">Reliable & Professional<br/>Team</span>
                  </div>
                  
                  <div className="hidden sm:block w-px h-8 bg-slate-200/50 dark:bg-slate-800/50" />
                  
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-tight">High Quality<br/>Deliverables</span>
                  </div>
                  
                  <div className="hidden sm:block w-px h-8 bg-slate-200/50 dark:bg-slate-800/50" />
                  
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <Target className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 leading-tight">On-time & Beyond<br/>Expectations</span>
                  </div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {reviews.length > 1 && (
            <>
              <button 
                onClick={() => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)} 
                className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center justify-center text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform border border-slate-100 dark:border-slate-700 z-20"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              <button 
                onClick={() => setActiveIndex((prev) => (prev + 1) % reviews.length)} 
                className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center justify-center text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform border border-slate-100 dark:border-slate-700 z-20"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </>
          )}

          {/* Pagination Dots */}
          {reviews.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {reviews.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveIndex(i)} 
                  className={cn("h-2 transition-all duration-300 rounded-full", i === activeIndex ? "w-6 bg-blue-600 dark:bg-blue-500" : "w-2 bg-blue-200 dark:bg-slate-700 hover:bg-blue-300 dark:hover:bg-slate-600")} 
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom Logos Bar */}
        <div className="max-w-5xl mx-auto bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white dark:border-slate-800 shadow-lg shadow-blue-900/5 dark:shadow-none rounded-[2rem] sm:rounded-full py-6 px-8 flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center gap-6 sm:gap-2 transition-colors">
          
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 opacity-80 hover:opacity-100 transition-opacity">
            <Hexagon className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col">
              <span className="text-[11px] md:text-xs font-black leading-none">TechNova</span>
              <span className="text-[7px] md:text-[8px] font-bold text-slate-400 dark:text-slate-500 tracking-widest">SOLUTIONS</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 opacity-80 hover:opacity-100 transition-opacity">
            <HeartPulse className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
            <div className="flex flex-col">
              <span className="text-[11px] md:text-xs font-black leading-none">Medicare+</span>
              <span className="text-[7px] md:text-[8px] font-bold text-slate-400 dark:text-slate-500 tracking-widest">HEALTHCARE</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 opacity-80 hover:opacity-100 transition-opacity">
            <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-slate-800 dark:text-slate-200" />
            <div className="flex flex-col">
              <span className="text-[11px] md:text-xs font-black leading-none">EduSmart</span>
              <span className="text-[7px] md:text-[8px] font-bold text-slate-400 dark:text-slate-500 tracking-widest">LEARNING SYSTEMS</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 opacity-80 hover:opacity-100 transition-opacity">
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-slate-800 dark:text-slate-200" />
            <div className="flex flex-col">
              <span className="text-[11px] md:text-xs font-black leading-none">ShopNest</span>
              <span className="text-[7px] md:text-[8px] font-bold text-slate-400 dark:text-slate-500 tracking-widest">E-COMMERCE</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 opacity-80 hover:opacity-100 transition-opacity">
            <BarChart2 className="w-5 h-5 md:w-6 md:h-6 text-slate-800 dark:text-slate-200" />
            <div className="flex flex-col">
              <span className="text-[11px] md:text-xs font-black leading-none">FinTrack</span>
              <span className="text-[7px] md:text-[8px] font-bold text-slate-400 dark:text-slate-500 tracking-widest">ANALYTICS</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 opacity-80 hover:opacity-100 transition-opacity">
            <Home className="w-5 h-5 md:w-6 md:h-6 text-slate-800 dark:text-slate-200" />
            <div className="flex flex-col">
              <span className="text-[11px] md:text-xs font-black leading-none">EstateHub</span>
              <span className="text-[7px] md:text-[8px] font-bold text-slate-400 dark:text-slate-500 tracking-widest">REAL ESTATE</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
