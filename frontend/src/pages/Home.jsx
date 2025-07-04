import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserCredentials, setIdentifier, setUserEmail } from '../redux/userSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ThemeContext } from '../context/ContextProvider';
import SwitchAccount from '../components/SwitchAccount';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa6';
import { RiMessengerLine } from 'react-icons/ri';
import GetCurrentUser from '../functions/GetCurrentUser';

const Home = () => {
  GetCurrentUser()
  let dispatch = useDispatch();
  const { userEmail, identifier } = useSelector((state) => state.user);
  const { theme, setTheme, activeItem } = useContext(ThemeContext);
  const [switchAccount, setSwitchAccount] = useState(false)
  let navigate = useNavigate()
  let MenuItems = [
    { name: "Notifications", icon: <FaRegHeart size={21} />, path: "/notifications" },
    { name: "Messages", icon: < RiMessengerLine size={24} />, path: "/messages" },
  ];

  useEffect(() => {
    if (identifier || userEmail) {
      dispatch(setIdentifier(null))
      dispatch(setUserEmail(null))
    }

  }, [identifier, userEmail, dispatch])

  useEffect(() => {
    dispatch(clearUserCredentials());
  }, [])

  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme("system");
    }
  }, [ setTheme ]);

  return (
    <div className="md:flex h-screen w-full overflow-hidden">
      <div className="h-fit w-fit ">
        <Sidebar />
      </div>
      {(switchAccount) && <div onClick={() => { setSwitchAccount(false); }} className="fixed top-0 z-50 left-0 w-screen h-screen  flex items-center justify-center">
        <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-85" />
        <SwitchAccount setSwitchAccount={setSwitchAccount} />
      </div>}
      {activeItem === 'Home' && <div className={`${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} w-full fixed top-0 z-10 flex md:hidden items-center justify-between p-4 border-b-1 border-[#a8a5a346]`}>
        <div onClick={() => { setSwitchAccount(true); }} className="active:scale-98 cursor-pointer active:text-[#ffffff94] transition-all duration-200 ease-in-out text-[15px] font-semibold flex items-center gap-1 justify-center"><h2 className="heading text-xl active:text-[#ffffff94] tracking-tight font-medium">Instagram</h2> <span><MdKeyboardArrowDown size={24} /></span></div>
        <div className="flex items-center gap-6">
          {MenuItems.map((item) => (
            <div key={item.name} onClick={() => { navigate(item?.path) }} className="active:scale-95 cursor-pointer active:text-[#ffffff94]">
              {item.icon}
            </div>
          ))}
        </div>
      </div>}
      <Outlet />
    </div>
  )
}

export default Home
