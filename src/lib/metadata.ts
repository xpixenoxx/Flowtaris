import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/utils'

interface MetadataParams {
  title: string
  description: string
  path: string
  ogImage?: string
  noIndex?: boolean
}

/**
 * Generate consistent metadata for all pages
 */
export function generatePageMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: MetadataParams): Metadata {
  const url = absoluteUrl(path)
  const image = ogImage || absoluteUrl('/api/og?title=' + encodeURIComponent(title))

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
