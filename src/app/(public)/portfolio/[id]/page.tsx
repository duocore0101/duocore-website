"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  ExternalLink, 
  Quote, 
  Star, 
  MessageSquare, 
  Camera, 
  Loader2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
          className={cn(iconSize, i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-700")} 
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
      <DialogTrigger render={<Button variant="outline" className="border-blue-200 dark:border-blue-500/50 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-400 font-bold px-6 h-12 rounded-xl transition-all shadow-sm flex items-center gap-2" />}>
           <MessageSquare className="h-4 w-4" />
           Add Your Review
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] bg-white dark:bg-slate-900 border-0 shadow-2xl rounded-[2rem] p-10 overflow-hidden">
        <DialogHeader className="text-left mb-6">
          <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Project Feedback</DialogTitle>
          <DialogDescription className="font-medium text-slate-500 dark:text-slate-400 mt-2">
            Share your experience working on <span className="text-blue-600 dark:text-blue-400 font-bold">{projectTitle}</span>.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-6">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group relative h-20 w-20 rounded-full border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-all overflow-hidden bg-slate-50 dark:bg-slate-800"
            >
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} className="h-full w-full object-cover" alt="Preview" />
              ) : (
                <div className="flex flex-col items-center">
                  <Camera className="h-5 w-5 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
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
              <Label htmlFor="name" className="font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Alex Smith" className="h-12 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white rounded-xl focus-visible:ring-blue-500 focus-visible:border-blue-500" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="position" className="font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Your Position</Label>
              <Input id="position" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Marketing Director" className="h-12 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white rounded-xl focus-visible:ring-blue-500 focus-visible:border-blue-500" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="review" className="font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Your Review</Label>
              <Textarea id="review" value={review} onChange={(e) => setReview(e.target.value)} required placeholder="What was your experience like?" className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white rounded-xl focus-visible:ring-blue-500 focus-visible:border-blue-500 min-h-[100px] resize-none" />
            </div>
            <div className="grid gap-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Rating</Label>
              <div className="flex gap-2">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} onClick={() => setRating(i + 1)} className={cn("h-8 w-8 cursor-pointer transition-all hover:scale-110", i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-700")} />
                 ))}
              </div>
            </div>
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl mt-4 shadow-lg shadow-blue-600/20 transition-all">
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Submit Review
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ProjectGalleryDetailed({ images, title }: { images: string[], title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
          {images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "relative h-24 w-36 shrink-0 rounded-xl overflow-hidden border-2 transition-all snap-start",
                currentIndex === idx ? "border-blue-600 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image src={img} alt={`Preview ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PortfolioDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [project, setProject] = useState<Project | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  const fetchProjectData = useCallback(async () => {
    if (!id || typeof id !== "string") return;
    
    try {
      const [projectRes, reviewsRes] = await Promise.all([
        supabase.from("projects").select("*").eq("id", id).single(),
        supabase.from("project_reviews").select("*").eq("project_id", id).order("created_at", { ascending: false })
      ]);
      
      if (projectRes.error) throw projectRes.error;

      setProject(projectRes.data);
      if (reviewsRes.data) {
        setReviews(reviewsRes.data);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  }, [id, supabase]);

  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617] transition-colors">
         <Loader2 className="h-10 w-10 animate-spin text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#020617] transition-colors">
         <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Project Not Found</h1>
         <Link href="/#live-projects">
            <Button className="bg-blue-600">Return to Projects</Button>
         </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] font-sans transition-colors">
      
      {/* Navigation Bar */}
      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-16 py-8">
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </button>
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-16 pb-24">
        
        {/* Project Header */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-16">
          <div className="w-full lg:w-1/2 pt-4">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {(project.tech_stack || []).map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider border-0">
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="prose prose-slate dark:prose-invert prose-lg max-w-none text-slate-600 dark:text-slate-300 font-medium mb-10 whitespace-pre-wrap">
              {project.description}
            </div>

            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 h-14 rounded-2xl font-bold shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-1"
              >
                Launch Live Project
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
          
          <div className="w-full lg:w-1/2">
             <ProjectGalleryDetailed images={project.images || []} title={project.title} />
          </div>
        </div>

        {/* Client Reviews Section */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Client Feedback</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Read what our clients have to say about this project.</p>
            </div>
            <GiveReviewForm projectId={project.id} projectTitle={project.title} onReviewSubmit={fetchProjectData} />
          </div>

          {reviews.length === 0 ? (
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-12 text-center border border-slate-100 dark:border-slate-800">
               <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No reviews yet</h3>
               <p className="text-slate-500 dark:text-slate-400">Be the first to share your experience working with us on this project!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((rev, i) => (
                <motion.div
                  key={rev.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-8 shadow-xl shadow-slate-200/40 dark:shadow-none hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 h-14 w-14 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-xl overflow-hidden relative shadow-sm dark:shadow-none">
                        {rev.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={rev.image} className="h-full w-full object-cover" alt="Client" />
                        ) : (
                          rev.author[0]
                        )}
                      </div>
                      <div>
                        <StarRating rating={rev.rating} size="sm" />
                        <h4 className="text-slate-900 dark:text-white font-black text-lg leading-tight mb-0.5">{rev.author}</h4>
                        {rev.position && <span className="text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest">{rev.position}</span>}
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 italic font-medium leading-relaxed font-serif">&quot;{rev.content}&quot;</p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-end">
                    <Quote className="h-6 w-6 text-blue-100 dark:text-blue-900/50" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
