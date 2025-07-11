import { RxCross2 } from "react-icons/rx"
import dp from '../assets/dp.webp'

const TaggedPopUp = ({ setInput, handleInputChange, input, theme, suggestedUsers, setTaggedUser, taggedUser, setTaggedUsersLength, setMessage, setTaggedpopup }) => {



    const handleTaggedUsers = (user) => {
        if (!taggedUser) {
            setTaggedUser(user?.username);
            setInput('');
            setTaggedpopup(false)
            setTaggedUsersLength(false)
            setMessage(false)
        } else if (taggedUser){
            setInput('');
            setTaggedUsersLength(true)
            setTaggedpopup(false)
            setMessage(true)
            setTimeout(() => {
                setMessage(false)
            }, 2000)
        } else {
            setInput('');
            setTaggedUsersLength(false)
            setMessage(false)
            setTaggedpopup(false)
        }
    }

    return (
        <div onClick={(e) => { e.stopPropagation() }} className={`absolute top-20 md:top-70 md:left-50 w-fit h-50 flex flex-col items-center justify-start bg-[#262626]  px-3 py-2 rounded-md border-1 border-[#535252] md:border-0`}>
                        

            <div className={`relative flex items-center justify-center gap-2 `}>
                <div className={`w-4 h-4 -z-1 -top-3 left-4 rotate-z-45 rounded-sm  absolute ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#262626]'}`} />
                <p className={`text-md ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Tag:</p>
                <div className={`w-full md:w-65 flex items-center justify-center border-1 gap-2 ${theme === 'dark' ? 'text-[#ffffffd1] bg-[#121212] border-[#535252]' : (theme === 'light') ? 'text-[#000000] border-[#d3d3d3]' : ' text-[#000000] border-[#d3d3d3] dark:border-[#535252] dark:text-[#ffffffd1]'} rounded-md pr-2`}>
                    <input value={input} onChange={(e) => { handleInputChange(e) }} type="text" name="tag" id="tag" placeholder='Search' className={`w-full py-1 px-3 rounded-md text-sm outline-none resize-none leading-6 ${theme === 'dark' ? 'text-[#ffffffd1]' : (theme === 'light') ? 'text-[#000000] ' : ' text-[#000000] dark:text-[#ffffffd1]'} font-normal`} />
                    <RxCross2 onClick={() => { setInput('') }} size={20} className={`cursor-pointer ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} active:scale-95 transition-all duration-200 ease-in-out`} />
                </div>
            </div>
            <div className="w-full h-full overflow-auto scrollbar-none bg-[black] rounded-sm my-3">
                {suggestedUsers.slice(0, 6).map((user) => {
                    return (
                        <div onClick={() => { handleTaggedUsers(user) }} key={user._id} className="flex items-center justify-between w-full py-2 px-3 cursor-pointer hover:bg-[#363636] rounded-md">
                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 rounded-full overflow-hidden"><img className="w-full h-full object-cover" src={user?.profilepic || dp} alt="" /></div>
                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold">{user?.name}</p>
                                    <p className="text-[10px] text-[#a7a4a4]">{user?.username}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TaggedPopUp
