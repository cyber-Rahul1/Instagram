import { useContext } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { Outlet } from "react-router-dom";
import SettingsSidebar from "../components/SettingsSidebar";




const Settings = () => {

  const { theme, activeSettings } = useContext(ThemeContext);




  return (
    <div className={`${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} flex h-screen w-full`}>
      <div className={`w-full md:w-100 h-screen flex flex-col items-start justify-center overflow-auto md:pb-0 pb-10 pl-8 border-r-1 ${theme === 'dark' ? 'border-[#363636]' : (theme === 'light') ? 'border-[#f2f2f2]' : ' border-[#f2f2f2] dark:border-[#363636]'} ${activeSettings === 'settings' ? '' : 'hidden md:block'}`}>
        <SettingsSidebar page="settings" />
      </div>
      <Outlet />
    </div>
  )
}

export default Settings
