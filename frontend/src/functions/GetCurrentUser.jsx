import axios from "axios";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const GetCurrentUser = () => {
    const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";
    let dispatch = useDispatch()
    let {userData} = useSelector((state) => state.user)
  
    useEffect(() => {
        const fetchUser = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/users/getuser`, {
                    withCredentials: true
                });
                dispatch(setUserData(result.data));
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    },[userData, dispatch, serverUrl])


}

export default GetCurrentUser
