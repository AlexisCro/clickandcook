import { createClient } from '@supabase/supabase-js'
import env from '../.env.js'

const supabaseUrl = env.SUPABASE_URL
console.log(supabaseUrl)
const supabaseAnonKey = env.SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)