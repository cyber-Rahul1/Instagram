
import { useDispatch, useSelector } from "react-redux"
import LoginFooter from "../components/LoginFooter";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { useParams } from "react-router-dom";
import { getAllComments, getAllPosts, getAllReplies } from "../redux/postSlice";
import PostCards from "../components/PostCards";
import ViewPostCards from "./ViewPostCards";


const Explore = () => {

  const dispatch = useDispatch();
  const { theme, viewPost, setViewPost, showComment, setShowComment, postId, setPostId } = useContext(ThemeContext)
  const { allPosts, status, error } = useSelector((state) => state.post)
  const { identifier } = useParams();
  const [posts, setPosts] = useState([])
  const [indexval, setIndexval] = useState(0)
  const [showReplies, setShowReplies] = useState({})
  const [viewReels, setViewReels] = useState(false)


  useEffect(() => {
    dispatch(getAllPosts())
    if (postId !== '') {
      dispatch(getAllComments(postId));
      dispatch(getAllReplies(postId));
    }
  }, [dispatch, identifier, postId])




  useEffect(() => {
    setPosts(allPosts?.posts)
  }, [allPosts, showComment])




  return (
    <div className={`w-full h-full flex flex-col items-center justify-start pt-4 pb-10 px-1 ${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} overflow-y-auto overflow-x-hidden`}>
      { <div className="w-full lg:w-[950px] h-fit flex flex-col items-center justify-center ">
        {<PostCards viewReels={viewReels} setViewReels={setViewReels} posts={posts} setShowComment={setShowComment} setViewPost={setViewPost} setIndexval={setIndexval} status={status} error={error} setPostId={setPostId} setShowReplies={setShowReplies} page={'explore'} />}
        {viewPost && <ViewPostCards viewReels={viewReels} page={'explore'} viewPost={viewPost} setViewReels={setViewReels} showReplies={showReplies} setShowReplies={setShowReplies} setViewPost={setViewPost} showComment={showComment} setShowComment={setShowComment} postId={postId} setIndexval={setIndexval} indexval={indexval} posts={posts} setPosts={setPosts} />}
        <div className="w-full h-fit pt-10">
          <LoginFooter theme={theme} page={'posts'} />
        </div>
      </div>}
    </div>
  )
}

export default Explore



