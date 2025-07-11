import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import dp from '../assets/dp.webp';
import axios from "axios";
import ChangeProfileMenu from "../components/ChangeProfileMenu";
import { useNavigate } from "react-router-dom";
import LoginFooter from "../components/LoginFooter";
import { IoIosArrowDown } from "react-icons/io";
import { MdArrowBackIos } from "react-icons/md";
import { setUserData } from "../redux/userSlice";

const EditProfile = () => {

  const { theme } = useContext(ThemeContext);
  let image = useRef()
  let dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    bio:  '',
    gender: ''
  })
  const [updateImage, setUpdateImage] = useState(false)
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('')
  let serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
  const bioRef = useRef()
  const nameRef = useRef()
  const usernameRef = useRef()
  const [focus, setFocus] = useState('')
  const [total, setTotal] = useState(0)
  const [genderShow, setGenderShow] = useState(false)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  let sameData = formData.name === userData?.user?.name && formData.username === userData?.user?.username && formData.bio === userData?.user?.bio && formData.gender === userData?.user?.gender




  const changeProfilePhotoMenu = [
    { name: "Change Profile Photo", type: "heading" },
    { name: "Upload Photo", type: "1" },
    { name: "Remove Current Photo", type: "2" },
    { name: "Cancel", type: "3" },
  ];

  const genderOptions = [

    { name: "Female", value: "Female" },
    { name: "Male", value: "Male" },
    { name: "Prefer not to say", value: "Prefer not to say" },
  ];

  useEffect(() => {
    setFormData({
      name: userData?.user?.name || '',
      username: userData?.user?.username || '',
      bio: userData?.user?.bio || '',
      gender: userData?.user?.gender || ''
    })
  }, [])


  const uploadPhoto = async (e) => {
    setLoading(true)
    let file = e.target.files[0];
    const formData = new FormData();

    formData.append('profilepic', file);
    try {
      let result = await axios.put(`${serverUrl}/api/users/updateuser`, formData, {
        withCredentials: true, headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(result.data);
      setUpdateImage(false);
      setMessage("Profile picture updated successfully")
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data.message)
      setUpdateImage(false);
    }
    setLoading(false);
    setUpdateImage(false);
    setTimeout(() => setMessage(''), 3000);
  }

  const removePhoto = async () => {
    setLoading(true);
    try {
      let result = await axios.put(`${serverUrl}/api/users/removeprofilepic`, {}, {
        withCredentials: true, headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(result.data);
      setMessage("Profile picture removed successfully");
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data.message);
    }
    setLoading(false);
    setUpdateImage(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChange = async (e) => {
    setFormData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value.trim()
      }
    })
    if (e.target.name === 'bio') {
      setTotal(e.target.value.length)
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let result = await axios.put(`${serverUrl}/api/users/updateuser`, {
        bio: formData.bio,
        gender: formData.gender,
        name: formData.name,
        username: formData.username
      }, {
        withCredentials: true
      });
      dispatch(setUserData(result.data.updatedUser))
      console.log(result.data);
      setMessage("Profile updated successfully")
      setTotal(0)
      bioRef.current.value = ''
      nameRef.current.value = ''
      usernameRef.current.value = ''
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data.message)
    }
    setLoading(false)
    setTimeout(() => setMessage(''), 3000);
  }


  return (
    <div className={`w-full min-h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-black text-white' : (theme === 'light') ? 'bg-white text-black' : ' bg-white dark:bg-black text-black dark:text-white'} `}>
      <div className="w-full h-fit overflow-y-auto flex flex-col items-center justify-center editScreen  lg:pt-20 pb-15 px-auto lg:px-4">
        {message && <p className="text-gray-800 dark:text-[#ffffffd1] text-[15px]  w-full absolute bottom-0 left-0 px-5 py-2 z-5 md:block bg-gray-200 dark:bg-[#262626]">{message}</p>}
        <div className="w-full flex-1 max-w-[620px] h-fit flex flex-col items-center justify-center px-3 lg:px-auto gap-2">
          <input ref={image} onChange={(e) => { uploadPhoto(e); }} type="file" accept="image/*" className="hidden" />
          <ChangeProfileMenu changeProfilePhotoMenu={changeProfilePhotoMenu} setUpdateImage={setUpdateImage} image={image} removePhoto={removePhoto} theme={theme} loading={loading} updateImage={updateImage} />
          <div className="w-full  h-fit  flex flex-col items-start justify-center">
            <div className="w-full hidden md:flex items-center justify-start gap-2">
              <MdArrowBackIos onClick={() => { navigate(-1) }} size={24} className="cursor-pointer flex md:hidden active:scale-95 text-[#908d8d84] transition-all duration-200 ease-in-out " />
              <h1 className={`text-xl font-bold pb-10 pt-20`}>Edit Profile</h1>
            </div>
            <div className={`w-full md:hidden fixed top-0 left-0 flex items-center justify-center py-3 border-b-1 gap-2 ${theme === 'dark' ? 'bg-black text-white border-[#363636]' : (theme === 'light') ? 'bg-white text-black border-[#d3d3d3]' : ' bg-white dark:bg-black text-black dark:text-white  border-[#d3d3d3] dark:border-[#363636]'}`}>
              <MdArrowBackIos onClick={() => { navigate(-1) }} size={24} className="cursor-pointer absolute left-6 flex md:hidden active:scale-95 text-[#ffffffe7] transition-all duration-200 ease-in-out " />
              <h1 className={`text-md font-medium `}>Edit profile</h1>
            </div>
            <div className={`flex items-center justify-between w-full gap-4 rounded-3xl p-4 ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-[#efefef]' : ' bg-white dark:bg-[#262626]'}`}>
              <div className="flex items-center justify-center gap-4">
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden"><img className="w-full h-full object-cover" src={userData?.user?.profilepic || dp} alt="" /></div>
                <div>
                  <h3 className="text-md font-semibold ">{userData?.user?.username || userData?.user?.name}</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-[#ffffff94]' : (theme === 'light') ? 'text-[#00000090]' : ' text-[#00000090] dark:text-[#ffffff94]'} `}>{userData?.user?.name}</p>
                </div>
              </div>
              <div>
                <button onClick={() => setUpdateImage(!updateImage)} className="text-sm font-semibold py-[7px] px-4 bg-[#0095f6] rounded-lg cursor-pointer hover:bg-[#005af6da] active:scale-95 transition-all duration-300 ease-in-out text-white">Change Photo</button>
              </div>
            </div>

          </div>
          <div className={`w-full h-fit flex flex-col items-start justify-center gap-2 pt-7`}>
            <h3 className="text-md font-semibold pb-1 ">Website</h3>
            <div className={`flex items-center justify-between w-full cursor-not-allowed  rounded-xl  py-[10px]  px-4 ${theme === 'dark' ? 'bg-[#262626] text-[#ffffff94]' : (theme === 'light') ? 'bg-[#efefef] text-[#00000090]' : ' bg-white dark:bg-[#262626] text-[#efefef] dark:text-[#ffffff94]'}`}>Website</div>
            <p className={`text-xs ${theme === 'dark' ? 'text-[#ffffff94]' : (theme === 'light') ? 'text-[#00000090]' : ' text-[#00000090] dark:text-[#ffffff94]'}`}>Editing your links is only available on mobile. Visit the Instagram app and edit your profile to change the websites in your bio.</p>
          </div>


          {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

          <form onSubmit={handleSubmit} className="w-full h-fit flex flex-col items-start justify-center gap-2 pt-7">

            {/* // ------------ name ------------- // */}
            <label htmlFor="Name" className="text-[17px] font-semibold pb-1">Name</label>
            <div className={`flex items-center justify-start border-1 rounded-xl w-full ${focus === 'name' ? theme === 'dark' ? 'border-[#afaeaef4]' : theme === 'light' ? 'border-[#000000f2]' : '' : theme === 'dark' ? 'border-[#5d5c5c8f]' : theme === 'light' ? 'border-[#d3d3d3]' : ' border-[#efefef] dark:border-[#5d5c5c8f]'}`}> <input type="text" name="name" ref={nameRef} value={formData.name} onChange={(e) => { handleChange(e) }} onFocus={() => { setFocus('name'); }} onBlur={() => { setFocus(''); }} placeholder="Name" className=" rounded-xl px-4 py-3 outline-none w-full"></input>
            </div>


            {/* // ------------ username ------------- // */}
            <label htmlFor="Username" className="text-[17px] font-semibold pb-1 pt-6">Username</label>
            <div className={`flex items-center justify-start border-1 rounded-xl w-full ${focus === 'username' ? theme === 'dark' ? 'border-[#afaeaef4]' : theme === 'light' ? 'border-[#000000f2]' : '' : theme === 'dark' ? 'border-[#5d5c5c8f]' : theme === 'light' ? 'border-[#d3d3d3]' : ' border-[#efefef] dark:border-[#5d5c5c8f]'}`}> <input type="text" name="username" ref={usernameRef} value={formData.username} onChange={(e) => { handleChange(e) }} onFocus={() => { setFocus('username'); }} onBlur={() => { setFocus(''); }} placeholder="Username" className=" rounded-xl px-4 py-3 outline-none w-full"></input>
            </div>


            {/* // ------------ bio ------------- // */}
            <label htmlFor="bio" className="pt-6 text-[17px] font-semibold pb-1">Bio</label>
            <div className={`flex items-center justify-start border-1 rounded-xl w-full ${total >= 150 ? 'border-[#ff3040]' : ''} ${focus === 'bio' ? theme === 'dark' ? 'border-[#afaeaef4]' : theme === 'light' ? 'border-[#000000f2]' : '' : theme === 'dark' ? 'border-[#5d5c5c8f]' : theme === 'light' ? 'border-[#d3d3d3]' : ' border-[#efefef] dark:border-[#5d5c5c8f]'}`}> <textarea ref={bioRef} value={formData.bio} onChange={(e) => { handleChange(e) }} onFocus={() => { setFocus('bio'); }} onBlur={() => { setFocus(''); }} name="bio" placeholder="Bio" id="bio" cols="30" rows="10" className="w-[90%] h-[70px] rounded-xl p-4 outline-none resize-none"></textarea>
              <div className={`w-[10%] h-full flex items-end text-xs md:text-sm justify-center pb-2 pr-3 ${theme === 'dark' ? 'text-[#ffffff94] ' : theme === 'light' ? 'text-[#3a393994] ' : ' dark:text-[#ffffff94] text-[#3a393994]'} `}>{total}/150</div>
            </div>

            {/* // ------------ gender ------------- // */}
            <div className="relative flex flex-col gap-2 w-full pt-6">
              {genderShow && <div onClick={(e) => e.stopPropagation()} className={`absolute -top-33 right-0 w-85 h-fit z-60 ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white shadow-2xl' : ' bg-white dark:bg-[#262626]'} rounded-xl p-3`}>
                {genderOptions.map((item) => (
                  <div key={item.name} onClick={() => { setFormData({ ...formData, gender: item.value }); setGenderShow(false); }} className={`flex items-center justify-between w-full cursor-pointer p-4 ${theme === 'dark' ? 'hover:bg-[#262626]' : (theme === 'light') ? 'hover:bg-[#f2f2f2]' : ' hover:bg-[#f2f2f2] dark:hover:bg-[#262626]'} rounded-xl`}>
                    <p>{item.name}</p>
                    <div className={`w-6 h-6 rounded-full border-1 ${theme === 'dark' ? 'border-[white]' : (theme === 'light') ? 'border-black' : ' border-black dark:border-white'} flex items-center justify-center`}>{formData.gender === item.value && <div className={`w-6 h-6 rounded-full ${theme === 'dark' ? 'bg-white' : (theme === 'light') ? 'bg-black' : ' bg-black dark:bg-white'}`}></div>}</div>
                  </div>
                ))}
              </div>}
              <label htmlFor="gender" className="text-[17px] font-semibold pb-1" >Gender</label>
              <div onClick={() => setGenderShow(!genderShow)} className={`cursor-pointer flex items-center justify-between ${theme === 'dark' ? 'hover:bg-[#262626] bg-black text-white border-[#5d5c5c8f]' : (theme === 'light') ? 'hover:bg-[#efefef] text-black bg-white border-[#d3d3d3]' : ' bg-white dark:bg-[black] border-[#d3d3d3] dark:border-[#5d5c5c8f] hover:bg-[#efefef]'} w-full border-1  h-[50px] rounded-xl px-4 outline-none resize-none`}>
                <p className={`text-md  ${theme === 'dark' ? 'text-[#ffffffe6] font-medium' : (theme === 'light') ? 'text-[#313131]' : ' text-[#313131] dark:text-[#ffffffe6]'}`}>{formData.gender}</p>
                <IoIosArrowDown size={18} className={` ${theme === 'dark' ? 'text-[#ffffff94]' : (theme === 'light') ? 'text-[#313131]' : ' text-[#313131] dark:text-[#ffffff94]'}`} />
              </div>
              <p className={`text-xs ${theme === 'dark' ? 'text-[#ffffff94]' : (theme === 'light') ? 'text-[#656565]' : ' text-[#656565] dark:text-[#ffffff94]'}`}>This won&apos;t be part of your public profile.</p>
            </div>
            {genderShow && <div onClick={() => setGenderShow(false)} className="absolute top-0 left-0 w-full h-full z-20 bg-transparent" />}
            <div className="w-full h-fit flex flex-col items-start justify-center gap-2 pt-7">
              <h3 className={`text-md font-semibold pb-1  `}>Show account suggestions on profiles</h3>
              <div className={`flex items-center justify-center gap-4 w-full h-fit rounded-2xl border-1  py-3 px-4 ${theme === 'dark' ? ' text-[#ffffff94] border-[#5d5c5c8f] ' : (theme === 'light') ? 'border-[#d3d3d3]  text-[#00000090]' : ' text-[#efefef] dark:text-[#ffffff94] border-[#d3d3d3] dark:border-[#5d5c5c8f]'}`}>
                <div className="flex flex-col">
                  <p className={`text-md  ${theme === 'dark' ? 'text-[#ffffffe6] font-semibold' : (theme === 'light') ? 'text-[#202020]' : ' text-[#313131] dark:text-[#ffffffe6]'}`}>Show account suggestions on profiles</p>
                  <p className="text-xs ">Choose whether people can see similar account suggestions on your profile, and whether your account can be suggested on other profiles.</p>
                </div>
                <div className="w-[50px] md:w-fit h-full flex items-center justify-center">
                  <div onClick={() => setShow(!show)} className={`cursor-pointer relative ${theme === 'dark' ? 'bg-[#ffffff]' : (theme === 'light') ? 'bg-[#000000]' : ' bg-[#ffffff94] dark:bg-[#ffffff]'} w-[30px] h-[20px] md:w-[36px] md:h-[23px] rounded-full  flex items-center justify-center`}>
                    <div className={`${!show ? '-translate-x-1' : 'translate-x-1'} absolute w-[18px] h-[18px] md:w-[20px] md:h-[20px]  md:bottom-[1.6px] rounded-full ${theme === 'dark' ? 'bg-[black]' : (theme === 'light') ? 'bg-[#ffffff]' : ' bg-[#ffffff] dark:bg-[black]'} transition-all duration-200 ease-in-out`} />
                  </div>
                </div>
              </div>
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-[#ffffff94]' : (theme === 'light') ? 'text-[#00000090]' : ' text-[#00000090] dark:text-[#ffffff94]'} pt-7`}>Certain profile info, like your name, bio and links, is visible to everyone. <span onClick={() => navigate("/privacy-policy")} className="text-[#708dff] cursor-pointer">See what profile info is visible</span></p>
            <div className="mb-8 md:mb-0 w-full flex flex-col items-end justify-center gap-2 pt-10"><button type="submit" disabled={total >= 150 || sameData ? true : formData.bio !== '' || formData.name !== '' || formData.username !== '' || formData.gender !== '' ? false : formData.gender ? false : true} className={`px-25 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out  bg-[#0095f6] text-white ${total >= 150 || sameData ? 'opacity-40' : formData.bio === '' && formData.name === '' && formData.username === '' && formData.gender === '' ? 'opacity-40 ' : 'cursor-pointer active:scale-95'}`}> {loading ? (
              <div className="w-4 h-4 rounded-full animate-spin border-t-1 border-b-1 border-white"></div>
            ) : (
              'Submit'
            )}
            </button></div>
          </form>
          <div className="w-full hidden lg:block">
            <LoginFooter theme={theme} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
