import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import SwitchTheme from "../components/SwitchTheme";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { GoMoon } from "react-icons/go";
import { IoSunnyOutline } from "react-icons/io5";



const Theme = () => {
    const navigate = useNavigate()
    const { theme, setTheme, switchTheme, setSwitchTheme } = useContext(ThemeContext)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (windowWidth > 700) {
            navigate(-1, { replace: true });
        }
    }, [navigate, windowWidth]);

    return (
        <div className={`${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} flex flex-col h-screen w-full`}>
            <div className={`w-full gap-3 fixed top-0 left-0 px-2 py-4 bg flex items-center justify-center ${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'}`}>
                <MdArrowBackIos onClick={() => { navigate(-1) }} size={24} className="absolute left-6 cursor-pointer flex md:hidden active:scale-95 text-[#908d8d84] transition-all duration-200 ease-in-out " />
                <h1 className="text-md font-bold">Switch appearance</h1>
                {theme === 'dark' ? < GoMoon size={18} /> : theme === 'light' ? <IoSunnyOutline size={18} /> :
                    <>
                        <IoSunnyOutline size={18} className=" dark:hidden block" />
                        <GoMoon size={18} className=" dark:block hidden" />
                    </>
                }
            </div>
            <div onClick={() => { setSwitchTheme(false); }} className="w-screen h-screen  flex items-start justify-center pt-20">
                <SwitchTheme switchTheme={switchTheme} setSwitchTheme={setSwitchTheme} theme={theme} setTheme={setTheme} page='settings' />
            </div>
        </div>
    )
}

export default Theme
