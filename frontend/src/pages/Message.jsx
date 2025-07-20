import { useContext } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { Outlet } from "react-router-dom";

const Message = () => {

    const { theme, setActiveItem, setSearchIsFocussed, setNotificationIsFocussed } = useContext(ThemeContext);


  return (
    <div onClick={() => { setActiveItem('Messages'); setSearchIsFocussed(false); setNotificationIsFocussed(false); }} className={`${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} flex h-screen w-full`}>
      Messaging Page
      <Outlet />
    </div>
  )
}

export default Message
