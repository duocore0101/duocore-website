CREATE TABLE IF NOT EXISTS public.clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Create policies for full CRUD access (assuming an admin panel where all logged-in/public users can manage clients)
CREATE POLICY "Enable read access for all" ON "public"."clients" AS PERMISSIVE FOR SELECT TO public USING (true);
CREATE POLICY "Enable insert access for all" ON "public"."clients" AS PERMISSIVE FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Enable update access for all" ON "public"."clients" AS PERMISSIVE FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete access for all" ON "public"."clients" AS PERMISSIVE FOR DELETE TO public USING (true);
