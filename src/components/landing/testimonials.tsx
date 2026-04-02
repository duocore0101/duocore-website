"use client";

import { cn } from "@/lib/utils";
import { Star, Quote, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
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
      <div className="py-20 flex flex-col items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20 mb-4" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Syncing Authentic Feedbacks...</p>
      </div>
    );
  }

  if (reviews.length === 0) return null;

  const activeReview = reviews[activeIndex];

  return (
    <section className="py-32 bg-slate-50/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mb-6 p-2.5 bg-primary/10 w-12 h-12 flex items-center justify-center rounded-2xl mx-auto">
            <Star className="h-6 w-6 text-primary fill-primary" />
          </motion.div>
          <motion.h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-slate-900 leading-none">
            Digital <span className="text-primary italic">Perspectives</span>
          </motion.h2>
          <motion.p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Authentic reflections from industry leaders on projects we&apos;ve engineered together.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto md:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x < -50 || velocity.x < -500) {
                  setActiveIndex((prev) => (prev + 1) % reviews.length);
                } else if (offset.x > 50 || velocity.x > 500) {
                  setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
                }
              }}
              className="cursor-grab active:cursor-grabbing w-full"
            >
              <div className="bg-white border border-slate-100 shadow-[0_20px_40px_-15px_rgba(30,58,138,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(30,58,138,0.1)] transition-shadow duration-500 p-8 sm:p-10 md:p-16 relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden group select-none">
                <Quote className="absolute top-8 right-8 h-20 w-20 md:top-10 md:right-10 md:h-32 md:w-32 text-slate-50 -z-10 group-hover:scale-110 transition-transform duration-700" />
                
                <div className="flex flex-row gap-4 sm:gap-6 md:gap-10 items-start md:items-start text-left mb-6 md:mb-10 relative z-10 w-full">
                  <div className="h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 border-2 md:border-4 border-white rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[1.5rem] bg-primary flex-shrink-0 flex items-center justify-center text-xl md:text-3xl font-black text-white shadow-lg md:shadow-xl shadow-primary/20 overflow-hidden pointer-events-none">
                    {activeReview.image ? (
                      <img src={activeReview.image} className="h-full w-full object-cover" alt={activeReview.author} />
                    ) : (
                      activeReview.author[0].toUpperCase()
                    )}
                  </div>
                  <div className="flex flex-col gap-1 md:gap-2 w-full items-start">
                    <div className="flex justify-start gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5", i < activeReview.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-100 fill-slate-50")} />
                      ))}
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-none mb-1 md:mb-2 md:mt-1">
                      {activeReview.author}
                    </h3>
                    <div className="flex flex-col sm:flex-col md:flex-row items-start gap-1.5 md:gap-2 text-sm mt-0.5 md:mt-1">
                      <span className="text-primary font-black uppercase tracking-widest text-[8px] sm:text-[9px] md:text-[10px] bg-primary/5 border border-primary/10 px-2.5 py-0.5 md:px-3 md:py-1 rounded-full leading-none">
                        {activeReview.position || "Verified Client"}
                      </span>
                      <span className="hidden md:inline text-slate-300">•</span>
                      <span className="text-slate-500 font-bold text-[10px] sm:text-[11px] md:text-sm leading-none">Reviewing: {activeReview.project_title || "Enterprise"}</span>
                    </div>
                  </div>
                </div>

                <p className="text-lg sm:text-xl md:text-3xl text-slate-800 font-bold leading-[1.4] italic relative z-10 px-2 md:px-0">
                  &quot;{activeReview.content}&quot;
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {reviews.length > 1 && (
            <>
              <div className="flex justify-center gap-3 mt-12">
                {reviews.map((_, i) => (
                  <button key={i} onClick={() => setActiveIndex(i)} className={cn("h-2 transition-all duration-700 rounded-full", i === activeIndex ? "w-10 bg-primary" : "w-2 bg-slate-200 hover:bg-slate-300")} />
                ))}
              </div>
              <button onClick={() => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)} className="absolute left-0 top-1/2 -translate-y-1/2 h-14 w-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-slate-400 hover:text-primary transition-all hidden md:flex border border-slate-50"><ChevronLeft className="h-7 w-7" /></button>
              <button onClick={() => setActiveIndex((prev) => (prev + 1) % reviews.length)} className="absolute right-0 top-1/2 -translate-y-1/2 h-14 w-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-slate-400 hover:text-primary transition-all hidden md:flex border border-slate-50"><ChevronRight className="h-7 w-7" /></button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
