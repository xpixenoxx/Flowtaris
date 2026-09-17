import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/studio/', '/admin/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/static/', '/studio/', '/admin/'],
      },
      {
        userAgent: ['Googlebot-Image', 'Googlebot-Video', 'Slurp'],
        allow: '/',
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'anthropic-ai',
          'ClaudeBot',
          'PerplexityBot',
          'YouBot',
          'Google-Extended',
          'CCBot',
          'Applebot-Extended',
          'cohere-ai',
          'AI2Bot',
          'Diffbot',
          'Omgilibot',
          'FacebookBot',
        ],
        allow: '/',
        disallow: ['/api/', '/_next/static/', '/studio/', '/admin/'],
      },
      {
        userAgent: 'Bytespider',
        disallow: '/',
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot'],
        allow: '/',
        disallow: ['/api/', '/_next/static/', '/studio/', '/admin/'],
        crawlDelay: 1,
      },
      {
        userAgent: ['MJ12bot', 'DotBot'],
        allow: '/',
        disallow: ['/api/', '/_next/static/', '/studio/', '/admin/'],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/static/', '/studio/', '/admin/'],
      },
    ],
    sitemap: [
      'https://www.flowtaris.com/sitemap.xml',
      'https://www.flowtaris.com/sitemap-static.xml',
    ],
  };
}
