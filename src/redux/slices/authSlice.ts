import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserGoogleInfoType, UserType} from '../../@types';
import {convertToPlainObject} from '../../utils/helpers';

/**
 * This slice handles all the user information
 * @param user keeps the users information from atlas
 * @param userGoogleInfo keeps the users information from Google provider.
 */

interface InitialStateType {
  user: UserType;
  userGoogleInfo: UserGoogleInfoType;
}

const initialState: InitialStateType = {
  user: {
    _id: '',
    role: 0,
    authID: '',
    adminLanguages: [],
    learnerLanguages: [],
    collaboratorLanguages: [],
    name: '',
    email: '',
    phone: '',
    avatar: '',
    created_at: new Date,
    updated_at: new Date
  },
  userGoogleInfo: {
    email: '',
    familyName: '',
    givenName: '',
    id: '',
    name: '',
    photo: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = {...convertToPlainObject(action.payload)};
    },
    setUserGoogleInfo: (state, action: PayloadAction<UserGoogleInfoType>) => {
      state.userGoogleInfo = {...action.payload};
    },
    logout: state => {
      state.user = initialState.user;
    },
  },
});

export const {logout, setUser, setUserGoogleInfo} = authSlice.actions;

export default authSlice.reducer;
