"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _i18next = _interopRequireDefault(require("i18next"));

var _reactI18next = require("react-i18next");

var _i18nextBrowserLanguagedetector = _interopRequireDefault(require("i18next-browser-languagedetector"));

var _i18nextHttpBackend = _interopRequireDefault(require("i18next-http-backend"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// i18n.ts ou i18n.js
_i18next["default"].use(_i18nextHttpBackend["default"]).use(_i18nextBrowserLanguagedetector["default"]) // Pour détecter la langue via l'en-tête ou l'URL
.use(_reactI18next.initReactI18next) // Intègre i18next avec react-i18next
.init({
  fallbackLng: 'de',
  // Langue de fallback si aucune locale n'est trouvée
  supportedLngs: ['fr', 'en', 'de'],
  // Langues supportées
  debug: true,
  // Activer ou désactiver les logs de débogage
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json' // Chemin vers les fichiers de traduction

  },
  interpolation: {
    escapeValue: false // React protège déjà contre les failles XSS

  }
});

var _default = _i18next["default"];
exports["default"] = _default;