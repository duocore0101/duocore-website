"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Download, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Link from "next/link";
import { generatePDF } from "@/utils/pdfGenerator";
import { createClient } from "@/lib/supabase/client";
import { logActivity } from "@/lib/supabase/logging";

export default function QuotationsPage() {
  const supabase = createClient();
  const [search, setSearch] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [previewQuote, setPreviewQuote] = useState<any>(null);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [quotations, setQuotations] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuotations = async () => {
      // Query quotations and join with clients table to get client name
      const { data, error } = await supabase
        .from('quotations')
        .select(`
          *,
          client:client_id (name, phone, email)
        `)
        .order('created_at', { ascending: false });
        
      if (data && !error) {
        // Flatten the data so quote.client is just the string name for the UI
        const formatted = data.map(q => ({
          ...q,
          client: q.client?.name || 'Unknown Client',
          clientPhone: q.client?.phone || 'No phone provided',
          clientEmail: q.client?.email || 'No email provided'
        }));
        setQuotations(formatted);
      }
    };
    fetchQuotations();
  }, [supabase]);

  const filtered = quotations.filter(q => q.number.toLowerCase().includes(search.toLowerCase()) || q.client.toLowerCase().includes(search.toLowerCase()) || q.title.toLowerCase().includes(search.toLowerCase()));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeleteQuote = async (id: string, e: any) => {
    e.stopPropagation();
    const quoteToDelete = quotations.find(q => q.id === id);
    const { error } = await supabase.from('quotations').delete().eq('id', id);
    if (!error) {
      logActivity({
        action_type: 'Deleted',
        target_type: 'Quotation',
        target_name: quoteToDelete?.title || quoteToDelete?.number || 'Quotation'
      });
      setQuotations(quotations.filter(q => q.id !== id));
      if (previewQuote?.id === id) setPreviewQuote(null);
    }
  };

  const handleDownload = async (quote: typeof quotations[0], e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Helper to convert public URLs to base64 for jsPDF
    const urlToBase64 = async (url: string): Promise<string | undefined> => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      } catch (e) {
        console.error(`Failed to load ${url}:`, e);
        return undefined;
      }
    };

    // Load assets from public folder
    const logoBase64 = await urlToBase64('/logo-new.png');
    const signaturesBase64 = await Promise.all([
      urlToBase64('/sign-kishor.png'),
      urlToBase64('/sign-saalim.png'),
      urlToBase64('/sign-ikhlas.png'),
    ]);

    generatePDF({
      type: "Quotation",
      number: quote.number,
      issueDate: quote.date,
      client: {
        name: quote.client,
        company: quote.client,
        email: quote.clientEmail,
        phone: quote.clientPhone,
        address: "123 Client St."
      },
      items: quote.items || [],
      subtotal: quote.total,
      tax: 0,
      grandTotal: quote.total,
      logo: logoBase64,
      signatures: signaturesBase64.filter((s): s is string => s !== undefined),
      title: quote.title
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotations</h1>
          <p className="text-muted-foreground mt-1">Create and manage client estimates and proposals.</p>
        </div>
        
        <Link href="/admin/quotations/create">
          <Button className="glow-primary">
            <Plus className="mr-2 h-4 w-4" /> New Quotation
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search quotations..." 
            className="pl-9 bg-card border-border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border border-border bg-card overflow-x-auto">
        <Table className="min-w-[800px] md:min-w-full">
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Quote Number</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Project Title</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((quote) => (
              <TableRow 
                key={quote.id} 
                className="border-border hover:bg-secondary/50 cursor-pointer"
              >
                <TableCell className="font-medium text-primary" onClick={() => setPreviewQuote(quote)}>{quote.number}</TableCell>
                <TableCell onClick={() => setPreviewQuote(quote)}>{quote.client}</TableCell>
                <TableCell onClick={() => setPreviewQuote(quote)}>{quote.title}</TableCell>
                <TableCell onClick={() => setPreviewQuote(quote)}>{quote.date}</TableCell>
                <TableCell className="text-right font-medium" onClick={() => setPreviewQuote(quote)}>₹{quote.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No quotations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!previewQuote} onOpenChange={(open) => !open && setPreviewQuote(null)}>
        <DialogContent className="sm:max-w-[600px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl">Quotation Preview</DialogTitle>
            <DialogDescription>
              {previewQuote?.number}
            </DialogDescription>
          </DialogHeader>
          
          {previewQuote && (
            <div className="space-y-6 mt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">To:</h4>
                  <p className="font-semibold text-lg">{previewQuote.client}</p>
                </div>
                <div className="text-right">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Issue Date:</h4>
                  <p className="font-medium">{previewQuote.date}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Project:</h4>
                <p className="font-medium text-lg text-primary">{previewQuote.title}</p>
              </div>

              <div className="border border-border rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-secondary/30">
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewQuote.items && Array.isArray(previewQuote.items) ? (
                      previewQuote.items.map((item: {service: string, quantity: number, unitPrice: number}, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <span className="font-medium text-foreground">{item.service}</span>
                            <div className="text-sm text-muted-foreground mt-1">
                              {item.quantity} x ₹{item.unitPrice.toFixed(2)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">₹{(item.quantity * item.unitPrice).toFixed(2)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center py-4 text-muted-foreground">No items documented.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end pt-4 border-t border-border">
                <div className="w-48 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>₹{previewQuote.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                    <span>Total:</span>
                    <span className="text-primary">₹{previewQuote.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-border mt-6">
                <Button variant="outline" className="w-full sm:w-auto text-destructive border-transparent hover:bg-destructive/10 hover:text-destructive order-2 sm:order-1" onClick={(e) => handleDeleteQuote(previewQuote.id, e)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete Quotation
                </Button>
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-end gap-2 w-full sm:w-auto order-1 sm:order-2">
                  <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => setPreviewQuote(null)}>Close</Button>
                  <Link href={`/admin/quotations/create?edit=${previewQuote.id}`} className="flex-1 sm:flex-none">
                    <Button variant="outline" className="w-full border-border hover:bg-secondary hover:text-primary">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </Link>
                  <Button className="flex-1 sm:flex-none glow-primary" onClick={() => handleDownload(previewQuote)}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
