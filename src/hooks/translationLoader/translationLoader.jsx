import ban from "../../locales/ban.json";
import eng from "../../locales/eng.json";

const translations = { ban, eng };

export const getTranslation = (language) => translations[language];


// utils/getCurrentLanguage.js

// 2nd developer
export const getCurrentLanguage = () => {
  return localStorage.getItem("language") || "eng"; // default to English
};
