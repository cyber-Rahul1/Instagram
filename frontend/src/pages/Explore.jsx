import { useContext } from "react"
import { ThemeContext } from "../context/ContextProvider"

const Explore = () => {


    const { setActiveItem } = useContext(ThemeContext)

  return (

    <div onClick={() => setActiveItem('Explore')} className="flex min-h-screen w-full">
      Explore Page
    </div>
  )
}

export default Explore
