import { TiArrowLeftThick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ContextProvider";

const WorkInProgess = () => {
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext);

    return (
        <div className="relative h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300 w-full"><TiArrowLeftThick />
            <div onClick={() => { navigate(-1) }} className='h-fit w-fit absolute top-5 left-5 md:top-20 md:left-20 animate-pulse cursor-pointer active:scale-95 transition-all duration-200 ease-in-out'><TiArrowLeftThick  className={`${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'} md:text-5xl text-3xl`} /></div>
            <div className="text-center px-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
                    🚧 Coming Soon
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    We're working hard to bring you something awesome. Stay tuned!
                </p>
                <div className="animate-bounce text-3xl dark:text-white text-gray-800">
                    🔧
                </div>
            </div>
        </div>
    );
};

export default WorkInProgess;
