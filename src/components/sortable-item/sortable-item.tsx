import type { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';

type SortableItemProps = {
  children: ReactNode;
  id?: string;
  type?: string;
};

export function SortableItem({ id, type, children }: SortableItemProps) {
  const { setNodeRef, transform, transition, attributes, listeners } = useSortable({
    id: id as string,
    disabled: !id,
    data: { type },
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
