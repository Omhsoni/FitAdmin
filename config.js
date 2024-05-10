
const { createClient } =  require('@supabase/supabase-js')

require("dotenv").config();

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABSE_URL, process.env.PRIVATE_KEY);


exports.supabase = supabase;