import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') || 'Flowtaris'
  const description = searchParams.get('description') || 'Enterprise ERP & Integration Consulting'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0A1628',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '4px',
              backgroundColor: '#C8952A',
            }}
          />
          <span
            style={{
              fontSize: '14px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#C8952A',
              fontFamily: 'monospace',
            }}
          >
            FLOWTARIS
          </span>
        </div>
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
            maxWidth: '900px',
            marginBottom: '24px',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: '24px',
            color: '#E8EEF5',
            opacity: 0.8,
            maxWidth: '700px',
            lineHeight: 1.4,
          }}
        >
          {description}
        </p>
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '16px', color: '#C8952A' }}>flowtaris.com</span>
          <span style={{ fontSize: '16px', color: '#64748B' }}>
            — The Science of Business Flow
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
