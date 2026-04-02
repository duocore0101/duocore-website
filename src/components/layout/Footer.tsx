import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Linkedin, Twitter, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02] -z-10" />
      
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <Link href="/" className="mb-8 inline-block group">
              <Image
                src="/logo.png"
                alt="Duocore Softwares Logo"
                width={180}
                height={40}
                className="object-contain h-10 w-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-slate-500 text-lg mb-10 max-w-md font-medium leading-relaxed">
              Architecting the next generation of enterprise software with intelligence, precision, and a commitment to extreme quality.
            </p>
            <div className="flex gap-6">
               {[Linkedin, Twitter, Github].map((Icon, i) => (
                 <a key={i} href="#" className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 hover:border-primary/20 transition-all">
                   <Icon className="h-5 w-5" />
                 </a>
               ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-xl text-slate-900 mb-8">Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Services", href: "/#services" },
                { name: "Portfolio", href: "/#live-projects" },
                { name: "Contact", href: "https://wa.me/919890882900?text=Hi%20Duocore%20Team%2C%20I%E2%80%99m%20interested%20in%20building%20a%20project.%20Can%20you%20help%20me%20with%20the%20details%3F", external: true }
              ].map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary font-bold transition-colors">
                      {item.name}
                    </a>
                  ) : (
                    <Link href={item.href} className="text-slate-500 hover:text-primary font-bold transition-colors">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-black text-xl text-slate-900 mb-8">Connect</h4>
            <ul className="space-y-6">
               <li className="flex items-start gap-4 group">
                 <div className="mt-1 h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                   <Mail className="h-4 w-4" />
                 </div>
                 <div>
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Email Us</p>
                   <a href="mailto:duocore0101@gmail.com" className="text-slate-700 font-bold hover:text-primary transition-colors">duocore0101@gmail.com</a>
                 </div>
               </li>
               <li className="flex items-start gap-4 group">
                 <div className="mt-1 h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                   <Phone className="h-4 w-4" />
                 </div>
                 <div>
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Call Us</p>
                   <a href="tel:+919890882900" className="text-slate-700 font-bold hover:text-primary transition-colors">+91 98908 82900</a>
                 </div>
               </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-24 pt-12 border-t border-slate-100/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 font-bold text-sm">
            © {new Date().getFullYear()} Duocore Softwares. All rights reserved.
          </p>
          <div className="flex gap-10">
            <Link href="/privacy" className="text-sm font-bold text-slate-400 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm font-bold text-slate-400 hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
