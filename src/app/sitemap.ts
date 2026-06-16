import type { MetadataRoute } from 'next'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const BASE_URL = 'https://flowtaris.com'

// Static routes with priorities
const STATIC_ROUTES: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { url: '/',                           priority: 1.0,  changeFrequency: 'weekly'  },
  { url: '/about',                      priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/services',                   priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/services/netsuite-consulting', priority: 0.9, changeFrequency: 'monthly' },
  { url: '/services/coupa-consulting',  priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/services/erp-integrations',  priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/services/erp-integrations/coupa-to-netsuite',  priority: 0.85, changeFrequency: 'monthly' },
  { url: '/services/erp-integrations/workday-to-netsuite', priority: 0.85, changeFrequency: 'monthly' },
  { url: '/services/erp-integrations/coupa-to-sap',       priority: 0.85, changeFrequency: 'monthly' },
  { url: '/services/erp-integrations/ironclad-to-coupa',  priority: 0.85, changeFrequency: 'monthly' },
  { url: '/services/managed-support',   priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/services/ai-automation',     priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/services/sap-workday',       priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/industries',                 priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/industries/technology-saas', priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/industries/healthcare',      priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/industries/manufacturing',   priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/industries/financial-services', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/industries/professional-services', priority: 0.8, changeFrequency: 'monthly' },
  { url: '/integrations',               priority: 0.85, changeFrequency: 'monthly' },
  { url: '/case-studies',               priority: 0.85, changeFrequency: 'weekly'  },
  { url: '/insights',                   priority: 0.8,  changeFrequency: 'weekly'  },
  { url: '/resources',                  priority: 0.75, changeFrequency: 'weekly'  },
  { url: '/contact',                    priority: 0.9,  changeFrequency: 'monthly' },
]

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [
    { data: blogs },
    { data: caseStudies },
    { data: integrations }
  ] = await Promise.all([
    supabase.from('blog_posts').select('slug, updated_at').eq('published', true),
    supabase.from('case_studies').select('slug, updated_at'),
    supabase.from('integrations').select('slug, updated_at')
  ])

  const dynamicEntries: MetadataRoute.Sitemap = [
    ...(blogs || []).map(b => ({
      url: `${BASE_URL}/insights/${b.slug}`,
      lastModified: new Date(b.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    })),
    ...(caseStudies || []).map(c => ({
      url: `${BASE_URL}/case-studies/${c.slug}`,
      lastModified: new Date(c.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    })),
    ...(integrations || []).map(i => ({
      url: `${BASE_URL}/integrations/${i.slug}`,
      lastModified: new Date(i.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))
  ]

  // Static routes
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url:             `${BASE_URL}${route.url}`,
    lastModified:    new Date(),
    changeFrequency: route.changeFrequency,
    priority:        route.priority,
  }))

  return [...staticEntries, ...dynamicEntries]
}
