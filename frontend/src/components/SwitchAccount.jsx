import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { ServerContext, ThemeContext } from '../context/ContextProvider';



const SwitchAccount = ({ setSwitchAccount }) => {



    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const inputBox = useRef(null)
    const inputBox1 = useRef(null)
    const [username, setUsername] = useState('')
    const [pass, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('')
    const { setPage } = useContext(ServerContext)






    let dispatch = useDispatch();

    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext);
    const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";







    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            let result = await axios.post(`${serverUrl}/api/auth/login`, {
                identifier: username,
                password: pass
            }, { withCredentials: true });
            
            localStorage.setItem('token', result.data.jwt);
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
        if (pass === '') {
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


    const handleinput = (inputRef, inputBox) => {
        inputRef.current.style.fontSize = '10px';
        inputRef.current.style.top = '4px';
        inputBox.current.style.paddingTop = '12px';
    }


    const handleblur = (inputRef, inputBox) => {
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

    return (
        <div onClick={(e) => { e.stopPropagation() }} className={`w-[94vw] md:w-fit h-[400px] md:h-fit relative rounded-2xl flex flex-col items-center z-50 justify-center px-17 pt-25 ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#262626]'}`}>
            <div onClick={() => { setSwitchAccount(false) }} className='absolute top-5 right-5 cursor-pointer'>
                <RxCross2 size={24} className={`${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`} />
            </div>
            <h1 className={`heading text-5xl tracking-tight font-medium  mb-8 md:mb-8 ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Instagram</h1>
            <form className='flex items-center flex-col justify-center mt-4'>
                <div onKeyDown={() => { handleinput(inputRef1, inputBox); handleblur(inputRef1, inputBox) }} className='relative z-10'>
                    <input autoComplete="email" autoCorrect="off" required ref={inputBox} onBlur={() => handleblur(inputRef1, inputBox)} type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={`w-[270px] h-[36px]  pl-3 border z-5  outline-none text-xs   rounded-sm  mb-2  ${theme === 'dark' ? 'border-[#555555] text-gray-300' : (theme === 'light') ? ' border-[#dbdbdb] text-[#000000d6]' : ' border-[#dbdbdb] dark:border-[#555555]  dark:text-gray-300 text-[#000000d6]'}`} />
                    <div className={`absolute top-0 left-0 w-[270px] h-[36px]  ${theme === ' dark' ? 'bg-[#1a1a1a]' : (theme === 'light') ? 'bg-[#f5f5f5]' : ' bg-[#f5f5f5] dark:bg-[#1a1a1a]'} -z-10 rounded-sm`} />
                    <div ref={inputRef1} onClick={() => { inputBox.current.focus() }} className={`absolute top-[10px] sm:top-[9px]  left-3 text-xs -z-1  transition-all duration-300 ease-in-out `}>
                        <p className={` ${theme === 'dark' ? 'text-[#b0abab]' : (theme === 'light') ? 'text-[#938e8e]' : ' dark:text-[#b0abab] text-[#938e8e]'}`}>Username or email</p>
                    </div>
                </div>
                <div onKeyDown={() => { handleinput(inputRef2, inputBox1); handleblur(inputRef2, inputBox1); }} className='relative z-10'>
                    <input autoComplete="current-password" autoCorrect="off" required ref={inputBox1} onBlur={() => handleblur(inputRef2, inputBox1)} type={show ? 'text' : 'password'} value={pass} onChange={(e) => setPassword(e.target.value)} className={`w-[270px] z-5 h-[36px] border pl-3  ${theme === 'dark' ? 'border-[#555555] text-gray-300' : (theme === 'light') ? ' border-[#dbdbdb] text-[#000000d6]' : ' border-[#dbdbdb] dark:border-[#555555] dark:text-gray-300 text-[#000000d6]'} outline-none text-xs rounded-sm `} />
                    <div className={`absolute top-0 left-0 w-[270px] h-[36px]  ${theme === ' dark' ? 'bg-[#1a1a1a]' : (theme === 'light') ? 'bg-[#f5f5f5]' : ' bg-[#f5f5f5] dark:bg-[#1a1a1a]'}  -z-10 rounded-sm`} />
                    <div ref={inputRef2} onClick={() => { inputBox1.current.focus() }} className={`absolute top-[10px] sm:top-[9px]  left-3 text-xs -z-1 transition-all duration-300 ease-in-out`}>
                        <p className='dark:text-[#b0abab] text-[#938e8e]'>Password</p>
                    </div>
                    {pass.length > 0 && <div className='absolute top-2 right-3 cursor-pointer'>
                        <p onClick={() => { handleShow() }} className={`${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} font-semibold text-sm transition-all duration-300 ease-in-out hover:text-[#919191]`}>{show ? 'Hide' : 'Show'}</p>
                    </div>}
                </div>
                
                <button disabled={username === '' || pass === '' || pass.length < 5} onClick={handleLogin} className={`${username === '' || pass.length < 5 ? 'bg-[#4cb5f9] text-[#f6fbff]' : 'bg-[#4a8df9] hover:bg-[#4a5ef9b7] text-white cursor-pointer active:scale-95'
                    } w-[270px] h-[34px] rounded-lg font-semibold text-sm mt-6 transition-all duration-200 flex items-center justify-center`}
                >
                    {loading ? (
                        <div className="w-4 h-4 border-t-1 border-b-1 border-white rounded-full animate-spin"></div>
                    ) : (
                        'Log in'
                    )}
                </button>

                <div className='flex flex-col  items-center justify-center mt-1 gap-5 md:gap-13 pb-10'>
                    <p onClick={() => { navigate('/forgotpassword'); setSwitchAccount(false) }} className={`${theme === 'dark' ? 'text-[#ffffffa5]' : (theme === 'light') ? 'text-[black] hover:text-[#7b7474b2] font-medium' : ' text-[#3d3c3c] dark:text-[#ffffffa5] dark:hover:text-[#ffffff79] font-medium dark:font-normal'}   text-sm mt-4 cursor-pointer    transition-all duration-200 ease-in-out`}>Forgot password?</p>
                    {(status === 400 || status === 500) && (
                        <p className="text-red-400 text-center text-sm   md:block">
                            Sorry, your password was incorrect. Please<br /> double-check your password.
                        </p>
                    )}
                    
                </div>
            </form>
        </div>
    )
}

export default SwitchAccount
