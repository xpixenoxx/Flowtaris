import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'ERP Solutions for Technology and SaaS Companies',
  description: 'ERP consulting and integrations for technology and SaaS companies — NetSuite, Coupa, Workday.',
  path: '/industries/technology-saas',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Technology & SaaS</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            ERP Solutions for Technology & SaaS.
          </h1>
        </div>
      </section>
    </div>
  )
}
