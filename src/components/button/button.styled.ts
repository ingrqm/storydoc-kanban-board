import styled from 'styled-components';
import { colors } from 'styles';
import { HexColor, transparency } from 'utils';

type ButtonProps = {
  isBlock?: boolean;
  isIcon?: boolean;
  variant?: 'default' | 'primary' | 'ghost' | 'disabled';
};

const generateBoxShadow = <T extends string>(color: HexColor<T>) => `
  box-shadow:
    0px 0px 0px 0px ${transparency(color, 0.1)},
    0px 0px 1px 0px ${transparency(color, 0.1)},
    0px 1px 1px 0px ${transparency(color, 0.09)},
    0px 3px 2px 0px ${transparency(color, 0.05)},
    0px 5px 2px 0px ${transparency(color, 0.01)},
    0px 8px 2px 0px ${transparency(color, 0)};
`;

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px;
  transition: all 0.3s;

  ${({ theme, isBlock = false, isIcon = false, variant = 'default' }) => {
    const button = theme.button[variant];

    return `
      cursor: ${variant === 'disabled' ? 'not-allowed' : 'pointer'};
      width: ${isBlock ? '100%' : 'auto'};
      padding: ${isIcon ? '0' : '8px 12px'};
      background-color: ${button.default.background};
      border: ${
        button.default.border === colors.transparent
          ? `1px solid ${colors.transparent}`
          : `1px solid ${transparency(button.default.border, 0.5)}`
      };
      color: ${button.default.color};
      ${button.default.shadow !== colors.transparent && generateBoxShadow(button.default.shadow)}

      &:hover {
        background-color: ${button.hover.background};
        border: ${
          button.hover.border === colors.transparent
            ? `1px solid ${colors.transparent}`
            : `1px solid ${transparency(button.hover.border, 0.5)}`
        };
        color: ${button.hover.color};
        ${button.hover.shadow !== colors.transparent && generateBoxShadow(button.hover.shadow)}
      }
    `;
  }};
`;
