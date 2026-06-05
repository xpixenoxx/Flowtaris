import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Workday to NetSuite Payroll Journal Automation',
  description: 'Automated Workday to NetSuite payroll journal integration — accurate, auditable, reliable.',
  path: '/services/erp-integrations/workday-to-netsuite',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Workday → NetSuite</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            Workday to NetSuite Integration.
          </h1>
        </div>
      </section>
    </div>
  )
}
