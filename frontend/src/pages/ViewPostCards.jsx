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
import { useNavigate, useParams } from "react-router-dom";
import { getAllComments, getAllReplies, getUserPosts } from "../redux/postSlice";
import axios from "axios";
import CommentOptions from '../components/CommentOptions';
import AboutAccount from '../components/AboutAccount';
import { LuDot } from 'react-icons/lu';
import { setUserData } from '../redux/userSlice';
import EditPost from '../components/EditPost';
import dp from '../assets/dp.webp'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';





const ViewPostCards = ({ viewReels, showReplies, setShowReplies, viewPost, setViewPost, showComment, setShowComment, postId, setIndexval, indexval, posts, setPosts, page, postIdInMain, setPostIdInMain }) => {

  const [emoji, setEmoji] = useState(false)
  const [id, setId] = useState('')
  const { identifier } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rightRef = useRef(null);
  const leftRef = useRef(null);

  //-----------------------------------------------------------------------------------

  useEffect(() => {
    setId(page === 'main' ? postIdInMain : postId)
  }, [page, postId, postIdInMain])


  //-----------------------------------------------------------------------------------

  const { theme, setSameData, aboutAcc, setAboutAcc, commentId, setCommentId, likedUsers, setLikedUsers, comment, setComment, loading, setLoading, reply, setReply, editPost, setEditPost } = useContext(ThemeContext)


  //-----------------------------------------------------------------------------------

  useEffect(() => {
    if (postId !== '' && page !== 'main') {
      dispatch(getUserPosts(identifier))
      dispatch(getAllComments(postId));
      dispatch(getAllReplies(postId));
    } else if (postIdInMain !== '' && page === 'main') {
      dispatch(getAllComments(postIdInMain));
      dispatch(getAllReplies(postIdInMain));
    }
  }, [dispatch, identifier, postId, postIdInMain, page])


  //-----------------------------------------------------------------------------------

  const handleRight = () => {
    const nextIndex = indexval + 1;
    if (nextIndex >= posts?.length) {
      rightRef.current.style.display = "none";
      return;
    }

    setIndexval(nextIndex);
    dispatch(getUserPosts(identifier))
    dispatch(getAllComments(posts[nextIndex]?._id));
  };


  //-----------------------------------------------------------------------------------


  const handleLeft = () => {
    const prevIndex = indexval - 1;
    if (prevIndex < 0) {
      leftRef.current.style.display = "none";
      return;
    }


    setIndexval(prevIndex);
    dispatch(getUserPosts(identifier))
    dispatch(getAllComments(posts[prevIndex]?._id));
  };

  //-----------------------------------------------------------------------------------

  const { userPosts, allComments, allReplies, status } = useSelector((state) => state.post)
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
  const { userData } = useSelector((state) => state.user)
  const [showDescription, setShowDescription] = useState(false)
  const [showOptions, setShowOptions] = useState('')
  const [post, setPost] = useState({})
  const [userPost, setUserPost] = useState({})
  const [country, setCountry] = useState('')
  const [aboutPost, setAboutPost] = useState('')

  let textTheme = theme === 'dark' ? 'text-[#ffffffa5]' : (theme === 'light') ? 'text-[#000000a5]' : ' text-[#000000a5] dark:text-[#ffffffa5]'
  let bgTheme = theme === 'dark' ? 'bg-[black] md:bg-[#212328] border-l-1 border-[#363636]' : (theme === 'light') ? 'bg-white border-l-1 border-[#d3d3d3]' : ' bg-white dark:bg-[#212328]'
  let borderTheme = theme === 'dark' ? ' border-[#363636]' : (theme === 'light') ? 'border-[#d3d3d3]' : 'border-[#363636] dark:border-[#d3d3d3]'
  let mainTextTheme = theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'

  const [likes, setLikes] = useState([])


  //-----------------------------------------------------------------------------------

  useEffect(() => {
    if (page !== 'main' && viewPost) {
      setPosts(userPosts?.posts)
    }
  }, [userPosts, setPosts, page, viewPost])


  //-----------------------------------------------------------------------------------

  const handleAddComment = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/posts/postcomment`, { postid: id, comment }, {
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

  const handleAddReply = async () => {
    setLoading(true)
    if (postId && commentId) {
      try {
        let result = await axios.post(`${serverUrl}/api/posts/addreply`, { postid: id, commentid: commentId, reply: comment }, { withCredentials: true });
        setShowReplies(prev => ({ ...prev, [commentId]: !prev[commentId] }))
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

  //-----------------------------------------------------------------------------------


  useEffect(() => {
    const currentPost = page === 'main' ? post : posts?.[indexval];
    if (currentPost?.likes) {
      setLikedUsers(currentPost.likes);
    }
  }, [posts, indexval, userPosts, likedUsers, setLikedUsers, postId, post, page])


  //-----------------------------------------------------------------------------------

  useEffect(() => {
    if (page === 'main') {
      setLikes(post?.likes)
    } else if (likedUsers) {
      setLikes(likedUsers)
    }
  }, [viewPost, likedUsers, post, page])


  //-----------------------------------------------------------------------------------

  const handleLike = async () => {

    try {
      const result = await axios.put(`${serverUrl}/api/posts/likepost`, { postid: id }, {
        withCredentials: true
      });
      console.log(result.data);
      if (result.data.message === 'Post liked') {
        setPosts(prev => prev?.map(post => {
          if (post?._id === id) {
            return { ...post, likes: [...post.likes, userData?.user] }
          }
          return post
        }))
        setPost(prev => ({ ...prev, likes: [...prev.likes, userData?.user] }))
      } else {
        setPosts(prev => prev?.map(post => {
          if (post?._id === id) {
            return { ...post, likes: post?.likes?.filter(user => user._id !== userData?.user?._id) }
          }
          return post
        }))
        setPost(prev => ({ ...prev, likes: post?.likes?.filter(user => user?._id !== userData?.user?._id) }))
      }
    } catch (error) {
      console.log(error);
    }
  }


  //-----------------------------------------------------------------------------------

  const handleLike2 = async () => {
    try {
      const result = await axios.put(`${serverUrl}/api/posts/likepost`, { postid: id }, {
        withCredentials: true
      });
      console.log(result.data);
      if (result.data.message === 'Post liked' && !posts[indexval]?.likes?.some(user => user._id === userData?.user?._id)) {
        setPosts(prev => prev?.map(post => {
          if (post?._id === id) {
            return { ...post, likes: [...post.likes, userData?.user] }
          }
          return post
        }))
      } else if (result.data.message === 'Post unliked' && posts[indexval]?.likes?.some(user => user._id === userData?.user?._id)) {
        setPosts(prev => prev?.map(post => {
          if (post?._id === id) {
            return { ...post, likes: post?.likes?.filter(user => user._id !== userData?.user?._id) }
          }
          return post
        }))
      }
    } catch (error) {
      console.log(error);
    }
  }


  //-----------------------------------------------------------------------------------



  const handleSave = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/posts/saved/${id}`, {
        withCredentials: true
      });
      console.log(result.data);
      if (result.data.message === 'Post saved' && !post?.saved?.some(user => user === userData?.user?._id)) {
        setPosts(prev => prev?.map(post => {
          if (post?._id === id) {
            return { ...post, saved: [...post.saved, userData?.user?._id] }
          }
          return post
        }))
        setPost(prev => ({ ...prev, saved: [...prev.saved, userData?.user?._id] }))

      } else if (result.data.message === 'Post unsaved' && post?.saved?.some(user => user === userData?.user?._id)) {
        setPosts(prev => prev?.map(post => {
          if (post?._id === id) {
            return { ...post, saved: post?.saved?.filter(user => user !== userData?.user?._id) }
          }
          return post
        }))
        setPost(prev => ({ ...prev, saved: post?.saved?.filter(user => user !== userData?.user?._id) }))
      }
    } catch (error) {
      console.log(error);
    }
  }


  //-----------------------------------------------------------------------------------

  const handleSave2 = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/posts/saved/${posts[indexval]?._id}`, {
        withCredentials: true
      });
      if (result.data.message === 'Post saved' && !posts[indexval]?.saved?.some(user => user === userData?.user?._id)) {
        setPosts(prev => prev?.map(post => {
          if (post?._id === posts[indexval]?._id) {
            return { ...post, saved: [...post.saved, userData?.user?._id] }
          }
          return post
        }))
      } else if (result.data.message === 'Post unsaved') {
        setPosts(prev => prev?.map(post => {
          if (post?._id === posts[indexval]?._id) {
            return { ...post, saved: post?.saved?.filter(user => user !== userData?.user?._id) }
          }
          return post
        }))
      }
    } catch (error) {
      console.log(error);
    }
  }


  //-----------------------------------------------------------------------------------

  useEffect(() => {
    if (page === 'main' && id !== '') {
      const fetchPost = async () => {
        try {
          let result = await axios.get(`${serverUrl}/api/posts/getpost/${id}`, { withCredentials: true });
          if (page === 'main') {
            setPost(result.data?.post)
            console.log(result.data)
          } else {
            setUserPost(result.data)
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchPost();
    }

  }, [id, serverUrl, aboutAcc, page, postIdInMain, postId, setUserPost, setPost])


  //-----------------------------------------------------------------------------------

  const handleClickOptions = (authorId, post) => {
    setShowOptions(!showOptions);
    setSameData(authorId === userData?.user?._id)
    setAboutPost(post)
  }

  //-----------------------------------------------------------------------------------

  useEffect(() => {
    setCountry("India")
  }, [aboutAcc]);

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


  useGSAP(() => {
    gsap.fromTo(
      ".post-cards",
      { scale: 1.2, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      }
    );
  }, []);


  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center ">
      <div className={`post-cards fixed top-0 left-0 w-screen h-screen flex items-center justify-center py-10 lg:px-0 md:px-18 overflow-y-scroll md:overflow-hidden  ${viewReels ? 'pb-20 pt-15' : ''}`}>
        <div className="fixed top-0 left-0 z-10 w-screen bg-[#000000b9] h-screen" onClick={() => { setComment(''); setReply(false); setViewPost(false); setShowComment(false); }} />

        {page !== 'main' && <div ref={leftRef} className={`absolute top-100 left-3 2xl:left-10 z-10 cursor-pointer ${(indexval === 0 || page === 'main') ? "hidden" : ""} `} onClick={(e) => { e.stopPropagation(); handleLeft(); }}>
          <IoIosArrowDropleftCircle size={40} className="text-white hidden md:block" />
        </div>}
        {page !== 'main' && <div ref={rightRef} className={` absolute top-100 right-3 2xl:right-10 z-10 cursor-pointer ${(indexval === posts?.length - 1 || page === 'main') ? "hidden" : ""} `} onClick={(e) => { e.stopPropagation(); handleRight(); }}>
          <IoIosArrowDroprightCircle size={40} className="text-white hidden md:block" />
        </div>}
        <div onClick={(e) => { e.stopPropagation(); }} className="h-fit flex w-fit 2xl:w-340 2xl:h-210 md:h-120 lg:h-150 xl:h-190 items-center justify-center z-10 ">
          <div className={`${viewReels ? 'md:w-80 lg:w-100 xl:w-120 h-fit' : 'lg:w-150 md:w-100 2xl:w-230 h-full'} hidden md:flex flex-col items-center justify-center z-10 overflow-hidden`}>
            <ViewPostImage viewReels={viewReels} handleLike={handleLike} posts={posts} post={post} indexval={indexval} postId={postId} postIdInMain={postIdInMain} page={page} />
          </div>
          <div className={`2xl:w-130 xl:h-190 2xl:h-full 3xl:h-215 md:w-100 h-screen w-screen md:h-full pt-15 md:pt-0 overflow-auto ${bgTheme} pb-3 md:pb-0 rounded-l-md md:rounded-l-none rounded-r-md flex flex-col items-center justify-start md:justify-between z-10 md:overflow-hidden `}>
            {showComment && <div onClick={() => { setShowComment(false); }} className="w-screen md:hidden h-screen absolute z-20 -top-4 left-0" />}

            <div className={` w-full h-fit flex items-center justify-between border-b-1 ${borderTheme} `}>
              {page !== 'main' ? <div className="w-full h-fit flex items-center justify-start ">
                {posts?.map((post) => (
                  <div key={post._id} className={`w-fit h-fit flex items-center justify-start p-4 gap-2 ${indexval === posts?.indexOf(post) ? "" : "hidden"}`}>
                    <img src={post?.author?.profilepic || dp} alt="author image" className="w-9 h-9 z-0 md:z-10 rounded-full object-cover" />
                    <p onClick={() => { setViewPost(false); setIndexval(null); navigate(`/profile/${post?.author?.username || post?.author?._id}`) }} className={` text-sm font-medium cursor-pointer ml-2 ${theme === 'dark' ? 'text-[white]' : (theme === 'light') ? 'text-[#000000a5]' : ' text-[#000000a5] dark:text-[white]'}`}>{post.author?.username}</p>
                    {post?.author?._id !== userData?.user?._id && <div className="w-fit h-fit flex items-center justify-start">
                      <LuDot size={20} />
                      <p onClick={() => { handleFollow(post?.author?._id) }} className={` text-sm font-medium ${userData?.user?.following?.includes(post?.author?._id) ? 'text-[#6b6b6b]' : 'text-[#008cff]'} cursor-pointer active:scale-95 ${theme === 'dark' ? 'hover:text-[#ffffffdd]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`}>{userData?.user?.following?.includes(post?.author?._id) ? 'Following' : userData?.user?.followers?.includes(post?.author?._id) ? 'Follow back' : 'Follow'}</p>
                    </div>}
                  </div>
                ))}
              </div> :
                <div className={`w-fit h-fit flex items-center justify-start p-4 gap-2 `}>
                  <img src={post?.author?.profilepic || dp} alt="author image" className="w-9 h-9 z-0 md:z-10 rounded-full object-cover" />
                  <p className={` text-sm font-medium ml-2 ${theme === 'dark' ? 'text-[white]' : (theme === 'light') ? 'text-[#000000a5]' : ' text-[#000000a5] dark:text-[white]'}`}>{post?.author?.username}</p>
                  {post?.author?._id !== userData?.user?._id && <div className="w-fit h-fit flex items-center justify-start">
                    <LuDot size={20} />
                    <p onClick={() => { handleFollow(post?.author?._id) }} className={` text-sm font-medium text-[#008cff] cursor-pointer active:scale-95 ${theme === 'dark' ? 'hover:text-[#ffffffdd]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`}>{userData?.user?.following?.includes(post?.author?._id) ? 'Following' : userData?.user?.followers?.includes(post?.author?._id) ? 'Follow back' : 'Follow'}</p>
                  </div>}
                </div>
              }
              <div className="w-10 h-full pr-3 flex items-center justify-center cursor-pointer">
                <BsThreeDots onClick={() => { handleClickOptions((page !== 'main' ? posts[indexval]?.author?._id : post?.author?._id), (page !== 'main' ? posts[indexval] : post)); }} size={20} className={`${textTheme} hover:opacity-50 cursor-pointer transition-all duration-200 ease-in-out`} />
              </div>
            </div>
            {editPost &&
              <div onClick={() => { setEditPost(false); }} className="fixed top-0 left-0 z-100 w-screen h-screen flex items-center bg-[#000000b1] justify-center">
                <EditPost page={'posts'} postId={post?._id} />
              </div>}
            {showOptions &&
              <div onClick={() => { setShowOptions(false); }} className="fixed top-0 left-0 z-100 w-screen h-screen bg-[#00000087] flex items-center justify-center" >
                <CommentOptions setViewPost={setViewPost} postId={postId} authorId={post?.author?._id} authorName={post?.author?.username} postIdInMain={postIdInMain} page={page} setShowOptions={setShowOptions} />
              </div>
            }
            <div className={`w-full xl:h-full 2xl:h-160 overflow-y-auto overflow-x-hidden  flex flex-col border-b-1  ${((page === 'main' && post?.comments?.length == 0)) || (posts && posts[indexval]?.comments?.length == 0) ? 'justify-center items-center' : 'justify-start items-start'} ${borderTheme}`}>
              <div className={`w-full ${viewReels ? 'h-250 px-4' : 'h-90'} md:hidden flex flex-col items-center justify-center z-0 md:z-10 overflow-hidden`}>
                <ViewPostImage handleLike={handleLike} posts={posts} post={post} indexval={indexval} postId={postId} page={page} postIdInMain={postIdInMain} />
              </div>
              {
                <div className="hidden w-full h-150 md:flex flex-col items-start justify-start overflow-y-auto overflow-x-hidden">
                  <PostComments setPostIdInMain={setPostIdInMain} post={post} page={page} status={status} posts={posts} showComment={showComment} indexval={indexval} allComments={allComments} allReplies={allReplies} showReplies={showReplies} setShowReplies={setShowReplies} reply={reply} setReply={setReply} commentId={commentId} setCommentId={setCommentId} setComment={setComment} handleAddReply={handleAddReply} handleAddComment={handleAddComment} loading={loading} setLoading={setLoading} />
                </div>
              }
            </div>

            <div className="w-full h-fit p-3 flex items-center justify-between">
              <div className="w-fit h-fit flex items-center justify-start gap-3">

                {page === 'main' && <div onClick={() => { handleLike() }} className="w-fit h-fit flex items-center">
                  {((post?.likes && Array.isArray(post?.likes) && post?.likes?.some(l => l._id === userData?.user?._id))) ? <img src={heartfill} alt="liked" className="w-7 h-7 cursor-pointer transition-all duration-200 ease-in-out" /> : <GoHeart size={27} className={`${mainTextTheme}  cursor-pointer transition-all duration-200 ease-in-out`} />}
                </div>}
                {page !== 'main' && <div onClick={() => { handleLike2() }} className="w-fit h-fit flex items-center">
                  {((posts && posts[indexval]?.likes?.some(user => user?._id === userData?.user?._id))) ? <img src={heartfill} alt="liked" className="w-7 h-7 cursor-pointer transition-all duration-200 ease-in-out" /> : <GoHeart size={27} className={`${mainTextTheme}  cursor-pointer transition-all duration-200 ease-in-out`} />}
                </div>}

                <FiMessageCircle onClick={() => { setShowComment(!showComment); }} size={27} className={`${mainTextTheme} cursor-pointer ${theme === 'dark' ? 'hover:text-[#ffffff81]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`} />
                <TbSend size={27} className={`${mainTextTheme} cursor-pointer ${theme === 'dark' ? 'hover:text-[#ffffff81]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`} />
              </div>
              {page === 'main' && <div onClick={() => { handleSave() }} className="w-fit h-fit flex items-center justify-start gap-3">
                {post?.saved && post?.saved?.some(user => user === userData?.user?._id) ? <RiBookmarkFill size={27} className={`${mainTextTheme} cursor-pointer transition-all duration-200 ease-in-out  `} /> : <BiBookmark size={27} className={`${mainTextTheme} cursor-pointer transition-all duration-200 ease-in-out ${theme === 'dark' ? 'hover:text-[#ffffff81]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`} />}
              </div>}
              {page !== 'main' && <div onClick={() => { handleSave2() }} className="w-fit h-fit flex items-center justify-start gap-3">
                {posts && posts[indexval]?.saved?.some(user => user === userData?.user?._id) ? <RiBookmarkFill size={27} className={`${mainTextTheme} cursor-pointer transition-all duration-200 ease-in-out  `} /> : <BiBookmark size={27} className={`${mainTextTheme} cursor-pointer transition-all duration-200 ease-in-out ${theme === 'dark' ? 'hover:text-[#ffffff81]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`} />}
              </div>}

            </div>
            <div className="w-full h-fit flex flex-col items-start px-3 justify-center">
              {(likes && Array.isArray(likes) && likes?.length === 0) ?
                <p className={`${mainTextTheme} text-sm`}>Be the first to like this</p> : <p className={`${likes?.length === 0 ? 'hidden' : ''} text-sm `}>{likes?.length} {(likes?.length === 1) ? 'like' : 'likes'}</p>
              }
              {(posts && posts[indexval]?.description) || (page === 'main' && post?.description) ? <p className={`${mainTextTheme} md:hidden text-sm`}>
                <span className={`${mainTextTheme} font-medium pr-1`}>{page === 'main' ? post?.author?.username || post?.author?.name : posts[indexval]?.author?.username || posts[indexval]?.author?.name}</span> {showDescription ? page === 'main' ? post?.description : posts[indexval]?.description : page === 'main' ? post?.description?.slice(0, 30) : posts[indexval]?.description?.slice(0, 30)}
                {page === 'main' ? post?.description.length > 30 : posts[indexval]?.description.length > 30 && <span onClick={() => { setShowDescription(!showDescription) }} className={`${mainTextTheme} cursor-pointer ${theme === 'dark' ? 'hover:text-[#ffffff81]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'} transition-all duration-200 ease-in-out`}>{showDescription ? '...read less' : '...read more'}</span>} </p> : ''}
              <p className={`${textTheme} text-sm`}>{format(page === 'main' ? post?.createdAt : posts && posts[indexval]?.createdAt, 'short')}</p>
            </div>
            {emoji && <div onClick={() => { setEmoji(false) }} className=" fixed hidden md:block top-0 left-0 w-full h-full" >
              <div className="absolute bottom-65 right-110">
                <EmojiPicker onEmojiClick={(emojiObject, e) => { e.stopPropagation(); console.log(emojiObject); setComment(prev => prev + emojiObject.emoji); setEmoji(false); }} height={300} width={250} theme={theme === 'dark' ? 'dark' : 'light'} emojiStyle="apple" searchDisabled={true} className='shadow-xl' />
              </div>
            </div>}

            <div className={` w-full h-fit md:flex items-center justify-center p-3 gap-3 ${(posts && posts[indexval]?.hideComments) || (page === 'main' && post?.hideComments) ? 'hidden' : 'hidden md:flex'}`}>
              <CommentInput theme={theme} reply={reply} commentId={commentId} setCommentId={setCommentId} comment={comment} setComment={setComment} handleAddReply={handleAddReply} handleAddComment={handleAddComment} loading={loading} setLoading={setLoading} setEmoji={setEmoji} emoji={emoji} postId={postId} posts={posts} indexval={indexval} page={page} post={post} />
            </div>
          </div>
        </div>
        {
          aboutAcc && <div className="fixed top-0 left-0 z-100 w-screen h-screen flex bg-[#0000007b] items-center justify-center" onClick={() => { setAboutAcc(false); }}>
            <AboutAccount setAboutAcc={setAboutAcc} theme={theme} country={country} userPost={userPost} setCountry={setCountry} setUserPost={setUserPost} page={page} post={aboutPost} />
          </div>
        }
      </div>
      {showComment && <div style={{ boxShadow: `0 -4px 20px -1px ${theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : (theme === 'light') ? 'rgba(0, 0, 0, 0.2)' : ' rgba(0, 0, 0, 0.2)'}` }} className={`fixed top-50 rounded-t-3xl left-0 z-50 w-screen ${bgTheme} h-[80%] py-10 flex md:hidden flex-col items-start justify-start `}>

        <div className={`relative left-0 z-0 w-screen pb-10 ${bgTheme} h-full flex md:hidden flex-col items-start justify-start overflow-y-auto overflow-x-hidden`}>
          <div className={`${bgTheme} w-full h-fit fixed z-20 top-52 left-0 flex items-center justify-center pt-0 py-4 gap-3 rounded-t-xl`}>
            <p className={`${mainTextTheme} text-sm font-medium`}>Comments</p>
          </div>
          <PostComments post={post} page={page} status={status} showComment={showComment} posts={posts} indexval={indexval} allComments={allComments} allReplies={allReplies} showReplies={showReplies} setShowReplies={setShowReplies} reply={reply} setReply={setReply} commentId={commentId} setCommentId={setCommentId} setComment={setComment} handleAddReply={handleAddReply} handleAddComment={handleAddComment} loading={loading} setLoading={setLoading} />
        </div>
        {<div className={`${bgTheme} w-full h-fit fixed z-100 bottom-0 left-0 flex items-center justify-center pt-0 p-3 gap-3 ${(posts && posts[indexval]?.hideComments) || (page === 'main' && post?.hideComments) ? 'hidden' : ''}`}>
          <CommentInput theme={theme} reply={reply} commentId={commentId} setCommentId={setCommentId} comment={comment} setComment={setComment} handleAddReply={handleAddReply} handleAddComment={handleAddComment} loading={loading} setLoading={setLoading} setEmoji={setEmoji} emoji={emoji} postId={postId} postIdInMain={postIdInMain} posts={posts} indexval={indexval} page={page} post={post} />
        </div>}
      </div>}
    </div>
  )
}

export default ViewPostCards
