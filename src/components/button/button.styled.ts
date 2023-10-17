import styled from 'styled-components';

import { colors } from 'styles';
import { HexColor, transparency } from 'utils';

type ButtonProps = {
  $variant: 'default' | 'primary' | 'ghost' | 'disabled';
  $size: 'xs' | 'sm' | 'md' | 'lg';
  $isBlock: boolean;
  $isIcon: boolean;
};

const getBoxShadow = <T extends string>(color: HexColor<T>) => `
  box-shadow:
    0px 0px 0px 0px ${transparency(color, 0.1)},
    0px 0px 1px 0px ${transparency(color, 0.1)},
    0px 1px 1px 0px ${transparency(color, 0.09)},
    0px 3px 2px 0px ${transparency(color, 0.05)},
    0px 5px 2px 0px ${transparency(color, 0.01)},
    0px 8px 2px 0px ${transparency(color, 0)};
`;

const getPadding = (size: ButtonProps['$size']) => {
  switch (size) {
    case 'xs':
      return '4px 8px';
    case 'sm':
      return '8px 12px';
    case 'md':
      return '10px 16px';
    case 'lg':
      return '8px 24px';
  }
};

const getFontSize = (size: ButtonProps['$size']) => {
  switch (size) {
    case 'xs':
      return '11px';
    case 'sm':
      return '13px';
    case 'md':
      return '13px';
    case 'lg':
      return '18px';
  }
};

const getLineHeight = (size: ButtonProps['$size']) => {
  switch (size) {
    case 'xs':
      return '14px';
    case 'sm':
      return '20px';
    case 'md':
      return '20px';
    case 'lg':
      return '22px';
  }
};

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  font-style: normal;
  font-weight: 600;
  transition: all 0.3s;

  ${({ theme, $size, $variant, $isBlock, $isIcon }) => {
    const button = theme.button[$variant];

    return `
      cursor: ${$variant === 'disabled' ? 'not-allowed' : 'pointer'};
      width: ${$isBlock ? '100%' : 'auto'};
      padding: ${$isIcon ? '0' : getPadding($size)};
      background-color: ${button.default.background};
      border: ${
        button.default.border === colors.transparent
          ? `1px solid ${colors.transparent}`
          : `1px solid ${transparency(button.default.border, 0.5)}`
      };
      color: ${button.default.color};
      ${button.default.shadow !== colors.transparent ? getBoxShadow(button.default.shadow) : ''}
      font-size: ${getFontSize($size)};
      line-height: ${getLineHeight($size)};

      &:hover {
        background-color: ${button.hover.background};
        border: ${
          button.hover.border === colors.transparent
            ? `1px solid ${colors.transparent}`
            : `1px solid ${transparency(button.hover.border, 0.5)}`
        };
        color: ${button.hover.color};
        ${button.hover.shadow !== colors.transparent ? getBoxShadow(button.hover.shadow) : ''}
      }
    `;
  }};
`;
