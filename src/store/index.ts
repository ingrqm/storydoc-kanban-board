import { configureStore } from '@reduxjs/toolkit';

import itemsReducer from './items/slice';
import listsReducer from './lists/slice';
import themeReducer from './theme/slice';
import workspacesReducer from './workspaces/slice';
import workspaceReducer from './workspace/slice';

export const store = configureStore({
  reducer: {
    lists: listsReducer,
    items: itemsReducer,
    theme: themeReducer,
    workspaces: workspacesReducer,
    workspace: workspaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
