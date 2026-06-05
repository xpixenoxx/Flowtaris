// Edit Blog Post — will be built in Prompt 12

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return (
    <div>
      <h1 className="font-display text-2xl text-navy-900">Edit Blog Post: {id}</h1>
    </div>
  )
}
