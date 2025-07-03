import { useContext } from "react";
import { ThemeContext } from "../context/ContextProvider";


const LogOutPopup = () => {

    const { theme } = useContext(ThemeContext);

    return (
        <div onClick={(e) => { e.stopPropagation() }} className={` w-fit h-fit relative rounded-xl flex flex-col items-center justify-center px-27 pt-5 ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#262626]'}`}>
            <h1 className={` text-xl tracking-tight ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Logging Out</h1>
            <p className={`pb-5 text-sm tracking-tight ${theme === 'dark' ? 'text-[#ffffff84]' : (theme === 'light') ? 'text-[#00000092]' : ' text-[#00000092] dark:text-[#ffffff84]'} mt-1 `}>You need to log back in.</p>
            <hr className={`absolute top-24 w-full h-[1px] outline-none border-none  ${theme === 'dark' ? 'bg-[#363636] ' : (theme === 'light') ? 'bg-[#f2f2f2]' : ' bg-[#f2f2f2] dark:bg-[#363636]'}`} />
            <p className={`text-sm tracking-tight ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} mt-4 pb-4`}>Log in</p>
        </div>
    )
}

export default LogOutPopup
