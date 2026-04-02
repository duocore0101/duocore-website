-- SQL script for Admin Activity Logging
-- Copy and paste this into the Supabase SQL Editor and click 'Run'.

CREATE TABLE IF NOT EXISTS admin_activities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    admin_name TEXT NOT NULL,
    action_type TEXT NOT NULL, -- e.g., 'Created', 'Edited', 'Deleted'
    target_type TEXT NOT NULL, -- e.g., 'Quotation', 'Invoice', 'Credit', 'Expense'
    target_name TEXT NOT NULL, -- e.g., 'GMARS Tech Solution'
    details TEXT
);

-- Enable RLS
ALTER TABLE admin_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all access for admin_activities" ON admin_activities FOR ALL USING (true);
