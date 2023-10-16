import { icons } from './icon.data';

export type IconVariants = keyof typeof icons;
export type IconNames<T extends IconVariants> = keyof (typeof icons)[T];

export type SVGProps = {
  size?: number;
};

export type IconProps<T extends IconVariants> = {
  variant: T;
  name: IconNames<T>;
} & SVGProps;
