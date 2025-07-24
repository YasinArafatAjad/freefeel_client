import { getTranslation } from "../translationLoader/translationLoader";
import useLanguage from "../useLanguage/useLanguage";

export const useTranslation = () => {
  const { language } = useLanguage();
  const translations = getTranslation(language);

  const t = (key) => {
    const keys = key.split("."); // Support nested keys like "header.title"
    return keys.reduce((obj, k) => (obj ? obj[k] : key), translations);
  };

  return { t };
};
