import { toast } from 'react-toastify';
import { AppDispatch, RootState } from 'store/store';
import { anonym } from 'models/IAuthUser';
import { authAPI } from 'api/api';
import { parseJwt } from 'utils/other';
import { authSlice } from './Slice';

export const loadUserFromLocalStorage = () => async (dispatch: AppDispatch) => {
  const refresh = localStorage.getItem('refresh');
  if (refresh) {
    const tokenData = parseJwt(refresh);
    dispatch(
      authSlice.actions.authFetchingSuccess({
        id: tokenData.user_id.toString(),
        name: tokenData.name,
        isAnonym: false,
      }),
    );
  } else {
    dispatch(authSlice.actions.authFetchingSuccess(anonym));
  }
  dispatch(authSlice.actions.initUserSuccess());
};

export const loginAuth =
  (login: string, password: string, remember: boolean) => async (dispatch: AppDispatch, getStore: () => RootState) => {
    console.log({ remember });
    const { isFetching } = getStore().authReducer;
    if (isFetching) {
      toast.info('Ожидайте, ждем ответа от сервера ...', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      return;
    }
    try {
      dispatch(authSlice.actions.authFetching());
      const result = await authAPI.login(login, password);
      localStorage.setItem('refresh', result.data.refresh);
      localStorage.setItem('access', result.data.access);
      const tokenData = parseJwt(result.data.refresh);
      dispatch(
        authSlice.actions.authFetchingSuccess({
          id: tokenData.user_id.toString(),
          name: tokenData.name,
          isAnonym: false,
        }),
      );
    } catch (e) {
      console.log(e.response?.data?.detail);
      console.log(e.message);
      toast.warn('Не правильный логин или пароль', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      dispatch(authSlice.actions.authFetchingError(e.message));
    }
  };

export const logoutAuth = () => async (dispatch: AppDispatch, getStore: () => RootState) => {
  const refresh = localStorage.getItem('refresh');
  if (!refresh) {
    toast.info('Вы уже вышли из приложения.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
    return;
  }
  const { isFetching } = getStore().authReducer;
  if (isFetching) {
    toast.info('Ожидайте, ждем ответа от сервера ...', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
    return;
  }
  try {
    dispatch(authSlice.actions.authFetching());
    await authAPI.logout(refresh);
  } catch (error) {
    console.error(error);
  }
  dispatch(authSlice.actions.authFetchingSuccess(anonym));
  localStorage.removeItem('refresh');
  localStorage.removeItem('access');
};

export default null;
