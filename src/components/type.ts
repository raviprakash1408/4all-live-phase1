import type { ColorThemes } from '@/utils/Theme';

export type Size =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl';

export type Animation = 'scanning' | 'spinning' | 'pulse' | 'none';
export interface BasicProps {
  backgroundColor?: ColorThemes;
  borderColor?: ColorThemes;
  textColor?: ColorThemes;
  textSize?: Size;
  hoverBackgroundColor?: ColorThemes;
  hoverBorderColor?: ColorThemes;
  hoverTextColor?: ColorThemes;
  hoverTextSize?: Size;
}
