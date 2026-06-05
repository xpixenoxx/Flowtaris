'use client'

import { useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'

/**
 * Hook to get a memoized Supabase browser client
 */
export function useSupabase() {
  const supabase = useMemo(() => createClient(), [])
  return supabase
}
