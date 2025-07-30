import { useState } from "react"
import { RxCross2 } from "react-icons/rx"

const SenderMessage = ({ message, image, post, story }) => {

    const [viewImage, setViewImage] = useState(false)

    return (
       <div className="w-full h-fit flex flex-col items-end justify-end gap-3">
            {viewImage && <div onClick={() => { setViewImage(false) }} className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#0000007a] z-100">
                <RxCross2 size={26} onClick={() => { setViewImage(false) }} className="absolute top-5 right-5 cursor-pointer" />
                <img src={image} alt="message image" className="w-30 md:w-300 h-20 md:h-180 rounded-xl object-cover" />
            </div>}
            {image && <img onClick={() => { setViewImage(true) }} src={image} alt="message image" className="w-30 md:w-40 h-40 md:h-52 cursor-pointer rounded-xl object-cover" />}
            {post && <div>

            </div>}
            {story && <div>
                <img src={story.image} alt="story" className="w-30 md:w-40 h-40 md:h-52 rounded-xl object-cover" />
            </div>}
            { message && <div className="w-fit max-w-[80%] md:max-w-[60%] h-fit flex items-center justify-start text-wrap bg-[#0095f6] rounded-l-full rounded-br-full rounded-tr-3xl px-3 py-2">
                <p className="text-sm md:text-md font-normal break-words overflow-hidden text-white">{message}</p>
            </div>}
       </div>
    )
}

export default SenderMessage
