import React from 'react'
import { createClient } from '@/lib/supabase/server'
import { BlogListClient } from './BlogListClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog & Insights — Flowtaris',
  description: 'Read the latest insights on NetSuite customization, Coupa optimizations, and enterprise integrations from our certified ERP architects.',
  openGraph: {
    title: 'Blog & Insights — Flowtaris',
    description: 'Read the latest insights on NetSuite customization, Coupa optimizations, and enterprise integrations from our certified ERP architects.',
    url: 'https://flowtaris.com/blog',
    type: 'website'
  }
}

export default async function BlogsPage() {
  const supabase = await createClient(['blogs'])
  
  // Fetch all blogs from the database
  const { data: blogsData, error } = await supabase
    .from('blogs')
    .select(`
      id,
      name,
      slug,
      created_at,
      blogs_hero (
        title,
        description,
        image_url,
        publication_date,
        author_name
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blogs:', error)
  }

  const posts = (blogsData || []).map((b: any) => {
    const hero = Array.isArray(b.blogs_hero) ? b.blogs_hero[0] : b.blogs_hero;
    
    return {
      id: b.slug,
      title: hero?.title || b.name,
      excerpt: hero?.description || '',
      category: b.name,
      date: hero?.publication_date || new Date(b.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: hero?.author_name || 'Admin',
      image: hero?.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600'
    }
  })

  return (
    <main className="bg-white min-h-screen font-sans selection:bg-[#E8A020] selection:text-white">
      <BlogListClient initialPosts={posts} />
    </main>
  )
}
