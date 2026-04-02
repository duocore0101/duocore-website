"use client";

import { useState } from "react";
import { Star, Loader2, MessageSquarePlus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface ReviewDialogProps {
  projectId: string;
  projectTitle: string;
}

export function ReviewDialog({ projectId, projectTitle }: ReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("project_reviews").insert({
        project_id: projectId,
        author,
        content,
        rating,
      });

      if (error) throw error;
      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
        setAuthor("");
        setContent("");
        setRating(5);
      }, 2000);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-primary transition-colors group">
            <MessageSquarePlus className="h-4 w-4 transition-transform group-hover:scale-110" />
            Review This Project
          </button>
        }
      />
      <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] bg-white border-0 shadow-2xl p-10">
        {success ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900">Review Submitted!</h3>
                <p className="text-slate-500 font-medium">Thank you for your valuable feedback, {author.split(' ')[0]}.</p>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                    <Star className="h-5 w-5 text-primary fill-primary" />
                </div>
                <DialogTitle className="text-3xl font-black tracking-tight">Project Feedback</DialogTitle>
              </div>
              <DialogDescription className="text-slate-500 font-medium text-lg leading-snug">
                Share your experience working on <span className="text-primary font-bold">{projectTitle}</span>.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Rate Your Experience</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-all hover:scale-110 active:scale-90"
                    >
                      <Star
                        className={cn(
                          "h-8 w-8 transition-all",
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-slate-100 text-slate-200"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Your Full Name</label>
                    <Input
                        required
                        placeholder="e.g. John Doe"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="h-14 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 transition-all font-bold"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Your Feedback</label>
                    <Textarea
                        required
                        placeholder="Tell us what you liked most about the final delivery..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[120px] rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 transition-all font-medium py-4"
                    />
                </div>
              </div>

              <div className="pt-4">
                <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black text-lg transition-all shadow-xl shadow-primary/20"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sharing Experience...
                        </>
                    ) : "Post Authentic Review"}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
