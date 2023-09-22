'use client';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter_slice';
import editorLeftReducer from './features/editor_left_slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    editorLeft: editorLeftReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
