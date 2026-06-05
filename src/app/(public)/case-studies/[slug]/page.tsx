// Dynamic case study detail page — will be built in Prompt 8
// Uses SSG with generateStaticParams from Supabase

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params

  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Case Study</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            Case Study: {slug}
          </h1>
        </div>
      </section>
    </div>
  )
}
