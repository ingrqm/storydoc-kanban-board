import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { transparency } from 'utils';

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.layout.app.sidebar.background};
  border-radius: 16px;
  box-shadow: ${({ theme }) => `
    0px 0px 1px 0px ${transparency(theme.layout.app.sidebar.shadow, 0.11)},
    0px 3px 5px 0px ${transparency(theme.layout.app.sidebar.shadow, 0.1)}`};
  position: fixed;
  height: calc(100vh - 16px - 16px);
  width: 294px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 8px 16px 8px;
  border-bottom: 1px solid ${({ theme }) => theme.layout.app.sidebar.header.border};
`;

export const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  gap: 32px;
`;

export const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  text-decoration: none;
  color: ${({ theme }) => theme.layout.app.sidebar.nav.link.default.default.color};
  transition: all 0.3s;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;

  &:hover {
    color: ${({ theme }) => theme.layout.app.sidebar.nav.link.default.hover.color};
  }

  &.active {
    color: ${({ theme }) => theme.layout.app.sidebar.nav.link.active.default.color};

    &:hover {
      color: ${({ theme }) => theme.layout.app.sidebar.nav.link.active.hover.color};
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  margin-top: auto;

  button {
    color: ${({ theme }) => theme.layout.app.sidebar.footer.settings.default.color};

    &:hover {
      color: ${({ theme }) => theme.layout.app.sidebar.footer.settings.hover.color};
    }
  }
`;

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  color: ${({ theme }) => theme.layout.app.sidebar.footer.avatar.color};

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
