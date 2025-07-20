import { useContext, useEffect, useState } from 'react';
import { format, register } from 'timeago.js';
import heartfill from '../assets/heartfill.png'
import { GoHeart } from "react-icons/go";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ThemeContext } from '../context/ContextProvider';
import { RxDotsHorizontal } from "react-icons/rx";
import dp from '../assets/dp.webp'
import React from 'react';
import { useNavigate } from 'react-router-dom';





const PostComments = ({ posts, indexval, allComments, allReplies, setReply, setCommentId, setComment, status, page, post }) => {

    const { userData } = useSelector((state) => state.user)
    const [more, setMore] = useState(false)
    const navigate = useNavigate()
    const [showOptions, setShowOptions] = useState('')
    const [deleteComment, setDeleteComment] = useState(null)
    const [deleteCommentPopup, setDeleteCommentPopup] = useState(false)
    const [deleteReply, setDeleteReply] = useState(null)
    const [deleteReplypopup, setDeleteReplyPopup] = useState(false)
    const [loading, setLoading] = useState({})





    const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
    const { theme, commentId, commentLikes, setCommentLikes, allCommentsInMain, setAllCommentsInMain, inputRef, showReplies, setShowReplies } = useContext(ThemeContext)
    let mainTextTheme = theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'
    let subTextTheme = theme === 'dark' ? 'text-[#ffffffa5]' : (theme === 'light') ? 'text-[#000000a5]' : ' text-[#000000a5] dark:text-[#ffffffa5]'
    let hoverTheme = theme === 'dark' ? 'hover:text-[#ffffff81]' : (theme === 'light') ? 'hover:text-[#00000081]' : 'hover:text-[#00000081] dark:hover:text-[#ffffff81]'

    useEffect(() => {
        if (posts && posts[indexval]?.description && posts[indexval]?.description.length > 30) {
            setMore(true)
        } else {
            setMore(false)
        }
    }, [posts, indexval])



    useEffect(() => {
        if (allComments) {
            setAllCommentsInMain(allComments)
        }
    }, [allComments, setAllCommentsInMain])


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


    useEffect(() => {
        setShowReplies({})
    },[])



   

    const handleCommentLike = async (commentId) => {
        if (commentLikes && commentLikes.some(like =>
            like.commentId === commentId && like.likedUser.some(user => user._id === userData?.user?._id)
        )) {
            setCommentLikes(prev =>
                prev.map(like => {
                    if (like.commentId === commentId) {
                        return {
                            ...like,
                            likedUser: like.likedUser.filter(user => user._id !== userData?.user?._id)
                        };
                    }
                    return like;
                })
            );
        }
        try {
            let result = await axios.get(`${serverUrl}/api/posts/likecomment/${commentId}`, { withCredentials: true });
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }

    }

    const handleReplyLike = async (reply) => {
        try {
            let result = await axios.get(`${serverUrl}/api/posts/likereply/${reply._id}`, { withCredentials: true });
            console.log(result.data);
            if (result.data.message === 'Reply unliked' && allCommentsInMain) {
                setAllCommentsInMain(prev => {
                    return prev.map(comment => {
                        if (comment._id === reply.comment) {
                            return {
                                ...comment,
                                replies: comment.replies.map(replyItem => {
                                    if (replyItem._id === reply._id && replyItem.likes.includes(userData?.user?._id)) {
                                        return {
                                            ...replyItem,
                                            likes: replyItem.likes.filter(user => user !== userData?.user?._id)
                                        };
                                    }
                                    return replyItem;
                                })
                            };
                        }
                        return comment;
                    });
                })
            } else if (result.data.message === 'Reply liked' && allCommentsInMain) {
                setAllCommentsInMain(prev => {
                    return prev.map(comment => {
                        if (comment._id === reply.comment) {
                            return {
                                ...comment,
                                replies: comment.replies.map(replyItem => {
                                    if (replyItem._id === reply._id && !replyItem.likes.includes(userData?.user?._id)) {
                                        return {
                                            ...replyItem,
                                            likes: [...replyItem.likes, userData?.user?._id]
                                        };
                                    }
                                    return replyItem;
                                })
                            };
                        }
                        return comment;
                    });
                })
            }
        } catch (error) {
            console.log(error);
        }

    }

    const handleDeleteComment = async (commentId) => {
        setLoading(prev => ({...prev, [commentId]: true}))
        try {
            let result = await axios.delete(`${serverUrl}/api/posts/deletecomment/${commentId}`, { withCredentials: true });
            console.log(result.data);

            if (allCommentsInMain) {
                setAllCommentsInMain(prev => prev.filter(comment => comment._id !== commentId))
            }
            setDeleteCommentPopup(false)
            setLoading(prev => ({...prev, [commentId]: false}))
        } catch (error) {
            console.log(error);
            setLoading(prev => ({...prev, [commentId]: false}))
        }

    }


    const handleDeleteReply = async (replyId, reply) => {
        setLoading(prev => ({...prev, [replyId]: true}))
        try {
            let result = await axios.delete(`${serverUrl}/api/posts/deletereply/${replyId}`, { withCredentials: true });
            console.log(result.data);
            if (allCommentsInMain) {
                setAllCommentsInMain(prev => {
                    return prev.map(comment => {
                        if (comment._id === reply.comment) {
                            return {
                                ...comment,
                                replies: comment.replies.filter(replyItem => replyItem._id !== replyId)
                            };
                        }
                        return comment;
                    });
                })
            }
            setDeleteReplyPopup(false)
            setLoading(prev => ({...prev, [replyId]: false}))
        } catch (error) {
            console.log(error);
            setLoading(prev => ({...prev, [replyId]: false}))
        }

    }

    const handleNavigate = (username, authorId) => {
        navigate(`/profile/${username || authorId}`)
        window.scrollTo(0, 0)

    }



    useEffect(() => {
        const fetchAlllikesInComments = async () => {
            if (allComments) {
                allComments.forEach(async (comment) => {
                    try {
                        let result = await axios.get(`${serverUrl}/api/posts/getalllikesoncomment/${comment._id}`, { withCredentials: true });
                        setCommentLikes(prev => {
                            const filtered = prev.filter(item => item.commentId !== comment._id);
                            return [...filtered, { commentId: comment._id, likedUser: result.data }];
                        });
                    } catch (error) {
                        console.log(error);
                    }
                })
            }
        }
        fetchAlllikesInComments();

    }, [allComments, commentId, serverUrl, setCommentLikes])



    const handleReplyClick = (reply) => {
        setComment(`@${reply.author?.username} `); 
        setReply(true); 
        setCommentId(reply.comment);
        inputRef.current.focus();
    }




    if (status === 'loading') return <div className=" w-full h-80 md:h-110 flex items-center justify-center">
        <div className="h-15 w-15 border-t-1 border-b-1  border-[white] rounded-full animate-spin transition-all duration-500 ease-in-out" />
    </div>

    return (
        <>

            {((page === 'main' && post?.comments?.length == 0) || (posts && posts[indexval]?.comments?.length == 0)) ?
                <div className="w-full h-fit md:h-110  hidden md:flex flex-col items-center justify-center">
                    <p className={`${mainTextTheme} text-2xl font-medium ml-2 pb-1`}>No comments yet.</p>
                    <p className={`${subTextTheme} text-sm font-medium ml-2`}>Start the conversation</p>
                </div> :
                <>
                    <div className={`w-full flex flex-col items-start justify-start ${allCommentsInMain && allCommentsInMain.length > 0 ? 'h-fit ' : 'h-150'}`}>

                        {(page === 'main' ? post?.description : posts && posts[indexval]?.description) && <div className="w-full cursor-pointer h-fit flex items-start justify-start p-4 gap-2 ">
                            <img onClick={() => { handleNavigate(page !== 'main' ? posts[indexval]?.author?.username : post?.author?.username, page !== 'main' ? posts[indexval]?.author?._id : post?.author?._id) }} src={page !== 'main' ? posts[indexval]?.author?.profilepic || dp : post?.author?.profilepic || dp} alt="author image" className="w-9 h-9 z-0 rounded-full object-cover cursor-pointer" />
                            <div className="w-full h-fit flex flex-col items-start justify-start">
                                <div className=" w-fit h-fit flex items-center justify-start gap-2">
                                    <p onClick={() => { handleNavigate(page !== 'main' ? posts[indexval]?.author?.username : post?.author?.username, page !== 'main' ? posts[indexval]?.author?._id : post?.author?._id) }} className={`${mainTextTheme} text-sm font-medium ml-2`}>{page !== 'main' ? (posts[indexval]?.author?.username || posts[indexval]?.author?.name) : (post?.author?.username || post?.author?.name)}</p>
                                    <p className={`${subTextTheme} ${theme === 'dark' ? 'bg-[#78787884]' : (theme === 'light') ? 'bg-[#81818184]' : ' bg-[#81818184] dark:bg-[#78787884]'} px-1 rounded-2xl text-xs font-medium ml-2`}>Author</p>
                                </div>
                                <p className={` text-sm pl-2 pb-2 break-words whitespace-normal ${mainTextTheme} `}>{more ? page !== 'main' ? posts[indexval]?.description : post?.description : page !== 'main' ? posts[indexval]?.description?.slice(0, 30) : post?.description?.slice(0, 30)} <span onClick={() => { setMore(!more) }} className="text-[#ffffff84] text-sm cursor-pointer hover:text-[#ffffff81] transition-all duration-200 ease-in-out">{more ? '...more' : ''}</span> </p>
                            </div>
                        </div>}
                    </div>
                    {
                        allCommentsInMain && allCommentsInMain.map((comment, index) => (
                            <div key={comment._id || index} className={`w-full md:h-fit  flex flex-col items-start justify-start px-4`}>

                                <div className={`${page === 'reels' ? 'md:w-60 w-full ' : 'w-full' } h-fit flex items-start justify-between py-4 cursor-pointer gap-2`}>
                                    <img onClick={() => { handleNavigate(comment?.author?.username, comment?.author?._id) }} src={comment?.author?.profilepic} alt="author image" className="w-9 h-9 z-0 rounded-full object-cover" />
                                    <div onMouseOver={() => { setShowOptions(`${comment._id}`) }} onMouseLeave={() => { setShowOptions('') }} className="w-full h-fit flex flex-col items-start justify-start ">
                                        <p onClick={() => { handleNavigate(comment?.author?.username, comment?.author?._id) }} className={`${mainTextTheme} text-sm font-medium ml-2`}>{comment.author?.username || comment?.author?.name}</p>
                                        <div className="w-full 2xl:w-90 pr-2 h-fit overflow-hidden">
                                            <p className={`${mainTextTheme}  text-sm pl-2 break-words whitespace-normal `}>{comment.comment}</p>
                                        </div>
                                        <div className="w-fit h-fit flex items-center justify-start gap-2">
                                            <p className={` text-xs ml-2 ${subTextTheme} `}>{format(comment.createdAt, 'short')}</p>
                                            <p onClick={() => { setComment(`@${comment.author?.username} `); setReply(true); setCommentId(comment._id); inputRef.current.focus();  }} className={`text-xs ml-2 cursor-pointer ${hoverTheme} transition-all duration-200 ease-in-out ${subTextTheme}`}>reply</p>
                                            {<RxDotsHorizontal onClick={() => { setDeleteCommentPopup(true); setDeleteComment(comment._id) }} size={20} className={`${mainTextTheme} ml-3 cursor-pointer  ${(comment?.author?.username === userData?.user?.username) ? (showOptions === comment._id) ? 'opacity-100' : 'opacity-0' : 'hidden'} transition-all duration-200 ease-in-out ${hoverTheme}`} />}
                                        </div>
                                        {deleteCommentPopup && <div onClick={() => { setDeleteCommentPopup(false) }} className={`fixed top-0 left-0 z-120  w-screen h-screen flex flex-col items-center justify-center bg-[#0000003e] md:bg-[#00000020]`}>
                                            {!loading[comment._id] && <div className={`w-fit h-fit flex flex-col items-center justify-center py-2 gap-3  rounded-2xl ${theme === 'dark' ? 'bg-[#262626] ' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#262626]'}`}>
                                                <p onClick={() => { handleDeleteComment(deleteComment) }} className={` text-sm font-bold py-2 cursor-pointer px-20 border-b-1 text-[#ff0000] md:px-40 ${theme === 'dark' ? 'border-[#464545]' : (theme === 'light') ? 'border-[#b5b3b37c]' : ' border-[#818181] dark:border-[#787878]'}`}>Delete</p>
                                                <p onClick={() => { setDeleteCommentPopup(false); setDeleteComment(null) }} className={`${mainTextTheme} pb-2 px-20 md:px-40 text-sm font-medium  cursor-pointer ${hoverTheme} transition-all duration-200 ease-in-out`}>Cancel</p>
                                            </div>}
                                            {loading[comment._id] && <div className="h-10 w-10 border-t-1 border-b-1  border-[white] rounded-full animate-spin transition-all duration-500 ease-in-out" />}
                                        </div>}
                                        {comment?.replies?.length > 0 && <div onClick={() => { setShowReplies(prev => ({ ...prev, [comment._id]: !prev[comment._id] })) }} className='w-full h-full flex items-start justify-start pt-2'>
                                            <div className="w-fit h-fit flex items-center justify-start gap-2">
                                                <hr className={`w-5 h-[1px] border-none bg-[#959393c2] `} />
                                                <p className={`text-xs ml-2 ${subTextTheme}`}>{(showReplies[comment._id]) ? 'hide replies' : `view replies (${comment?.replies?.length})`}</p>
                                            </div>
                                        </div>}
                                    </div>
                                    <div className="w-fit h-full flex flex-col items-center justify-center">
                                        {(commentLikes.map((like, index) => (
                                            <div className={`w-fit h-full flex flex-col items-center justify-center pt-1 ${like.commentId === comment._id ? '' : 'hidden'}`} key={index || like.commentId}>
                                                <div className={`${page === 'reels' ? 'w-5 ' : 'w-fit'}} h-full  items-center justify-center pt-1 ${like.commentId === comment._id ? 'flex flex-col' : 'hidden'}`}>
                                                    {commentLikes && like.likedUser.some(user => user._id === userData?.user?._id) ? <img onClick={() => { handleCommentLike(comment._id) }} src={heartfill} alt="liked" className="w-5 h-5 cursor-pointer " /> : <GoHeart size={20} onClick={() => { handleCommentLike(comment._id) }} className={` cursor-pointer transition-all duration-200 ease-in-out ${hoverTheme} ${mainTextTheme} `} />}
                                                    <p className={`text-xs ${mainTextTheme}`}>{like.likedUser?.length}</p>
                                                </div>
                                            </div>
                                        )))}


                                    </div>

                                </div>
                                {allCommentsInMain && comment?.replies?.length > 0 && showReplies[comment._id] && <div className="w-full h-fit flex flex-col items-start justify-start gap-6 pb-3">
                                    {allCommentsInMain && comment?.replies?.map((reply, index) => (
                                        <div key={reply?._id || index} className='w-full h-fit flex items-center justify-center pl-8 gap-3' >
                                            {deleteReplypopup && <div onClick={(e) => { e.stopPropagation(); setDeleteReplyPopup(false) }} className={`fixed top-0 left-0 z-200  w-screen h-screen flex flex-col items-center justify-center bg-[#17171759]`}>
                                                {!loading[reply._id] && <div className={`w-fit h-fit flex flex-col items-center justify-center py-2 gap-3  rounded-lg ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#262626]'}`}>
                                                    <p onClick={() => { handleDeleteReply(deleteReply, reply) }} className={` text-sm font-bold py-2 cursor-pointer  border-b-1 text-[#ff0000] px-40 ${theme === 'dark' ? 'border-[#787878]' : (theme === 'light') ? 'border-[#b5b3b37c]' : ' border-[#818181] dark:border-[#787878]'}`}>Delete</p>
                                                    <p onClick={() => { setDeleteReplyPopup(false); setDeleteReply(null) }} className={`${mainTextTheme} pb-2 px-40 text-sm font-medium  cursor-pointer ${hoverTheme} transition-all duration-200 ease-in-out`}>Cancel</p>
                                                </div>}
                                                {loading[reply._id] && <div className="h-10 w-10 border-t-1 border-b-1  border-[white] rounded-full animate-spin transition-all duration-500 ease-in-out" />}
                                            </div>}
                                            <div onMouseOver={() => { setShowOptions(`${reply._id}`) }} onMouseLeave={() => { setShowOptions('') }} className="w-full h-fit flex flex-col items-start justify-center"> 
                                                <div className="w-full h-fit flex items-center justify-start gap-2">
                                                    <img src={reply?.author?.profilepic || dp} alt="author image" className="w-7 h-7 z-0 rounded-full object-cover" />
                                                    <div className="w-full h-fit flex flex-col items-start justify-center">
                                                        <p className={`${mainTextTheme} text-sm font-medium`}>{reply?.author?.username || reply?.author?.name}</p>
                                                        <p className={`${mainTextTheme} text-xs`}>{reply?.reply?.startsWith('@') ?
                                                            <>
                                                                <span className="text-[#0095f6] font-medium">{reply?.reply.split(' ')[0]}</span>
                                                                {' '}
                                                                <span>{reply?.reply.split(' ').slice(1).join(' ')}</span>
                                                            </> : reply?.reply}</p>
                                                    </div>
                                                </div>
                                                <div className="w-fit h-fit flex items-center justify-center gap-2 pl-8 ">
                                                    <p className={`${subTextTheme} text-xs ml-2`}>{format(reply?.createdAt, 'short')}</p>
                                                    <p onClick={() => { handleReplyClick(comment, reply) }} className={`${subTextTheme} text-xs ml-2 cursor-pointer ${hoverTheme} transition-all duration-200 ease-in-out`}>reply</p>
                                                    {<RxDotsHorizontal onClick={() => { setDeleteReply(reply._id); setDeleteReplyPopup(true) }} size={20} className={`${mainTextTheme} ml-3 mt-1 cursor-pointer  ${(reply?.author?.username === userData?.user?.username) ? (showOptions === reply?._id) ? 'opacity-100' : 'opacity-0' : 'hidden'} transition-all duration-200 ease-in-out ${hoverTheme}`} />}
                                                </div>
                                           </div>
                                            <div className="w-fit h-full flex flex-col items-center justify-center">

                                                <div className="w-fit h-full flex flex-col items-center justify-center">
                                                    {(reply?.likes && Array.isArray(reply?.likes) && allCommentsInMain?.some(comment => comment?._id === reply?.comment && comment?.replies?.some(replyItem => replyItem?._id === reply?._id && replyItem?.likes?.includes(userData?.user?._id)))) ?
                                                        <img onClick={() => { handleReplyLike(reply) }} src={heartfill} alt="liked" className="w-5 h-5 cursor-pointer" /> :
                                                        <GoHeart size={20} onClick={() => { handleReplyLike(reply) }} className={`${mainTextTheme} cursor-pointer transition-all duration-200 ease-in-out ${hoverTheme}`} />}
                                                    {allReplies && <p className={`${mainTextTheme} text-xs`}>{reply?.likes?.length}</p>}
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>}
                            </div>

                        ))
                    }
                </>
            }
        </>
    )
}

export default React.memo(PostComments)

