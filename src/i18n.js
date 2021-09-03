import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import message_en from "./shop/resources/i18n/en/message.json";
import message_it from "./shop/resources/i18n/it/message.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  // init i18next
  .init({
    fallbackLng: "en",
    lng: "en",
    debug: true,
    resources: {
      en: {
        message: message_en,
      },
      it: {
        message: message_it,
      },
    },
  });

export default i18n;
