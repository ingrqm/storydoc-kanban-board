export type Item = {
  id: string;
  title: string;
  list: null | string;
};

export type ListProps = {
  title?: string;
  id?: string;
  onListAdd?: (title: string) => void;
  onListCancelAdd?: () => void;
  onListEdit?: (title: string) => void;
  onListStartEdit?: () => void;
  onListCancelEdit?: () => void;
  onListDelete?: () => void;
  onItemAdd?: (title: string) => void;
  onItemStartAdd?: () => void;
  onItemCancelAdd?: () => void;
  onItemEdit?: (title: string) => void;
  onItemStartEdit?: () => void;
  onItemCancelEdit?: () => void;
  onItemDelete?: () => void;
};

export type RenderItemsProps = {
  items: Item[];
  parentId: null | string;
};
