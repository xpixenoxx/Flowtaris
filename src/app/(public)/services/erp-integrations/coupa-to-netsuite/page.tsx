import { generatePageMetadata } from '@/lib/metadata'

export const metadata = generatePageMetadata({
  title: 'Coupa to NetSuite Integration — Procurement to ERP',
  description: 'Seamless Coupa to NetSuite integration — PO sync, invoice matching, GL journal automation.',
  path: '/services/erp-integrations/coupa-to-netsuite',
})

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Coupa → NetSuite</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            Coupa to NetSuite Integration.
          </h1>
        </div>
      </section>
    </div>
  )
}
