import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments, getAllReels } from "../redux/postSlice";
import { ThemeContext } from "../context/ContextProvider";
import heartfill from '../assets/heartfill.png'
import { LuDot } from "react-icons/lu";
import { register } from "timeago.js";
import { BsThreeDots } from "react-icons/bs";
import { BiBookmark } from "react-icons/bi";
import { TbSend } from "react-icons/tb";
import { FiMessageCircle } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { RiBookmarkFill } from "react-icons/ri";
import PostComments from "../components/PostComments";
import CommentInput from "../components/CommentInput";
import axios from "axios";
import CommentOptions from "../components/CommentOptions";
import dp from '../assets/dp.webp';
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/userSlice";
import EmojiPicker from "emoji-picker-react";


const Reels = () => {


  const { theme, setActiveItem, setSearchIsFocussed, postIdInMain, setPostIdInMain, setNotificationIsFocussed, setSameData, setViewReels, setShowComment, showComment, post, commentId, setCommentId, comment, loading, setLoading, setComment, reply, setReply, likedUsers, setLikedUsers, setAuthorId } = useContext(ThemeContext);
  const [emoji, setEmoji] = useState(false)
  const dispatch = useDispatch();
  
  const { allReels, status } = useSelector((state) => state.post)
  const { userData } = useSelector((state) => state.user)
  const navigate = useNavigate()

  const handleClick = (post) => {
    setPostIdInMain(post._id)
    setViewReels(true);
    
  }
  
  
  useEffect(() => {
    if (allReels) setPosts(allReels?.posts);
  }, [allReels])

  
  
  
  useEffect(() => {
    dispatch(getAllComments(postIdInMain));
  }, [dispatch, postIdInMain])
  

 

  const { allComments, allReplies } = useSelector((state) => state.post)
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

  let textTheme = theme === 'dark' ? 'text-[white]' : (theme === 'light') ? 'text-[#000000a5]' : ' text-[#000000a5] dark:text-[white]'
  let mainTextTheme = theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'
  let bgTheme = theme === 'dark' ? 'bg-[black] md:bg-[#212328] border-l-1 border-[#363636]' : (theme === 'light') ? 'bg-white border-l-1 border-[#d3d3d3]' : ' bg-white dark:bg-[#212328]'

  const [showDescription, setShowDescription] = useState(false)
  const [showOptions, setShowOptions] = useState('')
  const [showReplies, setShowReplies] = useState({})
  const [userSaved, setUserSaved] = useState({})
  const [showLike, setShowLike] = useState(false)
  const [posts, setPosts] = useState([])


  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  register('short', (number, index) => {
    return [
      ['just now', 'right now'],
      ['1m', 'in 1m'],
      ['%sm', 'in %sm'],
      ['1hr', 'in 1hr'],
      ['%shr', 'in %shr'],
      ['1d', 'in 1d'],
      ['%sd', 'in %sd'],
      ['1w', 'in 1w'],
      ['%sw', 'in %sw'],
      ['1mo', 'in 1mo'],
      ['%smo', 'in %smo'],
      ['1yr', 'in 1yr'],
      ['%syr', 'in %syr'],
    ][index];
  });



  useEffect(() => {
    const currentPost = post;
    if (currentPost?.likes) {
      setLikedUsers(currentPost.likes);
    }
    console.log(likedUsers)
  }, [post, likedUsers, setLikedUsers])




  useEffect(() => {
    dispatch(getAllReels());
  }, [dispatch])

  



  
 

  const handleAddComment = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/posts/postcomment`, { postid: postIdInMain, comment }, {
        withCredentials: true
      });
      console.log(result.data);
      setComment('')
      setLoading(false)
      dispatch(getAllComments(postIdInMain));
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }


  const handleClickOptions = (authorId) => {
    setShowOptions(!showOptions);
    setSameData(authorId === userData?.user?._id)
    setAuthorId(authorId)
  }

  useEffect(() => {
    if (allReels) setUserSaved(allReels?.posts)
    console.log(userSaved)
  }, [allReels, userSaved])


  const handleSave = async (post) => {
    setLoading(true)
    try {
      let result = await axios.get(`${serverUrl}/api/posts/saved/${post._id}`, { withCredentials: true });
      console.log(result.data);
      if (result.data.message === 'Post saved') {
        setPosts(prev =>
          prev.map(p => {
            if (p._id === post._id) {
              return { ...p, saved: [...p.saved, userData.user._id] };
            }
            return p;
          })
        );
      } else {
        setPosts(prev =>
          prev.map(p => {
            if (p._id === post._id) {
              return { ...p, saved: p.saved.filter(user => user !== userData.user._id) };
            }
            return p;
          })
        );
      }
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }


  const handleLike = async (post) => {
    setShowLike(!showLike);
    console.log(posts);

    try {
      const result = await axios.put(`${serverUrl}/api/posts/likepost`, { postid: post._id }, {
        withCredentials: true
      });
      console.log(result.data);

      if (result.data.message === 'Post liked') {
        setPosts(prev =>
          prev.map(p => {
            if (p._id === post._id) {
              return { ...p, likes: [...p.likes, userData.user] };
            }
            return p;
          })
        );
      } else {
        setPosts(prev =>
          prev.map(p => {
            if (p._id === post._id) {
              return { ...p, likes: p.likes.filter(user => user._id !== userData.user._id) };
            }
            return p;
          })
        );
      }

    } catch (error) {
      console.log(error);
    }
  };


  const handleFollow = async (authorId) => {
    try {
      let result = await axios.get(`${serverUrl}/api/users/followandunfollow/${authorId}`, { withCredentials: true });
      console.log(result.data);
      if (result.data.message === 'User unfollowed successfully') {
        dispatch(setUserData(result.data.updatedUser))
      } else if (result.data.message === 'User followed successfully') {
        dispatch(setUserData(result.data.updatedUser))
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div onClick={() => { setActiveItem('Home'); setSearchIsFocussed(false); setNotificationIsFocussed(false); }} className={` ${(theme === 'dark') ? 'bg-black text-white' : (theme === 'light') ? 'bg-[#ffffff] text-black' : ' dark:bg-black dark:text-white bg-white'} flex h-screen w-full items-center justify-center `}>
      <div className="w-screen h-screen flex flex-col items-center justify-start pt-10 overflow-y-scroll snap-y snap-mandatory snap-always scroll-smooth xl:pr-70 md:scroll-pt-16">
        <div className="flex flex-col items-start justify-center w-full sm:w-120 h-fit z-0 pb-10">
          {showOptions &&
            <div onClick={() => { setShowOptions(false); }} className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center" >
              <div onClick={() => { setShowOptions(false); }} className="fixed top-0 left-0 z-50 w-screen h-screen  bg-[#000000b9] blur-6xl opacity-85" />
              <CommentOptions postIdInMain={postIdInMain} page={'main'} setShowOptions={setShowOptions} />
            </div>}
          {status === 'loading' && <div className="w-full h-100 flex items-center justify-center">
            <div className="h-15 w-15 border-t-1 border-b-1 border-[white] rounded-full animate-spin transition-all duration-500 ease-in-out" />
          </div>}
          {(posts && posts?.length > 0) && posts?.map((post) => (
            <div key={post._id} className={`relative h-screen w-full md:w-109 xl:w-110 md:h-185 xl:h-200 flex flex-col items-center justify-center `}>
              <div className={`w-full h-full snap-start md:shadow-2xl border-1 rounded-md ${theme === 'dark' ? 'border-[#363636] shadow-[#ffffff93]' : (theme === 'light') ? 'border-[#d3d3d3] bg-[#0000009a] shadow-black' : ' border-[#d3d3d3] dark:border-[#363636]'}`}>
                <img src={post?.image} alt="Post Image" className="w-full h-full object-cover rounded-sm" />
                <div className="absolute bottom-15 left-3 md:left-5 w-full h-fit flex flex-col items-start justify-between">
                  <div className={` w-fit h-fit flex items-center justify-start px-4 md:px-1`}>
                    <img src={post?.author?.profilepic || dp} alt="author image" className="w-9 h-9 rounded-full object-cover" />
                    <p onClick={() => { navigate(`/profile/${post?.author?.username || post?.author?._id}`) }} className="text-sm font-semibold ml-2 cursor-pointer">{post?.author?.username}</p>
                    {post?.author?._id !== userData?.user?._id && <LuDot size={20} className={`text-sm p-0 ${theme === 'dark' ? 'text-[#ffffffa5]' : (theme === 'light') ? 'text-[#000000a5]' : ' text-[#000000a5] dark:text-[#ffffffa5]'}`} />}
                    {post?.author?._id !== userData?.user?._id && <p onClick={() => { handleFollow(post?.author?._id) }} className={` text-sm font-medium ${userData?.user?.following?.includes(post?.author?._id) ? 'text-[#6b6b6b]' : 'text-[#008cff]'} cursor-pointer active:scale-95 ${theme === 'dark' ? 'hover:text-[#ffffffdd]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`}>{userData?.user?.following?.includes(post?.author?._id) ? 'Following' : userData?.user?.followers?.includes(post?.author?._id) ? 'Follow back' : 'Follow' }</p>}
                  </div>
                  {(post?.description) ? <p className={`text-sm px-4 md:px-1 pt-2`}>
                    {showDescription ? post?.description : post?.description?.slice(0, 30)}
                    {post?.description.length > 30 && <span onClick={() => { setShowDescription(!showDescription) }} className={`cursor-pointer ${theme === 'dark' ? 'hover:text-[#ffffff81]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`}>{showDescription ? '...read less' : '...read more'}</span>} </p> : ''}
                </div>
              </div>
              <div className="absolute bottom-15 -right-45 md:-right-65 w-full h-fit flex flex-col items-center justify-center px-4 md:px-0 gap-5">
                <div  className="w-fit h-fit flex flex-col items-center justify-start gap-5">
                  <div onClick={() => { handleLike(post) }} className="w-fit h-fit flex flex-col items-center justify-center">
                    {(post && Array.isArray(post?.likes) && post?.likes?.some(user => user._id === userData?.user?._id)) ? <img src={heartfill} alt="liked" className="w-7 h-7 cursor-pointer transition-all duration-200 ease-in-out" /> : <GoHeart size={27} className={`${mainTextTheme}  cursor-pointer transition-all duration-200 ease-in-out`} />}
                    {<p className={`${post?.likes?.length === 0 ? 'hidden' : ''} text-sm `}>{post?.likes?.length} {(post?.likes?.length === 1) ? 'like' : 'likes'}</p>}
                  </div>
                  <div className="w-fit h-fit flex flex-col items-center justify-center">
                    <FiMessageCircle onClick={() => { setShowComment(!showComment); handleClick(post); dispatch(getAllComments(post._id)); }} size={27} className={`${mainTextTheme} cursor-pointer ${theme === 'dark' ? 'hover:text-[#ffffff81]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`} />
                    <p className={`text-sm `}>{post?.comments?.length}</p>
                  </div>
                  <TbSend size={27} className={`${mainTextTheme} cursor-pointer ${theme === 'dark' ? 'hover:text-[#ffffff81]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`} />
                </div>
                <div onClick={() => { handleSave(post) }} className="w-fit h-fit flex items-center justify-start gap-3">
                  {(post?.saved && post?.saved?.some(user => user === userData?.user?._id)) ? <RiBookmarkFill size={27} className={`${mainTextTheme} cursor-pointer transition-all duration-200 ease-in-out  `} /> : <BiBookmark size={27} className={`${mainTextTheme} cursor-pointer transition-all duration-200 ease-in-out ${theme === 'dark' ? 'hover:text-[#ffffff81]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`} />}
                </div>
                <div className="w-10 h-full flex items-center justify-center cursor-pointer">
                  <BsThreeDots onClick={() => { handleClickOptions(post?.author?._id); }} size={20} className={`${textTheme} hover:opacity-50 cursor-pointer transition-all duration-200 ease-in-out`} />
                </div>
              </div>
              <div className="w-full h-fit flex flex-col items-start justify-center pt-2 px-4 md:px-0">

              </div>
            </div>
          ))}
        </div>
        {showComment &&
          <div onClick={() => { setShowComment(false); }} className="absolute top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-[#0000003b] z-50 ">
            <div onClick={(e) => { e.stopPropagation(); }} style={{ boxShadow: `0 -4px 20px -1px ${theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : (theme === 'light') ? 'rgba(0, 0, 0, 0.2)' : ' rgba(0, 0, 0, 0.2)'}` }} className={`fixed top-50 rounded-t-3xl md:rounded-md md:right-30 z-50 w-screen md:w-90 ${bgTheme} h-[80%] md:h-130 pt-10 flex flex-col items-start justify-start overflow-y-auto overflow-x-hidden`}>

              <div className={`relative left-0 w-screen ${bgTheme} h-full z-50 flex flex-col items-start justify-start overflow-y-auto overflow-x-hidden`}>
                {<div className={`${bgTheme} w-full md:w-90 h-fit fixed z-20 top-50 md:right-30 hidden md:flex items-center md:rounded-t-md justify-center pt-2 py-6 gap-3 rounded-t-3xl`}>
                  <p className={`${mainTextTheme} text-sm font-medium`}>Comments</p>
                  <RxCross2 onClick={() => { setShowComment(false); }} size={20} className={`${mainTextTheme} absolute left-2 top-2 cursor-pointer transition-all duration-200 ease-in-out`} />
                </div>}
                {<div className={`${bgTheme} w-full md:w-90 h-fit fixed z-20 top-50 left-0 md:hidden flex items-center md:rounded-t-md justify-center pt-2 py-6 gap-3 rounded-t-3xl`}>
                  <p className={`${mainTextTheme} text-sm font-medium`}>Comments</p>
                  <RxCross2 onClick={() => { setShowComment(false); }} size={20} className={`${mainTextTheme} absolute left-2 top-2 cursor-pointer transition-all duration-200 ease-in-out`} />
                </div>}
                <div className="w-full md:w-90 h-full z-100 overflow-y-auto overflow-x-hidden pb-20">
                  <PostComments page={'reels'} reply={reply} setReply={setReply} showReplies={showReplies} setShowReplies={setShowReplies} post={post} status={status} showComment={showComment} postIdInMain={postIdInMain} setPostIdInMain={setPostIdInMain} allComments={allComments} allReplies={allReplies} commentId={commentId} setCommentId={setCommentId} setComment={setComment} handleAddComment={handleAddComment} loading={loading} setLoading={setLoading} />
                </div>
                
                {<div className={`${bgTheme} w-full md:w-90 h-fit fixed hidden z-100 md:top-162 md:rounded-b-md md:right-30 md:flex items-center justify-center pt-0 p-3 gap-3 ${(post?.hideComments) ? 'hidden' : ''}`}>
                  <CommentInput theme={theme} reply={reply} commentId={commentId} setCommentId={setCommentId} comment={comment} setComment={setComment} setReply={setReply} handleAddComment={handleAddComment} loading={loading} setLoading={setLoading} setEmoji={setEmoji} emoji={emoji} postIdInMain={postIdInMain} page={'reels'} post={post} />
                </div>}
              </div>
              {<div className={`${bgTheme} w-full h-fit fixed z-100 md:top-142 md:rounded-md bottom-0 left-0 flex md:hidden items-center justify-center pt-0  gap-3 ${(post?.hideComments) ? 'hidden' : ''}`}>
                <CommentInput theme={theme} reply={reply} commentId={commentId} setCommentId={setCommentId} comment={comment} setComment={setComment} setReply={setReply} handleAddComment={handleAddComment} loading={loading} setLoading={setLoading} setEmoji={setEmoji} emoji={emoji} postIdInMain={postIdInMain} page={'reels'} post={post} />
              </div>}
            </div>
          </div>
        }
      </div>

    </div>
  )
}

export default Reels


