import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

// Configuration des locales supportées
const locales = ["de", "en", "fr"]; // Langues disponibles
const defaultLocale = "fr"; // Langue par défaut si aucune locale n'est présente

// Créer le middleware avec next-intl
const intlMiddleware = createMiddleware({
  locales, // Langues supportées
  defaultLocale, // Langue par défaut
});

// Middleware personnalisé pour redirection
export default function middleware(
  request: NextRequest
) {
  const pathname = request.nextUrl.pathname;

  // Vérifie si l'URL contient déjà une locale
  const pathLocale = pathname.split("/")[1];

  if (!locales.includes(pathLocale)) {
    // Si la locale n'est pas dans l'URL, redirige vers la langue par défaut
    return NextResponse.redirect(
      new URL(
        `/${defaultLocale}${pathname}`,
        request.url
      )
    );
  }

  // Sinon, continue avec le middleware next-intl
  return intlMiddleware(request);
}

// Configurer le matcher pour appliquer ce middleware uniquement aux routes pertinentes
export const config = {
  matcher: [
    "/((?!_next|api|static|favicon.ico).*)",
  ], // Appliquer à toutes les routes sauf celles spécifiques
};
