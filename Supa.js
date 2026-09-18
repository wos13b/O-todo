// =========================================================
// SUPABASE
// =========================================================

const SUPABASE_URL =
    "https://aqaaclqbeguloxqjfgtn.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_w8dDCx7t5s5eiBCv3IjE7Q_UnBb0hJJ";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
