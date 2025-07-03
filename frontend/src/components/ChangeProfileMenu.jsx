

const ChangeProfileMenu = ({ changeProfilePhotoMenu, setUpdateImage, image, removePhoto, theme, loading, updateImage }) => {

    return (
        <div>
            {(updateImage) && <div onClick={() => { setUpdateImage(false); }} className="fixed top-0 z-50 left-0 w-screen h-screen  flex items-center justify-center">
                <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-85" />
                {!loading && <div className={`w-fit h-fit relative rounded-xl flex flex-col items-center justify-center  ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#262626]'}`}>
                    {changeProfilePhotoMenu.map((item) => (
                        <div key={item.name} onClick={(e) => { e.stopPropagation(); item.name === "Cancel" ? setUpdateImage(false) : item.name === "Upload Photo" ? image.current.click() : item.name === "Remove Current Photo" ? removePhoto() : null; }} className={`${item.type === "heading" ? 'py-6 text-lg md:text-xl cursor-default' : item.type === "1" ? 'py-[15px] cursor-pointer active:scale-95 text-sm font-medium text-[#0095f6]' : item.type === "2" ? 'py-[15px] cursor-pointer active:scale-95 text-sm  text-[#e44854] font-medium' : item.type === "3" ? 'cursor-pointer active:scale-95 py-[15px] text-sm  font-medium' : 'py-[15px]'} ${item.name === "Cancel" ? 'border-b-0' : 'border-b-1'} flex items-center justify-center px-10 md:px-28 w-full  transition-all duration-200 ease-in-out ${theme === 'dark' ? 'border-[#363636] ' : (theme === 'light') ? 'border-[#f2f2f2] ' : ' border-[#f2f2f2] dark:border-[#363636]'}`}>
                            <p className="text-center">{item.name}</p>
                        </div>
                    ))}
                </div>}
                {loading && <div className="absolute rounded-full top-0 left-0 w-full h-full bg-[#00000071] flex items-center justify-center"><div className="h-10 w-10 border-t-1 border-b-1  border-[white] rounded-full animate-spin transition-all duration-500 ease-in-out" /></div>}
            </div>}
        </div>
    )
}

export default ChangeProfileMenu
