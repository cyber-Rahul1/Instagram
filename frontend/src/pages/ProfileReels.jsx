
import { useContext } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { useSelector } from 'react-redux'
import EmptyPage from "../components/EmptyPage";


const ProfileReels = () => {


  const { theme, setActiveItem, setSearchIsFocussed, setNotificationIsFocussed } = useContext(ThemeContext);
  const { userProfile } = useSelector((state) => state.user)

  return (
    <div onClick={() => { setActiveItem('Reels'); setSearchIsFocussed(false); setNotificationIsFocussed(false); }} className={`${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} flex h-screen w-full`}>
      <div className="w-full lg:w-[950px] h-fit flex flex-col items-center justify-center pb-10">
        {userProfile?.posts.length === 0 && <EmptyPage page={'posts'} />}
      </div>
    </div>
  )
}

export default ProfileReels
