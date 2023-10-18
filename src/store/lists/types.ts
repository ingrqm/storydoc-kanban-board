export type List = {
  id: string;
  title: string;
  workspace: string;
};

export type ListsState = {
  value: List[];
};

export type Element = {
  id: List['id'];
  type: 'list';
};
