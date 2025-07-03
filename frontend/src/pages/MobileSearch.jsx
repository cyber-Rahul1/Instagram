import { useContext, useState } from "react"
import { ThemeContext } from "../context/ContextProvider"
import { FiSearch } from "react-icons/fi"



const MobileSearch = () => {

  const [search, setSearch] = useState('')
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useContext(ThemeContext)
  
  
  return (
    <div className={`relative flex flex-col w-full h-full px-4 ${theme === 'dark' ? 'text-white bg-black' : (theme === 'light') ? 'text-black bg-white' : ' text-black bg-white dark:bg-black dark:text-white'}`}>
      <FiSearch size={12} className="absolute top-[18px] left-6 text-[#b4b4b4]" />
      <div className="flex items-center justify-between w-full gap-2">
        <input onClick={() => setIsFocused(true)}  value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder={'Search'} className={`w-full py-[5px] my-2 rounded-md border-1 pl-6 text-sm outline-none ${theme === 'dark' ? 'bg-black border-[#a1a0a0] text-[#ffffff]' : (theme === 'light' ? 'bg-white text-black border-[#a1a0a0]' : 'dark:bg-black border-[#a1a0a0] bg-white text-[black] dark:text-white dark:border-[#a1a0a0]')} `} />
        <p onClick={() => {setIsFocused(false); setSearch('');}} className={`${isFocused ? 'block' : 'hidden'} text-sm font-semibold cursor-pointer`}>Cancel</p>
      </div>
      <hr className={`h-[1px] w-full bg-[#363636] absolute top-12 right-0 ${(theme === 'dark') ? ' border-[#363636b4]' : (theme === 'light') ? 'border-gray-300' : ' border-gray-300 dark:border-[#363636b4]'}`} />
    </div>
  )
}

export default MobileSearch
