import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Ironclad to Coupa Contract-to-Procurement Integration',
  description: 'Ironclad to Coupa integration — contract lifecycle management connected to procurement operations.',
  path: '/services/erp-integrations/ironclad-to-coupa',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Ironclad → Coupa</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            Ironclad to Coupa Integration.
          </h1>
        </div>
      </section>
    </div>
  )
}
