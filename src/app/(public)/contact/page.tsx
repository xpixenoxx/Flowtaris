// Contact page — will be built in Prompt 10
// Forms: Consultation form, inquiry form

import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Contact Flowtaris — Book a Consultation',
  description:
    'Get in touch with Flowtaris for enterprise ERP consulting, integration services, and managed support. Book a free consultation today.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Get In Touch</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            Let&apos;s Talk About Your ERP Challenges.
          </h1>
        </div>
      </section>
    </div>
  )
}
