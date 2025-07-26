import { RiAccountCircleLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { PiLockKeyOpenLight } from "react-icons/pi";
import { BsPersonCheck } from "react-icons/bs";
import { LuBookmark, LuEyeOff } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiUserSettingsLine } from "react-icons/ri";
import { FiTag } from "react-icons/fi";
import { BiCommentDetail } from "react-icons/bi";
import { LuRefreshCw } from "react-icons/lu";
import { PiTextAaLight } from "react-icons/pi";
import { FaRegHandPointer } from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdArrowBackIos, MdOutlineSubscriptions } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineLanguage } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { TbSettingsCheck } from "react-icons/tb";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { ThemeContext } from "../context/ContextProvider";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { IoSunnyOutline } from "react-icons/io5";
import { GoMoon } from "react-icons/go";
import SwitchTheme from "./SwitchTheme";
import { GiBackwardTime } from "react-icons/gi";

const SettingsSidebar = () => {
    const { theme, activeSettings, setActiveSettings, setSwitchTheme } = useContext(ThemeContext)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { userData } = useSelector((state) => state.user)


    const settingsMenu = [
        { type: "heading", name: "How you use Instagram" },
        { type: "item", name: "Edit profile", icon: <RiAccountCircleLine size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/editprofile` },
        { type: "item", name: "Saved", icon: <LuBookmark size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/saved` },
        { type: "item", name: "Archive", icon: <GiBackwardTime size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/archive` },
        { type: "item", name: "Notifications", icon: <IoIosNotificationsOutline size={25} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },

        { type: "heading", name: "Who can see your content" },
        { type: "item", name: "Account privacy", icon: <PiLockKeyOpenLight size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Close Friends", icon: <BsPersonCheck size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Blocked", icon: <LuEyeOff size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Hide story and live", icon: <HiOutlineUserGroup size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },

        { type: "heading", name: "How others can interact with you" },
        { type: "item", name: "Messages and story replies", icon: <RiUserSettingsLine size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Tags and mentions", icon: <FiTag size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Comments", icon: <BiCommentDetail size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Sharing and reuse", icon: <LuRefreshCw size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Restricted accounts", icon: <LuEyeOff size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Hidden Words", icon: <PiTextAaLight size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },

        { type: "heading", name: "What you see" },
        { type: "item", name: "Muted accounts", icon: <LuEyeOff size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Content preferences", icon: <FaRegHandPointer size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Like and share counts", icon: <HiOutlineSpeakerphone size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Subscriptions", icon: <MdOutlineSubscriptions size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },

        { type: "heading", name: "Your app and media" },
        { type: "item", name: "Archiving and downloading", icon: <BsDownload size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Switch appearance", icon: <> {theme === 'dark' ? < GoMoon size={21} /> : theme === 'light' ? <IoSunnyOutline size={21} /> :
                    <>
                        <IoSunnyOutline size={21} className=" dark:hidden block" />
                        <GoMoon size={21} className=" dark:block hidden" />
                    </>
        }</>, path: `/settings/${userData?.user?.username || userData?.user?._id}/theme`},
        { type: "item", name: "Accessibility", icon: <IoIosSettings size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Language", icon: <MdOutlineLanguage size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Website permissions", icon: <FaRegUserCircle size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },

        { type: "heading", name: "For families" },
        { type: "item", name: "Family Center", icon: <MdOutlineFamilyRestroom size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },

        { type: "heading", name: "For professionals" },
        { type: "item", name: "Account type and tools", icon: <HiOutlineUserGroup size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Meta Verified", icon: <TbSettingsCheck size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },

        { type: "heading", name: "More info and support" },
        { type: "item", name: "Help", icon: <FaRegQuestionCircle size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Privacy Center", icon: <MdOutlinePrivacyTip size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Account Status", icon: <HiOutlineStatusOnline size={24} />, path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
        { type: "item", name: "Log Out", },
    ];

    const handleLogOut =async () => {
        try {
            let result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, { withCredentials: true })
            console.log(result);
            dispatch(setUserData(null))
            localStorage.removeItem('token')
            setTimeout(() => navigate('/login', { replace: true }), 1000)
        } catch (error) {
            console.log(error)
        }
    }

    //-----------------------------------------------------------------------------------

    const handleTheme = (path, name) => {
        setSwitchTheme(true);
        navigate(path, { replace: true });
        setActiveSettings(name)
    }

   

    return (
        <div className="w-full h-fit overflow-auto scrollable pb-10 pr-8 md:pb-0 pt-15 md:pt-0">
            <div className="w-full hidden md:block"><h2 className={`text-xl font-bold py-10 ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Settings</h2></div>
            <div className={`w-full fixed top-0 left-0 flex items-center justify-center py-3 border-b-1 gap-2 md:hidden ${theme === 'dark' ? 'bg-black text-white border-[#363636]' : (theme === 'light') ? 'bg-white text-black border-[#d3d3d3]' : ' bg-white dark:bg-black text-black dark:text-white  border-[#d3d3d3] dark:border-[#363636]'}`}>
                <MdArrowBackIos onClick={() => { navigate(-1) }} size={24} className="cursor-pointer absolute left-6 flex md:hidden active:scale-95 text-[#ffffffe7] transition-all duration-200 ease-in-out " />
                <h2 className={`text-md font-semibold ${theme === 'dark' ? 'text-white ' : (theme === 'light') ? 'text-black ' : ' text-black  dark:text-white'}`}>
                    Settings and privacy</h2>
            </div>
            {settingsMenu.map((item) => (
                item.type === "heading" ? (
                    <h3 key={item.name} className="text-[11px] text-[#adaca5] font-medium px-2 py-1">{item.name}</h3>
                ) : (
                        <div key={item.name} onClick={() => { item.name === 'Log Out' ? handleLogOut() : item.name === 'Switch appearance' ? handleTheme(item?.path, item.name) : navigate(item?.path, { replace: true }); setActiveSettings(item.name); }} className={`flex items-center gap-3 w-full py-4 pl-3 rounded-lg cursor-pointer ${activeSettings === item.name && theme === 'dark' ? 'bg-[#3c3c3c] hover:bg-[#262626] ' : (activeSettings === item.name && theme === 'light') ? 'bg-[#f2f2f2] ' : theme === 'dark' ? ' hover:bg-[#262626] ' : (theme === 'light') ? 'bg-white hover:bg-[#f8f7f7] ' : activeSettings === item.name ? 'bg-[#262626]' : ''}`}>
                        {item?.icon}
                        <span className={`${item.name === 'Log Out' ? 'text-red-500' : ''} text-sm`}>{item.name}</span>
                    </div>
                )
            ))}
           
        </div>
    )
}

export default SettingsSidebar
