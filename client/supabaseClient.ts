import { createClient } from '@supabase/supabase-js';

// Récupération des clés depuis les variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Initialisation du client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

