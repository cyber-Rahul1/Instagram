import { useContext, useEffect, useState } from 'react'
import { MdOutlineCameraAlt } from 'react-icons/md'
import { ThemeContext } from '../context/ContextProvider'
import { LuBookmark } from "react-icons/lu";
import { SquareUserRound } from 'lucide-react';
import { BiMoviePlay } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EmptyPage = ({ page }) => {

  const { theme, image } = useContext(ThemeContext)
  const {identifier} = useParams()
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
  const [userProfile, setUserProfile] = useState({})
  const { userData } = useSelector((state) => state.user)



  useEffect(() => {
    const fetchUser = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/users/getuserprofile/${identifier}`, {
          withCredentials: true
        });
        setUserProfile(result.data?.user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();


  }, [identifier, serverUrl])

  return (
    <div className="w-full lg:w-[950px] h-fit flex flex-col items-center justify-center px-3 pb-10">
      {<div className="w-full h-fit mt-20 md:mt-30 flex flex-col items-center justify-center">
        <div className="w-20 h-20 border-3  border-[#c3c3c3] rounded-full flex flex-col items-center justify-center">
          {page === 'posts' && <MdOutlineCameraAlt size={40} className="text-[#c3c3c3]" />}
          {page === 'saved' && <LuBookmark size={40} className="text-[#c3c3c3]" />}
          {page === 'tagged' && <SquareUserRound size={40} className="text-[#c3c3c3]" />}
          {page === 'reels' && <BiMoviePlay size={40} className="text-[#c3c3c3]" />}
        </div>
        <div className="flex flex-col items-center justify-center pb-20 md:pb-10">
          { userProfile?._id === userData?.user?._id && <h2 className={`text-2xl md:text-3xl font-bold mt-3 ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-[black]' : 'text-[black] dark:text-white'}`}>{page === 'posts' ? 'Share Photos' : page === 'saved' ? 'Saved' : page === 'reels' ? 'share a video' : 'Tagged'}</h2>}
          { userProfile?._id !== userData?.user?._id && <h2 className={`text-2xl md:text-3xl font-bold mt-3 ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-[black]' : 'text-[black] dark:text-white'}`}>{page === 'posts' ? 'No posts yet.' : page === 'saved' ? 'Saved' : page === 'reels' ? 'No reels yet.' : 'No Photos'}</h2>}
          <p className={` text-center text-xs md:text-sm mt-2 ${theme === 'dark' ? 'text-[#ffffffa5]' : (theme === 'light') ? 'text-[black]' : 'text-[black] dark:text-[#ffffffa5]'}`}>{page === 'posts' ? (
            userProfile?._id === userData?.user?._id ? 'When you share photos, they will appear on your profile.' : `When ${userProfile?.username || userProfile?.name} posts, you will see their photos and videos here.`
          ) : page === 'saved' ? (
            <>
              {userProfile?._id === userData?.user?._id ? 'Save photos and videos that you want to see again. No one is notified, and only you can see what you’ve saved.' : `When ${userProfile?.username || userProfile?.name} posts, you will see their photos and videos here.`}
            </>
          ) : page === 'reels' ? (
                <>{userProfile?._id === userData?.user?._id ? 'Share short videos with your friends and followers.' : `When ${userProfile?.username || userProfile?.name} posts, you will see their photos and videos here.`}</>
          ) : (
                  <>{userProfile?._id === userData?.user?._id && ("When people tag you in photos, they'll appear here.")}</>
          )}
          </p>
          {(page === 'posts' && userProfile?._id === userData?.user?._id) &&  <p onClick={() => image.current.click()} className="text-[#358be0] text-center font-semibold text-xs md:text-sm mt-3 cursor-pointer active:scale-97 hover:text-[#2a79c7cc]">Share your first photo.</p>}
        </div>
      </div>}
      
    </div>
  )
}

export default EmptyPage
