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
import { RiMenuLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io";
import dp from '../assets/dp.webp';
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { useSelector } from "react-redux";
import Search from "./Search";
import Notification from "../components/Notification";
import More from "./More";
import SwitchTheme from "./SwitchTheme";
import MobileSidebar from "./MobileSidebar";
import HandlePosts from "./HandlePosts";



const Sidebar = () => {
  let navigate = useNavigate()
  const location = useLocation();
  const { activeItem, setActiveItem, viewPost, setViewPost, theme, setShowComment, setTheme, switchTheme, setSwitchTheme, searchIsFocussed, setSearchIsFocussed, notificationIsFocussed, setNotificationIsFocussed, setActiveSettings } = useContext(ThemeContext)
  const { userData } = useSelector((state) => state.user)
  const [create, setCreate] = useState(false)
  const [bottomActive, setBottomActive] = useState('')
  const [imgSelected, setImgSelected] = useState(false)
  const [searchtop, setSearchTop] = useState(false)
  const fileInputRef = useRef(null);
  const [notificationTop, setNotificationTop] = useState(false)


  const menuItems = [
    { name: "Home", icon: <GoHome size={28} />, activeIcon: <GoHomeFill size={28} />, path: "/" },
    { name: "Search", icon: <FiSearch size={26} /> },
    { name: "Explore", icon: <MdOutlineExplore size={28} />, activeIcon: <MdExplore size={28} />, path: "/explore" },
    { name: "Reels", icon: <BiMoviePlay size={26} />, activeIcon: <BiSolidMoviePlay size={26} />, path: "/reels" },
    { name: "Messages", icon: <BsSend size={23} />, activeIcon: <BsFillSendFill size={23} />, path: "/messages" },
    { name: "Notifications", icon: notificationIsFocussed ? <FaHeart size={24} /> : <FaRegHeart size={24} /> },
    { name: "Create", icon: <LuSquarePlus size={26} /> },
    { name: "Profile", image: userData?.user?.profilepic || dp, path: userData ? `/profile/${userData?.user?.username || userData?.user?._id}` : "/profile" }
  ];

  const extraMenuItems = [
    { name: "Meta AI", icon: <FaRegCircle size={22} />, path: "/soon" },
    { name: "Threads", icon: <BsThreads size={24} />, path: "/soon" },
    { name: "More", icon: <RiMenuLine size={26} /> }
  ];

  const handleItemClick = (name, path) => {
    if (name !== 'Search' && name !== 'Notifications' && name !== 'Create') {
      setSearchTop(false)
      setNotificationTop(false)
      setActiveItem(name);
      setSearchIsFocussed(false);
      setNotificationIsFocussed(false);
      navigate(path);
    } else if (name === 'Search') {
      setSearchTop(true)
      setNotificationTop(prev => !prev)
      setSearchIsFocussed(prev => !prev)
    } else if (name === 'Notifications') {
      setSearchTop(prev => !prev)
      setNotificationTop(true)
      setNotificationIsFocussed(prev => !prev)
    } else if (name === 'Create') {
      setCreate(true)
    }
    if (name === 'Home' || name === 'Explore') {
      document.title = 'Instagram';
    } else if (name === 'Reels') {
      document.title = 'Reels';
    } else if (name === 'Messages') {
      document.title = 'Inbox - Direct Messages';
    }

  }


  useEffect(() => {
    let CurrentURL = location.pathname.split('/').slice(0, 2).join('/');
    if (CurrentURL === '/profile') {
      setActiveItem('Profile')
    } else if (CurrentURL === '/') {
      setActiveItem('Home')
    } else if (CurrentURL === '/explore') {
      setActiveItem('Explore')
    } else if (CurrentURL === '/reels') {
      setActiveItem('Reels')
    } else if (CurrentURL === '/messages') {
      setActiveItem('Messages')

    }

  }, [location.pathname, setActiveItem])




  return (
    <>
      { create && <div>
        <HandlePosts setCreate={setCreate} imgSelected={imgSelected} fileInputRef={fileInputRef} setImgSelected={setImgSelected} />
      </div> }
      <div className="hidden relative md:block transition-all duration-200 ease-in-out">
        <div className={`flex flex-col justify-between ${(theme === 'dark') ? 'text-white bg-black transition-all duration-200 ease-in-out border-[#363636b4]' : (theme === 'light') ? 'text-black  bg-white border-gray-200' : ' text-black dark:text-white border-gray-200 dark:border-[#363636b4] dark:bg-black bg-white'}  h-screen  pt-6  ${activeItem === 'Messages' ? 'w-[70px] mr-0 pl-2' : 'w-[70px] 2xl:w-[340px] xl:w-[240px] pl-3'} transition-all duration-200 ease-in-out border-r`}>
          
          <div className="flex flex-col gap-3">
            <div onClick={() => { setActiveItem('Home'); navigate('/') }} className="flex flex-col">
              <IoLogoInstagram size={38} className={`${(searchIsFocussed || notificationIsFocussed || activeItem === 'Messages') ? '' : 'xl:hidden'}  active:text-[#ffffff94] pl-1 ml-1 mb-8 pt-2 cursor-pointer transition-all duration-200 ease-in-out ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`} />
              <h1 className={`heading text-[27px]  active:text-[#ffffff94] tracking-tight font-medium ${(theme === 'dark') ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} pl-1 ml-2 mb-5 pt-2 ${(searchIsFocussed || activeItem === 'Messages' || notificationIsFocussed) ? 'hidden ' : 'hidden xl:block '} cursor-pointer `}>Instagram</h1>
            </div>
            <div className={`flex flex-col gap-[7px] `}>
              {menuItems.map((item) => (
                <div key={item.name} onClick={() => { handleItemClick(item.name, item?.path); }} className={`active:text-[#ffffff94]  ${theme === 'dark' ? 'hover:bg-[#ffffff1a] ' : (theme === 'light') ? 'hover:bg-[#a09e9e2a] ' : ' dark:hover:bg-[#ffffff1a] hover:bg-[#a09e9e2a] dark:text-white'} active:scale-95 relative py-3 flex items-center gap-4 pl-3 cursor-pointer ${notificationIsFocussed || searchIsFocussed ? 'mr-[275px]' : 'mr-3'} rounded-xl transition-all duration-200 ease-in-out`}>
                  <div className={`${(searchIsFocussed && item.name === 'Search' && searchtop) || (notificationIsFocussed && item.name === 'Notifications' && notificationTop) ? 'block' : 'hidden'} ${(notificationIsFocussed && item.name === 'Notifications' && notificationTop) ? 'w-12 h-12 left-[1px]' : 'w-12 h-12 left-0.5'} absolute border-1 border-[#ffffffa4] rounded-lg  ${theme === 'dark' ? 'border-[#a09e9e5e]' : (theme === 'light') ? 'border-black' : ' border-[black] dark:border-[#ffffffa4]'}`} />
                  {(activeItem === "Profile" && item.name === "Profile") && <div className={`absolute w-7 h-7 rounded-full -translate-x-0.5 border-2 ${theme === 'dark' ? 'border-[white]' : (theme === 'light') ? 'border-[black]' : ' border-[black] dark:border-[white]'}`} />}
                  {item.icon && <div className={`flex items-center `}>{activeItem === item.name ? item.activeIcon || item.icon : item.icon}</div>}
                  {item.image && <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center"><img src={item.image} className={"w-full h-full rounded-full object-cover"} alt="Profile" /></div>}
                  <p className={`text-md ${(searchIsFocussed || activeItem === 'Messages' || notificationIsFocussed) ? 'hidden' : 'hidden xl:block'}  ${activeItem === item.name ? 'font-bold' : 'font-normal'} transition-all duration-200 ease-in-out`}>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[7px] pl-1 mb-5">
            {extraMenuItems.map((item) => (
              <div key={item.name} onClick={() => { setBottomActive(item.name); navigate(item?.path) }} className=" flex active:text-[#ffffff94] active:scale-95  items-center gap-4  hover:bg-[#ffffff1a] pl-2  cursor-pointer mr-3 py-3 rounded-xl transition-all duration-200 ease-in-out">
                <div className="flex items-center">{item.icon}</div>
                <p className={`text-md  ${bottomActive === item.name ? 'font-bold' : 'font-normal'} ${(searchIsFocussed || activeItem === 'Messages' || notificationIsFocussed) ? 'hidden' : 'hidden xl:block'}`}>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        {bottomActive === 'More' && <div onClick={() => setBottomActive('')} className='absolute top-0 z-5 left-0 w-screen h-full bg-transparent' />}
        {bottomActive === 'More' &&
          <div className={`fixed bottom-18 z-50 left-[11px] rounded-2xl transition-all duration-200 ease-in-out ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white shadow-2xl' : ' bg-white shadow-2xl dark:shadow-0 dark:bg-black'}`}>
            <More setBottomActive={setBottomActive} />
          </div>}

        {switchTheme && <div onClick={() => { setBottomActive(''); setSwitchTheme(false) }} className='absolute top-0 z-30 left-0 w-screen h-full bg-transparent' />}
        {switchTheme && <div className={`fixed bottom-18 z-50 left-[11px] w-[270px] ${theme === 'dark' ? 'bg-[#262626] text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white text-black dark:text-white dark:bg-[#262626]'} transition-all duration-200 ease-in-out rounded-2xl shadow-xl `}>
          <SwitchTheme setTheme={setTheme} theme={theme} setSwitchTheme={setSwitchTheme} switchTheme={switchTheme} setBottomActive={setBottomActive} />
        </div>}
        <div style={{ boxShadow: '8px 0 20px -6px rgba(0, 0, 0, 0.2)' }} className={`${searchtop ? 'z-12' : ''} fixed top-0 left-[70px] h-screen rounded-r-2xl ${(searchIsFocussed) ? ' w-[400px]  border-r  bg-black' : 'w-0 opacity-0 pointer-events-none'} ${theme === 'dark' ? 'bg-black border-[#363636b4]' : (theme === 'light') ? 'bg-white border-gray-300' : ' dark:bg-black bg-white border-gray-200 dark:border-[#363636b4]'} transition-all duration-300 ease-in-out`}>
          <Search />
        </div>
        <div style={{ boxShadow: '8px 0 20px -6px rgba(0, 0, 0, 0.2)' }} className={`${notificationTop ? 'z-12' : ''} fixed top-0 left-[70px]  h-screen rounded-r-2xl ${(notificationIsFocussed) ? ' w-[400px]  border-r  bg-black' : 'w-0 opacity-0 pointer-events-none'} ${theme === 'dark' ? 'bg-black border-[#363636b4]' : (theme === 'light') ? 'bg-white border-gray-300' : ' dark:bg-black bg-white border-gray-200 dark:border-[#363636b4]'} transition-all duration-300 ease-in-out`}>
          <Notification />
        </div>
      </div>
      <div className="block md:hidden">
        <MobileSidebar viewPost={viewPost} setShowComment={setShowComment} setViewPost={setViewPost} menuItems={menuItems} userData={userData} activeItem={activeItem} setActiveItem={setActiveItem} theme={theme} handleItemClick={handleItemClick} setActiveSettings={setActiveSettings} />
      </div>
    </>
  )
}

export default Sidebar
