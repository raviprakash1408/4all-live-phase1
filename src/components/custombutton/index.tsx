import Image from 'next/image';

import type { CustomButtonProps } from './types';

export default function CustomButton(props: CustomButtonProps) {
  const {
    backgroundColor,
    hoverBackgroundColor,
    borderColor,
    hoverBorderColor,
    textColor,
    hoverTextColor,
    gap,
    icon,
    roundedLeft,
    roundedRight,
    iconWidth,
    iconHeight,
    textSize,
    iconColor,
    iconPosition,
    iconAnimation,
    children,
    onClick,
    buttonProps,
  } = props;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };
  // console.log(gap);

  const getRounded = () => {
    if (roundedLeft && roundedRight) {
      return 'rounded-full';
    }
    if (roundedLeft) {
      return 'rounded-l-lg';
    }
    if (roundedRight) {
      return 'rounded-r-lg';
    }

    return 'rounded-none';
  };
  return (
    <button
      {...buttonProps}
      type="button"
      className={`gap- group${gap} text-${textSize} hover:bg-${hoverBackgroundColor} hover:border-${hoverBorderColor} bg-${backgroundColor} border-${borderColor} text-${textColor} hover:text-${hoverTextColor}  flex-row${
        iconPosition === 'right' ? '-reverse' : ''
      } flex ${getRounded()} border-2 p-4 `}
      onClick={handleClick}
    >
      {icon && (
        <Image
          className={`group-hover:animate-${iconAnimation} text-${iconColor}`}
          src={icon}
          alt="icon"
          width={iconWidth || 24}
          height={iconHeight || 24}
        />
      )}
      {children}
    </button>
  );
}
