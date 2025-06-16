import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rcbhpyhtaefbywohbhkv.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Category {
  id: string
  name: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface MenuItem {
  id: string
  category_id: string
  name: string
  description?: string
  price?: number
  image_url?: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
} 