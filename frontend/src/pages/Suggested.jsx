import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ContextProvider";



const Suggested = () => {

    const { theme, setActiveItem } = useContext(ThemeContext);

    useEffect(() => {
        document.title = 'Instagram';
      }, []);
    
    
    return (
        <div onClick={() => setActiveItem('Home')} className={` ${(theme === 'dark') ? 'bg-black text-white' : (theme === 'light') ? 'bg-[#ffffff] text-black' : ' dark:bg-black dark:text-white bg-white'}  flex min-h-screen w-full`}>
            Suggested Page
        </div>
    )
}

export default Suggested
