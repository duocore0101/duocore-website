import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDB() {
  // Test quotations insert
  console.log("Checking quotations...");
  const { data: qData, error: qError } = await supabase.from('quotations').select('*').limit(1);
  console.log("Quotations Error:", qError?.message || "No error");

  // Test invoices existence
  console.log("Checking invoices...");
  const { data: iData, error: iError } = await supabase.from('invoices').select('*').limit(1);
  console.log("Invoices Error:", iError?.message || "No error");
}

checkDB();
