import { useEffect, useRef, useState } from "react";
import OtpNavbar from "../components/OtpNavbar";
import { LockClosedIcon } from '@heroicons/react/24/outline';
import LoginFooter from "../components/LoginFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIdentifier, setUserEmail } from "../redux/userSlice";


const ForgotPassword = () => {

  const inputRef1 = useRef(null)
  const inputBox = useRef(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [popup, setPopup] = useState(false)
  const [message, setMessage] = useState('')
  let dispatch = useDispatch();
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

  const navigate = useNavigate()


  const handleinput1 = () => {

    inputRef1.current.style.fontSize = '10px';
    inputRef1.current.style.top = '4px';
    inputBox.current.style.paddingTop = '12px';

  }

  const handleblur = () => {
    if (inputBox.current?.value === '') {
      inputRef1.current.style.fontSize = '';
      inputRef1.current.style.top = '';
      inputBox.current.style.paddingTop = '';
    }
  }

  function customMaskEmail(email) {
    const [name, domain] = email.split('@');
    const [domainName, tld] = domain.split('.');

    return `${name[0]}**@${domainName[0]}**.${tld}`;
  }
  

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let result = await axios.post(`${serverUrl}/api/auth/getotp`, {
        identifier: username
      }, { withCredentials: true })
      
      setLoading(false)
      setPopup(true)
      setUsername('')
      
      let useremail = customMaskEmail(result.data.email)
      setEmail(useremail)
     
      dispatch(setUserEmail(useremail))
      dispatch(setIdentifier(username))
      setMessage(`${result.data.message} to ${result.data.email}`)
      setTimeout(() => {
        setMessage('')
      }, 5000);
      
      if(result.status === 400){
        setMessage(result.data.message)
        setTimeout(() => {
          setMessage('')
        }, 5000);
      }
    } catch (error) {
      setLoading(false)
      setMessage(error.response?.data.message)
      setTimeout(() => {
        setMessage('')
      }, 5000);
    }

  }




  useEffect(() => {
    inputBox.current.focus()
    document.title = `Reset Password - Instagram`;
  }, [])

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-around md:justify-start items-center bg-black pt-28 md:pt-36 z-2">
      {message && <p className="text-[#ffffffd1] text-[15px]  w-full h-[40px] absolute bottom-0 left-0 px-5 py-2 z-5 md:block bg-[#262626]">{message}</p>}
     { popup && <div className="w-full h-full absolute top-0 left-0 z-5 bg-[#000000a7]"></div>}
     { popup && <div className="absolute z-10 w-[300px] md:w-[400px] h-[180px] flex flex-col justify-center items-center bg-[#262626] rounded-2xl md:px-8 top-80">
        <div className="md:w-[400px] h-[180px] relative flex flex-col justify-center w-[300px] items-center rounded-2xl md:px-8">
          <h2 className="text-white text-xl font-semibold mt-2">Email Sent</h2>
          <p className="text-[#ffffff85] text-xs md:text-sm mt-[8px] text-center leading-[18px] mb-12">We sent an email to {email} with a otp to<br className="md:hidden" /> reset your password. <br className="hidden md:block" /> get back into your account.</p>
          <button onClick={() => { setPopup(false);  navigate('/otp') }} className="absolute w-full cursor-pointer rounded-b-2xl active:bg-[#3938387f] bottom-0 left-0 flex items-center justify-center py-[12px] border-t-1 border-[#535353c2] text-blue-500 font-semibold">OK</button>
        </div>
      </div>}
      <div className='w-full h-fit fixed top-0 left-0'>
        <OtpNavbar />
      </div>

      <div className="relative flex flex-col justify-start items-center md:border-1 border-[#363636] mt-1 px-auto md:px-12 pt-6 rounded-sm">
        <div className="flex items-center justify-center border-3 border-[#f5f5f5] rounded-full p-3">
          <LockClosedIcon className="h-16 w-16 text-[#f5f5f5] pb-1" />
        </div>
        <div className="flex flex-col justify-center items-center mt-3">
          <h1 className="text-white text-md font-semibold">Trouble logging in?</h1>
          <p className="text-[#ffffffa5] text-sm mt-[8px] text-center leading-[18px]">Enter your email address, or username and<br className="md:hidden" /> we'll<br className="hidden md:block" /> send you an otp to reset your<br className="md:hidden" /> password.</p>
        </div>
        <form className='flex items-center flex-col justify-center mt-4'>
          <div onKeyDown={() => { handleinput1(); handleblur() }} className='relative'>
            <input autoComplete="email" autoCorrect="off" required ref={inputBox} onBlur={handleblur} type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={`md:w-[297px] w-[285px] h-[38px]  pl-3 border  outline-none text-xs text-white bg-[#121212] rounded-md  mb-2 ${inputBox.current?.value !== '' ? 'border-[#5f5e5e]' : 'border-[#262626]'}`} />
            <div ref={inputRef1} onClick={() => { inputBox.current.focus() }} className='absolute text-sm top-[9px] left-3 z-1 transition-all duration-300 ease-in-out'>
              <p className='text-[#b0abab9e]'>Email or Username</p>
            </div>
          </div>
          <button disabled={username === ''} onClick={handleLogin} className={`${username === '' ? 'bg-[#002d4a] text-[#aaafb379]' : 'bg-[#4a8df9] hover:bg-[#4a5ef9b7] text-white cursor-pointer active:scale-95'
            } md:w-[297px] w-[285px] h-[34px] rounded-lg font-semibold text-sm mt-2 transition-all duration-200 flex items-center justify-center`}
          >
            {loading ? (
              <div className="w-4 h-4 border-t-1 border-b-1 border-white rounded-full animate-spin"></div>
            ) : (
              'Send Otp'
            )}
          </button>
        </form>
        <div className='mt-3 flex flex-col  items-center justify-center pb-17 md:pb-32'>
          <p className="text-[#ffffff] text-xs text-center cursor-pointer active:text-[#ffffff96] transition-all duration-200 ease-in-out">Can't reset your password?</p>
          <div className='flex items-center justify-center gap-4 mt-8'>
            <hr className='w-[122px] h-[2px] bg-[#55555574] ' />
            <p className='text-[#ffffffa5] text-xs '>OR</p>
            <hr className='w-[122px] h-[2px] bg-[#55555574]' />
          </div>
          <p onClick={() => { navigate('/signup') }} className="text-[#ffffff] hover:text-[#ffffff79] cursor-pointer transition-all duration-200 ease-in-out font-bold text-sm text-center mt-4">Create new account</p>

        </div>
        <button onClick={() => { navigate('/login') }} className="w-screen sm:w-[380px] md:w-full py-3 md:absolute border-1 md:border-t-1 border-[#363636af] bottom-0 left-0 bg-[#121212] text-[#ffffff] hover:text-[#ffffff79] cursor-pointer transition-all duration-200 ease-in-out font-bold text-sm text-center mt-3">Back to Login</button>

      </div>
      <div className="w-full hidden lg:block">
        <LoginFooter page="forgotPassword" />
      </div>

    </div>
  )
}

export default ForgotPassword
