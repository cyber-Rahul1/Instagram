import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        userData: null,
        userEmail: null,
        identifier: null
    },
    reducers:{
        setUserData(state, action)  {
            state.userData = action.payload
        },
        setUserEmail(state, action)  {
            state.userEmail = action.payload
        },
        setIdentifier(state, action)  {
            state.identifier = action.payload
        }
       
    }
})

export const { setUserData, setUserEmail, setIdentifier } = userSlice.actions;
export default userSlice.reducer