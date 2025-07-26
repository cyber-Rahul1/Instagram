
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { useDispatch, useSelector } from 'react-redux'
import EmptyPage from "../components/EmptyPage";
import { useParams } from "react-router-dom";
import { getUserReels } from "../redux/postSlice";
import LoginFooter from "../components/LoginFooter";
import PostCards from "../components/PostCards";
import ViewPostCards from "./ViewPostCards";


const ProfileReels = () => {

  const dispatch = useDispatch();
  const { identifier } = useParams();
  //-----------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(getUserReels(identifier))
  }, [dispatch, identifier])

  //-----------------------------------------------------------------------------------

  const { theme, setActiveItem, setSearchIsFocussed, viewPost, setViewPost, setNotificationIsFocussed, setShowComment, showComment } = useContext(ThemeContext);
  const [reelsindexval, setReelsindexval] = useState(0)
  const [reelsPostId, setReelsPostId] = useState('')
  const [reels, setReels] = useState([])
  const [showReplies, setShowReplies] = useState({})
  const [viewReels, setViewReels] = useState(false)
  const { userProfile } = useSelector((state) => state.user)
  const { userReels, status } = useSelector((state) => state.post)

  //-----------------------------------------------------------------------------------

  useEffect(() => {
    setReels(userReels?.posts)
  }, [userReels, reels])

  //-----------------------------------------------------------------------------------

  return (
    <div onClick={() => { setActiveItem('Reels'); setSearchIsFocussed(false); setNotificationIsFocussed(false); }} className={` ${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} flex flex-col items-center justify-start pb-10 h-screen w-full px-1`}>
      <div className="w-full lg:w-[950px] h-fit flex flex-col items-center justify-center">
        {reels?.length === 0  && <EmptyPage page={'reels'} />}
        {reels?.length > 0 && <PostCards setViewReels={setViewReels} posts={reels} userProfile={userProfile} status={status} setViewPost={setViewPost} setIndexval={setReelsindexval} setShowComment={setShowComment} setPostId={setReelsPostId} setShowReplies={setShowReplies} page={'reels'} />}
        {viewPost && <ViewPostCards viewReels={viewReels} showReplies={showReplies} setShowReplies={setShowReplies} setViewPost={setViewPost} showComment={showComment} setShowComment={setShowComment} postId={reelsPostId} setIndexval={setReelsindexval} indexval={reelsindexval} posts={reels} setPosts={setReels} page={'reels'} />}
      </div>
      <div className="w-full h-fit pt-10">
        <LoginFooter theme={theme} page={'posts'} />
      </div>
    </div>
  )
}

export default ProfileReels
