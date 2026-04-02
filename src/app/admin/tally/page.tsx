"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Trash2, Edit, TrendingUp, TrendingDown, Users, Wallet, Clock, AlertCircle, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { logActivity } from "@/lib/supabase/logging";
import { cn } from "@/lib/utils";

interface TallyCredit {
  id: string;
  project_name: string;
  amount: number;
  date: string;
  created_at: string;
}

interface TallyExpense {
  id: string;
  description: string;
  amount: number;
  date: string;
  created_at: string;
}

interface TallyPending {
  id: string;
  client_name: string;
  amount: number;
  due_date: string;
  created_at: string;
}

export default function TallyPage() {
  const supabase = createClient();
  const [credits, setCredits] = useState<TallyCredit[]>([]);
  const [expenses, setExpenses] = useState<TallyExpense[]>([]);
  const [pending, setPending] = useState<TallyPending[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'credit' | 'expense' | 'pending'>('credit');
  const [editItem, setEditItem] = useState<TallyCredit | TallyExpense | TallyPending | null>(null);
  const [formData, setFormData] = useState({ name: '', amount: '', date: new Date().toISOString().split('T')[0] });

  // Distribution calculations
  const totalCredits = credits.reduce((acc, c) => acc + Number(c.amount), 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + Number(e.amount), 0);
  const totalPending = pending.reduce((acc, p) => acc + Number(p.amount), 0);
  const netProfit = totalCredits - totalExpenses;

  const partners = [
    { name: "Kishor Shelar", holding: 25, color: "bg-blue-500" },
    { name: "Saalim Khan", holding: 37.5, color: "bg-emerald-500" },
    { name: "Aasim Khan", holding: 37.5, color: "bg-amber-500" }
  ];

  const fetchTally = useCallback(async () => {
    const { data: cData } = await supabase.from('tally_credits').select('*').order('created_at', { ascending: false });
    const { data: eData } = await supabase.from('tally_expenses').select('*').order('created_at', { ascending: false });
    const { data: pData } = await supabase.from('tally_pending').select('*').order('created_at', { ascending: false });
    if (cData) setCredits(cData);
    if (eData) setExpenses(eData);
    if (pData) setPending(pData);
  }, [supabase]);

  useEffect(() => {
    fetchTally();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  const handleOpenDialog = (type: 'credit' | 'expense' | 'pending', item: TallyCredit | TallyExpense | TallyPending | null = null) => {
    setDialogType(type);
    setEditItem(item);
    if (item) {
      setFormData({ 
        name: type === 'credit' ? (item as TallyCredit).project_name : type === 'expense' ? (item as TallyExpense).description : (item as TallyPending).client_name, 
        amount: item.amount.toString(), 
        date: type === 'pending' ? (item as TallyPending).due_date : (item as TallyCredit | TallyExpense).date 
      });
    } else {
      setFormData({ name: '', amount: '', date: new Date().toISOString().split('T')[0] });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<TallyCredit & TallyExpense & TallyPending> = { amount: Number(formData.amount) };
    const tableName = dialogType === 'credit' ? 'tally_credits' : dialogType === 'expense' ? 'tally_expenses' : 'tally_pending';
    const targetType = dialogType === 'credit' ? 'Credit' : dialogType === 'expense' ? 'Expense' : 'Pending Payment';
    
    if (dialogType === 'credit') {
        payload.project_name = formData.name;
        payload.date = formData.date;
    } else if (dialogType === 'expense') {
        payload.description = formData.name;
        payload.date = formData.date;
    } else {
        payload.client_name = formData.name;
        payload.due_date = formData.date;
    }

    if (editItem) {
      const { error } = await supabase.from(tableName).update(payload).eq('id', editItem.id);
      if (!error) {
        logActivity({ action_type: 'Edited', target_type: targetType, target_name: formData.name, details: `Amount: ₹${formData.amount}` });
        fetchTally();
      }
    } else {
      const { error } = await supabase.from(tableName).insert([payload]);
      if (!error) {
        logActivity({ action_type: 'Created', target_type: targetType, target_name: formData.name, details: `Amount: ₹${formData.amount}` });
        fetchTally();
      }
    }
    setIsDialogOpen(false);
  };

  const handleDelete = async (type: 'credit' | 'expense' | 'pending', id: string) => {
    const tableName = type === 'credit' ? 'tally_credits' : type === 'expense' ? 'tally_expenses' : 'tally_pending';
    const targetType = type === 'credit' ? 'Credit' : type === 'expense' ? 'Expense' : 'Pending Payment';
    
    // Find item first to get name for log
    const list = type === 'credit' ? credits : type === 'expense' ? expenses : pending;
    const item = list.find(i => i.id === id);
    const targetName = type === 'credit' ? (item as TallyCredit)?.project_name : type === 'expense' ? (item as TallyExpense)?.description : (item as TallyPending)?.client_name;

    const { error } = await supabase.from(tableName).delete().eq('id', id);
    if (!error) {
      logActivity({ action_type: 'Deleted', target_type: targetType, target_name: targetName || 'Item', details: `ID: ${id}` });
      fetchTally();
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white/50 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-white/40 shadow-sm">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">Profit & Loss Tally</h1>
          <p className="text-muted-foreground mt-1 font-medium">Manage project credits, operational expenses, and partner distribution.</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <Button onClick={() => handleOpenDialog('credit')} className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-white font-black rounded-2xl px-6 h-12 shadow-ultimate transition-all hover:scale-[1.02]">
            <Plus className="mr-2 h-4 w-4" /> Add Credit
          </Button>
          <Button onClick={() => handleOpenDialog('expense')} variant="outline" className="flex-1 sm:flex-none border-slate-200 text-slate-700 font-bold rounded-2xl px-6 h-12 hover:bg-slate-50 transition-all hover:scale-[1.02]">
            <Plus className="mr-2 h-4 w-4" /> Add Expense
          </Button>
          <Button onClick={() => handleOpenDialog('pending')} variant="outline" className="flex-1 sm:flex-none border-amber-200 text-amber-700 font-bold rounded-2xl px-6 h-12 hover:bg-amber-50 transition-all hover:scale-[1.02]">
            <Clock className="mr-2 h-4 w-4" /> Add Pending
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Credits Card */}
        <Card className="lg:col-span-1 border-white/40 bg-white/60 backdrop-blur-xl shadow-xl rounded-[2.5rem] overflow-hidden group hover:shadow-primary/5 transition-all duration-500">
          <CardHeader className="border-b border-slate-100 bg-white/40 p-8">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-black text-slate-900">Project Credits</CardTitle>
                <CardDescription className="font-medium">All incoming project payments</CardDescription>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp className="h-7 w-7" />
              </div>
            </div>
            <div className="mt-6">
              <span className="text-4xl font-black text-primary">₹{totalCredits.toLocaleString()}</span>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">Total Received Funds</p>
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-[500px] overflow-y-auto">
            <div className="p-2">
              {credits.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-6 hover:bg-white rounded-3xl transition-all group/item">
                  <div>
                    <h4 className="font-bold text-slate-800 leading-tight">{c.project_name}</h4>
                    <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">{c.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-black text-emerald-500">₹{c.amount.toLocaleString()}</span>
                    <div className="flex gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog('credit', c)} className="h-8 w-8 text-slate-400 hover:text-primary">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete('credit', c.id)} className="h-8 w-8 text-slate-400 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expenses Card */}
        <Card className="lg:col-span-1 border-white/40 bg-white/60 backdrop-blur-xl shadow-xl rounded-[2.5rem] overflow-hidden group hover:shadow-red-500/5 transition-all duration-500">
          <CardHeader className="border-b border-slate-100 bg-white/40 p-8">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-black text-slate-900">Operational Expenses</CardTitle>
                <CardDescription className="font-medium">Total outgoing costs</CardDescription>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-destructive/10 flex items-center justify-center text-destructive">
                <TrendingDown className="h-7 w-7" />
              </div>
            </div>
            <div className="mt-6">
              <span className="text-4xl font-black text-destructive">₹{totalExpenses.toLocaleString()}</span>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">Total Monthly Spend</p>
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-[500px] overflow-y-auto">
            <div className="p-2">
              {expenses.map((e) => (
                <div key={e.id} className="flex items-center justify-between p-6 hover:bg-white rounded-3xl transition-all group/item">
                  <div>
                    <h4 className="font-bold text-slate-800 leading-tight">{e.description}</h4>
                    <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-wider">{e.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-black text-destructive">₹{e.amount.toLocaleString()}</span>
                    <div className="flex gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog('expense', e)} className="h-8 w-8 text-slate-400 hover:text-primary">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete('expense', e.id)} className="h-8 w-8 text-slate-400 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Distributed Profit Card */}
        <Card className="lg:col-span-1 border-primary/10 bg-primary/[0.02] backdrop-blur-xl shadow-2xl rounded-[2.5rem] overflow-hidden border-2 shadow-primary/5">
          <CardHeader className="p-8 pb-4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <CardTitle className="text-2xl font-black text-slate-900">Partner Breakdown</CardTitle>
                <CardDescription className="font-bold text-primary italic">Shared Success Tracking</CardDescription>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Users className="h-7 w-7" />
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-[2rem] border border-primary/5 shadow-sm">
                <span className={cn("text-5xl font-black tracking-tighter", netProfit >= 0 ? "text-emerald-600" : "text-destructive")}>
                  ₹{netProfit.toLocaleString()}
                </span>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-3">Current Combined Surplus</p>
                
                <div className="mt-8 flex gap-1 h-3 rounded-full overflow-hidden bg-slate-100">
                    {partners.map((p) => (
                        <div key={p.name} className={cn(p.color)} style={{ width: `${p.holding}%` }} />
                    ))}
                </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-4">
            <div className="space-y-4 mt-6">
              {partners.map((p) => {
                  const incomeShare = totalCredits * (p.holding / 100);
                  const expenseShare = totalExpenses * (p.holding / 100);
                  const handAmount = netProfit * (p.holding / 100);

                  return (
                    <div key={p.name} className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={cn("h-4 w-4 rounded-full", p.color)} />
                        <div>
                          <h4 className="font-black text-slate-900 text-base leading-none">{p.name}</h4>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-[0.2em]">{p.holding}% Ownership</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-500 bg-slate-50/50 p-2 rounded-xl">
                            <span className="uppercase tracking-widest text-[8px]">Income Share</span>
                            <span className="text-emerald-500 font-black">₹{incomeShare.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold text-slate-500 bg-slate-50/50 p-2 rounded-xl">
                            <span className="uppercase tracking-widest text-[8px]">Expense Distrib.</span>
                            <span className="text-red-500 font-black">₹{expenseShare.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-black text-slate-900 pt-2 border-t border-dashed border-slate-200">
                            <span className="uppercase tracking-widest text-[10px] text-primary">In Hand Net</span>
                            <span className="text-primary font-black">₹{handAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )
              })}
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-white border-2 border-dashed border-primary/10">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-primary" />
                  <span className="text-sm font-bold text-slate-600 uppercase tracking-widest">In Hand Surplus</span>
                </div>
                <span className="text-2xl font-black text-primary tracking-tighter">₹{netProfit.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Payments Card */}
      <Card className="border-amber-100 bg-amber-50/20 shadow-xl rounded-[2.5rem] overflow-hidden border-2">
            <CardHeader className="p-6 sm:p-8 border-b border-amber-100/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                        <AlertCircle className="h-5 w-5 sm:h-6 sm:h-6 text-amber-500" />
                        <CardTitle className="text-2xl sm:text-3xl font-black text-slate-900">Pending Receivables</CardTitle>
                    </div>
                    <CardDescription className="text-amber-700/70 font-semibold px-0 sm:px-9 text-xs sm:text-base italic">Manage payments expected but not yet received.</CardDescription>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto p-4 bg-white/40 rounded-2xl border border-amber-100 sm:border-none sm:bg-transparent sm:p-0">
                    <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-1">Unrealized Revenue</p>
                    <span className="text-3xl sm:text-4xl font-black text-amber-600">₹{totalPending.toLocaleString()}</span>
                </div>
            </CardHeader>
            <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pending.map((p) => (
                        <div key={p.id} className="bg-white border border-amber-100 p-6 rounded-[2rem] shadow-sm hover:shadow-lg hover:border-amber-200 transition-all relative group/p">
                             <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="text-xl font-bold text-slate-800">{p.client_name}</h4>
                                    <div className="flex items-center gap-2 text-amber-600 mt-1">
                                        <Calendar className="h-3 w-3" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Due: {p.due_date}</span>
                                    </div>
                                </div>
                                <span className="text-2xl font-black text-amber-600">₹{p.amount.toLocaleString()}</span>
                             </div>
                             <div className="flex gap-2 justify-end opacity-0 group-hover/p:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" onClick={() => handleOpenDialog('pending', p)} className="h-9 w-9 bg-amber-50 text-amber-600 hover:bg-amber-100">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDelete('pending', p.id)} className="h-9 w-9 bg-red-50 text-red-500 hover:bg-red-100">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                             </div>
                        </div>
                    ))}
                    {pending.length === 0 && (
                         <div className="lg:col-span-3 py-10 text-center bg-white/50 rounded-3xl border-2 border-dashed border-amber-100">
                             <p className="text-amber-700/50 font-black uppercase tracking-[0.3em]">No Pending Payments Scheduled</p>
                         </div>
                    )}
                </div>
            </CardContent>
      </Card>

      {/* Dialog for Add/Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-[2rem] bg-white border-white/50 backdrop-blur-2xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight">
              {editItem ? "Update Entry" : `New ${dialogType.charAt(0).toUpperCase() + dialogType.slice(1)}`}
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-medium">Record financial activity within the Tally ledger.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-6 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-slate-400">
                    {dialogType === 'credit' ? "Project Name" : dialogType === 'expense' ? "Expense Description" : "Client Name"}
                </Label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={dialogType === 'credit' ? "Project Title" : dialogType === 'expense' ? "Purchase details" : "Client / Company"}
                  className="rounded-xl h-14 bg-slate-50 border-slate-100 font-bold"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Amount (₹)</Label>
                  <Input 
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                    className="rounded-xl h-14 bg-slate-50 border-slate-100 font-bold"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Date</Label>
                  <Input 
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="rounded-xl h-14 bg-slate-50 border-slate-100 font-bold"
                    required
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="pt-6">
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl font-bold px-8 h-12">Cancel</Button>
              <Button type="submit" className="bg-primary text-white font-black rounded-xl px-10 h-12 shadow-lg shadow-primary/20">
                {editItem ? "Confirm Updates" : "Add to Ledger"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
