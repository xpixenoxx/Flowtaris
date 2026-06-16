import type { Metadata } from 'next'
import { ServiceScrollStack } from '@/components/sections/ServiceScrollStack'
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection'
import { CapabilitiesBanner } from '@/components/sections/CapabilitiesBanner'

import { CaseStudyHighlights } from '@/components/sections/CaseStudyHighlights'
import { IntegrationShowcase } from '@/components/sections/IntegrationShowcase'
import { HowWeWorkSection } from '@/components/sections/HowWeWorkSection'

import { FinanceCTA } from '@/components/sections/FinanceCTA'
import { organizationSchema } from '@/lib/schema'
import { Suspense } from 'react'
import { SkeletonCard } from '@/components/ui/Skeleton'

import { HeroSection } from '@/components/sections/HeroSection'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Flowtaris \u2014 Enterprise ERP & Integration Consulting',
  description:
    'Flowtaris delivers secure, scalable and audit-ready ERP consulting, integrations and automation across NetSuite, Coupa, SAP, Workday and enterprise platforms.',
  openGraph: {
    title: 'Flowtaris \u2014 Enterprise ERP & Integration Consulting',
    description:
      'Flowtaris delivers secure, scalable and audit-ready ERP consulting, integrations and automation across NetSuite, Coupa, SAP, Workday and enterprise platforms.',
    url: 'https://flowtaris.com',
    type: 'website',
  },
}

export default async function HomePage() {
  const schema = organizationSchema()
  const supabase = await createClient()

  // Fetch independent data in parallel
  const [
    { data: heroData },
    { data: technologies },
    { data: wcuSectors },
    { data: wcuCards },
    { data: rawServices }
  ] = await Promise.all([
    supabase.from('global_hero').select('*').limit(1).maybeSingle(),
    supabase.from('modern_technologies').select('*').order('priority', { ascending: false }),
    supabase.from('why_choose_us_sectors').select('*').order('priority', { ascending: false }),
    supabase.from('why_choose_us_cards').select('*').order('priority', { ascending: false }),
    supabase.from('services').select('id, name, slug, priority, services_hero(color, normal_description)').order('priority', { ascending: false })
  ])

  // Fetch hero images sequentially since it depends on heroData.id
  let heroImages: any[] = []
  if (heroData?.id) {
    const { data: images } = await supabase
      .from('global_hero_images')
      .select('*')
      .eq('hero_id', heroData.id)
      .order('created_at', { ascending: true })
    if (images) heroImages = images
  }

  return (
    <>
      {/* Organization schema - global */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          schema,
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Flowtaris — Enterprise ERP & Integration Consulting",
            "speakable": {
              "@type": "SpeakableSpecification",
              "xpath": [
                "/html/body//section[@id='geo-faq']//h3",
                "/html/body//section[@id='geo-faq']//p"
              ]
            }
          }
        ]) }}
      />

      <HeroSection 
        title={heroData?.main_description} 
        description={heroData?.small_description ?? undefined} 
        technologies={technologies || []}
        heroImages={heroImages}
      />
      <ServiceScrollStack dynamicServices={rawServices || []} />
      <WhyChooseUsSection sectors={wcuSectors || []} cards={wcuCards || []} />
      <CapabilitiesBanner />

      <Suspense fallback={
        <section className="section bg-surface">
          <div className="container-content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        </section>
      }>
        <CaseStudyHighlights />
      </Suspense>
      <IntegrationShowcase />
      <HowWeWorkSection />

      <section id="geo-faq" className="py-24 bg-white px-6 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold text-[#0A1628]" style={{ fontFamily: 'var(--font-sora)' }}>
              Frequently Asked Questions
            </h2>
            <div className="w-12 h-1 bg-[#FFD166] mt-4" />
          </div>
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h3 className="text-xl font-bold text-[#0A1628] mb-4" style={{ fontFamily: 'var(--font-sora)' }}>What makes Flowtaris different from large ERP consultancies?</h3>
              <p className="text-slate-600 leading-relaxed text-lg font-light">Unlike massive global systems integrators that rely on junior resources and standardized templates, Flowtaris operates as a specialized boutique consultancy. Our teams consist strictly of senior architects with Big 4 backgrounds and active certifications in NetSuite, Coupa, and Workday. This allows us to deliver highly customized, complex iPaaS integrations and ERP optimizations faster and with a significantly lower failure rate than traditional large-scale consulting firms.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0A1628] mb-4" style={{ fontFamily: 'var(--font-sora)' }}>How quickly can Flowtaris start an ERP implementation or integration project?</h3>
              <p className="text-slate-600 leading-relaxed text-lg font-light">Flowtaris typically deploys a dedicated ERP architect and integration team within two to four weeks of a signed Statement of Work. Because we specialize exclusively in the NetSuite, Coupa, SAP, and Workday ecosystem, we avoid the lengthy resource-pooling delays common at larger firms. During this immediate onboarding phase, we conduct technical discovery and establish the foundation for your SOX-compliant data pipelines.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0A1628] mb-4" style={{ fontFamily: 'var(--font-sora)' }}>Which ERP platforms and software does Flowtaris specialize in?</h3>
              <p className="text-slate-600 leading-relaxed text-lg font-light">Flowtaris exclusively specializes in architecting and integrating Oracle NetSuite, Coupa Business Spend Management (BSM), SAP S/4HANA, and Workday HCM. We do not dilute our expertise across dozens of platforms; instead, we focus entirely on building autonomous, high-volume financial data pipelines and SuiteScript 2.x customizations connecting these four enterprise leaders via modern iPaaS solutions.</p>
            </div>
          </div>
        </div>
      </section>

      <FinanceCTA />


    </>
  )
}
