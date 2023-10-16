import { useTranslation as useTranslationI18next } from 'react-i18next';
import type { UseTranslationOptions } from 'react-i18next';

export const useTranslation = (keyPrefix?: string, options?: UseTranslationOptions<undefined>) => {
  return useTranslationI18next('translation', { keyPrefix, ...options });
};
