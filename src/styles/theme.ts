export type Theme = 'light';

export const defaultTheme = {};

export type Themes = Record<Theme, typeof defaultTheme>;

export const themes: Themes = {
  light: defaultTheme,
};
