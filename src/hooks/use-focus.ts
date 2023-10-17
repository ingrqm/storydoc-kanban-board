import { useRef } from 'react';
import type { MutableRefObject } from 'react';

export const useFocus = (): [MutableRefObject<HTMLTextAreaElement | null>, () => void] => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const setFocus = () => {
    const element = ref?.current;

    if (!element) return;

    element.focus();
    element.selectionStart = element.value.length;
  };

  return [ref, setFocus];
};
