import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
const useTheme = () => {
    const { theme, toggle } = useContext(ThemeContext);
    return { theme, toggle };
}
export default useTheme;