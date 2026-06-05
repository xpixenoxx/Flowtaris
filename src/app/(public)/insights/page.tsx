import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Insights — ERP Strategy, Technical Guides & Best Practices',
  description:
    'Read Flowtaris insights on ERP consulting, NetSuite, Coupa, SAP, Workday integrations, automation strategies, and enterprise best practices.',
  path: '/insights',
})

export default function InsightsPage() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Insights</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            ERP Strategy & Technical Insights.
          </h1>
        </div>
      </section>
    </div>
  )
}
