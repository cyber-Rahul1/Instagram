import { useDispatch, useSelector } from "react-redux"
import EmptyPage from "../components/EmptyPage"
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ContextProvider"
import LoginFooter from "../components/LoginFooter"
import PostCards from "../components/PostCards"
import { getUserSavedPosts } from "../redux/postSlice"
import ViewPostCards from "./ViewPostCards"
import ProfileReels from "./ProfileReels";
const Saved = () => {

  const dispatch = useDispatch();
  const { theme, setViewPost, setShowComment, viewPost, showComment } = useContext(ThemeContext)
  const [savedindexval, setSavedIndexval] = useState(0)
  const [savedPostId, setSavedPostId] = useState('')
  const [savedPosts, setSavedPosts] = useState([])
  const [showReplies, setShowReplies] = useState({})
  const [viewReels, setViewReels] = useState(null)
 



  //-----------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(getUserSavedPosts())   
  }, [dispatch])   

  //-----------------------------------------------------------------------------------

  const { userProfile, userData } = useSelector((state) => state.user)
  const { userSavedPosts, status } = useSelector((state) => state.post)

  //-----------------------------------------------------------------------------------

  useEffect(() => {
    setSavedPosts(userSavedPosts?.savedPosts)
  }, [userSavedPosts])

  //-----------------------------------------------------------------------------------

  return (
    <>
      {userProfile?._id === userData?.user?._id ? <div className="w-full lg:w-[950px] h-fit flex flex-col items-center justify-center pb-10">
        {userProfile?.saved?.length > 0 && <p className="text-xs md:text-sm text-center text-[#ffffffa5] py-2">Only you can see what you've saved.</p>}
        {userProfile?.saved?.length === 0 && <EmptyPage page={'saved'} />}
        {userProfile?.saved?.length > 0 && <PostCards viewReels={viewReels} setViewReels={setViewReels} posts={savedPosts} userProfile={userProfile} status={status} setViewPost={setViewPost} setIndexval={setSavedIndexval} setShowComment={setShowComment} setPostId={setSavedPostId} setShowReplies={setShowReplies} page={'saved'} />}
        {viewPost && <ViewPostCards viewReels={viewReels} setViewReels={setViewReels} showReplies={showReplies} setShowReplies={setShowReplies} setViewPost={setViewPost} showComment={showComment} setShowComment={setShowComment} postId={savedPostId} setIndexval={setSavedIndexval} indexval={savedindexval} posts={savedPosts} setPosts={setSavedPosts} />}
        <div className="w-full h-fit pt-10">
          <LoginFooter theme={theme} page={'posts'} />
        </div>
      </div> :
        <ProfileReels />
      }
    </>
  )
}

export default Saved
