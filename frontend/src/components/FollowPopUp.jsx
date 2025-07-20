import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";
import { ThemeContext } from "../context/ContextProvider";
import { useContext, useState } from "react";
import dp from '../assets/dp.webp'
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";


const FollowPopUp = ({ setFollowPopup, userProfile, userData, setUserProfile2 }) => {


    const { theme } = useContext(ThemeContext);
    const { identifier } = useParams();
    const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    const menuOptions = [
        { label: "Add to close friends list", icon: AiFillStar },
        { label: "Add to favorites", icon: AiOutlineStar },
        { label: "Mute", icon: FiArrowRight },
        { label: "Restrict", icon: FiArrowRight },
        { label: "Unfollow", icon: null }
    ];


    const handleClick = async (label) => {
        if (label === "Unfollow") {
            setLoading(true)
            try {
                let result = await axios.get(`${serverUrl}/api/users/followandunfollow/${identifier}`, { withCredentials: true });
                console.log(result.data);
                if (result.data.message === 'User unfollowed successfully') {
                    setUserProfile2(prev => {
                        return {
                            ...prev,
                            followers: prev.followers.filter(user => user._id !== userData?.user?._id)
                        }
                    })
                } else if (result.data.message === 'User followed successfully') {
                    setUserProfile2(prev => {
                        return {
                            ...prev,
                            followers: [...prev.followers, userData?.user]
                        }
                    })
                }
                dispatch(setUserData(result.data.updatedUser))
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
            setFollowPopup(false);
        } else {
            setFollowPopup(false);
        }
    }

  return (
    <div onClick={(e) => { e.stopPropagation() }} className={`w-[80%] md:w-[400px] h-fit relative rounded-xl flex flex-col overflow-hidden items-center justify-center ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#262626]'}`}>
        <div onClick={() => { setFollowPopup(false) }} className='absolute top-3 right-3 cursor-pointer'>
            <RxCross2 size={24} className={`${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`} />
        </div>
        <div className="flex flex-col items-center gap-3 py-3">
            <img src={userProfile?.profilepic || dp} alt="profile pic" className="w-15 h-15 rounded-full object-cover" />
            <p className={`text-sm ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>{userProfile?.username || userProfile?.name}</p>
        </div>
      {menuOptions.map((option) => (
          <div key={option.label} className={`flex items-start justify-between w-full py-[13px] gap-3 ${theme === 'dark' ? 'hover:bg-[#3c3c3c]' : (theme === 'light') ? 'hover:bg-[#f2f2f2]' : ' hover:bg-[#f2f2f2] dark:hover:bg-[#3c3c3c]'} px-4  `}>
            <p onClick={() => { handleClick(option.label); }} className={`w-full text-xs ${theme === 'dark' ? 'text-white ' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} md:text-sm cursor-pointer hover:opacity-70 transition-all duration-200 ease-in-out ${loading ? 'opacity-50' : ''}`}>{option.label}</p>
            {option.icon && <option.icon size={20} />}
        </div>
      ))}
    </div>
  )
}

export default FollowPopUp
