import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'ERP Consulting Services — NetSuite, Coupa, SAP, Workday',
  description: 'Explore Flowtaris enterprise ERP services including NetSuite consulting, Coupa implementation, system integrations, and managed support.',
  path: '/services',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Our Services</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            Enterprise ERP Services Built for Scale.
          </h1>
        </div>
      </section>
    </div>
  )
}
