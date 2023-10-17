import { Item } from 'store/items/types';

export const getDepth = (items: Item[], parentId?: string): number => {
  const children = items.filter((item) => item.parent === parentId);

  if (children.length === 0) return 0;

  const depths = children.map((child) => getDepth(items, child.id));

  return Math.max(...depths);
};
