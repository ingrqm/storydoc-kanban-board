import styled from 'styled-components';

import { Textarea } from 'components/textarea/textarea.styled';
import { colors } from 'styles';
import { transparency } from 'utils';

export const Actions = styled.div`
  display: none;
  gap: 12px;
  position: absolute;

  button {
    &:first-child {
      color: ${colors.navalNight};
    }

    &:last-child {
      color: ${colors.tomatoBurst};
    }

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  padding-left: 8px;
  padding-right: 8px;

  ${Actions} {
    top: 0;
    right: 8px;
  }

  ${Textarea} {
    font-size: 13px;
    line-height: 18px;
    color: ${({ theme }) => theme.list.color};
    font-weight: 600;
  }

  &:hover ${Actions} {
    display: flex;
  }
`;

export const Title = styled.div`
  font-size: 13px;
  line-height: 18px;
  color: ${({ theme }) => theme.list.color};
  font-weight: 600;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const Item = styled.div`
  background: ${({ theme }) => theme.list.card.default.background};
  color: ${({ theme }) => theme.list.color};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 16px;
  position: relative;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  word-break: break-word;
  border-radius: 8px;
  box-shadow: ${({ theme }) => `
    0px 0px 1px 0px ${transparency(theme.list.card.default.shadow, 0.1)},
    0px 1px 1px 0px ${transparency(theme.list.card.default.shadow, 0.1)}`};

  ${Actions} {
    top: 16px;
    right: 16px;
    background: ${({ theme }) => transparency(theme.list.card.hover.background, 0.9)};

    &:hover {
      background: ${({ theme }) => theme.list.card.hover.background};
    }
  }

  &:hover {
    background: ${({ theme }) => theme.list.card.hover.background};
    & > ${Actions} {
      display: flex;
    }
  }
`;

export const Nested = styled.div`
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

type ListProps = {
  $nestedLevels?: number;
  $isListAdd?: boolean;
  $transform: {
    x: number;
    y: number;
  } | null;
  $isDragging: boolean;
};

export const List = styled.div<ListProps>`
  min-width: ${({ $nestedLevels }) => 294 + ($nestedLevels || 0) * 16}px;
  width: ${({ $nestedLevels }) => 294 + ($nestedLevels || 0) * 16}px;
  background: ${({ theme }) => theme.list.background};
  display: flex;
  padding: 16px 8px 8px 8px;
  padding: ${({ $isListAdd }) => ($isListAdd ? '16px 8px' : '16px 8px 8px 8px')};
  transform: ${({ $transform }) =>
    $transform ? `translate3d(${$transform.x}px, ${$transform.y}px, 0)` : 'translate3d(0, 0, 0)'};
  z-index: ${({ $isDragging }) => ($isDragging ? 1 : 0)};
  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'default')};
  box-shadow: ${({ $isDragging }) => ($isDragging ? '0px 0px 8px 0px rgba(0, 0, 0, 0.2)' : 'none')};
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-radius: 16px;
`;

export const Footer = styled.div`
  width: 100%;
`;
