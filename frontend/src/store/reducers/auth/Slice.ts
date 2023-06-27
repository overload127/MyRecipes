import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthUser, anonym } from 'models/IAuthUser';

interface IAuthState {
  isFetching: boolean;
  error: string;
  isInitUser: boolean;
  user: IAuthUser;
  isBadConnection: boolean;
}

const initialState: IAuthState = {
  isFetching: false,
  error: '',
  isInitUser: false,
  user: { ...anonym },
  isBadConnection: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authFetching(state) {
      state.isFetching = true;
    },
    authFetchingSuccess(state, action: PayloadAction<IAuthUser>) {
      state.isFetching = false;
      state.error = '';
      state.user = action.payload;
    },
    authFetchingError(state, action: PayloadAction<string>) {
      state.isFetching = false;
      state.error = action.payload;
      state.user = anonym;
    },
    isBadConnectionAuth(state) {
      state.isBadConnection = true;
    },
    isGoodConnectionAuth(state) {
      state.isBadConnection = false;
    },
    initUserSuccess(state) {
      state.isInitUser = true;
    },
  },
});

export default authSlice.reducer;
