import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'ERP Solutions for Healthcare Organizations',
  description: 'HIPAA-aware ERP consulting for healthcare — secure integrations, compliant implementations.',
  path: '/industries/healthcare',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Healthcare</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            ERP Solutions for Healthcare.
          </h1>
        </div>
      </section>
    </div>
  )
}
