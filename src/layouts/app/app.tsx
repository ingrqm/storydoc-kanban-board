import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Outlet } from 'react-router-dom';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { List } from 'components';
import { Item } from 'components/list/components';
import { useDispatch } from 'hooks';
import { moveItem } from 'store/items/actions';
import { moveList, moveListToWorkspace } from 'store/lists/actions';
import { moveWorkspace } from 'store/workspaces/actions';

import { Sidebar, Workspace } from './components';
import * as Styled from './app.styled';

export const App = () => {
  const dispatch = useDispatch();
  const [activeElement, setActiveElement] = useState<{ type: 'item' | 'list' | 'workspace'; id: string }>();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const target = {
      id: over?.id as string,
      type: over?.data?.current?.type,
    };

    const source = {
      id: active?.id as string,
      type: active?.data?.current?.type,
    };

    console.log({ source, target });

    if (['item'].includes(source.type) && ['item', 'list'].includes(target.type)) {
      dispatch(moveItem({ source, target }));
    }

    if (['list'].includes(source.type) && ['list'].includes(target.type)) {
      dispatch(moveList({ target, source }));
    }

    if (['list'].includes(source.type) && ['workspace'].includes(target.type)) {
      console.log('moveListToWorkspace');
      dispatch(moveListToWorkspace({ target, source }));
    }

    if (['workspace'].includes(source.type) && ['workspace'].includes(target.type)) {
      dispatch(moveWorkspace({ target, source }));
    }
  };

  return (
    <Styled.Wrapper>
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
        onDragStart={(e) => {
          setActiveElement({
            type: e?.active?.data?.current?.type,
            id: e.active.id as string,
          });
        }}
        sensors={sensors}
      >
        <Sidebar />

        <Styled.Main>
          <Outlet />
        </Styled.Main>

        {createPortal(
          <DragOverlay dropAnimation={null} modifiers={[restrictToWindowEdges]}>
            {activeElement ? (
              <>
                {activeElement.type === 'item' && <Item id={activeElement.id} isOverlay />}
                {activeElement.type === 'list' && <List id={activeElement.id} isOverlay />}
                {activeElement.type === 'workspace' && <Workspace id={activeElement.id} isOverlay />}
              </>
            ) : null}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </Styled.Wrapper>
  );
};
