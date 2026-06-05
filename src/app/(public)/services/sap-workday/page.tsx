import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'SAP and Workday Consulting — Integration and Optimization',
  description: 'SAP and Workday consulting services — implementation support, integration, payroll automation, and optimization.',
  path: '/services/sap-workday',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">SAP & Workday</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            SAP & Workday Consulting and Integration Services.
          </h1>
        </div>
      </section>
    </div>
  )
}
