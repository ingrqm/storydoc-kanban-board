import type { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import type { UseDraggableArguments } from '@dnd-kit/core';

import * as Styled from './sortable-item.styled';

type SortableItemProps = {
  children: ReactNode;
  id?: string;
  data?: UseDraggableArguments['data'];
};

export function SortableItem({ id, data, children }: SortableItemProps) {
  const { setNodeRef, transform, transition, attributes, listeners, isDragging } = useSortable({
    id: id as string,
    disabled: !id,
    data,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Styled.Overlay $isDragging={isDragging && Boolean(id)}>{children}</Styled.Overlay>
    </div>
  );
}
