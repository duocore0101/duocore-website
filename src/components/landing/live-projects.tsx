"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { 
  HeartPulse,
  GraduationCap,
  ShoppingCart,
  Landmark,
  Truck,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  tech_stack: string[];
  link?: string;
  created_at: string;
  category?: string;
  icon?: React.ReactNode;
}

// Map real project titles to categories based on user requests
function getProjectMetadata(title: string) {
  const t = title.toLowerCase();
  if (t.includes("gmar")) {
    return { category: "Education", icon: <GraduationCap className="w-3.5 h-3.5" /> };
  } else if (t.includes("stock")) {
    return { category: "Finance", icon: <Landmark className="w-3.5 h-3.5" /> };
  } else if (t.includes("rawat") || t.includes("logi")) {
    return { category: "Logistics", icon: <Truck className="w-3.5 h-3.5" /> };
  } else if (t.includes("medic") || t.includes("health")) {
    return { category: "Healthcare", icon: <HeartPulse className="w-3.5 h-3.5" /> };
  } else if (t.includes("edu") || t.includes("learn")) {
    return { category: "Education", icon: <GraduationCap className="w-3.5 h-3.5" /> };
  } else if (t.includes("shop") || t.includes("commerce")) {
    return { category: "E-commerce", icon: <ShoppingCart className="w-3.5 h-3.5" /> };
  } else {
    return { category: "Technology", icon: <FolderOpen className="w-3.5 h-3.5" /> };
  }
}

function ProjectGallery({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images]);

  const paginate = (newDirection: number, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? "100%" : "-100%", opacity: 0 })
  };

  if (!images || images.length === 0) {
    return (
      <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
        No Image
      </div>
    );
  }

  return (
    <div className="absolute inset-0 group/gallery shadow-inner bg-slate-50 dark:bg-slate-800/50">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button 
            onClick={(e) => paginate(-1, e)} 
            className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/50 backdrop-blur-md border border-white items-center justify-center text-slate-800 opacity-0 group-hover/gallery:opacity-100 transition-all hover:bg-white z-30 hidden md:flex hover:scale-110 shadow-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button 
            onClick={(e) => paginate(1, e)} 
            className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/50 backdrop-blur-md border border-white items-center justify-center text-slate-800 opacity-0 group-hover/gallery:opacity-100 transition-all hover:bg-white z-30 hidden md:flex hover:scale-110 shadow-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
            {images.map((_, i) => (
               <div key={i} className={cn("h-1.5 rounded-full transition-all", i === currentIndex ? "w-4 bg-blue-600" : "w-1.5 bg-white/60")} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const categories = ["All Projects", "Healthcare", "Education", "E-commerce", "Finance", "Logistics", "Technology"];

export function LiveProjects() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchProjects = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      
      const enrichedProjects = (data || []).map((p: Project) => {
        const meta = getProjectMetadata(p.title);
        return { ...p, category: meta.category, icon: meta.icon };
      });
      
      setProjects(enrichedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const filteredProjects = activeCategory === "All Projects" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="py-12 bg-white dark:bg-[#020617] relative overflow-hidden font-sans transition-colors" id="live-projects">
      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 flex items-center gap-2"
            >
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[9px] font-black bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>
                OUR PROJECTS
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Real Solutions. <br className="hidden md:block" />
              Real <span className="text-blue-600">Impact.</span>
            </motion.h2>
            
            <motion.p 
              className="text-slate-600 dark:text-slate-300 text-xs md:text-sm font-medium leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              We build intelligent, scalable, and reliable systems that help businesses streamline operations and grow faster.
            </motion.p>
          </div>
        </div>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-[11px] font-bold transition-all duration-300 border shadow-sm flex items-center gap-1.5",
                activeCategory === cat 
                  ? "bg-blue-600 dark:bg-blue-600/80 text-white border-blue-600 dark:border-blue-500 shadow-blue-600/20 dark:shadow-none" 
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-slate-800/80 hover:text-blue-600 dark:hover:text-blue-400"
              )}
            >
              {cat === "Healthcare" && <HeartPulse className="w-3 h-3" />}
              {cat === "Education" && <GraduationCap className="w-3 h-3" />}
              {cat === "E-commerce" && <ShoppingCart className="w-3 h-3" />}
              {cat === "Finance" && <Landmark className="w-3 h-3" />}
              {cat === "Logistics" && <Truck className="w-3 h-3" />}
              {cat === "Technology" && <FolderOpen className="w-3 h-3" />}
              {cat}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="min-h-[400px] flex items-center justify-center">
             <Loader2 className="h-8 w-8 animate-spin text-blue-600 opacity-50" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="min-h-[300px] flex items-center justify-center text-slate-400 dark:text-slate-500 font-medium text-sm">
             No projects found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 mb-10 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-5 shadow-sm shadow-slate-200/30 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 md:gap-5 hover:shadow-lg hover:border-blue-100 dark:hover:border-blue-500/50 transition-all overflow-hidden"
                >
                  {/* Left Side: Info */}
                  <div className="w-full md:w-[55%] flex flex-col relative z-10">
                    <div>
                      <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-3 px-2 py-1 rounded-md border-0 inline-flex items-center gap-1.5 text-[8.5px] uppercase tracking-widest font-black transition-colors">
                        {project.icon}
                        {project.category}
                      </Badge>
                      <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {(project.tech_stack || []).map(t => (
                          <span key={t} className="text-[8px] md:text-[9px] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300 font-bold whitespace-nowrap">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-auto flex flex-wrap items-center gap-2">
                      <Link 
                        href={`/portfolio/${project.id}`} 
                        className="bg-slate-900 dark:bg-slate-800 hover:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg px-4 h-8 text-[10px] font-bold shadow-sm inline-flex items-center gap-1.5 transition-colors group/link"
                      >
                        View Project 
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                      
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-4 h-8 text-[10px] font-bold shadow-sm inline-flex items-center gap-1.5 transition-colors"
                        >
                          View Live
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Image preview gallery */}
                  <div className="w-full md:w-[45%] rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800/50 relative min-h-[180px] md:min-h-[220px] border border-slate-100 dark:border-slate-800 group-hover:shadow-inner shrink-0">
                     <ProjectGallery images={project.images} title={project.title} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
