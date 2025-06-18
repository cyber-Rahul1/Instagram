import { useNavigate } from "react-router-dom";


const LoginFooter = ({page}) => {
    const navigate = useNavigate()
    const footerLinks = ["Meta", "About", "Blog", "Jobs", "Help", "API", "Privacy", "Terms", "Locations", "Delete Account", "Threads", "Contact Uploading & Non-Users", "Meta Verified"];


    const handleClick = (link) => {
        if (link === "Privacy") {
            navigate('/privacy-policy');
        }else if(link === "Delete Account"){
            navigate('/data-deletion');
        }
    }


    return (
        <div className={`w-full lg:flex left-0 flex flex-col justify-center items-center md:mt-20 lg:mt-14 bg-black   ${page === "signUp" ? 'pb-12 pt-14 md:pt-0' : (page === "forgotPassword") ? 'fixed bottom-12 ' : (page === "Otp") ? ' pt-18' : ''}`}>
            <div className='flex flex-wrap gap-4 justify-center items-center p-auto md:p-2'>
                {footerLinks.map((links) => {
                    return <p key={links} onClick={() =>{handleClick(links)}} className='text-[#ffffffa5] text-xs lg:mt-4 leading-2 cursor-pointer hover:underline'>{links}</p>
                })}

            </div>
            <div className='mt-1 lg:mt-0'>
                <p className='text-[#ffffffa5] text-xs mt-4 lg:mt-4'>© 2025 Instagram from Meta</p>
            </div>
        </div>
    )
}

export default LoginFooter
