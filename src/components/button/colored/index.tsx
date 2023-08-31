import React from 'react';

const ColoredButton = ({
  children,
  bgcolor,
  height,
  halfCurved,
  curveType,
  styles,
  onClick,
}: {
  children: React.ReactNode;
  bgcolor: string;
  height?: string;
  halfCurved?: boolean;
  curveType?: 'left' | 'right' | '';
  styles?: string;
  onClick?: () => void;
}) => {
  const curve = () => {
    if (!halfCurved) return 'rounded-full';
    if (curveType === 'left') return 'rounded-l-full';
    if (curveType === 'right') return 'rounded-r-full';
    return '';
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex ${height} ${curve()} group w-full items-center justify-center ${bgcolor} ${styles} `}
    >
      {children}
    </button>
  );
};

export { ColoredButton };
