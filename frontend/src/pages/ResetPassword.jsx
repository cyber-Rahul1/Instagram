import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OtpNavbar from "../components/OtpNavbar";
import LoginFooter from "../components/LoginFooter";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const ResetPassword = () => {
  const { identifier } = useSelector((state) => state.user)
  const [isFocused, setIsFocused] = useState(null);
  const [PassValid, setPassValid] = useState('');
  const [pass, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
  const inputRef2 = useRef(null)
  const inputBox1 = useRef(null)
  const inputBox2 = useRef(null)
  const inputRef1 = useRef(null)
  const passwordRef = useRef(null);


  //  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
  let navigate = useNavigate()

  useEffect(() => {
    if (identifier === null) {

      alert('Session expired. Please start again.');
      navigate('/forgotpassword', { replace: true });
    }
  }, [identifier, navigate]);


  /**
* Handles input field focus/interaction by animating the label
* Shrinks the label text and moves it to the top when user starts typing
* @param {React.RefObject} inputRef - Reference to the input label element
* @param {React.RefObject} boxRef - Reference to the input field element
*/
  const handleInput = (inputRef, boxRef) => {
    if (inputRef.current && boxRef.current) {
      inputRef.current.style.fontSize = '10px';
      inputRef.current.style.top = '4px';
      boxRef.current.style.paddingTop = '12px';
    }
  };

  /**
   * Handles input field blur event by resetting label animation
   * Returns the label to its original position and size when field is empty
   * @param {React.RefObject} inputRef - Reference to the input label element
   * @param {React.RefObject} boxRef - Reference to the input field element
   */
  const handleBlur = (inputRef, boxRef) => {
    if (boxRef.current?.value === '') {
      inputRef.current.style.fontSize = '';
      inputRef.current.style.top = '';
      boxRef.current.style.paddingTop = '';
    }
  };

  /**
   * Toggles password visibility for the password input field
   * Automatically hides password after 1 second for security
   */
  const handleShow = () => {
    setShow(!show)
    setTimeout(() => {
      setShow(false)
    }, 1000)
  }

  /**
  * Validates password input using regex pattern with debounced validation
  * Requires at least 6 characters with letters, numbers, and special characters
  * @param {string} value - Password input value to validate
  */
  const handlePassword = (value) => {
    setPassword(value);
    clearTimeout(passwordRef.current);


    if (value === '') {
      setPassValid("");
    } else {
      passwordRef.current = setTimeout(() => {
        const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        if (passRegex.test(value)) {
          setPassValid("true");
        } else {
          setPassValid("false");
        }

      }, 1000);
    }
  };

  const handlepass = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let result = await axios.post(`${serverUrl}/api/users/resetpassword`, {
        username: identifier,
        password: pass
      }, { withCredentials: true })
      setMessage(result.data.message)
      setLoading(false)
      navigate('/login', { replace: true })
      setPassword('')
      setConfirmPass('')
      setTimeout(() => {
        setMessage('')
      }, 3000);
    } catch (error) {
      setLoading(false)
      setMessage(error.response?.data.message)
      setTimeout(() => {
        setMessage('')
      }, 3000);
    }
  }



  return (
    <div className="relative w-full h-screen flex flex-col justify-around md:justify-start items-center bg-black pt-28 md:pt-50 z-2 overflow-x-hidden ">
      <div className='w-full h-fit fixed top-0 left-0'>
        <OtpNavbar />
      </div>
      <div className="relative w-[400px] h-[460px]  flex flex-col justify-start items-center md:border-1 border-[#363636] mt-1 px-auto md:px-12 pt-6 rounded-sm">
        <div className="flex items-center justify-center border-3 border-[#f5f5f5a1] rounded-full p-3">
          <LockClosedIcon className="h-16 w-16 text-[#f5f5f5a9] pb-1" />
        </div>
        <form className="flex flex-col justify-start items-center">
          <div>
            <p className="text-[#ffffffac] text-[17px] font-semibold mt-3 text-center mb-2">Reset your password</p>
          </div>
          <div onKeyDown={() => { handleInput(inputRef1, inputBox1); handleBlur(inputRef1, inputBox1); }} className='relative'>
            <input autoComplete="" required ref={inputBox1} onFocus={() => setIsFocused('password')} onBlur={() => { handleBlur(inputRef1, inputBox1); setIsFocused(null) }} type={show ? 'text' : 'password'} value={pass} onChange={e => handlePassword(e.target.value)} className={`${(PassValid === 'false') ? 'border-[#ff3040] border-1' : ''} w-[270px] h-[36px] border pl-3 border-[#555555] outline-none text-xs text-white bg-[#121212] rounded-[3px]`} />
            <div ref={inputRef1} onClick={() => { inputBox1.current.focus() }} className='absolute top-[9px] left-3 text-xs z-1 transition-all duration-300 ease-in-out'>
              <p className='text-[#b0abab]'>Enter New Password</p>
            </div>
            {pass?.length > 0 && <div className={`absolute flex items-center justify-center gap-2 right-3 ${PassValid === 'false' ? 'top-1' : 'top-2 '}`}>
              {(pass.length >= 5 && PassValid === 'true') ? <FaRegCircleCheck size={22} className={`${(PassValid === 'false') ? 'hidden' : ''} text-[#909090]`} /> : <RxCrossCircled size={26} className={`text-[#ff3040] pt-[2px] ${(PassValid === 'false') ? '' : 'hidden'}`} />}
              <p onClick={() => { handleShow() }} className={` cursor-pointer text-white font-semibold text-sm transition-all duration-300 ease-in-out hover:text-[#919191]`}>{show ? 'Hide' : 'Show'}</p>
            </div>}
          </div>
          {(PassValid === 'false') && <div className='flex items-center justify-center pt-1'><p className={` ${isFocused === 'password' ? 'text-[#ff3041bc]' : ''} text-[#ff3040] text-xs pb-2 `}>This password is too easy to guess. Please create<br /> a new one.</p></div>}
          <div onKeyDown={() => { handleInput(inputRef2, inputBox2); handleBlur(inputRef2, inputBox2); }} className='relative mt-2'>
            <input autoComplete="" required ref={inputBox2} onFocus={() => setIsFocused('password2')} onBlur={() => { handleBlur(inputRef2, inputBox1); setIsFocused(null) }} type={show ? 'text' : 'password'} value={confirmPass} onChange={e => setConfirmPass(e.target.value)} className={` w-[270px] h-[36px] border pl-3 border-[#555555] outline-none text-xs text-white bg-[#121212] rounded-[3px]`} />
            <div ref={inputRef2} onClick={() => { inputBox2.current.focus() }} className='absolute top-[9px] left-3 text-xs z-1 transition-all duration-300 ease-in-out'>
              <p className='text-[#b0abab]'>Confirm Password</p>
            </div>
            {(confirmPass !== pass && confirmPass.length > 0 && pass.length > 0) && <div className='flex items-start pt-1 pl-2 justify-start'><p className={` ${isFocused === 'password2' ? 'text-[#ff3041bc]' : ''} text-[#ff3040] text-xs pb-2 `}>Passwords do not match.</p></div>}
          </div>
          <button disabled={confirmPass !== pass || pass === '' || pass.length < 5} onClick={handlepass} className={`${confirmPass !== pass || pass === '' || pass.length < 5 ? 'bg-[#0069ad] text-[#aaafb3]' : 'bg-[#4a8df9]  hover:bg-[#4a5ef9b7] text-white cursor-pointer active:scale-95'
            } w-[270px] h-[34px] rounded-lg font-semibold text-sm mt-4 transition-all duration-200 flex items-center justify-center`}
          >
            {loading ? (
              <div className="w-4 h-4 border-t-1 border-b-1 border-white rounded-full animate-spin"></div>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>
        <button onClick={() => { navigate('/login', { replace: true }) }} className="w-screen sm:w-[380px] md:w-full py-3 absolute border-1 md:border-t-1 border-[#363636af] bottom-1 md:bottom-0 left-0 bg-[#121212] text-[#ffffff] hover:text-[#ffffff79] cursor-pointer transition-all duration-200 ease-in-out font-bold text-sm text-center ">Back to Login</button>

      </div>


      <div className="w-full hidden lg:block">
        <LoginFooter page={"Otp"} />
      </div>
      {message && <div className="w-full absolute bottom-0 left-0 px-5 py-4 z-5 md:block bg-[#262626]">
        <p className="text-[#ffffffd1] text-[15px]  w-full  flex items-center">{message}</p>
      </div>}
    </div>
  )
}

export default ResetPassword
