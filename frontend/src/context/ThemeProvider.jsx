import { useState } from "react";
import { ThemeContext } from "./ContextProvider";




const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('');
    const [activeItem, setActiveItem] = useState('Home');
    const [switchTheme, setSwitchTheme] = useState(false)
    return (
        <ThemeContext.Provider value={{ theme, setTheme, activeItem, setActiveItem, switchTheme, setSwitchTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
