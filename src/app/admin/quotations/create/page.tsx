"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { logActivity } from "@/lib/supabase/logging";

function QuotationForm() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  
  const [items, setItems] = useState([{ id: 1, service: "", quantity: 1, unitPrice: 0 }]);
  const [title, setTitle] = useState("");
  const [clientId, setClientId] = useState("");
  const [nextQuoteNumber, setNextQuoteNumber] = useState("QT-0001");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [clientsList, setClientsList] = useState<any[]>([]);

  useEffect(() => {
    // Fetch real clients from DB for the dropdown
    const fetchClientsForDropdown = async () => {
      const { data } = await supabase.from('clients').select('id, name').order('name');
      if (data) setClientsList(data);
    };
    fetchClientsForDropdown();

    // Fetch next sequential quote number if not editing
    if (!editId) {
      const fetchNextNumber = async () => {
        const { count } = await supabase
          .from('quotations')
          .select('*', { count: 'exact', head: true });
        
        const nextId = (count || 0) + 1;
        setNextQuoteNumber(`QT-${nextId.toString().padStart(4, '0')}`);
      };
      fetchNextNumber();
    }
  }, [supabase, editId]);
  
  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), service: "", quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: string, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  useEffect(() => {
    if (editId) {
      const fetchExistingQuote = async () => {
        const { data, error } = await supabase.from('quotations').select('*').eq('id', editId).single();
        if (data && !error) {
          setTitle(data.title);
          setClientId(data.client_id);
          setNextQuoteNumber(data.number);
          
          // The items column in Supabase is JSONB, so it comes back directly as an array of objects
          if (data.items && Array.isArray(data.items) && data.items.length > 0) {
            setItems(data.items);
          }
        }
      };
      fetchExistingQuote();
    }
  }, [editId, supabase]);

  // Helper to prevent the form from submitting when pressing enter in an input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  };

  const subtotal = calculateSubtotal();
  const grandTotal = subtotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId || items.length === 0) return;

    if (editId) {
      // Update existing record
      const { error } = await supabase.from('quotations').update({
        client_id: clientId,
        title: title || "Quotation",
        subtotal: subtotal,
        tax: 0,
        total: grandTotal,
        items: items
      }).eq('id', editId);

      if (!error) {
        logActivity({ 
          action_type: 'Edited', 
          target_type: 'Quotation', 
          target_name: title || nextQuoteNumber,
          details: `Quote #: ${nextQuoteNumber}, Total: ₹${grandTotal}`
        });
        router.push("/admin/quotations");
      } else {
        console.error("Failed to update quote:", error);
      }
    } else {
      // Insert new record
      const { error } = await supabase.from('quotations').insert([{
        client_id: clientId,
        number: nextQuoteNumber,
        title: title || "Quotation",
        date: new Date().toLocaleDateString('en-GB'),
        subtotal: subtotal,
        tax: 0,
        total: grandTotal,
        items: items
      }]);

      if (!error) {
        logActivity({ 
          action_type: 'Created', 
          target_type: 'Quotation', 
          target_name: title || nextQuoteNumber,
          details: `Quote #: ${nextQuoteNumber}, Total: ₹${grandTotal}`
        });
        router.push("/admin/quotations");
      } else {
        console.error("Failed to save quote:", error);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/quotations">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{editId ? 'Edit Quotation' : 'Create Quotation'}</h1>
          <p className="text-muted-foreground mt-1">{editId ? 'Modify an existing proposal.' : 'Generate a new proposal for a client.'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">Client Details</h3>
              <div className="space-y-2">
                <Label>Select Client</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  required
                >
                  <option value="">-- Choose a client --</option>
                  {clientsList.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Project Title</Label>
                <Input 
                  placeholder="E.g., Website Redesign" 
                  className="bg-background border-border" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold mb-4 border-b border-border pb-2">Document Details</h3>
              <div className="space-y-2">
                <Label>Quotation Number</Label>
                <Input value={nextQuoteNumber} disabled className="bg-background/50 border-border text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Auto-generated</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label>Issue Date</Label>
                  <Input type="date" required className="bg-background border-border" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h3 className="text-lg font-semibold">Line Items</h3>
              <Button type="button" variant="outline" size="sm" onClick={handleAddItem} className="border-primary/50 text-primary hover:bg-primary/10">
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </div>
            
            <div className="p-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row gap-4 items-start bg-secondary/20 p-4 rounded-lg border border-border/50">
                  <div className="flex-1 space-y-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Service Name</Label>
                        <Input 
                          placeholder="E.g., Frontend Development" 
                          value={item.service}
                          onChange={(e) => updateItem(item.id, 'service', e.target.value)}
                          onKeyDown={handleKeyDown}
                          required 
                          className="bg-background border-border" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Quantity / Hours</Label>
                          <Input 
                            type="number" 
                            min="1" 
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                            onKeyDown={handleKeyDown}
                            required 
                            className="bg-background border-border" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Unit Price (₹)</Label>
                          <Input 
                            type="number" 
                            min="0" 
                            step="0.01"
                            value={item.unitPrice || ''}
                            onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            onKeyDown={handleKeyDown}
                            required 
                            className="bg-background border-border" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-4 shrink-0 min-w-[120px]">
                    <div className="text-right">
                      <Label className="text-xs text-muted-foreground block mb-2">Line Total</Label>
                      <span className="font-semibold text-lg">₹{(item.quantity * item.unitPrice).toFixed(2)}</span>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} className="text-destructive hover:bg-destructive/10 hover:text-destructive mt-auto">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 bg-secondary/30 border-t border-border flex justify-end rounded-b-xl">
              <div className="w-full max-w-sm space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-border pt-3 mt-3">
                  <span>Grand Total</span>
                  <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/quotations">
            <Button type="button" variant="outline" className="border-border">Cancel</Button>
          </Link>
          <Button type="submit" className="glow-primary px-8">Save Quotation</Button>
        </div>
      </form>
    </div>
  );
}

export default function CreateQuotationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuotationForm />
    </Suspense>
  );
}
