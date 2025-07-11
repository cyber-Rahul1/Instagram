
const ShowTaggedUsers = ({ taggedUser, theme }) => {
    return (
        <div className={`flex flex-col items-start justify-center gap-2`}>
            {taggedUser && 
            <div className="flex  items-center gap-2">
                <p className={`text-xs text-start md:text-sm ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>@{taggedUser}</p>
            </div>
            }
        </div>
    )
}

export default ShowTaggedUsers
