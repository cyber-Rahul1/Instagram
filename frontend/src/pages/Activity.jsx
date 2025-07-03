import { useContext } from "react";
import { ThemeContext } from "../context/ContextProvider";
import LoginFooter from "../components/LoginFooter";
import instaExclamation  from '../assets/instaExclamation.png'

const Activity = () => {

  const { theme } = useContext(ThemeContext)

  return (
    <div className={`pb-10 ${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} flex flex-col justify-between h-screen w-full`}>
      <div className="w-full h-fit flex flex-col items-center justify-center gap-4 pt-15 ">
        <div className="flex items-center w-30 h-30 "><img src={instaExclamation} alt="image" className="w-full h-full object-cover" /></div>
        <h2 className="text-2xl font-bold">You haven&apos;t liked anything</h2>
        <p className="text-sm text-center text-[#ffffffa5]">When you like a post, it will appear here.</p>
      </div>
      <div>
        <LoginFooter theme={theme} page="posts" />
      </div>
    </div>
  )
}

export default Activity
