import * as axios from 'axios';

import { authSlice } from 'store/reducers/auth/Slice';
import { anonym } from 'models/IAuthUser';

import store from '../store/store';

import baseURL from './config';

export const instancePublic = axios.default.create({
  baseURL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const instancePrivate = axios.default.create({
  baseURL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instancePrivate.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${localStorage.getItem('access')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instancePrivate.interceptors.response.use(
  (response) => {
    store.dispatch(authSlice.actions.isGoodConnectionAuth());
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error?.response?.status === undefined || error?.response?.status === 0) {
      store.dispatch(authSlice.actions.isBadConnectionAuth());
    } else if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.code === 'token_not_valid' &&
      !originalConfig.retry
    ) {
      originalConfig.retry = true;
      const refreshToken = localStorage.getItem('refresh');
      if (refreshToken) {
        try {
          const response = await axios.default.post(`${baseURL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });
          localStorage.setItem('access', response.data.access);
          localStorage.setItem('refresh', response.data.refresh);
          // Retry the original request with the new access token
          originalConfig.headers.Authorization = `Bearer ${response.data.access}`;
          return await axios.default.request(originalConfig);
        } catch (refreshError) {
          console.error(refreshError);
        }
      }
      localStorage.removeItem('refresh');
      localStorage.removeItem('access');
      store.dispatch(authSlice.actions.authFetchingSuccess(anonym));
    }

    // Убрал чтобы не мешал. Но вдруг понадобится?
    throw error;
  },
);

instancePublic.interceptors.response.use(
  (response) => {
    store.dispatch(authSlice.actions.isGoodConnectionAuth());
    return response;
  },
  async (error) => {
    if (error?.response?.status === undefined || error?.response?.status === 0) {
      store.dispatch(authSlice.actions.isBadConnectionAuth());
    }

    throw error;
  },
);
