import { GoHome } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { MdOutlineExplore } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { BsSend } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { LuSquarePlus } from "react-icons/lu";
import { GoHomeFill } from "react-icons/go";
import { MdExplore } from "react-icons/md";
import { BiSolidMoviePlay } from "react-icons/bi";
import { BsFillSendFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { BsThreads } from "react-icons/bs";
import { FaRegCircle } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { IoLogoInstagram } from "react-icons/io";
import dp from '../assets/dp.webp';
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { useSelector } from "react-redux";
import Search from "./Search";
import Notification from "../components/Notification";
import More from "./More";
import SwitchTheme from "./SwitchTheme";

const Sidebar = () => {
  let navigate = useNavigate()
  const { activeItem, setActiveItem, theme, setTheme, switchTheme, setSwitchTheme } = useContext(ThemeContext)
  const { userData } = useSelector((state) => state.user)
  const [bottomActive, setBottomActive] = useState('')
  

  const menuItems = [
    { name: "Home", icon: <GoHome size={28} />, activeIcon: <GoHomeFill size={28} />, path: "/" },
    { name: "Search", icon: <FiSearch size={28} /> },
    { name: "Explore", icon: <MdOutlineExplore size={30} />, activeIcon: <MdExplore size={30} />, path: "/explore" },
    { name: "Reels", icon: <BiMoviePlay size={28} />, activeIcon: <BiSolidMoviePlay size={28} />, path: "/reels" },
    { name: "Messages", icon: <BsSend size={25} />, activeIcon: <BsFillSendFill size={25} />, path: "/messages" },
    { name: "Notifications", icon: <FaRegHeart size={26} />, activeIcon: <FaHeart size={26} /> },
    { name: "Create", icon: <LuSquarePlus size={28} /> },
    { name: "Profile", icon: <img src={userData?.profilePic || dp} className={"w-6 h-6 rounded-full object-cover"} alt="Profile" />, path: "/profile" }
  ];

  const extraMenuItems = [
    { name: "Meta AI", icon: <FaRegCircle size={26} />, path: "/soon" },
    { name: "Threads", icon: <BsThreads size={26} />, path: "/soon" },
    { name: "More", icon: <LuMenu size={26} /> }
  ];




  return (
    <div className="hidden md:block transition-all duration-200 ease-in-out ">
      <div className={`flex flex-col justify-between ${(theme === 'dark') ? 'text-white bg-black transition-all duration-200 ease-in-out dark:border-[#363636b4]' : (theme === 'light') ? 'text-black  bg-white border-gray-200' : ' text-black dark:text-white border-gray-200 dark:border-[#363636b4] dark:bg-black bg-white'}  h-screen pl-3 lg:pl-4 pt-6 ${(activeItem === 'Search' || activeItem === 'Messages' || activeItem === 'Notifications') ? 'w-[70px]' : 'lg:w-[340px] w-[70px]  '}  transition-all duration-200 ease-in-out border-r`}>
        <div className="flex flex-col gap-4">
          <div onClick={() => { setActiveItem('Home'); navigate('/') }} className="flex flex-col">
            <IoLogoInstagram size={38} className={`${(activeItem === 'Search' || activeItem === 'Messages' || activeItem === 'Notifications') ? '' : 'lg:hidden'}  active:text-[#ffffff94]  ml-1 mb-5 pt-2 cursor-pointer transition-all duration-200 ease-in-out ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`} />
            <h1 className={`heading text-[27px]  active:text-[#ffffff94] tracking-tight font-medium ${(theme === 'dark') ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} ml-2 mb-5 pt-2 ${(activeItem === 'Search' || activeItem === 'Messages' || activeItem === 'Notifications') ? 'hidden ' : 'hidden lg:block '} cursor-pointer `}>Instagram</h1>
          </div>
          <div className={`flex flex-col gap-1 `}>
            {menuItems.map((item) => (
              <div key={item.name} onClick={() => { setActiveItem(item.name); navigate(item?.path) }} className={`active:text-[#ffffff94]  ${theme === 'dark' ? 'hover:bg-[#ffffff1a] ' : (theme === 'light') ? 'hover:bg-[#a09e9e2a] ' : ' dark:hover:bg-[#ffffff1a] hover:bg-[#a09e9e2a]  dark:text-white'} active:scale-95 relative py-3 flex items-center gap-4  pl-2 cursor-pointer mr-2 rounded-xl transition-all duration-200 ease-in-out`}>
                <div className={`absolute  ${(activeItem === 'Profile' && item.name === 'Profile') ? 'border-1  rounded-full w-7 h-7 left-1.5' : (activeItem === 'Search' && item.name === 'Search') ? 'border-1  rounded-lg w-12 h-12 -left-0.5' : (activeItem === 'Notifications' && item.name === 'Notifications') ? 'border-1 rounded-lg w-12 h-12  -left-[2px]' : ''} ${(theme === 'dark' ? 'border-white' : (theme === 'light' && item.name === 'Profile') ? 'border-black' : (theme === 'light' && item.name !== 'Profile')) ? 'border-[#a09e9e5e] ' : (theme === 'system' && item.name === 'Profile') ? 'border-black dark:border-white' : 'dark:border-white border-[#a09e9e8d]  dark:text-white'}`} />
                
                <div className={`flex items-center`}>{activeItem === item.name ? item.activeIcon || item.icon : item.icon}</div>
                <p className={`text-md ${(activeItem === 'Search' || activeItem === 'Messages' || activeItem === 'Notifications') ? 'hidden' : 'hidden lg:block'}  ${activeItem === item.name ? 'font-bold' : 'font-normal'} transition-all duration-200 ease-in-out`}>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 mb-5">
          {extraMenuItems.map((item) => (
            <div key={item.name} onClick={() => { setBottomActive(item.name); navigate(item?.path) }} className="flex active:text-[#ffffff94] active:scale-95  items-center gap-4  hover:bg-[#ffffff1a] pl-2  cursor-pointer mr-3 py-3 rounded-xl transition-all duration-200 ease-in-out">
              <div className="flex items-center">{item.icon}</div>
              <p className={`text-md  ${activeItem === item.name ? 'font-bold' : 'font-normal'} ${(activeItem === 'Search' || activeItem === 'Messages' || activeItem === 'Notifications') ? 'hidden' : 'hidden lg:block'}`}>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      {bottomActive === 'More' && <div onClick={() => setBottomActive('')} className='absolute top-0 z-5 left-0 w-full h-full bg-transparent' />}
      {bottomActive === 'More' &&
        <div className={`fixed bottom-18 z-10 left-[11px] rounded-2xl  transition-all duration-200 ease-in-out ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white shadow-2xl' : ' bg-white shadow-2xl dark:shadow-0 dark:bg-black'}`}>
          <More setBottomActive={setBottomActive}/>
        </div>}
      {switchTheme && <div onClick={() => { setBottomActive(''); setSwitchTheme(false) }} className='absolute top-0 z-5 left-0 w-full h-full bg-transparent' />}
      {switchTheme && <div className={`fixed bottom-18 z-11 left-[11px] w-[270px] ${theme === 'dark' ? 'bg-[#262626] text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white text-black dark:text-white dark:bg-[#262626]'} transition-all duration-200 ease-in-out rounded-2xl shadow-xl `}>
        <SwitchTheme setTheme={setTheme} theme={theme} setSwitchTheme={setSwitchTheme} switchTheme={switchTheme} setBottomActive={setBottomActive} />
      </div>}
      <div style={{ boxShadow: '8px 0 20px -6px rgba(0, 0, 0, 0.2)' }} className={`fixed top-0 left-[70px] h-screen rounded-r-2xl ${(activeItem === 'Search') ? ' w-[400px]  border-r  bg-black' : 'w-0 opacity-0 pointer-events-none'} ${theme === 'dark' ? 'bg-black border-[#363636b4]' : (theme === 'light') ? 'bg-white border-gray-300' : ' dark:bg-black bg-white border-gray-200 dark:border-[#363636b4]'} transition-all duration-200 ease-in-out`}>
        <Search />
      </div>
      <div style={{ boxShadow: '8px 0 20px -6px rgba(0, 0, 0, 0.2)' }} className={`fixed top-0 left-[70px] h-screen rounded-r-2xl ${(activeItem === 'Notifications') ? ' w-[400px]  border-r  bg-black' : 'w-0 opacity-0 pointer-events-none'} ${theme === 'dark' ? 'bg-black border-[#363636b4]' : (theme === 'light') ? 'bg-white border-gray-300' : ' dark:bg-black bg-white border-gray-200 dark:border-[#363636b4]'} transition-all duration-200 ease-in-out`}>
        <Notification />
      </div>
    </div>
  )
}

export default Sidebar
