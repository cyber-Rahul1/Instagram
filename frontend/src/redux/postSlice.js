import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";



export const getUserPosts = createAsyncThunk("post/getUserPosts", async (identifier) => {
    const result = await axios.get(`${serverUrl}/api/posts/getuserposts/${identifier}`, {
        withCredentials: true
    });
    return result.data;
})


export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
    const result = await axios.get(`${serverUrl}/api/posts/getallposts`, {
        withCredentials: true
    });
    return result.data;
})


export const getUserReels = createAsyncThunk("post/getUserReels", async (identifier) => {
    const result = await axios.get(`${serverUrl}/api/posts/getuserreels/${identifier}`, {
        withCredentials: true
    });
    return result.data;
})

export const getAllReels = createAsyncThunk("post/getAllReels", async () => {
    const result = await axios.get(`${serverUrl}/api/posts/getallreels`, {
        withCredentials: true
    });
    return result.data;
})

export const getUserSavedPosts = createAsyncThunk("post/getUserSavedPosts", async () => {
    const result = await axios.get(`${serverUrl}/api/posts/getusersavedposts`, {
        withCredentials: true
    });
    return result.data;
})

export const getAllComments = createAsyncThunk("post/getAllComments", async (postid) => {
    const result = await axios.post(`${serverUrl}/api/posts/getallcomments`, { postid }, {
        withCredentials: true
    });
    return result.data;
})

export const getAllReplies = createAsyncThunk("post/getAllReplies", async (postid) => {
    const result = await axios.post(`${serverUrl}/api/posts/getallreplies`, { postid }, {
        withCredentials: true
    });
    return result.data;
})

export const getUserTaggedPosts = createAsyncThunk("post/getUserTaggedPosts", async () => {
    const result = await axios.get(`${serverUrl}/api/posts/getusertaggedposts`, {
        withCredentials: true
    });
    return result.data;
})


const postSlice = createSlice({
    name: "post",
    initialState: {
        userPosts: null,
        status: null,
        error: null,
        allPosts: null,
        allReels: null,
        userReels: null,
        userSavedPosts: null,
        allComments: [],
        allReplies: [],
        userTaggedPosts: null
    },
    reducers: {
        setUserPosts(state, action) {
            state.userPosts = action.payload
        },
        setAllPosts(state, action) {
            state.allPosts = action.payload
        },
        setAllReels(state, action) {
            state.allReels = action.payload
        },
        setUserReels(state, action) {
            state.userReels = action.payload
        },
        setUserSavedPosts(state, action) {
            state.userSavedPosts = action.payload
        },
        setAllComments(state, action) {
            state.allComments.unshift(action.payload)
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(getUserPosts.pending, (state) => {
            state.status = 'loading'
            state.userPosts = null
        }).addCase(getUserPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.userPosts = action.payload
        }).addCase(getUserPosts.rejected, (state) => {
            state.status = 'failed'
            state.error = 'Something went wrong'
            state.userPosts = null
        })

        // getAllPosts
        builder.addCase(getAllPosts.pending, (state) => {
            state.status = 'loading'
            state.allPosts = null
        }).addCase(getAllPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.allPosts = action.payload
        }).addCase(getAllPosts.rejected, (state) => {
            state.status = 'failed'
            state.error = 'Something went wrong'
            state.allPosts = null
        })

        // getUserReels
        builder.addCase(getUserReels.pending, (state) => {
            state.status = 'loading'
            state.userReels = null
        }).addCase(getUserReels.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.userReels = action.payload
        }).addCase(getUserReels.rejected, (state) => {
            state.status = 'failed'
            state.error = 'Something went wrong'
            state.userReels = null
        })

        // getAllReels
        builder.addCase(getAllReels.pending, (state) => {
            state.status = 'loading'
            state.allReels = null
        }).addCase(getAllReels.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.allReels = action.payload
        }).addCase(getAllReels.rejected, (state) => {
            state.status = 'failed'
            state.error = 'Something went wrong'
            state.allReels = null
        })

        // getUserSavedPosts
        builder.addCase(getUserSavedPosts.pending, (state) => {
            state.status = 'loading'
            state.userSavedPosts = null
        }).addCase(getUserSavedPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.userSavedPosts = action.payload
        }).addCase(getUserSavedPosts.rejected, (state) => {
            state.status = 'failed'
            state.error = 'Something went wrong'
            state.userSavedPosts = null
        })

        // getAllComments
        builder.addCase(getAllComments.pending, (state) => {
            state.status = 'loading'
            state.allComments = null
        }).addCase(getAllComments.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.allComments = action.payload
        }).addCase(getAllComments.rejected, (state) => {
            state.status = 'failed'
            state.error = 'Something went wrong'
            state.allComments = null
        })

        // getAllReplies
        builder.addCase(getAllReplies.pending, (state) => {
            state.status = 'loading'
            state.allReplies = null
        }).addCase(getAllReplies.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.allReplies = action.payload
        }).addCase(getAllReplies.rejected, (state) => {
            state.status = 'failed'
            state.error = 'Something went wrong'
            state.allReplies = null
        })

        // getUserTaggedPosts
        builder.addCase(getUserTaggedPosts.pending, (state) => {
            state.status = 'loading'
            state.userTaggedPosts = null
        }).addCase(getUserTaggedPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.error = null
            state.userTaggedPosts = action.payload
        }).addCase(getUserTaggedPosts.rejected, (state) => {
            state.status = 'failed'
            state.error = 'Something went wrong'
            state.userTaggedPosts = null
        })
    }
})


        
export const { setUserPosts, setAllPosts, setAllReels, setUserReels, setUserSavedPosts, setAllComments, setAllReplies, setUserTaggedPosts,  } = postSlice.actions;
export default postSlice.reducer