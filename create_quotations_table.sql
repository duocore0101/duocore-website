CREATE TABLE IF NOT EXISTS public.quotations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  subtotal NUMERIC NOT NULL,
  tax NUMERIC NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT DEFAULT 'Pending' NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;

-- Create policies for full CRUD access (assuming an admin panel where all logged-in/public users can manage quotes)
CREATE POLICY "Enable read access for all" ON "public"."quotations" AS PERMISSIVE FOR SELECT TO public USING (true);
CREATE POLICY "Enable insert access for all" ON "public"."quotations" AS PERMISSIVE FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Enable update access for all" ON "public"."quotations" AS PERMISSIVE FOR UPDATE TO public USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete access for all" ON "public"."quotations" AS PERMISSIVE FOR DELETE TO public USING (true);
