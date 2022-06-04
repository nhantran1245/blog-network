import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isLoggedIn: false,
    isLogging: false, 
  },
  reducers: {
    logging: (state) => {
      state.isLogging = true
    },
    loginSuccess: (state) => {
      state.isLogging = false;
      state.isLoggedIn = true;
    },
    loginFail: (state) => {
      state.isLogging = false;
      state.isLoggedIn = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
    setUser: (state, action) => { state.currentUser = action.payload },
  }

});

export const { setUser } = userSlice.actions;
export const authAction = userSlice.actions;

export const selectUser = (state) => state.user.currentUser;
export const selectIsLogging = (state) => state.user.isLogging;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;