import { ReactNode } from 'react';
import * as Styled from './button.styled';

type ButtonProps = {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'ghost' | 'disabled';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isBlock?: boolean;
  isIcon?: boolean;
};

export const Button = ({
  children,
  variant = 'default',
  size = 'sm',
  isBlock = false,
  isIcon = false,
}: ButtonProps) => {
  return (
    <Styled.Button variant={variant} size={size} isBlock={isBlock} isIcon={isIcon}>
      {children}
    </Styled.Button>
  );
};
