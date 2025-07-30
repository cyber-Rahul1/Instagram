import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";







export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
    const result = await axios.get(`${serverUrl}/api/users/getallusers`, {
        withCredentials: true
    });
    return result.data;
})


const userSlice = createSlice({
    name: "user",
    initialState:{
        userData: null,
        userProfile: null,
        userEmail: null,
        identifier: null,
        userCredentials: {},
        allUsers: null,
        socketIo: null,
        onlineUsers: null,
        status: null,
        error: null
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
          },
        setSocketIo(state, action) { 
            state.socketIo = action.payload 
        },
        setOnlineUsers(state, action) {
            state.onlineUsers = action.payload
        }
        
       
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state) => {
            state.status = 'loading'
            state.allUsers = null
        }).addCase(getAllUsers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.allUsers = action.payload
        }).addCase(getAllUsers.rejected, (state) => {
            state.status = 'failed'
            state.error = 'Something went wrong'
            state.allUsers = null
        })
    }
})

export const { setUserData, setUserEmail, setIdentifier, setUserCredentials, clearUserCredentials, setUserProfile, setSocketIo, setOnlineUsers } = userSlice.actions;
export default userSlice.reducer      