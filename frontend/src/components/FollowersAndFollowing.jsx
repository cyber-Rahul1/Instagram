import { useContext } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import dp from '../assets/dp.webp'
import Suggested from "../pages/Suggested";
import { IoChevronBack } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const FollowersAndFollowing = ({ showFollowers, setShowFollowers, showFollowing, setShowFollowing, identifier }) => {

    const { theme } = useContext(ThemeContext);
    const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [text, setText] = useState('')
    const navigate = useNavigate()




    useEffect(() => {
        if (showFollowers) {
            const fetchFollowers = async () => {
                try {
                    let result = await axios.get(`${serverUrl}/api/users/getfollowers/${identifier}`, { withCredentials: true });
                    console.log(result.data);
                    setFollowers(result.data)
                } catch (error) {
                    console.log(error);
                }
            }
            fetchFollowers();
        } else if (showFollowing) {
            const fetchFollowing = async () => {
                try {
                    let result = await axios.get(`${serverUrl}/api/users/getfollowing/${identifier}`, { withCredentials: true });
                    console.log(result.data);
                    setFollowing(result.data)
                } catch (error) {
                    console.log(error);
                }
            }
            fetchFollowing();
        }
    }, [showFollowers, showFollowing, identifier, serverUrl])

    return (
        <div onClick={(e) => { e.stopPropagation(); }} className={` h-screen w-screen md:w-100 md:h-100 flex flex-col items-center justify-start ${theme === 'dark' ? 'bg-[#262626] text-white' : (theme === 'light') ? 'bg-[#FFFFFF] text-black' : ' bg-white dark:bg-black text-black dark:text-white'} md:rounded-xl`}>
            <div className={`relative w-full h-fit flex items-center justify-center border-b-1 py-2 ${theme === 'dark' ? 'border-[#363636]' : (theme === 'light') ? 'border-[#d3d3d3]' : ' border-[#d3d3d3] dark:border-[#363636]'}`}>
                {showFollowers && <p className="text-md font-medium ">Followers</p>}
                {showFollowing && <p className="text-md font-medium ">Following</p>}
                <IoChevronBack onClick={() => { showFollowers ? setShowFollowers(false) : setShowFollowing(false) }} size={20} className={`${(theme === 'dark') ? 'text-[#ffffffe7]' : (theme === 'light') ? 'text-[#000000d0]' : ' text-black dark:text-[#ffffff7c]'} cursor-pointer absolute left-4 md:hidden`} />
                <RxCross2 onClick={() => { setShowFollowers(false); setShowFollowing(false) }} size={20} className={`${(theme === 'dark') ? 'text-[#ffffffe7]' : (theme === 'light') ? 'text-[#000000d0]' : ' text-black dark:text-[#ffffff7c]'} cursor-pointer absolute right-4 md:block hidden `} />
            </div>
            <div className="w-full h-fit flex items-center justify-center pt-2 px-4">
                <input value={text} onChange={(e) => { setText(e.target.value) }} type="text" placeholder="Search" className={`w-90 py-2 pl-3 border-none rounded-lg outline-none text-sm dark:text-gray-300 text-[#000000d6] z-10 mb-2 ${theme === 'dark' ? 'bg-[#363636] text-white' : (theme === 'light') ? 'bg-[#FFFFFF] text-black' : ' bg-white dark:bg-black text-black dark:text-white'}`} />
            </div>
            <div className="w-full h-fit flex flex-col items-start justify-start overflow-y-auto overflow-x-hidden ">
                <div className="w-full h-fit flex flex-col items-start justify-start ">
                    {(following?.length === 0 && followers?.length === 0) && <p className={`text-md font-medium text-center w-full py-4 ${theme === 'dark' ? 'text-[#ffffffe7]' : (theme === 'light') ? 'text-[#000000d0]' : ' text-black dark:text-[#ffffff7c]'} `}>No results found.</p>}
                    {showFollowers && <div className="w-full h-fit flex flex-col items-center justify-center">
                        {followers?.filter(follower => follower?.name?.toLowerCase().includes(text.toLowerCase()) || follower?.username?.toLowerCase().includes(text.toLowerCase())).map(follower => (
                            <div key={follower._id} className="w-full h-fit flex items-center justify-between py-2 px-4">
                                <div className="flex items-center gap-2">
                                    <img src={follower?.profilepic || dp} alt="profile pic" className="w-10 h-10 rounded-full object-cover" />
                                    <div className="flex flex-col">
                                        <p onClick={() => { navigate(`/profile/${follower?.username || follower?._id}`); setShowFollowers(false); setShowFollowing(false) }} className="cursor-pointer text-sm font-semibold">{follower?.name}</p>
                                        <p className="text-[14px] text-[#848485]">@{follower?.username}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>}
                    {showFollowing && <div className="w-full h-fit flex flex-col items-center justify-center">
                        {following?.filter(following => following?.name?.toLowerCase().includes(text.toLowerCase()) || following?.username?.toLowerCase().includes(text.toLowerCase())).map(following => (
                            <div key={following._id} className="w-full h-fit flex items-center justify-between py-2 px-4">
                                <div className="flex items-center gap-2">
                                    <img src={following?.profilepic || dp} alt="profile pic" className="w-10 h-10 rounded-full object-cover" />
                                    <div className="flex flex-col">
                                        <p onClick={() => { navigate(`/profile/${following?.username || following?._id}`); setShowFollowers(false); setShowFollowing(false) }} className="cursor-pointer text-sm font-semibold">{following?.name}</p>
                                        <p className="text-[14px] text-[#848485]">@{following?.username}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>}
                    <p className={`text-md font-medium text-start w-full py-4 pl-4 ${theme === 'dark' ? 'text-[#ffffffe7]' : (theme === 'light') ? 'text-[#000000d0]' : ' text-black dark:text-[#ffffff7c]'} `}>Suggested for you</p>
                    <div className="w-full h-fit flex flex-col items-start justify-start px-4 gap-4 py-2 ">
                        <Suggested page='main' setShowFollowers={setShowFollowers} setShowFollowing={setShowFollowing} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FollowersAndFollowing
