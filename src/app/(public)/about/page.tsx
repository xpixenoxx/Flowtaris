// About page — will be built in Prompt 5
// Sections: Company story, mission, values, team, methodology

import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'About Flowtaris — Enterprise ERP Consulting Expertise',
  description:
    'Learn about Flowtaris — our mission, values, and the team delivering enterprise ERP consulting, integrations and automation.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">About Us</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            The Science of Business Flow.
          </h1>
        </div>
      </section>
    </div>
  )
}
