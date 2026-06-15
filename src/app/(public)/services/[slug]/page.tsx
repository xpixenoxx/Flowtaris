import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DynamicServiceClient } from './DynamicServiceClient'

export default async function ServiceSlugPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  const supabase = await createClient()

  // 1. Find the service
  const { data: service } = await supabase
    .from('services')
    .select('id, name, slug')
    .eq('slug', slug)
    .single()

  if (!service) {
    notFound()
  }

  // 2. Fetch all related data
  const [
    { data: hero },
    { data: whyChoose },
    { data: businessMain },
    { data: businessItems },
    { data: erpMain },
    { data: erpCards },
    { data: deepModules }
  ] = await Promise.all([
    supabase.from('services_hero').select('*').eq('service_id', service.id).maybeSingle(),
    supabase.from('services_why_choose').select('*').eq('service_id', service.id),
    supabase.from('services_business_suite_main').select('*').eq('service_id', service.id).maybeSingle(),
    supabase.from('services_business_suite_items').select('*').eq('service_id', service.id),
    supabase.from('services_erp_architecture_main').select('*').eq('service_id', service.id).maybeSingle(),
    supabase.from('services_erp_architecture_cards').select('*').eq('service_id', service.id).order('priority', { ascending: false }),
    supabase.from('services_deep_module').select('*').eq('service_id', service.id)
  ])

  return (
    <DynamicServiceClient 
      service={service}
      hero={hero}
      whyChoose={whyChoose || []}
      businessMain={businessMain}
      businessItems={businessItems || []}
      erpMain={erpMain}
      erpCards={erpCards || []}
      deepModules={deepModules || []}
    />
  )
}
