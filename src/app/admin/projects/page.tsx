"use client";

import { useEffect, useState } from "react";
import { Edit2, Trash2, ExternalLink, Package, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ProjectDialog } from "./project-dialog";
import { createClient } from "@/lib/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  tech_stack: string[];
  images: string[];
  created_at: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Live Projects</h1>
          <p className="text-slate-500 font-medium mt-2">Manage the portfolio projects shown on your homepage.</p>
        </div>
        <ProjectDialog onSuccess={fetchProjects} />
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden rounded-[1.5rem]">
        <CardHeader className="bg-slate-50/50 border-b border-border/50 pb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>Catalog of Innovations</CardTitle>
          </div>
          <CardDescription>
            A total of {projects.length} project(s) are currently in your database.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center p-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary opacity-20" />
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-center gap-4">
              <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center">
                <Package className="h-8 w-8 text-slate-200" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-900">No projects yet</p>
                <p className="text-sm text-slate-500">Get started by creating your first project entry.</p>
              </div>
              <ProjectDialog onSuccess={fetchProjects} />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="w-[300px] pl-8">Project Details</TableHead>
                  <TableHead>Tech Stack</TableHead>
                  <TableHead>Launch Link</TableHead>
                  <TableHead className="text-right pr-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id} className="group hover:bg-slate-50/30 border-border/50">
                    <TableCell className="pl-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-24 rounded-xl overflow-hidden bg-muted flex-shrink-0 border border-border/50 group-hover:border-primary/20 transition-colors shadow-sm">
                          {project.images?.[0] ? (
                            <img src={project.images[0]} className="h-full w-full object-cover" alt={project.title} />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-slate-100 italic text-[10px] text-slate-400">No Image</div>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-black text-slate-900 text-lg leading-none tracking-tight">{project.title}</span>
                          <span className="text-xs text-slate-400 font-medium">Added on {new Date(project.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5 max-w-[300px]">
                        {project.tech_stack.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-slate-100 text-slate-600 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 border-0">
                            {tech}
                          </Badge>
                        ))}
                        {project.tech_stack.length > 3 && (
                          <span className="text-[10px] font-bold text-slate-400">+{project.tech_stack.length - 3}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-black text-primary hover:underline hover:scale-105 transition-all">
                        {new URL(project.link).hostname}
                        <ExternalLink className="h-3 w-4 opacity-40" strokeWidth={3} />
                      </a>
                    </TableCell>
                    <TableCell className="text-right pr-8">
                      <div className="flex justify-end gap-2">
                        <ProjectDialog project={project} onSuccess={fetchProjects} trigger={
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-md transition-all text-slate-500 hover:text-primary">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        } />
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-destructive/5 hover:text-destructive transition-all text-slate-400">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="rounded-[2rem]">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-2xl font-black">Hold on!</AlertDialogTitle>
                              <AlertDialogDescription className="font-medium text-slate-500">
                                This will permanently delete <span className="font-bold text-slate-900">{project.title}</span> from the database. This action cannot be reversed.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="rounded-xl border-slate-100">Keep it</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteProject(project.id)} className="bg-destructive hover:bg-destructive/90 text-white font-bold rounded-xl">
                                Delete Permanently
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
