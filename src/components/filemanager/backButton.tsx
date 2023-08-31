import React from 'react';

interface BackButtonProps {
  onClick: () => void;
}
const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 items-center justify-center gap-2 rounded-[20px] bg-primary-color px-3 text-quaternary-color"
    >
      <span>Go Back</span>
    </button>
  );
};

export default BackButton;
