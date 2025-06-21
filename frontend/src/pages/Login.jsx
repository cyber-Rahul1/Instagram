import { useContext, useEffect, useRef, useState } from 'react'
import instalogin from '../assets/instagram-login.png'
import { FaFacebook } from "react-icons/fa";
import LoginFooter from '../components/LoginFooter';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/Firebase';
import { ServerContext } from '../context/ContextProvider';








const Login = () => {
  const inputRef1 = useRef(null)
  const inputRef2 = useRef(null)
  const inputBox = useRef(null)
  const inputBox1 = useRef(null)
  const [username, setUsername] = useState('')
  const [pass, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const {setPage} = useContext(ServerContext)

 


  
 
  let dispatch = useDispatch();

  const navigate = useNavigate()
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";



  



 const handleLogin = async (e) => {
   e.preventDefault()
   setLoading(true)
   try {
     let result = await axios.post(`${serverUrl}/api/auth/login`,{
       identifier: username,
       password: pass
     }, { withCredentials: true });

     setStatus(result.status)
     dispatch(setUserData(result.data));
     setUsername('')
     setPassword('')
     setLoading(false)
     setPage('')
     navigate('/')

 
   } catch (error) {
     
     setLoading(false)
     setStatus(error?.response?.status);
   }
 }



  useEffect(() => {
    inputBox.current.focus()
    setStatus('')
    document.title = `Login - Instagram`; 
    setPage('login')

  }, [])

  useEffect(() => {
    if (pass === '' ) {
      inputRef2.current.style.fontSize = '';
      inputRef2.current.style.top = '';
      inputBox1.current.style.paddingTop = '';
    }
    if (username === '') {
      inputRef1.current.style.fontSize = '';
      inputRef1.current.style.top = '';
      inputBox.current.style.paddingTop = '';
    }
  }, [pass, username]);
 

  const handleinput = ( inputRef, inputBox) => {
    inputRef.current.style.fontSize = '10px';
    inputRef.current.style.top = '4px';
    inputBox.current.style.paddingTop = '12px';
  }


  const handleblur = ( inputRef, inputBox ) => {
    if (inputBox.current.value === '') {
      inputRef.current.style.fontSize = '';
      inputRef.current.style.top = '';
      inputBox.current.style.paddingTop = '';
    }
  }

  const handleShow = () => {
    setShow(!show)
    setTimeout(() => {
      setShow(false)
    }, 1000)
  }

  const handleFacebookLogin = async () => {
    setLoading(true)
    try {
      let response = await signInWithPopup(auth, provider);
      let name = response.user.displayName;
      let email = response.user.email;

      let result = await axios.post(`${serverUrl}/api/auth/googlelogin`, {
        name,
        email
      }, { withCredentials: true });
      setLoading(false)
      setStatus(result.status)
      setPage('')
      navigate('/')
    } catch (error) {
      setLoading(false)
      setStatus(error?.response?.status);
    }
  }

  


  return (
    <div className='w-full h-screen flex flex-col justify-around md:justify-start items-center dark:bg-black pt-14 lg:pt-22'>
      
      <div className='w-full h-fit flex flex-col'>
        <div className='flex justify-center items-center'>
          <div className='hidden lg:block w-fit h-fit'>
            <img src={instalogin} alt=" instagram login " className='w-[32vw]' />
          </div>
          <div className='lg:w-[20vw] h-[48vh] flex flex-col  items-center rounded-xl'>
            <h1 className='heading text-5xl tracking-tight font-medium text-[#262626] dark:text-gray-100  mb-8 md:mb-8'>Instagram</h1>
            <form className='flex items-center flex-col justify-center mt-4'>
              <div onKeyDown={() => { handleinput(inputRef1, inputBox); handleblur(inputRef1, inputBox) }} className='relative z-0'>
                <input autoComplete="email" autoCorrect="off" required ref={inputBox} onBlur={() => handleblur(inputRef1, inputBox)} type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='w-[270px] h-[36px]  pl-3 border z-10 border-[#dbdbdb] dark:border-[#555555] outline-none text-xs dark:text-gray-300 text-[#000000d6] bg-[#fafafa] dark:bg-[#121212] rounded-sm  mb-2' />
                <div ref={inputRef1} onClick={() => { inputBox.current.focus() }} className='absolute top-[9px] left-3 text-xs z-0 transition-all duration-300 ease-in-out'>
                  <p className='dark:text-[#b0abab] text-[#938e8e]'>Username or email</p>
                </div>
              </div>
              <div onKeyDown={() => { handleinput(inputRef2, inputBox1); handleblur(inputRef2, inputBox1); }} className='relative z-0'>
                <input autoComplete="current-password" autoCorrect="off" required ref={inputBox1} onBlur={() => handleblur(inputRef2, inputBox1)} type={show ? 'text' : 'password'} value={pass} onChange={(e) => setPassword(e.target.value)} className='w-[270px] z-10 h-[36px] border pl-3 border-[#dbdbdb] dark:border-[#555555] outline-none text-xs dark:text-gray-300 text-[#000000d6] bg-[#fafafa] dark:bg-[#121212]  rounded-sm ' />
                <div ref={inputRef2} onClick={() => { inputBox1.current.focus() }} className='absolute top-[9px] left-3 text-xs z-0 transition-all duration-300 ease-in-out'>
                  <p className='dark:text-[#b0abab] text-[#938e8e]'>Password</p>
                </div>
                {pass.length > 0 && <div className='absolute top-2 right-3 cursor-pointer'>
                  <p onClick={() => { handleShow() }} className='text-white font-semibold text-sm transition-all duration-300 ease-in-out hover:text-[#919191]'>{show ? 'Hide' : 'Show'}</p>
                </div>}
              </div>
              <button disabled={username === '' || pass === '' || pass.length < 5} onClick={handleLogin} className={`${username === '' || pass.length < 5 ? 'bg-[#4cb5f9] text-[#f6fbff]' : 'bg-[#4a8df9] hover:bg-[#4a5ef9b7] text-white cursor-pointer active:scale-95'
                } w-[270px] h-[34px] rounded-lg font-semibold text-sm mt-4 transition-all duration-200 flex items-center justify-center`}
              >
                {loading ? (
                  <div className="w-4 h-4 border-t-1 border-b-1 border-white rounded-full animate-spin"></div>
                ) : (
                  'Log in'
                )}
              </button>

              <div className='flex items-center justify-center gap-4 mt-4'>
                <hr className='w-[110px] dark:h-[2px] h-[1px] border-none bg-[#737c8a6f] dark:bg-[#55555574] ' />
                <p className='dark:text-[#ffffffa5] text-[#737c8add] text-[13px] dark:font-normal font-semibold'>OR</p>
                <hr className='w-[110px] dark:h-[2px] h-[1px] border-none bg-[#737c8a6f] dark:bg-[#55555574]' />
              </div>
              <div onClick={handleFacebookLogin} className='flex items-center justify-center gap-2 mt-7'>
                <FaFacebook color='#2d6dd6' className='text-[21px]' />
                <p className='text-[#2d6dd6] text-[14px] font-semibold cursor-pointer '>Log in with Facebook</p>
              </div>



              <div className='flex flex-col  items-center justify-center mt-1 gap-5 md:gap-13 pb-10'>
                <p onClick={() => { navigate('/forgotpassword') }} className='text-[#3d3c3c] font-semibold dark:font-normal dark:text-[#ffffffa5] text-sm mt-4 cursor-pointer hover:text-[#7b7474b2]  dark:hover:text-[#ffffff79] transition-all duration-200 ease-in-out'>Forgot password?</p>
                {(status === 400 || status === 500) && (
                  <p className="text-red-400 text-center text-sm mt-1  md:block">
                    Sorry, your password was incorrect. Please<br /> double-check your password.
                  </p>
                )}
                <p onClick={() => { navigate('/signup') }} className={`dark:text-[#fffffff4]  text-sm md:mb-30  cursor-pointer`}>Don't have an account? <span className='dark:text-[#2d65d6] text-[14px] font-bold cursor-pointer text-[#4e7edc]'>Sign up</span></p>
              </div>
            </form>

          </div>

        </div >
      </div>
      <LoginFooter page={'login'}/>
    </div>
  )
}

export default Login
