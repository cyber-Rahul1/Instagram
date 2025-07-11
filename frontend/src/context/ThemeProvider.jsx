import { useRef, useState } from "react";
import { ThemeContext } from "./ContextProvider";




const ThemeProvider = ({ children }) => {
    let image = useRef()
    const [theme, setTheme] = useState('dark');
    const [activeItem, setActiveItem] = useState('Home');
    const [active, setActive] = useState('POSTS')
    const [viewPost, setViewPost] = useState(false);
    const [postId, setPostId] = useState('')
    const [switchTheme, setSwitchTheme] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [searchIsFocussed, setSearchIsFocussed] = useState(false)
    const [activeSettings, setActiveSettings] = useState('settings')
    const [notificationIsFocussed, setNotificationIsFocussed] = useState(false)
    return (
        <ThemeContext.Provider value={{ postId, setPostId, showComment, setShowComment, viewPost, setViewPost, activeSettings, setActiveSettings, image ,theme, setTheme, activeItem, setActiveItem, active, setActive, switchTheme, setSwitchTheme, searchIsFocussed, setSearchIsFocussed, notificationIsFocussed, setNotificationIsFocussed }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
