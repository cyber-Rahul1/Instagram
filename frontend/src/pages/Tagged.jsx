import { useDispatch, useSelector } from "react-redux"
import EmptyPage from "../components/EmptyPage"
import LoginFooter from "../components/LoginFooter"
import { useContext } from "react"
import { ThemeContext } from "../context/ContextProvider"
import PostCards from "../components/PostCards"
import ViewPostCards from "./ViewPostCards"
import { useState } from "react"
import { useEffect } from "react"
import { getUserTaggedPosts } from "../redux/postSlice"



const Tagged = () => {
  const dispatch = useDispatch();   
  const { theme, setViewPost, setShowComment, viewPost, showComment } = useContext(ThemeContext);   
    const [taggedindexval, setTaggedIndexval] = useState(0);   
    const [taggedPostId, setTaggedPostId] = useState('');   
    const [taggedPosts, setTaggedPosts] = useState([]);   
    const [showReplies, setShowReplies] = useState({});   
    const [viewReels, setViewReels] = useState(false)
  
     
    
    
    useEffect(() => {   
      dispatch(getUserTaggedPosts());   
    }, [dispatch])   
    
    const { userProfile } = useSelector((state) => state.user);   
    const { userTaggedPosts, status } = useSelector((state) => state.post);   

    
  useEffect(() => {
    setTaggedPosts(userTaggedPosts?.taggedPosts)   
  }, [userTaggedPosts])
  
  
  return (
    <div className="w-full lg:w-[950px] h-fit flex flex-col items-center justify-center pb-10 px-1">
      {userProfile?.tagged?.length === 0 && <EmptyPage page={'tagged'} />}
      {userProfile?.tagged?.length > 0 && <PostCards viewReels={viewReels} setViewReels={setViewReels} posts={taggedPosts} setShowComment={setShowComment} userProfile={userProfile} setIndexval={setTaggedIndexval} status={status} setViewPost={setViewPost} setPostId={setTaggedPostId} setShowReplies={setShowReplies} />}
      {(viewPost && taggedPosts?.length > 0) && <ViewPostCards viewReels={viewReels} setViewReels={setViewReels} showReplies={showReplies} setShowReplies={setShowReplies} setViewPost={setViewPost} showComment={showComment} setShowComment={setShowComment} postId={taggedPostId} setPostId={setTaggedPostId} setIndexval={setTaggedIndexval} indexval={taggedindexval} posts={taggedPosts} setPosts={setTaggedPosts} />}
      <div className="w-full h-fit pt-10">
        <LoginFooter theme={theme} page={'posts'} />
      </div>
    </div>
  )
}

export default Tagged


