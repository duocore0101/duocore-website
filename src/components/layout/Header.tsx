"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X, ArrowUpRight, Lock, Moon, Sun } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "ABOUT", href: "/about" },
  { name: "SERVICES", href: "/#services" },
  { name: "PORTFOLIO", href: "/#live-projects" },
  { name: "TECHNOLOGIES", href: "/#technologies" },
  { name: "BLOG", href: "/blog" },
]

function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 h-10 w-10">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 h-10 w-10 transition-all"
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-amber-500" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
          "bg-white/90 dark:bg-[#020617]/80 backdrop-blur-md py-4 border-b border-slate-200 dark:border-slate-800/50 shadow-sm dark:shadow-none"
        )}
      >
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group relative z-[110]">
            <Image
              src="/logo.png"
              alt="Duocore Softwares Logo"
              width={200}
              height={50}
              className="object-contain h-10 w-auto transition-transform group-hover:scale-105 dark:hidden"
            />
            <Image
              src="/logo-white-text.png"
              alt="Duocore Softwares Logo"
              width={200}
              height={70}
              className="object-contain h-[64px] w-auto -my-3 transition-transform group-hover:scale-105 hidden dark:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[13px] font-semibold transition-all tracking-wider relative group",
                  link.name === "HOME" ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[2px] transition-all",
                  link.name === "HOME" ? "w-full bg-blue-500" : "w-0 bg-blue-500 group-hover:w-full"
                )} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <a href="https://wa.me/917028350089?text=Hi%20Duocore%20Team%2C%20I%E2%80%99m%20interested%20in%20building%20a%20project.%20Can%20you%20help%20me%20with%20the%20details%3F" target="_blank" rel="noopener noreferrer" className="hidden xl:block">
              <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-6 shadow-lg shadow-blue-600/20 flex items-center gap-2">
                Contact Us <ArrowUpRight className="h-4 w-4" />
              </Button>
            </a>
            <Link href="/admin/login" className="hidden lg:block">
              <Button variant="outline" className="border-slate-200 dark:border-slate-800 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold rounded-xl px-5 flex items-center gap-2 transition-all">
                Admin Login <Lock className="h-3 w-3" />
              </Button>
            </Link>
            <Link href="/staff/login" className="hidden md:block">
              <Button variant="outline" className="border-slate-200 dark:border-slate-800 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold rounded-xl px-5 flex items-center gap-2 transition-all">
                Staff Login <Lock className="h-3 w-3" />
              </Button>
            </Link>

            <ThemeToggle />

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="md:hidden group flex items-center gap-3 px-4 sm:px-5 py-2.5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl border border-white/40 dark:border-slate-800 shadow-sm rounded-2xl active:scale-95 transition-all">
                <span className="text-[10px] font-black tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase group-hover:text-primary transition-colors hidden sm:block">Menu</span>
                <div className="flex flex-col gap-1 items-end">
                  <div className="w-5 h-[1.5px] bg-slate-900 dark:bg-slate-300 rounded-full group-hover:bg-primary transition-all group-hover:w-6" />
                  <div className="w-6 h-[1.5px] bg-slate-900 dark:bg-slate-300 rounded-full group-hover:bg-primary transition-all" />
                  <div className="w-4 h-[1.5px] bg-slate-900 dark:bg-slate-300 rounded-full group-hover:bg-primary transition-all group-hover:w-6" />
                </div>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                showCloseButton={false}
                className="w-full sm:w-[400px] bg-white/90 dark:bg-slate-950/90 backdrop-blur-3xl border-l border-slate-100 dark:border-slate-800 p-0 overflow-hidden shadow-2xl"
              >
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                  className="flex flex-col h-full relative"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 translate-x-1/3 -translate-y-1/3" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -z-10 -translate-x-1/3 translate-y-1/3" />

                  <div className="flex items-center justify-end px-6 py-6 border-b border-slate-100/50 dark:border-slate-800/50 shrink-0">
                    <Button 
                      variant="ghost" 
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center gap-2 px-4 py-2 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all"
                    >
                      <span className="text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 uppercase">Close</span>
                      <X className="h-4 w-4 text-slate-900 dark:text-slate-300 group-hover:rotate-90 transition-transform duration-300" />
                    </Button>
                  </div>

                  <div className="flex flex-col flex-1 overflow-y-auto pt-8 pb-10 px-8">
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
                              className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary transition-all flex items-center group py-1.5"
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
                            <Button variant="outline" className="w-full h-14 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 font-bold text-sm rounded-2xl transition-all">
                              Admin Login
                            </Button>
                          </Link>
                          <Link href="/staff/login" onClick={() => setIsOpen(false)}>
                            <Button variant="outline" className="w-full h-14 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 font-bold text-sm rounded-2xl transition-all">
                              Staff Login
                            </Button>
                          </Link>
                        </motion.div>

                        <motion.div 
                          className="flex flex-col gap-3 pt-6 border-t border-slate-100/50 dark:border-slate-800/50"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7, duration: 0.5 }}
                        >
                          <p className="text-[10px] uppercase tracking-widest font-black text-slate-400">Reach Out</p>
                          <a href="mailto:info@duocoresoftware.com" className="text-xl font-black text-slate-900 dark:text-white hover:text-primary transition-colors tracking-tight">info@duocoresoftware.com</a>
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
