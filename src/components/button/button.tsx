import { ReactNode } from 'react';
import * as Styled from './button.styled';

type ButtonProps = {
  children: ReactNode;
  isBlock?: boolean;
  isIcon?: boolean;
  variant?: 'default' | 'primary' | 'ghost' | 'disabled';
};

export const Button = ({ children, isBlock, isIcon, variant }: ButtonProps) => {
  return (
    <Styled.Button isBlock={isBlock} isIcon={isIcon} variant={variant}>
      {children}
    </Styled.Button>
  );
};
