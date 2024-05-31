// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Traducciones
const resources = {
  en: {
    translation: {
     configuration: {
      systemConfiguration: "System Configuration",
     }
    }
  },
  es: {
    translation: {
      configuration: {
        systemConfiguration: "Configuracion del sistema"
       }
    }
  }
};

i18n
  .use(initReactI18next) // Inicializa i18next con react-i18next
  .init({
    resources, // Recursos de traducción
    lng: 'en', // Idioma inicial
    fallbackLng: 'en', // Idioma por defecto si no se encuentra la traducción
    debug: true, // Activa mensajes de depuración en consola
    interpolation: {
      escapeValue: false, // React ya maneja la protección contra XSS
    },
  });

export default i18n;
