import { useGSAP } from "@gsap/react"
import gsap from "gsap";



const ProfileImage = ({ profileImage }) => {


  useGSAP(() => {
    gsap.fromTo(
      ".profile-image",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className="profile-image md:w-100 md:h-100 z-50 xl:w-200 xl:h-200 h-70 w-70 rounded-full flex items-center justify-center overflow-hidden">
          <img src={profileImage} alt="dp" className=" w-full h-full object-cover rounded-full " />
    </div>
  )
}

export default ProfileImage