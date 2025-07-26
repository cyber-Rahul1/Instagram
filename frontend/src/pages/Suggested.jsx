import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import axios from "axios";
import dp from '../assets/dp.webp';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



const Suggested = ({ page }) => {

    const { theme, setActiveItem, setSearchIsFocussed, setNotificationIsFocussed } = useContext(ThemeContext);
    const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
    const [mostFollowedusers, setMostFollowedUsers] = useState([])
    const [mostFollowedusersInMain, setMostFollowedUsersInMain] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { userData } = useSelector((state) => state.user)

    //-----------------------------------------------------------------------------------

    useEffect(() => {
        document.title = 'Instagram';
    }, []);


    //-----------------------------------------------------------------------------------

    useEffect(() => {
        setLoading(true);
        const fetchMostFollowedUsers = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/users/getallmostfollowedusers`, { withCredentials: true });
                setMostFollowedUsers(result.data?.users);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        fetchMostFollowedUsers();
    }, [serverUrl]);

    //-----------------------------------------------------------------------------------

    useEffect(() => {
        if (page === 'main') {
            setMostFollowedUsersInMain(mostFollowedusers?.slice(0, 5));
        }
    }, [page, mostFollowedusers]);

    //-----------------------------------------------------------------------------------

    const handleFollow = async (user) => {
        try {
            let result = await axios.get(`${serverUrl}/api/users/followandunfollow/${user?._id}`, { withCredentials: true });
            console.log(result.data);
            if (result.data.message === 'User unfollowed successfully') {
                setMostFollowedUsers(prev => prev.filter(u => u._id !== user._id));
            } else if (result.data.message === 'User followed successfully') {
                setMostFollowedUsers(prev => [...prev, user]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //-----------------------------------------------------------------------------------

    if (loading) {
        return <div className="w-screen h-screen flex items-center justify-center">
            <div className="h-10 w-10 border-t-1 border-b-1  border-[white] rounded-full animate-spin transition-all duration-500 ease-in-out" />
        </div>
    }

    //-----------------------------------------------------------------------------------

    if (page === 'main') {
        return mostFollowedusersInMain?.map((user, index) => {
            return (
                <div key={user?._id || index} className={`flex items-start justify-between gap-3  w-full`}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img src={user?.profilepic || dp} alt="profile pic" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <p onClick={() => { navigate(`/profile/${user?.username || user?._id}`) }} className="cursor-pointer text-sm font-semibold">{user?.username}</p>
                            <p className="text-[14px] text-[#848485]">Suggested for you</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center h-full gap-3">
                        <button onClick={() => { handleFollow(user) }} className={`text-xs font-medium ${userData?.user?.following?.some(u => u === user?._id) ? 'text-[#6b6b6b]' : 'text-[#008cff]'} cursor-pointer active:scale-95 ${theme === 'dark' ? 'hover:text-[#ffffffdd]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`}>{userData?.user?.following?.some(u => u === user?._id) ? 'Following' : (userData?.user?.followers?.some(u => u === user?._id)) ? 'Follow back' : 'Follow'}</button>
                    </div>
                </div>
            )
        })
    }

    //-----------------------------------------------------------------------------------



    return (
        <div onClick={() => { setActiveItem('Home'); setSearchIsFocussed(false); setNotificationIsFocussed(false); }} className={` ${(theme === 'dark') ? 'bg-black text-white' : (theme === 'light') ? 'bg-[#ffffff] text-black' : ' dark:bg-black dark:text-white bg-white'}  flex h-screen items-start justify-center w-full overflow-y-auto overflow-x-hidden `}>
            <div className={` h-fit flex flex-col items-center justify-center gap-4  ${page === 'main' ? 'md:w-70 pt-0' : 'w-full md:w-140 pt-15'}`}>
                <div className="w-full flex items-center justify-start p-3">
                    <p className={`text-md font-semibold ${page === 'main' ? 'hidden' : ''} ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Suggested</p>
                </div>
                {mostFollowedusers?.map((user, index) => {
                    return (
                        <div key={user?._id || index} className={`flex items-center justify-between gap-3  w-full p-3`}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <img src={user?.profilepic || dp} alt="profile pic" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <p onClick={() => { navigate(`/profile/${user?.username || user?._id}`) }} className="cursor-pointer text-sm font-semibold">{user?.username}</p>
                                    <p className="text-[14px] text-[#848485]">Suggested for you</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => { handleFollow(user) }} className={`px-4 py-1 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out cursor-pointer active:scale-95 ${(theme === 'dark' && userData?.user?.following?.some(u => u === user?._id)) ? 'bg-[#686565a4] hover:bg-[#68656575]' : theme === 'dark' ? 'bg-[#008cff] hover:bg-[#008cffbe]' : theme === 'light' && userData?.user?.following?.some(u => u === user?._id) ? 'bg-[#f0f0f0] hover:bg-[#cecdcd]' : (theme === 'light') ? 'bg-[#008cff] hover:bg-[#008cffbe]' : 'bg-[#0095f6] hover:bg-[#0085e6]'} text-white`}>{userData?.user?.following?.some(u => u === user?._id) ? 'Following' : (userData?.user?.followers?.some(u => u === user?._id)) ? 'Follow back' : 'Follow'}</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Suggested
