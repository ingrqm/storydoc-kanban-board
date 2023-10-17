import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Item, ItemsState } from './types';

const storedItems = localStorage.getItem('items');
const isItemsValid = storedItems && JSON.parse(storedItems).every((item: Item) => item.id && item.title && item.list);

if (!isItemsValid) {
  localStorage.removeItem('items');
}

const initialState: ItemsState = {
  value: isItemsValid ? JSON.parse(storedItems) : [],
};

export const slice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.value.push(action.payload);
      localStorage.setItem('items', JSON.stringify(state.value));
    },
    editItem: (state, action: PayloadAction<Item>) => {
      const index = state.value.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        state.value[index] = action.payload;
      }

      localStorage.setItem('items', JSON.stringify(state.value));
    },
    deleteItem: (state, action: PayloadAction<{ id: string }>) => {
      state.value = state.value.filter((item) => item.id !== action.payload.id);
      localStorage.setItem('items', JSON.stringify(state.value));
    },
    deleteItemsByListId: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((item) => item.list !== action.payload);
      localStorage.setItem('items', JSON.stringify(state.value));
    },
  },
});

export const { addItem, editItem, deleteItem, deleteItemsByListId } = slice.actions;

const getItems = (state: RootState) => state.items;

export const selectors = {
  selectItems: createSelector(getItems, (items) => items.value),
};

export default slice.reducer;
