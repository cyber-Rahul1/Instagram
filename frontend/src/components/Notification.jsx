import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import dp from '../assets/dp.webp';
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";


const Notification = () => {

  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { theme } = useContext(ThemeContext);
  const { userData } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);

  //-----------------------------------------------------------------------------------


  useEffect(() => {
    if (userData) {
      setNotifications(userData?.user?.notifications);
    }
  }, [userData]);

  //-----------------------------------------------------------------------------------


  const handleFollow = async (authorId) => {
    try {
      let result = await axios.get(`${serverUrl}/api/users/followandunfollow/${authorId}`, { withCredentials: true });
      if (result.data.message === 'User unfollowed successfully') {
        dispatch(setUserData(result.data.updatedUser))
      } else if (result.data.message === 'User followed successfully') {
        dispatch(setUserData(result.data.updatedUser))
      }
    } catch (error) {
      console.log(error);
    }
  }

  //-----------------------------------------------------------------------------------


  useEffect(() => {
    const setViewed = async () => {
      try {
        await axios.get(`${serverUrl}/api/posts/setviewed`, { withCredentials: true });
      } catch (error) {
        console.log(error);
      }
    }
    setViewed();
  }, [serverUrl])


  //-----------------------------------------------------------------------------------

  

  return (
    <div className={`w-full h-full flex flex-col items-start justify-start p-4 pt-15 md:pt-5 pl-5 ${theme === 'dark' ? 'bg-[black]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[black]'} gap-2`}>
      <div className="w-full flex flex-col items-start justify-start pb-3">
        <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} pb-2`}>Notifications</p>
        <p className={`text-md font-bold ${theme === 'dark' ? 'text-[#ffffffe5]' : (theme === 'light') ? 'text-[#000000db]' : ' text-[#000000d0] dark:text-[#ffffffe7]'} `}>This week</p>
      </div>
      {notifications?.length <= 0 && <div className="w-full h-full flex flex-col items-center justify-center gap-3">
        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-[#ffffffe7]' : (theme === 'light') ? 'text-[#000000d0]' : ' text-[#000000d0] dark:text-[#ffffffe7]'} `}>You don&apos;t have any notifications</p>
      </div>}
      {notifications?.length > 0 && <div className="w-full h-full flex flex-col items-start justify-start gap-5 overflow-y-auto overflow-x-hidden scrollbar-hide scrollbar-auto">
        {notifications?.map((notification) => {
          return (
            <div key={notification._id} className="w-full h-fit flex items-center justify-start gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={notification?.sender?.profilepic || dp} alt="profile pic" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-start justify-start ">
                <p onClick={() => { navigate(`/profile/${notification?.sender?.username}`) }} className={`text-xs cursor-pointer font-semibold ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>{notification?.message?.split(' ')[0]}
                  <span className={`${theme === 'dark' ? 'text-[#ffffffa3]' : (theme === 'light') ? 'text-[#000000d0]' : ' text-[#000000d0] dark:text-[#ffffffe7]'}`}>{' '} {notification?.message?.split(' ').slice(1).join(' ')}</span> </p>
                <p className="text-[12px] text-[#848485]">{moment(notification?.createdAt).fromNow()}</p>
              </div>
              {notification?.type === 'follow' && <button onClick={() => { handleFollow(notification?.sender?._id) }} className={`ml-auto cursor-pointer text-xs ${userData?.user?.following?.some(user => user === notification?.sender?._id) ? 'text-[#8f8f8f] border-1 px-2 py-1 rounded-md  border-[#7f7f7f]' : 'bg-[#008cff] text-white px-2 py-[6px] rounded-md hover:bg-[#008cffbe]'} text-xs font-medium `}>{userData?.user?.following?.some(user => user === notification?.sender?._id) ? 'Following' : 'Follow back'}</button>}
              {(notification?.type === 'like' || notification?.type === 'comment' || notification?.type === 'reply') && <div className={`ml-auto cursor-pointer rounded-md overflow-hidden`}>
                <img src={notification?.post?.image} alt="Post image" className="w-9 h-9 object-cover" />
              </div>}
            </div>
          )
        })}
      </div>}
    </div>
  )
}

export default Notification
