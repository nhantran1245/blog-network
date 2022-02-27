import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, user) =>  void(state = user),
  }

});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;