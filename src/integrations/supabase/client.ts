
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wwrujavctcxdrlpneiru.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3cnVqYXZjdGN4ZHJscG5laXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3ODYxMDUsImV4cCI6MjA1NzM2MjEwNX0.JvagItpFbgwUmLS9J-3z3_utLmTEkzejXx-WeK78t3c";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
