import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/admin', '/admin/', '/api/'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin/', '/api/']
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/admin/']
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/'
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/'
      },
      {
        userAgent: 'YouBot',
        allow: '/'
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin/']
      }
    ],
    sitemap:    'https://flowtaris.com/sitemap.xml',
    host:       'https://flowtaris.com',
  }
}
