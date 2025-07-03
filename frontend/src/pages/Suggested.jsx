import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ContextProvider";



const Suggested = () => {

    const { theme, setActiveItem, setSearchIsFocussed, setNotificationIsFocussed } = useContext(ThemeContext);

    useEffect(() => {
        document.title = 'Instagram';
      }, []);
    
    
    return (
        <div onClick={() => {setActiveItem('Home'); setSearchIsFocussed(false); setNotificationIsFocussed(false);}} className={` ${(theme === 'dark') ? 'bg-black text-white' : (theme === 'light') ? 'bg-[#ffffff] text-black' : ' dark:bg-black dark:text-white bg-white'}  flex h-screen w-full`}>
            Suggested Page
        </div>
    )
}

export default Suggested
