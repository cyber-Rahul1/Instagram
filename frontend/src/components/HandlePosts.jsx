import { useContext, useEffect, useRef, useState } from 'react'
import add from '../assets/add.png'
import addblack from '../assets/addblack.png'
import { FaArrowLeft } from 'react-icons/fa6'
import DiscardPost from './DiscardPost'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeContext } from '../context/ContextProvider'
import { getAllUsers } from '../redux/userSlice'
import axios from 'axios'
import EditOrCreatePost from './EditOrCreatePost'


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
        if (loading) return;
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
            window.location.reload();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
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
                        <EditOrCreatePost page="create" setDescription={setDescription} setEmoji={setEmoji} setShowtag={setShowtag} next={next} type={type} setTaggedpopup={setTaggedpopup} taggedpopup={taggedpopup} setInput={setInput} frontendImg={frontendImg} taggedUser={taggedUser} showtag={showtag} setTaggedUser={setTaggedUser} setMessage={setMessage} setTaggedUsersLength={setTaggedUsersLength} suggestedUsers={suggestedUsers} setType={setType} userData={userData} setTotal={setTotal} total={total} description={description} emoji={emoji} input={input} />
                        }
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
