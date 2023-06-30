import { toast } from 'react-toastify';
import { AppDispatch, RootState } from 'store/store';
import { userAPI } from 'api/api';
import { userSlice } from './Slice';

export const getDataProfile = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.userFetching());
    const result = await userAPI.getDataProfile();
    dispatch(
      userSlice.actions.userFetchingSuccess({
        id: result.data.id,
        username: result.data.username,
        firstName: result.data.first_name,
        lastName: result.data.last_name,
        email: result.data.email,
        urlAvatar: result.data.url_avatar,
        birthday: result.data.birthday,
        gender: result.data.gender,
        phone: result.data.phone,
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
    const { user } = getStore().userReducer;
    try {
      dispatch(userSlice.actions.userFetching());
      try {
        const result = await userAPI.updateProfileBaseData(user.id, firstName, lastName, birthday, gender, phoneNumber);
        dispatch(
          userSlice.actions.userFetchingSuccess({
            id: result.data.id,
            username: user.username,
            firstName: result.data.first_name,
            lastName: result.data.last_name,
            email: user.email,
            urlAvatar: user.urlAvatar,
            birthday: result.data.birthday,
            gender: result.data.gender,
            phone: result.data.phone,
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
      const result = await userAPI.updateAvatar(formData);
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
      await userAPI.deleteAvatar();
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

export default null;
