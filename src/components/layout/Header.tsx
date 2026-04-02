"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X, ArrowUpRight } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/#live-projects" },
]

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
          "glass-nav-premium py-4 border-b border-white/10 shadow-sm"
        )}
      >
        <div className="container px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group relative z-[110]">
            <Image
              src="/logo.png"
              alt="Duocore Softwares Logo"
              width={180}
              height={45}
              className="object-contain h-8 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-black text-slate-600 hover:text-primary transition-all tracking-widest uppercase relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="https://wa.me/917028350089?text=Hi%20Duocore%20Team%2C%20I%E2%80%99m%20interested%20in%20building%20a%20project.%20Can%20you%20help%20me%20with%20the%20details%3F" target="_blank" rel="noopener noreferrer" className="hidden md:block">
              <Button className="bg-primary hover:bg-primary/90 text-white font-black rounded-xl px-8 shadow-lg shadow-primary/20">
                Contact Us
              </Button>
            </a>
            <Link href="/admin/login" className="hidden md:block">
              <Button variant="outline" className="border-slate-200 text-slate-700 font-bold rounded-xl px-6">
                Admin Login
              </Button>
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="md:hidden group flex items-center gap-3 px-5 py-2.5 bg-white/70 backdrop-blur-xl border border-white/40 shadow-ultimate rounded-2xl active:scale-95 transition-all">
                <span className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase group-hover:text-primary transition-colors">Menu</span>
                <div className="flex flex-col gap-1 items-end">
                  <div className="w-5 h-[1.5px] bg-slate-900 rounded-full group-hover:bg-primary transition-all group-hover:w-6" />
                  <div className="w-6 h-[1.5px] bg-slate-900 rounded-full group-hover:bg-primary transition-all" />
                  <div className="w-4 h-[1.5px] bg-slate-900 rounded-full group-hover:bg-primary transition-all group-hover:w-6" />
                </div>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                showCloseButton={false}
                className="w-full sm:w-[400px] bg-white/90 backdrop-blur-3xl border-l border-white/50 p-0 overflow-hidden shadow-2xl"
              >
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                  className="flex flex-col h-full relative"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 translate-x-1/3 -translate-y-1/3" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -z-10 -translate-x-1/3 translate-y-1/3" />

                  <div className="flex items-center justify-end px-6 py-6 border-b border-slate-100/50">
                    <Button 
                      variant="ghost" 
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-2 px-4 py-2 bg-slate-50/50 hover:bg-slate-100 rounded-xl transition-all"
                    >
                      <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Close</span>
                      <X className="h-4 w-4 text-slate-900 group-hover:rotate-90 transition-transform duration-300" />
                    </Button>
                  </div>

                  <div className="flex flex-col h-full pt-10 pb-10 px-8">
                    <div className="space-y-1 mb-10">
                      <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary mb-6 block opacity-60">Navigation</span>
                      <nav className="flex flex-col gap-3">
                        {navLinks.map((link, i) => (
                          <motion.div
                            key={link.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <Link
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className="text-2xl sm:text-3xl font-black text-slate-900 hover:text-primary transition-all flex items-center group py-1.5"
                            >
                              {link.name}
                              <ArrowUpRight className="ml-4 h-5 w-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary/50" />
                            </Link>
                          </motion.div>
                        ))}
                      </nav>
                    </div>

                    <div className="mt-10 space-y-6">
                        <motion.div 
                          className="grid grid-cols-1 gap-3"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <a href="https://wa.me/917028350089?text=Hi%20Duocore%20Team%2C%20I%E2%80%99m%20interested%20in%20building%20a%20project.%20Can%20you%20help%20me%20with%20the%20details%3F" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                            <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black text-sm rounded-2xl shadow-xl shadow-primary/20 transition-all">
                              Contact Us
                            </Button>
                          </a>
                          <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                            <Button variant="outline" className="w-full h-14 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm rounded-2xl transition-all">
                              Admin Login
                            </Button>
                          </Link>
                        </motion.div>

                        <motion.div 
                          className="flex flex-col gap-3 pt-6 border-t border-slate-100/50"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7, duration: 0.5 }}
                        >
                          <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Reach Out</p>
                          <a href="mailto:duocore0101@gmail.com" className="text-xl font-black text-slate-900 hover:text-primary transition-colors tracking-tight">duocore0101@gmail.com</a>
                        </motion.div>
                    </div>
                  </div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}
