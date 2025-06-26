import { useContext, useState } from "react"
import { ThemeContext } from "../context/ContextProvider"
import { MdCancel } from "react-icons/md";
import { FiSearch } from "react-icons/fi";


const Search = () => {

    const [search, setSearch] = useState('')
    const [isFocused, setIsFocused] = useState(false);
    const { theme } = useContext(ThemeContext)

    return (
        <div className="relative flex flex-col w-full h-full px-4 ">
            <h1 className={`text-[26px] tracking-tight font-medium my-5 ml-2 ${(theme === 'dark') ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Search</h1>
            <div className="relative w-full mt-3 mb-3">
                <input onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder={isFocused ? 'Search' : ''} className={`w-full py-[9px] rounded-lg  mb-5 pl-4 outline-none ${theme === 'dark' ? 'bg-[#363636] text-[#ffffff]' : (theme === 'light' ? 'bg-[#efefef] text-black' : 'bg-[#efefef] dark:bg-[#363636] text-[black] dark:text-white')} `} />
                {(!isFocused && search === '') && <div className="absolute  pointer-events-none  top-[9px] right-0 flex items-center justify-between px-3 w-full">
                    <div className="flex items-center justify-center gap-3">
                        <FiSearch size={17} className="text-[#908d8d]" />
                        <p className={`text-[16px]  text-[#a5a0a0]`}>Search</p>
                    </div>
                </div>}
                {isFocused && <div className="absolute cursor-pointer top-[10px] right-3">
                    <MdCancel onMouseDown={(e) => e.preventDefault()} onClick={() => setSearch('')} size={20} className="text-[#908d8d]" />
                </div>}
            </div>
            <hr className={`h-[1px] w-full bg-[#363636] absolute top-39 right-0 ${(theme === 'dark') ? ' border-[#363636b4]' : (theme === 'light') ? 'border-gray-300' : ' border-gray-300 dark:border-[#363636b4]'}`} />
            <div className="h-full w-full">
                <p className={`text-[16px] font-medium mt-4 ml-2 ${(theme === 'dark') ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Recent</p>
                <div className="w-full h-full flex items-center justify-center">
                    <p className={`text-[13px] font-medium ${(theme === 'dark') ? 'text-white' : (theme === 'light') ? 'text-[#686767d8]' : ' text-[#686767d8] dark:text-white'}`}>No recent searches.</p>
                </div>
            </div>
        </div>
    )
}

export default Search
