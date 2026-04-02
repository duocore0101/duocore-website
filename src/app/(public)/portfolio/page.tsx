import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Portfolio | Duocore Softwares",
  description: "Browse our latest projects and case studies.",
};

export default function PortfolioPage() {
  const allProjects = [
    {
      title: "Fintech Dashboard Pro",
      description: "A comprehensive financial analytics dashboard built for a leading investment firm.",
      longDescription: "Engineered to handle high-frequency data updates with real-time WebSockets, providing institutional traders with actionable insights.",
      techStack: ["Next.js", "Tailwind", "Recharts", "Supabase", "WebSockets"],
      image: "bg-gradient-to-tr from-blue-600 to-sky-400",
    },
    {
      title: "AI CRM System",
      description: "Intelligent customer relationship management with predictive lead scoring.",
      longDescription: "Automates email outreach using custom LLMs and manages pipelines with drag-and-drop interfaces.",
      techStack: ["React", "Python", "FastAPI", "PostgreSQL", "OpenAI"],
      image: "bg-gradient-to-tr from-indigo-600 to-purple-400",
    },
    {
      title: "E-commerce Enterprise",
      description: "Scalable global headless e-commerce store with real-time inventory.",
      longDescription: "Achieved sub-100ms loading times globally leveraging Next.js Edge capabilities and advanced caching strategies.",
      techStack: ["Next.js", "Stripe", "Prisma", "Redis", "Vercel"],
      image: "bg-gradient-to-tr from-emerald-600 to-teal-400",
    },
    {
      title: "HealthTech Patient Portal",
      description: "Secure, HIPAA-compliant patient communication and document management platform.",
      longDescription: "Streamlined telehealth appointments and secure messaging with end-to-end encryption.",
      techStack: ["React Native", "Node.js", "AWS", "Socket.io"],
      image: "bg-gradient-to-tr from-rose-600 to-orange-400",
    },
    {
      title: "Supply Chain Tracker",
      description: "Blockchain-based supply chain ledger for transparent logistics tracking.",
      longDescription: "Integrated with IoT devices across the globe for real-time asset monitoring and immutable audit logs.",
      techStack: ["Solidity", "Next.js", "GraphQL", "AWS IoT"],
      image: "bg-gradient-to-tr from-slate-600 to-stone-400",
    },
    {
      title: "Automated HR Onboarding",
      description: "Internal SaaS tool for automating employee onboarding and document verification.",
      longDescription: "Reduced manual HR tasks by 80% through automated OCR scanning and smart contract-based approvals.",
      techStack: ["Vue.js", "Django", "Tesseract OCR", "Celery"],
      image: "bg-gradient-to-tr from-cyan-600 to-blue-400",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-secondary/10 py-20 border-b border-border">
         <div className="container px-4 md:px-6 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Our Work</h1>
            <p className="text-xl text-muted-foreground">
              A curated selection of our finest architectural implementations and software engineering achievements.
            </p>
         </div>
      </div>

      <div className="container px-4 md:px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {allProjects.map((project, index) => (
            <Card key={index} className="bg-card border-border overflow-hidden h-full flex flex-col group hover:glow-primary transition-all duration-300">
              <div className={`h-64 w-full ${project.image} flex items-center justify-center relative overflow-hidden`}>
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                 <div className="text-white/20 font-black tracking-tighter text-5xl md:text-7xl rotate-[15deg] scale-150 pointer-events-none">
                   DUOCORE
                 </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">{project.title}</CardTitle>
                    <CardDescription className="text-base text-foreground font-medium">
                      {project.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary rounded-full">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary rounded-full">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {project.longDescription}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techStack.map(tech => (
                    <Badge key={tech} variant="outline" className="border-border text-muted-foreground bg-background">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
