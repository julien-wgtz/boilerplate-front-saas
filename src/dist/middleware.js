"use strict";
exports.__esModule = true;
exports.config = void 0;
var server_1 = require("next/server");
var middleware_1 = require("next-intl/middleware");
// Configuration des locales supportées
var locales = ["de", "en", "fr"]; // Langues disponibles
var defaultLocale = "fr"; // Langue par défaut si aucune locale n'est présente
// Créer le middleware avec next-intl
var intlMiddleware = middleware_1["default"]({
    locales: locales,
    defaultLocale: defaultLocale
});
// Middleware personnalisé pour redirection
function middleware(request) {
    var pathname = request.nextUrl.pathname;
    // Vérifie si l'URL contient déjà une locale
    var pathLocale = pathname.split("/")[1];
    if (!locales.includes(pathLocale)) {
        // Si la locale n'est pas dans l'URL, redirige vers la langue par défaut
        return server_1.NextResponse.redirect(new URL("/" + defaultLocale + pathname, request.url));
    }
    // Sinon, continue avec le middleware next-intl
    return intlMiddleware(request);
}
exports["default"] = middleware;
// Configurer le matcher pour appliquer ce middleware uniquement aux routes pertinentes
exports.config = {
    matcher: [
        "/((?!_next|api|static|favicon.ico).*)",
    ]
};
