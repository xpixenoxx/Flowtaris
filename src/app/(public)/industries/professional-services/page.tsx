import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'ERP Solutions for Professional Services Firms',
  description: 'ERP consulting for professional services — project accounting, resource management, billing automation.',
  path: '/industries/professional-services',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Professional Services</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            ERP Solutions for Professional Services.
          </h1>
        </div>
      </section>
    </div>
  )
}
