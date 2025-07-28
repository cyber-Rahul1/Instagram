import { useNavigate } from "react-router-dom"
import { RxCross2 } from "react-icons/rx";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import dp from '../assets/dp.webp';
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoPlay } from "react-icons/io5";
import { MdOutlinePause } from "react-icons/md";
import { PiSpeakerSimpleHighFill } from "react-icons/pi";
import { PiSpeakerSimpleSlashFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import AboutAccount from "./AboutAccount";
import { GoHeart } from "react-icons/go";
import { FiSend } from "react-icons/fi";
import heartfill from '../assets/heartfill.png'



const ViewStoryCards = ({ setViewStory, storyId, page, stories, storyIndex, setStoryIndex }) => {

    const { setShowCross, theme } = useContext(ThemeContext)
    const { userData } = useSelector((state) => state.user)
    const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
    const navigate = useNavigate()
    const progressBarRef = useRef(null);
    const animRef = useRef(null);
    const inputRef = useRef(null);

    const [story1, setStory1] = useState('')
    const [paused, setPaused] = useState(false)
    const [muted, setMuted] = useState(false)
    const [options, setOptions] = useState(false)
    const [focussed, setFocused] = useState(false)
    const [aboutAccount, setAboutAccount] = useState(false)



    //-------------------------------------------------------------------

    useEffect(() => {

        const fetchStory = async () => {
            if (page === 'profile' || page !== 'main') {
                try {
                    let result = await axios.get(`${serverUrl}/api/story/getstory/${storyId}`, { withCredentials: true });
                    setStory1(result.data?.story);
                } catch (error) {
                    console.log(error);
                }

            } else if ((page !== 'profile' || page === 'main') && storyIndex !== -1) {
                try {
                    let result = await axios.get(`${serverUrl}/api/story/getstory/${stories[storyIndex]._id}`, { withCredentials: true });
                    setStory1(result.data?.story);
                } catch (error) {
                    console.log(error);
                }

            }
        }
        fetchStory();
    }, [storyId, storyIndex, stories, serverUrl, page])


    //-------------------------------------------------------------------


    const menuItems = [
        { label: userData?.user?._id === story1?.author?._id ? "Delete" : "Report inappropriate", color: "red" },
        { label: "About this account", color: "white" },
        { label: "Cancel", color: "white" }
    ];


    //-------------------------------------------------------------------

    const handleLeft = async () => {
        progressBarRef.current.style.width = '0%';
        if (storyIndex > 0) {
            const newIndex = storyIndex - 1;
            setStoryIndex(newIndex);
            try {
                let result = await axios.get(`${serverUrl}/api/story/getstory/${stories[newIndex]._id}`, { withCredentials: true });
                setStory1(result.data?.story);
            } catch (error) {
                console.log(error)
            }
        }
    }

    //-------------------------------------------------------------------


    const handleRight = async () => {
        progressBarRef.current.style.width = '0%';
        if (storyIndex === stories?.length - 1) {
            setViewStory(false)
            return;
        }
        if (storyIndex < stories?.length - 1) {
            const newIndex = storyIndex + 1;
            setStoryIndex(newIndex);
            try {
                let result = await axios.get(`${serverUrl}/api/story/getstory/${stories[newIndex]._id}`, { withCredentials: true });
                setStory1(result.data?.story);
            } catch (error) {
                console.log(error)
            }
        }
    }

    //-------------------------------------------------------------------



    useGSAP(() => {
        if (animRef.current) {
            animRef.current.kill();
        }

        if (story1?.image) {
            animRef.current = gsap.fromTo(
                progressBarRef.current,
                { width: "0%" },
                {
                    width: "100%",
                    duration: 3,
                    ease: "linear",
                    onComplete: handleRight,
                }
            );
        }

        if (paused) {
            animRef.current.pause();
        }

        return () => animRef.current?.kill();
    }, [storyIndex, story1?.image]);



    //-------------------------------------------------------------------


    useEffect(() => {
        if (paused) {
            animRef.current?.pause();
        } else {
            animRef.current?.play();
        }
    }, [paused]);



    //-------------------------------------------------------------------


    const handleDelete = async () => {
        try {
            await axios.delete(`${serverUrl}/api/story/deletestory/${story1?._id}`, { withCredentials: true });
            setViewStory(false)
        } catch (error) {
            console.log(error)
        }
    }

    //-------------------------------------------------------------------

    const handleAbout = () => {
        setAboutAccount(!aboutAccount)
        setOptions(false)
    }

    //-------------------------------------------------------------------

    useEffect(() => {
        const handleViewStory = async () => {
           if (story1?.views?.some(v => v._id === userData?.user?._id)) {
               return;
           } else if (story1?._id) {
               try {
                   let result = await axios.get(`${serverUrl}/api/story/viewstory/${story1?._id}`, { withCredentials: true });
                   setStory1(result.data?.story);
               } catch (error) {
                   console.log(error)
               }
           }
       }
       handleViewStory();

    }, [serverUrl, story1, userData?.user?._id])

    //-------------------------------------------------------------------

    const handleLike = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/story/likestory/${story1?._id}`, { withCredentials: true });
            setStory1(result.data?.story);
        } catch (error) {
            console.log(error)
        }
    }

    //-------------------------------------------------------------------

    return (
        <div className=" w-screen h-screen md:w-fit md:h-fit flex items-center justify-center">
            <h1 onClick={() => { setViewStory(false) }} className="hidden md:block heading absolute left-10 top-5 text-white text-3xl font-bold cursor-pointer">Instagram</h1>
            {story1?.image && <div className="relative flex items-center justify-center w-fit h-screen pb-20 md:py-10 ">
                {<div onClick={() => { handleLeft() }} className={`${page !== 'main' ? 'hidden' : ''} absolute md:relative md:mb-40 left-0 top-30 h-150 md:h-fit w-30 md:w-20 flex items-center justify-center ${storyIndex === 0 ? 'opacity-0 pointer-events-none' : ''}`}>
                    <TfiArrowCircleLeft size={24} className={`cursor-pointer hidden md:block text-[#ffffff80] hover:text-white active:scale-95 transition-all duration-200 ease-in-out`} />
                </div>}
                <div className="absolute top-5 md:top-15 w-[90%] md:w-110 h-[4px] flex items-center justify-start bg-[#55555585] rounded-full z-0">
                    <div ref={progressBarRef} className={`progress-bar h-[4px] bg-white rounded-full`}>
                    </div>
                </div>
                <img src={story1?.image} alt="story" className="md:w-120 h-full pointer-events-none object-cover md:rounded-xl " />
                <div className={`absolute bottom-5 md:bottom-15 left-0 w-full h-fit z-150 px-2  flex items-center justify-between gap-2 ${page !== 'main' ? 'px-6' : 'px-6 md:px-26'}`}>
                    <input ref={inputRef} onFocus={() => { setFocused(true) }} onBlur={() => { setFocused(false) }} type="text" placeholder={`Reply to ${story1?.author?.username || story1?.author?.name}...`} className="placeholder:text-white w-full h-fit py-2 bg-transparent outline-none border-1 border-white text-white rounded-full z-50 px-5" />
                    <div className={`w-fit h-fit flex items-center justify-center gap-2 ${focussed ? 'hidden' : ''}`}>
                        <div onClick={() => { handleLike() }} className="w-fit h-fit flex items-center">
                            {(story1?.likes && Array.isArray(story1?.likes) && story1?.likes?.some(l => l._id === userData?.user?._id)) ? <img src={heartfill} alt="liked" className="w-7 h-7 cursor-pointer transition-all duration-200 ease-in-out" /> : <GoHeart size={27} className={`text-white active:scale-95 cursor-pointer transition-all duration-200 ease-in-out`} />}
                        </div>
                        <FiSend size={27} className={`text-white active:scale-95 cursor-pointer transition-all duration-200 ease-in-out`} />
                    </div>
                </div>
                <div className={`absolute top-10 md:top-20 left-0 w-full h-fit flex items-start justify-between z-250 gap-2 ${page !== 'main' ? 'px-6' : 'px-6 md:px-26'}`}>
                    <div className="w-full h-fit flex items-center justify-start gap-2">
                        {<img src={story1?.author?.profilepic || dp} alt="story author" className="w-10 h-10 rounded-full object-cover border-2 border-white" />}
                        <div className="flex flex-col items-start justify-start">
                            <p onClick={() => { navigate(`/profile/${story1?.author?._id}`, { replace: true }) }} className="text-white text-sm cursor-pointer font-medium">{story1?.author?.username || story1?.author?.name}</p>
                            <p className={"text-[#ffffff7d] text-xs font-medium"}>{moment(story1?.createdAt).fromNow()}</p>
                        </div>
                    </div>
                    {muted ? <PiSpeakerSimpleSlashFill onClick={(e) => { e.stopPropagation(); setMuted(!muted) }} size={24} className={`cursor-pointer z-100 text-white active:scale-95 transition-all duration-200 ease-in-out`} /> : <PiSpeakerSimpleHighFill onClick={(e) => { e.stopPropagation(); setMuted(!muted) }} size={24} className={`pointer-events-auto cursor-pointer z-100 text-white active:scale-95 transition-all duration-200 ease-in-out`} />}
                    {paused ? <IoPlay onClick={(e) => { e.stopPropagation(); setPaused(!paused) }} size={24} className={`cursor-pointer z-100 text-white active:scale-95 transition-all duration-200 ease-in-out`} /> : <MdOutlinePause onClick={(e) => { e.stopPropagation(); setPaused(!paused) }} size={24} className={`pointer-events-auto cursor-pointer z-100 text-white active:scale-95 transition-all duration-200 ease-in-out`} />}
                    <BsThreeDots onClick={(e) => { e.stopPropagation(); setOptions(!options) }} size={24} className={`pointer-events-auto cursor-pointer z-100 text-white active:scale-95 transition-all duration-200 ease-in-out`} />
                </div>
                <div onMouseDown={(e) => { e.stopPropagation(); setPaused(true); }} onMouseUp={(e) => { e.stopPropagation(); setPaused(false); }} onTouchStart={(e) => { e.stopPropagation(); setPaused(true); }} onTouchEnd={(e) => { e.stopPropagation(); setPaused(false); }} className="absolute md:left-55 top-50 w-40 h-130"/>
                <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center pointer-events-none">
                    <p className="text-white text-xl text-shadow-lg font-semibold">{story1?.caption}</p>
                </div>
                {<div onClick={() => { handleRight() }} className={`${page !== 'main' ? 'hidden' : ''} absolute md:relative md:mb-40 right-0 top-30 h-150 md:h-fit w-30 md:w-20 flex items-center justify-center ${storyIndex === stories?.length - 1 ? 'opacity-0 pointer-events-none' : ''}`}>
                    <TfiArrowCircleRight size={24} className={`hidden md:block cursor-pointer text-[#ffffff80] hover:text-white active:scale-95 transition-all duration-200 ease-in-out`} />
                </div>}
                {options &&
                    <div onClick={() => { setOptions(false) }} className="fixed top-0 left-0 z-100 w-screen bg-[#00000087] h-screen flex items-center justify-center" >
                        <div onClick={(e) => { e.stopPropagation() }} className="w-fit h-fit flex flex-col items-center justify-center bg-[#262626] rounded-2xl pb-1 ">
                            {menuItems.map((item) => (
                                <div key={item.label} className="w-fit h-fit flex flex-col items-center justify-center">
                                    <div className={`w-100 h-fit flex items-center justify-center ${item.label === "Cancel" ? 'border-b-0' : 'border-b-1'} ${theme === 'dark' ? 'border-[#363636]' : (theme === 'light') ? 'border-[#f2f2f2]' : ' border-[#f2f2f2] dark:border-[#363636]'}`} >
                                        <p onClick={() => { item.label === "Cancel" ? setOptions(false) : item.label === "Report inappropriate" ? setOptions(false) : item.label === "About this account" ? handleAbout() : handleDelete() }} className={`text-[${item.color === 'red' ? '#ED4956' : 'white'}] text-sm py-4 cursor-pointer font-medium`}>{item.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>}
            </div>}
            <RxCross2 onClick={() => { setViewStory(false); setShowCross(false) }} size={28} className={`hidden md:block absolute top-5 z-10 right-10 cursor-pointer text-white `} />
            {aboutAccount && <div onClick={() => { setAboutAccount(false); }} className="fixed top-0 z-50 left-0 w-screen h-screen bg-[#00000081] flex items-center justify-center" >
                <AboutAccount setAboutAcc={setAboutAccount} theme={theme} country='India' user={story1?.author} userPost={story1} post={story1} />
            </div>}
        </div>
    )
}

export default ViewStoryCards
