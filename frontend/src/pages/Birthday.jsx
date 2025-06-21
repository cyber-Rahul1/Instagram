
import birthday from '../assets/birthday.png'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginFooter from '../components/LoginFooter';
import { useNavigate } from 'react-router-dom';
import { setUserCredentials } from '../redux/userSlice';
import axios from 'axios';


function Birthday() {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const { userCredentials } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const dob = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        console.log('DOB:', dob); // Format: YYYY-MM-DD
        // You can now send this to the backend
    };

    useEffect(() => {
        if (!userCredentials || Object.keys(userCredentials).length === 0) {
            alert('Session expired. Please start again.');
            navigate('/signup', { replace: true });
        }
    }, [userCredentials, navigate]);


    const handleNext = async (e) => {
        e.preventDefault()
        setLoading(true)
        dispatch(setUserCredentials({
            birthdate: `${day}-${month}-${year}`
        }))
        try {
            let result = await axios.post(`${serverUrl}/api/auth/confirmemail`, {
                email: userCredentials.email
            }, { withCredentials: true })
            console.log(result)
            setLoading(false)
            setMessage(`${result.data.message} to ${userCredentials.email}`)
            setTimeout(() => {
                setMessage('')
            }, 5000);

        } catch (error) {
            console.log(error)
            setLoading(false)
            setMessage(error.response?.data.message)
            setTimeout(() => {
                setMessage('')
            }, 5000);
        }
        navigate('/signup/birthday/confirmemail')
    }

    return (
        <div className="relative w-full min-h-screen flex flex-col justify-around md:justify-start items-center bg-black pt-18 md:pt-16 z-2 ">
            {message && <p className="text-[#ffffffd1] text-[15px]  w-full h-[40px] absolute bottom-0 left-0 px-5 py-2 z-5 md:block bg-[#262626]">{message}</p>}
           <div className='w-fit h-fit flex flex-col'> 
           <div className='flex flex-col justify-start items-center md:border-1 border-[#363636] px-auto  pt-5 px-10'>
                <div className='flex justify-center items-center w-200px '>
                    <img src={birthday} alt="birthday" className='object-cover w-full h-full' />
                </div>
                <h2 className='text-white text-sm font-semibold mt-2'>Add Your Birthday</h2>
                <p className='text-[#ffffffd7] text-xs md:text-sm mt-[14px] text-center leading-[18px]'>This won't be a part of your public profile.</p>
                <p className='text-[#49aaf9] text-xs md:text-sm  text-center leading-[18px]'>Why do I need to provide my birthday?</p>
                <form onSubmit={handleSubmit} className="flex flex-col justify-start items-center gap-4">
    
                    <div className='flex gap-2 pt-3'>
                        {/* Day Dropdown */}
                        <select
                            className='w-[80px] h-[36px] border border-[#5555558a] outline-none text-xs text-[#ffffff88] rounded-[3px] pl-2 bg-black'
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            required
                        >
                            <option value="" disabled style={{ color: "#ffffff88" }}>MM</option>
                            {monthNames.map((monthName, index) => (
                                <option key={index + 1} style={{ color: "#ffffff88" }} value={index + 1}>{monthName}</option>
                            ))}
                        </select>

                        {/* Month Dropdown */}
                        <select
                            className='w-[60px] h-[36px] border border-[#5555558a] outline-none text-xs text-[#ffffff88] rounded-[3px] pl-2 bg-black'
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                            required
                        >
                            <option value="" disabled style={{ color: "#ffffff88" }}>DD</option>
                            {Array.from({ length: 31 }, (_, i) => (
                                <option key={i + 1} style={{ color: "#ffffff88" }} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                            ))}
                        </select>

                        {/* Year Dropdown */}
                        <select
                            className='w-[80px] h-[36px] border border-[#5555558a] outline-none text-xs text-[#ffffff88] rounded-[3px] pl-2 bg-black'
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        >
                            <option value="" disabled style={{ color: "#ffffff88" }} >YYYY</option>
                            {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => {
                                const yr = 1900 + i;
                                return <option key={yr} style={{ color: "#ffffff88" }} value={yr}>{yr}</option>;
                            }).reverse()} 
                        </select>
                        
                      
                    </div>
                    {  (day === '' || month === '' || year === '') && <p className='text-[#ffffff89] text-xs text-center '>You need to enter the date you were born</p>}
                    <p className='text-[#ffffff89] text-xs text-center '>Use your own birthday, even if this account is for a<br/> business, a pet, or something else</p>
                    <button onClick={handleNext} type="submit" disabled={!day || !month || !year || day === 'DD' || month === 'MM' || year === 'YYYY'} className={`${!day || !month || !year || day === 'DD' || month === 'MM' || year === 'YYYY' ? 'opacity-50 ' : 'hover:bg-[#4a5ef9b7] active:scale-95'} w-[270px] h-[34px] rounded-lg font-semibold text-sm mt-2 transition-all duration-200 flex items-center justify-center bg-[#4a8df9]  text-white cursor-pointer `}> {loading ? (
                        <div className="w-4 h-4 border-t-1 border-b-1 border-white rounded-full animate-spin"></div>
                    ) : (
                        'Next'
                    )}</button>
                    
                </form>
                <button onClick={() => { navigate('/signup') }} className=' rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center hover:text-[#4a5ef9b7] text-[#007fce]  cursor-pointer active:scale-95 mb-6 mt-4'>Go back</button>
                
            </div>
            {/* Login redirect section - Link to login page for existing users */}
            <div onClick={() => { navigate('/login') }} className='md:border-1 border-[#363636] flex flex-col items-center justify-center py-6 bg-black w-full md:w-fit md:px-[121px] mt-[10px] '>
                <p  className='text-[#ffffffe9] text-sm text-center leading-3'>Have an account? <br /><span className='text-[#007fce] cursor-pointer font-semibold text-sm'>Log in</span> </p>
            </div>
           </div>
            <LoginFooter page="signUp" />
        </div>
       
    );
}

export default Birthday;
