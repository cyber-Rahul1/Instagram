import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIdentifier, setUserEmail } from '../redux/userSlice';

const Home = () => {

  let dispatch = useDispatch();
  const { userEmail, identifier } = useSelector((state) => state.user)
  
  useEffect(() => {
    if (identifier || userEmail) {
      dispatch(setIdentifier(null))
      dispatch(setUserEmail(null))
    }
  })

  return (
    <div>
      Home page
    </div>
  )
}

export default Home
