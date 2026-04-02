import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, Globe, Rocket, ShieldCheck, Database, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Testimonials } from "@/components/landing/testimonials";

export const metadata = {
  title: "Services | Duocore Softwares",
  description: "Our comprehensive software development services.",
};

export default function ServicesPage() {
  const allServices = [
    {
      title: "Custom Software Development",
      description: "Tailored software solutions designed perfectly to fit your enterprise needs and automate workflows. We build internal tools, CRMs, and ERP systems.",
      icon: <Cpu className="h-8 w-8 text-primary" />,
      features: ["Workflow Automation", "Legacy Migration", "Enterprise Architecture"]
    },
    {
      title: "Web Applications",
      description: "High-performance, scalable, and beautifully designed web platforms using Next.js & React. We focus on conversion, speed, and SEO.",
      icon: <Globe className="h-8 w-8 text-primary" />,
      features: ["SaaS Platforms", "E-commerce Frontends", "Progressive Web Apps"]
    },
    {
      title: "Mobile App Development",
      description: "Cross-platform iOS and Android applications built with React Native. Delivering native-like performance and beautiful UI.",
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      features: ["iOS & Android Apps", "UI/UX Design", "App Store Optimization"]
    },
    {
      title: "AI & Machine Learning",
      description: "Integrate intelligent features like predictive analytics and LLM automation into your existing systems to give you a competitive edge.",
      icon: <Rocket className="h-8 w-8 text-primary" />,
      features: ["LLM Integration", "Predictive Analytics", "Computer Vision"]
    },
    {
      title: "Database Architecture",
      description: "Design and optimization of complex relational and NoSQL databases. We handle data migrations, indexing, and scalable infrastructure.",
      icon: <Database className="h-8 w-8 text-primary" />,
      features: ["PostgreSQL/MySQL", "Data Warehousing", "Performance Tuning"]
    },
    {
      title: "Cybersecurity & Cloud",
      description: "Robust cloud architecture on AWS/Vercel and security audits to ensure your data and users remain protected against modern threats.",
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      features: ["Penetration Testing", "Cloud Infrastructure", "Compliance (SOC2/GDPR)"]
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-background py-20 border-b border-border relative overflow-hidden">
         <div className="absolute inset-0 bg-primary/5 -z-10" />
         <div className="container px-4 md:px-6 relative z-10 text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Our Capabilities</h1>
            <p className="text-xl text-muted-foreground mb-8">
              We provide end-to-end technology solutions. From conceptualization to deployment, our team of expert architects delivers unparalleled excellence.
            </p>
            <a href="https://wa.me/919890882900?text=Hi%20Duocore%20Team%2C%20I%E2%80%99m%20interested%20in%20building%20a%20project.%20Can%20you%20help%20me%20with%20the%20details%3F" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-12 px-8 glow-primary">Start a Project</Button>
            </a>
         </div>
      </div>

      <div className="container px-4 md:px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300 group">
              <CardHeader>
                <div className="mb-4 bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-primary">
                  {service.icon}
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground mb-6">
                  {service.description}
                </CardDescription>
                <ul className="space-y-2">
                  {service.features.map(feature => (
                    <li key={feature} className="flex items-center text-sm font-medium text-foreground">
                       <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                       {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Testimonials />
    </div>
  );
}
