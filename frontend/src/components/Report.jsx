import { useContext, useState } from "react";
import { ThemeContext } from "../context/ContextProvider";
import { RxCross2 } from "react-icons/rx";


const Report = ({ setReport }) => {

    const { theme } = useContext(ThemeContext);
    const [reportText, setReportText] = useState('')

    return (
        <div onClick={(e) => { e.stopPropagation(); }} className={` w-fit h-fit relative rounded-xl flex flex-col items-center justify-center px-5 pt-3 ${theme === 'dark' ? 'bg-[#262626]' : (theme === 'light') ? 'bg-white' : ' bg-white dark:bg-[#262626]'}`}>
            <div onClick={() => { setReport(false) }} className='absolute top-3 right-3 cursor-pointer'>
                <RxCross2 size={24} className={`${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`} />
            </div>
            <h1 className={` text-lg font-semibold tracking-tight ${theme === 'dark' ? 'text-white' : (theme === 'light') ? 'text-black' : ' text-black dark:text-white'}`}>Report a problem</h1>
            <hr className={`absolute top-12 w-full h-[1px] outline-none border-none  ${theme === 'dark' ? 'bg-[#363636] ' : (theme === 'light') ? 'bg-[#f2f2f2]' : ' bg-[#f2f2f2] dark:bg-[#363636]'}`} />
            <textarea onChange={(e) => { setReportText(e.target.value) }} value={reportText} name="report" placeholder="Please include as much detail as possible..." id="report" className={`${theme === 'dark' ? ' text-white' : (theme === 'light') ? ' text-black' : ' text-black dark:text-white'} w-[360px] h-[120px] border-1 border-[#363636] outline-none p-2 mt-6 mb-4`}/>
           <div className="w-full flex justify-start">
                <button onClick={() => { setReportText(''); setReport(false) }} disabled={!reportText} className={`${!reportText ? 'opacity-50' : ' active:scale-95 hover:bg-[#4a5ef9b7]'} py-[8px] px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center bg-[#4a8df9]  text-white cursor-pointer`}>Send Report</button>
           </div>
            <div className="w-full flex justify-start">
                <p className={`pb-3 pt-2 text-xs tracking-tight ${theme === 'dark' ? 'text-[#ffffff84]' : (theme === 'light') ? 'text-[#00000092]' : ' text-[#00000092] dark:text-[#ffffff84]'} mt-1 `}>Your Instagram username and browser information will be<br /> automatically included in your report.</p>
            </div>
        </div>
    )
}

export default Report
