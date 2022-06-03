import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider(props) {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
};
