"use strict";
var _a;
exports.__esModule = true;
exports.useRouter = exports.usePathname = exports.redirect = exports.Link = exports.routing = void 0;
var routing_1 = require("next-intl/routing");
var navigation_1 = require("next-intl/navigation");
exports.routing = routing_1.defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'de', 'fr'],
    // Used when no locale matches
    defaultLocale: 'en'
});
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
exports.Link = (_a = navigation_1.createSharedPathnamesNavigation(exports.routing), _a.Link), exports.redirect = _a.redirect, exports.usePathname = _a.usePathname, exports.useRouter = _a.useRouter;
