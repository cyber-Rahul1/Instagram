import { useContext } from 'react'
import LoginFooter from '../components/LoginFooter'
import { MdOutlineCameraAlt } from 'react-icons/md'
import { ThemeContext } from '../context/ContextProvider'
import { LuBookmark } from "react-icons/lu";
import { SquareUserRound } from 'lucide-react';

const EmptyPage = ({ page }) => {

  const { theme, image } = useContext(ThemeContext)


  return (
    <div className="w-full lg:w-[950px] h-fit flex flex-col items-center justify-center pb-10">
      {<div className="w-full h-fit mt-20 md:mt-30 flex flex-col items-center justify-center">
        <div className="w-20 h-20 border-3  border-[#c3c3c3] rounded-full flex flex-col items-center justify-center">
          {page === 'posts' && <MdOutlineCameraAlt size={40} className="text-[#c3c3c3]" />}
          {page === 'saved' && <LuBookmark size={40} className="text-[#c3c3c3]" />}
          {page === 'tagged' && <SquareUserRound size={40} className="text-[#c3c3c3]" />}
        </div>
        <div className="flex flex-col items-center justify-center pb-20 md:pb-10">
          <h2 className={`text-2xl md:text-3xl font-bold mt-3 ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-[black]' : 'text-[black] dark:text-white'}`}>{page === 'posts' ? 'Share Photos' : page === 'saved' ? 'Saved' : 'Photos of you'}</h2>
          <p className={` text-center text-xs md:text-sm mt-2 ${theme === 'dark' ? 'text-[#ffffffa5]' : (theme === 'light') ? 'text-[black]' : 'text-[black] dark:text-[#ffffffa5]'}`}>{page === 'posts' ? (
            'When you share photos, they will appear on your profile.'
          ) : page === 'saved' ? (
            <>
              Save photos and videos that you want to see again. No <br />
              one is notified, and only you can see what you've saved.
            </>
          ) : (
                <>When people tag you in photos, they&#39;ll appear here.</>
          )}
          </p>
          {page === 'posts' && <p onClick={() => image.current.click()} className="text-[#358be0] text-center font-semibold text-xs md:text-sm mt-3 cursor-pointer active:scale-97 hover:text-[#2a79c7cc]">Share your first photo.</p>}
        </div>
      </div>}
      <LoginFooter theme={theme} page={'posts'} />
    </div>
  )
}

export default EmptyPage
