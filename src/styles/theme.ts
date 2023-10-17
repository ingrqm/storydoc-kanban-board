import { colors } from './colors';

export type Theme = 'light';

export const defaultTheme = {
  layout: {
    app: {
      wrapper: {
        background: colors.maWhite,
      },
      sidebar: {
        background: colors.white,
        shadow: colors.congressionalNavy,
        header: {
          border: colors.whisperBlue,
          workspace: {
            default: {
              default: {
                background: colors.transparent,
                color: colors.navalNight,
              },
              hover: {
                background: colors.ghostWhite,
                color: colors.navalNight,
              },
            },
            active: {
              default: {
                background: colors.maWhite,
                color: colors.navalNight,
              },
              hover: {
                background: colors.placeboBlue,
                color: colors.navalNight,
              },
            },
          },
          logo: {
            background: colors.timeTravel,
          },
        },
        nav: {
          link: {
            default: {
              default: {
                color: colors.blueRinse,
              },
              hover: {
                color: colors.liveJazz,
              },
            },
            active: {
              default: {
                color: colors.azure,
              },
              hover: {
                color: colors.parakeetBlue,
              },
            },
          },
        },
        footer: {
          avatar: {
            color: colors.black,
          },
          settings: {
            default: {
              color: colors.blueRinse,
            },
            hover: {
              color: colors.liveJazz,
            },
          },
        },
      },
    },
  },
  separator: {
    background: colors.whisperBlue,
  },
  button: {
    default: {
      default: {
        background: colors.white,
        color: colors.navalNight,
        shadow: colors.congressionalNavy,
        border: colors.coolFrost,
      },
      hover: {
        background: colors.ghostWhite,
        color: colors.navalNight,
        shadow: colors.congressionalNavy,
        border: colors.coolFrost,
      },
    },
    primary: {
      default: {
        background: colors.azure,
        color: colors.white,
        shadow: colors.congressionalNavy,
        border: colors.azure,
      },
      hover: {
        background: colors.parakeetBlue,
        color: colors.white,
        shadow: colors.congressionalNavy,
        border: colors.parakeetBlue,
      },
    },
    ghost: {
      default: {
        background: colors.transparent,
        color: colors.liveJazz,
        shadow: colors.transparent,
        border: colors.transparent,
      },
      hover: {
        background: colors.transparent,
        color: colors.navalNight,
        shadow: colors.transparent,
        border: colors.transparent,
      },
    },
    disabled: {
      default: {
        background: colors.kundaliniBliss,
        color: colors.saffronCrocus,
        shadow: colors.transparent,
        border: colors.bohemianism,
      },
      hover: {
        background: colors.kundaliniBliss,
        color: colors.saffronCrocus,
        shadow: colors.transparent,
        border: colors.bohemianism,
      },
    },
  },
  list: {
    background: colors.placeboBlue,
    input: {
      color: colors.navalNight,
    },
    card: {
      default: {
        background: colors.white,
        shadow: colors.congressionalNavy,
      },
      hover: {
        background: colors.ghostWhite,
        shadow: colors.congressionalNavy,
      },
    },
    color: colors.navalNight,
  },
} as const;

export type Themes = Record<Theme, typeof defaultTheme>;

export const themes: Themes = {
  light: defaultTheme,
} as const;
