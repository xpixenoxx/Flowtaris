import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'ERP Solutions for Manufacturing Companies',
  description: 'ERP consulting for manufacturing — supply chain integrations, inventory optimization, production planning.',
  path: '/industries/manufacturing',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Manufacturing</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            ERP Solutions for Manufacturing.
          </h1>
        </div>
      </section>
    </div>
  )
}
