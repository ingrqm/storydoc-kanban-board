import { useDispatch as useDispatchRaw } from 'react-redux';

import type { AppDispatch } from 'store';

export const useDispatch: () => AppDispatch = useDispatchRaw;
