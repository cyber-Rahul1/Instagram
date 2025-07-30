import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import MessageArea from "../components/MessageArea";
import { useNavigate, useParams } from "react-router-dom";
import messageBlack from '../assets/messageBlack.png';
import messageWhite from '../assets/messageWhite.png';
import { IoIosArrowDown } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import SwitchAccount from "../components/SwitchAccount";
import { BiSearch } from "react-icons/bi";
import dp from '../assets/dp.webp';
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";

const Message = () => {

  const { theme, setActiveItem, setSearchIsFocussed, setNotificationIsFocussed, setMessageArea, messagedUsers, setMessageUsers } = useContext(ThemeContext);
  const { userData } = useSelector((state) => state.user)
  const { identifier } = useParams();

  const timerRef = useRef(null)

  const [switchAcc, setSwitchAcc] = useState(false)
  const [isFoccused, setIsFocused] = useState(false)
  const [followingUsers, setFollowingUsers] = useState([]);
  const [showFollowing, setShowFollowing] = useState(false)
  const [search, setSearch] = useState('')
  const [allUsers, setAllUsers] = useState([])


  const navigate = useNavigate()
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

  let image = theme === 'dark' ? messageWhite : (theme === 'light') ? messageBlack : messageWhite;


  useEffect(() => {
    const getMessagedUsers = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/users/getmessagedusers`, { withCredentials: true });
        setMessageUsers(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMessagedUsers();
  }, [serverUrl])


  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/users/getallusers`, { withCredentials: true });
        setAllUsers(result.data.users);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllUsers();
  }, [])


  const fetchFollowing = async () => {
    setShowFollowing(true)
    try {
      let result = await axios.get(`${serverUrl}/api/users/getfollowing/${userData?.user?._id}`, { withCredentials: true });
      setFollowingUsers(result.data);
    } catch (error) {
      console.log(error);
    }
  }


  const handleAddMessagedUser = async (user) => {
    try {
      await axios.post(`${serverUrl}/api/users/addmessageduser`, { identifier: user?.username || user?._id }, { withCredentials: true });
      setMessageUsers(prev => [...prev, user]);
    } catch (error) {
      console.log(error);
    }
    navigate(`/messages/${user?.username || user?._id}`)
  }


  const handleSearch = (value) => {
    setSearch(value)
    if (value === '' || search === '') {
      setFollowingUsers([])
      return;
    }
    timerRef.current && clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setFollowingUsers(
        allUsers?.filter((user) => user?.username?.toLowerCase().includes(value.toLowerCase()) || user?.name?.toLowerCase().includes(value.toLowerCase()))
      );
    }, 1000);
  }



  return (
    <div onClick={() => { setActiveItem('Messages'); setSearchIsFocussed(false); setNotificationIsFocussed(false); }} className={`${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} flex h-screen overflow-hidden w-full`}>
      {switchAcc && <div onClick={() => setSwitchAcc(false)} className="fixed top-0 left-0 z-60 w-full h-full flex flex-col bg-[#00000086] items-center justify-center ">
        <SwitchAccount setSwitchAccount={setSwitchAcc} />
      </div>}
      <div className={`${identifier ? 'hidden md:block' : ''} w-127 h-screen flex flex-col items-start justify-start border-r-1 ${theme === 'dark' ? 'border-[#363636]' : (theme === 'light') ? 'border-[#d3d3d3]' : ' border-[#d3d3d3] dark:border-[#363636]'} overflow-hidden`}>
        <div className="w-full h-fit flex items-center justify-between pt-3 md:pt-10 pb-4 px-7">
          <IoArrowBack onClick={() => { setMessageArea(false); navigate('/') }} size={24} className={`cursor-pointer md:hidden active:opacity-55 transition-all duration-200 ease-in-out ${theme === 'dark' ? 'text-[#ffffff]' : (theme === 'light') ? 'text-[#000000]' : ' text-[#000000] dark:text-[#ffffff]'}  `} />
          <div onClick={() => setSwitchAcc(true)} className="w-fit h-fit flex items-center justify-start gap-2 cursor-pointer active:opacity-55 transition-all duration-200 ease-in-out">
            <p className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>{userData?.user?.username || userData?.user?.name}</p>
            <IoIosArrowDown size={20} className={` ${theme === 'dark' ? 'text-[#ffffff94]' : (theme === 'light') ? 'text-[#313131]' : ' text-[#313131] dark:text-[#ffffff94]'}  `} />
          </div>
          <FiEdit size={24} className={` ${theme === 'dark' ? 'text-[#ffffff]' : (theme === 'light') ? 'text-[#000000]' : ' text-[#000000] dark:text-[#ffffff]'}  `} />
        </div>
        <div className="relative w-full h-fit flex items-center justify-start gap-2 px-4">
          <div className={`${(showFollowing || isFoccused) ? 'hidden' : ''} absolute left-7 flex items-center justify-center gap-4 pointer-events-none`}>
            <BiSearch size={20} className={` ${theme === 'dark' ? 'text-[#ffffff8f]' : (theme === 'light') ? 'text-[#0000008b]' : ' text-[#000000] dark:text-[#ffffff]'}  `} />
            <p className={`text-md ${theme === 'dark' ? 'text-[#ffffff8f]' : (theme === 'light') ? 'text-[#0000008b]' : ' text-[#000000] dark:text-[#ffffff]'}`}>Search</p>
          </div>
          <IoIosArrowBack onClick={() => { setSearch(''); setIsFocused(false); setShowFollowing(false); }} size={28} className={`${showFollowing || isFoccused ? '' : 'hidden'} cursor-pointer active:opacity-55 transition-all duration-200 ease-in-out ${theme === 'dark' ? 'text-[#ffffff]' : (theme === 'light') ? 'text-[#000000]' : ' text-[#000000] dark:text-[#ffffff]'}  `} />
          <input value={search} onChange={(e) => handleSearch(e.target.value)} onClick={fetchFollowing} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} type="text" placeholder={isFoccused || showFollowing ? 'Search' : ''} className={`w-full h-10 rounded-md outline-none pl-4 ${theme === 'dark' ? 'bg-[#121212] text-white' : (theme === 'light') ? 'bg-[#FFFFFF] text-black' : ' bg-white dark:bg-black text-black dark:text-white'} placeholder-[#A8A8A8]`} />
        </div>
        {!isFoccused && !showFollowing && <div className="w-full h-fit flex flex-col items-start justify-start px-4">
          <div className="w-fit h-fit flex flex-col items-center justify-center gap-2 py-6 px-2">
            <img src={userData?.user?.profilepic || dp} alt="profile pic" className="w-18 h-18 rounded-full object-cover" />
            <p className={`text-xs text-center ${theme === 'dark' ? 'text-[#ffffffa5]' : (theme === 'light') ? 'text-[#0000008c]' : ' text-black dark:text-white'}`}>Your note</p>
          </div>
          <div className="w-full h-fit flex items-start justify-between px-2">
            <p className={`text-md font-medium ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Messages</p>
            <p className={`text-sm ${theme === 'dark' ? 'text-[#ffffffa5]' : (theme === 'light') ? 'text-[#0000008c]' : ' text-black dark:text-white'} `}>Requests</p>
          </div>
        </div>}
        <div className={`w-full h-full flex items-start justify-start flex-col overflow-y-auto overflow-x-hidden scrollbar-hide scrollbar-auto pt-2`}>
          {showFollowing && <div className={`w-full h-full flex flex-col items-start justify-start pt-3 px-4 ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>
            {followingUsers?.map((user) => (
              <div key={user?._id} className="w-full h-fit flex items-start justify-start px-2 py-3 ">
                <div className="flex items-center gap-3">
                  <img src={user?.profilepic || dp} alt="profile pic" className="w-13 h-13 rounded-full object-cover" />
                  <div className="flex flex-col items-start justify-start gap-1">
                    <p onClick={() => { handleAddMessagedUser(user); }} className={`text-md font-medium cursor-pointer ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>{user?.username || user?.name}</p>
                    <p className={`text-xs  ${theme === 'dark' ? 'text-[#ffffffa5]' : (theme === 'light') ? 'text-[#0000008c]' : ' text-[#0000008c] dark:text-[#ffffffa5]'}`}>{user?.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>}
          {(!isFoccused && !showFollowing && messagedUsers?.length <= 0) && <div className="w-full h-full flex items-center justify-center">
            <p className={`text-md font-medium ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>No messages</p>
          </div>}
          {!isFoccused && !showFollowing && messagedUsers?.map((user) => (
            <div key={user?._id} className={`w-full h-fit flex items-center justify-between px-6 py-3 ${identifier === user?.username || identifier === user?._id ? theme === 'dark' ? 'bg-[#262626]' : theme === 'light' ? 'bg-[#f2f2f2]' : ' bg-[#f2f2f2] dark:bg-[#262626]' : ''}`}>
              <div onClick={() => { navigate(`/messages/${user?.username || user?._id}`) }} className={`flex items-center justify-start gap-3 cursor-pointer active:opacity-55 transition-all duration-200 ease-in-out `}>
                <img src={user?.profilepic || dp} alt="profile pic" className="w-13 h-13 rounded-full object-cover" />
                <div className="flex flex-col items-start justify-start">
                  <p className={`text-md font-medium  ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>{user?.username || user?.name}</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-[#ffffffa5]' : (theme === 'light') ? 'text-[#0000008c]' : ' text-[#0000008c] dark:text-[#ffffffa5]'} `}>Send a message to {user?.name || user?.username}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {identifier ? <div className="w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <MessageArea setMessageUsers={setMessageUsers} />
      </div> : <div className="w-full h-screen hidden md:flex flex-col items-center justify-center gap-2">
        <img src={image} alt="message" className="w-25 h-25 object-cover" />
        <p className={`text-2xl font-medium text-center ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Your messages</p>
        <p className="text-sm text-center text-[#ffffffa5]">Send a message to start a chat.</p>
      </div>}
    </div>
  )
}

export default Message
