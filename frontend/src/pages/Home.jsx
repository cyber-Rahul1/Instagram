import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserCredentials, setIdentifier, setUserEmail } from '../redux/userSlice';
import OtpNavbar from '../components/OtpNavbar';
import GetCurrentUser from '../functions/GetCurrentUser';

const Home = () => {

  let dispatch = useDispatch();
  const { userEmail, identifier } = useSelector((state) => state.user)

  useEffect(() => {
    if (identifier || userEmail) {
      dispatch(setIdentifier(null))
      dispatch(setUserEmail(null))
    }
    GetCurrentUser()
  }, [identifier, userEmail, dispatch])

  useEffect(() => {
    dispatch(clearUserCredentials());
    }, [] )

  return (
    <div>
      < OtpNavbar />
    </div>
  )
}

export default Home
