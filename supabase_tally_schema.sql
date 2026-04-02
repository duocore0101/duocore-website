-- Updated SQL script for Tally Credits, Expenses, and Pending tables
-- Copy and paste this into the Supabase SQL Editor and click 'Run'.
-- This script uses 'IF NOT EXISTS' to prevent errors if you run it multiple times.

CREATE TABLE IF NOT EXISTS tally_credits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    project_name TEXT NOT NULL,
    amount NUMERIC NOT NULL DEFAULT 0,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS tally_expenses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    description TEXT NOT NULL,
    amount NUMERIC NOT NULL DEFAULT 0,
    date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS tally_pending (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    client_name TEXT NOT NULL,
    amount NUMERIC NOT NULL DEFAULT 0,
    due_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Enable RLS (Ignores if already enabled)
ALTER TABLE tally_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE tally_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE tally_pending ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY IF NOT EXISTS (Postgres 9.5+)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all access for tally_credits') THEN
        CREATE POLICY "Allow all access for tally_credits" ON tally_credits FOR ALL USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all access for tally_expenses') THEN
        CREATE POLICY "Allow all access for tally_expenses" ON tally_expenses FOR ALL USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all access for tally_pending') THEN
        CREATE POLICY "Allow all access for tally_pending" ON tally_pending FOR ALL USING (true);
    END IF;
END $$;
