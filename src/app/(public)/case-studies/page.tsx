import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Case Studies — Real ERP Transformation Results',
  description:
    'Explore Flowtaris case studies — real enterprise ERP implementations, integrations, and automation projects with measurable outcomes.',
  path: '/case-studies',
})

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Case Studies</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            Real Results. Real Transformations.
          </h1>
        </div>
      </section>
    </div>
  )
}
