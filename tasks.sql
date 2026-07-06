-- SQL to create the tasks table in Supabase
-- You must run this in the Supabase SQL Editor

CREATE TABLE public.tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    staff_id TEXT NOT NULL,
    date DATE NOT NULL,
    description TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create policies (Since staff login is hardcoded and we use the anon key for now, we will allow all operations on this table. Be sure to lock this down in production!)
CREATE POLICY "Enable read access for all users" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.tasks FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.tasks FOR DELETE USING (true);
