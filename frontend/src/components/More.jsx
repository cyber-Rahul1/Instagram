import { IoIosSettings } from "react-icons/io";
import { LuSquareActivity } from "react-icons/lu";
import { CgBookmark } from "react-icons/cg";
import { GoMoon } from "react-icons/go";
import { IoSunnyOutline } from "react-icons/io5";
import { TbMessageReport } from "react-icons/tb";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import SwitchAccount from "./SwitchAccount";



const More = ({ setBottomActive }) => {

    const { theme, switchTheme, setSwitchTheme } = useContext(ThemeContext);
    const navigate = useNavigate()
    const [switchAccount, setSwitchAccount] = useState(false)

    const settingsMenuItems = [
        { name: "Settings", icon: <IoIosSettings size={23} />, path: "/settings" },
        { name: "Your activity", icon: <LuSquareActivity size={21} />, path: "/activity" },
        { name: "Saved", icon: <CgBookmark size={21} /> },
        {
            name: "Switch appearance", icon: theme === 'dark' ? < GoMoon size={21} /> : theme === 'light' ? <IoSunnyOutline size={21} /> :
                <>
                    <IoSunnyOutline size={21} className=" dark:hidden block" />
                    <GoMoon size={21} className=" dark:block hidden" />
                </>
        },
        { name: "Report a problem", icon: <TbMessageReport size={21} /> }
    ];

    const handleClick = (path, name) => {
        if (name === 'Switch appearance') {
            setSwitchTheme(true);
            setBottomActive('')
        } else {
            setSwitchTheme(false);
            navigate(path)
        }

    }

    return (
        <div className=" flex flex-col w-full h-fit">
            <div className={`flex flex-col   rounded-2xl ${switchTheme ? 'w-0 h-0 opacity-0 pointer-events-none transition-all duration-200' : 'w-[270px] h-fit '}  ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white ' : ' bg-white dark:bg-[#262626]'} transition-all duration-200 ease-in-out`}>
                <div className="flex flex-col p-2 ">
                    {settingsMenuItems.map((item, index) => (
                        <div key={index} onClick={() => handleClick(item.path, item.name)} className={` ${theme === 'dark' ? ' hover:bg-[#3c3c3c] text-white active:bg-[#6a6969]' : (theme === 'light') ? ' text-black hover:bg-[#f2f2f2] active:bg-[#dedede]' : ' text-black hover:bg-[#f2f2f2] active:bg-[#dedede] dark:text-white dark:active:bg-[#6a6969] dark:hover:bg-[#3c3c3c]'} flex items-center gap-3 px-[12px] py-[15px] cursor-pointer  active:scale-95  transition-all duration-200 ease-in-out rounded-lg`}>
                            <div className="flex items-center">{item.icon}</div>
                            <p className=" text-sm">{item.name}</p>
                        </div>
                    ))}
                </div>
                <hr className={`w-full h-[6px] outline-none border-none ${theme === 'dark' ? 'bg-[#363636]' : (theme === 'light') ? 'bg-[#f2f2f2]' : ' bg-[#f2f2f2] dark:bg-[#363636]'}`} />
                <div onClick={() => { setSwitchAccount(true); }} className={`flex items-center gap-3 py-[15px] my-2 px-3 mx-2 cursor-pointer  active:scale-95 transition-all duration-200 ease-in-out rounded-lg ${theme === 'dark' ? 'text-white hover:bg-[#3c3c3c] active:bg-[#6a6969]' : (theme === 'light') ? 'text-black hover:bg-[#f2f2f2] active:bg-[#dedede]' : 'hover:bg-[#f2f2f2] active:bg-[#dedede] text-black dark:text-white dark:active:bg-[#6a6969] dark:hover:bg-[#3c3c3c]'}`}>
                    <p className=" text-sm">Switch accounts</p>
                </div>
                <hr className={`w-full h-[1px] outline-none border-none  ${theme === 'dark' ? 'bg-[#363636] ' : (theme === 'light') ? 'bg-[#f2f2f2]' : ' bg-[#f2f2f2] dark:bg-[#363636]'}`} />
                <div className={`flex items-center gap-3 py-[15px] my-2 px-3 mx-2 cursor-pointer active:scale-95 transition-all duration-200 ease-in-out rounded-lg ${theme === 'dark' ? 'text-white hover:bg-[#3c3c3c] active:bg-[#6a6969]' : (theme === 'light') ? 'text-black hover:bg-[#f2f2f2] active:bg-[#dedede]' : 'hover:bg-[#f2f2f2] active:bg-[#dedede] text-black dark:text-white dark:active:bg-[#6a6969] dark:hover:bg-[#3c3c3c]'}`}>
                    <p className=" text-sm">Log out</p>
                </div>
            </div>
            {switchAccount && <div onClick={() => { setSwitchAccount(false);  }} className="absolute -top-107 -left-3 w-screen h-screen bg-black opacity-85 flex items-center justify-center">
                <SwitchAccount setSwitchAccount ={setSwitchAccount} />
            </div>}
        </div>
    )
}

export default More
