
const PostType = ({ type, setType, theme }) => {

    const postType = [
        { name: "Post", value: "Post" },
        { name: "Reel", value: "Reel" },
        { name: "Story", value: "Story" },
    ]

    return (
        <div onClick = { (e) => { e.stopPropagation(); }} className = {`shadow-lg rounded-full px-6 py-2 w-fit h-fit flex items-center justify-center gap-3 ${theme === 'dark' ? 'bg-[#171717]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#171717]'}`} >
            {
                postType.map((item) => {
                    return (
                        <div key={item.name}>
                            <p onClick={() => { setType(item.value) }} className={`${type === item.value ? theme === 'dark' ? 'text-[#ffffffd1]' : (theme === 'light') ? 'text-[#000000] ' : ' text-[#000000] dark:text-[#ffffffd1]' : theme === 'dark' ? 'text-[#ffffff52]' : (theme === 'light') ? 'text-[#43434352]' : 'text-[#45444452]'} text-sm font-medium cursor-pointer active:scale-95 transition-all duration-200 ease-in-out`}>{item.name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PostType
