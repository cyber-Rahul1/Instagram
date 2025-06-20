import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIdentifier, setUserEmail } from '../redux/userSlice';
import OtpNavbar from '../components/OtpNavbar';

const Home = () => {

  let dispatch = useDispatch();
  const { userEmail, identifier, userCredentials } = useSelector((state) => state.user)

  useEffect(() => {
    if (identifier || userEmail) {
      dispatch(setIdentifier(null))
      dispatch(setUserEmail(null))
    }
  }, [identifier, userEmail, dispatch])

  useEffect(() => {
      console.log(userCredentials)
    }, [userCredentials])

  return (
    <div>
      < OtpNavbar />
    </div>
  )
}

export default Home
