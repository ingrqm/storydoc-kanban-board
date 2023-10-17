import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './theme/slice';
import workspacesReducer from './workspaces/slice';
import listsReducer from './lists/slice';
import itemsReducer from './items/slice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    workspaces: workspacesReducer,
    lists: listsReducer,
    items: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
