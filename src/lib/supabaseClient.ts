import { createClient } from '@supabase/supabase-js'
import { Database } from '../../types/supabase'

const supabase = createClient<Database>(import.meta.env.VITE_PUBLIC_SUPABASE_URL, import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY)

export const getProductImageUrl = (filename: string) => {
  return `${import.meta.env.VITE_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${filename}`;
}

export default supabase;