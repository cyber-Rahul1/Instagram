import Login from "./pages/Login"
import { Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"

import Home from "./pages/Home"
import { useEffect } from "react"
import ForgotPassword from "./pages/ForgotPassword"
import EnterOtp from "./pages/EnterOtp"
import ResetPassword from "./pages/ResetPassword"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import DataDeletion from "./pages/DataDeletion"
import GetCurrentUser from "./functions/GetCurrentUser"
import Birthday from "./pages/Birthday"
import ConfirmEmail from "./pages/ConfirmEmail"
// import { useSelector } from "react-redux"





const App = () => {
  GetCurrentUser()
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

  useEffect(() => {
    document.title = 'Instagram'
  }, [])

  // const { userData } = useSelector((state) => state.user)

  return (
    <>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signup/:username" element={<Signup/>}/>
      <Route path="/signup/birthday" element={<Birthday/>}/>
      <Route path="/signup/birthday/confirmemail" element={<ConfirmEmail/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/otp" element={<EnterOtp/>}/>
      <Route path="/resetpassword" element={<ResetPassword/>}/>
      <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
      <Route path="/data-deletion" element={<DataDeletion />} />
      <Route path="/" element={<Home/>}/>
    </Routes>
      
    </>
  )
}

export default App
