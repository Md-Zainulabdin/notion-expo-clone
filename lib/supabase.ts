// lib/supabase.ts
import { useAuth } from '@clerk/clerk-expo'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Hook to create authenticated Supabase client
export const useSupabaseAuth = () => {
  const { getToken } = useAuth()
  
  const getAuthenticatedClient = async () => {
    const token = await getToken({ template: 'supabase' })
    
    if (!token) {
      throw new Error('No authentication token available')
    }
    
    return createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })
  }
  
  return { supabase, getAuthenticatedClient }
}
