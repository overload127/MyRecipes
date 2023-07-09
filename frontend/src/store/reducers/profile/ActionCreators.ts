import { toast } from 'react-toastify';
import { AppDispatch, RootState } from 'store/store';
import { IProfileResponse } from 'models/response/ProfileResponse';
import { ISocialNetwork } from 'models/store/IProfile';
import { IProfileSocialNetworks } from 'models/business/IProfileBusiness';
import { profileAPI } from 'api/api';
import { userSlice } from './Slice';

const createArraySocialNet = (profileData: IProfileResponse): ISocialNetwork[] => {
  const socialFields = Object.entries(profileData)
    .filter(([key]) => key.startsWith('social_'))
    .filter(([, value]) => typeof value === 'string');

  const socialNetworks = socialFields.map(([field, url], index) => {
    const type = field.replace('social_', '').replace('_url', '');
    const id = index + 1;
    return { id, url, type };
  });

  return socialNetworks;
};

export const getDataProfile = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userFetching());
    const result = await profileAPI.getDataProfile();
    const socialNetworks = createArraySocialNet(result.data);
    dispatch(
      userSlice.actions.userFetchingSuccess({
        id: result.data.id,
        username: result.data.user.username,
        firstName: result.data.user.first_name,
        lastName: result.data.user.last_name,
        email: result.data.user.email,
        urlAvatar: result.data.avatar,
        birthday: result.data.birthday,
        gender: result.data.gender,
        phone: result.data.phone,
        socialNetworks,
        tags: [],
      }),
    );
  } catch (e) {
    console.log(e.response?.data?.detail);
    console.log(e.message);
    toast.warn('Возникла ошибка при загрузке данных. Попробуйте обновить страницу.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
    dispatch(userSlice.actions.userFetchingError(e.message));
  }
};

export const updateBaseDataProfile =
  (firstName: string, lastName: string, birthday: string | null, gender: number, phoneNumber: string) =>
  async (dispatch: AppDispatch, getStore: () => RootState) => {
    const { profile } = getStore().userReducer;
    try {
      dispatch(userSlice.actions.userFetching());
      try {
        const result = await profileAPI.updateProfileBaseData(
          profile.id,
          firstName,
          lastName,
          birthday,
          gender,
          phoneNumber,
        );
        const socialNetworks = createArraySocialNet(result.data);
        dispatch(
          userSlice.actions.userFetchingSuccess({
            id: result.data.id,
            username: profile.username,
            firstName: result.data.user.first_name,
            lastName: result.data.user.last_name,
            email: profile.email,
            urlAvatar: profile.urlAvatar,
            birthday: result.data.birthday,
            gender: result.data.gender,
            phone: result.data.phone,
            socialNetworks,
            tags: [],
          }),
        );
        toast.success('Данные обновлены успешно', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      } catch (err) {
        console.log(err);
        dispatch(userSlice.actions.userFetchingEnd());
        toast.error('Возникла ошибка при обновлении данных', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      }
    } catch (e) {
      console.log(e.response?.data?.detail);
      console.log(e.message);
      toast.warn('Возникла ошибка при загрузке данных. Попробуйте обновить страницу.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      dispatch(userSlice.actions.userFetchingError(e.message));
    }
  };

export const updateAvatarProfile = (formData: FormData) => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userFetching());
    try {
      const result = await profileAPI.updateAvatar(formData);
      dispatch(userSlice.actions.userFetchingPhotoSuccess(result.data.avatar));
      toast.success('Ваше фото обновлено', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    } catch (err) {
      console.log(err);
      dispatch(userSlice.actions.userFetchingEnd());
      toast.error('Возникла ошибка при обновлении фото', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }
  } catch (e) {
    console.log(e.response?.data?.detail);
    console.log(e.message);
    toast.warn('Возникла ошибка при загрузке данных. Попробуйте обновить страницу.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
    dispatch(userSlice.actions.userFetchingError(e.message));
  }
};

export const deleteAvatarProfile = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userFetching());
    try {
      await profileAPI.deleteAvatar();
      dispatch(userSlice.actions.userFetchingPhotoSuccess(null));
      toast.success('Ваше фото обновлено', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    } catch (err) {
      console.log(err);
      dispatch(userSlice.actions.userFetchingEnd());
      toast.error('Возникла ошибка при обновлении фото', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }
  } catch (e) {
    console.log(e.response?.data?.detail);
    console.log(e.message);
    toast.warn('Возникла ошибка при загрузке данных. Попробуйте обновить страницу.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
    dispatch(userSlice.actions.userFetchingError(e.message));
  }
};

export const updateSocialNetworkProfile =
  (socialNetworksData: IProfileSocialNetworks) => async (dispatch: AppDispatch, getStore: () => RootState) => {
    const { profile } = getStore().userReducer;
    try {
      dispatch(userSlice.actions.userFetching());
      try {
        const result = await profileAPI.updateProfileSocialNetworks({
          id: profile.id,
          ...socialNetworksData,
        });
        const socialNetworks = createArraySocialNet(result.data);
        dispatch(
          userSlice.actions.userFetchingSuccess({
            id: result.data.id,
            username: profile.username,
            firstName: result.data.user.first_name,
            lastName: result.data.user.last_name,
            email: profile.email,
            urlAvatar: profile.urlAvatar,
            birthday: result.data.birthday,
            gender: result.data.gender,
            phone: result.data.phone,
            socialNetworks,
            tags: [],
          }),
        );
        toast.success('Данные обновлены успешно', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      } catch (err) {
        console.log(err);
        dispatch(userSlice.actions.userFetchingEnd());
        toast.error('Возникла ошибка при обновлении данных', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      }
    } catch (e) {
      console.log(e.response?.data?.detail);
      console.log(e.message);
      toast.warn('Возникла ошибка при загрузке данных. Попробуйте обновить страницу.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      dispatch(userSlice.actions.userFetchingError(e.message));
    }
  };

export default null;
