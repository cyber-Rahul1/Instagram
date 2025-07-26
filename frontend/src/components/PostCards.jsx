
import { FaHeart } from "react-icons/fa6";
import { BiSolidMessageRounded } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { getAllComments } from "../redux/postSlice";
import { ThemeContext } from "../context/ContextProvider";
import { useContext } from "react";


const PostCards = ({ posts, setViewReels, setViewPost, setIndexval, status, setShowComment, setPostId, setShowReplies, page }) => {

    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext)


    const handleClick = (post) => {
       if (post.type === 'Reel') {
           const index = posts?.indexOf(post);
           setViewReels(true);
           setViewPost(true);
           setShowComment(false);
           setIndexval(index);
           setShowReplies({});
           setPostId(post._id);
           dispatch(getAllComments(post._id));
       }else if(post.type === 'Post'){
           const index = posts?.indexOf(post);
           setViewReels(false);
           setViewPost(true);
           setShowComment(false);
           setIndexval(index);
           setShowReplies({});
           setPostId(post._id);
           dispatch(getAllComments(post._id));
       }
        
    }


    
    return (
        <>
            {status === 'loading' ? <div className={`w-full h-100 flex items-center justify-center`}>
                <div className={`h-15 w-15 border-t-1 border-b-1  ${theme === 'dark' ? 'border-[#ffffff]' : (theme === 'light') ? 'border-[#000000]' : ' border-[#000000] dark:border-[#ffffff]'} rounded-full animate-spin transition-all duration-500 ease-in-out`}/></div> :
                <div className={`w-full h-fit grid grid-cols-3 gap-1 justify-items-center `}>
                    {posts?.map((post) => (
                        <div key={post._id} onClick={() => { handleClick(post) }} className={`relative w-full ${page && page === 'explore' ? 'h-fit min-h-40 md:min-h-70 ' : 'h-40 md:h-90 lg:h-100'} cursor-pointer ${(page && page === 'explore' && post?.type === 'Reel') ? 'row-span-2' : ''  }`}>
                            <div className="absolute top-0 right-0 w-full h-full text-white text-2xl gap-5 flex items-center justify-center bg-[#000000a9] overflow-hidden opacity-0 hover:opacity-100 transition-all duration-200">
                                {(post.likes?.length > 0 && !post?.hideLikes) && <div className="flex items-center gap-1">
                                    <FaHeart size={22} />
                                    <p className="text-sm">{post.likes?.length}</p>
                                </div>}
                                <div className="flex items-center gap-1">
                                    <BiSolidMessageRounded size={24} />
                                    <p className="text-sm">{post.comments?.length}</p>
                                </div>
                            </div>
                            <img src={post.image} alt="post" className={`w-full h-full object-cover ${theme === 'dark' ? 'bg-black' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-black'} `}/>
                        </div>
                    ))}
                </div>}
        </>
    )
}

export default PostCards
