"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Sparkles,
  ArrowUpRight,
  Star,
  MessageSquare,
  Camera,
  Loader2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import imageCompression from 'browser-image-compression';

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  tech_stack: string[];
  link?: string;
  created_at: string;
}

interface Review {
  id: string;
  project_id: string;
  author: string;
  position: string;
  content: string;
  rating: number;
  image?: string;
  created_at: string;
}

const StarRating = ({ rating, size = "md" }: { rating: number, size?: "sm" | "md" | "lg" }) => {
  const iconSize = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";
  return (
    <div className="flex gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={cn(iconSize, i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200")} 
        />
      ))}
    </div>
  );
}

function GiveReviewForm({ projectId, projectTitle, onReviewSubmit }: { projectId: string; projectTitle: string, onReviewSubmit: () => void }) {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const options = { maxSizeMB: 0.1, maxWidthOrHeight: 400, useWebWorker: true, fileType: "image/webp" as const };
      const compressedFile = await imageCompression(file, options);
      const fileName = `reviews/${Date.now()}_${Math.random().toString(36).substring(7)}.webp`;
      
      const { error } = await supabase.storage
        .from("portfolio-assets")
        .upload(fileName, compressedFile);

      if (error) {
        console.error("Upload error:", error);
        return;
      }

      const { data: publicData } = supabase.storage
        .from("portfolio-assets")
        .getPublicUrl(fileName);

      setImage(publicData.publicUrl);
    } catch (err) {
      console.error("Image processing error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !review) return;
    setLoading(true);
    
    try {
      const { error } = await supabase.from("project_reviews").insert({
        project_id: projectId,
        author: name,
        position: position,
        content: review,
        rating: rating,
        image: image 
      });

      if (error) throw error;
      setIsOpen(false);
      setName(""); setPosition(""); setReview(""); setRating(5); setImage(null);
      onReviewSubmit();
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger 
        render={
          <Button variant="outline" className="mt-4 border-slate-200 text-slate-600 hover:bg-primary/5 hover:text-primary hover:border-primary/20 font-black uppercase tracking-[0.1em] text-[10px] h-11 px-8 rounded-2xl w-full md:w-auto transition-all shadow-sm">
             <MessageSquare className="h-3.5 w-3.5 mr-2.5 opacity-60" />
             Give Reviews & Rating
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[480px] bg-white border-0 shadow-3xl rounded-[2rem] p-10 overflow-hidden">
        <DialogHeader className="text-left mb-6">
          <DialogTitle className="text-3xl font-black text-slate-900 leading-tight">Project Feedback</DialogTitle>
          <DialogDescription className="font-medium text-slate-500 mt-2">
            Add your review for <span className="text-primary font-bold">{projectTitle}</span>.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-6">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group relative h-20 w-20 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-all overflow-hidden bg-slate-50"
            >
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} className="h-full w-full object-cover" alt="Preview" />
              ) : (
                <div className="flex flex-col items-center">
                  <Camera className="h-5 w-5 text-slate-400 group-hover:text-primary" />
                  <span className="text-[8px] font-black uppercase tracking-tighter mt-1 text-slate-400">Photo</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                 <Camera className="h-5 w-5 text-white" />
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="font-black text-xs uppercase tracking-widest text-slate-400">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Alex Smith" className="h-12 border-slate-100 bg-slate-50/50 rounded-2xl focus-visible:ring-primary focus-visible:border-primary font-medium" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position" className="font-black text-xs uppercase tracking-widest text-slate-400">Your Position</Label>
              <Input id="position" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Marketing Director" className="h-12 border-slate-100 bg-slate-50/50 rounded-2xl focus-visible:ring-primary focus-visible:border-primary font-medium" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="review" className="font-black text-xs uppercase tracking-widest text-slate-400">Recommendation</Label>
              <Textarea id="review" value={review} onChange={(e) => setReview(e.target.value)} required placeholder="What was your experience like?" className="border-slate-100 bg-slate-50/50 rounded-2xl focus-visible:ring-primary focus-visible:border-primary font-medium min-h-[100px] resize-none" />
            </div>
            <div className="grid gap-2">
              <Label className="font-black text-xs uppercase tracking-widest text-slate-400">Rating</Label>
              <div className="flex gap-2">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} onClick={() => setRating(i + 1)} className={cn("h-8 w-8 cursor-pointer transition-all hover:scale-110", i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200")} />
                 ))}
              </div>
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-black h-14 rounded-2xl mt-4 shadow-xl shadow-primary/20 transition-all active:scale-[0.98]">
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Submit Review
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ProjectGallery({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!images.length) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [images.length]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  if (!images.length) return null;

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 group/gallery shadow-3xl touch-pan-y">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 }, 
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <Image
            src={images[currentIndex]}
            alt={title}
            fill
            className="object-cover"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button onClick={() => paginate(-1)} className="absolute left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 items-center justify-center text-white opacity-0 group-hover/gallery:opacity-100 transition-all hover:bg-white hover:text-primary z-30 hidden md:flex">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={() => paginate(1)} className="absolute right-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 items-center justify-center text-white opacity-0 group-hover/gallery:opacity-100 transition-all hover:bg-white hover:text-primary z-30 hidden md:flex">
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );
}

function ProjectDescription({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = text.split(" ");
  const truncatedText = words.slice(0, 40).join(" ") + "...";

  return (
    <div className="mb-8">
      <div className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap font-medium">
        {isExpanded ? text : truncatedText}
      </div>
      {words.length > 40 && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary font-black mt-4 hover:underline flex items-center gap-1 uppercase tracking-widest text-xs"
        >
          {isExpanded ? "Read Less" : "Read More"}
          <ArrowUpRight className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-45")} />
        </button>
      )}
    </div>
  );
}

export function LiveProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [showAllReviews, setShowAllReviews] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchData = useCallback(async () => {
    try {
      const [projectsRes, reviewsRes] = await Promise.all([
        supabase.from("projects").select("*").order("created_at", { ascending: false }),
        supabase.from("project_reviews").select("*").order("created_at", { ascending: false })
      ]);
      
      if (projectsRes.error) throw projectsRes.error;
      if (reviewsRes.error) throw reviewsRes.error;

      setProjects(projectsRes.data || []);
      setAllReviews(reviewsRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
     return (
        <div className="py-40 flex items-center justify-center">
             <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
        </div>
     );
  }

  if (projects.length === 0) return null;

  return (
    <section className="pt-4 pb-24 bg-white relative overflow-hidden" id="live-projects">
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/[0.03] rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-primary/[0.03] rounded-full blur-[150px] -z-10 -translate-x-1/2 translate-y-1/2" />
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="mb-6 p-2 bg-primary/10 rounded-2xl">
            <Sparkles className="h-6 w-6 text-primary" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-[8rem] font-black tracking-tighter text-slate-900 mb-6 leading-[0.8]">
            Live <span className="text-primary italic">Inno</span>vations
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-slate-500 max-w-3xl text-xl md:text-2xl font-medium tracking-tight leading-snug">
            Projects we’ve built to solve real problems, deliver results, and help businesses grow.
          </motion.p>
        </div>

        <div className="flex flex-col gap-16">
          {projects.map((project, idx) => {
            const projectReviews = allReviews.filter(r => r.project_id === project.id);
            const isShowingAll = showAllReviews === project.id;
            
            return (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col p-6 md:p-14 rounded-[2rem] bg-white border border-slate-100 transition-all duration-1000 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.18),0_20px_50px_-5px_rgba(30,58,138,0.1)] hover:shadow-[0_80px_150px_-20px_rgba(0,0,0,0.25)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[2rem] -z-10" />

                <div className="flex flex-col lg:flex-row gap-10 md:gap-20 items-stretch">
                    <div className="w-full lg:w-[58%] flex flex-col gap-10">
                    <ProjectGallery images={project.images} title={project.title} />
                    
                    <div className="lg:hidden space-y-6 px-2">
                        <h3 className="text-4xl sm:text-5xl font-black text-slate-900 leading-[0.9] tracking-tight">
                        {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                        {(project.tech_stack || []).map((tech: string) => (
                            <Badge key={tech} variant="secondary" className="bg-slate-50/80 text-slate-600 font-black px-3 py-2 rounded-xl text-[9px] uppercase tracking-[0.2em] border border-slate-100">
                            {tech}
                            </Badge>
                        ))}
                        </div>
                    </div>

                    <div className="px-2">
                        <ProjectDescription text={project.description} />
                        <Link 
                            href={project.link || "#"} 
                            target="_blank" 
                            className="w-full md:w-auto inline-flex items-center justify-center gap-4 px-10 py-5 rounded-2xl bg-slate-900 text-white font-black hover:bg-primary hover:scale-[1.02] transition-all shadow-[0_20px_50px_-10px_rgba(15,23,42,0.35)] active:scale-95 uppercase tracking-widest text-[11px]"
                        >
                            Explore Project
                            <ExternalLink className="h-4 w-4" />
                        </Link>
                    </div>
                    </div>

                    <div className="w-full lg:w-[42%] flex flex-col justify-between py-2 md:py-6">
                    <div>
                        <div className="hidden lg:block space-y-6 mb-12">
                            <h3 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tight group-hover:text-primary transition-all duration-500">
                            {project.title}
                            </h3>
                            <div className="flex flex-wrap gap-2.5">
                            {(project.tech_stack || []).map((tech: string) => (
                                <Badge key={tech} variant="secondary" className="bg-slate-50/80 text-slate-600 font-black px-4 md:px-5 py-2 md:py-2.5 rounded-2xl text-[9px] md:text-[10px] uppercase tracking-[0.2em] border border-slate-100 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                                {tech}
                                </Badge>
                            ))}
                            </div>
                        </div>

                        <div className="relative flex flex-col gap-8">
                            {projectReviews.length > 0 && (
                              <motion.div 
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="bg-white border-2 border-slate-50/50 rounded-[2rem] p-6 md:p-12 relative overflow-hidden group/review shadow-[0_45px_100px_-25px_rgba(0,0,0,0.3),0_20px_50px_-15px_rgba(0,0,0,0.2)]"
                              >
                                  <div className="absolute top-0 right-0 p-6 md:p-10 opacity-[0.03] text-primary group-hover/review:scale-125 transition-transform duration-1000">
                                      <Quote className="md:w-[120px] md:h-[120px] w-20 h-20" strokeWidth={8} />
                                  </div>
                                  
                                  <div className="flex flex-col gap-6 md:gap-10 relative z-10">
                                  <div className="flex items-center gap-4 md:gap-6">
                                      <div className="flex-shrink-0 h-16 w-16 md:h-20 md:w-20 rounded-full bg-primary text-white flex items-center justify-center font-black text-2xl shadow-xl overflow-hidden relative">
                                          {projectReviews[0].image ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img src={projectReviews[0].image} className="h-full w-full object-cover" alt="Client" />
                                          ) : (
                                            (projectReviews[0].author || "C")[0]
                                          )}
                                      </div>
                                      <div className="flex flex-col">
                                          <StarRating rating={projectReviews[0].rating} size="md" />
                                          <h4 className="text-slate-900 font-black text-xl md:text-2xl tracking-tighter leading-none mb-1.5">{projectReviews[0].author}</h4>
                                          <span className="text-primary text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">{projectReviews[0].position || "Verified Client"}</span>
                                      </div>
                                  </div>
                                  <p className="text-slate-600 italic font-medium text-lg md:text-2xl leading-[1.4] font-serif">&quot;{projectReviews[0].content}&quot;</p>
                                  </div>
                              </motion.div>
                            )}

                        <div className={cn("mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6", !projectReviews.length && "border-t-0")}>
                            {projectReviews.length > 0 ? (
                              <div 
                                  onClick={() => setShowAllReviews(isShowingAll ? null : project.id)}
                                  className="flex -space-x-3 cursor-pointer hover:translate-x-1 transition-transform group/stack"
                              >
                                {[...Array(Math.min(projectReviews.length, 3))].map((_, i) => (
                                    <div key={i} className="flex-shrink-0 h-12 w-12 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-slate-400 font-bold text-xs uppercase overflow-hidden relative">
                                        {projectReviews[i].image ? (
                                          /* eslint-disable-next-line @next/next/no-img-element */
                                          <img src={projectReviews[i].image} className="h-full w-full object-cover" alt="Client" />
                                        ) : (
                                          projectReviews[i].author[0]
                                        )}
                                    </div>
                                ))}
                                {projectReviews.length > 3 && (
                                    <div className="h-12 w-12 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white relative z-10">
                                        +{projectReviews.length - 3}
                                    </div>
                                )}
                                <div className="ml-6 py-2 px-4 rounded-full bg-slate-50 border border-slate-100 hover:bg-primary/5 transition-all">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-primary italic">
                                        {isShowingAll ? "Hide Feedback" : "View Feedback"}
                                    </span>
                                </div>
                              </div>
                            ) : (
                               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">No Reviews Yet</p>
                            )}
                            <GiveReviewForm projectId={project.id} projectTitle={project.title} onReviewSubmit={fetchData} />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isShowingAll && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: 50, height: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden w-full border-t border-slate-50 mt-10"
                    >
                        <div className="flex flex-wrap justify-center gap-10 mt-16 pb-10 px-2">
                          {projectReviews.map((rev, i) => (
                              <motion.div
                                key={rev.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-27px)] bg-white border border-slate-100 rounded-[2rem] p-10 shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
                              >
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-4">
                                      <div className="flex-shrink-0 h-14 w-14 rounded-full bg-slate-50 flex items-center justify-center text-primary font-black text-xl overflow-hidden relative">
                                          {rev.image ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img src={rev.image} className="h-full w-full object-cover" alt="Client" />
                                          ) : (
                                            rev.author[0]
                                          )}
                                      </div>
                                      <div>
                                          <StarRating rating={rev.rating} size="sm" />
                                          <h4 className="text-slate-900 font-black text-lg leading-none mb-1">{rev.author}</h4>
                                          {rev.position && <span className="text-primary text-[9px] font-black uppercase tracking-widest">{rev.position}</span>}
                                      </div>
                                    </div>
                                    <p className="text-slate-600 italic font-medium text-lg leading-relaxed font-serif">&quot;{rev.content}&quot;</p>
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-100/50 flex justify-end">
                                    <Quote className="h-6 w-6 text-primary/10" />
                                </div>
                              </motion.div>
                          ))}
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
