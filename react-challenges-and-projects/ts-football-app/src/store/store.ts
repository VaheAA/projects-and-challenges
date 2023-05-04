import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../services/baseApi';
import authReducer from './reducers/auth/authSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer
});


export const setupStore = () => {
  return configureStore({ reducer: rootReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware) });
};



export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];