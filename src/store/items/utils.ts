import type { Item, ItemsState } from './types';

export const saveState = (state: ItemsState) => {
  localStorage.setItem('items', JSON.stringify(state.value));
};

export const readSavedState = () => {
  const storedItems = localStorage.getItem('items');
  const isItemsValid = storedItems && JSON.parse(storedItems).every((item: Item) => item.id && item.title && item.list);

  if (!isItemsValid) {
    localStorage.removeItem('items');
  }

  return isItemsValid ? JSON.parse(storedItems) : [];
};
