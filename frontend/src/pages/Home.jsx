import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserCredentials, setIdentifier, setUserEmail } from '../redux/userSlice';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ThemeContext } from '../context/ContextProvider';

const Home = () => {

  let dispatch = useDispatch();
  const { userEmail, identifier } = useSelector((state) => state.user);
  const { setTheme } = useContext(ThemeContext);
  
  useEffect(() => {
    if (identifier || userEmail) {
      dispatch(setIdentifier(null))
      dispatch(setUserEmail(null))
    }
   

  }, [identifier, userEmail, dispatch])

  useEffect(() => {
    dispatch(clearUserCredentials());
  }, [])
  
  
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme("system");
    }
  }, []);

  return (
    <div className="flex min-h-screen w-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  )
}

export default Home
