
import { BiMoviePlay, BiSolidMoviePlay } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { LuSquarePlus } from 'react-icons/lu';
import dp from '../assets/dp.webp';
import { useNavigate } from 'react-router-dom';


const MobileSidebar = ({ userData, activeItem, setActiveItem, theme, setActiveSettings }) => {
   
    let navigate = useNavigate()
    const menuItems = [
        { name: "Home", icon: <GoHome size={28} />, activeIcon: <GoHomeFill size={28} />, path: "/" },
        { name: "Search", icon: <FiSearch size={26} />, path: "/search" },
        { name: "Create", icon: <LuSquarePlus size={28} /> },
        { name: "Reels", icon: <BiMoviePlay size={28} />, activeIcon: <BiSolidMoviePlay size={28} />, path: "/reels" },
        { name: "Profile", icon: <img src={userData?.profilePic || dp} className={"w-6 h-6 rounded-full object-cover"} alt="Profile" />, path: `/profile/${userData?.user.username || userData?.user._id}` }
    ];

    return (
        <div className={`flex fixed bottom-0 z-40 left-0 w-full items-center border-t justify-around gap-1 ${theme === 'dark' ? 'bg-black border-[#363636]' : (theme === 'light') ? 'bg-white border-[#f2f2f2]' : ' bg-white dark:bg-black border-[#f2f2f2] dark:border-[#363636]'} h-14 z-50`}>
            {menuItems.map((item) => (
                <div key={item.name} onClick={() => { setActiveItem(item.name); setActiveSettings('settings'); navigate(item?.path) }} className={`active:text-[#ffffff94]  ${theme === 'dark' ? 'hover:bg-[#ffffff1a] ' : (theme === 'light') ? 'hover:bg-[#a09e9e2a] ' : ' dark:hover:bg-[#ffffff1a] hover:bg-[#a09e9e2a]  dark:text-white'}  active:scale-95 relative py-3 flex items-center gap-4  pl-2 cursor-pointer mr-2 rounded-xl transition-all duration-100 ease-in-out`}>
                    {(activeItem === "Profile" && item.name === "Profile") && <div className={`absolute w-7 h-7 rounded-full translate-x-1.5 border-2 ${theme === 'dark' ? 'border-[white]' : (theme === 'light') ? 'border-[black]' : ' border-[black] dark:border-[white]'}`} />}
                    <div className={`  ${theme === 'dark' ? 'text-white active:text-[#ffffff94]' : (theme === 'light') ? 'text-black active:text-[#706f6f94]' : 'active:text-[#706f6f94] dark:active:text-[#ffffff94] text-black dark:text-white'}  active:scale-95 relative py-3 flex items-center gap-4  pl-2 cursor-pointer mr-2 rounded-xl transition-all duration-200 ease-in-out`}>{activeItem === item.name ? item.activeIcon || item.icon : item.icon}</div>
                </div>
            ))}
        </div>
    )
}

export default MobileSidebar
