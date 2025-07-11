import { useEffect, useState } from 'react';
import { format, register } from 'timeago.js';
import heartfill from '../assets/heartfill.png'
import { GoHeart } from "react-icons/go";
import { useSelector } from 'react-redux';
import axios from 'axios';


const PostComments = ({ posts, indexval, allComments, allReplies, showReplies, setShowReplies, setReply, setCommentId, setComment, status }) => {

    const { userData } = useSelector((state) => state.user)
    const [more, setMore] = useState(false)
    const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

    useEffect(() => {
        if (posts && posts[indexval]?.description && posts[indexval]?.description.length > 30) {
            setMore(true)
        } else {
            setMore(false)
        }
    }, [posts, indexval])
    

    register('short', (number, index) => {
        return [
            ['just now', 'right now'],
            ['1m', 'in 1m'],
            ['%sm', 'in %sm'],
            ['1hr', 'in 1hr'],
            ['%shr', 'in %shr'],
            ['1d', 'in 1d'],
            ['%sd', 'in %sd'],
            ['1w', 'in 1w'],
            ['%sw', 'in %sw'],
            ['1mo', 'in 1mo'],
            ['%smo', 'in %smo'],
            ['1yr', 'in 1yr'],
            ['%syr', 'in %syr'],
        ][index];
    });



    const handleCommentLike = async ( comment ) => {
        try {
            let result = await axios.get(`${serverUrl}/api/posts/likecomment/${comment._id}`, { withCredentials: true });
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }

    }

    const handleReplyLike = async ( reply ) => {
        try {
            let result = await axios.get(`${serverUrl}/api/posts/likereply/${reply._id}`, { withCredentials: true });
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }

    }



    if (status === 'loading') return <div className=" w-full h-80 md:h-110 flex items-center justify-center">
        <div className="h-15 w-15 border-t-1 border-b-1  border-[white] rounded-full animate-spin transition-all duration-500 ease-in-out" />
    </div>

    return (
        <>
            {(posts && posts[indexval]?.comments?.length == 0 && !posts[indexval]?.description) ?
                <div className="w-full h-fit md:h-110 hidden md:flex flex-col items-center justify-center">
                    <p className="text-white text-2xl font-medium ml-2 pb-1">No comments yet.</p>
                    <p className="text-white text-sm font-medium ml-2">Start the conversation</p>
                </div> :
                <>
                    <div className={`w-full flex flex-col items-start justify-start ${allComments && allComments.length > 0 ? 'h-fit ' : 'h-150'}`}>
                        {posts && posts[indexval]?.description && <div className="w-full h-fit flex items-start justify-start p-4 gap-2 ">
                            <img src={posts[indexval]?.author?.profilepic} alt="author image" className="w-9 h-9 z-10 rounded-full object-cover" />
                            <div className="w-full h-fit flex flex-col items-start justify-start">
                                <div className=" w-fit h-fit flex items-center justify-start gap-2">
                                    <p className="text-white text-sm font-medium ml-2">{posts[indexval]?.author?.username}</p>
                                    <p className=" text-[#c4c4c4] bg-[#4e4d4d] px-1 rounded-2xl text-xs font-medium ml-2">Author</p>
                                </div>
                                <p className="text-[#ffffffe1] text-sm pl-2 break-words whitespace-normal ">{more ? posts[indexval]?.description : posts[indexval]?.description?.slice(0, 30)} <span onClick={() => { setMore(!more) }} className="text-[#ffffff84] text-sm cursor-pointer hover:text-[#ffffff81] transition-all duration-200 ease-in-out">{more ? '...more' : ''}</span> </p>
                                <div className="w-fit h-fit flex items-center justify-start gap-2">
                                    <p className="text-[#ffffff84] text-xs ml-2">{format(posts[indexval].createdAt, 'short')}</p>
                                    <p onClick={() => { setComment(`@${posts[indexval].author?.username} `); setReply(true); setCommentId(posts[indexval]._id) }} className="text-[#ffffff84] text-xs ml-2 cursor-pointer hover:text-[#ffffff81] transition-all duration-200 ease-in-out">reply</p>
                                </div>
                            </div>
                            <div className="w-fit h-fit flex flex-col items-center justify-start gap-2">
                                {(allComments && allComments?.likes?.some( user => user._id === userData?.user?._id)) ? <img onClick={() => { handleCommentLike() }} src={heartfill} alt="liked" className="w-3 h-3" /> : <GoHeart size={20} onClick={() => { handleCommentLike() }} className="text-white cursor-pointer transition-all duration-200 ease-in-out hover:text-[#ffffff81]" />}
                                { allComments && <p className="text-[#ffffff84] text-xs ml-2">{allComments?.likes?.length}</p>}
                            </div>
                        </div>}
                    </div>
                    {
                        allComments && allComments.map((comment) => (
                            <div key={comment._id} className={`  w-full md:h-fit flex flex-col items-start justify-start px-4 `}>


                                <div className={`w-full h-fit flex items-start justify-between py-4 gap-2`}>
                                    <img src={comment?.author?.profilepic} alt="author image" className="w-9 h-9 z-10 rounded-full object-cover" />
                                    <div className="w-full h-fit flex flex-col items-start justify-start">
                                        <p className="text-white text-sm font-medium ml-2">{comment.author?.username}</p>
                                        <div className="w-60 pr-2 h-fit overflow-hidden">
                                            <p className="text-[#ffffffe1] text-sm pl-2 break-words whitespace-normal ">{comment.comment}</p>
                                        </div>
                                        <div className="w-fit h-fit flex items-center justify-start gap-2">
                                            <p className="text-[#ffffff84] text-xs ml-2">{format(comment.createdAt, 'short')}</p>
                                            <p onClick={() => { setComment(`@${comment.author?.username} `); setReply(true); setCommentId(comment._id) }} className="text-[#ffffff84] text-xs ml-2 cursor-pointer hover:text-[#ffffff81] transition-all duration-200 ease-in-out">reply</p>
                                        </div>
                                        
                                    </div>
                                    <div className="w-fit h-fit flex flex-col items-center justify-center gap-2">
                                        {(allComments && comment?.likes?.some(user => user._id === userData?.user?._id)) ? <img onClick={() => { handleCommentLike(comment) }} src={heartfill} alt="liked" className="w-5 h-5" /> : <GoHeart size={20} onClick={() => { handleCommentLike(comment) }} className="text-white cursor-pointer transition-all duration-200 ease-in-out hover:text-[#ffffff81]" />}
                                        {allComments && <p className="text-[#ffffff84] text-xs">{comment?.likes?.length}</p>}
                                    </div>

                                </div>
                                {comment.replies?.length > 0 && <div onClick={() => { setShowReplies(prev => ({ ...prev, [comment._id]: !prev[comment._id] })) }} className="transition-all duration-200 ease-in-out cursor-pointer w-full h-fit flex items-center pl-14 justify-start gap-2"><hr className="w-5 h-[1px] border-none bg-[#959393] mt-1" /><p className="text-[#959393]  text-xs ml-2 cursor-pointer hover:text-[#ffffff81] transition-all duration-200 ease-in-out">{showReplies[comment._id] ? 'hide replies' : `view replies (${comment.replies?.length})`}</p></div>}
                                {allReplies && allReplies.map((reply) => (
                                    <div key={reply._id} className={`${showReplies[comment._id] ? 'h-fit ' : 'hidden'} w-full h-fit flex flex-col items-start justify-start pl-4 ${reply.comment === comment._id ? '' : 'hidden'} `}>
                                        <div className={`w-full h-fit flex items-start justify-start pr-0 p-4 gap-2`}>
                                            {reply.author?.profilepic ? <img src={reply.author?.profilepic} alt="author image" className="w-9 h-9 z-10 rounded-full object-cover" /> : <div className="w-9 h-9 z-10 rounded-full border-t-1 border-b-1  border-[white] animate-spin transition-all duration-500 ease-in-out"></div>}
                                            <div className="w-full h-fit flex items-start justify-between">
                                               <div className="w-full h-fit flex flex-col items-start justify-start">
                                                    <p className="text-white text-sm font-medium ml-2">{reply.author?.username}</p>
                                                    <div>
                                                        {
                                                            reply.reply.startsWith('@') ? (
                                                                <p className="text-[#ffffffbc] text-sm pl-2">
                                                                    <span className="text-[#0095f6] font-medium">
                                                                        {reply.reply.split(' ')[0]}
                                                                    </span>{" "}
                                                                    {reply.reply.split(' ').slice(1).join(' ')}
                                                                </p>
                                                            ) : (
                                                                <p className="text-[#ffffffbc] text-sm">{reply.reply}</p>
                                                            )
                                                        }
                                                    </div>
                                                <div className="w-fit h-fit flex items-center justify-start gap-2">
                                                    <p className="text-[#ffffff84] text-xs ml-2">{format(reply.createdAt, 'short')}</p>
                                                    <p onClick={() => { console.log('reply.comment = ', reply.comment); setComment(`@${reply.author?.username} `); setReply(true); setCommentId(reply.comment); }} className="text-[#ffffff84] text-xs ml-2 cursor-pointer hover:text-[#ffffff81] transition-all duration-200 ease-in-out">reply</p>
                                                </div>
                                               </div>

                                            </div>
                                            <div className="w-fit h-fit flex flex-col items-center justify-center gap-2">
                                                {(reply?.likes && Array.isArray(reply.likes) && reply.likes.some(userId => userId === userData?.user?._id)) ?
                                                    <img onClick={() => { handleReplyLike(reply) }} src={heartfill} alt="liked" className="w-5 h-5" /> :
                                                    <GoHeart size={20} onClick={() => { handleReplyLike(reply) }} className="text-white cursor-pointer transition-all duration-200 ease-in-out hover:text-[#ffffff81]" />}
                                                { allReplies && <p className="text-[#ffffff84] text-xs">{reply?.likes?.length}</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>

                        ))
                    }
                </>}
        </>
    )
}

export default PostComments
