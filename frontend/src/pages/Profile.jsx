import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../context/ContextProvider"
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { IoIosSettings, IoMdGrid } from "react-icons/io";
import { CgBookmark } from "react-icons/cg";
import { BiMoviePlay, BiSolidMoviePlay } from "react-icons/bi";
import { SquareUserRound } from 'lucide-react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import dp from '../assets/dp.webp';
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsFillGrid3X3GapFill, BsThreads } from "react-icons/bs";
import { RiMenuLine, RiUser3Fill } from "react-icons/ri";
import { LuSquarePlus } from "react-icons/lu";
import SwitchAccount from "../components/SwitchAccount";
import { setUserProfile } from "../redux/userSlice";
import { FaCamera } from "react-icons/fa";
import ProfileLogOut from "../components/ProfileLogOut";
import ProfileImage from "../components/ProfileImage";
import ViewProfileOrStory from "../components/ViewProfileOrStory";
import { AiOutlineLeft } from "react-icons/ai";



const Profile = () => {

  const dispatch = useDispatch()

  const { userData, userProfile } = useSelector((state) => state.user)
  const { identifier } = useParams();
  const [same, setSame] = useState(false);
  const [user, setUser] = useState(null);
  const [view, setView] = useState('');
  const [switchAccount, setSwitchAccount] = useState(false)
  const [profileImage, setProfileImage] = useState(null);
  const [showDp, setShowDp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [logout, setLogout] = useState(false)
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(user?.bio?.length > 50)

  const { theme, setActiveItem, viewPost, setViewPost, showComment, setShowComment, setSearchIsFocussed, setNotificationIsFocussed, active, setActive, image, setActiveSettings } = useContext(ThemeContext);
  let buttonClass = same && theme === 'dark' ? ' bg-[#686565a4] hover:bg-[#68656575] text-white' : same && theme === 'light' ? 'bg-[#f0f0f0] hover:bg-[#cecdcd] text-black' : 'bg-[#0095f6] text-white'
  let spanClass = theme === 'dark' ? 'text-white font-medium' : theme === 'light' ? 'text-black font-medium' : 'text-black dark:text-white font-medium'
  let pClass = theme === 'dark' ? 'text-[#ffffffa5]' : theme === 'light' ? 'text-[#302f2fa5]' : 'text-[#302f2fa5] dark:text-[#ffffffa5]'
  let nameClass = theme === 'dark' ? 'text-white font-semibold' : theme === 'light' ? 'text-black font-semibold' : 'text-black dark:text-white font-semibold'
  let navigate = useNavigate()

  let serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";


  useEffect(() => {
    if (userData === null) {
      setProfileLoading(true)
    } else {
      setProfileLoading(false)
    }
  }, [userData])


  useEffect(() => {

    const fetchUser = async () => {

      try {
        let result = await axios.get(`${serverUrl}/api/users/getuserprofile/${identifier}`, {
          withCredentials: true
        });
        document.title = `${result.data?.user.name}'s Profile - Instagram`;
        setSame(result.data?.user?._id === userData?.user?._id)
        setUser(result.data?.user);
        dispatch(setUserProfile(result.data?.user));
      } catch (error) {
        console.log(error);

      }
    }
    fetchUser();


  }, [userData, identifier, serverUrl, dispatch])



  const profileTabs = [
    { name: "POSTS", icon: <IoMdGrid size={14} />, path: `/profile/${identifier}` },
    { name: same ? 'SAVED' : 'REELS', icon: same ? <CgBookmark size={17.5} /> : <BiMoviePlay size={14} />, path: same ? `/profile/${identifier}/saved` : `/profile/${identifier}/reels` },
    { name: "TAGGED", icon: <SquareUserRound size={14} />, path: `/profile/${identifier}/tagged` },
  ];

  const profileTabs2 = [
    { name: "POSTS", icon: active === 'POSTS' ? <BsFillGrid3X3GapFill size={21} /> : <IoMdGrid size={24} />, path: `/profile/${identifier}` },
    { name: 'REELS', icon: active === 'REELS' ? <BiSolidMoviePlay size={24} /> : <BiMoviePlay size={24} />, path: `/profile/${identifier}/reels` },
    { name: "TAGGED", icon: active === 'TAGGED' ? <div className={`flex items-center justify-end h-fit w-fit border-2 ${theme === 'dark' ? 'border-[white]' : (theme === 'light') ? 'border-[black]' : ' border-[black] dark:border-[white]'} rounded-sm`}><RiUser3Fill size={17} /></div> : <SquareUserRound size={24} />, path: `/profile/${identifier}/tagged` },
  ];

  const MenuItems = [
    { name: "Threads", icon: <BsThreads size={22} className={`cursor-pointer active:scale-95 ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`} />, path: "/soon" },
    { name: "Create", icon: <LuSquarePlus size={22} className={`cursor-pointer active:scale-95 ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`} /> },
    { name: "More", icon: <RiMenuLine size={24} className={`cursor-pointer active:scale-95 ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`} />, path: `/settings` }
  ];

  const handleClick1 = async () => {
    if (same) {
      setActiveSettings('Edit profile');
      navigate(`/settings/${identifier}/editprofile`);
    } else {
      try {
        let result = await axios.post(`${serverUrl}/api/users/followandunfollow/${identifier}`, { withCredentials: true });
        console.log(result.data);
        setUser(result.data.user);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleClick2 = () => {
    if (same) {
      navigate(`/archive/stories`);
    } else {
      navigate(`/messages/${identifier}`);
    }
  }


  const handleNavigate = (path) => {
    if (path === '/settings') {
      setActiveSettings('settings');
    }
    navigate(path);
  }

  const handleProfileImage = async (e) => {
    if (same) {
      setLoading(true)
      let file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
      const formData = new FormData();

      formData.append('profilepic', file);
      try {
        let result = await axios.put(`${serverUrl}/api/users/updateuser`, formData, {
          withCredentials: true, headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(result.data);
        setLoading(false)
        setMessage("Profile picture updated successfully")
        setTimeout(() => {
          setMessage('')
        }, 5000);
      } catch (error) {
        console.log(error);
        setLoading(false)
        setMessage(error.response?.data.message)
        setTimeout(() => {
          setMessage('')
        }, 5000);
      }
    }
  }

  //--------------------------------------------------------------------------------

  const handleDp = () => {

    if (!same) {
      setShowDp(true);
    } else if (same) {
      image.current.click()
    }

  }






  return (
    <div onClick={() => { setActiveItem('Profile'); setSearchIsFocussed(false); setNotificationIsFocussed(false); }} className={`${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} flex flex-col items-center justify-start h-screen pt-20 md:pt-0 w-full md:px-3 lg:px-auto overflow-y-auto transition-all duration-200 ease-in-out`}>
      {message && <p className="text-gray-800 dark:text-[#ffffffd1] text-[15px]  w-full absolute bottom-0 left-0 px-5 py-2 z-5 md:block bg-gray-200 dark:bg-[#262626]">{message}</p>}
      {(switchAccount) && <div onClick={() => { setSwitchAccount(false); }} className="fixed top-0 z-50 left-0 w-screen h-screen  flex items-center justify-center">
        <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-85" />
        <SwitchAccount setSwitchAccount={setSwitchAccount} />
      </div>}
      {(logout) && <div onClick={() => { setLogout(false); }} className="fixed top-0 z-50 left-0 w-screen h-screen  flex items-center justify-center">
        <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-85" />
        <ProfileLogOut setLogout={setLogout} userData={userData} />
      </div>}
      {(view === 'dp') && <div onClick={() => { setShowDp(false); }} className="fixed top-0 z-50 left-0 w-screen h-screen  flex items-center justify-center">
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#4c4c4c] blur-6xl opacity-85" />
        <ProfileImage profileImage={userProfile?.profilepic} showDp={showDp} setShowDp={setShowDp} />
      </div>}
      {(showDp) && <div onClick={() => { setShowDp(false); }} className="fixed top-0 z-50 left-0 w-screen h-screen  flex items-center justify-center">
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#4c4c4c] blur-6xl opacity-85" />
        <ViewProfileOrStory view={view} setView={setView} showDp={showDp} setShowDp={setShowDp} theme={theme} />
      </div>}
      <div className={`${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} w-full fixed top-0 z-10 flex md:hidden items-center justify-between p-4 border-b-1 border-[#a8a5a346]`}>
        {(!viewPost && userData?.user?._id === userProfile?._id ) ? <>
          <p onClick={() => { setSwitchAccount(true); }} className="active:scale-98 cursor-pointer active:text-[#ffffff94] transition-all duration-200 ease-in-out text-[15px] font-semibold flex items-center gap-1 justify-center">{user?.name} <span><MdKeyboardArrowDown size={24} /></span></p>
          <div className=" flex items-center gap-4">
            {MenuItems.map((item) => (
              <div key={item.name} onClick={() => { handleNavigate(item.path); }} className="active:scale-95 cursor-pointer active:text-[#ffffff94]">
                {item.icon}
              </div>
            ))}
          </div>
        </> : 
        <div className="w-full relative flex items-center justify-center gap-4">
            { showComment && <div onClick={() => { setShowComment(false); }} className="w-screen h-14 absolute -top-4 -left-4"  />}
          <div onClick={() => { setViewPost(false); setShowComment(false); }} className="absolute left-2 active:scale-95 cursor-pointer active:text-[#ffffff94]">
            <AiOutlineLeft size={24} />
          </div>
          <p className="text-[15px] font-semibold ">Post</p>
        </div>}
        { !same && <div className="w-full relative flex items-center justify-center gap-4">
          {showComment && <div onClick={() => { setShowComment(false); }} className="w-screen h-14 absolute -top-4 -left-4" />}
          <div onClick={() => { setViewPost(false); setShowComment(false); }} className="absolute left-2 active:scale-95 cursor-pointer active:text-[#ffffff94]">
            <AiOutlineLeft size={24} />
          </div>
          <p className="text-[15px] font-semibold ">{user?.username ? user?.username : user?.name}</p>
        </div>}
      </div>
      {profileLoading ? <div className="w-full h-full flex items-center justify-center"><div className="h-10 w-10 border-t-1 border-b-1  border-[white] rounded-full animate-spin transition-all duration-500 ease-in-out" /></div> :
        <div className="relative w-full lg:w-[950px] h-fit pb-10 flex items-start justify-center pt-5 md:border-b-1 border-[#a8a5a346]">
          <input ref={image} onChange={(e) => { handleProfileImage(e); }} type="file" accept="image/*" className="hidden" />
          <div className="w-[90%] h-[90%] flex-col md:flex-row flex justify-start md:gap-20 ">
            <div className="flex items-start gap-5 px-auto">
              <div onClick={handleDp} className="relative w-[95px] h-[95px] cursor-pointer md:w-[145px] md:h-[145px] lg:mx-6 md:my-10 border-1 border-[#a8a5a3a7] rounded-full overflow-hidden flex items-center justify-center">
                <img className="w-full h-full object-cover" src={profileImage || userProfile?.profilepic || dp} alt="dp" />
                {( same && !userData?.user?.profilepic) && <div className={` ${theme === 'dark' ? 'bg-[#00000071] text-white  hover:bg-[#00000086]' : (theme === 'light') ? 'bg-[#f0f0f0] text-[#b5b4b4] hover:bg-[#cecdcd]' : 'bg-[#f0f0f0] dark:bg-[#686565a4] hover:bg-[#cecdcd] dark:hover:bg-[#68656575]'} absolute w-full h-full rounded-full  flex items-center justify-center`}><FaCamera className="text-2xl md:text-5xl" />
                  {loading && <div className="absolute rounded-full top-0 left-0 w-full h-full bg-[#00000071] flex items-center justify-center"><div className="h-10 w-10 border-t-1 border-b-1  border-[white] rounded-full animate-spin transition-all
               duration-500 ease-in-out"/></div>}
                </div>}
              </div>
              <div className="flex md:hidden w-[70%] flex-col items-start gap-4 font-semibold justify-center">
                <div className=" flex gap-2">
                  <p className="text-[18px] ">{user?.username ? user?.username : user?.name?.length > 15 ? user?.name?.slice(0, 10) + '...' : user?.name}</p>
                </div>

                <div className=' h-fit w-full '>
                  <div className="flex items-start w-full pb-4">
                    <div className="flex flex-1"><p className={`${pClass} text-sm flex  flex-col`}><span className={spanClass}>{user?.posts?.length}</span> posts</p></div>
                    <div className="flex flex-1"><p className={`${pClass} text-sm flex  flex-col`}><span className={spanClass}>{user?.followers?.length}</span> followers</p></div>
                    <div className="flex flex-1"><p className={`${pClass} text-sm flex  flex-col`}><span className={spanClass}>{user?.following?.length}</span> following</p></div>
                  </div>
                </div>

              </div>
            </div>
            <div className="flex flex-col justify-start items-start md:pt-8 gap-2">
              <div className="hidden md:flex flex-col gap-2">
                <div className="flex items-center md:gap-2 lg:gap-4 font-semibold justify-center">
                  <p className="text-[20px] ">{user?.username ? user?.username : user?.name?.length > 10 ? user?.name?.slice(0, 10) + '...' : user?.name}</p>
                  <div onClick={(e) => e.stopPropagation()} className=" flex gap-2">
                    <button onClick={handleClick1} className={`px-4 py-[6px] rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out cursor-pointer active:scale-95 ${buttonClass}`}>{same ? 'Edit Profile' : 'Follow'}</button>
                    <button onClick={handleClick2} className={`px-4 py-[6px] rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out cursor-pointer active:scale-95 ${buttonClass}`}>{same ? 'View archive' : 'Message'}</button>
                    <IoIosSettings size={28} onClick={() => setLogout(true)} className={`cursor-pointer active:scale-95 ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`} />
                  </div>
                </div>
                <div className="flex items-start gap-10  py-4">
                  <p className={`${pClass}`}><span className={spanClass} >{user?.posts?.length}</span> posts</p>
                  <p className={`${pClass}`}><span className={spanClass} >{user?.followers?.length}</span> followers</p>
                  <p className={`${pClass}`}><span className={spanClass}>{user?.following?.length}</span> following</p>
                </div>
              </div>
              <div className="flex flex-col w-50 md:w-100 flex-wrap gap-2 mt-3 pb-12 md:pb-0">
                <p className={`${nameClass}  text-[15px] font-medium`}>{user?.name}</p>
                <p onClick={(e) => { e.stopPropagation(); setShow(!show); }} className={`"${pClass}  text-sm pb-2`}>{show ? user?.bio : user?.bio?.slice(0, 50)} <span className={`text-[#708dff] cursor-pointer ${(user?.bio?.length > 50 && !show) ? '' : 'hidden'}`}>...more</span> </p>
              </div>
            </div>
          </div>
          <div onClick={(e) => e.stopPropagation()} className="absolute md:hidden  bottom-3 flex w-full gap-2 px-4">
            <button onClick={handleClick1} className={`flex-1 py-[6px] rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out cursor-pointer active:scale-95 ${buttonClass}`}>{same ? 'Edit Profile' : 'Follow'}</button>
            <button onClick={handleClick2} className={`flex-1 py-[6px] rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out cursor-pointer active:scale-95 ${buttonClass}`}>{same ? 'View archive' : 'Message'}</button>
          </div>


        </div>}

      <div className=" w-full lg:w-[950px] flex items-center  border-b-1 border-[#a8a5a32a] md:border-0 justify-around md:justify-center  gap-15 ">
        {profileTabs.map((item) => (
          <div onClick={() => { navigate(item.path); setActive(item.name); }} key={item.name} className={`${(active === item.name && theme === 'dark') ? 'text-[white] border-t-1 border-[white]' : (active === item.name && theme === 'light') ? 'text-[black] border-t-1 border-[black]' : theme === 'dark' ? 'text-[#ffffffa5]' : theme === 'light' ? 'text-[#5f5b5bb5]' : 'text-[#3d3c3c] dark:text-[#ffffffa5]'} hidden md:flex py-5  items-center cursor-pointer gap-[5px] duration-50 ease-in-out `}>
            <div className="flex items-center">{item.icon}</div>
            <p className="text-[13px] tracking-wider font-semibold transition-all ">{item.name}</p>
          </div>
        ))}
        {profileTabs2.map((item) => (
          <div onClick={() => { navigate(item.path); setActive(item.name); }} key={item.name} className={`${(active === item.name && theme === 'dark') ? 'text-[white] border-b-1 border-[white]' : (active === item.name && theme === 'light') ? 'text-[black] border-b-1 border-[black]' : theme === 'dark' ? 'text-[#ffffffa5]' : theme === 'light' ? 'text-[#5f5b5bb5]' : 'text-[#3d3c3c] dark:text-[#ffffffa5]'} md:hidden flex py-auto h-12 items-center cursor-pointer duration-60 ease-in-out transition-all`}>
            <div className="flex items-center w-full px-5">{item.icon}</div>

          </div>
        ))}
      </div>
      <Outlet />
    </div>
  )
}

export default Profile
