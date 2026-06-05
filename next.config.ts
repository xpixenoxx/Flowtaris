import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://hcaptcha.com https://*.hcaptcha.com https://app.posthog.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.supabase.co https://img1.wsimg.com",
              "connect-src 'self' https://*.supabase.co https://api.resend.com https://app.posthog.com https://www.google-analytics.com",
              "frame-src https://hcaptcha.com https://*.hcaptcha.com https://www.youtube-nocookie.com",
              "object-src 'none'",
              "base-uri 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // 301 redirects from existing GoDaddy URLs to preserve SEO equity
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/blogs', destination: '/insights', permanent: true },
      {
        source: '/blogs/:slug',
        destination: '/insights/:slug',
        permanent: true,
      },
      { source: '/faq', destination: '/contact', permanent: true },
    ]
  },
}

export default nextConfig
