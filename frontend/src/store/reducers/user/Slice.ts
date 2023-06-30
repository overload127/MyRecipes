import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'models/store/IUser';

interface IUserState {
  isFetching: boolean;
  error: string;
  user: IUser;
}

const initialState: IUserState = {
  isFetching: false,
  error: '',
  user: {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    urlAvatar: '',
    birthday: '',
    gender: 0,
    phone: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFetching(state) {
      state.isFetching = true;
    },
    userFetchingSuccess(state, action: PayloadAction<IUser>) {
      state.isFetching = false;
      state.error = '';
      state.user = action.payload;
    },
    userFetchingPhotoSuccess(state, action: PayloadAction<string | null>) {
      state.isFetching = false;
      state.error = '';
      state.user.urlAvatar = action.payload;
    },
    userFetchingError(state, action: PayloadAction<string>) {
      state.isFetching = false;
      state.error = action.payload;
    },
    userFetchingEnd(state) {
      state.isFetching = false;
    },
  },
});

export default userSlice.reducer;
