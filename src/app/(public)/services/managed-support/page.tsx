import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Always-On ERP Support — No Disruption, No Surprises',
  description: '24/7 managed ERP support services — monitoring, incident resolution, and continuous optimization.',
  path: '/services/managed-support',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Managed Support</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            Always-On ERP Support. No Disruption. No Surprises.
          </h1>
        </div>
      </section>
    </div>
  )
}
