import { useContext } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";



const UserProfileOptions = ({setMenuOptions , setAboutAccount }) => {

    const {theme} = useContext(ThemeContext);
    let navigate = useNavigate()
    const {identifier} = useParams()

    const menuOptions = [{ label: "Block" }, { label: "Restrict" }, { label: "Report" }, { label: "Share to..." }, { label: "About this account" }, { label: "Send message" }, { label: "Cancel" }];

    const handleOptions = (label) => {
        if (label === "Cancel") {
            setMenuOptions(false);
        } else if (label === "About this account") {
            setAboutAccount(true);
        } else if (label === "Send message") {
            navigate(`/messages/${identifier}`);
        } else {
            setMenuOptions(false);
        }
    }

  return (
    <div className={`w-fit h-fit relative rounded-xl flex flex-col items-center justify-center  ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#262626]'}`}>
      {menuOptions.map((option) => (
            <div key={option.label} className={`w-full h-fit flex items-center justify-center py-[13px] gap-3 ${option.label === "Cancel" ? 'border-b-0' : 'border-b-1'} ${theme === 'dark' ? 'border-[#363636]' : (theme === 'light') ? 'border-[#f2f2f2]' : ' border-[#f2f2f2] dark:border-[#363636]'}`}>
              <p onClick={() => { handleOptions(option.label); }} className={`text-xs md:text-sm px-16 md:px-35  cursor-pointer hover:opacity-70 transition-all duration-200 ease-in-out ${option.label === "Block" || option.label === "Restrict" || option.label === "Report" ? 'text-[#f54949] font-bold' : theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>{option.label}</p>
            </div>
        ))}
    </div>
  )
}

export default UserProfileOptions
