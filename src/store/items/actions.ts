import { slice } from './slice';

export const {
  add: addItem,
  edit: editItem,
  delete: deleteItem,
  deleteAllByListId: deleteAllItemsByListId,
  move: moveItem,
} = slice.actions;
