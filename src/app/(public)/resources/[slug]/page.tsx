// Dynamic resource detail page — will be built in Prompt 9

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const { slug } = await params

  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="container-content">
          <span className="section-label">Resource</span>
          <h1 className="font-display text-display-lg text-navy-900 mt-4">
            {slug}
          </h1>
        </div>
      </section>
    </div>
  )
}
