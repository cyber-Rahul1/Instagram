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
import LogOutPopup from "./LogOutPopup";
import axios from "axios";
import Report from "./Report";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";



const More = ({ setBottomActive }) => {

    const { theme, switchTheme, setSwitchTheme, setActive, setActiveSettings } = useContext(ThemeContext);
    const navigate = useNavigate()
    const [switchAccount, setSwitchAccount] = useState(false)
    const [logout, setLogout] = useState(false)
    const [report, setReport] = useState(false)
    const { userProfile, userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    

    const settingsMenuItems = [
        { name: "Settings", icon: <IoIosSettings size={23} />, path: "/settings" },
        { name: "Your activity", icon: <LuSquareActivity size={21} />, path: "/activity" },
        { name: "Saved", icon: <CgBookmark size={21} />, path: `/profile/${userProfile?.username || userProfile?._id}/saved` },
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
            setActiveSettings('settings')
        } else if (name === 'Report a problem') {
            setReport(true);
            
        } else if (name === 'Saved') {
            setActive('SAVED')
            setSwitchTheme(false);
            setBottomActive('')
            navigate(path)
            setActiveSettings('settings')
        } else if (name === 'Settings') {
            setActiveSettings('Edit profile')
            setSwitchTheme(false);
            setBottomActive('')
            navigate(`/settings/${userData?.user?.username || userData?.user?._id}/editprofile`)
            
        } else {
            setSwitchTheme(false);
            setBottomActive('');
            navigate(path)
            setActiveSettings('settings')
        }
        

    }

    const handleLogOut = async () => {

        setLogout(true);
       try {
           let result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, { withCredentials: true })
           console.log(result);
           dispatch(setUserData(null))
           setTimeout(() => {
               setLogout(false)
               localStorage.removeItem('token')
               navigate('/login', { replace: true })
           }, 1000);
           
       } catch (error) {
          console.log(error)
       }
    }

    return (
        <div className=" flex flex-col w-full h-fit z-10">
            <div className={`flex flex-col rounded-2xl ${switchTheme ? 'w-0 h-0 opacity-0 pointer-events-none transition-all duration-200' : 'w-[270px] h-fit '}  ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white ' : ' bg-white dark:bg-[#262626]'} transition-all duration-200 ease-in-out`}>
                <div className="flex flex-col p-2 ">
                    {settingsMenuItems.map((item, index) => (
                        <div key={index} onClick={() => handleClick(item.path, item.name)} className={` ${theme === 'dark' ? ' hover:bg-[#3c3c3c] text-white active:bg-[#6a6969]' : (theme === 'light') ? ' text-black hover:bg-[#f2f2f2] active:bg-[#dedede]' : ' text-black hover:bg-[#f2f2f2] active:bg-[#dedede] dark:text-white dark:active:bg-[#6a6969] dark:hover:bg-[#3c3c3c]'} flex items-center gap-3 px-[12px] py-[15px] cursor-pointer  active:scale-95  transition-all duration-200 ease-in-out rounded-lg`}>
                            <div className="flex items-center">{item.icon}</div>
                            <p className=" text-sm">{item.name}</p>
                        </div>
                    ))}
                </div>
                <hr className={`w-full h-[6px] outline-none border-none ${theme === 'dark' ? 'bg-[#363636]' : (theme === 'light') ? 'bg-[#f2f2f2]' : ' bg-[#f2f2f2] dark:bg-[#363636]'}`} />
                <div onClick={() => { setSwitchAccount(true);  }} className={`flex items-center gap-3 py-[15px] my-2 px-3 mx-2 cursor-pointer  active:scale-95 transition-all duration-200 ease-in-out rounded-lg ${theme === 'dark' ? 'text-white hover:bg-[#3c3c3c] active:bg-[#6a6969]' : (theme === 'light') ? 'text-black hover:bg-[#f2f2f2] active:bg-[#dedede]' : 'hover:bg-[#f2f2f2] active:bg-[#dedede] text-black dark:text-white dark:active:bg-[#6a6969] dark:hover:bg-[#3c3c3c]'}`}>
                    <p className=" text-sm">Switch accounts</p>
                </div>
                <hr className={`w-full h-[1px] outline-none border-none  ${theme === 'dark' ? 'bg-[#363636] ' : (theme === 'light') ? 'bg-[#f2f2f2]' : ' bg-[#f2f2f2] dark:bg-[#363636]'}`} />
                <div onClick={() => {  handleLogOut() }} className={`flex items-center gap-3 py-[15px] my-2 px-3 mx-2 cursor-pointer active:scale-95 transition-all duration-200 ease-in-out rounded-lg ${theme === 'dark' ? 'text-white hover:bg-[#3c3c3c] active:bg-[#6a6969]' : (theme === 'light') ? 'text-black hover:bg-[#f2f2f2] active:bg-[#dedede]' : 'hover:bg-[#f2f2f2] active:bg-[#dedede] text-black dark:text-white dark:active:bg-[#6a6969] dark:hover:bg-[#3c3c3c]'}`}>
                    <p className=" text-sm">Log out</p>
                </div>
            </div>
            {(switchAccount) && <div onClick={() => { setSwitchAccount(false); }} className="fixed top-0 z-50 left-0 w-screen h-screen  flex items-center justify-center">
                <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-85" />
                <SwitchAccount setSwitchAccount={setSwitchAccount} />
            </div>}
            {(logout) && <div className="fixed top-0 z-50 left-0 w-screen h-screen  flex items-center justify-center">
                <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-85" />
                <LogOutPopup  />
            </div>}
            {(report) && <div onClick={() => { setReport(false); }} className="fixed top-0 z-50 left-0 w-screen h-screen  flex items-center justify-center">
                <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-85" />
                <Report setReport={setReport} />
            </div>}
        </div>
    )
}

export default More
