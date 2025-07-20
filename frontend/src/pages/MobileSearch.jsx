import { useContext, useEffect, useRef, useState } from "react"
import { ThemeContext } from "../context/ContextProvider"
import { FiSearch } from "react-icons/fi"
import Explore from "./Explore"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../redux/userSlice"
import dp from '../assets/dp.webp';
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { RxCross2 } from "react-icons/rx";




const MobileSearch = () => {

  let dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [isFocused, setIsFocused] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([])
  const { theme, recentUsers, setRecentUsers } = useContext(ThemeContext)
  let timerRef = useRef(null)
  const navigate = useNavigate()
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
  
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch]);


  const { allUsers } = useSelector((state) => state.user)


 

  const handleChange = (e) => {
    setSearch(e.target.value)
    if (e.target.value === '' || search === '') {
      setFilteredUsers([])
    }
    timerRef.current && clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setFilteredUsers(
        allUsers?.users?.filter((user) => user?.username?.toLowerCase().includes(e.target.value.toLowerCase()) || user?.name?.toLowerCase().includes(e.target.value.toLowerCase()))
      );
    }, 1000);
  }

  const handleSearch = async (username, id) => {
    try {
      let result = await axios.post(`${serverUrl}/api/users/addrecentusers`, { identifier: username || id }, { withCredentials: true });
      console.log(result.data);
      setIsFocused(false);
      setSearch('');
      navigate(`/profile/${username || id}`)
      setFilteredUsers([])
    } catch (error) {
      console.log(error.message)
    }
  }


  const handleInput = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/users/getrecentusers`, { withCredentials: true });
      console.log(result.data);
      setRecentUsers(result.data)
    } catch (error) {
      console.log(error)
    }
    setIsFocused(true);
  }

  const handleClearRecentUsers = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/users/clearrecentusers`, { withCredentials: true });
      console.log(result.data);
      setRecentUsers([])
    } catch (error) {
      console.log(error)
    }
  }

  const handleClearOneRecentUser = async (id, username) => {
    try {
      let result = await axios.post(`${serverUrl}/api/users/clearonerecentuser`, { identifier: id || username }, { withCredentials: true });
      console.log(result.data);
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className={` flex flex-col w-full h-full pt-9 ${theme === 'dark' ? 'text-white bg-black' : (theme === 'light') ? 'text-black bg-white' : ' text-black bg-white dark:bg-black dark:text-white'}`}>
      <div className={`fixed top-0 z-50 w-full h-16 border-0 ${theme === 'dark' ? 'text-white bg-[black]' : (theme === 'light') ? 'text-black bg-white' : ' text-black bg-white dark:bg-black dark:text-white'}`}>
        <div className="h-fit relative flex items-center justify-between w-full gap-2 px-4">
          <FiSearch size={12} className="absolute top-[18px] left-6 text-[#b4b4b4]" />
          <input onClick={() => handleInput()} value={search} onChange={(e) => handleChange(e) } type="text" placeholder={'Search'} className={`w-full py-[5px] my-2 rounded-md border-1 pl-6 text-sm outline-none ${theme === 'dark' ? 'bg-black border-[#a1a0a0] text-[#ffffff]' : (theme === 'light' ? 'bg-white text-black border-[#a1a0a0]' : 'dark:bg-black border-[#a1a0a0] bg-white text-[black] dark:text-white dark:border-[#a1a0a0]')} `} />
          <p onClick={() => { setIsFocused(false); setSearch(''); setFilteredUsers([]) }} className={`${isFocused ? 'block' : 'hidden'} text-sm font-semibold cursor-pointer`}>Cancel</p>
          <hr className={`h-[1px] w-full bg-[#363636] absolute top-12 right-0 ${(theme === 'dark') ? ' border-[#363636b4]' : (theme === 'light') ? 'border-gray-300' : ' border-gray-300 dark:border-[#363636b4]'}`} />
        </div>
      </div>
      {!isFocused && <div className="h-full w-full">
        <Explore />
      </div>}
      {(isFocused && search !== '' && filteredUsers?.length > 0) &&
      <div className="h-full w-full flex flex-col items-start justify-start pt-8 px-3 gap-3">
          {filteredUsers?.map((user) => {
            return (
              <div key={user?._id} className="flex items-center gap-3" >
                <img src={user?.profilepic || dp} alt="profile pic"  className="w-10 h-10 rounded-full object-cover" />
                <div className="flex flex-col items-start justify-start">
                  <p onClick={() => { handleSearch(user?.username || user?._id); }} className="font-semibold">{user?.username}</p>
                  <p className={`text-[14px] ${theme === 'dark' ? 'text-[#ffffff7c]' : (theme === 'light') ? 'text-[#0000007c]' : ' text-black dark:text-[#ffffff7c]'}`}>{user?.name}</p>
                </div>
              </div>
            )})}
      </div> }
      {
        (isFocused && !search && recentUsers?.length > 0) &&  
        <div className="h-full w-full flex flex-col items-start justify-start pt-8 px-3 gap-3">
         <div className="flex w-full items-center justify-between">
            <p className="text-sm font-medium">Recent</p>
            <p onClick={() => { handleClearRecentUsers() }} className="text-sm font-medium text-[#708dff] cursor-pointer">Clear all</p>
        </div>
            {recentUsers?.map((user) => {
            return (
              <div key={user?._id} className="flex items-center w-full justify-between" >
                <div className="flex w-full items-center gap-3">
                  <img src={user?.profilepic || dp} alt="profile pic" className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex flex-col items-start justify-start">
                    <p onClick={() => { setIsFocused(false); setSearch(''); navigate(`/profile/${user?.username || user?._id}`) }} className="font-semibold">{user?.username}</p>
                    <p className={`text-[14px] ${theme === 'dark' ? 'text-[#ffffff7c]' : (theme === 'light') ? 'text-[#0000007c]' : ' text-black dark:text-[#ffffff7c]'}`}>{user?.name}</p>
                  </div>
                </div>
                <RxCross2 onClick={() => { handleClearOneRecentUser(user?._id || user?.username) }} size={20} className="text-[#848485] cursor-pointer" />
              </div>
            )})}
        </div>
      }
    </div>
  )
}

export default MobileSearch
