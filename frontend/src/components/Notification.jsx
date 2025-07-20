import { useContext } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { useSelector } from "react-redux";


const Notification = () => {

  const { theme } = useContext(ThemeContext);
  const { userData } = useSelector((state) => state.user)

 console.log(userData)

  return (
    <div className="w-full h-full flex flex-col items-start justify-start p-4 pl-5">
      <div className="w-full h-10 flex items-center justify-start">
        <p className={`text-2xl font-medium ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Notifications</p>
      </div>
      <div>
        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-[#ffffffe7]' : (theme === 'light') ? 'text-[#000000d0]' : ' text-[#000000d0] dark:text-[#ffffffe7]'} `}>You don&apos;t have any notifications</p>
      </div>
    </div>
  )
}

export default Notification
