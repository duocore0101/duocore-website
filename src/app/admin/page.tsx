"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Users, 
  FileText, 
  FileSpreadsheet, 
  Wallet, 
  LayoutDashboard, 
  Activity, 
  History,
  TrendingUp,
  Briefcase
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface ActivityLog {
  id: string;
  admin_name: string;
  action_type: string;
  target_type: string;
  target_name: string;
  details: string;
  created_at: string;
}

export default function AdminOverviewPage() {
  const supabase = createClient();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const quickLinks = [
    { label: "Overview", icon: LayoutDashboard, href: "/admin", color: "bg-slate-500", desc: "View system heart" },
    { label: "Tally", icon: Wallet, href: "/admin/tally", color: "bg-blue-500", desc: "Manage P&L" },
    { label: "Clients", icon: Users, href: "/admin/clients", color: "bg-emerald-500", desc: "User Directory" },
    { label: "Live Projects", icon: Briefcase, href: "/admin/projects", color: "bg-amber-500", desc: "Work in progress" },
    { label: "Quotations", icon: FileText, href: "/admin/quotations", color: "bg-indigo-500", desc: "Proposed deals" },
    { label: "Invoices", icon: FileSpreadsheet, href: "/admin/invoices", color: "bg-rose-500", desc: "Billing activity" },
  ];

  const fetchActivities = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('admin_activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (data && !error) {
        setActivities(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchActivities();
    
    // Subscribe to real-time updates for activities
    const channel = supabase
      .channel('activities_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'admin_activities' }, (payload) => {
        setActivities(prev => [payload.new as ActivityLog, ...prev].slice(0, 20));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, fetchActivities]);

  const getTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="bg-white/50 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] border border-white/40 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 flex items-center gap-3">
            Admin Central Hub
            <TrendingUp className="h-8 w-8 text-emerald-500" />
          </h1>
          <p className="text-muted-foreground mt-1 font-medium italic">Command center for Duocore Softwares LLP.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickLinks.map((link) => (
          <Link key={link.label} href={link.href}>
            <Card className="border-white/40 bg-white/60 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-[2rem] h-full group overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform", link.color)}>
                  <link.icon className="h-6 w-6" />
                </div>
                <h3 className="font-black text-slate-900 text-sm tracking-tight">{link.label}</h3>
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">{link.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="border-white/40 bg-white shadow-2xl rounded-[3rem] overflow-hidden">
        <CardHeader className="bg-slate-50/50 p-6 sm:p-10 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <History className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Recent Command Activity</CardTitle>
            </div>
            <CardDescription className="font-semibold text-slate-400 italic text-sm sm:text-base">Live tracking of all administrative operations across the platform.</CardDescription>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full border border-emerald-500/20 shadow-sm shrink-0">
               <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest leading-none">Live Feed</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-50">
            {loading ? (
              <div className="p-10 text-center text-slate-400 font-black uppercase tracking-widest animate-pulse">Loading Logs...</div>
            ) : activities.length === 0 ? (
              <div className="p-20 text-center flex flex-col items-center gap-4">
                 <Activity className="h-12 w-12 text-slate-100" />
                 <p className="text-slate-300 font-black tracking-widest uppercase text-sm">No recent activity detected in the system.</p>
              </div>
            ) : (
              activities.map((act) => (
                <div key={act.id} className="p-4 sm:p-8 hover:bg-slate-50/30 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6 w-full">
                    <div className={cn("h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl shrink-0 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform", 
                      act.action_type === 'Deleted' ? 'bg-rose-500' : 
                      act.action_type === 'Edited' ? 'bg-amber-500' : 'bg-emerald-500')}>
                      <History className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div className="overflow-hidden">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            <span className="font-black text-slate-900 border-b-2 border-primary/20 pb-0.5 text-xs sm:text-base truncate max-w-[120px] sm:max-w-none">{act.admin_name}</span>
                            <span className={cn("text-[8px] sm:text-xs font-black px-1.5 sm:px-2 py-0.5 rounded-md uppercase tracking-widest",
                                act.action_type === 'Deleted' ? 'text-rose-600 bg-rose-50' : 
                                act.action_type === 'Edited' ? 'text-amber-600 bg-amber-50' : 'text-emerald-600 bg-emerald-50'
                            )}>
                                {act.action_type}
                            </span>
                        </div>
                        <p className="text-slate-600 font-bold mt-1 sm:mt-2 text-[10px] sm:text-sm flex items-center flex-wrap gap-1">
                            the <span className="text-primary underline decoration-primary/30 underline-offset-4">{act.target_type}</span> {act.target_name}
                        </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto border-t sm:border-t-0 border-slate-100 pt-2 sm:pt-0 pl-14 sm:pl-0">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block">{getTimeAgo(act.created_at)}</span>
                    <span className="text-[8px] sm:text-[10px] font-black text-slate-200 uppercase tracking-[0.2em]">{new Date(act.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center mt-10">
          <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-2">
              <span className="h-1 w-12 bg-slate-100" />
              Secure End-To-End Administration
              <span className="h-1 w-12 bg-slate-100" />
          </p>
      </div>
    </div>
  );
}
