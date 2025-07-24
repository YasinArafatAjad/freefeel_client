import { useContext } from "react";
import { ThemeContext } from "../../providers/ThemeProvider/ThemeProvider";

const useTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return [theme, toggleTheme];
};

export default useTheme;
