import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        userData: null,
        userProfile: null,
        userEmail: null,
        identifier: null,
        userCredentials: {}
    },
    reducers:{
        setUserData(state, action)  {
            state.userData = action.payload
        },
        setUserProfile(state, action)  {
            state.userProfile = action.payload
        },
        setUserEmail(state, action)  {
            state.userEmail = action.payload
        },
        setIdentifier(state, action)  {
            state.identifier = action.payload
        },
        setUserCredentials(state, action)  {
            state.userCredentials = {
                ...state.userCredentials,
                ...action.payload
            };
        },
        clearUserCredentials(state) {
            state.userCredentials = {};
          }
        
       
    }
})

export const { setUserData, setUserEmail, setIdentifier, setUserCredentials, clearUserCredentials, setUserProfile } = userSlice.actions;
export default userSlice.reducer