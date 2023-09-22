'use client';
import { Store, configureStore } from '@reduxjs/toolkit';
import counterReducer from './state_features/counter_slice';
import { editorLeftSlice } from './state_features/editor_left_slice';
import { apiProjectSlice } from './api_features/api_project_slice';

export const store: Store = configureStore({
  reducer: {
    // STATES
    counter: counterReducer,
    editorLeft: editorLeftSlice.reducer,
    // API'S
    [apiProjectSlice.reducerPath]: apiProjectSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiProjectSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
