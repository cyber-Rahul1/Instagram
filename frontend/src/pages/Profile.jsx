import { useContext } from "react"
import { ThemeContext } from "../context/ContextProvider"


const Profile = () => {

    const { setActiveItem } = useContext(ThemeContext);




  return (
    <div onClick={() => setActiveItem('Profile')} className="flex min-h-screen w-full">
      Profile Page
    </div>
  )
}

export default Profile
