import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../@types";

const initialState = {
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {};
    },
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer
