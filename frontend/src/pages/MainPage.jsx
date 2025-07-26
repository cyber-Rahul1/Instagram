import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/postSlice";
import { ThemeContext } from "../context/ContextProvider";
import main from '../assets/main.png'
import heartfill from '../assets/heartfill.png'
import { LuDot } from "react-icons/lu";
import { format, register } from "timeago.js";
import { BsThreeDots } from "react-icons/bs";
import { BiBookmark } from "react-icons/bi";
import { TbSend } from "react-icons/tb";
import { FiMessageCircle } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { RiBookmarkFill } from "react-icons/ri";
import ViewPostCards from "./ViewPostCards";
import { useNavigate } from "react-router-dom";
import SwitchAccount from "../components/SwitchAccount";
import PostComments from "../components/PostComments";
import CommentInput from "../components/CommentInput";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import CommentOptions from "../components/CommentOptions";
import dp from '../assets/dp.webp';
import Suggested from "./Suggested";
import LoginFooter from "../components/LoginFooter";
import { setUserData } from "../redux/userSlice";
import AboutAccount from "../components/AboutAccount";
import EditPost from "../components/EditPost";
import Stories from "../components/Stories";
import ViewStoryCards from "../components/ViewStoryCards";



const MainPage = () => {


  const { theme, setActiveItem, setSearchIsFocussed, postIdInMain, setPostIdInMain, setNotificationIsFocussed, setSameData, viewPost, setViewPost, setShowComment, showComment, post, commentId, setCommentId, comment, loading, setLoading, setComment, reply, setReply, likedUsers, setLikedUsers, setAuthorId, aboutAcc, setAboutAcc, editPost, setEditPost, showCross, setAuthorName } = useContext(ThemeContext);
  const [emoji, setEmoji] = useState(false)
  const { allComments, allReplies } = useSelector((state) => state.post)
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let items = ['','','','','']
  let textTheme = theme === 'dark' ? 'text-[white]' : (theme === 'light') ? 'text-[#000000a5]' : ' text-[#000000a5] dark:text-[white]'
  let mainTextTheme = theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'
  let bgTheme = theme === 'dark' ? 'bg-[black] md:bg-[#212328] border-l-1 border-[#363636]' : (theme === 'light') ? 'bg-white border-l-1 border-[#d3d3d3]' : ' bg-white dark:bg-[#212328]'

  const [showDescription, setShowDescription] = useState(false)
  const [switchAccount, setSwitchAccount] = useState(false)
  const [showOptions, setShowOptions] = useState('')
  const [showReplies, setShowReplies] = useState({})
  const [userSaved, setUserSaved] = useState({})
  const [liked, setLiked] = useState(false);
  const [showLike, setShowLike] = useState(false)
  const [posts, setPosts] = useState([])
  const [viewReels, setViewReels] = useState(false)
  const [editPostId, setEditPostId] = useState('')
  const [viewStory, setViewStory] = useState(false)
  const [storyId, setStoryId] = useState('')





  useEffect(() => {
    document.title = 'Instagram';
  }, []);


  //-----------------------------------------------------------------------------------

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

  //-----------------------------------------------------------------------------------


  useEffect(() => {
    const currentPost = post;
    if (currentPost?.likes) {
      setLikedUsers(currentPost.likes);
    }
  }, [post, likedUsers, setLikedUsers])


  //-----------------------------------------------------------------------------------


  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch])

  //-----------------------------------------------------------------------------------

  const { allPosts, status } = useSelector((state) => state.post)
  const { userData } = useSelector((state) => state.user)

  //-----------------------------------------------------------------------------------


  const handleClick = (post) => {
    if (post.type === 'Reel') {
      setPostIdInMain(post._id)
      setViewPost(true);
      setViewReels(true);
    } else if (post.type === 'Post') {
      setPostIdInMain(post._id)
      setViewPost(true);
      setViewReels(false);
    }

  }


  //-----------------------------------------------------------------------------------

  useEffect(() => {
    if (allPosts) setPosts(allPosts?.posts);
  }, [allPosts])


  //-----------------------------------------------------------------------------------

  const handleAddComment = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/posts/postcomment`, { postid: postIdInMain, comment }, {
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

  //-----------------------------------------------------------------------------------



  // console.log(comment)
  // console.log("postId", postIdInMain)
  // console.log("commentId", commentId)

  // const handleAddReplyInMain = async () => {
  //   console.log("Before check:", { postIdInMain, commentId, comment })
  //   setLoading(true)
  //   console.log(comment)
  //   console.log("postId", postIdInMain)
  //   console.log("commentId", commentId)
  //   if (postIdInMain && commentId) {
  //     try {
  //       let result = await axios.post(`${serverUrl}/api/posts/addreply`, { postid: postIdInMain, commentid: commentId, reply: comment }, { withCredentials: true });
  //       console.log(result.data);
  //       setComment('')
  //       setLoading(false)
  //       setReply(false)
  //     } catch (error) {
  //       console.log(error)
  //       setLoading(false)
  //     }
  //   }
  // }

  //-----------------------------------------------------------------------------------

  const handleClickOptions = (authorId, postId, authorName) => {
    setShowOptions(!showOptions);
    setSameData(authorId === userData?.user?._id)
    setAuthorId(authorId)
    setEditPostId(postId)
    setAuthorName(authorName)
  }

  //-----------------------------------------------------------------------------------

  useEffect(() => {
    if (allPosts) setUserSaved(allPosts?.posts)
  }, [allPosts, userSaved])


  //-----------------------------------------------------------------------------------

  const handleSave = async (post) => {
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
    } catch (error) {
      console.log(error);
    }
  }

  //-----------------------------------------------------------------------------------


  const handleLike = async (post) => {
    setShowLike(!showLike);
    setLiked(true);
    setTimeout(() => setLiked(false), 500);

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

  //-----------------------------------------------------------------------------------

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

  //-----------------------------------------------------------------------------------


  const handleViewStory = (story) => {
    setViewStory(true);
    setStoryId(story._id);
    setTimeout(() => {
      setViewStory(false);
    }, 3000);
  }

  //-----------------------------------------------------------------------------------



  return (
    <div onClick={() => { setActiveItem('Home'); setSearchIsFocussed(false); setNotificationIsFocussed(false); }} className={` ${(theme === 'dark') ? 'bg-black text-white' : (theme === 'light') ? 'bg-[#ffffff] text-black' : ' dark:bg-black dark:text-white bg-white'}  flex h-screen w-full overflow-y-auto overflow-x-hidden `}>
     
      {(viewStory) &&
        <div onClick={() => { setViewStory(false); }} className="fixed top-0 left-0 z-200 w-screen h-screen flex items-center bg-[#1A1A1A] justify-center">
          <ViewStoryCards storyId={storyId} setViewStory={setViewStory} />
        </div>}
      <div className="w-screen lg:w-2/3 h-screen flex flex-col items-center justify-start gap-4 lg:pl-45 pt-15 md:pt-4">
        <div className="w-full md:w-150 h-fit flex items-center justify-center">
          <Stories />
        </div>
        <div className="flex flex-col items-start justify-center w-full sm:w-110 h-fit z-0 pb-10">
          {editPost &&
            <div onClick={() => { setEditPost(false); }} className="fixed top-0 left-0 z-100 w-screen h-screen flex items-center bg-[#000000b1] justify-center">
              <EditPost page={'main'} postId={editPostId} />
            </div>}
          

          {(allPosts?.posts?.length === 0) &&
            <div className={`w-full h-fit flex flex-col items-center justify-center pb-17 border-b-1 ${(theme === 'dark') ? 'border-[#363636]' : (theme === 'light') ? 'border-[#d3d3d3]' : ' border-[#d3d3d3] dark:border-[#363636]'}`}>
              <img src={main} alt="Main Page" className="w-25 h-25  object-cover rounded-full" />
              <p className="text-xl pt-2">You're all caught up</p>
              <p className="text-sm text-[#ffffffa5]">You've seen all new posts from the past 3 days.</p>
            </div>}
          {!allPosts && <div className={`w-full h-full flex items-center justify-start flex-col pt-10`}>
            {items.map((item, index) => (
              <div key={index} className={`animate-pulse w-fit h-fit flex flex-col items-start justify-center gap-5 pb-5`}>
                <div className="w-full h-fit flex items-start justify-start gap-3">
                  <div className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-[#363636]' : (theme === 'light') ? 'bg-[#797979] ' : ' bg-[#d3d3d3] bg:border-[#363636]'}`}></div>
                  <div className={`w-40 h-5 rounded-md mt-2 ${theme === 'dark' ? 'bg-[#363636]' : (theme === 'light') ? 'bg-[#797979] ' : ' bg-[#d3d3d3] bg:border-[#363636]'}`}></div>
                </div>
                <div className={`w-100 h-120 rounded-md ${theme === 'dark' ? 'bg-[#363636]' : (theme === 'light') ? 'bg-[#797979] ' : ' bg-[#d3d3d3] bg:border-[#363636]'}`}></div>
              </div>
            ))}
          </div>}
          {allPosts && (posts && posts?.length > 0) && posts?.map((post) => (
            <div key={post._id} className={`w-full h-full flex flex-col items-center justify-center md:border-b-1 py-5 ${theme === 'dark' ? 'border-[#363636]' : (theme === 'light') ? 'border-[#d3d3d3] ' : ' border-[#d3d3d3] dark:border-[#363636]'}`}>
              {aboutAcc &&
                <div onClick={() => { setAboutAcc(false); }} className="fixed top-0 left-0 z-100 w-screen h-screen flex bg-[#0000003b] items-center justify-center" >
                  <AboutAccount setAboutAcc={setAboutAcc} theme={theme} country='India' page={'main'} post={post} />
                </div>
              }
              {showOptions &&
                <div onClick={() => { setShowOptions(false); }} className="fixed top-0 left-0 z-50 w-screen h-screen flex bg-[#00000031] items-center justify-center" >
                  <CommentOptions setViewPost={setViewPost} editPostId={editPostId} postId={post?._id} setPostIdInMain={setPostIdInMain} setAboutAcc={setAboutAcc} page={'main'} setShowOptions={setShowOptions} />
                </div>
              }
              <div className="w-full h-fit flex items-center justify-between">
                <div className={`w-fit h-fit flex items-start justify-start px-4 md:px-1 pb-4 `}>
                  <div onClick={() => { post?.author?.story && handleViewStory(post?.author?.story) }} className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center  ${theme === 'dark' ? 'border-[#000000]' : (theme === 'light') ? 'border-[#ffffff] ' : ' border-[#d3d3d3] dark:border-[#363636]'} cursor-pointer  ${(post?.author?.story?._id && post?.author?.story?.views?.some(v => v === userData?.user?._id)) ? 'bg-[#363636]' : (post?.author?.story?._id && !post?.author?.story?.views?.some(v => v === userData?.user?._id)) ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600' : 'bg-transparent'}`}>
                    <img src={post?.author?.profilepic || dp} alt="author image" className={`w-9 h-9 rounded-full object-cover border-1 ${theme === 'dark' ? 'border-[#000000]' : (theme === 'light') ? 'border-[#ffffff] ' : ' border-[#d3d3d3] dark:border-[#363636]'}`} />
                  </div>
                  <p onClick={() => { navigate(`/profile/${post?.author?.username || post?.author?._id}`) }} className="text-sm font-medium ml-2 cursor-pointer">{post?.author?.username}</p>
                  <LuDot size={20} className={`text-sm p-0 ${theme === 'dark' ? 'text-[#ffffffa5]' : (theme === 'light') ? 'text-[#000000a5]' : ' text-[#000000a5] dark:text-[#ffffffa5]'}`} />
                  <p className={`text-sm ${theme === 'dark' ? 'text-[#ffffffa5]' : (theme === 'light') ? 'text-[#000000a5]' : ' text-[#000000a5] dark:text-[#ffffffa5]'}`}>{format(post.createdAt, 'short')}</p>
                  <LuDot size={20} className={`text-sm p-0 ${theme === 'dark' ? 'text-[#ffffffa5]' : (theme === 'light') ? 'text-[#000000a5]' : ' text-[#000000a5] dark:text-[#ffffffa5]'}`} />
                  {post?.author?._id !== userData?.user?._id && <p onClick={() => { handleFollow(post?.author?._id) }} className={` text-sm font-medium ${userData?.user?.following?.includes(post?.author?._id) ? 'text-[#6b6b6b]' : 'text-[#008cff]'} cursor-pointer active:scale-95 ${theme === 'dark' ? 'hover:text-[#ffffffdd]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`}>{userData?.user?.following?.includes(post?.author?._id) ? 'Following' : userData?.user?.followers?.includes(post?.author?._id) ? 'Follow back' : 'Follow'}</p>}
                </div>
                <div className="w-10 h-full pr-3 flex items-center justify-center cursor-pointer">
                  <BsThreeDots onClick={() => { handleClickOptions(post?.author?._id, post?._id, post?.author?.username); }} size={20} className={`${textTheme} hover:opacity-50 cursor-pointer transition-all duration-200 ease-in-out`} />
                </div>
              </div>
              <div className={`w-full h-100 md:h-150 border-1 rounded-sm mb-3 ${post?.type === 'Reel' ? 'px-15' : ''} ${theme === 'dark' ? 'border-[#363636]' : (theme === 'light') ? 'border-[#d3d3d3] bg-[black]' : ' border-[#d3d3d3] dark:border-[#363636]'}`}>
                <img src={post?.image} alt="Post Image" className="w-full h-full object-cover" />
              </div>
              <div className="w-full h-fit flex items-center justify-between px-4 md:px-0">
                <div className="w-fit h-fit flex items-center justify-start gap-3">
                  <div onClick={() => { handleLike(post) }} className="w-fit h-fit">
                    {
                      (post && Array.isArray(post?.likes) && post?.likes?.some(user => user._id === userData?.user?._id)) ? <img src={heartfill} alt="liked" className="w-7 h-7 cursor-pointer transition-all duration-200 ease-in-out" /> : <GoHeart size={27} className={`${mainTextTheme}  cursor-pointer transition-all duration-200 ease-in-out`} />
                    }
                  </div>
                  <FiMessageCircle onClick={() => { setShowComment(!showComment); handleClick(post) }} size={27} className={`${mainTextTheme} cursor-pointer ${theme === 'dark' ? 'hover:text-[#ffffff81]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`} />
                  <TbSend size={27} className={`${mainTextTheme} cursor-pointer ${theme === 'dark' ? 'hover:text-[#ffffff81]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`} />
                </div>
                <div onClick={() => { handleSave(post) }} className="w-fit h-fit flex items-center justify-start gap-3">
                  {(post?.saved && post?.saved?.some(user => user === userData?.user?._id)) ? <RiBookmarkFill size={27} className={`${mainTextTheme} cursor-pointer transition-all duration-200 ease-in-out  `} /> : <BiBookmark size={27} className={`${mainTextTheme} cursor-pointer transition-all duration-200 ease-in-out ${theme === 'dark' ? 'hover:text-[#ffffff81]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`} />}
                </div>
              </div>
              <div className="w-full h-fit flex flex-col items-start justify-center pt-2 px-4 md:px-0">
                {
                  (post && Array.isArray(post?.likes) && post?.likes?.length === 0) ?
                    <p className={`${mainTextTheme} text-sm`}>Be the first to like this</p> : <p className={`${post?.likes?.length === 0 ? 'hidden' : ''} text-sm `}>{post?.likes?.length} {(post?.likes?.length === 1) ? 'like' : 'likes'}</p>
                }
                {(post?.description) ? <p className={`${mainTextTheme} text-sm md:px-0`}>
                  <span className={`${mainTextTheme} font-medium pr-1`}>{post?.author?.username || post?.author?.name}</span> {showDescription ? post?.description : post?.description?.slice(0, 30)}
                  {post?.description.length > 30 && <span onClick={() => { setShowDescription(!showDescription) }} className={`${mainTextTheme} cursor-pointer ${theme === 'dark' ? 'hover:text-[#ffffff81]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`}>{showDescription ? '...read less' : '...read more'}</span>} </p> : ''}
              </div>
            </div>
          ))}
        </div>

        {(!loading && viewPost) && <div onClick={() => { dispatch(getAllPosts()); setComment(''); setReply(false); setViewPost(false); setShowComment(false); }} className="fixed top-0 left-0 w-screen z-50 hidden md:flex h-screen flex-col items-center justify-center bg-[#000000a5]">


          <ViewPostCards handleLike={handleLike} posts={posts} setPosts={setPosts} liked={liked} page={'main'} postIdInMain={postIdInMain} setPostIdInMain={setPostIdInMain} setViewPost={setViewPost} viewPost={viewPost} viewReels={viewReels} setShowComment={setShowComment} showComment={showComment} reply={reply} setReply={setReply} />
          {!showCross && <RxCross2 onClick={() => { setComment(''); setReply(false); setViewPost(false); setShowComment(false); }} size={24} className={`absolute z-50 top-5 right-15 cursor-pointer ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} active:scale-95 transition-all duration-200 ease-in-out`} />}


        </div>}
        {(showComment) &&
          <div onClick={() => { setShowComment(false); }} className="fixed top-0 md:hidden left-0 w-screen h-screen flex flex-col items-center justify-center bg-[#000000b9] z-50">
            <div onClick={(e) => { e.stopPropagation(); }} style={{ boxShadow: `0 -4px 20px -1px ${theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : (theme === 'light') ? 'rgba(0, 0, 0, 0.2)' : ' rgba(0, 0, 0, 0.2)'}` }} className={`fixed top-50 rounded-t-3xl left-0 z-50 w-screen ${bgTheme} h-[80%] py-10 flex md:hidden flex-col items-start justify-start overflow-y-auto overflow-x-hidden`}>

              <div className={`relative left-0 z-0 w-screen ${bgTheme} h-full z-100 flex md:hidden flex-col items-start justify-start overflow-y-auto overflow-x-hidden`}>
                <div className={`${bgTheme} w-full h-fit fixed z-20 top-52 left-0 flex items-center justify-center pt-0 py-4 gap-3 rounded-t-xl`}>
                  <p className={`${mainTextTheme} text-sm font-medium`}>Comments</p>
                </div>
                <PostComments page={'main'} reply={reply} setReply={setReply} showReplies={showReplies} setShowReplies={setShowReplies} post={post} status={status} showComment={showComment} postIdInMain={postIdInMain} setPostIdInMain={setPostIdInMain} allComments={allComments} allReplies={allReplies} commentId={commentId} setCommentId={setCommentId} setComment={setComment} handleAddComment={handleAddComment} setLoading={setLoading} />
              </div>
              {<div className={`${bgTheme} w-full h-fit fixed z-100 bottom-0 left-0 flex items-center justify-center pt-0 p-3 gap-3 ${(post?.hideComments) ? 'hidden' : ''}`}>
                <CommentInput theme={theme} reply={reply} commentId={commentId} setCommentId={setCommentId} comment={comment} setComment={setComment} setReply={setReply} handleAddComment={handleAddComment} loading={loading} setLoading={setLoading} setEmoji={setEmoji} emoji={emoji} postIdInMain={postIdInMain} page={'main'} post={post} />
              </div>}
            </div>
          </div>
        }
      </div>
      <div className="w-170 h-screen hidden xl:flex flex-col items-start justify-start gap-4 pt-10 pl-5">
        <div className="w-70 h-fit flex items-center justify-between">
          <div className="w-full h-fit flex items-center justify-center gap-3 ">
            <img src={userData?.user?.profilepic || dp} alt="Profile Pic" className="w-11 h-11 rounded-full object-cover" />
            <div className="w-full h-fit flex flex-col items-start justify-center">
              <p className="text-sm font-medium ">{userData?.user?.username}</p>
              <p className="text-sm text-[#ffffffa5]">{userData?.user?.name}</p>
            </div>
          </div>
          <div>
            <p onClick={() => { setSwitchAccount(true); }} className={`text-xs font-medium text-[#008cff] cursor-pointer active:scale-95 ${theme === 'dark' ? 'hover:text-[#ffffffdd]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`}>Switch</p>
          </div>
        </div>
        <div className="w-70 h-fit flex items-start justify-between pt-2">
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-[#ffffffa5]' : (theme === 'light') ? 'text-[#000000a5]' : ' text-[#000000a5] dark:text-[#ffffffa5]'} `}>Suggested for you</p>
          <p onClick={() => { navigate('/suggested') }} className={`text-sm font-medium ${theme === 'dark' ? 'text-[#ffffff] hover:text-[#ffffffa5]' : (theme === 'light') ? 'text-[#000000a5] hover:text-[#00000081]' : ' text-[#000000a5] dark:text-[#ffffff] hover:text-[#ffffff81]'} cursor-pointer active:scale-95`}>See All</p>
        </div>
        <div className="w-70 h-fit flex flex-col items-start justify-start gap-4">
          <Suggested page='main' />
        </div>
        <div className="w-70 h-fit flex flex-col items-start justify-start">
          <LoginFooter theme={theme} page={'posts'} />
        </div>
      </div>
      {(switchAccount) && <div onClick={() => { setSwitchAccount(false); }} className="fixed top-0 z-50 left-0 w-screen h-screen  flex items-center justify-center">
        <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-85" />
        <SwitchAccount setSwitchAccount={setSwitchAccount} />
      </div>}
    </div>
  )
}

export default MainPage
