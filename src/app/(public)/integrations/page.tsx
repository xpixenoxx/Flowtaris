import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Enterprise Integration Catalog — Platform Connections',
  description: 'Explore the Flowtaris integration catalog — supported platform connections across NetSuite, Coupa, SAP, Workday.',
  path: '/integrations',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Integrations</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            Enterprise Integration Catalog.
          </h1>
        </div>
      </section>
    </div>
  )
}
