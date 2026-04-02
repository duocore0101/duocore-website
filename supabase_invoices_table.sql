-- Copy and paste this entirely into the Supabase SQL Editor and click 'Run'.

CREATE TABLE invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    number TEXT NOT NULL UNIQUE,
    title TEXT,
    date TEXT NOT NULL,
    due TEXT NOT NULL,
    subtotal NUMERIC NOT NULL DEFAULT 0,
    tax NUMERIC NOT NULL DEFAULT 0,
    total NUMERIC NOT NULL DEFAULT 0,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT NOT NULL DEFAULT 'Unpaid'
);

-- Enable RLS (Optional depending on your auth setup, but recommended)
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Create basic access policies if needed
CREATE POLICY "Enable read access for all users" ON invoices FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON invoices FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON invoices FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON invoices FOR DELETE USING (true);
