import { Metadata } from 'next'
import { IntegrationShowcase } from '@/components/sections/IntegrationShowcase'


export const metadata: Metadata = {
  title: 'Enterprise Integrations | Flowtaris',
  description: 'Seamlessly connect your mission-critical enterprise systems. We architect secure, high-performance data pipelines bridging Coupa, NetSuite, SAP, Workday, and more.',
}

export default function IntegrationsPage() {
  return (
    <main className="pt-24">
      <IntegrationShowcase hideViewAll={true} />

      {/* Light CTA Section */}
      <section className="py-32 relative border-t border-slate-200 overflow-hidden bg-[#FAFAFA]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(232,160,32,0.03),transparent_40%)]" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center relative z-10">
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-[1px] w-8 bg-[#E8A020]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#E8A020]">
              Start a Conversation
            </span>
            <div className="h-[1px] w-8 bg-[#E8A020]" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-light mb-8 text-[#0A1628]" style={{ fontFamily: 'var(--font-sora)' }}>
            Ready to automate your <br/> workflows?
          </h2>
          <p className="text-lg md:text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed mb-12">
            Let's build a reliable integration architecture that scales with your enterprise.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="/contact" className="px-10 py-4 bg-[#0A1628] text-white font-bold uppercase tracking-widest text-xs transition-transform hover:scale-105 shadow-md">
              Discuss Your Stack
            </a>
            <a href="/case-studies" className="px-10 py-4 bg-white border border-slate-200 text-[#0A1628] font-bold uppercase tracking-widest text-xs transition-colors hover:border-slate-300 hover:bg-slate-50 shadow-sm">
              Explore Case Studies
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
