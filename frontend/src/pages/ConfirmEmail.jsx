import { useNavigate } from 'react-router-dom'
import email from '../assets/email.png'
import LoginFooter from '../components/LoginFooter'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'




const ConfirmEmail = () => {

  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

  let navigate = useNavigate()
  const { userCredentials } = useSelector((state) => state.user)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let result = await axios.post(`${serverUrl}/api/auth/checkotp`, {
        otp: code
      }, { withCredentials: true })
      setMessage(result.data.message)

      setTimeout(() => {
        setMessage('')
      }, 2000);
      let result2 = await axios.post(`${serverUrl}/api/auth/register`, {
        email: userCredentials.email,
        password: userCredentials.password,
        name: userCredentials?.name,
        username: userCredentials.username
      }, { withCredentials: true })

      setMessage(result2.data.message)
      setTimeout(() => {
        setMessage('')
      }, 3000);
      setLoading(false)
      navigate('/', { replace: true })
    } catch (error) {
      setLoading(false)
      setMessage(error.response.data.message)
      setTimeout(() => {
        setMessage('')
      }, 5000);
    }
  }

  const handleResend = async () => {
    setError(false)
    setLoading(true)
    try {
      let result = await axios.post(`${serverUrl}/api/auth/confirmemail`, {
        email: userCredentials.email
      }, { withCredentials: true })
      if (result.status === 400) {
        setError(true)
        setMessage(result.data.message)
      }
      console.log(result.data)
      setMessage(`${result.data.message} to ${userCredentials.email}`)
      setTimeout(() => {
        setMessage('')
      }, 5000);
      setLoading(false)


    } catch (error) {
      setMessage(error.response?.data.message)
      setLoading(false)
      setTimeout(() => {
        setMessage('')
      }, 5000);

    }
  }

  useEffect(() => {
    if (!userCredentials || Object.keys(userCredentials).length === 0) {
      navigate('/login', { replace: true });
    }
  }, [userCredentials, navigate]);


  return (
    <div className="relative w-full min-h-screen flex flex-col justify-around md:justify-start items-center bg-white dark:bg-black pt-25 md:pt-22 z-2 ">
      {message && <p className="text-gray-800 dark:text-[#ffffffd1] text-[15px]  w-full absolute bottom-0 left-0 px-5 py-2 z-5 md:block bg-gray-200 dark:bg-[#262626]">{message}</p>}
      <div className='w-fit h-fit flex flex-col'>
        <div className='flex flex-col justify-start items-center md:border-1 border-gray-300 dark:border-[#363636] md:px-10 pt-2'>
          <div className='flex justify-center items-center w-[180px] '>
            <img src={email} alt="birthday" className='object-cover w-full h-full pr-2' />
          </div>
          <p className='text-gray-900 dark:text-[#ffffff] text-sm font-semibold mt-2'>Enter Confirmation Code</p>
          <p className='text-gray-700 dark:text-[#ffffffd7] text-sm mt-[15px] text-center leading-[18px]'>Enter the confirmation code we sent to<br /> {userCredentials.email} <span onClick={handleResend} className='text-[#49aaf9] hover:text-[#a4bcd0] cursor-pointer font-semibold'>Resend Code</span> </p>
          <form>
            <div className='flex gap-2 pt-6'>
              <input value={code} onChange={(e) => setCode(e.target.value)} type="text" placeholder='Confirmation Code' className='w-[270px] h-[38px]  pl-3 border border-gray-400 dark:border-[#55555593]  focus:border-gray-500 dark:focus:border-[#555555] outline-none text-sm text-gray-900 dark:text-white bg-white dark:bg-[#121212] rounded-sm  mb-2' />
            </div>
            <button onClick={handleSubmit} disabled={code.length !== 4 || code === ''} className={`${code.length !== 4 || code === '' ? 'opacity-50 ' : 'hover:bg-[#4a5ef9b7] active:scale-95'} w-[270px] h-[34px] rounded-lg font-semibold text-sm mt-2 transition-all duration-200 flex items-center justify-center bg-[#4a8df9]  text-white cursor-pointer `}>
              {loading ? (
                <div className="w-4 h-4 border-t-1 border-b-1 border-white rounded-full animate-spin"></div>
              ) : (
                'Next'
              )}
            </button>
          </form>
          <button onClick={() => { navigate('/signup') }} className=' rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center hover:text-[#4a5ef9b7] text-[#007fce]  cursor-pointer active:scale-95 mb-6 mt-4'>Go back</button>
          {error && <p className='text-[#f81c1c] text-sm text-center '>That code isn't valid. You can request a<br /> new one.</p>}
        </div>
        {/* Login redirect section - Link to login page for existing users */}
        <div onClick={() => { navigate('/login') }} className='md:border-1 border-gray-300 dark:border-[#363636] flex flex-col items-center justify-center mb-15 py-6 bg-white dark:bg-black w-full md:w-fit md:px-[121px] mt-[10px] '>
          <p className='text-gray-700 dark:text-[#ffffffe9] text-sm text-center leading-3'>Have an account? <br /><span className='text-[#007fce] cursor-pointer font-semibold text-sm'>Log in</span> </p>
        </div>
      </div>
      <LoginFooter page="email" />
    </div>
  )
}

export default ConfirmEmail
