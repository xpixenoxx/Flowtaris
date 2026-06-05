import { absoluteUrl } from '@/lib/utils'

/**
 * Generate Organization JSON-LD schema
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Flowtaris',
    url: absoluteUrl('/'),
    logo: absoluteUrl('/logo.svg'),
    description:
      'Flowtaris delivers secure, scalable and audit-ready ERP consulting, integrations and automation across NetSuite, Coupa, SAP, Workday and enterprise platforms.',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@flowtaris.com',
      contactType: 'customer service',
    },
    sameAs: [
      'https://www.linkedin.com/company/flowtaris',
      'https://twitter.com/flowtaris',
      'https://www.youtube.com/@flowtaris',
    ],
  }
}

/**
 * Generate Service JSON-LD schema
 */
export function serviceSchema(params: {
  name: string
  description: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: params.name,
    provider: {
      '@type': 'Organization',
      name: 'Flowtaris',
    },
    name: params.name,
    description: params.description,
    url: params.url,
  }
}

/**
 * Generate FAQ JSON-LD schema
 */
export function faqSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate Article JSON-LD schema
 */
export function articleSchema(params: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  authorName: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    url: params.url,
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    author: {
      '@type': 'Person',
      name: params.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Flowtaris',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo.svg'),
      },
    },
    ...(params.image && {
      image: {
        '@type': 'ImageObject',
        url: params.image,
      },
    }),
  }
}

/**
 * Generate BreadcrumbList JSON-LD schema
 */
export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
