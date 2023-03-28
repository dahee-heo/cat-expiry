import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEn from "./translation.en";
import translationKo from "./translation.ko";

const resource = {
  en: { translation: translationEn },
  ko: { translation: translationKo },
};

i18n
  .use(initReactI18next)
  .init({
    resources: resource,
    lng: "ko",
    fallbackLng: {
      'en-US': ['es-us'],
      default: ['ko-KR']
    },
    debug: true,
    // defaultNS: 'translations',
    // ns: 'translations',
    keySeparator: ".", //nested object 사용
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;