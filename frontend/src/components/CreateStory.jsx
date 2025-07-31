import { useContext, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import dp from '../assets/dp.webp'
import DiscardPost from "./DiscardPost";
import EmojiPicker from "emoji-picker-react";
import { GrEmoji } from "react-icons/gr";
import postwhite from '../assets/postwhite.png';
import postblack from '../assets/postblack.png';
import axios from "axios";

const CreateStory = ({ setImgSelected, frontendImg, backendImg, discard, setDiscard, setBackendImg, setFrontendImg }) => {

    const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";    

    const { theme } = useContext(ThemeContext)
    const { userData } = useSelector((state) => state.user)

    //-----------------------------------------------------------------------------------

    const [description, setDescription] = useState('')
    const [total, setTotal] = useState(0)
    const [emoji, setEmoji] = useState(false)
    const [loading, setLoading] = useState(false)

    const onEmojiClick = (emojiObject) => {
        setDescription(prev => prev + emojiObject.emoji);
        setEmoji(false);
    };


    const handleCancel = () => {
        setDiscard(false)
    }


    const handleDiscard = () => {
        setBackendImg('')
        setFrontendImg('')
        setImgSelected(false)
        setDiscard(false)
    }

    const handleCreate = async () => {
        if (!description) return;
        setLoading(true)
        const formData = new FormData();
        formData.append('image', backendImg);
        formData.append('description', description);
        try {
            let result = await axios.post(`${serverUrl}/api/story/createstory`, formData, {
                withCredentials: true, headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(result.data);
            window.location.reload();
            setImgSelected(false)
            setBackendImg('')
            setFrontendImg('')
            setDiscard(false)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }


    return (
        <div onClick={(e) => { e.stopPropagation(); }} className="w-fit h-fit flex flex-col items-start md:items-center justify-start md:justify-center md:rounded-xl overflow-hidden">
            {discard && <div>
                <DiscardPost setDiscard={setDiscard} handleDiscard={handleDiscard} handleCancel={handleCancel} theme={theme} />
            </div>}
            <div className={`w-full h-10 flex items-center justify-between px-3 border-b-1 ${theme === 'dark' ? 'border-[#363636] bg-[black]' : (theme === 'light') ? 'border-[#f2f2f2] bg-[#f2f2f2]' : ' border-[#f2f2f2] dark:border-[#363636]'}`}>
                <IoMdArrowRoundBack onClick={() => { setDiscard(true) }} size={24} className={`cursor-pointer active:scale-95 ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} transition-all duration-200 ease-in-out `} />
                <p className={`text-md font-medium ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} `}>Create Story</p>
                <button onClick={() => { handleCreate() }} className={`text-md font-medium cursor-pointer active:scale-95 hover:text-[#006affb3] text-[#006aff]`}>{loading ? (
                    <div className="w-4 h-4 border-t-1 border-b-1 border-white rounded-full animate-spin"></div>
                ) : (
                    'Share'
                )}</button>
            </div>
            <div className="w-fit h-fit flex flex-col md:flex-row items-center justify-center">
                <img src={frontendImg} alt="Story" className="w-screen md:w-130 h-120 md:h-150 xl:w-160 xl:h-180 object-cover" />
                <div className="w-screen md:w-90 h-screen md:h-150 xl:h-180 bg-[#262626] flex flex-col items-start justify-start">
                    <div className="w-fit h-fit p-5 flex items-center justify-center gap-3">
                        <div className="w-8 h-8 overflow-hidden rounded-full"><img src={userData?.user?.profilepic || dp} alt="profile pic" className='w-full h-full object-cover rounded-full' /></div>
                        <p className={`text-sm md:text-md font-medium ${theme === 'dark' ? 'text-[#ffffffd1]' : (theme === 'light') ? 'text-[#000000] ' : ' text-[#000000] dark:text-[#ffffffd1]'} z-60`}>{userData?.user?.username}</p>
                    </div>
                    <textarea value={description} onChange={(e) => { setDescription(e.target.value); setTotal(e.target.value.length) }} name="caption" id="caption" cols="30" rows="10" className={`w-full h-30 px-5 outline-none resize-none bg-transparent leading-6 ${theme === 'dark' ? 'text-[#ffffffd1]' : (theme === 'light') ? 'text-[#000000] ' : ' text-[#000000] dark:text-[#ffffffd1]'} text-sm md:text-[16px] font-normal`} placeholder='Write a caption for your story...'></textarea>
                    <div className="relative w-full flex items-center justify-between p-5">
                        <GrEmoji onClick={() => { setEmoji(!emoji) }} size={22} className={`cursor-pointer active:scale-95 transition-all duration-300 ease-in-out ${theme === 'dark' ? 'text-[#ffffff8f] ' : (theme === 'light') ? 'text-[#5c5b5b]' : ' text-[#5c5b5b] dark:text-[#ffffff8f] '}`} />
                        <div className={`${emoji ? 'block' : 'hidden'} absolute bottom-0 right-10 z-60`}>
                            {emoji && <div onClick={() => { setEmoji(false) }} className={`fixed top-0 left-0 w-full h-full bg-transparent `} />}
                            <div className={`absolute bottom-0 md:-bottom-60 right-5 z-60 `}><EmojiPicker onEmojiClick={onEmojiClick} height={300} width={250} theme={theme === 'dark' ? 'dark' : 'light'} emojiStyle="apple" searchDisabled={true} className='shadow-xl' /></div>
                        </div>
                        <p className={`text-xs  ${total >= 1500 ? 'text-[#ff3040]' : theme === 'dark' ? 'text-[#646363]' : (theme === 'light') ? 'text-[#979797]' : ' text-[#737171] dark:text-[#646363]'}`}>{total}/1500</p>
                    </div>
                    <div className="w-full overflow-hidden">
                        <img src={theme === 'dark' ? postblack : postwhite} alt="img" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateStory
