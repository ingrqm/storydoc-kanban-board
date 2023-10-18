import styled from 'styled-components';

type OverlayProps = {
  $isDragging: boolean;
};

export const Overlay = styled.div<OverlayProps>`
  ${({ $isDragging, theme }) =>
    $isDragging
      ? `
        > * {
          background: ${theme.overlay.background};
          color: ${theme.overlay.color};
          transition: all 0s;

          * {
            visibility: hidden;
            transition: all 0s;
          }
        }
   `
      : ''}
`;
