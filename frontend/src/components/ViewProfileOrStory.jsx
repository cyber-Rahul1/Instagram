
const ViewProfileOrStory = ({ setView, theme }) => {
    return (
        <div className={` z-50 py-7 gap-4 flex flex-col rounded-2xl items-center justify-center ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#262626]'}`}>
            <p onClick={() => { setView('story'); }} className="text-[#b2b1b1] text-xl font-semibold border-b-1 border-[#6f6e6e] pb-4 w-full text-center px-10 cursor-pointer">View Story</p>
            <p onClick={() => { setView('dp'); }} className="text-[#b2b1b1] text-xl font-semibold cursor-pointer">View ProfilePic</p>
        </div>
    )
}

export default ViewProfileOrStory
