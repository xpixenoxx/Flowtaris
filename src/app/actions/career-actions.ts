'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Career } from '@/types/database'

export async function createCareer(data: Omit<Career, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = await createClient()
  const { error } = await supabase.from('careers').insert([data])
  if (error) throw new Error(error.message)
  revalidatePath('/admin/careers')
  revalidatePath('/careers')
}

export async function updateCareer(id: string, data: Partial<Career>) {
  const supabase = await createClient()
  const { error } = await supabase.from('careers').update(data).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/careers')
  revalidatePath('/careers')
  revalidatePath(`/careers/${id}`)
}

export async function deleteCareer(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('careers').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/careers')
  revalidatePath('/careers')
}

export async function submitApplication(data: FormData) {
  const supabase = await createClient()
  
  const file = data.get('resume') as File
  let resumeUrl = ''

  if (file && file.size > 0) {
    const ext = file.name.split('.').pop()
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`
    
    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filename, file)
      
    if (uploadError) throw new Error(uploadError.message)
    
    resumeUrl = filename
  }

  const { error } = await supabase.from('job_applications').insert([{
    career_id: data.get('career_id') as string,
    name: data.get('name') as string,
    email: data.get('email') as string,
    phone: (data.get('phone') as string) || null,
    message: (data.get('message') as string) || null,
    resume_url: resumeUrl || null
  }])

  if (error) throw new Error(error.message)
}

export async function updateApplicationStatus(id: string, status: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('job_applications').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/job-applications')
}

export async function getResumeUrl(path: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.storage.from('resumes').createSignedUrl(path, 60 * 60) // 1 hour
  if (error) throw new Error(error.message)
  return data.signedUrl
}

export async function deleteApplication(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('job_applications').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/job-applications')
}
