import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Resources — ERP Guides, Templates & Downloads',
  description:
    'Download Flowtaris ERP resources — capability briefs, integration checklists, implementation guides and more.',
  path: '/resources',
})

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Resources</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            Guides, Templates & Downloads.
          </h1>
        </div>
      </section>
    </div>
  )
}
