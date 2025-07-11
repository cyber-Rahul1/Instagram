
import { useDispatch, useSelector } from "react-redux"
import EmptyPage from "../components/EmptyPage"
import { useContext, useEffect } from "react"
import { ThemeContext } from "../context/ContextProvider"
import LoginFooter from "../components/LoginFooter"
import PostCards from "../components/PostCards"
import { getUserSavedPosts } from "../redux/postSlice"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"

const SavedPageInSettings = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSavedPosts())
  }, [dispatch])

  const { theme } = useContext(ThemeContext)
  const { userProfile } = useSelector((state) => state.user)
  const { userSavedPosts, status } = useSelector((state) => state.post)
  const navigate = useNavigate()
  const posts = userSavedPosts?.savedPosts

  return (
    <div className={`${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} w-full  lg:w-[950px] h-fit flex flex-col items-center justify-start px-1 mt-0 m-auto`}>
      <div onClick={() => { navigate(-1) }} className="cursor-pointer active:scale-95 w-full h-fit flex items-center justify-start py-3 ">
        <IoIosArrowBack size={24}  className=" text-[#908d8de7] transition-all duration-200 ease-in-out " />
        <h1 className={`text-md font-bold  ${theme === 'dark' ? 'text-[#908d8de7]' : (theme === 'light') ? 'text-[#4c4b4b]' : ' text-black dark:text-[#908d8de7]'}`}>Saved</h1>
      </div>
      <div className="w-full h-fit flex items-center justify-start py-2 ">
        <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>All saved posts</h3>
      </div>
      <div className="w-full xl:w-[950px] flex-1 h-fit flex flex-col items-center justify-center pb-10 px-1 ">
        {userProfile?.saved?.length === 0 && <EmptyPage page={'saved'} />}
        {userProfile?.saved?.length > 0 && <PostCards posts={posts} userProfile={userProfile} status={status} />}
        <div className="w-full h-fit pt-10">
          <LoginFooter theme={theme} page={'posts'} />
        </div>
      </div>
    </div>
    
  )
}

export default SavedPageInSettings
