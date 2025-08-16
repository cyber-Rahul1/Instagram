import { useDispatch, useSelector } from "react-redux"
import EmptyPage from "../components/EmptyPage"
import LoginFooter from "../components/LoginFooter";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { useParams } from "react-router-dom";
import { getAllComments, getAllReplies, getUserPosts } from "../redux/postSlice";
import PostCards from "../components/PostCards";
import ViewPostCards from "./ViewPostCards";



const Posts = () => {

  const dispatch = useDispatch();
  const { theme, viewPost, setViewPost, showComment, setShowComment, postId, setPostId } = useContext(ThemeContext)
  
  const { identifier } = useParams();
  const [posts, setPosts] = useState([])
  const [indexval, setIndexval] = useState(0)
  const [showReplies, setShowReplies] = useState({})
  const [viewReels, setViewReels] = useState(false)
  const [loading, setLoading] = useState(false)
  
  
  
  
  
  
  useEffect(() => {
    setLoading(true)
    dispatch(getUserPosts(identifier))
    setLoading(false)
    if (postId !== '') {
      dispatch(getAllComments(postId));
      dispatch(getAllReplies(postId));
    }
  }, [dispatch, identifier, postId])
  
  const { userPosts, status, error } = useSelector((state) => state.post)
  const { userProfile } = useSelector((state) => state.user)



  useEffect(() => {
    setPosts(userPosts?.posts);
  }, [userPosts])




  return (
    <div className="w-full lg:w-[950px] h-screen flex flex-col items-center justify-between mx-auto pb-10 px-1 ">
      {status === 'loading' && <div className={`w-full h-100 flex items-center justify-center`}>
        <div className={`h-15 w-15 border-t-1 border-b-1  ${theme === 'dark' ? 'border-[#ffffff]' : (theme === 'light') ? 'border-[#000000]' : ' border-[#000000] dark:border-[#ffffff]'} rounded-full animate-spin transition-all duration-500 ease-in-out`} /></div>}
      <div className="w-full h-fit">
        {posts?.length === 0 && <EmptyPage page={'posts'} />}
        {posts?.length > 0 && <PostCards viewReels={viewReels} setViewReels={setViewReels} posts={posts} setShowComment={setShowComment} userProfile={userProfile} setViewPost={setViewPost} setIndexval={setIndexval} loading={loading} error={error} setPostId={setPostId} setShowReplies={setShowReplies} />}
        {viewPost && <ViewPostCards viewPost={viewPost} viewReels={viewReels} setViewReels={setViewReels} showReplies={showReplies} setShowReplies={setShowReplies} setViewPost={setViewPost} showComment={showComment} setShowComment={setShowComment} postId={postId} setIndexval={setIndexval} indexval={indexval} posts={posts} setPosts={setPosts} />}
      </div>
      <div className="w-full h-fit pt-10">
        <LoginFooter theme={theme} page={'posts'} />
      </div>
    </div>
  )
}

export default Posts


