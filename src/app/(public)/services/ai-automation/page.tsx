import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Automate the Manual Work Slowing Your Finance Team',
  description: 'AI-powered automation for finance and procurement — workflow automation, intelligent routing, and process optimization.',
  path: '/services/ai-automation',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">AI & Automation</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            Automate the Manual Work That&apos;s Slowing Your Finance Team.
          </h1>
        </div>
      </section>
    </div>
  )
}
