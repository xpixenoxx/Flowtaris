import { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { CTASection } from '@/components/sections/CTASection'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Enterprise Services | Flowtaris',
  description: 'Comprehensive enterprise consulting, implementation, and managed support for NetSuite, Coupa, SAP, and Workday.',
}

export default async function ServicesPage() {
  const supabase = await createClient()

  // Fetch dynamic services and their hero colors
  const { data: dynamicServices } = await supabase
    .from('services')
    .select('id, name, slug, priority, services_hero(color, normal_description)')
    .order('priority', { ascending: false })

  return (
    <main className="bg-[#FAFAFA] min-h-screen text-[#0A1628] font-sans selection:bg-[#E8A020] selection:text-white">
      {/* 1. Bespoke Institutional Hero */}
      <section className="relative pt-40 pb-24 lg:pt-52 lg:pb-32 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,160,32,0.03),transparent_50%)]" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="h-[1px] w-8 bg-[#E8A020]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#E8A020]">
                Institutional Capabilities
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-light leading-[1.05] tracking-tight mb-8 text-[#0A1628]" style={{ fontFamily: 'var(--font-sora)' }}>
              Enterprise scale. <br />
              <span className="text-slate-400">Surgical precision.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 font-light max-w-2xl leading-relaxed">
              We architect, deploy, and manage the most complex technology ecosystems in the world. Uncompromising quality for high-growth organizations.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Primary Capabilities Grid */}
      <div className="relative z-10 bg-[#FAFAFA]">
        <ServicesGrid dynamicServices={dynamicServices || []} />
      </div>

      {/* 3. Light CTA Section */}
      <section className="py-32 relative border-t border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(232,160,32,0.03),transparent_40%)]" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-light mb-8 text-[#0A1628]" style={{ fontFamily: 'var(--font-sora)' }}>
            Ready to transform your <br/> enterprise architecture?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            <a href="/contact" className="px-10 py-4 bg-[#0A1628] text-white font-bold uppercase tracking-widest text-xs transition-transform hover:scale-105">
              Initiate Project
            </a>
            <a href="/about" className="px-10 py-4 bg-white border border-slate-200 text-[#0A1628] font-bold uppercase tracking-widest text-xs transition-colors hover:border-slate-300 hover:bg-slate-50 shadow-sm">
              Explore Methodology
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
