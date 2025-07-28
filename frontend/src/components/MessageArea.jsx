import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dp from '../assets/dp.webp';
import { GoInfo } from "react-icons/go";
import { IoArrowBack } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { TbPhoto } from "react-icons/tb";


const MessageArea = ({ setMessageUsers }) => {

  const { theme } = useContext(ThemeContext);
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
  const { identifier } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({})
  const [input, setInput] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/users/getuserprofile/${identifier}`, {
                withCredentials: true
            });
            setUser(result.data.user);
        } catch (error) {
            console.log(error);
        }
    }
    fetchUser();
  }, [identifier , serverUrl])


  return (
    <div className={`relative w-full h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-[black] text-white' : (theme === 'light') ? 'bg-white text-black' : 
    'bg-white dark:bg-black text-black dark:text-white'} `}>
      <nav className={`z-50 w-full h-fit flex items-center justify-between px-5 py-4 border-b-1 ${theme === 'dark' ? 'border-[#363636] bg-black' : (theme === 'light') ? 'border-[#d3d3d3] bg-white' : ' border-[#d3d3d3] dark:border-[#363636]'}`}>
        <div className="flex items-center gap-3 cursor-pointer">
          <IoArrowBack onClick={() => { setMessageUsers(prev => [...prev, user]); navigate(-1) }} size={24} className={`cursor-pointer active:opacity-55 transition-all duration-200 ease-in-out ${theme === 'dark' ? 'text-[#ffffff]' : (theme === 'light') ? 'text-[#000000]' : ' text-[#000000] dark:text-[#ffffff]'}  `} />
          <img src={user?.profilepic || dp} alt=" profile pic" className="w-10 h-10 rounded-full object-cover" />
          <p className={`text-md font-medium ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>{user?.username || user?.name}</p>
        </div>
        <GoInfo size={24} className={` ${theme === 'dark' ? 'text-[#ffffff]' : (theme === 'light') ? 'text-[#000000]' : ' text-[#000000] dark:text-[#ffffff]'} cursor-pointer `} />
      </nav>
      <div className="w-full h-full flex flex-col px-5 items-center justify-start overflow-y-scroll scrollbar-hide scrollbar-auto pt-8 gap-3">
        <img src={user?.profilepic || dp} alt="profile pic" className="w-16 h-16 md:w-22 md:h-22 rounded-full object-cover" />
        <p className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>{user?.username || user?.name}</p>
        <button onClick={() => { navigate(`/profile/${user?.username || user?._id}`) }} className={`px-3 py-[5px] md:px-4 md:py-2 cursor-pointer rounded-lg ${theme === 'dark' ? 'bg-[#363C44] hover:bg-[#68656575] text-white' : (theme === 'light') ? 'bg-[#f0f0f0] hover:bg-[#cecdcd] text-black' : 'bg-[#0095f6] text-white'} font-semibold text-sm`}>View profile</button>
      </div>
      <div className={`w-[95%] mx-auto h-fit px-3 border-1 my-4 ${theme === 'dark' ? 'bg-[#000000] border-[#363636]' : (theme === 'light') ? 'bg-white border-[#d3d3d3]' : ' bg-white dark:bg-black'} rounded-full flex items-center justify-start gap-3`}>
        <GrEmoji size={24} className={` ${theme === 'dark' ? 'text-[#ffffff]' : (theme === 'light') ? 'text-[#000000]' : ' text-[#000000] dark:text-[#ffffff]'} cursor-pointer `} />
        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Message..." className={`w-full h-fit py-[10px] outline-none ${theme === 'dark' ? 'bg-[#000000] text-white' : (theme === 'light') ? 'bg-[#ffffff] text-black' : ' bg-white dark:bg-black text-black dark:text-white'}`} />
        { !input && <TbPhoto size={24} className={` ${theme === 'dark' ? 'text-[#ffffff]' : (theme === 'light') ? 'text-[#000000]' : ' text-[#000000] dark:text-[#ffffff]'} cursor-pointer `} />}
        {input && <button disabled={input === ''} className={`px-3 py-[5px] md:px-4 md:py-2 cursor-pointer rounded-lg text-[#0095f6] hover:text-[#0094f6e0] active:scale-96 transition-all duration-200 ease-in-out font-semibold text-sm`}>Send</button>}
      </div>
    </div>
  )
}

export default MessageArea;
