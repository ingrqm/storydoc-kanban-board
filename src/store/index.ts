import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import itemsReducer from './items/slice';
import listsReducer from './lists/slice';
import themeReducer from './theme/slice';
import workspacesReducer from './workspaces/slice';

export const store = configureStore({
  reducer: {
    lists: listsReducer,
    items: itemsReducer,
    theme: themeReducer,
    workspaces: workspacesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
