import { useContext } from "react"
import { ThemeContext } from "../context/ContextProvider"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RiAddLine } from "react-icons/ri";
import dp from '../assets/dp.webp';
import { useRef } from "react";
import ViewStoryCards from "./ViewStoryCards";
import CreateStory from "./CreateStory";



const Stories = () => {



    const { theme, setViewStory, viewStory } = useContext(ThemeContext)
    const { userData } = useSelector((state) => state.user)
    const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

    const [stories, setStories] = useState([])
    const [imgSelected, setImgSelected] = useState(false)
    const [frontendImg, setFrontendImg] = useState('')
    const [backendImg, setBackendImg] = useState('')
    const [story, setStory] = useState('')
    const [storyId, setStoryId] = useState('')
    const [storyIndex, setStoryIndex] = useState(0)
    const [discard, setDiscard] = useState(false)

    const fileInputRef = useRef(null);



    useEffect(() => {
        const fetchStories = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/story/getallstories`, { withCredentials: true });
                if (userData?.user?.story?._id) {
                    setStories([userData?.user?.story, ...result.data.filteredStories]);
                } else {
                    setStories(result.data.filteredStories);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchStories();
    }, [serverUrl, userData])


    const handleViewStory = (id) => {
        setViewStory(true)
        setStoryId(id)
        setStory(stories.find(story => story._id === id))
        setStoryIndex(stories.findIndex(story => story._id === id))
    }

    const handleImg = (e) => {
        if (e.target.files[0]) {
            setFrontendImg(URL.createObjectURL(e.target.files[0]));
            setBackendImg(e.target.files[0]);
            setImgSelected(true);
        }
    }




    return (
        <div className="w-full h-fit flex items-center justify-start gap-4 p-2 overflow-x-auto scrollbar-none overflow-y-hidden scroll-smooth">
            {viewStory && <div onClick={(e) => { e.stopPropagation(); }} className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[black] md:bg-[#1A1A1A] z-100">
                <ViewStoryCards page='main' story={story} setViewStory={setViewStory} storyId={storyId} setStoryId={setStoryId} stories={stories} storyIndex={storyIndex} setStoryIndex={setStoryIndex} />
            </div>}
            <input onChange={(e) => { handleImg(e) }} type="file" id="file" accept="image/*" ref={fileInputRef} className="hidden" />
            {imgSelected && <div onClick={(e) => { e.stopPropagation(); setDiscard(true) }} className="fixed top-0 left-0 w-screen h-screen flex items-start md:items-center justify-start md:justify-center bg-[#00000094] z-100">
                <CreateStory setImgSelected={setImgSelected} frontendImg={frontendImg} backendImg={backendImg} discard={discard} setDiscard={setDiscard} />
            </div>}
            {!userData?.user?.story?._id && <div className="w-fit h-fit flex flex-col items-center justify-center gap-1">
                <div className="relative w-16 h-16 rounded-full z-10 flex items-center justify-center">
                    <img src={userData?.user?.profilepic || dp} alt="profile pic" className={`cursor-pointer w-15 h-15 z-10 rounded-full object-cover border-2 ${theme === 'dark' ? 'border-[#000000]' : (theme === 'light') ? 'border-[#ffffff]' : ' border-[#ffffff] dark:border-[#000000]'}`} />
                    <div onClick={() => { fileInputRef.current.click(); }} className={`absolute bottom-0 z-10 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${theme === 'dark' ? 'bg-[#ffffff] border-[#000000]' : (theme === 'light') ? 'bg-[#000000] border-[#ffffff]' : ' bg-[#ffffff94] dark:bg-[#ffffff]'}`}>
                        <RiAddLine size={16} className={` cursor-pointer ${theme === 'dark' ? 'text-[#000000]' : (theme === 'light') ? 'text-[#ffffff]' : ' text-[#ffffff] dark:text-[#000000]'}`} />
                    </div>
                </div>
                <p className={`text-xs font-medium ${theme === 'dark' ? 'text-[#ffffff]' : (theme === 'light') ? 'text-[#000000]' : ' text-[#000000] dark:text-[#ffffff]'}`}>Your story</p>
            </div>}
            {stories?.map((story) => (
                <div key={story._id} className="w-fit h-fit flex flex-col items-center justify-center gap-1">
                    <div key={story._id} className={`relative w-16 h-16 rounded-full z-0 ${(story?.views?.some(v => v === userData?.user?._id)) ? 'bg-[#363636b1]' : 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600'} flex items-center justify-center`}>
                        <img onClick={() => { handleViewStory(story._id) }} src={(story?.author?.profilepic) || dp} alt="profile pic" className={`cursor-pointer w-15 h-15 rounded-full object-cover border-2 ${theme === 'dark' ? 'border-[#000000]' : (theme === 'light') ? 'border-[#ffffff]' : ' border-[#ffffff] dark:border-[#000000]'}`} />
                        {story?.author?._id === userData?.user?._id && <div onClick={() => { fileInputRef.current.click(); }} className={`absolute bottom-0 z-10 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 ${theme === 'dark' ? 'bg-[#ffffff] border-[#000000]' : (theme === 'light') ? 'bg-[#000000] border-[#ffffff]' : ' bg-[#ffffff94] dark:bg-[#ffffff]'}`}>
                            <RiAddLine size={16} className={` cursor-pointer ${theme === 'dark' ? 'text-[#000000]' : (theme === 'light') ? 'text-[#ffffff]' : ' text-[#ffffff] dark:text-[#000000]'}`} />
                        </div>}
                    </div>
                    <p className={`text-xs font-medium ${theme === 'dark' ? 'text-[#ffffff]' : (theme === 'light') ? 'text-[#000000]' : ' text-[#000000] dark:text-[#ffffff]'}`}>{(story?.author?._id === userData?.user?._id) ? 'Your story' : (story?.author?.username || story?.author?.name)}</p>
                </div>

            ))}
        </div>
    )
}

export default Stories
