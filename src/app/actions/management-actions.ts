'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { ManagementCapability } from '@/types/database'

export async function addManagementCapability(data: Omit<ManagementCapability, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('management_capabilities').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/management-capabilities')
  revalidatePath('/')
  revalidatePath('/about')
}

export async function updateManagementCapability(id: string, data: Partial<ManagementCapability>) {
  const supabase = await createClient()
  const { error } = await supabase.from('management_capabilities').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/management-capabilities')
  revalidatePath('/')
  revalidatePath('/about')
}

export async function deleteManagementCapability(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('management_capabilities').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/management-capabilities')
  revalidatePath('/')
  revalidatePath('/about')
}

export async function updateManagementCapabilityPriorities(updates: { id: string, display_order: number }[]) {
  const supabase = await createClient()
  
  const promises = updates.map(update => 
    supabase.from('management_capabilities').update({ display_order: update.display_order }).eq('id', update.id)
  )
  await Promise.all(promises)
  
  revalidatePath('/admin/management-capabilities')
  revalidatePath('/')
  revalidatePath('/about')
}
