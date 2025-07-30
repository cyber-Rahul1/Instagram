import { useRef, useState } from "react";
import { ThemeContext } from "./ContextProvider";




const ThemeProvider = ({ children }) => {
    let image = useRef()
    const [theme, setTheme] = useState('dark');
    const [activeItem, setActiveItem] = useState('Home');
    const [active, setActive] = useState('POSTS')
    const [viewPost, setViewPost] = useState(false);
    const [editPost, setEditPost] = useState(false)
    const [sameData, setSameData] = useState(false)
    const [indexval, setIndexval] = useState(0)
    const [showLikes, setShowLikes] = useState({})
    const [hideCommenting, setHideCommenting] = useState({})
    const [reply, setReply] = useState(false)
    const [postId, setPostId] = useState('')
    const [comment, setComment] = useState('')
    const [likedUsers, setLikedUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [commentLikes, setCommentLikes] = useState([])
    const [aboutAcc, setAboutAcc] = useState(false)
    const [commentId, setCommentId] = useState(null)
    const [switchTheme, setSwitchTheme] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [post, setPost] = useState({})
    const [searchIsFocussed, setSearchIsFocussed] = useState(false)
    const [activeSettings, setActiveSettings] = useState('settings')
    const [allCommentsInMain, setAllCommentsInMain] = useState([])
    const [postIdInMain, setPostIdInMain] = useState('')
    const [showReplies, setShowReplies] = useState({})
    const inputRef = useRef(null)
    const [viewed, setViewed] = useState(true)
    const [notificationIsFocussed, setNotificationIsFocussed] = useState(false)
    const [authorId, setAuthorId] = useState('')
    const [recentUsers, setRecentUsers] = useState([])
    const [editPostId, setEditPostId] = useState('')
    const [viewStory, setViewStory] = useState(false)
    const [showCross , setShowCross] = useState(false)
    const [authorName, setAuthorName] = useState('')
    const [messageArea, setMessageArea] = useState(false);
    const [messagedUsers, setMessageUsers] = useState([]);






    return (
        <ThemeContext.Provider value={{ messagedUsers, setMessageUsers, messageArea, setMessageArea, authorName, setAuthorName, showCross, setShowCross, viewStory, setViewStory, editPostId, setEditPostId, viewed, setViewed, recentUsers, setRecentUsers, showReplies, setShowReplies, postIdInMain, setPostIdInMain, inputRef, allCommentsInMain, setAllCommentsInMain, authorId, setAuthorId, reply, setReply, loading, setLoading, comment, setComment, post, setPost, indexval, setIndexval, commentLikes, setCommentLikes, likedUsers, setLikedUsers, commentId, setCommentId, hideCommenting, setHideCommenting, showLikes, setShowLikes, aboutAcc, setAboutAcc, sameData, setSameData, editPost, setEditPost, postId, setPostId, showComment, setShowComment, viewPost, setViewPost, activeSettings, setActiveSettings, image, theme, setTheme, activeItem, setActiveItem, active, setActive, switchTheme, setSwitchTheme, searchIsFocussed, setSearchIsFocussed, notificationIsFocussed, setNotificationIsFocussed }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
