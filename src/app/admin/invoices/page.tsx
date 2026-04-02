"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, MoreHorizontal, Download, Trash2, Edit, CheckCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Link from "next/link";
import { generatePDF } from "@/utils/pdfGenerator";
import { createClient } from "@/lib/supabase/client";
import { logActivity } from "@/lib/supabase/logging";

export default function InvoicesPage() {
  const supabase = createClient();
  const [search, setSearch] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [invoices, setInvoices] = useState<any[]>([]);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [availableQuotes, setAvailableQuotes] = useState<any[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [previewInvoice, setPreviewInvoice] = useState<any>(null);

  const fetchInvoices = async () => {
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        client:client_id (name, phone, email)
      `)
      .order('created_at', { ascending: false });
      
    if (data && !error) {
      const formatted = data.map(i => ({
        ...i,
        clientName: i.client?.name || 'Unknown Client',
        clientPhone: i.client?.phone || 'No phone provided',
        clientEmail: i.client?.email || 'No email provided'
      }));
      setInvoices(formatted);
    }
  };

  useEffect(() => {
    fetchInvoices();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  const handleOpenImport = async () => {
    setImportDialogOpen(true);
    const { data } = await supabase
      .from('quotations')
      .select(`*, client:client_id (name)`)
      .order('created_at', { ascending: false });
    
    if (data) {
      setAvailableQuotes(data.map(q => ({
        ...q,
        clientName: q.client?.name || 'Unknown Client'
      })));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const importQuotation = async (quote: any) => {
    setIsImporting(true);
    try {
      const { count } = await supabase.from('invoices').select('*', { count: 'exact', head: true });
      const nextId = (count || 0) + 1;
      const invNumber = `INV-${nextId.toString().padStart(4, '0')}`;
      
      const due = new Date();
      due.setDate(due.getDate() + 15);

      const { error } = await supabase.from('invoices').insert([{
        client_id: quote.client_id,
        number: invNumber,
        title: quote.title,
        date: new Date().toLocaleDateString('en-GB'),
        due: "",
        subtotal: quote.subtotal,
        tax: quote.tax,
        total: quote.total,
        items: quote.items,
        status: 'Unpaid'
      }]);

      if (!error) {
        setImportDialogOpen(false);
        fetchInvoices();
      } else {
        console.error("Import failed:", error);
      }
    } finally {
      setIsImporting(false);
    }
  };

  const filtered = invoices.filter(i => 
    i.number.toLowerCase().includes(search.toLowerCase()) || 
    i.clientName.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = async (invoice: typeof invoices[0]) => {
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

    const logoBase64 = await urlToBase64('/logo-new.png');
    const signaturesBase64 = await Promise.all([
      urlToBase64('/sign-kishor.png'),
      urlToBase64('/sign-saalim.png'),
      urlToBase64('/sign-ikhlas.png'),
    ]);

    generatePDF({
      type: "Invoice",
      number: invoice.number,
      title: invoice.title,
      issueDate: invoice.date,
      dueDate: invoice.due,
      client: {
        name: invoice.clientName,
        company: invoice.clientName,
        email: invoice.clientEmail,
        phone: invoice.clientPhone,
        address: ""
      },
      items: invoice.items || [],
      subtotal: invoice.subtotal || invoice.total,
      tax: invoice.tax || 0,
      grandTotal: invoice.total,
      logo: logoBase64,
      signatures: signaturesBase64.filter((s): s is string => s !== undefined)
    });
  };

  const toggleStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('invoices').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: newStatus } : inv));
    }
  };

  const handleDelete = async (id: string) => {
    const inv = invoices.find(i => i.id === id);
    const { error } = await supabase.from('invoices').delete().eq('id', id);
    if (!error) {
      logActivity({
        action_type: 'Deleted',
        target_type: 'Invoice',
        target_name: inv?.title || inv?.number || 'Invoice'
      });
      setInvoices(invoices.filter(inv => inv.id !== id));
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">Comprehensive billing management and history.</p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="flex-1 sm:flex-none border-primary/20 hover:bg-primary/5 text-primary font-bold"
            onClick={() => setImportDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Import from Quotation
          </Button>
          <Link href="/admin/invoices/create" className="flex-1 sm:flex-none">
            <Button className="w-full glow-primary">
              <Plus className="mr-2 h-4 w-4" /> New Invoice
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search invoices..." 
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
              <TableHead>Invoice Number</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((invoice) => (
              <TableRow key={invoice.id} className="border-border hover:bg-secondary/50 cursor-pointer">
                <TableCell className="font-medium text-primary" onClick={() => setPreviewInvoice(invoice)}>{invoice.number}</TableCell>
                <TableCell onClick={() => setPreviewInvoice(invoice)}>{invoice.clientName}</TableCell>
                <TableCell onClick={() => setPreviewInvoice(invoice)}>{invoice.date}</TableCell>
                <TableCell className="text-right font-medium" onClick={() => setPreviewInvoice(invoice)}>₹{invoice.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No invoices found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl">Import Quotation to Invoice</DialogTitle>
            <DialogDescription>
              Select a previously generated quotation to instantly convert it into a final invoice.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {availableQuotes.length === 0 ? (
              <p className="text-muted-foreground py-4 text-center">No quotations available to import.</p>
            ) : (
              availableQuotes.map((quote) => (
                <div key={quote.id} className="flex justify-between items-center p-4 border border-border rounded-xl hover:border-primary/50 transition-colors bg-secondary/20">
                  <div>
                    <h4 className="font-bold text-slate-900">{quote.number}: {quote.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">Client: {quote.clientName} • Total: ₹{quote.total.toFixed(2)}</p>
                  </div>
                  <Button 
                    onClick={() => importQuotation(quote)} 
                    disabled={isImporting}
                    className="shrink-0 glow-primary"
                  >
                    Convert
                  </Button>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!previewInvoice} onOpenChange={(open) => !open && setPreviewInvoice(null)}>
        <DialogContent className="sm:max-w-[600px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Invoice Preview
            </DialogTitle>
            <DialogDescription>
              {previewInvoice?.number}
            </DialogDescription>
          </DialogHeader>
          
          {previewInvoice && (
            <div className="space-y-6 mt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">To:</h4>
                  <p className="font-semibold text-lg">{previewInvoice.clientName}</p>
                </div>
                <div className="text-right">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Dates:</h4>
                  <p className="font-medium">Issued: {previewInvoice.date}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Project:</h4>
                <p className="font-medium text-lg text-primary">{previewInvoice.title}</p>
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
                    {previewInvoice.items && Array.isArray(previewInvoice.items) ? (
                      previewInvoice.items.map((item: {service: string, quantity: number, unitPrice: number}, idx: number) => (
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
                    <span>₹{(previewInvoice.subtotal || previewInvoice.total).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                    <span>Total:</span>
                    <span className="text-primary">₹{previewInvoice.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-border mt-6">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto text-destructive border-transparent hover:bg-destructive/10 hover:text-destructive order-2 sm:order-1" 
                  onClick={() => {
                    handleDelete(previewInvoice.id);
                    setPreviewInvoice(null);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete Invoice
                </Button>
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-end gap-2 w-full sm:w-auto order-1 sm:order-2">
                  <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => setPreviewInvoice(null)}>Close</Button>
                  <Link href={`/admin/invoices/create?edit=${previewInvoice.id}`} className="flex-1 sm:flex-none">
                    <Button variant="outline" className="w-full border-border hover:bg-secondary hover:text-primary">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </Link>
                  <Button className="flex-1 sm:flex-none glow-primary" onClick={() => handleDownload(previewInvoice)}>
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
