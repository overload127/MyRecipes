import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth/Slice';
import recipeReducer from './reducers/recipe/Slice';
import userReducer from './reducers/profile/Slice';

const rootReducer = combineReducers({
  authReducer,
  recipeReducer,
  userReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
const store = setupStore();
export default store;
