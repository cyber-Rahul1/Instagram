
const ViewProfileOrStory = ({ setView, theme, setViewStory }) => {



    return (
        <div className={` py-5 z-50 gap-4 flex flex-col rounded-2xl items-center justify-center ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#262626]'}`}>
            <p onClick={() => { setView('story'); setViewStory(true); setTimeout(() => {
                setViewStory(false);
            }, 3000);
            }} className={`hover:text-[#717171] ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} text-md font-semibold border-b-1 border-[#6f6e6e81] pb-4 w-full text-center px-10 cursor-pointer`}>View Story</p>
            <p onClick={() => { setView('dp'); }} className={`hover:text-[#717171] ${theme === 'dark' ? 'text-white ' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} text-md font-semibold cursor-pointer`}>View ProfilePic</p>
        </div>
    )
}

export default ViewProfileOrStory
