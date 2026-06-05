import { NextResponse } from 'next/server'

export async function POST() {
  // TODO: Implement sitemap regeneration trigger in Prompt 2
  // This will be called when content is published via admin panel
  return NextResponse.json({ message: 'Sitemap regeneration triggered' })
}
