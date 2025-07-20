
import { RxCross2 } from "react-icons/rx";


const ShowTaggedUsers = ({ taggedUser, theme }) => {
    return (
        <div className={`flex flex-col items-start justify-center gap-2`}>
            {taggedUser && 
            <div className="flex  items-center gap-2">
                <p className={`text-xs text-start md:text-sm ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>@{taggedUser}  </p>
                    <RxCross2  size={16} className={`ml-1 cursor-pointer ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} active:scale-95 transition-all duration-200 ease-in-out`} />
            </div>
            }
        </div>
    )
}

export default ShowTaggedUsers
