// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

import { fetchAuthSession } from 'aws-amplify/auth/server';
import { fetchAuthSession as csFetchAuthSession } from 'aws-amplify/auth';

import { runWithAmplifyServerContext } from '@/app/utils/amplify-utils';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  return NextResponse.redirect(new URL('/guest', request.url));

  // const authenticated = await runWithAmplifyServerContext({
  //   nextServerContext: { request, response },
  //   operation: async (contextSpec) => {
  //     try {
  //       const session = await fetchAuthSession(contextSpec, {});
  //       return session.tokens !== undefined;
  //     } catch (error) {
  //       console.log(error);
  //       return false;
  //     }
  //   },
  // });

  // if (authenticated) {
  //   return response;
  // }
  // return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login
     */
    '/((?!api|_next/static|_next/image|favicon.ico|guest|documentation|$).*)',
    // '/calculator/:path*',
  ],
};
