
const DiscardPost = ({ setDiscard, handleDiscard, handleCancel, theme }) => {
    return (
        <div onClick={(e) => { e.stopPropagation(); setDiscard(false) }} className="fixed top-0 left-0 z-60 gap-2 w-full h-full flex flex-col items-center justify-center ">
            <div className="fixed top-0 left-0 z-60 w-full h-full  bg-[black] opacity-60" />
            <div className={`w-fit h-fit rounded-xl pt-5 flex flex-col items-center justify-center z-70 ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#262626]'}`}>
                <div className={`flex flex-col items-center justify-center border-b-1 pb-5 px-8 md:px-19 ${theme === 'dark' ? 'border-[#363636]' : (theme === 'light') ? 'border-[#d9d7d7]' : ' border-[#d9d7d7] dark:border-[#363636]'}`}>
                    <h2 className={`text-xl font-normal pb-1 z-60 md:pt-2 ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Discard post?</h2>
                    <p className={`text-sm font-medium  z-60 md:pb-2 ${theme === 'dark' ? 'text-[#a4a0a0d1]' : (theme === 'light') ? 'text-[#807f7f] ' : ' text-[#807f7f] dark:text-[#ffffffd1]'}`}>If you leave, your edits won't be saved.</p>
                </div>
                <p className="text-sm font-medium text-[#ff0101d1] z-60 cursor-pointer py-2 md:py-3 active:scale-95 transition-all duration-200 ease-in-out w-full text-center" onClick={() => { handleDiscard() }}>Discard</p>
                <hr className={`w-full h-[1px] ${theme === 'dark' ? 'bg-[#363636] ' : (theme === 'light') ? 'bg-[#d9d7d7]' : ' bg-[#d9d7d7] dark:bg-[#363636]'} border-none outline-none`} />
                <p className={`text-sm z-60 cursor-pointer py-2 md:py-4 active:scale-95 transition-all duration-200 ease-in-out w-full text-center ${theme === 'dark' ? 'text-white font-medium' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`} onClick={() => { handleCancel() }}>Cancel</p>
            </div>
        </div>
    )
}

export default DiscardPost
