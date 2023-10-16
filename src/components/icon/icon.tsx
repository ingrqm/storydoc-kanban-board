import { icons } from './icon.data';
import { IconProps, IconVariants, SVGProps } from './icon.type';

export const Icon = <T extends IconVariants>({ variant, name, size = 24 }: IconProps<T>) => {
  const Icon = icons[variant][name] as (props: SVGProps) => JSX.Element;

  if (!Icon) return null;

  return <Icon size={size} />;
};
