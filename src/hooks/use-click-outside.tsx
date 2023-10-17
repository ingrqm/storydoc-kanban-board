import { useEffect } from 'react';
import type { RefObject } from 'react';

export const useClickOutside = (refs: RefObject<HTMLElement>[], clickOutsideCallback: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isClickOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(event.target as HTMLInputElement),
      );

      if (isClickOutside) {
        clickOutsideCallback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, clickOutsideCallback]);
};
