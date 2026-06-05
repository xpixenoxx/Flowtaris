import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Industries We Serve — ERP Solutions by Sector',
  description: 'Flowtaris delivers ERP consulting across technology, healthcare, manufacturing, financial services, and professional services.',
  path: '/industries',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Industries</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            ERP Solutions Tailored to Your Industry.
          </h1>
        </div>
      </section>
    </div>
  )
}
