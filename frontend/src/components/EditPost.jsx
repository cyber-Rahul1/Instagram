import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../context/ContextProvider";
import dp from '../assets/dp.webp';
import { GrEmoji } from "react-icons/gr";
import EmojiPicker from "emoji-picker-react";
import postwhite from '../assets/postwhite.png';
import postblack from '../assets/postblack.png';
import { useDispatch } from "react-redux";
import { getAllPosts } from "../redux/postSlice";

const EditPost = ({ postId, page }) => {

  const dispatch = useDispatch();
  const { theme, setEditPost } = useContext(ThemeContext)
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";


  const [post, setPost] = useState({})
  const [description, setDescription] = useState('')
  const [total, setTotal] = useState(0)
  const [type, setType] = useState('')
  const [emoji, setEmoji] = useState(false)


  //-----------------------------------------------------------------------------------

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          let result = await axios.get(`${serverUrl}/api/posts/getpost/${postId}`, { withCredentials: true });
          setPost(result.data)
          setType(result.data?.post?.type)
          setDescription(result.data?.post?.description)
        } catch (error) {
          console.log(error);
        }
      }
      fetchPost();
    }
  }, [postId, serverUrl])

  //-----------------------------------------------------------------------------------


  const onEmojiClick = (emojiObject) => {
    setDescription(prev => prev + emojiObject.emoji);
    setEmoji(false);
  };

  //-----------------------------------------------------------------------------------

  const handleEdit = async () => {
    try {
      let result = await axios.post(`${serverUrl}/api/posts/updatepost/${postId}`, {
        description
      }, { withCredentials: true });
      if(page === 'main') dispatch(getAllPosts())
      console.log(result);
      setDescription('')
      setTotal(0)
      setEmoji(false)
      setEditPost(false)
    } catch (error) {
      console.log(error);
    }
  }

  //-----------------------------------------------------------------------------------


  return (
    <div className={`w-full h-full flex flex-col items-center justify-start pt-15 md:justify-center ${theme === 'dark' ? ' text-white' : (theme === 'light') ? 'bg-white text-black' : ' text-black dark:text-white'} `}>
      <div onClick={(e) => { e.stopPropagation(); }} className={`w-fit h-screen md:h-180 flex flex-col items-start justify-start rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#262626]'}`}>
        <div className={`w-full h-fit border-b-1 flex items-center justify-between py-2 px-4 ${theme === 'dark' ? 'bg-[#000000] border-[#363636]' : (theme === 'light') ? 'bg-white border-[#d3d3d3]' : ' bg-white dark:bg-[#262626]'}`}>
          <p onClick={() => { setEditPost(false) }} className={`text-md cursor-pointer ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} z-60`}>Cancel</p>
          <p className={`text-md font-medium ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} z-60`}>Edit info</p>
          <p onClick={() => { handleEdit() }} className={`text-md cursor-pointer font-medium ${theme === 'dark' ? 'text-[#006aff]' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} z-60`}>Done</p>
        </div>
       <div className="w-full h-full flex-col md:flex-row flex items-start justify-start">
          <img src={post?.post?.image} alt="Image" className="w-full md:w-140 lg:w-170 h-90 md:h-full object-cover" />
          <div className="w-full md:w-80 h-full flex flex-col items-start justify-start">
            <div className="w-fit h-fit flex items-center justify-center gap-3 p-5">
              <div className="w-8 h-8 overflow-hidden rounded-full"><img src={post?.post?.author?.profilepic || dp} alt="profile pic" className='w-full h-full object-cover rounded-full' /></div>
              <p className={`text-sm md:text-md font-medium ${theme === 'dark' ? 'text-[#ffffffd1]' : (theme === 'light') ? 'text-[#000000] ' : ' text-[#000000] dark:text-[#ffffffd1]'} z-60`}>{post?.post?.author?.username}</p>
            </div>
            <textarea value={description} onChange={(e) => { setDescription(e.target.value); setTotal(e.target.value.length) }} name="caption" id="caption" cols="30" rows="10" className={`w-full px-5 h-40 outline-none resize-none bg-transparent leading-6 ${theme === 'dark' ? 'text-[#ffffffd1]' : (theme === 'light') ? 'text-[#000000] ' : ' text-[#000000] dark:text-[#ffffffd1]'} text-sm md:text-[16px] font-normal`} placeholder={`${type === 'Post' ? 'Write a description...' : type === 'Reel' ? 'Describe about your reel...' : 'Write a caption for your story...'}`}></textarea>
            <div className="relative w-full flex items-center justify-between p-5">
              <GrEmoji onClick={() => { setEmoji(!emoji) }} size={22} className={`cursor-pointer active:scale-95 transition-all duration-300 ease-in-out ${theme === 'dark' ? 'text-[#ffffff8f] ' : (theme === 'light') ? 'text-[#5c5b5b]' : ' text-[#5c5b5b] dark:text-[#ffffff8f] '}`} />
              <div className={`${emoji ? 'block' : 'hidden'} absolute bottom-10 right-10 z-60`}>
                {emoji && <div onClick={() => { setEmoji(false) }} className={`fixed top-0 left-0 w-full h-full bg-transparent `} />}
                <div className={`absolute bottom-10 right-40 md:top-15 md:right-0 z-60 `}><EmojiPicker onEmojiClick={onEmojiClick} height={300} width={250} theme={theme === 'dark' ? 'dark' : 'light'} emojiStyle="apple" searchDisabled={true} className='shadow-xl' /></div>
              </div>
              <p className={`text-xs  ${total >= 1500 ? 'text-[#ff3040]' : theme === 'dark' ? 'text-[#646363]' : (theme === 'light') ? 'text-[#979797]' : ' text-[#737171] dark:text-[#646363]'}`}>{total}/1500</p>
            </div>
            <div className="w-full overflow-hidden pt-5 px-3">
              <img src={theme === 'dark' ? postblack : postwhite} alt="img" className="w-full h-full object-cover" />
            </div>
          </div>
       </div>
      </div>
    </div>
  )
}

export default EditPost
