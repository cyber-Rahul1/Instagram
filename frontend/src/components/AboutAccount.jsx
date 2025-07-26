import { FaRegCalendarAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { MdKeyboardArrowRight } from "react-icons/md";
import dp from '../assets/dp.webp'
import { useNavigate } from "react-router-dom";


const AboutAccount = ({ setAboutAcc, theme, country, post }) => {
    let navigate = useNavigate()


    return (
        <>
            {/* Modal overlay background */}
            < div onClick={() => { setAboutAcc(false) }} className="fixed top-0 left-0 z-100 w-screen h-screen flex items-center  justify-center" >

                {/* Modal content container */}
                < div className={`w-fit h-fit flex flex-col items-center justify-center rounded-2xl  ${theme === 'dark' ? 'bg-[black] border-l-1 border-r-1  border-[#3636367b]' : (theme === 'light') ? 'bg-[#f2f2f2] ' : ' bg-[#f2f2f2] dark:bg-[black]'} `}>
                    <p className={`text-xs  md:text-[16px] w-full text-center rounded-t-2xl font-semibold py-3 ${theme === 'dark' ? 'text-white bg-[#363636]' : (theme === 'light') ? 'text-black bg-[#f2f2f2]' : ' text-black dark:text-white '} border-b-1 border-[#8584846f] `}>About this account</p>
                    <div className="md:w-100 h-fit flex flex-col items-center justify-center gap-5 px-3">
                        <div className={`w-full h-fit flex flex-col items-center justify-center gap-2 py-3 `}>
                            <img src={post?.author?.profilepic || dp} alt="profile pic" className="w-20 h-20 rounded-full object-cover" />
                            <p className={`text-xs md:text-[13px] font-bold pt-1 ${theme === 'dark' ? 'text-[white]' : (theme === 'light') ? 'text-[#0000007c]' : ' text-black dark:text-[white]'}`}>{post?.author?.username || post?.author?.name}</p>
                            <p className={`text-xs text-center ${theme === 'dark' ? 'text-[#ffffff7c]' : (theme === 'light') ? 'text-[#0000007c]' : ' text-black dark:text-[#ffffff7c]'}`}>To help keep our community authentic, we're showing<br /> information about accounts on Instagram. <span onClick={() => { navigate('/privacy-policy') }} className="cursor-pointer hover:text-[#708dff] text-[#708dff]">See why<br /> this information is important.</span> </p>
                        </div>
                        <div className="w-full h-fit flex flex-col items-start justify-center gap-4">
                            <div className="flex items-center justify-start gap-2">
                                <FaRegCalendarAlt size={24} />
                                <div>
                                    <p className={`${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Date Joined</p>
                                    <p className={` text-xs ${theme === 'dark' ? 'text-[#ffffff7c]' : (theme === 'light') ? 'text-[#0000007c]' : ' text-black dark:text-[#ffffff7c]'}`}>{post?.author?.createdAt?.slice(0, 10)}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-start gap-2">
                                <IoLocationOutline size={24} />
                                <div>
                                    <p className={`${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Account based in</p>
                                    <p className={`text-xs ${theme === 'dark' ? 'text-[#ffffff7c]' : (theme === 'light') ? 'text-[#0000007c]' : ' text-black dark:text-[#ffffff7c]'}`}>{country}</p>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-start gap-2 pb-2">
                                <CiUser size={25} />
                                <div className="w-full flex items-center justify-between ">
                                    <p className="  ">Former usernames</p>
                                    <MdKeyboardArrowRight size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <p onClick={() => { setAboutAcc(false) }} className={`text-xs cursor-pointer hover:text-[#a4a4a4] transition-all duration-200 ease-in-out md:text-[16px] w-full text-center rounded-b-2xl  py-3 ${theme === 'dark' ? 'text-white bg-[#363636]' : (theme === 'light') ? 'text-black bg-[#f2f2f2]' : ' text-black dark:text-white'} border-t-1 border-[#8584846f]`}>Close</p>
                </div >
            </ div>
        </>
    )
}

export default AboutAccount
