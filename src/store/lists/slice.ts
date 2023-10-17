import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

type List = {
  id: string;
  title: string;
  workspace: string;
};

type ListsState = {
  value: List[];
};

const storedLists = localStorage.getItem('lists');
const isListsValid =
  storedLists && JSON.parse(storedLists).every((list: List) => list.id && list.title && list.workspace);

if (!isListsValid) {
  localStorage.removeItem('lists');
}

const initialState: ListsState = {
  value: isListsValid ? JSON.parse(storedLists) : [],
};

export const slice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<List>) => {
      state.value.push(action.payload);
      localStorage.setItem('lists', JSON.stringify(state.value));
    },
    editList: (state, action: PayloadAction<List>) => {
      const index = state.value.findIndex((list) => list.id === action.payload.id);

      if (index !== -1) {
        state.value[index] = action.payload;
      }

      localStorage.setItem('lists', JSON.stringify(state.value));
    },
    deleteList: (state, action: PayloadAction<{ id: string }>) => {
      state.value = state.value.filter((list) => list.id !== action.payload.id);
      localStorage.setItem('lists', JSON.stringify(state.value));
    },
  },
});

export const { addList, editList, deleteList } = slice.actions;

const getLists = (state: RootState) => state.lists;

export const selectors = {
  selectLists: createSelector(getLists, (lists) => lists.value),
};

export default slice.reducer;
