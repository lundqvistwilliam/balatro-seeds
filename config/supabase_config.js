import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Key length:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
