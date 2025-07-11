
import { FaHeart } from "react-icons/fa6";
import { BiSolidMessageRounded } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { getAllComments } from "../redux/postSlice";


const PostCards = ({ posts, setViewPost, setIndexval, status, setShowComment, setPostId, setShowReplies }) => {

    const dispatch = useDispatch();


    const handleClick = (post) => {
       if (post.type === 'Reel') return;
        const index = posts?.indexOf(post);
        setViewPost(true);
        setShowComment(false);
        setIndexval(index);
        setShowReplies({});
        setPostId(post._id);
        dispatch(getAllComments(post._id));
    }

    
    return (
        <>
            {status === 'loading' ? <div className=" w-full h-100 bg-[#000000a9] flex items-center justify-center">
                <div className="h-15 w-15 border-t-1 border-b-1  border-[white] rounded-full animate-spin transition-all duration-500 ease-in-out" /></div> :
                <div className="w-full h-fit grid grid-cols-3 gap-1 justify-items-center">
                    {posts?.map((post) => (
                        <div key={post._id} onClick={() => { handleClick(post) }} className="relative w-full h-40 md:h-90 lg:h-100 cursor-pointer ">
                            <div className="absolute top-0 right-0 w-full h-full text-white text-2xl gap-5 flex items-center justify-center bg-[#000000a9] overflow-hidden opacity-0 hover:opacity-100 transition-all duration-200">
                                {post.likes?.length > 0 && <div className="flex items-center gap-1">
                                    <FaHeart size={22} />
                                    <p className="text-sm">{post.likes?.length}</p>
                                </div>}
                                <div className="flex items-center gap-1">
                                    <BiSolidMessageRounded size={24} />
                                    <p className="text-sm">{post.comments?.length}</p>
                                </div>
                            </div>
                            <img src={post.image} alt="post" className="w-full h-full object-cover " />
                        </div>
                    ))}
                </div>}
        </>
    )
}

export default PostCards
