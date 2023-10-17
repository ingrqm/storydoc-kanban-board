import type { List, ListsState } from './types';

export const saveState = (state: ListsState) => {
  localStorage.setItem('lists', JSON.stringify(state.value));
};

export const readSavedState = () => {
  const storedLists = localStorage.getItem('lists');
  const isListsValid =
    storedLists && JSON.parse(storedLists).every((list: List) => list.id && list.title && list.workspace);

  if (!isListsValid) {
    localStorage.removeItem('lists');
  }

  return isListsValid ? JSON.parse(storedLists) : [];
};
