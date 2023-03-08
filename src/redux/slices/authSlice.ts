import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, { payload }) => {
      state.loggedIn = payload.loggedIn;
    },
    setUser: (state, action: PayloadAction<{ user: {} }>) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = {};
    },
  },
});

export const { authenticate, logout, setUser } = authSlice.actions;

export default authSlice.reducer
