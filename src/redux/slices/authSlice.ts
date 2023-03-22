import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../@types";

/**
 * This slice handles all the user information
 * @param user keeps the users information from atlas
 * @param userGoogleInfo keeps the users information from Google provider.
 */

interface InitialStateType {
  user: UserType
  userGoogleInfo: object
}

const initialState: InitialStateType = {
  user: {
    _id: '',
    role: 0,
    authID: '',
    adminLanguages: [],
    learnerLanguages: [],
    collaboratorLanguages: []
  },
  userGoogleInfo: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setUserGoogleInfo: (state, action: PayloadAction<{}>) => {
      state.userGoogleInfo = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer
