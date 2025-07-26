import dp from '../assets/dp.webp';
import { GrEmoji } from "react-icons/gr";
import EmojiPicker from 'emoji-picker-react';
import TaggedPopUp from './TaggedPopUp';
import ShowTaggedUsers from './ShowTaggedUsers';
import PostType from './PostType';
import postwhite from '../assets/postwhite.png';
import postblack from '../assets/postblack.png';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ContextProvider';


const EditOrCreatePost = ({ setDescription, setEmoji, setShowtag, next, type, setTaggedpopup, taggedpopup, setInput, frontendImg, taggedUser, showtag, setTaggedUser, setMessage, setTaggedUsersLength, suggestedUsers, setType, userData, setTotal, total, description, emoji, input, page }) => {

    const { theme } = useContext(ThemeContext)


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

    useEffect(() => {
        if (page === 'edit') {
            setTimeout(() => {
                setShowtag(true)
            }, 2000)
        } else if (page !== 'story') {
            setShowtag(false)
        }
    }, [page, setShowtag])


    const handleInputChange = (e) => {
        setInput(e.target.value)

    }





    return (
        <div className="relative w-fit h-full flex md:flex-row flex-col items-center justify-center">
            <div onClick={(e) => { handleTag(e) }} className={`w-full md:w-90 lg:w-160 h-full ${(next === 'caption' && type !== 'Story') ? 'cursor-crosshair' : ''} flex items-center justify-center gap-2 overflow-hidden`}>
                <img src={frontendImg} alt="image" className='w-full h-full object-cover' />

                {/* showTagged */}
                {(!taggedUser && type !== 'Story' && next === 'caption' && page !== 'story') && <div className={`absolute top-5 md:top-8 md:left-55 z-60 w-fit h-fit ${(showtag && !taggedpopup) ? 'opacity-100' : 'opacity-0'} transition-all duration-200 ease-in-out flex items-center justify-center px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-[#171717]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#171717]'}`}>
                    <div className={`w-4 h-4 z-0 -bottom-1 rotate-z-45 rounded-sm absolute ${theme === 'dark' ? 'bg-[#171717]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#171717]'}`} />
                    <p className={`text-xs md:text-sm z-10  ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Click photo to tag people</p>
                </div>}

                {(taggedUser && page !== 'story') && <div className={`absolute left-10 top-15 md:top-8 md:left-55 z-60 w-fit h-fit transition-all duration-200 ease-in-out flex items-center justify-center px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-[#171717]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#171717]'}`}>
                    <div className={`w-4 h-4 -z-1 -bottom-1 rotate-z-45  rounded-sm absolute ${theme === 'dark' ? 'bg-[#171717]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#171717]'}`} />
                    <ShowTaggedUsers taggedUser={taggedUser} setTaggedUsers={setTaggedUser} theme={theme} />
                </div>}


                {/* taggedpopup */}
                {taggedpopup && <div onClick={(e) => { e.stopPropagation(); setTaggedpopup(false) }} className="fixed top-0 left-0 w-screen h-screen z-90 bg-transparent" />}
                {(taggedpopup && page !== 'story') && <div onClick={(e) => { e.stopPropagation(); setTaggedpopup(false) }} className="absolute top-0 left-0 w-full h-full bg-transparent z-100 flex items-center justify-center">
                    <TaggedPopUp setTaggedpopup={setTaggedpopup} setMessage={setMessage} setTaggedUsersLength={setTaggedUsersLength} handleInputChange={handleInputChange} input={input} theme={theme} setInput={setInput} suggestedUsers={suggestedUsers} setTaggedUser={setTaggedUser} taggedUser={taggedUser} />
                </div>}

                {/* postType */}
                {(next === '' && page !== 'story') && <div className="absolute bottom-6 right-8">
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
                <div className="w-full overflow-hidden">
                    <img src={theme === 'dark' ? postblack : postwhite} alt="img" className="w-full h-full object-cover" />
                </div>

            </div>
        </div>
    )
}

export default EditOrCreatePost
