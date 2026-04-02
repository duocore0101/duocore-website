"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, Users, FileText, FileSpreadsheet, LogOut, Wallet } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import * as React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  // Hide layout for login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/admin" },
    { label: "Tally", icon: Wallet, href: "/admin/tally" },
    { label: "Clients", icon: Users, href: "/admin/clients" },
    { label: "Live Projects", icon: LayoutDashboard, href: "/admin/projects" },
    { label: "Quotations", icon: FileText, href: "/admin/quotations" },
    { label: "Invoices", icon: FileSpreadsheet, href: "/admin/invoices" },
  ];

  const handleLogout = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
    );
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Image 
            src="/logo.png" 
            alt="Duocore Softwares Logo" 
            width={240} 
            height={64} 
            className="object-contain h-14 w-auto"
            priority
          />
        </div>
        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 md:hidden">
          <Image 
            src="/logo.png" 
            alt="Duocore Softwares Logo" 
            width={200} 
            height={56} 
            className="object-contain h-12 w-auto"
          />
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger className="group flex items-center gap-3 px-4 py-2 bg-secondary/50 border border-border shadow-sm rounded-xl active:scale-95 transition-all">
              <span className="text-[9px] font-black tracking-widest text-muted-foreground uppercase">Menu</span>
              <div className="flex flex-col gap-1 items-end">
                <div className="w-4 h-[1px] bg-foreground rounded-full group-hover:bg-primary transition-all" />
                <div className="w-5 h-[1px] bg-foreground rounded-full group-hover:bg-primary transition-all" />
              </div>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] sm:w-64 bg-card p-0 border-r border-border">
              <div className="flex flex-col h-full">
                <div className="h-16 flex items-center px-6 border-b border-border">
                  <Image 
                    src="/logo.png" 
                    alt="Duocore Softwares Logo" 
                    width={200} 
                    height={56} 
                    className="object-contain h-12 w-auto"
                  />
                </div>
                <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                        }`}
                      >
                        <item.icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
                <div className="p-4 border-t border-border">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
          {children}
        </main>
      </div>
    </div>
  );
}
