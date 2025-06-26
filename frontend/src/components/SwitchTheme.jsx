import { GoMoon } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";

const SwitchTheme = ({ setTheme, theme, setSwitchTheme, setBottomActive }) => {
    return (
        <div>
            <div className="flex items-center justify-between py-[11px] my-1 px-3 mx-2 rounded-lg">
                <div className="flex items-center gap-2">
                    <IoIosArrowBack onClick={() => {setSwitchTheme(false); setBottomActive('More')}} size={16} className="cursor-pointer active:scale-95 text-[#908d8d84] transition-all duration-200 ease-in-out " />
                    <p className=" text-md font-medium">Switch appearance</p>
                </div>
                {theme === 'dark' ? < GoMoon size={21} /> : theme === 'light' ? <IoSunnyOutline size={21} /> :
                    <>
                        <IoSunnyOutline size={21} className=" dark:hidden block" />
                        <GoMoon size={21} className=" dark:block hidden" />
                    </>
                }
            </div>
            <hr className={`w-full h-[1px] outline-none border-none  ${theme === 'dark' ? 'bg-[#363636] ' : (theme === 'light') ? 'bg-[#dedbdb]' : ' bg-[#f2f2f2] dark:bg-[#363636]'}`} />
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'dark' : 'dark')} className={`cursor-pointer flex items-center justify-between gap-32 py-[17px] my-[10px] px-3 mx-2 rounded-lg ${theme === 'dark' ? 'bg-[#262626] text-white active:bg-[#6a6969] hover:bg-[#3c3c3c]' : (theme === 'light') ? 'bg-white active:bg-[#dedede] hover:bg-[#f2f2f2] text-black' : ' hover:bg-[#f2f2f2] active:bg-[#dedede] text-black dark:text-white dark:active:bg-[#6a6969] dark:hover:bg-[#3c3c3c]'}`}>

                <p className=" text-sm ">Dark mode</p>
                <div className={`w-7 px-1  py-[2px] flex items-center ${theme === 'dark' ? 'bg-[#e2e1e1]' : (theme === 'light') ? 'bg-[#dedbdb]' : ' bg-[#dedbdb] dark:bg-[#e2e1e1]'} rounded-full`}>
                    <div className={`w-3 h-3  rounded-full ${theme === 'dark' ? 'translate-x-[10px]' : theme === 'light' ? 'translate-x-0' : ' translate-x-0 dark:translate-x-[10px]'} transition-all duration-200 ease-in-out ${theme === 'dark' ? 'bg-[#302f2f]' : (theme === 'light') ? 'bg-[#ffffff]' : ' bg-[#ffffff] dark:bg-[#302f2f]'}`} />
                </div>

            </button>
        </div>

    )
}

export default SwitchTheme
