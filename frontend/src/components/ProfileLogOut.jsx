
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ContextProvider';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const ProfileLogOut = ({ setLogout }) => {

  const navigate = useNavigate()
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.user)

  const menuItems = [
    { name: "Apps and websites", path: "/soon" },
    { name: "QR code", path: "/soon" },
    { name: "Notifications", path: `/settings/${userData?.user?.username || userData?.user?._id}/soon` },
    { name: "Settings and privacy", path: "/settings" },
    { name: "Supervision", path: "/soon" },
    { name: "Login activity", path: "/soon" },
    { name: "Log Out" },
    { name: "Cancel", path: "/cancel" },
  ];

  const handleLogOut = async () => {
    setLogout(false)
    try {
      let result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, { withCredentials: true })
      console.log(result);
      dispatch(setUserData({}))
      localStorage.removeItem('token')
      navigate('/login', { replace: true })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`w-fit h-fit relative rounded-xl flex flex-col items-center justify-center  ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#262626]'}`}>
      {menuItems.map((item) => (
        <div key={item.name} onClick={() => { item.name === "Cancel" ? setLogout(false) : item.name === "Log Out" ? handleLogOut() : navigate(item?.path); }} className={`${item.name === "Cancel" ? 'border-b-0' : 'border-b-1'} flex items-center justify-center py-[15px]  px-30 w-full cursor-pointer active:scale-95 transition-all duration-200 ease-in-out ${theme === 'dark' ? 'border-[#363636] text-white' : (theme === 'light') ? 'border-[#f2f2f2] text-black' : ' border-[#f2f2f2] dark:border-[#363636] text-black dark:text-white'}`}>
          <p className=" text-sm cursor-pointer text-center">{item.name}</p>
        </div>
      ))}
    </div>
  )
}

export default ProfileLogOut
