import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Enterprise Integrations Built for Reliability at Scale',
  description: 'Scalable ERP integration services connecting NetSuite, Coupa, SAP, Workday, Ironclad and enterprise platforms.',
  path: '/services/erp-integrations',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">ERP Integrations</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            Enterprise Integrations Built for Reliability at Scale.
          </h1>
        </div>
      </section>
    </div>
  )
}
