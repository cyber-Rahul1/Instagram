import { useContext, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";

const ReceiverMessage = ({ message, image, post, story }) => {

    const { theme } = useContext(ThemeContext);

    const [viewImage, setViewImage] = useState(false)

    return (
        <div className="w-full h-fit flex flex-col items-start justify-start gap-3">
            {viewImage && <div onClick={() => { setViewImage(false) }} className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#0000007a] z-100">
                <RxCross2 size={26} onClick={() => { setViewImage(false) }} className="absolute top-5 right-5 cursor-pointer" />
                <img src={image} alt="message image" className="w-30 md:w-300 h-20 md:h-180 rounded-xl object-cover" />
            </div>}
            {image && <img src={image} alt="message image" className="w-30 md:w-40 h-40 md:h-52 rounded-xl object-cover" />}
            {post && <div>

            </div>}
            {story && <div>
                <img src={story.image} alt="story" className="w-30 md:w-40 h-40 md:h-52 rounded-xl object-cover" />
            </div>}
            {message && <div className={`w-fit max-w-[80%] md:max-w-[60%] h-fit flex items-center justify-start ${theme === 'dark' ? 'bg-[#363C44]' : (theme === 'light') ? 'bg-[#f0f0f0]' : 'bg-[#0095f6]'} rounded-r-full rounded-bl-full rounded-tl-3xl px-3 py-2`}>
                <p className="text-sm md:text-md font-normal text-white break-words overflow-hidden">{message}</p>
            </div>}
        </div>
    )
}

export default ReceiverMessage
