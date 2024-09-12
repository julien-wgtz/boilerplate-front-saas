import { NextResponse } from "next/server";
 
let locales = ['fr', 'en']
 
// Get the preferred locale, similar to the above or using a library
function getLocale(request: Request) { 
	const acceptLanguage = request.headers.get('Accept-Language')
  const locale = acceptLanguage ? acceptLanguage.split(',')[0].split('-')[0] : 'fr';

	return locales.includes(locale) ? locale : 'fr'
 }
 
export function middleware(request: Request & { nextUrl: URL }) {
  // Check if there is any supported locale in the pathname
  const pathname = new URL(request.url).pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  console.log('pathnameHasLocale', pathnameHasLocale)
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  const locale = getLocale(request)
  console.log('locale', locale)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}