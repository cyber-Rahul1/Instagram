import { useSelector } from "react-redux"
import EmptyPage from "../components/EmptyPage"

const Saved = () => {

  const { userProfile } = useSelector((state) => state.user)

  return (
    <div className="w-full lg:w-[950px] h-fit flex flex-col items-center justify-center pb-10">
     { userProfile?.saved.length === 0 && <EmptyPage page={'saved'} />}
    </div>
  )
}

export default Saved
