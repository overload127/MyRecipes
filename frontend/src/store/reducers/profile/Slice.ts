import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProfile } from 'models/store/IProfile';

interface IProfileState {
  isFetching: boolean;
  error: string;
  profile: IProfile;
}

const initialState: IProfileState = {
  isFetching: false,
  error: '',
  profile: {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    urlAvatar: '',
    birthday: '',
    gender: 0,
    phone: '',
    socialNetworks: [],
    tags: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFetching(state) {
      state.isFetching = true;
    },
    userFetchingSuccess(state, action: PayloadAction<IProfile>) {
      state.isFetching = false;
      state.error = '';
      state.profile = action.payload;
    },
    userFetchingPhotoSuccess(state, action: PayloadAction<string | null>) {
      state.isFetching = false;
      state.error = '';
      state.profile.urlAvatar = action.payload;
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
