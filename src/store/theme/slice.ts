import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Theme, themes } from 'styles/theme';

type ThemeState = {
  value: Theme;
};

const storedTheme = localStorage.getItem('theme');
const isThemeValid = Object.keys(themes).includes(storedTheme as Theme);

if (!isThemeValid) {
  localStorage.removeItem('theme');
}

const initialState: ThemeState = {
  value: isThemeValid ? (storedTheme as Theme) : 'light',
};

export const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.value = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { setTheme } = slice.actions;

const getTheme = (state: RootState) => state.theme;

export const selectors = {
  selectTheme: createSelector(getTheme, (theme) => theme.value),
};

export default slice.reducer;
