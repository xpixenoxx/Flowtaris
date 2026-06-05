import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'NetSuite Implementation, Integration and Support — Done Right',
  description: 'Expert NetSuite consulting services including implementation, customization, integration, and ongoing support from certified consultants.',
  path: '/services/netsuite-consulting',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">NetSuite</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            NetSuite Implementation, Integration and Support — Done Right.
          </h1>
        </div>
      </section>
    </div>
  )
}
