import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const CommentOptions = ({ postId, setShowOptions, editPostId, page , setViewPost }) => {
    const { theme, setEditPost, sameData, aboutAcc, setAboutAcc, authorId, authorName } = useContext(ThemeContext)
    const [loading, setLoading] = useState(false)
    const [currentPost, setCurrentPost] = useState({})
    const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
    const [id, setId] = useState('')


    //-----------------------------------------------------------------------------------


    useEffect(() => {
        setId(page === 'main' ? editPostId : postId)
    }, [page, postId , editPostId])

    const navigate = useNavigate()


    //-----------------------------------------------------------------------------------


    useEffect(() => {
        const fetchPost = async () => {
           if (id) {
            try {
                let result = await axios.get(`${serverUrl}/api/posts/getpost/${id}`, { withCredentials: true });
                setCurrentPost(result.data)
            } catch (error) {
                console.log(error);
            }
           }
        }
        fetchPost();
    }, [id, serverUrl, page])

    //-----------------------------------------------------------------------------------


    const postOptions = sameData ? [
        { name: "Delete", action: "delete", style: "danger" },
        { name: "Edit", action: "edit" },
        { name: (currentPost?.post?.hideLikes) ? "Unhide like count to others" : "Hide like count to others", action: "hide_likes" },
        { name: (currentPost?.post?.hideComments) ? "Turn on commenting" : "Turn off commenting", action: "turn_off_commenting" },
        { name: "Go to post", action: "go_to_post" },
        { name: "Share to...", action: "share" },
        { name: "Copy link", action: "copy_link" },
        { name: "Embed", action: "embed" },
        { name: "About this account", action: "about_account" },
        { name: "Cancel", action: "cancel" }
    ] : [
        { name: "Report", action: "report", style: "danger" },
        { name: "Go to post", action: "go_to_post" },
        { name: "Share to...", action: "share" },
        { name: "Copy link", action: "copy_link" },
        { name: "About this account", action: "about_account" },
        { name: "Cancel", action: "cancel" }
    ]

    //-----------------------------------------------------------------------------------



    const handleOptions = async (action) => {
        switch (action) {
            case "delete":
                setLoading(true)
                try {
                    await axios.delete(`${serverUrl}/api/posts/deletepost/${id}`, { withCredentials: true });
                    window.location.reload();
                    setLoading(false)
                } catch (error) {
                    console.log(error);
                    setLoading(false)
                }
                break;
            case "edit":
                setEditPost(true)
                setShowOptions(false)
                break;
            case "hide_likes":
                try {
                    await axios.get(`${serverUrl}/api/posts/hidelikes/${id}`, { withCredentials: true });
                } catch (error) {
                    console.log(error);
                }
                break;
            case "turn_off_commenting":
                try {
                    await axios.get(`${serverUrl}/api/posts/hidecomments/${id}`, { withCredentials: true });
                } catch (error) {
                    console.log(error);
                }
                break;
            case "go_to_post":
                navigate(`/profile/${authorName || authorId}`);
                setViewPost(false)
                window.scrollTo(0, 0)
                break;
            case "share":
                console.log("share");
                break;
            case "copy_link":
                console.log("copy_link");
                break;
            case "embed":
                console.log("embed");
                break;
            case "about_account":
                setAboutAcc(!aboutAcc)
                break;
            case "cancel":
                setShowOptions(false)
                break;
            default:
                break;
        }
    }







    return (
        <>
            <div className={`w-fit h-fit flex flex-col z-100 items-center justify-center rounded-xl ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#262626]'}`}>
                {loading ? (
                    <div className="absolute top-50 left-50 h-10 w-10 border-t-1 border-b-1 z-50 border-[white] rounded-full animate-spin transition-all duration-500 ease-in-out" />
                ) : (
                    postOptions.map((option) => (
                        <div key={option.name} className={`w-full h-fit z-200 flex items-center justify-center py-[13px] gap-3 ${option.style === "danger" ? 'text-red-500 font-semibold' : ''} ${option.name === "Cancel" ? 'border-b-0' : ' border-b-1'} ${theme === 'dark' ? 'border-[#363636]' : (theme === 'light') ? 'border-[#f2f2f2]' : ' border-[#f2f2f2] dark:border-[#363636]'}`}>
                            <p onClick={() => { handleOptions(option.action); }} className="text-xs md:text-sm px-16 md:px-30  cursor-pointer hover:opacity-70 transition-all duration-200 ease-in-out">{sameData ? option.name : (option.name === "Edit" || option.name === "Delete") ? "" : option.name}</p>
                        </div>
                    ))

                )}
            </div>

        </>

    )
}

export default CommentOptions
