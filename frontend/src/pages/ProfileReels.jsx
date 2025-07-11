
import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { useDispatch, useSelector } from 'react-redux'
import EmptyPage from "../components/EmptyPage";
import { useParams } from "react-router-dom";
import { getUserReels } from "../redux/postSlice";
import LoginFooter from "../components/LoginFooter";
import PostCards from "../components/PostCards";


const ProfileReels = () => {

  const dispatch = useDispatch();
  const { identifier } = useParams();

  useEffect(() => {
    dispatch(getUserReels(identifier))
  }, [dispatch, identifier])

  const { theme, setActiveItem, setSearchIsFocussed, setNotificationIsFocussed } = useContext(ThemeContext);
  const { userProfile } = useSelector((state) => state.user)
  const { userReels, status } = useSelector((state) => state.post)

  const posts = userReels?.posts


  return (
    <div onClick={() => { setActiveItem('Reels'); setSearchIsFocussed(false); setNotificationIsFocussed(false); }} className={`${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} flex flex-col items-center justify-center pb-10 h-screen w-full px-1`}>
      <div className="w-full lg:w-[950px] h-fit flex flex-col items-center justify-center">
        {userProfile?.posts?.length === 0 && <EmptyPage page={'reels'} />}
        {userProfile?.posts?.length > 0 && <PostCards posts={posts} userProfile={userProfile} status={status} />}
      </div>
      <div className="w-full h-fit pt-10">
        <LoginFooter theme={theme} page={'posts'} />
      </div>
    </div>
  )
}

export default ProfileReels
