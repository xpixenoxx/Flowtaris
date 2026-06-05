import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Coupa Consulting That Transforms Procurement Operations',
  description: 'Coupa BSM consulting services — implementation, integration, release management, and procurement optimization.',
  path: '/services/coupa-consulting',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Coupa</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            Coupa Consulting That Transforms Procurement Operations.
          </h1>
        </div>
      </section>
    </div>
  )
}
