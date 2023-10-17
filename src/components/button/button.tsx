import { forwardRef, type ReactNode } from 'react';

import * as Styled from './button.styled';

type ButtonProps = {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  isBlock?: boolean;
  isIcon?: boolean;
  disabled?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, variant = 'default', size = 'sm', onClick, isBlock = false, isIcon = false, disabled = false },
  ref,
) {
  return (
    <Styled.Button
      ref={ref}
      $variant={variant}
      $size={size}
      onClick={onClick}
      $isBlock={isBlock}
      $isIcon={isIcon}
      disabled={disabled}
    >
      {children}
    </Styled.Button>
  );
});
