import { Item } from './list.type';

export const getDepth = (items: Item[], parentId: null | string = null): number => {
  const children = items.filter((item) => item.parent === parentId);

  if (children.length === 0) return 0;

  const depths = children.map((child) => getDepth(items, child.id));

  return Math.max(...depths);
};
