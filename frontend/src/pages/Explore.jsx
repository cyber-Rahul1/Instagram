import { useContext } from "react"
import { ThemeContext } from "../context/ContextProvider"

const Explore = () => {


    const { theme, setActiveItem, setSearchIsFocussed, setNotificationIsFocussed } = useContext(ThemeContext)

  return (

    <div onClick={() => { setActiveItem('Explore'); setSearchIsFocussed(false); setNotificationIsFocussed(false); }} className={`${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} flex h-screen w-full`}>
      Explore Page
    </div>
  )
}

export default Explore
