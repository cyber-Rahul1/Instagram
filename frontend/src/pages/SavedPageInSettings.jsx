
import { useDispatch, useSelector } from "react-redux"
import EmptyPage from "../components/EmptyPage"
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../context/ContextProvider"
import LoginFooter from "../components/LoginFooter"
import PostCards from "../components/PostCards"
import { getUserSavedPosts } from "../redux/postSlice"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import ViewPostCards from "./ViewPostCards"
import { AiOutlineLeft } from "react-icons/ai"

const SavedPageInSettings = () => {

  const dispatch = useDispatch();
  const [postType, setPostType] = useState('All')
  const [posts, setPosts] = useState([])
  const [viewReels, setViewReels] = useState(null)
  const [showReplies, setShowReplies] = useState({})
  const [savedPostId, setSavedPostId] = useState('')
  const [savedindexval, setSavedIndexval] = useState(0)


  //-----------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(getUserSavedPosts())
  }, [dispatch])
  

  //-----------------------------------------------------------------------------------

  const { theme, setViewPost, setShowComment, viewPost, showComment } = useContext(ThemeContext)
  const { userProfile } = useSelector((state) => state.user)
  const { userSavedPosts, status } = useSelector((state) => state.post)
  const navigate = useNavigate()
  const Allposts = userSavedPosts?.savedPosts

  //-----------------------------------------------------------------------------------

  useEffect(() => {
    setPostType('All')
    setPosts(Allposts)
  }, [Allposts])

  //-----------------------------------------------------------------------------------

  const handlePostType = (type) => {
    setPostType(type)
    if (type === 'All') {
      setPosts(Allposts)
    } else if (type === 'Reel') {
      setPosts(Allposts?.filter((post) => post.type === 'Reel'))
    } else if (type === 'Posts') {
      setPosts(Allposts?.filter((post) => post.type === 'Post'))
    } else {
      setPosts(Allposts)
    }
  }

  //-----------------------------------------------------------------------------------

  return (
    <div className={`${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} w-full  lg:w-[950px] h-fit flex flex-col items-center justify-start px-1 mt-0 m-auto`}>
      <div onClick={() => { navigate(`/profile/${userProfile?.username || userProfile?._id}`) }} className="cursor-pointer active:scale-95 w-full h-fit flex items-center justify-start py-3 gap-2">
        <IoIosArrowBack size={24}  className=" text-[#908d8de7] transition-all duration-200 ease-in-out " />
        <h1 className={`text-md font-bold  ${theme === 'dark' ? 'text-[#908d8de7]' : (theme === 'light') ? 'text-[#4c4b4b]' : ' text-black dark:text-[#908d8de7]'}`}>Saved</h1>
      </div>
      <div className="w-full h-fit flex items-center justify-start py-2 gap-3">
        <h3 onClick={() => { handlePostType('All') }} className={`text-xs md:text-md px-6 rounded-full py-1 border-1 cursor-pointer active:scale-95 ${postType === 'All' ? theme === 'dark' ? 'text-[white] bg-[#454444]' : (theme === 'light') ? 'text-black bg-[#c4c3c3]'  : ' text-black dark:text-white' : ''} ${theme === 'dark' ? 'text-[white] border-[#454444] ' : (theme === 'light') ? 'text-black border-[#c4c3c3] ' : ' text-black dark:text-white'}`}>All</h3>
        <h3 onClick={() => { handlePostType('Reel') }} className={`text-xs md:text-md px-6 rounded-full py-1 border-1 cursor-pointer active:scale-95 ${postType === 'Reel' ? theme === 'dark' ? 'text-[white] bg-[#454444]' : (theme === 'light') ? 'text-black bg-[#c4c3c3]' : ' text-black dark:text-white' : ''} ${theme === 'dark' ? 'text-[white] border-[#454444] ' : (theme === 'light') ? 'text-black border-[#c4c3c3] ' : ' text-black dark:text-white'}`}>Reels</h3>
        <h3 onClick={() => { handlePostType('Posts') }} className={`text-xs md:text-md px-6 rounded-full py-1 border-1 cursor-pointer active:scale-95 ${postType === 'Posts' ? theme === 'dark' ? 'text-[white] bg-[#454444]' : (theme === 'light') ? 'text-black bg-[#c4c3c3]' : ' text-black dark:text-white' : ''} ${theme === 'dark' ? 'text-[white] border-[#454444] ' : (theme === 'light') ? 'text-black border-[#c4c3c3] ' : ' text-black dark:text-white'}`}>Posts</h3>
      </div>
      <div className="w-full xl:w-[950px] flex-1 h-fit flex flex-col items-center justify-center pb-10 px-1 ">
        {userProfile?.saved?.length === 0 && <EmptyPage page={'saved'} />}
        {userProfile?.saved?.length > 0 && <PostCards posts={posts} setViewReels={setViewReels} viewReels={viewReels} setViewPost={setViewPost} setIndexval={setSavedIndexval} setShowComment={setShowComment} setPostId={setSavedPostId} setShowReplies={setShowReplies} userProfile={userProfile} status={status} page={'saved'} />}
        {viewPost && <div className="w-full h-full">
          <div className={`fixed top-0 left-0 z-10 w-full md:hidden h-14 flex items-center justify-center gap-4 border-b-1 ${theme === 'dark' ? 'bg-black text-white border-[#363636]' : (theme === 'light') ? 'bg-white border-[#d3d3d3] text-black' : ' bg-white dark:bg-black text-black dark:text-white'}`}>
            <div onClick={() => { setViewPost(false); setShowComment(false); }} className="absolute left-1 active:scale-95 cursor-pointer active:text-[#ffffff94]">
              <AiOutlineLeft size={24} />
            </div>
            <p className="text-[15px] font-semibold ">Post</p>
          </div>
          <ViewPostCards viewReels={viewReels} setViewReels={setViewReels} showReplies={showReplies} setShowReplies={setShowReplies} setViewPost={setViewPost} showComment={showComment} setShowComment={setShowComment} postId={savedPostId} setSavedPostId={setSavedPostId} setIndexval={setSavedIndexval} indexval={savedindexval} posts={posts} setPosts={setPosts} />
        </div> }
        <div className="w-full h-fit pt-10">
          <LoginFooter theme={theme} page={'posts'} />
        </div>
      </div>
    </div>
    
  )
}

export default SavedPageInSettings
