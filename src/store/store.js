import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/reduxUser";

export default configureStore({
  reducer: {
    user: userSlice,
  }
})