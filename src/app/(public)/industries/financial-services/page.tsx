import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'ERP Solutions for Financial Services',
  description: 'SOX-ready ERP consulting for financial services — audit-ready implementations, secure integrations.',
  path: '/industries/financial-services',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Financial Services</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            ERP Solutions for Financial Services.
          </h1>
        </div>
      </section>
    </div>
  )
}
