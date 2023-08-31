import type React from 'react';

import type { BasicProps } from '../type';

const animation = [
  'none',
  'spin',
  'ping',
  'pulse',
  'bounce',
  'scanning',
] as const;
export interface CustomButtonProps extends BasicProps {
  icon?: string;
  iconPosition?: 'left' | 'right';
  iconWidth?: number;
  iconHeight?: number;
  iconColor?: string;
  iconAnimation?: typeof animation;
  roundedLeft?: boolean;
  roundedRight?: boolean;
  gap?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
