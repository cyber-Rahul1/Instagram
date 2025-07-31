
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";


export const getMessages = createAsyncThunk("message/getMessages", async (receiver) => {
    const result = await axios.get(`${serverUrl}/api/messages/getmessages/${receiver}`, {
        withCredentials: true
    });
    return result.data;
});

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: [],
        status: null,
        error: null
    },
    reducers: {
        setMessages(state, action) {
            state.messages = [...state.messages, action.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMessages.pending, (state) => {
            state.status = 'loading'
            state.messages = []
        }).addCase(getMessages.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.messages = action.payload
        }).addCase(getMessages.rejected, (state) => {
            state.status = 'failed'
            state.error = 'Something went wrong'
            state.messages = []
        })
        
    }
})

export const { setMessages } = messageSlice.actions;
export default messageSlice.reducer;

