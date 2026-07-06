"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, CheckCircle2, User, Mail, CalendarClock, AlertCircle } from "lucide-react";

interface StaffRequest {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  is_approved: boolean;
  created_at: string;
}

export default function StaffRequestsPage() {
  const supabase = createClient();
  const [requests, setRequests] = useState<StaffRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('staff_profiles')
        .select('*')
        .eq('is_approved', false)
        .order('created_at', { ascending: false });
      
      if (data && !error) {
        setRequests(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    const { error } = await supabase
        .from('staff_profiles')
        .update({ is_approved: true })
        .eq('id', id);

    if (!error) {
        setRequests(prev => prev.filter(req => req.id !== id));
    }
    setActionLoading(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white/50 backdrop-blur-md p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] border border-white/40 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 flex items-center gap-3">
            Staff Access Requests
            <UserPlus className="h-8 w-8 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-1 font-medium italic">Review and approve terminal access for new personnel.</p>
        </div>
        <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 px-4 py-1.5 font-black uppercase tracking-widest text-xs rounded-full">
            {requests.length} Pending
        </Badge>
      </div>

      <Card className="border-white/40 bg-white shadow-2xl rounded-[3rem] overflow-hidden">
        <CardHeader className="bg-slate-50/50 p-6 sm:p-10 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                    <AlertCircle className="h-5 w-5" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Pending Approvals</CardTitle>
            </div>
            <CardDescription className="font-semibold text-slate-400 italic text-sm sm:text-base">Accounts awaiting administrative clearance.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-50">
            {loading ? (
              <div className="p-10 text-center text-slate-400 font-black uppercase tracking-widest animate-pulse">Loading Requests...</div>
            ) : requests.length === 0 ? (
              <div className="p-20 text-center flex flex-col items-center gap-4">
                 <CheckCircle2 className="h-16 w-16 text-emerald-500/50" />
                 <div>
                     <p className="text-slate-400 font-black tracking-widest uppercase text-sm mb-1">Queue Empty</p>
                     <p className="text-slate-500 font-medium">All staff requests have been processed.</p>
                 </div>
              </div>
            ) : (
              requests.map((req) => (
                <div key={req.id} className="p-6 sm:p-8 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                        <User className="h-6 w-6 text-slate-500" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">{req.full_name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                                <Mail className="h-4 w-4" />
                                {req.email}
                            </span>
                            <span className="hidden sm:block text-slate-300">•</span>
                            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
                                <CalendarClock className="h-4 w-4" />
                                {formatDate(req.created_at)}
                            </span>
                        </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-auto">
                    <Button 
                        onClick={() => handleApprove(req.id)}
                        disabled={actionLoading === req.id}
                        className="w-full md:w-auto px-8 h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
                    >
                        {actionLoading === req.id ? (
                            "Approving..."
                        ) : (
                            <>
                                <CheckCircle2 className="h-4 w-4" />
                                Approve Access
                            </>
                        )}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
