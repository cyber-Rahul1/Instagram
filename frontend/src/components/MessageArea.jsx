import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dp from '../assets/dp.webp';
import { GoInfo } from "react-icons/go";
import { IoArrowBack } from "react-icons/io5";
import { GrEmoji } from "react-icons/gr";
import { TbPhoto } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, setMessages } from "../redux/messageSlice";
import EmojiPicker from "emoji-picker-react";


const MessageArea = ({ setMessageUsers }) => {

  const { theme } = useContext(ThemeContext);
  const { userData } = useSelector((state) => state.user)
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
  const { identifier } = useParams();
  const image = useRef(null)
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [user, setUser] = useState({})
  const [input, setInput] = useState('')
  const [frontendImg, setFrontendImg] = useState('')
  const [backendImg, setBackendImg] = useState('')
  const [loading, setLoading] = useState(false)
  const [emoji, setEmoji] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let result = await axios.get(`${serverUrl}/api/users/getuserprofile/${identifier}`, {
          withCredentials: true
        });
        setUser(result.data.user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [identifier, serverUrl])


  useEffect(() => {
    dispatch(getMessages(user?._id))
  }, [user?._id, dispatch])


  const { messages, status } = useSelector((state) => state.message);


  const handleImage = (e) => {
    if (e.target.files[0]) {
      setFrontendImg(URL.createObjectURL(e.target.files[0]));
      setBackendImg(e.target.files[0]);
    }
  }

  const handleSend = async () => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append('message', input);
      if (backendImg) formData.append('image', backendImg);
      let result = await axios.post(`${serverUrl}/api/messages/sendmessage/${user?._id}`, formData, {
        withCredentials: true
      });
      dispatch(setMessages(result.data.newMessage))
      setLoading(false)
      setInput('');
      setFrontendImg('');
      setBackendImg('');
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }





  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className={`relative w-full top-0 left-0 h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-[black] text-white' : (theme === 'light') ? 'bg-white text-black' :
      'bg-white dark:bg-black text-black dark:text-white'} overflow-hidden`}>
      <input ref={image} onChange={(e) => { handleImage(e); }} type="file" name="image" className="hidden" accept="image/*" id="image" />
      <nav className={`z-50 w-full h-fit flex items-center justify-between px-5 py-4 border-b-1 ${theme === 'dark' ? 'border-[#363636] bg-black' : (theme === 'light') ? 'border-[#d3d3d3] bg-white' : ' border-[#d3d3d3] dark:border-[#363636]'}`}>
        <div className="flex items-center gap-3 cursor-pointer">
          <IoArrowBack onClick={() => { setMessageUsers(prev => { if (!prev.some(u => u._id === user?._id)) { return [...prev, user]; } return prev; }); navigate('/messages') }} size={24} className={`cursor-pointer active:opacity-55 transition-all duration-200 ease-in-out ${theme === 'dark' ? 'text-[#ffffff]' : (theme === 'light') ? 'text-[#000000]' : ' text-[#000000] dark:text-[#ffffff]'}  `} />
          <img src={user?.profilepic || dp} alt=" profile pic" className="w-10 h-10 rounded-full object-cover" />
          <p className={`text-md font-medium ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>{user?.username || user?.name}</p>
        </div>
        <GoInfo size={24} className={` ${theme === 'dark' ? 'text-[#ffffff]' : (theme === 'light') ? 'text-[#000000]' : ' text-[#000000] dark:text-[#ffffff]'} cursor-pointer `} />
      </nav>
      <div className="w-full h-200 flex flex-col px-3 md:px-5 items-center justify-start overflow-y-scroll scrollbar-hide scrollbar-auto pt-8 gap-3 overflow-hidden">
        <div className="w-full h-fit flex items-center justify-center">
          <img src={user?.profilepic || dp} alt="profile pic" className="w-16 h-16 md:w-22 md:h-22 rounded-full object-cover" />
        </div>
        <p className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>{user?.username || user?.name}</p>
        <button onClick={() => { navigate(`/profile/${user?.username || user?._id}`) }} className={`px-3 py-[5px] md:px-4 md:py-2 cursor-pointer rounded-lg ${theme === 'dark' ? 'bg-[#363C44] hover:bg-[#68656575] text-white' : (theme === 'light') ? 'bg-[#f0f0f0] hover:bg-[#cecdcd] text-black' : 'bg-[#0095f6] text-white'} font-semibold text-sm`}>View profile</button>
        <div className="w-full h-full flex flex-col items-start justify-start gap-3">
          {status === 'loading' && <div className="w-full h-300 flex items-center justify-center">
            <div className="h-10 w-10 md:w-20 md:h-20 border-t-1 border-b-1  border-[white] rounded-full animate-spin transition-all duration-500 ease-in-out"></div>
          </div>}
          {status === 'succeeded' && messages && messages.map((message) => (
            <div key={message._id} className={`w-full h-fit flex items-center ${message?.sender === userData?.user?._id ? 'justify-end' : 'justify-start'} gap-3}`}>
              {message && message?.sender === userData?.user?._id ? <SenderMessage message={message?.message} image={message?.image} post={message?.post} story={message?.story} /> : <ReceiverMessage message={message?.message} image={message?.image} post={message?.post} story={message?.story} />}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className={`w-[95%] flex-col mx-auto h-fit px-3 border-1 my-4 ${theme === 'dark' ? 'bg-[#000000] border-[#363636]' : (theme === 'light') ? 'bg-white border-[#d3d3d3]' : ' bg-white dark:bg-black'} flex items-start justify-start gap-3 ${frontendImg ? ' rounded-3xl pt-3' : ' rounded-full'}`}>
        {frontendImg && <div className="relative">
          <div className={`absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center ${theme === 'dark' ? 'bg-[#363636] text-white' : (theme === 'light') ? 'bg-[#f0f0f0] text-black' : 'bg-[#0095f6] text-white'} rounded-full p-1`}>
            <RxCross2 onClick={() => { setFrontendImg(''); }} size={24} className={` ${theme === 'dark' ? 'text-[#ffffff]' : (theme === 'light') ? 'text-[#000000]' : ' text-[#000000] dark:text-[#ffffff]'} cursor-pointer `} />
          </div>
          <img src={frontendImg} alt="image" className="w-15 h-15 rounded-lg object-cover" />
        </div>}
        <div className="relative w-full flex items-center justify-start gap-3">
          <GrEmoji onClick={() => { setEmoji(!emoji); }} size={24} className={` ${theme === 'dark' ? 'text-[#ffffff]' : (theme === 'light') ? 'text-[#000000]' : ' text-[#000000] dark:text-[#ffffff]'} cursor-pointer `} />
          {emoji && <div onClick={() => { setEmoji(false) }} className=" absolute bottom-15 left-0 w-fit h-fit flex items-center justify-center" >
            <div onClick={(e) => { e.stopPropagation(); setEmoji(false); }} className={`fixed w-full h-full bg-transparent `} />
            <EmojiPicker onEmojiClick={(emojiObject) => { setInput(prev => prev + emojiObject.emoji); setEmoji(false); }} height={300} width={250} theme={theme === 'dark' ? 'dark' : 'light'} emojiStyle="apple" searchDisabled={true} className='shadow-xl' />
          </div>}
          <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Message..." className={`w-full h-fit py-[10px] outline-none ${theme === 'dark' ? 'bg-[#000000] text-white' : (theme === 'light') ? 'bg-[#ffffff] text-black' : ' bg-white dark:bg-black text-black dark:text-white'}`} />
          {!(input || frontendImg) && <TbPhoto onClick={() => { image.current.click() }} size={24} className={` ${theme === 'dark' ? 'text-[#ffffff]' : (theme === 'light') ? 'text-[#000000]' : ' text-[#000000] dark:text-[#ffffff]'} cursor-pointer `} />}
          {(input || frontendImg) && <button onKeyDown={(e) => { if (e.key === 'Enter') { handleSend() } }} onClick={handleSend} disabled={input === '' && !frontendImg} className={`px-3 py-[5px] md:px-4 md:py-2 cursor-pointer rounded-lg text-[#0095f6] hover:text-[#0094f6e0] active:scale-96 transition-all duration-200 ease-in-out font-semibold text-sm`}>
            {loading ? (
              <div className="w-4 h-4 border-t-1 border-b-1 border-white rounded-full animate-spin"></div>
            ) : (
              'Send'
            )}
          </button>}
        </div>
      </div>
    </div>
  )
}

export default MessageArea;
