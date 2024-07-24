import { AnyAction, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import landingReducer from 'src/features/home/reducers/landing-page.reducer';

import { api } from './api';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['clientApi', '_persist']
};

interface AppState {
  [api.reducerPath]: ReturnType<typeof api.reducer>;
  landing: ReturnType<typeof landingReducer>;
}

const appReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  landing: landingReducer
});

const rootReducer: Reducer<AppState | undefined, AnyAction> = (state, action) => {
  if (action.type === 'logout/logout') {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(api.middleware)
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
