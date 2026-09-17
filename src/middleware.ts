import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';
  
  const isAdminDomain = hostname.includes('admin.flowtaris.com');
  const isAdminRoute = url.pathname.startsWith('/admin');

  if (isAdminDomain || isAdminRoute) {
    const basicAuth = req.headers.get('authorization');

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      if (authValue) {
        // Decode base64 
        const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':');
        
        const validUser = process.env.ADMIN_USERNAME || 'admin';
        const validPwd = process.env.ADMIN_PASSWORD || 'flowtaris2026';

        if (user === validUser && pwd === validPwd) {
          // Authorized! Add noindex header to keep it hidden from search engines
          const response = NextResponse.next();
          response.headers.set('X-Robots-Tag', 'noindex, nofollow');
          return response;
        }
      }
    }

    // Unauthorized - return 401 and WWW-Authenticate header to trigger browser prompt
    return new NextResponse('Auth required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico, sitemap.xml, robots.txt (metadata files)
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
