import type { ReactNode } from 'react';

import * as Styled from './button.styled';

type ButtonProps = {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'ghost' | 'disabled';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  isBlock?: boolean;
  isIcon?: boolean;
};

export const Button = ({
  children,
  variant = 'default',
  size = 'sm',
  onClick,
  isBlock = false,
  isIcon = false,
}: ButtonProps) => {
  return (
    <Styled.Button $variant={variant} $size={size} onClick={onClick} $isBlock={isBlock} $isIcon={isIcon}>
      {children}
    </Styled.Button>
  );
};
