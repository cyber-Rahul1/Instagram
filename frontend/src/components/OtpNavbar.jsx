import { useNavigate } from "react-router-dom"


const OtpNavbar = () => {


    const navigate = useNavigate()


    return (
        <div className="w-full lg:gap-170 py-[29px] h-[50px] flex px-5 md:px-0 justify-between md:justify-around lg:justify-center items-center bg-black border-b-2 border-[#212121]">
            <div>
                <h1 className="heading text-white text-3xl tracking-tight font-medium">Instagram</h1>
            </div>
            <div className="flex gap-4 font-semibold text-sm">
                <button onClick={() => navigate('/login')} className="text-white bg-[#0095f6] px-4 py-[6px] rounded-lg hover:bg-[#0085ebd4] cursor-pointer active:scale-95 transition-all duration-300 ease-in-out">Log In</button>
                <button onClick={() => navigate('/signup')} className="text-[#0087eb] cursor-pointer active:scale-95 transition-all duration-300 ease-in-out">Sign Up</button>
            </div>
        </div>
    )
}

export default OtpNavbar
