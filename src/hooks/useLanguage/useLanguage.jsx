import { useContext } from "react";
import { LanguageContext } from "../../providers/LanguageProvider/LanguageProvider";

const useLanguage = () => {
  const info = useContext(LanguageContext);
  
  return info;
};

export default useLanguage;
