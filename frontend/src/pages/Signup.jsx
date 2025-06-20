
import { useEffect, useRef, useState } from "react";
import { BiLogoFacebookSquare } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCircleCheck } from "react-icons/fa6";
import LoginFooter from "../components/LoginFooter";
import { AiOutlineReload } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../redux/userSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/Firebase";






const Signup = () => {


  const inputRef1 = useRef(null)
  const inputRef2 = useRef(null)
  const inputRef3 = useRef(null)
  const inputRef4 = useRef(null)
  const inputBox = useRef(null)
  const inputBox1 = useRef(null)
  const inputBox3 = useRef(null)
  const inputBox2 = useRef(null)
  const [username, setUsername] = useState('')
  const [pass, setPassword] = useState('')
  const [randomuser, setRandomUser] = useState([])
  const [show, setShow] = useState(false)
  const [available, setAvailable] = useState(true)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [valid, setValid] = useState('');
  const [isFocused, setIsFocused] = useState(null);
  const [PassValid, setPassValid] = useState('');
  const [same, setSame] = useState('')
  const [loading, setLoading] = useState(false)
  const serverUrl = import.meta.env.VITE_SERVER_URL
  const navigate = useNavigate()
  const timerRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  let dispatch = useDispatch();



  const resetInputStyle = (inputRef, boxRef) => {
    if (inputRef.current && boxRef.current) {
      inputRef.current.style.fontSize = '';
      inputRef.current.style.top = '';
      boxRef.current.style.paddingTop = '';
    }
  };


  useEffect(() => {
    const inputFields = [
      { value: email, inputRef: inputRef1, boxRef: inputBox },
      { value: pass, inputRef: inputRef2, boxRef: inputBox1 },
      { value: name, inputRef: inputRef3, boxRef: inputBox2 },
      { value: username, inputRef: inputRef4, boxRef: inputBox3 },
    ];

    inputFields.forEach(({ value, inputRef, boxRef }) => {
      if (value === '') {
        resetInputStyle(inputRef, boxRef);
      }
    });
  }, [email, pass, name, username]);





  useEffect(() => {
    inputBox.current.focus()
    document.title = `Sign up - Instagram`;

  }, [])

  /**
   * Handles the signup form submission
   * Sends user registration data to the server and navigates to home page on success
   * @param {Event} e - Form submission event
   */
  const handleSignup = async (e) => {
    e.preventDefault()
    // setLoading(true)
    // try {
    //   let result = await axios.post(`${serverUrl}/api/auth/register`, {
    //     username,
    //     email,
    //     password: pass,
    //     name
    //   }, { withCredentials: true })
    //   dispatch(setUserData(result.data));
    //   setLoading(false)
    //   navigate('/')
    //   setEmail('')
    //   setPassword('')
    //   setName('')
    //   setUsername('')
    // } catch (error) {
    //   error.response.status === 400 && setAvailable(false)
    //   setLoading(false)
    // }
    dispatch(setUserCredentials({
      username,
      email,
      password: pass,
      name
    }))
    navigate('/signup/birthday');

  }





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
   * Validates email input using regex pattern with debounced validation
   * Sets email state and validates format after 1.5 second delay
   * @param {string} value - Email input value to validate
   */
  const validateEmail = (value) => {
    setEmail(value);
    clearTimeout(timerRef.current);
    

    if (value === '') {
      setValid("")
    } else {
      timerRef.current = setTimeout(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
          setValid("true");
        } else {
          setValid("false");
        }
        
      }, 1000);
    }
  };

  /**
   * Validates password input using regex pattern with debounced validation
   * Requires at least 6 characters with letters, numbers, and special characters
   * @param {string} value - Password input value to validate
   */
  const handlePassword = (value) => {
    setPassword(value);
    clearTimeout(passwordRef.current);
    let name = email.split('@')[0];
    if(value.includes(name)){
      setSame('true')
      return
    }else{
      setSame('false')
    }


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


  /**
   * Handles username input changes with validation and suggestions
   * Converts to lowercase, limits to 15 characters, and triggers availability check
   * @param {Event} e - Input change event
   */
  const handleUsername = async (e) => {
    const value = e.target.value.toLowerCase().slice(0, 15);
    setUsername(value);
    clearTimeout(usernameRef.current);
    if (!username) {
      setAvailable(true)
    }
    if (value === '') {
      setAvailable(true)
    }

    handleSuggestions(value)

    handleName(value)

  };

  /**
   * Generates alternative username suggestions when username is unavailable
   * Creates two suggestions by appending random 3-digit and 4-digit numbers
   * @param {string} value - Base username to generate suggestions from
   */
  const handleSuggestions = (value) => {
    const threeDigit = Math.floor(100 + Math.random() * 900);
    const fourDigit = Math.floor(1000 + Math.random() * 9000);

    let first = value + threeDigit;
    let second = value + fourDigit;



    setRandomUser([first, second])
  }


  /**
   * Checks username availability with the server after a 700ms delay
   * Makes API call to verify if username is already taken
   * @param {string} value - Username to check availability for
   */
  const handleName = (value) => {

    usernameRef.current = setTimeout(async () => {
      if (value.length > 0) {
        try {
          let useravailable = await axios.post(`${serverUrl}/api/auth/checkusername`, { username: value });
          
          if (useravailable.status === 400) {
            setAvailable(false)
          } else {
            setAvailable(true)
          }

        } catch (error) {
          error.response.status === 400 && setAvailable(false)
         
        }

      }
    }, 700);

  }


  useEffect(() => {
    setAvailable(true)
  }, [])



  useEffect(() => {
    const fetchData = async () => {
      const value = username?.toLowerCase().slice(0, 15);

      try {
        let useravailable = await axios.post(`${serverUrl}/api/auth/checkusername`, { username: value });
       
        if (useravailable.status === 400) {
          setAvailable(false)
        } else {
          setAvailable(true)
        }

      } catch (error) {
        error.response.status === 400 && setAvailable(false)
      }
    }

    fetchData()


  }, [username, serverUrl]);




  const handleFacebookLogin = async () => {
    setLoading(true)
    try {
      let response = await signInWithPopup(auth, provider);
      let name = response.user.displayName;
      let email = response.user.email;

      await axios.post(`${serverUrl}/api/auth/googlelogin`, {
        name,
        email
      }, { withCredentials: true });
      setLoading(false)
      
      setEmail('')
      setPassword('')
      setName('')
      setUsername('')
      navigate('/')
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }









  return (
    /* Main page container - Full screen background with centered content */
    <div className='w-full min-h-screen flex flex-col justify-center md:justify-start items-center bg-black pt-2 md:pt-4'>

      {/* Main signup form container - Contains Instagram logo, form fields, and signup button */}
      <div className='flex flex-col justify-center items-center md:border-1 border-[#363636] px-auto p-10 pt-10 '>
        <h1 className='heading text-5xl tracking-tight font-medium text-gray-100 mb-5 pt-2'>Instagram</h1>

        <p className='text-[#c5c1bcc4] text-[16px] font-semibold mb-2 text-center leading-5'>Sign up to see photos and videos<br /> from your friends.</p>
        <button onClick={handleFacebookLogin} className="flex items-end px-12 py-[6px] rounded-lg gap-2 bg-[#0095f6] text-[#fffafd] font-semibold text-sm mt-2 transition-all duration-200 ease-in-out hover:bg-[#2d6dd6b7] active:scale-95 cursor-pointer"><BiLogoFacebookSquare size={22} /><p >Log in with Facebook</p></button>

        {/* OR divider section - Visual separator between Facebook login and form fields */}
        <form className='flex items-center flex-col justify-center '>
          <div className='flex items-center justify-center gap-4 mt-4'>
            <hr className='w-[108px] h-[2px] bg-[#55555574] ' />
            <p className='text-[#ffffffa5] text-[13px] '>OR</p>
            <hr className='w-[108px] h-[2px] bg-[#55555574]' />
          </div>

          {/* Form input fields container - Contains all signup form inputs (email, password, name, username) */}
          <div className="flex flex-col pt-4 gap-2">

            {/* Email input field with validation */}
            <div onKeyDown={() => {handleInput(inputRef1, inputBox); handleBlur(inputRef1, inputBox);}} className='relative'>
              <input autoComplete="" required ref={inputBox} onFocus={() => setIsFocused('email')} onBlur={() => {handleBlur(inputRef1, inputBox); setIsFocused(null)} } type="email" value={email} onChange={(e) => validateEmail(e.target.value)} className={`${(valid === 'false') ? 'border-[#ff3040] border-1' : ''} w-[270px] h-[36px]  pl-3 border border-[#555555] outline-none text-xs text-gray-300 bg-[#121212] rounded-[3px]  `} />
              <div ref={inputRef1} onClick={() => { inputBox.current.focus() }} className='absolute top-[9px] left-3 text-xs z-1  transition-all duration-300 ease-in-out'>
                <div className='flex gap-41 justify-center '>
                  <p className='text-[#b0abab]'>Email Address</p>
                  {(valid === 'false') && <RxCrossCircled size={26} className={`text-[#ff3040] pt-[2px] ${(valid === 'false') ? '' : 'hidden'}`} />}
                </div>
              </div>
              {(valid === 'true' && email?.length > 4) && <div className='absolute flex items-center justify-center gap-2 top-2 right-3 '>
                <FaRegCircleCheck size={22} className={`${(valid === 'false') ? 'hidden' : 'text-[#909090]'}`} />
              </div>}
              {(valid === 'false') && <div className='flex items-center pl-2 pt-1'><p className={`${isFocused === 'email' ? 'text-[#ff3041bc]' : ''} text-[#ff3040]  text-xs pt-1 pb-2 px-auto md:px-2`}>Enter a valid email address.</p></div>}
            </div>

            {/* Password input field with show/hide toggle and validation */}
            <div onKeyDown={() => {handleInput(inputRef2, inputBox1); handleBlur(inputRef2, inputBox1);} } className='relative'>
              <input autoComplete="" required ref={inputBox1} onFocus={() => setIsFocused('password')} onBlur={() => {handleBlur(inputRef2, inputBox1); setIsFocused(null)}} type={show ? 'text' : 'password'} value={pass} onChange={e => handlePassword(e.target.value)} className={`${(PassValid === 'false') || (same === 'true') ? 'border-[#ff3040] border-1' : ''} w-[270px] h-[36px] border pl-3 border-[#555555] outline-none text-xs text-white bg-[#121212] rounded-[3px]`} />
              <div ref={inputRef2} onClick={() => { inputBox1.current.focus() }} className='absolute top-[9px] left-3 text-xs z-1 transition-all duration-300 ease-in-out'>
                <p className='text-[#b0abab]'>Password</p>
              </div>
              {pass?.length > 0 && <div className={`absolute flex items-center justify-center gap-2 right-3 ${PassValid === 'false' ? 'top-1' : 'top-2 '}`}>
                {(pass.length >= 5 && PassValid === 'true') ? <FaRegCircleCheck size={22} className={`${(PassValid === 'false') ? 'hidden' : ''} text-[#909090]`}/> : <RxCrossCircled size={26} className={`text-[#ff3040] pt-[2px] ${(PassValid === 'false' ) ? '' : 'hidden'}`} />}
                <p onClick={() => { handleShow() }} className={` cursor-pointer text-white font-semibold text-sm transition-all duration-300 ease-in-out hover:text-[#919191]`}>{show ? 'Hide' : 'Show'}</p>
              </div>}
            </div>
            {(same === 'true') && <div className='flex items-center justify-start pl-2'><p className={` ${isFocused === 'password' ? 'text-[#ff3041bc]' : ''} text-[#ff3040] text-xs pb-2 `}> Password should not contain your email.</p></div>}
            {(PassValid === 'false') && <div className='flex items-center justify-center'><p className={` ${isFocused === 'password' ? 'text-[#ff3041bc]' : ''} text-[#ff3040] text-xs pb-2 `}>This password is too easy to guess. Please create<br /> a new one.</p></div>}

            {/* Full name input field */}
            <div onKeyDown={() => {handleInput(inputRef3, inputBox2); handleBlur(inputRef3, inputBox2);}} className='relative'>
              <input autoComplete="" ref={inputBox2} onFocus={() => setIsFocused('name')} onBlur={() => handleBlur(inputRef3, inputBox2)} type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-[270px] h-[36px]  pl-3 border border-[#555555] outline-none text-xs text-white bg-[#121212] rounded-[3px] ' />
              <div ref={inputRef3} onClick={() => { inputBox2.current.focus() }} className='absolute top-[9px] left-3 text-xs z-1 transition-all duration-300 ease-in-out'>
                <p className='text-[#b0abab]'>Full Name</p>
              </div>
              {name?.length >= 3 && <div className='absolute flex items-center justify-center gap-2 top-2 right-3 '>
                <FaRegCircleCheck size={22} className="text-[#909090]" />
              </div>}
            </div>

            {/* Username input field */}
            <div onKeyDown={() => {handleInput(inputRef4, inputBox3); handleBlur(inputRef4, inputBox3);}} className='relative'>
              <input autoComplete="" required ref={inputBox3} onFocus={() => setIsFocused('username')} onBlur={() => {handleBlur(inputRef4, inputBox3); setIsFocused(null)}} type="text" value={username} onChange={handleUsername} className={`${!available ? 'border-[#ff3040] border-1' : ''} w-[270px] h-[36px]  pl-3 border border-[#555555] outline-none text-xs text-white bg-[#121212] rounded-[3px]`} />
              <div ref={inputRef4} onClick={() => { inputBox3.current.focus() }} className={`absolute top-[9px] left-3 text-xs z-1 transition-all duration-300 ease-in-out`}>
                <p className='text-[#b0abab]'>Username</p>
              </div>
              <div className={`absolute flex items-center justify-center gap-1 right-3 ${!available ? 'top-1' : 'top-2 '}`}>
                {(available && username?.length >= 3) && <FaRegCircleCheck size={22} className={`text-[#909090] ${!available ? 'hidden' : ''}`} />}
                {(!available && username?.length >= 3) && <RxCrossCircled size={26} className={"text-[#ff3040] pt-[2px]"} />}
                {(!available && username?.length >= 3) && <AiOutlineReload onClick={() => { handleSuggestions(username); setUsername(randomuser[0]) }} size={26} className="text-[#4492d8] cursor-pointer active:scale-95 pt-[2px]" />}

              </div>
            </div>

            {!available && <p className={`text-[#ff3040]  text-xs pb-1 px-2 ${isFocused === 'username' ? 'text-[#ff3041bc]' : ''}`}>This username isn't available. Please try another.</p>}
            <div className={`flex  justify-start items-center  ${username?.length <= 8 ? '' : 'gap-3 items-start flex-col'}`}>
              {!available && randomuser.map((item, index) => (
                <div key={index} className={`flex ${item.length <= 9 ? 'gap-2' : 'gap-0 flex-col'} pb-1`}>
                  <p key={index} className="text-[#ffffff]  text-xs py-1 px-2">{index === 0 ? 'Try:  ' : ''}<span onClick={() => { setUsername(item); }} className={`${index === 0 && username?.length <= 8 ? 'ml-8' : 'ml-5'} text-[white] rounded-lg bg-[#474545] px-4 py-2 text-md font-semibold cursor-pointer ${(username?.length > 8 && index !== 0) ? 'ml-10' : ''}`}>{item}</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* Terms and privacy policy text section */}
          <div>
            <p className='text-[#ffffffa5] text-xs mt-1 text-center'>People who use our service may have uploaded<br /> your contact information to Instagram. <span className='text-[#708dff] cursor-pointer'>Learn<br /> More</span></p>
            <p className='text-[#ffffffa5] text-xs mt-4 text-center'>By signing up, you agree to our <span className='text-[#708dff] cursor-pointer'>Terms</span> , <span className='text-[#708dff] cursor-pointer'> Privacy<br /> Policy</span > and <span className='text-[#708dff] cursor-pointer'>Cookies Policy</span> .</p>
          </div>
          <button disabled={username === '' || pass === '' || email === '' || PassValid === 'false' || valid === 'false' || !available || name === '' || same === 'true' } onClick={handleSignup} className={`${username === '' || email === '' || pass?.length < 5 || !PassValid || !valid || !available || name === '' || same === 'true' ? 'bg-[#0069ad] text-[#aaafb3]' : 'bg-[#4a8df9] hover:bg-[#4a5ef9b7] text-white active:scale-95'
            } w-[270px] h-[34px] cursor-pointer rounded-lg font-semibold text-sm mt-4 transition-all duration-200 flex items-center justify-center`}
          >
            {loading ? (
              <div className="w-4 h-4 border-t-1 border-b-1 border-white rounded-full animate-spin "></div>
            ) : (
              'Sign up'
            )}
          </button>
        </form>
      </div>

      {/* Login redirect section - Link to login page for existing users */}
      <div className='md:border-1 border-[#363636] flex flex-col items-center justify-center py-6 bg-black w-full md:w-fit md:px-[121px] mt-[10px] '>
        <p onClick={() => { navigate('/login') }} className='text-[#ffffffe9] text-sm text-center leading-3'>Have an account? <br /><span className='text-[#007fce] cursor-pointer font-semibold text-sm'>Log in</span> </p>
      </div>
      <LoginFooter page="signUp" />
    </div>
  )
}

export default Signup
