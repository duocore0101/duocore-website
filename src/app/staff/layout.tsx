"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/staff/login" || pathname === "/staff/register") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    // Clear the staff cookies
    document.cookie = "staff_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "staff_id=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "staff_name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    
    router.push("/staff/login");
    router.refresh();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="h-16 border-b border-border bg-card/50 flex items-center justify-between px-6 backdrop-blur-md sticky top-0 z-50">
        <Link href="/staff" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="Duocore Softwares Logo" 
            width={150} 
            height={40} 
            className="object-contain h-7 w-auto dark:invert-0 dark:brightness-100"
          />
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80 rounded-lg transition-colors border border-border shadow-sm"
          >
            <LogOut className="h-3 w-3" />
            Sign Out
          </button>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-8 relative text-foreground overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] -z-10" />
        {children}
      </main>
    </div>
  );
}
