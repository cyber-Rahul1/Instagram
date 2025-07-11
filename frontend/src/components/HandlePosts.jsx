import { useContext, useEffect, useRef, useState } from 'react'
import add from '../assets/add.png'
import addblack from '../assets/addblack.png'
import { FaArrowLeft } from 'react-icons/fa6'
import DiscardPost from './DiscardPost'
import { useDispatch, useSelector } from 'react-redux'
import dp from '../assets/dp.webp'
import { GrEmoji } from "react-icons/gr";
import postwhite from '../assets/postwhite.png'
import postblack from '../assets/postblack.png'
import EmojiPicker from 'emoji-picker-react';
import { ThemeContext } from '../context/ContextProvider'
import { getAllUsers } from '../redux/userSlice'
import TaggedPopUp from './TaggedPopUp'
import PostType from './PostType'
import ShowTaggedUsers from './ShowTaggedUsers'
import axios from 'axios'


const HandlePosts = ({ setCreate, imgSelected, fileInputRef, setImgSelected }) => {

    const [frontendImg, setFrontendImg] = useState('')
    const [taggedUsersLength, setTaggedUsersLength] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const timerRef = useRef(null);
    const [backendImg, setBackendImg] = useState('')
    const [message, setMessage] = useState(false)
    const [discard, setDiscard] = useState(false)
    const [taggedpopup, setTaggedpopup] = useState(false)
    const [emoji, setEmoji] = useState(false)
    const [total, setTotal] = useState(0)
    const [description, setDescription] = useState('')
    const { userData } = useSelector((state) => state.user)
    const [taggedUser, setTaggedUser] = useState("")
    const [input, setInput] = useState('')
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const [next, setNext] = useState('')
    const [type, setType] = useState('Post')
    const [showtag, setShowtag] = useState(false)
    const { theme } = useContext(ThemeContext)
    const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const { allUsers, status, error } = useSelector((state) => state.user)



    useEffect(() => {
        console.log(allUsers, status, error)
    }, [allUsers, status, error])

    useEffect(() => {
        if (next === 'caption') {
            setTimeout(() => {
                setShowtag(true)
            }, 2000)
        } else {
            setShowtag(false)
        }
    }, [next])


    const handleImg = (e) => {
        setFrontendImg(URL.createObjectURL(e.target.files[0]));
        setBackendImg(e.target.files[0]);
        setImgSelected(true);
    }


    const handleCreate = () => {
        if(loading) return;
        if (!imgSelected) {
            setCreate(false)
        } else {
            setDiscard(true)

        }
    }

    const handleDiscard = () => {
        setDiscard(false)
        setCreate(false)
        setImgSelected(false)
        setFrontendImg('')
        setBackendImg('')
    }

    const handleCancel = () => {
        setDiscard(false)

    }

    const handleBack = () => {
        if (next === 'caption') {
            setNext('')
        } else {
            setDiscard(true)
        }
    }

    const handleNext = (e) => {
        if (next === '') {
            setNext('caption')
        } else if (next === 'caption') {
            handleShare(e)
        }
    }

    const handleShare = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData();
        formData.append('image', backendImg);
        formData.append('description', description);
        formData.append('type', type);
        formData.append('tagged', taggedUser);
        try {
            let result = await axios.post(`${serverUrl}/api/posts/createpost`, formData, {
                withCredentials: true, headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(result);
            setCreate(false)
            setImgSelected(false)
            setFrontendImg('')
            setBackendImg('')
            setDescription('')
            setTaggedUser('')
            setInput('')
            setSuggestedUsers([])
            setNext('')
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const onEmojiClick = (emojiObject) => {
        setDescription(prev => prev + emojiObject.emoji);
        setEmoji(false);
    };

    const handleTag = (e) => {
        e.stopPropagation();
        setShowtag(false)
        if (next === 'caption' && type !== 'Story') {
            setTaggedpopup(!taggedpopup)
        }
    }



    const handleInputChange = (e) => {
        setInput(e.target.value)

    }



    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            if (input.trim() !== '') {
                setSuggestedUsers(
                    allUsers?.users?.filter((user) =>
                        user?.username?.toLowerCase().includes(input.trim().toLowerCase())
                    )
                );
            } else {
                setSuggestedUsers([]);
            }
        }, 1000);

        return () => clearTimeout(timerRef.current);
    }, [input, allUsers, suggestedUsers]);



    return (
        <div onClick={() => { handleCreate() }} className="fixed top-0 left-0 z-60 w-full h-full flex flex-col items-center justify-center ">
            <div className="fixed top-0 left-0 z-60 w-screen h-full  bg-[black] opacity-60" />
            {(taggedUsersLength && message) && <p className={`absolute w-full bottom-0 left-0 text-md border-t-1 z-100 flex items-center justify-center py-3 ${theme === 'dark' ? 'text-white bg-[#181818] border-[#363636]' : (theme === 'light') ? 'text-black bg-[#ffffffd1] border-[#d3d3d3]' : ' text-black bg-[#ffffffd1] dark:text-white dark:bg-[#262626]'}`}>You can only tag maximum 1 user</p>}

            {loading && <div onClick={(e) => { e.stopPropagation(); }} className={`absolute opacity-50 top-0 left-0 w-full bottom-0 l text-md border-t-1 z-100 flex items-center justify-center py-3 ${theme === 'dark' ? 'text-white bg-[#181818] border-[#363636]' : (theme === 'light') ? 'text-black bg-[#ffffffd1] border-[#d3d3d3]' : ' text-black bg-[#ffffffd1] dark:text-white dark:bg-[#262626]'}`}>
                <div className="h-10 w-10 md:h-15 md:w-15 border-t-1 border-b-1  border-[white] rounded-full animate-spin transition-all duration-500 ease-in-out" />
            </div>}

            {/* //----------------------------------------------------------------------------------------------------------------- */}
            {<div onClick={(e) => { e.stopPropagation(); }} className={`" w-screen  md:w-fit h-screen md:h-fit flex items-center ${imgSelected ? 'overflow-y-auto' : ' px-15 md:px-0'}} justify-center`}>

                <div onClick={(e) => { e.stopPropagation(); }} className={` ${imgSelected ? 'h-full w-fit' : ' flex-1 md:w-120 lg:w-160 h-80 rounded-2xl'}  md:h-140 lg:h-170 gap-2 z-60 flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-[black] text-[#ffffffd1]' : (theme === 'light') ? 'bg-white text-[#000000] ' : ' bg-white dark:bg-[black]'}  overflow-hidden md:rounded-2xl`}>
                    {!imgSelected && <div className={`relative text-md w-full flex items-center justify-center h-8 pt-1 font-medium rounded-t-2xl text-[#ffffffd1] ${theme === 'dark' ? 'bg-[black] text-[#ffffffd1]' : (theme === 'light') ? 'bg-white text-[#000000]' : ' bg-white dark:bg-[black]'} z-60`}>
                        <hr className={`absolute top-[36px] h-[1px] w-full bg-[#7a7a7a] border-none outline-none ${next === 'caption' ? 'opacity-50' : 'opacoty-80 pointer-events-none'}`} />
                        <p className={`${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black ' : ' text-black dark:text-white'} text-md font-medium  z-60`}>Create new post</p> </div>}
                    {imgSelected && <div className={`text-md w-full flex items-center pt-1 justify-center h-4 font-medium rounded-t-2xl  ${theme === 'dark' ? 'bg-[#464646] text-[#ffffffd1]' : (theme === 'light') ? 'bg-white text-[#000000] ' : ' bg-white text-[#000000] dark:text-[#ffffffd1] dark:bg-[#262626]'} z-60`}>
                        <div className={`flex items-center justify-between px-4 w-full py-2 ${theme === 'dark' ? 'bg-[black]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[black]'}`}>
                            <FaArrowLeft onClick={() => { handleBack() }} size={25} className={`pt-3 cursor-pointer active:scale-95 ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black ' : ' text-black dark:text-white'} transition-all duration-200 ease-in-out `} />
                            <p className={`text-md font-medium ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} z-60 pt-2`}>Crop</p>

                            <button onClick={(e) => { handleNext(e) }} disabled={next === 'caption' && description === ''} className="text-md font-medium text-[#2571ffd1] z-60 pt-2 cursor-pointer active:scale-95 transition-all duration-200 ease-in-out">{next === 'caption' ? 'Share' : 'Next'}</button>
                        </div>
                    </div>}
                    {!imgSelected ?
                        <div onClick={(e) => { e.stopPropagation(); }} className={`w-full h-full flex flex-col items-center ${theme === 'dark' ? 'text-white bg-[#464646]' : (theme === 'light') ? 'text-black  bg-white' : ' text-black bg-white dark:bg-[#464646] dark:text-white dark:font-medium '} justify-center gap-3`}>
                            <img src={theme === 'dark' ? add : addblack} alt="image" />
                            <p className={`text-sm md:text-lg lg:text-xl ${theme === 'dark' ? 'text-white font-medium ' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Drag photos and videos here</p>
                            <button onClick={() => { fileInputRef.current.click(); setCreate(true) }} className={`text-sm md:text-md  font-medium text-white bg-[#0095f6] px-4 py-[5px] mt-2 rounded-lg hover:bg-[#0085ebd4] cursor-pointer active:scale-95 transition-all duration-300 ease-in-out `}>Select from device</button>
                        </div> :
                        <div className="relative w-fit h-full flex md:flex-row flex-col items-center justify-center">
                            <div onClick={(e) => { handleTag(e) }} className={`w-full md:w-90 lg:w-160 h-full ${(next === 'caption' && type !== 'Story') ? 'cursor-crosshair' : ''} flex items-center justify-center gap-2 overflow-hidden`}>
                                <img src={frontendImg} alt="image" className='w-full h-full object-cover' />

                                {/* showTagged */}
                                {(!taggedUser && type !== 'Story' && next === 'caption') && <div className={`absolute top-5 md:top-8 md:left-55 z-60 w-fit h-fit ${(showtag && !taggedpopup) ? 'opacity-100' : 'opacity-0'} transition-all duration-200 ease-in-out flex items-center justify-center px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-[#171717]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#171717]'}`}>
                                    <div className={`w-4 h-4 z-0 -bottom-1 rotate-z-45 rounded-sm absolute ${theme === 'dark' ? 'bg-[#171717]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#171717]'}`} />
                                    <p className={`text-xs md:text-sm z-10  ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Click photo to tag people</p>
                                </div>}

                                {taggedUser && <div className={`absolute left-10 top-15 md:top-8 md:left-55 z-60 w-fit h-fit transition-all duration-200 ease-in-out flex items-center justify-center px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-[#171717]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#171717]'}`}>
                                    <div className={`w-4 h-4 -z-1 -bottom-1 rotate-z-45  rounded-sm absolute ${theme === 'dark' ? 'bg-[#171717]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#171717]'}`} />
                                    <ShowTaggedUsers taggedUser={taggedUser} setTaggedUsers={setTaggedUser} theme={theme} />
                                </div>}


                                {/* taggedpopup */}
                                {taggedpopup && <div onClick={(e) => { e.stopPropagation(); setTaggedpopup(false) }} className="fixed top-0 left-0 w-screen h-screen z-90 bg-transparent" />}
                                {taggedpopup && <div onClick={(e) => { e.stopPropagation(); setTaggedpopup(false) }} className="absolute top-0 left-0 w-full h-full bg-transparent z-100 flex items-center justify-center">
                                    <TaggedPopUp setTaggedpopup={setTaggedpopup} setMessage={setMessage} setTaggedUsersLength={setTaggedUsersLength} handleInputChange={handleInputChange} input={input} theme={theme} setInput={setInput} suggestedUsers={suggestedUsers} setTaggedUser={setTaggedUser} taggedUser={taggedUser} />
                                </div>}

                                {/* postType */}
                                {(next === '') && <div className="absolute bottom-6 right-8">
                                    <PostType type={type} setType={setType} theme={theme} />
                                </div>}
                            </div>
                            <hr className={`absolute top-[10px] h-[1px] w-full bg-[#7a7a7a] border-none outline-none ${next === 'caption' ? 'opacity-50' : 'opacoty-80 pointer-events-none'}`} />

                            <div className={`${next === 'caption' ? 'transition-all duration-200 ease-in-out w-screen md:w-60 lg:w-80' : 'w-0 opacity-0 pointer-events-none transition-all duration-200 ease-in-out'} h-full flex flex-col transition-all duration-200 ease-in-out ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#262626]'}`} >
                                <div className="w-fit h-fit p-5 flex items-center justify-center gap-3">
                                    <div className="w-8 h-8 overflow-hidden rounded-full"><img src={userData?.user?.profilepic || dp} alt="profile pic" className='w-full h-full object-cover rounded-full' /></div>
                                    <p className={`text-sm md:text-md font-medium ${theme === 'dark' ? 'text-[#ffffffd1]' : (theme === 'light') ? 'text-[#000000] ' : ' text-[#000000] dark:text-[#ffffffd1]'} z-60`}>{userData?.user?.username}</p>
                                </div>
                                <textarea value={description} onChange={(e) => { setDescription(e.target.value); setTotal(e.target.value.length) }} name="caption" id="caption" cols="30" rows="10" className={`w-full h-30 px-5 outline-none resize-none bg-transparent leading-6 ${theme === 'dark' ? 'text-[#ffffffd1]' : (theme === 'light') ? 'text-[#000000] ' : ' text-[#000000] dark:text-[#ffffffd1]'} text-sm md:text-[16px] font-normal`} placeholder={`${type === 'Post' ? 'Write a description...' : type === 'Reel' ? 'Describe about your reel...' : 'Write a caption for your story...'}`}></textarea>
                                <div className="w-full flex items-center justify-between p-5">
                                    <GrEmoji onClick={() => { setEmoji(!emoji) }} size={22} className={`cursor-pointer active:scale-95 transition-all duration-300 ease-in-out ${theme === 'dark' ? 'text-[#ffffff8f] ' : (theme === 'light') ? 'text-[#5c5b5b]' : ' text-[#5c5b5b] dark:text-[#ffffff8f] '}`} />
                                    <div className={`${emoji ? 'block' : 'hidden'} absolute bottom-10 right-10 z-60`}>
                                        {emoji && <div onClick={() => { setEmoji(false) }} className={`fixed top-0 left-0 w-full h-full bg-transparent `} />}
                                        <div className={`absolute bottom-30 -right-5 z-60 `}><EmojiPicker onEmojiClick={onEmojiClick} height={300} width={250} theme={theme === 'dark' ? 'dark' : 'light'} emojiStyle="apple" searchDisabled={true} className='shadow-xl' /></div>
                                    </div>
                                    <p className={`text-xs  ${total >= 1500 ? 'text-[#ff3040]' : theme === 'dark' ? 'text-[#646363]' : (theme === 'light') ? 'text-[#979797]' : ' text-[#737171] dark:text-[#646363]'}`}>{total}/1500</p>
                                </div>
                                <div className="w-full  overflow-hidden">
                                    <img src={theme === 'dark' ? postblack : postwhite} alt="img" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>}
                </div>
            </div>}
            <input onChange={(e) => { handleImg(e) }} type="file" id="file" accept="image/*" ref={fileInputRef} className="hidden" />


            {/* //----------------------------------------------------------------------------------------------------------------- */}

            {discard && <div>
                <DiscardPost setDiscard={setDiscard} handleDiscard={handleDiscard} handleCancel={handleCancel} theme={theme} />
            </div>}
        </div>
    )
}

export default HandlePosts
