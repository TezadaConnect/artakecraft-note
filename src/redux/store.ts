'use client';
import { Store, configureStore } from '@reduxjs/toolkit';
import { editorSlice } from './state_features/editor_slice';
import { apiProjectSlice } from './api_features/api_project_slice';
import { dashboardSlice } from './state_features/dashboard_slice';

export const store: Store = configureStore({
  reducer: {
    // STATES
    editor: editorSlice.reducer,
    dashboard: dashboardSlice.reducer,
    // API'S
    [apiProjectSlice.reducerPath]: apiProjectSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([apiProjectSlice.middleware])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
