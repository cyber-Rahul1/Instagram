import { useContext, useEffect, useRef, useState } from "react"
import { ThemeContext } from "../context/ContextProvider"
import { MdCancel } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dp from '../assets/dp.webp';
import axios from "axios";
import { getAllUsers } from "../redux/userSlice";
import { RxCross2 } from "react-icons/rx";

const Search = () => {

    const [search, setSearch] = useState('')
    const [isFocused, setIsFocused] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([])
    const [noResults, setNoResults] = useState(false)
    const { theme, recentUsers, setRecentUsers, setSearchIsFocussed } = useContext(ThemeContext)

    let dispatch = useDispatch()
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
            if (filteredUsers?.length === 0) {
                setNoResults(true)
            } else {
                setNoResults(false)
            }
        }, 1000);
    }

    const handleSearch = async (username, id) => {
        try {
            let result = await axios.post(`${serverUrl}/api/users/addrecentusers`, { identifier: username || id }, { withCredentials: true });
            console.log(result.data);
            setIsFocused(false);
            setSearch('');
            setSearchIsFocussed(false)
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
        <div className="relative flex flex-col w-full h-full px-4 ">
            <h1 className={`text-[26px] tracking-tight font-medium my-5 ml-2 ${(theme === 'dark') ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Search</h1>
            <div className="relative w-full mt-3 mb-3">
                <input onClick={() => handleInput()} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} value={search} onChange={(e) => handleChange(e)} type="text" placeholder={isFocused ? 'Search' : ''} className={`w-full py-[9px] rounded-lg  mb-5 pl-4 outline-none ${theme === 'dark' ? 'bg-[#363636] text-[#ffffff]' : (theme === 'light' ? 'bg-[#efefef] text-black' : 'bg-[#efefef] dark:bg-[#363636] text-[black] dark:text-white')} `} />
                {(!isFocused && search === '') && <div className="absolute  pointer-events-none  top-[9px] right-0 flex items-center justify-between px-3 w-full">
                    <div className="flex items-center justify-center gap-3">
                        <FiSearch size={17} className="text-[#908d8d]" />
                        <p className={`text-[16px]  text-[#a5a0a0]`}>Search</p>
                    </div>
                </div>}
                {isFocused && <div className="absolute cursor-pointer top-[10px] right-3">
                    <MdCancel onMouseDown={(e) => e.preventDefault()} onClick={() => { setIsFocused(false); setSearch(''); setFilteredUsers([]) }} size={20} className="text-[#908d8d]" />
                </div>}
            </div>
            {filteredUsers?.length === 0 && <hr className={`h-[1px] w-full bg-[#363636] absolute top-39 right-0 ${(theme === 'dark') ? ' border-[#363636b4]' : (theme === 'light') ? 'border-gray-300' : ' border-gray-300 dark:border-[#363636b4]'}`} />}
            {( !recentUsers && recentUsers?.length === 0 && filteredUsers?.length === 0) && <div className="h-full w-full">
                <p className={`text-[16px] font-medium mt-4 ml-2 ${(theme === 'dark') ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Recent</p>
                <div className="w-full h-full flex items-center justify-center">
                    <p className={`text-[13px] font-medium ${(theme === 'dark') ? 'text-white' : (theme === 'light') ? 'text-[#686767d8]' : ' text-[#686767d8] dark:text-white'}`}>No recent searches.</p>
                </div>
            </div>}
            {(search !== '' && filteredUsers?.length > 0) &&
                <div className="h-full w-full flex flex-col items-start justify-start px-3 gap-3">
                    {filteredUsers?.map((user) => {
                        return (
                            <div key={user?._id} className="flex items-center gap-3" >
                                <img src={user?.profilepic || dp} alt="profile pic" className="w-10 h-10 rounded-full object-cover" />
                                <div className="flex flex-col items-start justify-start">
                                    <p onClick={() => { handleSearch(user?.username || user?._id); }} className={`cursor-pointer w-full font-semibold ${theme === 'dark' ? 'text-[#ffffff]' : (theme === 'light') ? 'text-[#000000]' : ' text-black dark:text-[#ffffff]'}`}>{user?.username || user?.name}</p>
                                    <p className={`text-[14px] ${theme === 'dark' ? 'text-[#ffffff7c]' : (theme === 'light') ? 'text-[#0000007c]' : ' text-black dark:text-[#ffffff7c]'}`}>{user?.name}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>}
                    {noResults && search !== '' && <div className="h-50 w-full flex items-center justify-center">
                        <p className={`text-[13px] font-medium ${theme === 'dark' ? 'text-[#ffffffe7]' : (theme === 'light') ? 'text-[#000000d0]' : ' text-black dark:text-[#ffffff7c]'} `}>No results found.</p>
                    </div>  }
            {
                ( recentUsers && recentUsers?.length > 0) &&
                <div className="h-full w-full flex flex-col items-start justify-start px-3 gap-3">
                    <div className="flex w-full items-center justify-between">
                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-[#ffffffe7]' : (theme === 'light') ? 'text-[#000000d0]' : ' text-black dark:text-[#ffffff7c]'} `}>Recent</p>
                        <p onClick={() => { handleClearRecentUsers() }} className="text-sm font-medium text-[#708dff] cursor-pointer">Clear all</p>
                    </div>
                    {recentUsers?.map((user) => {
                        return (
                            <div key={user?._id} className="flex items-center w-full justify-between" >
                                <div className="flex w-full items-center gap-3">
                                    <img src={user?.profilepic || dp} alt="profile pic" className="w-10 h-10 rounded-full object-cover" />
                                    <div className="flex flex-col items-start justify-start">
                                        <p onClick={() => { setIsFocused(false); setSearch(''); setSearchIsFocussed(false); navigate(`/profile/${user?.username || user?._id}`) }} className={`cursor-pointer w-full font-semibold ${theme === 'dark' ? 'text-[#ffffff]' : (theme === 'light') ? 'text-[#000000]' : ' text-black dark:text-[#ffffff]'}`}>{user?.username}</p>
                                        <p className={`text-[14px] ${theme === 'dark' ? 'text-[#ffffff7c]' : (theme === 'light') ? 'text-[#0000007c]' : ' text-black dark:text-[#ffffff7c]'}`}>{user?.name}</p>
                                    </div>
                                </div>
                                <RxCross2 onClick={() => { handleClearOneRecentUser(user?._id || user?.username) }} size={20} className="text-[#848485] cursor-pointer" />
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Search
