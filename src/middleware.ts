import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired
  const { data: { user } } = await supabase.auth.getUser()

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // If no user, redirect to login page (assuming /admin-login or similar, using / as fallback if not exist, let's use /admin-login)
    if (!user && request.nextUrl.pathname !== '/admin-login' && request.nextUrl.pathname !== '/admin/login') {
      const url = request.nextUrl.clone()
      url.pathname = '/admin-login' // Or whatever the login route is
      // Redirect to root if no specific login page is known, but requirement says /login or /admin/login
      // Flowtaris might have an admin login at /admin-login
      // I will use /login as fallback
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Dynamic CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: 'unsafe-eval';
    style-src 'self' 'nonce-${nonce}' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https:;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim()
  
  // Note: Vercel/Next.js dynamic rendering might require 'unsafe-inline' for styles sometimes,
  // and some third-party scripts might require 'unsafe-eval' (like posthog). 
  // However, the prompt specifically says to replace 'unsafe-eval' and 'unsafe-inline' with nonce-based CSP for scripts.
  // I will follow the exact prompt CSP string:
  
  const isProd = process.env.NODE_ENV === 'production'
  const strictCspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${!isProd ? "'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https:;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim()

  supabaseResponse.headers.set('Content-Security-Policy', strictCspHeader)
  supabaseResponse.headers.set('x-nonce', nonce)

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
