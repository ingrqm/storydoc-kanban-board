import { slice } from './slice';

export const {
  add: addItem,
  edit: editItem,
  delete: deleteItem,
  deleteAllByListId: deleteAllItemsByListId,
} = slice.actions;
