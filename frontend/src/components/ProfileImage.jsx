


const ProfileImage = ({ profileImage }) => {
  return (
    <div className="md:w-100 md:h-100 z-50 xl:w-200 xl:h-200 h-70 w-70 rounded-full flex items-center justify-center overflow-hidden">
          <img src={profileImage} alt="dp" className=" w-full h-full object-cover rounded-full" />
    </div>
  )
}

export default ProfileImage