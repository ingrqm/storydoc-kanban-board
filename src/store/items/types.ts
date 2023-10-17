export type Item = {
  id: string;
  title: string;
  parent?: string;
  list: string;
};

export type ItemsState = {
  value: Item[];
};
