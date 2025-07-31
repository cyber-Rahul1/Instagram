import Login from "./pages/Login"
import { Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import { useContext, useEffect } from "react"
import ForgotPassword from "./pages/ForgotPassword"
import EnterOtp from "./pages/EnterOtp"
import ResetPassword from "./pages/ResetPassword"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import DataDeletion from "./pages/DataDeletion"
import Birthday from "./pages/Birthday"
import ConfirmEmail from "./pages/ConfirmEmail"
import Suggested from "./pages/Suggested"
import Explore from "./pages/Explore"
import Reels from "./pages/Reels"
import Message from "./pages/Message"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import Activity from "./pages/Activity"
import { ThemeContext } from "./context/ContextProvider"
import WorkInProgess from "./pages/WorkInProgess"
import ProtectedRoute from "./functions/ProtectedRoute"
import SearchWrapper from "./pages/SearchWrapper"
import Saved from "./pages/Saved"
import Posts from "./pages/Posts"
import ProfileReels from "./pages/ProfileReels"
import Tagged from "./pages/Tagged"
import EditProfile from "./pages/EditProfile"
import Archive from "./pages/Archive"
import Notification from "./components/Notification"
import Theme from "./pages/Theme"
import SavedPageInSettings from "./pages/SavedPageInSettings"
import io from 'socket.io-client';
import { setAllComments } from "./redux/postSlice"
import { useDispatch, useSelector } from "react-redux"
import MainPage from "./pages/MainPage"
import MessageArea from "./components/MessageArea"
import { setOnlineUsers } from "./redux/userSlice"
import { setMessages } from "./redux/messageSlice"




const socket = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:8000');


const App = () => {


  const { theme, setCommentLikes, setAllCommentsInMain, setShowReplies, setRecentUsers, setViewed } = useContext(ThemeContext);
  const dispatch = useDispatch();


  const { userData } = useSelector((state) => state.user)

//-------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (userData?.user?._id) {
      socket.emit('addUser', userData?.user?._id);
    }
  }, [userData]);

//-------------------------------------------------------------------------------------------------

  useEffect(() => {
    console.log(
      "%cStop!",
      "color: red; font-size: 48px; font-weight: bold;"
    );
    console.log(
      "%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable an Instagram feature or 'hack' someone's account, it is a scam and will give them access to your Instagram account.\n\nSee https://www.facebook.com/selfxss for more information.",
      "color: white; font-size: 20px; letter-spacing: 2px;"
    );
  }, []);


  //-------------------------------------------------------------------------------------------------


  useEffect(() => {
    document.title = 'Instagram'
  }, [])


  //-------------------------------------------------------------------------------------------------

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);


  //-------------------------------------------------------------------------------------------------

  useEffect(() => {

    socket.on('newComment', (comment) => {
      console.log('New comment received:', comment);
      dispatch(setAllComments(comment));
    });

  
    socket.on('newCommentLike', ({ commentId, user }) => {
      setCommentLikes(prev => {
        const index = prev.findIndex(item => item.commentId === commentId);

        if (index !== -1) {
          const updated = [...prev];
          const isLiked = updated[index].likedUser.some(u => u._id === user._id);

          if (isLiked) {
            updated[index].likedUser = updated[index].likedUser.filter(u => u._id !== user._id);
          } else {
            updated[index].likedUser = [...updated[index].likedUser, user];
          }

          return updated;
        } else {
          return [...prev, { commentId, likedUser: [user] }];
        }
      });
    });

   socket.on('newReply', ({ commentId, reply }) => {
    console.log('New reply received:', reply);
      setAllCommentsInMain(prev => {
        return prev.map(comment => {
          if (comment._id === commentId) {
            return {
              ...comment,
              replies: [reply, ...comment.replies]
            };
          }
          return comment;
        });
      });
      setShowReplies(prev => ({ ...prev, [commentId]: !prev[commentId] }))
    });


    socket.on('clearOneRecentUser', (user) => {
      setRecentUsers(prev => prev.filter(u => u._id !== user._id || u.username !== user.username));
    });
    

    socket.on('newNotification', (id) => {
      if (id === userData?.user?._id) {
        setViewed(false);
      }
    });

   


    socket.on('onlineUsers', (users) => {
      dispatch(setOnlineUsers(users));
    });


    return () => {
      socket.off('newComment');
      socket.off('newCommentLike');``
      socket.off('newReply');
      socket.off('clearOneRecentUser');
      socket.off('newNotification');
      socket.off('onlineUsers');
    };
  }, []);


  //-------------------------------------------------------------------------------------------------

  
  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(setMessages(message));
    });
  }, [dispatch])



  //-------------------------------------------------------------------------------------------------


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/:username" element={<Signup />} />
        <Route path="/signup/birthday" element={<Birthday />} />
        <Route path="/signup/birthday/confirmemail" element={<ConfirmEmail />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/otp" element={<EnterOtp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/data-deletion" element={<DataDeletion />} />
        <Route path="/soon" element={<WorkInProgess />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>}>
          <Route path="/" element={ (userData?.user?.following?.length > 0) ? <MainPage /> : <Suggested />} />
          <Route path="/suggested" element={<Suggested />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/messages" element={<Message />}>
            <Route path="/messages/:identifier" element={<MessageArea />} />
          </Route>
          <Route path="/notifications" element={<Notification />} />
          <Route path="/profile/:identifier" element={<Profile />} >
            <Route path="/profile/:identifier" element={<Posts />} />
            <Route path="/profile/:identifier/saved" element={<Saved />} />
            <Route path="/profile/:identifier/reels" element={<ProfileReels />} />
            <Route path="/profile/:identifier/tagged" element={<Tagged />} />
          </Route>
          <Route path="/archive/stories" element={<Archive />} />
          <Route path="/settings" element={<Settings />} >
            <Route path="/settings/:identifier/editprofile" element={<EditProfile />} />
            <Route path="/settings/:identifier/saved" element={<SavedPageInSettings />} />
            <Route path="/settings/:identifier/archive" element={<Archive />} />
            <Route path="/settings/:identifier/soon" element={<WorkInProgess />} />
            <Route path="/settings/:identifier/theme" element={<Theme />} />
          </Route>
          <Route path="/activity" element={<Activity />} />
          <Route path="/search" element={<SearchWrapper />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
