"use client";

import { useState, useEffect } from "react";
import { Plus, X, Upload, Loader2, MessageSquare, Star, Trash2 } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

interface Project {
  id?: string;
  title: string;
  description: string;
  link: string;
  tech_stack: string[];
  images: string[];
}

interface Review {
  id: string;
  author: string;
  content: string;
  rating: number;
  created_at: string;
}

interface ProjectDialogProps {
  project?: Project;
  onSuccess: () => void;
  trigger?: React.ReactElement;
}

export function ProjectDialog({ project, onSuccess, trigger }: ProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(project?.title || "");
  const [link, setLink] = useState(project?.link || "");
  const [description, setDescription] = useState(project?.description || "");
  const [techInput, setTechInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>(project?.tech_stack || []);
  const [images, setImages] = useState<string[]>(project?.images || []);
  const [projectReviews, setProjectReviews] = useState<Review[]>([]);
  const supabase = createClient();

  const fetchReviews = async () => {
    if (!project?.id) return;
    try {
      const { data, error } = await supabase
        .from("project_reviews")
        .select("*")
        .eq("project_id", project.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setProjectReviews(data || []);
    } catch (error) {
      console.error("Error fetching project reviews:", error);
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const { error } = await supabase.from("project_reviews").delete().eq("id", id);
      if (error) throw error;
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review.");
    }
  };

  // Reset form and fetch reviews when project changes
  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setLink(project.link);
      setDescription(project.description);
      setTechStack(project.tech_stack);
      setImages(project.images);
      fetchReviews();
    }
  }, [project, open]);

  const addTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setLoading(true);
    const newImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        const promise = new Promise<string>((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
        });

        const base64 = await promise;
        newImages.push(base64);
    }

    setImages([...images, ...newImages]);
    setLoading(false);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const projectData = {
        title,
        description,
        link,
        tech_stack: techStack,
        images,
      };

      if (project?.id) {
        // Update
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", project.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from("projects")
          .insert([projectData]);
        if (error) throw error;
      }

      setOpen(false);
      onSuccess();
      // Clear form if new project
      if (!project) {
        setTitle(""); setLink(""); setDescription(""); setTechStack([]); setImages([]);
      }
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        render={
          trigger || (
            <Button className="font-bold">
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
          )
        } 
      />
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add New Project"}</DialogTitle>
          <DialogDescription>
            Manage the details for the live project showcase on the homepage.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="GMARS Tech Solution" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Project Link (URL)</Label>
              <Input id="link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://gmars.co.in/" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detailed project overview..." className="min-h-[150px]" required />
          </div>

          <div className="space-y-4">
            <Label>Tech Stack</Label>
            <div className="flex gap-2 mb-2">
              <Input 
                value={techInput} 
                onChange={(e) => setTechInput(e.target.value)} 
                placeholder="e.g. Next.js"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
              />
              <Button type="button" variant="secondary" onClick={addTech}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="pl-3 pr-2 py-1 gap-2">
                  {tech}
                  <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeTech(tech)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Project Images (Gallery)</Label>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-video rounded-md overflow-hidden bg-muted group">
                  <img src={img} alt={`Project ${index}`} className="object-cover w-full h-full" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon-xs"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Label 
                htmlFor="image-upload" 
                className="flex flex-col items-center justify-center aspect-video rounded-md border-2 border-dashed border-border hover:border-primary/50 cursor-pointer hover:bg-primary/5 transition-all"
              >
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                    <Upload className="h-5 w-5" />
                    <span className="text-[10px] font-bold uppercase">Upload</span>
                </div>
                <input type="file" id="image-upload" className="hidden" multiple accept="image/*" onChange={handleImageUpload} />
              </Label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={loading} className="px-8 font-black uppercase tracking-widest text-[10px] h-12 rounded-xl">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {project ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>

        {/* Reviews Management Section */}
        {project?.id && (
          <div className="mt-12 pt-12 border-t border-border/50 space-y-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-xl font-black tracking-tight text-slate-900">Project Testimonials</h3>
                    <p className="text-sm text-slate-500 font-medium italic">Manage authentic feedback submitted by visitors for this project.</p>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary font-black border-0 px-4 py-1.5 rounded-full">
                    {projectReviews.length} Reviews
                </Badge>
            </div>

            <div className="space-y-4">
                {projectReviews.length === 0 ? (
                    <div className="p-10 border-2 border-dashed border-slate-100 rounded-[1.5rem] flex flex-col items-center justify-center text-center gap-3">
                        <MessageSquare className="h-8 w-8 text-slate-200" />
                        <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">No feedback received for this project yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {projectReviews.map((review) => (
                            <div key={review.id} className="p-6 bg-slate-50/50 rounded-2xl border border-border/30 hover:shadow-md transition-all group/rev">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className={cn("h-4 w-4", i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-100")} 
                                            />
                                        ))}
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => deleteReview(review.id)}
                                        className="h-8 w-8 rounded-lg text-slate-400 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover/rev:opacity-100 transition-all shadow-sm"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-slate-700 font-medium leading-relaxed italic mb-4">&quot;{review.content}&quot;</p>
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-md bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                                        {review.author.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-black text-xs text-slate-900">{review.author}</span>
                                    <span className="text-slate-300 mx-2">•</span>
                                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{new Date(review.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
