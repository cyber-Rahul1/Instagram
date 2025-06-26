import { useContext } from "react";
import { ThemeContext } from "../context/ContextProvider";


const Reels = () => {


    const { setActiveItem } = useContext(ThemeContext);

  return (
    <div onClick={() => setActiveItem('Reels')} className="flex min-h-screen w-full">
      Reels Page
    </div>
  )
}

export default Reels
