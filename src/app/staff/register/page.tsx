"use client";

import { useState } from "react";
import Image from "next/image";
import { createBrowserClient } from "@supabase/ssr";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowLeft, User, Lock as LockIcon, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export default function StaffRegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);


  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder"
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. Sign up the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // 2. Insert into staff_profiles to flag as pending approval
    if (authData.user) {
        const { error: dbError } = await supabase
            .from("staff_profiles")
            .insert({
                user_id: authData.user.id,
                full_name: fullName,
                email: email,
                is_approved: false
            });

        if (dbError) {
            console.error("Error creating profile:", dbError);
            // We ignore db error in UI for now, but in production we'd want to handle cleanup or retry
        }
    }

    setSuccess(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden p-4">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] -z-10" />
      
      <div className="w-full max-w-md relative z-10 my-10">
        <div className="absolute -top-12 left-0 right-0 flex justify-center">
             <Link href="/staff/login" className="group flex items-center gap-2 text-slate-500 hover:text-white transition-all text-xs font-black uppercase tracking-[0.3em]">
                <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                Back to Login
             </Link>
        </div>

        <div className="text-center mb-6 flex flex-col items-center">
          <Image 
            src="/logo.png" 
            alt="Duocore Softwares Logo" 
            width={200} 
            height={50} 
            className="object-contain h-10 w-auto mb-6 brightness-0 invert"
            priority
          />
          <h2 className="text-slate-100 text-2xl font-black tracking-tighter">Registration Gateway</h2>
          <p className="text-slate-500 mt-1 text-sm font-bold italic tracking-wide">Duocore Softwares LLP. Staff Onboarding</p>
        </div>

        <Card className="bg-white/[0.03] border-white/10 backdrop-blur-3xl shadow-2xl rounded-[2.5rem] overflow-hidden border-2">
          {success ? (
             <div className="p-10 flex flex-col items-center text-center">
                 <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                     <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                 </div>
                 <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Request Submitted!</h3>
                 <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                     Your registration has been securely logged. An administrator must review and approve your account before you can access the system.
                 </p>
                 <Link href="/staff/login" className="w-full">
                    <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black rounded-2xl shadow-ultimate transition-all">
                        Return to Login
                    </Button>
                 </Link>
             </div>
          ) : (
             <>
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-xl font-bold text-white tracking-tight">Request Access</CardTitle>
                  <CardDescription className="text-slate-400 font-medium">Register for a new secure staff terminal account.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <form onSubmit={handleRegister} className="space-y-5">
                    {error && (
                      <Alert variant="destructive" className="bg-rose-500/10 text-rose-500 border-none rounded-2xl">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="font-bold">{error}</AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Full Name</Label>
                      <div className="relative">
                          <User className="absolute left-4 top-4 h-4 w-4 text-slate-500" />
                          <Input 
                          id="fullName" 
                          type="text" 
                          placeholder="John Doe" 
                          required 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="h-12 bg-white/[0.02] border-white/10 text-white pl-12 rounded-2xl focus:border-primary/50 transition-all font-bold placeholder:text-slate-600"
                          />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email Terminal</Label>
                      <div className="relative">
                          <User className="absolute left-4 top-4 h-4 w-4 text-slate-500" />
                          <Input 
                          id="email" 
                          type="email" 
                          placeholder="staff@duocoresoftwares.com" 
                          required 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 bg-white/[0.02] border-white/10 text-white pl-12 rounded-2xl focus:border-primary/50 transition-all font-bold placeholder:text-slate-600"
                          />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Key Phrase (Password)</Label>
                      <div className="relative">
                          <LockIcon className="absolute left-4 top-4 h-4 w-4 text-slate-500" />
                          <Input 
                          id="password" 
                          type="password"
                          placeholder="Secure password..."
                          required 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-12 bg-white/[0.02] border-white/10 text-white pl-12 rounded-2xl focus:border-primary/50 transition-all font-bold placeholder:text-slate-600"
                          />
                      </div>
                    </div>
      
                    <div className="pt-2">
                      <Button type="submit" className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl shadow-ultimate transition-all hover:scale-[1.02]" disabled={loading}>
                        {loading ? "Encrypting Data..." : "Submit Request"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
             </>
          )}
        </Card>
        
        <p className="text-center mt-8 text-[10px] font-black text-slate-700 uppercase tracking-[0.5em]">
            © 2026 Duocore Softwares Secure System
        </p>
      </div>
    </div>
  );
}
