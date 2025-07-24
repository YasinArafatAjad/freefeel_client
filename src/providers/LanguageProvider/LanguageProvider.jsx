import { createContext, useEffect, useState } from "react";

// Create Context
export const LanguageContext = createContext();

// Provider Component
const LanguageProvider = ({ children }) => {
  // Load saved language from localStorage or default to 'ban'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "ban";
  });

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("language", language);

    const elements = document.querySelectorAll(".font-dynamic");

    elements.forEach((element) => {
      if (language === "ban") {
        element.classList.add("font-secondary");
        element.classList.remove("font-primary");
      } else {
        element.classList.add("font-primary");
        element.classList.remove("font-secondary");
      }
    });
  }, [language]);

  return <LanguageContext.Provider value={{ language, setLanguage }}> {children}</LanguageContext.Provider>;
};

export default LanguageProvider;
