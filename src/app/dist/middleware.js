"use strict";
exports.__esModule = true;
exports.config = exports.middleware = void 0;
var server_1 = require("next/server");
var locales = ['en', 'fr'];
// Get the preferred locale, similar to the above or using a library
function getLocale(request) { }
function middleware(request) {
    // Check if there is any supported locale in the pathname
    var pathname = request.nextUrl.pathname;
    var pathnameHasLocale = locales.some(function (locale) { return pathname.startsWith("/" + locale + "/") || pathname === "/" + locale; });
    if (pathnameHasLocale)
        return;
    // Redirect if there is no locale
    var locale = getLocale(request);
    request.nextUrl.pathname = "/" + locale + pathname;
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return server_1.NextResponse.redirect(request.nextUrl);
}
exports.middleware = middleware;
exports.config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
    ]
};
