
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = 'https://wwrujavctcxdrlpneiru.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3cnVqYXZjdGN4ZHJscG5laXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3ODYxMDUsImV4cCI6MjA1NzM2MjEwNX0.JvagItpFbgwUmLS9J-3z3_utLmTEkzejXx-WeK78t3c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
