"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, FileEdit, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ClientsPage() {
  const supabase = createClient();
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: "", email: "", phone: "", address: "" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [previewClient, setPreviewClient] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editClient, setEditClient] = useState<any>(null);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false });
      if (data) setClients(data);
    };
    fetchClients();
  }, [supabase]);

  const filteredClients = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || (c.email && c.email.toLowerCase().includes(search.toLowerCase())));

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.name || !newClient.phone) return;

    const { data, error } = await supabase.from('clients').insert([{
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      address: newClient.address
    }]).select();

    if (data && !error) {
      setClients([data[0], ...clients]);
      setNewClient({ name: "", email: "", phone: "", address: "" });
      setIsDialogOpen(false);
    }
  };

  const handleEditClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editClient.name || !editClient.phone) return;

    const { data, error } = await supabase.from('clients').update({
      name: editClient.name,
      email: editClient.email,
      phone: editClient.phone,
      address: editClient.address
    }).eq('id', editClient.id).select();

    if (data && !error) {
      setClients(clients.map(c => c.id === editClient.id ? data[0] : c));
      setEditClient(null);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeleteClient = async (id: string, e: any) => {
    e.stopPropagation();
    const { error } = await supabase.from('clients').delete().eq('id', id);
    if (!error) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground mt-1">Manage your customer relationships and contact details.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger render={
            <Button className="glow-primary">
              <Plus className="mr-2 h-4 w-4" /> Add Client
            </Button>
          } />
          <DialogContent className="sm:max-w-[425px] bg-card border-border">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddClient} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="company">Client Name <span className="text-destructive">*</span></Label>
                <Input 
                  id="company" 
                  placeholder="John Doe / Acme Inc." 
                  required
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  className="bg-background border-border" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                <Input 
                  id="phone" 
                  placeholder="+1 (555) 000-0000" 
                  required
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  className="bg-background border-border" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address <span className="text-muted-foreground text-xs font-normal">(Optional)</span></Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="billing@acme.com" 
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  className="bg-background border-border" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address <span className="text-muted-foreground text-xs font-normal">(Optional)</span></Label>
                <Input 
                  id="address" 
                  placeholder="123 Business Rd, Suite 100" 
                  value={newClient.address}
                  onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                  className="bg-background border-border" 
                />
              </div>
              <Button type="submit" className="w-full mt-4 glow-primary">Save Client</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search clients..." 
            className="pl-9 bg-card border-border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Client Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow 
                key={client.id} 
                className="border-border hover:bg-secondary/50 cursor-pointer"
              >
                <TableCell className="font-medium" onClick={() => setPreviewClient(client)}>{client.name}</TableCell>
                <TableCell onClick={() => setPreviewClient(client)}>{client.email}</TableCell>
                <TableCell onClick={() => setPreviewClient(client)}>{client.phone}</TableCell>
              </TableRow>
            ))}
            {filteredClients.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                  No clients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewClient} onOpenChange={(open) => !open && setPreviewClient(null)}>
        <DialogContent className="sm:max-w-[500px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl">Client Details</DialogTitle>
            <DialogDescription>Overview of the client&apos;s information</DialogDescription>
          </DialogHeader>
          {previewClient && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Client Name</Label>
                  <p className="font-semibold text-lg">{previewClient.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Phone Number</Label>
                  <p className="font-medium text-lg">{previewClient.phone}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Email Address</Label>
                  <p className="font-medium">{previewClient.email || "N/A"}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Address</Label>
                <p className="font-medium">{previewClient.address || "N/A"}</p>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-border mt-6">
                <Button variant="outline" className="text-destructive border-transparent hover:bg-destructive/10 hover:text-destructive" onClick={(e) => {
                  handleDeleteClient(previewClient.id, e);
                  setPreviewClient(null);
                }}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete Client
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setPreviewClient(null)}>Close</Button>
                  <Button className="glow-primary" onClick={() => {
                    setEditClient(previewClient);
                    setPreviewClient(null);
                  }}>
                    <FileEdit className="mr-2 h-4 w-4" /> Edit Details
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editClient} onOpenChange={(open) => !open && setEditClient(null)}>
        <DialogContent className="sm:max-w-[425px] bg-card border-border">
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>Update the client&apos;s contact information and details.</DialogDescription>
          </DialogHeader>
          {editClient && (
            <form onSubmit={handleEditClient} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-company">Client Name <span className="text-destructive">*</span></Label>
                <Input 
                  id="edit-company" 
                  required
                  value={editClient.name}
                  onChange={(e) => setEditClient({...editClient, name: e.target.value})}
                  className="bg-background border-border" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number <span className="text-destructive">*</span></Label>
                <Input 
                  id="edit-phone" 
                  required
                  value={editClient.phone}
                  onChange={(e) => setEditClient({...editClient, phone: e.target.value})}
                  className="bg-background border-border" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email Address <span className="text-muted-foreground text-xs font-normal">(Optional)</span></Label>
                <Input 
                  id="edit-email" 
                  type="email" 
                  value={editClient.email}
                  onChange={(e) => setEditClient({...editClient, email: e.target.value})}
                  className="bg-background border-border" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-address">Address <span className="text-muted-foreground text-xs font-normal">(Optional)</span></Label>
                <Input 
                  id="edit-address" 
                  value={editClient.address}
                  onChange={(e) => setEditClient({...editClient, address: e.target.value})}
                  className="bg-background border-border" 
                />
              </div>
              <Button type="submit" className="w-full mt-4 glow-primary">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
