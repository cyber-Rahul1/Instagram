import { useState } from 'react';
import heartfill from '../assets/heartfill.png'
import { format } from 'timeago.js';
import CommentInput from "../components/CommentInput";
import ViewPostImage from "../components/ViewPostImage";
import PostComments from "../components/PostComments";
import { GoHeart } from "react-icons/go";
import { FiMessageCircle } from "react-icons/fi";
import { TbSend } from "react-icons/tb";
import { BiBookmark } from "react-icons/bi";
import { RiBookmarkFill } from "react-icons/ri";
import EmojiPicker from 'emoji-picker-react';
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux"
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { useParams } from "react-router-dom";
import { getAllComments, getAllReplies, getUserPosts } from "../redux/postSlice";
import axios from "axios";



const ViewPostCards = ({ showReplies, setShowReplies, setViewPost, showComment, setShowComment, postId, setIndexval, indexval, posts, setPosts }) => {

  const [emoji, setEmoji] = useState(false)
  const { identifier } = useParams();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    dispatch(getUserPosts(identifier))
    if (postId !== '') {
      dispatch(getAllComments(postId));
      dispatch(getAllReplies(postId));
    }
  }, [dispatch, identifier, postId])

  const handleRight = () => {
    const nextIndex = indexval + 1;
    if (nextIndex >= posts?.length) {
      rightRef.current.style.display = "none";
      return;
    }

    setIndexval(nextIndex);
    dispatch(getAllComments(posts[nextIndex]?._id));
  };

  const handleLeft = () => {
    const prevIndex = indexval - 1;
    if (prevIndex < 0) {
      leftRef.current.style.display = "none";
      return;
    }

    setIndexval(prevIndex);
    dispatch(getAllComments(posts[prevIndex]?._id));
  };

  const { userPosts, allComments, allReplies, status } = useSelector((state) => state.post)
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
  const [loading, setLoading] = useState(false)
  const [reply, setReply] = useState(false)
  const [commentId, setCommentId] = useState('')
  const { userData } = useSelector((state) => state.user)
  const [comment, setComment] = useState('')
  const [likedUsers, setLikedUsers] = useState([])
  const [savedUsers, setSavedUsers] = useState([])
  const [liked, setLiked] = useState(false);
  const rightRef = useRef(null);
  const leftRef = useRef(null);




  useEffect(() => {
    setPosts(userPosts?.posts)
  }, [userPosts, showComment, setPosts])


  const handleAddComment = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/posts/postcomment`, { postid: postId, comment }, {
        withCredentials: true
      });
      console.log(result.data);
      setComment('')
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const handleAddReply = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (postId && commentId) {
      try {
        let result = await axios.post(`${serverUrl}/api/posts/addreply`, { postid: postId, commentid: commentId, reply: comment }, { withCredentials: true });
        console.log(result.data);
        setComment('')
        setLoading(false)
        setReply(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  }

  const handleLike = async () => {
    setLiked(true);
    setTimeout(() => setLiked(false), 500);
    try {
      const result = await axios.put(`${serverUrl}/api/posts/likepost`, { postid: postId }, {
        withCredentials: true
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchLikedUsers = async () => {
      if (postId) {
        try {
          let result = await axios.post(`${serverUrl}/api/posts/getalllikesonpost`, { postid: postId }, { withCredentials: true });
          setLikedUsers(result.data)
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchLikedUsers();
  }, [postId, serverUrl])


  const handleSave = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/posts/saved/${postId}`, {
        withCredentials: true
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/posts/getsavedusersonposts/${postId}`, { withCredentials: true });
        setSavedUsers(result.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchSaved();
  }, [postId, serverUrl])




  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center py-10 lg:px-0 md:px-18" >
      <div className="fixed top-0 left-0 z-10 w-screen bg-[#000000b9] h-screen" onClick={() => { setViewPost(false); setShowComment(false); }} />
      <div ref={leftRef} className={`absolute top-100 left-3 2xl:left-10 z-30 cursor-pointer ${indexval === 0 ? "hidden" : ""} `} onClick={(e) => { e.stopPropagation(); handleLeft(); }}>
        <IoIosArrowDropleftCircle size={40} className="text-white hidden md:block" />
      </div>
      <div ref={rightRef} className={` absolute top-100 right-3 2xl:right-10 z-30 cursor-pointer ${indexval === posts?.length - 1 ? "hidden" : ""} `} onClick={(e) => { e.stopPropagation(); handleRight(); }}>
        <IoIosArrowDroprightCircle size={40} className="text-white hidden md:block" />
      </div>
      <div onClick={(e) => { e.stopPropagation(); }} className=" flex w-fit 2xl:w-340 2xl:h-210 md:h-120 lg:h-150 xl:h-190 items-center justify-center z-10 overflow-hidden">
        <div className="lg:w-150 md:w-100 2xl:w-230 h-full hidden md:flex flex-col items-center justify-center z-10 overflow-hidden">
          <ViewPostImage liked={liked} handleLike={handleLike} posts={posts} indexval={indexval} />
        </div>
        <div className="2xl:w-130 xl:h-190 2xl:h-full 3xl:h-215 md:w-100 h-screen w-screen md:h-full pt-15 md:pt-0 overflow-auto bg-[black] md:bg-[#212328] pb-3 md:pb-0 rounded-l-md md:rounded-l-none rounded-r-md flex flex-col items-center justify-start md:justify-between z-10 md:overflow-hidden">
          {showComment && <div onClick={() => { setShowComment(false); }} className="w-screen md:hidden h-screen absolute z-20 -top-4 left-0" />}

          <div className="w-full h-fit flex items-center justify-between border-b-1 border-[#363636]">
            {posts?.map((post) => (
              <div key={post._id} className={`w-fit h-fit flex items-center justify-start p-4 gap-2 ${indexval === posts?.indexOf(post) ? "" : "hidden"}`}>
                <img src={post?.author?.profilepic} alt="author image" className="w-9 h-9 z-0 md:z-10 rounded-full object-cover" />
                <p className="text-white text-sm font-medium ml-2">{post.author?.username}</p>
              </div>
            ))}
            <div className="w-10 h-full pr-3 flex items-center justify-center cursor-pointer">
              <BsThreeDots size={20} className="text-white hover:opacity-50 cursor-pointer transition-all duration-200 ease-in-out" />
            </div>
          </div>
          <div className={`w-full xl:h-full 2xl:h-160 overflow-y-auto overflow-x-hidden  flex flex-col  ${(posts && posts[indexval]?.comments?.length == 0) ? 'justify-center items-center' : 'justify-start items-start'} border-b-1 border-[#363636]`}>
            <div className="w-full h-90 md:hidden flex flex-col items-center justify-center z-0 md:z-10 overflow-hidden">
              <ViewPostImage liked={liked} handleLike={handleLike} posts={posts} indexval={indexval} />
            </div>
            <div className="hidden w-full h-150 md:flex flex-col items-start justify-start overflow-y-auto overflow-x-hidden">
              <PostComments status={status} posts={posts} showComment={showComment} indexval={indexval} allComments={allComments} allReplies={allReplies} showReplies={showReplies} setShowReplies={setShowReplies} reply={reply} setReply={setReply} commentId={commentId} setCommentId={setCommentId} setComment={setComment} handleAddReply={handleAddReply} handleAddComment={handleAddComment} loading={loading} setLoading={setLoading} />
            </div>
            {showComment && <div className="fixed top-30 rounded-t-2xl left-0 z-50 w-screen bg-[#1a1a1a] h-[80%] flex md:hidden flex-col items-start justify-start overflow-y-auto overflow-x-hidden">
              <PostComments status={status} showComment={showComment} posts={posts} indexval={indexval} allComments={allComments} allReplies={allReplies} showReplies={showReplies} setShowReplies={setShowReplies} reply={reply} setReply={setReply} commentId={commentId} setCommentId={setCommentId} setComment={setComment} handleAddReply={handleAddReply} handleAddComment={handleAddComment} loading={loading} setLoading={setLoading} />
              <div className=" w-full h-fit fixed bg-[#1a1a1a] z-20 bottom-9 left-0 flex items-center justify-center pt-0 p-3 gap-3">

                <CommentInput theme={theme} reply={reply} commentId={commentId} setCommentId={setCommentId} comment={comment} setComment={setComment} handleAddReply={handleAddReply} handleAddComment={handleAddComment} loading={loading} setLoading={setLoading} setEmoji={setEmoji} emoji={emoji} />
              </div>
            </div>}
          </div>
          <div className="w-full h-fit p-3 flex items-center justify-between">
            <div className="w-fit h-fit flex items-center justify-start gap-3">
              {(posts && likedUsers.some(user => user._id === userData?.user?._id)) ? <img onClick={() => { handleLike() }} src={heartfill} alt="liked" className="w-7 h-7" /> : <GoHeart size={27} onClick={() => { handleLike() }} className="text-white cursor-pointer transition-all duration-200 ease-in-out hover:text-[#ffffff81]" />}
              <FiMessageCircle onClick={() => { setShowComment(!showComment); }} size={27} className="text-white cursor-pointer hover:text-[#ffffff81] transition-all duration-200 ease-in-out" />
              <TbSend size={27} className="text-white cursor-pointer hover:text-[#ffffff81] transition-all duration-200 ease-in-out" />
            </div>
            <div className="w-fit h-fit flex items-center justify-start gap-3">
              {(posts && savedUsers.some(user => user._id === userData?.user?._id)) ? <RiBookmarkFill onClick={() => { handleSave() }} size={27} className="text-white cursor-pointer" /> : <BiBookmark onClick={() => { handleSave() }} size={27} className="text-white cursor-pointer transition-all duration-200 ease-in-out hover:text-[#ffffff81]" />}
            </div>
          </div>
          <div className="w-full h-fit flex flex-col items-start px-3 justify-center">
            {(posts && posts[indexval]?.likes?.length === 0) ? <p className="text-white text-sm">Be the first to like this</p> : <p>{posts ? posts[indexval]?.likes?.length : 0} likes</p>}
            <p className="text-[#ffffff90] text-sm">{format(posts && posts[indexval]?.createdAt)}</p>
          </div>
          {emoji && <div onClick={() => { setEmoji(false) }} className="fixed hidden md:block top-0 left-0 w-full h-full bg-transparent " >
            <div className="absolute bottom-65 right-160 z-150">
              <EmojiPicker onEmojiClick={(emojiObject) => { console.log(emojiObject); setComment(prev => prev + emojiObject.emoji); setEmoji(false); }} height={300} width={250} theme={theme === 'dark' ? 'dark' : 'light'} emojiStyle="apple" searchDisabled={true} className='shadow-xl' />
            </div>
          </div>}

          <div className="hidden w-full h-fit md:flex items-center justify-center p-3 gap-3">
            <CommentInput theme={theme} reply={reply} commentId={commentId} setCommentId={setCommentId} comment={comment} setComment={setComment} handleAddReply={handleAddReply} handleAddComment={handleAddComment} loading={loading} setLoading={setLoading} setEmoji={setEmoji} emoji={emoji} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPostCards
