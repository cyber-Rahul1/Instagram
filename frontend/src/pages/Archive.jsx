import { useContext } from 'react'
import { ThemeContext } from '../context/ContextProvider';
import { SiStagetimer } from "react-icons/si";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { GiBackwardTime } from "react-icons/gi";
import LoginFooter from '../components/LoginFooter';

const Archive = () => {
   
   const { userData } = useSelector((state) => state.user)
   const { theme } = useContext(ThemeContext);
   const navigate = useNavigate();
   

  return (
    <div  className={`${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} flex flex-col items-center justify-start  pt-20 md:pt-0 w-full lg:px-auto h-screen  transition-all duration-200 ease-in-out`}>
      <div className='w-full h-fit px-4 overflow-auto flex flex-col items-center justify-start pb-20 md:pb-0'>
        <div className="relative w-full lg:w-[1050px] h-50 md:h-90 flex flex-col items-center justify-end pt-5 border-b-1 border-[#a8a5a346]">
          <div className={`w-full  flex justify-start items-center ${(theme === 'dark') ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>
            <div onClick={() => { navigate(`/profile/${userData?.user?.username || userData?.user?._id}`) }} className='cursor-pointer flex justify-start items-center active:text-[#ffffff94] active:scale-95 transition-all duration-200 ease-in-out' >
              <FaArrowLeftLong  size={19} /><h1  className={`text-[20px] tracking-tight my-5 ml-2`}>Archive</h1>
            </div>
          </div>
          <div className={`py-4 border-b-1 flex items-center justify-center ${theme === 'dark' ? 'border-white' : (theme === 'light') ? 'border-black' : ' border-black dark:border-white'}`}><p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all duration-200 ease-in-out`}><SiStagetimer size={16} className='text-[#939191]' /><span>STORIES</span></p></div>
        </div>
        <div className='w-full h-fit flex flex-col items-center justify-start pt-20 px-10 md:px-0'>
          <div><GiBackwardTime size={70} className='-rotate-45' /></div>
          <h3 className='text-xl mt-3'>Add to your story</h3>
          <p className='text-[13px] text-center mt-2 pb-20 '>Keep your stories in your archive after they disappear, so you can look back on<br /> your memories. Only you can see what's in your archive.</p>
        </div>

        <LoginFooter theme={theme} page="posts" />
     </div>
    </div>
  )
}

export default Archive
