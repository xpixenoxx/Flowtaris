import type { Metadata } from 'next'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: {
    default: 'Flowtaris — Enterprise ERP & Integration Consulting',
    template: '%s | Flowtaris',
  },
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Fetch dynamic services and their hero colors for the Navigation
  const { data: dynamicServices } = await supabase
    .from('services')
    .select('id, name, slug, priority, services_hero(color, normal_description)')
    .order('priority', { ascending: false })

  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      <Navigation dynamicServices={dynamicServices || []} />
      
      {/* Offset for fixed nav */}
      <div className="h-[72px] flex-shrink-0" aria-hidden="true" />
      
      {/* Main content */}
      <main className="flex-1 w-full" id="main-content">
        {children}
      </main>

      {/* Footer in normal document flow */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  )
}
