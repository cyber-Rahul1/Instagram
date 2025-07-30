import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import messageSlice from "./messageSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    message: messageSlice,
  },
});

export default store;
