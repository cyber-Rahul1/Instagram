
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { TiUser } from "react-icons/ti";
import { ThemeContext } from "../context/ContextProvider";

const ViewPostImage = ({ handleLike, posts, indexval, liked }) => {

  const { theme } = useContext(ThemeContext)
  const [showTagged, setShowTagged] = useState(false)

  useEffect(() => {
    if(showTagged){
      setTimeout(() => {
        setShowTagged(false)
      }, 4000)
    }
  }, [indexval, showTagged])

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {posts?.map((post) => (
        <div key={post._id} onDoubleClick={() => { handleLike() }} className="relative w-full h-full flex flex-col items-center justify-center">
          {indexval === posts?.indexOf(post) &&
            <img src={post.image} alt="post" className="3xl:w-220 2xl:h-210 w-full h-190 object-cover " />

          }
        </div>
      ))}
      {(posts && posts[indexval]?.tagged) && <div onClick={() => { setShowTagged(!showTagged) }} className="absolute bottom-5 left-5">
        <TiUser size={20} className="text-[#ffffff] p-[2px] cursor-pointer bg-[#060606] rounded-full hover:text-[#ffffff81] transition-all duration-200 ease-in-out]" />
      </div>}
      {showTagged && <div className={`absolute bottom-15 left-3 z-60 w-fit h-fit transition-all duration-200 ease-in-out flex items-center justify-center px-3 py-2 rounded-lg ${theme === 'dark' ? 'bg-[#171717]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#171717]'}`}>
        <div className={`w-4 h-4 z-0 -bottom-1 rotate-z-45 left-3 rounded-sm absolute ${theme === 'dark' ? 'bg-[#171717]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#171717]'}`} />
        <p className={`text-xs md:text-sm z-10  ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>{posts[indexval]?.tagged?.username} </p>
      </div>}
      {liked && (
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 6, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="absolute top-0 left-0 w-full h-full flex items-center justify-center" >
          ❤️
        </motion.div>
      )}
    </div>
  )
}

export default ViewPostImage
