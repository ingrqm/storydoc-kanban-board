import { forwardRef, useEffect, useState } from 'react';
import type { ChangeEvent, KeyboardEvent, MutableRefObject } from 'react';

import * as Styled from './textarea.styled';

type TextareaProps = {
  defaultValue?: string;
  onCancel?: () => void;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { defaultValue, onCancel, onChange, onSubmit, placeholder },
  ref,
) {
  const [value, setValue] = useState(defaultValue || '');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    onChange?.(event.target.value);
    handleResize(event.target);
  };

  const handleSubmit = ({ key }: KeyboardEvent<HTMLTextAreaElement>) => {
    if (key === 'Enter') {
      onSubmit?.(value);
      setValue(defaultValue || '');
    }
  };

  const handleCancel = ({ key }: KeyboardEvent<HTMLTextAreaElement>) => {
    if (key === 'Escape') {
      onCancel?.();
      setValue(defaultValue || '');
    }
  };

  const handleResize = (target: HTMLTextAreaElement) => {
    target.style.height = 'inherit';
    target.style.height = `${target.scrollHeight}px`;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    handleSubmit(event);
    handleCancel(event);
  };

  useEffect(() => {
    handleResize((ref as MutableRefObject<HTMLTextAreaElement>)?.current);
  }, [ref, handleResize]);

  return (
    <Styled.Textarea
      ref={ref}
      value={value}
      rows={1}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
    />
  );
});
