import { LockClosedIcon } from "@heroicons/react/24/outline"
import OtpNavbar from "../components/OtpNavbar"
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginFooter from "../components/LoginFooter";



const EnterOtp = () => {

  const inputRefs = [useRef(), useRef(), useRef(), useRef()]
  const letters = ['', '', '', '']
  const [otp, setOtp] = useState(letters)
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(30)
  const [message, setMessage] = useState('')
  const [resend, setResend] = useState(false)
  const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
  const { userEmail, identifier } = useSelector((state) => state.user)
  let navigate = useNavigate()


  useEffect(() => {
    if (identifier === null) {

      alert('Session expired. Please start again.');
      navigate('/login', { replace: true });
    }
  }, [identifier, navigate]);


  useEffect(() => {
    if (inputRefs[0]?.current) {
      inputRefs[0].current.focus();
    }
    document.title = `Enter OTP - Instagram`;

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);

  }, [])

  useEffect(() => {
    if (timer === 0) {
      setResend(true)
    }
  }, [timer])

  const handleotpinput = (e, i) => {

    if (!isNaN(e.target.value)) {
      const newOtp = [...otp];
      newOtp[i] = e.target.value;
      setOtp(newOtp);
      if (e.target.value.length === 1 && i < newOtp.length - 1) {
        inputRefs[i + 1].current.focus();
      }
    }

  }

  const handleKeyDown = (e, i) => {
    if (e.key === 'Backspace' && i > 0) {
      inputRefs[i - 1].current.focus();
      const newOtp = [...otp];
      newOtp[i] = '';
      setOtp(newOtp);
    }

  }
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('Text');
    if (pastedData.length === letters.length) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);

      inputRefs[otp.length - 1].current.focus();
    } else {
      e.preventDefault();
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') { handleSubmit() }
  }

  const handleSubmit = async () => {
    
    const otpData = [...otp]
    const lettersofotp = otpData.join('');
    setLoading(true)
    try {
      let result = await axios.post(`${serverUrl}/api/auth/checkotp`, {
        otp: lettersofotp
      }, { withCredentials: true })
      setMessage(result.data.message)
      setLoading(false)
      setTimeout(() => {
        setMessage('')
      }, 5000);

      navigate('/resetpassword', { replace: true })
    } catch (error) {
      setLoading(false)
      setMessage(error.response.data.message)
      setTimeout(() => {
        setMessage('')
      }, 5000);
    }
    setOtp(letters);
    inputRefs[0].current.focus();
  }

  const handleResend = async () => {
    if (inputRefs[0]?.current) {
      inputRefs[0].current.focus();
    }
    setLoading(true)
    setResend(false)
    setTimer(30)
    try {
      let result = await axios.post(`${serverUrl}/api/auth/getotp`, {
        identifier: identifier
      }, { withCredentials: true })
      setMessage(`${result.data.message} to ${result.data.email}`)
      setLoading(false)
      setTimeout(() => {
        setMessage('')
      }, 5000);
    } catch (error) {
      setLoading(false)
      setMessage(error.response?.data.message)
      setTimeout(() => {
        setMessage('')
      }, 5000);
    }

  }


  return (
    <div className="relative w-full h-screen flex flex-col justify-around md:justify-start items-center bg-black pt-28 md:pt-50 z-2 overflow-x-hidden ">
      <div className='w-full h-fit fixed top-0 left-0'>
        <OtpNavbar />
      </div>
      <div className="relative w-[400px] flex flex-col justify-start items-center md:border-1 border-[#363636] mt-1 px-auto md:px-12 pt-6 rounded-sm">
        <div className="flex items-center justify-center border-3 border-[#f5f5f5a1] rounded-full p-3">
          <LockClosedIcon className="h-16 w-16 text-[#f5f5f5a9] pb-1" />
        </div>
        <div>
          <p className="text-[#ffffffac] text-[17px] font-semibold mt-3 text-center">Enter OTP sent to {userEmail} and is <br /> valid for 10 minutes.</p>
        </div>
        <div className="flex items-center justify-center gap-3 mt-4">
          {letters.map((_, i) => {
            return (
              <div key={i} className="flex items-center justify-center mt-2">
                <input key={i} type="text" maxLength={1} ref={inputRefs[i]} onChange={(e) => handleotpinput(e, i)} onPaste={(e) => handlePaste(e, i)} onKeyDown={(e) => handleKeyDown(e, i)} value={otp[i]} className="w-10 h-10 border-2 border-[#262626] p-2 bg-[#121212] outline-none rounded-md text-center text-white text-lg font-medium" />
              </div>
            )
          })}

        </div>
        
        <div className=" text-center  flex flex-col items-center justify-center">
          <p className="text-[#ffffffac] text-[13px] ml-25 w-full  flex items-center mt-4">Didn`t receive an OTP?<button onClick={() => handleResend()} disabled={!resend} className={` ${resend ? 'text-[#0087eb]' : 'text-[#0085eb7c]'}  ml-2 cursor-pointer`}>Resend Otp</button></p>
          {timer >= 0 && <p className="text-[#ffffffac] text-[13px] ml-40 w-full pt-1 flex  items-center">Resend after {timer} seconds</p>}
        </div>
        <button onKeyDown={(e) =>handleEnter(e)} onClick={() => handleSubmit()} disabled={otp.includes('')} className={`bg-blue-500 mb-30 text-white font-bold mt-4 py-2 px-10 cursor-pointer  rounded-lg  ${otp.includes('') ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 active:scale-95'}`}>{loading ? (
          <div className="w-4 h-4 border-t-1 border-b-1 border-white rounded-full animate-spin"></div>
        ) : (
          'Verify'
        )}</button>
        <button onClick={() => { navigate('/login', { replace: true }) }} className="w-screen sm:w-[380px] md:w-full py-3 md:absolute border-1 md:border-t-1 border-[#363636af] bottom-0 left-0 bg-[#121212] text-[#ffffff] hover:text-[#ffffff79] cursor-pointer transition-all duration-200 ease-in-out font-bold text-sm text-center mt-3">Back to Login</button>
      </div>

      <div className="w-full hidden lg:block">
        <LoginFooter  page={"Otp"}/>
      </div>
      {message && <div className="w-full absolute bottom-0 left-0 px-5 py-4 z-5 md:block bg-[#262626]">
        <p className="text-[#ffffffd1] text-[15px]  w-full  flex items-center">{message}</p>
      </div>}
    </div>
  )
}

export default EnterOtp
