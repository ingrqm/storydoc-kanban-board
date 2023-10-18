import styled from 'styled-components';

import { Textarea } from 'components/textarea/textarea.styled';
import { colors } from 'styles';

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

type WorkspaceProps = {
  $isActive: boolean;
};

export const Workspace = styled.div<WorkspaceProps>`
  display: flex;
  align-items: center;
  position: relative;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.5)};
  cursor: ${({ $isActive }) => ($isActive ? 'default' : 'pointer')};
  transition:
    background 0.3s,
    opacity 0.3s,
    color 0.3s;
  background: ${({ $isActive, theme }) =>
    $isActive
      ? theme.layout.app.sidebar.header.workspace.active.default.background
      : theme.layout.app.sidebar.header.workspace.default.default.background};
  color: ${({ $isActive, theme }) =>
    $isActive
      ? theme.layout.app.sidebar.header.workspace.active.default.color
      : theme.layout.app.sidebar.header.workspace.default.default.color};

  &:hover {
    opacity: 1;
    background: ${({ $isActive, theme }) =>
      $isActive
        ? theme.layout.app.sidebar.header.workspace.active.hover.background
        : theme.layout.app.sidebar.header.workspace.default.hover.background};
    color: ${({ $isActive, theme }) =>
      $isActive
        ? theme.layout.app.sidebar.header.workspace.active.hover.color
        : theme.layout.app.sidebar.header.workspace.default.hover.color};
  }

  ${Textarea} {
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
  }

  ${Actions} {
    top: 24px;
    right: 16px;
  }

  &:hover ${Actions} {
    display: flex;
  }
`;

export const Logo = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.layout.app.sidebar.header.logo.background};
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
`;

export const Title = styled.div`
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
`;
