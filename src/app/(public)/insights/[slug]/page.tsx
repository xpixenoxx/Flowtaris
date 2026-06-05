// Dynamic blog post detail page — will be built in Prompt 9
// Uses ISR with revalidation from Supabase

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params

  return (
    <div className="min-h-screen">
      <article className="section-padding">
        <div className="container-content max-w-narrow">
          <span className="section-label">Insights</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            {slug}
          </h1>
        </div>
      </article>
    </div>
  )
}
