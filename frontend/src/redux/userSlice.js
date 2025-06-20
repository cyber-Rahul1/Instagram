import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        userData: null,
        userEmail: null,
        identifier: null,
        userCredentials: {}
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

export const { setUserData, setUserEmail, setIdentifier, setUserCredentials, clearUserCredentials } = userSlice.actions;
export default userSlice.reducer