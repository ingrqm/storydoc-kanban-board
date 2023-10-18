import styled from 'styled-components';

import { Textarea } from 'components/textarea/textarea.styled';
import { transparency } from 'utils';

export const Actions = styled.div`
  display: none;
  gap: 12px;
  position: absolute;

  button {
    &:first-child {
      color: ${({ theme }) => theme.actions.default.color};
    }

    &:last-child {
      color: ${({ theme }) => theme.actions.delete.color};
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
  display: flex;
  background: ${({ theme }) => theme.list.card.default.background};
  color: ${({ theme }) => theme.list.color};
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
};

export const List = styled.div<ListProps>`
  min-width: ${({ $nestedLevels }) => 294 + ($nestedLevels || 0) * 16}px;
  width: ${({ $nestedLevels }) => 294 + ($nestedLevels || 0) * 16}px;
  background: ${({ theme }) => theme.list.background};
  display: flex;
  padding: ${({ $isListAdd }) => ($isListAdd ? '16px 8px' : '16px 8px 8px 8px')};
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-radius: 16px;
`;

export const Footer = styled.div`
  width: 100%;
`;
